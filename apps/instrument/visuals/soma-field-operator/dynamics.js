const QUANT_EXP = {
  barrier: -10,
  gamma: 5,
  steps: 400,
  classicalColdSuccesses: 0,
  classicalColdSeeds: 48,
  quantumPeakAwe: 0.40765458776959607,
  minSpectralGap: 0.008903,
  source: 'P2 QUANT-EXP-1 / quantum_sweep_results.csv + quantum_schedule_comparison.csv',
};

const TRACE_LIMIT = 150;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function easeOutCubic(value) {
  const x = clamp(value, 0, 1);
  return 1 - (1 - x) ** 3;
}

function drawLabel(context, text, x, y, color = '#eaf5ff', size = 10, weight = '700') {
  context.fillStyle = color;
  context.font = `${weight} ${size}px "Space Mono", monospace`;
  context.fillText(text, x, y);
}

export function createDimensionDynamics({ getState, activeLevel, activeDimensionLevel }) {
  const panel = document.createElement('section');
  panel.id = 'dimension-dynamics-panel';
  panel.className = 'dimension-dynamics-panel';
  panel.hidden = true;
  panel.innerHTML = `
    <div class="dimension-dynamics-panel__head">
      <span class="claim-badge sourced">SOURCED</span>
      <strong>STATE</strong>
    </div>
    <canvas width="420" height="250" aria-label="Dimension-dependent state dynamics"></canvas>
    <p class="dimension-dynamics-panel__readout">Human + T lens required.</p>
    <p class="dimension-dynamics-panel__source"></p>
  `;
  document.body.append(panel);

  const canvas = panel.querySelector('canvas');
  const context = canvas.getContext('2d');
  const badge = panel.querySelector('.claim-badge');
  const readout = panel.querySelector('.dimension-dynamics-panel__readout');
  const source = panel.querySelector('.dimension-dynamics-panel__source');

  const baseline = { x: 0, v: 0, drive: 0, trace: [], lastPoke: -Infinity };
  const well = {
    e: -1,
    drive: 0,
    driveTime: 99,
    memory: 0,
    trace: [],
    startedAt: -1,
    startE: -1,
    peakE: -1,
    previousResponse: null,
    recordedThisPoke: false,
    ratio: null,
    viewRange: 1.42,
    outcome: '8D: ready - strong poke can cross the barrier.',
  };
  const quantum = { startTime: 0, progress: 0, awe: 0, running: false, trace: [] };
  let lastMode = null;
  let lastActive = false;
  let lastTime = 0;
  let snapshot = { active: false, mode: 4, scenePulse: 0, basin: -1, barrier: 1, readout: '' };

  function levelTauSeconds() {
    const raw = String(activeLevel()?.response_time ?? '10^1 s');
    const exponent = raw.match(/10\^(-?\d+)/);
    if (exponent) return 10 ** Number(exponent[1]);
    const numeric = raw.match(/[\d.]+/);
    return numeric ? Number(numeric[0]) : 10;
  }

  function setBadge(text, className = '') {
    badge.textContent = text;
    badge.className = `claim-badge ${className}`.trim();
  }

  function active() {
    const state = getState();
    return state.tTheory && activeLevel().id === 'human-vertebrate';
  }

  function resetMode(mode, time) {
    if (mode === 4) {
      baseline.x = 0; baseline.v = 0; baseline.drive = 0; baseline.trace.length = 0;
    } else if (mode === 8) {
      well.e = -1; well.drive = 0; well.driveTime = 99; well.memory = 0;
      well.trace.length = 0; well.previousResponse = null; well.recordedThisPoke = false; well.ratio = null;
      well.viewRange = 1.42;
      well.outcome = '8D: ready - strong poke can cross the barrier.';
    } else if (mode === 11) {
      quantum.startTime = time; quantum.progress = 0; quantum.awe = 0; quantum.running = true; quantum.trace.length = 0;
    }
  }

  function pushTrace(trace, value) {
    trace.push(value);
    if (trace.length > TRACE_LIMIT) trace.shift();
  }

  function poke({ strength = 1 } = {}) {
    if (!active()) return;
    const mode = activeDimensionLevel();
    if (!lastActive || lastMode !== mode) {
      resetMode(mode, lastTime);
      lastMode = mode;
      lastActive = true;
    }
    const gain = clamp(strength, 0, 1.4);
    if (mode === 4) {
      baseline.v += 3.2 * gain;
      baseline.drive = Math.max(baseline.drive, gain);
      baseline.lastPoke = lastTime;
    } else if (mode === 8) {
      const memoryBoost = 1 + 0.46 * well.memory;
      well.drive = 5.2 * gain * memoryBoost;
      well.driveTime = 0;
      well.startedAt = lastTime;
      well.startE = well.e;
      well.peakE = well.e;
      well.recordedThisPoke = false;
      well.ratio = null;
      well.memory = clamp(well.memory + 0.58 * gain, 0, 1.8);
      well.outcome = gain < 0.35
        ? '8D: sub-barrier poke relaxed back to Regulated calm.'
        : `8D: poke integrating - J=${well.drive.toFixed(2)}, K=${well.memory.toFixed(2)}.`;
    } else if (mode === 11) {
      quantum.startTime = lastTime;
      quantum.progress = 0;
      quantum.awe = 0;
      quantum.running = true;
      quantum.trace.length = 0;
    }
  }

  function updateBaseline(delta) {
    const omega = 6.1;
    const damping = 0.92;
    baseline.v += (-omega * omega * baseline.x - 2 * damping * omega * baseline.v) * delta;
    baseline.x += baseline.v * delta;
    baseline.drive *= Math.exp(-delta * 3.1);
    if (Math.abs(baseline.x) < 0.002 && Math.abs(baseline.v) < 0.01) {
      baseline.x = 0;
      baseline.v = 0;
    }
    pushTrace(baseline.trace, baseline.x);
    const returned = Math.abs(baseline.x) < 0.05 && Math.abs(baseline.v) < 0.22 && lastTime - baseline.lastPoke > 1.2;
    return returned ? '4D: returned to rest.' : '4D: damped physiological ring-down.';
  }

  function updateWell(delta, noiseD) {
    const dt = Math.min(delta, 0.045);
    const tauSeconds = levelTauSeconds();
    const memoryTau = clamp(tauSeconds * 0.72, 3.5, 10);
    well.driveTime += dt;
    well.memory *= Math.exp(-dt / memoryTau);
    const a = 1.0;
    const b = 1.0;
    const tilt = 0.035;
    const gamma = 0.42;
    const drive = well.drive * Math.exp(-well.driveTime * 2.6);
    const grad = a * well.e ** 3 - b * well.e + tilt;
    const deterministicNoise = 0.018 * Math.sqrt(clamp(noiseD, 0, 0.6)) * (
      Math.sin(lastTime * 17.13) + 0.5 * Math.sin(lastTime * 41.7 + 1.2)
    );
    well.e = clamp(well.e + ((-grad + drive) / gamma) * dt + deterministicNoise * Math.sqrt(dt), -1.38, 1.38);
    well.peakE = Math.max(well.peakE, well.e);
    pushTrace(well.trace, well.e);

    if (well.e > 0.35 || well.driveTime > 0.75) {
      const response = Math.max(0, well.peakE - well.startE);
      if (!well.recordedThisPoke && well.previousResponse !== null && well.previousResponse > 0.6 && response > 0.01) {
        well.ratio = (response / Math.max(0.001, well.previousResponse) - 1) * 100;
      }
      if (!well.recordedThisPoke && response > 0.01) {
        well.previousResponse = response;
        well.recordedThisPoke = true;
      }
      if (well.e > 0.35) {
        if (well.ratio !== null) {
          const change = Math.abs(Math.round(well.ratio));
          const direction = well.ratio >= 0 ? 'larger (sensitised)' : 'smaller (habituated)';
          well.outcome = `8D: flipped to High arousal basin - stays; second poke: response ${change}% ${direction}.`;
        } else {
          well.outcome = '8D: flipped to High arousal basin - stays.';
        }
      } else if (Math.abs(well.e + 1) < 0.28) {
        well.outcome = '8D: sub-barrier poke relaxed back to Regulated calm.';
      } else {
        well.outcome = '8D: near saddle - basin selection still resolving.';
      }
    }
    return well.outcome;
  }

  function updateQuantum(time) {
    if (!quantum.running && quantum.progress >= 1) {
      quantum.awe = QUANT_EXP.quantumPeakAwe;
      pushTrace(quantum.trace, quantum.awe);
      return `11D: quantum anneal reaches Awe-dominant p=${quantum.awe.toFixed(3)} (published peak ${QUANT_EXP.quantumPeakAwe.toFixed(3)}).`;
    }
    if (!quantum.running) quantum.running = true;
    quantum.progress = clamp((time - quantum.startTime) / 5.2, 0, 1);
    quantum.awe = QUANT_EXP.quantumPeakAwe * easeOutCubic(quantum.progress);
    pushTrace(quantum.trace, quantum.awe);
    if (quantum.progress >= 1) quantum.running = false;
    return `11D: quantum anneal reaches Awe-dominant p=${quantum.awe.toFixed(3)} (published peak ${QUANT_EXP.quantumPeakAwe.toFixed(3)}).`;
  }

  function drawTrace(trace, x, y, width, height, min, max, color) {
    context.strokeStyle = color;
    context.lineWidth = 1.5;
    context.beginPath();
    trace.forEach((value, index) => {
      const px = x + (index / Math.max(1, TRACE_LIMIT - 1)) * width;
      const py = y + height - ((value - min) / (max - min)) * height;
      if (index === 0) context.moveTo(px, py);
      else context.lineTo(px, py);
    });
    context.stroke();
  }

  function drawBaseline(message) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLabel(context, '4D LINEAR DAMPED RESPONSE', 16, 24, '#14e5ff', 12);
    drawLabel(context, 'x¨ + 2ζωx˙ + ω²x = J(t)', 16, 42, '#aeb8ce', 9, '400');
    context.strokeStyle = 'rgba(20,229,255,.28)';
    context.beginPath();
    context.moveTo(28, 115);
    context.lineTo(392, 115);
    context.stroke();
    drawTrace(baseline.trace, 32, 74, 352, 80, -1.1, 1.1, '#14e5ff');
    context.fillStyle = '#ff3bce';
    context.beginPath();
    context.arc(210 + baseline.x * 90, 115, 8, 0, Math.PI * 2);
    context.fill();
    drawLabel(context, message, 16, 222, '#eaf5ff', 10);
  }

  function potential(e) {
    return e ** 4 / 4 - e ** 2 / 2 + 0.035 * e;
  }

  function potentialExtrema() {
    const roots = [];
    let previousE = -1.8;
    let previousValue = previousE ** 3 - previousE + 0.035;
    for (let step = 1; step <= 360; step += 1) {
      const e = -1.8 + (step / 360) * 3.6;
      const value = e ** 3 - e + 0.035;
      if (previousValue === 0 || Math.sign(previousValue) !== Math.sign(value)) {
        let lo = previousE;
        let hi = e;
        for (let iteration = 0; iteration < 32; iteration += 1) {
          const mid = (lo + hi) / 2;
          const midValue = mid ** 3 - mid + 0.035;
          if (Math.sign(previousValue) === Math.sign(midValue)) lo = mid;
          else hi = mid;
        }
        roots.push((lo + hi) / 2);
      }
      previousE = e;
      previousValue = value;
    }
    const minima = roots.filter(e => 3 * e ** 2 - 1 > 0);
    const barrier = roots.find(e => 3 * e ** 2 - 1 <= 0) ?? 0;
    return { minima, barrier };
  }

  function drawWell(message) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLabel(context, '8D LANGEVIN DOUBLE WELL + MEMORY', 16, 24, '#ff3bce', 12);
    drawLabel(context, 'γė = -∂H/∂e + √(2D)ξ(t) + J(t),  K(τ)=K₀e^{-τ/τₘ}', 16, 42, '#aeb8ce', 8, '400');
    const { minima, barrier: barrierE } = potentialExtrema();
    const leftMin = minima[0] ?? -1;
    const rightMin = minima[minima.length - 1] ?? 1;
    const traceExtent = well.trace.reduce((extent, value) => Math.max(extent, Math.abs(value)), 0);
    const targetRange = Math.max(
      1.42,
      1.4 * Math.max(Math.abs(leftMin), Math.abs(rightMin)),
      Math.abs(well.e) * 1.15,
      traceExtent * 1.08,
    );
    well.viewRange += (targetRange - well.viewRange) * (targetRange > well.viewRange ? 0.35 : 0.04);
    const range = Math.max(well.viewRange, targetRange * 0.96);
    const eMin = -range;
    const eMax = range;
    const x0 = 28; const yTop = 66; const yBottom = 152; const width = 236;
    const samples = [];
    for (let index = 0; index <= 160; index += 1) {
      const e = eMin + (index / 160) * (eMax - eMin);
      samples.push([e, potential(e)]);
    }
    const values = [...samples.map(([, value]) => value), potential(clamp(well.e, eMin, eMax))];
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const yPad = Math.max(0.02, (maxValue - minValue) * 0.12);
    const yLow = minValue - yPad;
    const yHigh = maxValue + yPad;
    const mapX = e => x0 + ((e - eMin) / (eMax - eMin)) * width;
    const mapY = e => yBottom - ((potential(e) - yLow) / (yHigh - yLow)) * (yBottom - yTop);
    context.strokeStyle = 'rgba(255,59,206,.75)';
    context.lineWidth = 2;
    context.beginPath();
    samples.forEach(([e], index) => {
      const x = mapX(e);
      const y = mapY(e);
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.stroke();
    const drawE = clamp(well.e, eMin, eMax);
    const ballX = mapX(drawE);
    const ballY = mapY(drawE);
    context.fillStyle = well.e > 0 ? '#f6c75a' : '#56f0a2';
    context.beginPath();
    context.arc(ballX, ballY, 7, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = 'rgba(246,199,90,.55)';
    context.beginPath();
    const barrierX = mapX(barrierE);
    context.moveTo(barrierX, yTop - 4);
    context.lineTo(barrierX, yBottom + 4);
    context.stroke();
    drawLabel(context, 'Regulated calm', mapX(leftMin) - 42, 176, '#56f0a2', 8);
    drawLabel(context, 'High arousal', mapX(rightMin) - 35, 176, '#f6c75a', 8);
    drawTrace(well.trace, 278, 78, 118, 70, -1.35, 1.35, '#14e5ff');
    drawLabel(context, `e=${well.e.toFixed(2)}  K=${well.memory.toFixed(2)}`, 278, 166, '#eaf5ff', 9);
  }

  function drawQuantum(message) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLabel(context, '11D QUANT-EXP-1 TUNNELLING REPLAY', 16, 24, '#f6c75a', 12);
    drawLabel(context, 'Exact 8-qubit / 256-state statevector simulation; no hardware claim.', 16, 42, '#aeb8ce', 8, '400');
    const baseY = 186;
    const cold = QUANT_EXP.classicalColdSuccesses / QUANT_EXP.classicalColdSeeds;
    const bars = [
      ['classical cold', cold, '#8c98a5', '0/48 reach'],
      ['quantum anneal', quantum.awe, '#ff3bce', `p=${quantum.awe.toFixed(3)}`],
      ['published peak', QUANT_EXP.quantumPeakAwe, '#14e5ff', '0.408'],
    ];
    bars.forEach(([label, value, color, note], index) => {
      const x = 40 + index * 118;
      const h = value * 260;
      context.fillStyle = 'rgba(234,245,255,.08)';
      context.fillRect(x, 72, 42, 114);
      context.fillStyle = color;
      context.fillRect(x, baseY - h, 42, h);
      drawLabel(context, label, x - 18, 204, color, 8);
      drawLabel(context, note, x - 12, 218, '#eaf5ff', 8, '400');
    });
    drawTrace(quantum.trace, 286, 74, 110, 76, 0, 0.45, '#f6c75a');
    drawLabel(context, `linear Γ=${QUANT_EXP.gamma}→0, steps=${QUANT_EXP.steps}, min gap ${QUANT_EXP.minSpectralGap}`, 16, 238, '#aeb8ce', 8, '400');
    drawLabel(context, message, 16, 58, '#eaf5ff', 9);
  }

  function update({ time, delta, responsePulse = 0 } = {}) {
    lastTime = time ?? lastTime;
    const isActive = active();
    const mode = activeDimensionLevel();
    if (!isActive) {
      panel.hidden = true;
      lastActive = false;
      snapshot = { active: false, mode, scenePulse: 0, basin: well.e, barrier: 1, readout: '' };
      return snapshot;
    }
    panel.hidden = false;
    if (!lastActive || lastMode !== mode) resetMode(mode, lastTime);
    lastMode = mode;
    lastActive = true;

    const state = getState();
    const noiseD = state.thoughtNoiseD ?? 0.16;
    let message;
    if (mode === 4) {
      setBadge('SOURCED', 'sourced');
      source.textContent = 'Standard damped response baseline; used here as the 4D physiology control.';
      message = updateBaseline(delta ?? 0.016);
      drawBaseline(message);
      snapshot = { active: true, mode, scenePulse: Math.abs(baseline.x) * 0.25 + responsePulse, basin: -1, barrier: 0, readout: message };
    } else if (mode === 8) {
      setBadge('MODEL-DERIVED', 'model-derived');
      source.textContent = `P1 energy landscape + P10 memory kernel; τ=${levelTauSeconds()}s scaled for display.`;
      message = updateWell(delta ?? 0.016, noiseD);
      drawWell(message);
      snapshot = { active: true, mode, scenePulse: Math.max(0, well.e) * 0.35 + responsePulse, basin: well.e, barrier: 1 - Math.abs(well.e) * 0.45, readout: message };
    } else {
      setBadge('SIMULATED');
      source.textContent = `${QUANT_EXP.source}; simulated reachability only, not runtime advantage, therapy, or consciousness.`;
      message = updateQuantum(lastTime);
      drawQuantum(message);
      snapshot = { active: true, mode, scenePulse: quantum.awe, basin: 1, barrier: 0.25, readout: message };
    }
    readout.textContent = message;
    return snapshot;
  }

  function visualState() {
    return snapshot;
  }

  function resetCurrent() {
    const mode = activeDimensionLevel();
    resetMode(mode, lastTime);
    lastMode = mode;
    lastActive = active();
  }

  globalThis.__somaDynamics = { snapshot: visualState, poke, reset: resetCurrent };
  return { update, poke, reset: resetCurrent, visualState };
}
