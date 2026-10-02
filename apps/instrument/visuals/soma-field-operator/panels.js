const STORAGE_KEY = 'soma-machine-panel-layout-v1';
const MIN_SIZE = { width: 220, height: 120 };

function readLayout() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') ?? {};
  } catch {
    return {};
  }
}

function writeLayout(layout) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  } catch {
    // localStorage can be disabled in capture or privacy modes.
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function isTypingTarget(target) {
  return target?.closest?.('input, textarea, select, [contenteditable="true"]');
}

function hashWithClean(clean) {
  const params = new URLSearchParams(location.hash.slice(1));
  if (clean) params.set('ui', 'clean');
  else params.delete('ui');
  return `#${params.toString()}`;
}

export function createPanelManager({ clean = false, onCleanChange = () => {} } = {}) {
  const panels = new Map();
  const layout = readLayout();
  let topZ = 80;
  let cleanMode = Boolean(clean);

  const dock = document.createElement('nav');
  dock.className = 'wm-dock';
  dock.setAttribute('aria-label', 'Panel dock');
  document.body.append(dock);

  const hint = document.createElement('div');
  hint.className = 'wm-clean-hint';
  hint.textContent = 'H: show panels / L: labels';
  document.body.append(hint);

  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'wm-dock__reset';
  reset.textContent = 'RESET LAYOUT';
  reset.addEventListener('click', () => resetLayout());
  dock.append(reset);

  function save(id) {
    const entry = panels.get(id);
    if (!entry) return;
    const rect = entry.element.getBoundingClientRect();
    layout[id] = {
      x: Math.round(rect.left),
      y: Math.round(rect.top),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      minimized: entry.element.classList.contains('wm-minimized'),
      z: Number(entry.element.style.zIndex || 0),
    };
    writeLayout(layout);
  }

  function clampPanel(element) {
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = clamp(rect.left, 0, Math.max(0, innerWidth - rect.width));
    const y = clamp(rect.top, 0, Math.max(0, innerHeight - rect.height));
    element.style.left = `${Math.round(x)}px`;
    element.style.top = `${Math.round(y)}px`;
    element.style.right = 'auto';
    element.style.bottom = 'auto';
    element.style.transform = 'none';
  }

  function bringToFront(id) {
    const entry = panels.get(id);
    if (!entry) return;
    for (const panel of panels.values()) panel.element.classList.toggle('wm-front', panel.id === id);
    topZ += 1;
    entry.element.style.zIndex = String(topZ);
    save(id);
  }

  function dispatchResize(entry) {
    const detail = { id: entry.id, element: entry.element, panel: entry.element };
    entry.element.dispatchEvent(new CustomEvent('panel-resize', { bubbles: true, detail }));
    dispatchEvent(new CustomEvent('panel-resize', { detail }));
  }

  function setMinimized(id, minimized) {
    const entry = panels.get(id);
    if (!entry) return;
    entry.element.classList.toggle('wm-minimized', minimized);
    entry.dockButton.hidden = !minimized;
    save(id);
    dispatchResize(entry);
  }

  function addTitleBar(entry, title, closeable) {
    if (entry.element.querySelector(':scope > .wm-titlebar')) return;
    const bar = document.createElement('div');
    bar.className = 'wm-titlebar';
    bar.innerHTML = `
      <span class="wm-titlebar__grip" aria-hidden="true"></span>
      <strong class="wm-titlebar__title"></strong>
      <button class="wm-titlebar__button wm-titlebar__button--min" type="button" aria-label="Minimise panel">_</button>
      ${closeable ? '<button class="wm-titlebar__button wm-titlebar__button--dock" type="button" aria-label="Dock panel">×</button>' : ''}
    `;
    bar.querySelector('.wm-titlebar__title').textContent = title;
    entry.element.prepend(bar);
    bar.querySelector('.wm-titlebar__button--min')?.addEventListener('click', event => {
      event.stopPropagation();
      setMinimized(entry.id, true);
    });
    bar.querySelector('.wm-titlebar__button--dock')?.addEventListener('click', event => {
      event.stopPropagation();
      setMinimized(entry.id, true);
    });

    let drag = null;
    bar.addEventListener('pointerdown', event => {
      if (event.target.closest('button')) return;
      event.preventDefault();
      bringToFront(entry.id);
      const rect = entry.element.getBoundingClientRect();
      drag = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, left: rect.left, top: rect.top, width: rect.width, height: rect.height };
      bar.setPointerCapture(event.pointerId);
    });
    bar.addEventListener('pointermove', event => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      const left = clamp(drag.left + event.clientX - drag.startX, 0, Math.max(0, innerWidth - drag.width));
      const top = clamp(drag.top + event.clientY - drag.startY, 0, Math.max(0, innerHeight - drag.height));
      Object.assign(entry.element.style, { left: `${Math.round(left)}px`, top: `${Math.round(top)}px`, right: 'auto', bottom: 'auto', transform: 'none' });
    });
    const stopDrag = event => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      drag = null;
      save(entry.id);
    };
    bar.addEventListener('pointerup', stopDrag);
    bar.addEventListener('pointercancel', stopDrag);
  }

  function addResizeHandle(entry) {
    if (entry.element.querySelector(':scope > .wm-resize')) return;
    const handle = document.createElement('div');
    handle.className = 'wm-resize';
    handle.setAttribute('aria-hidden', 'true');
    entry.element.append(handle);
    let resize = null;
    handle.addEventListener('pointerdown', event => {
      event.preventDefault();
      bringToFront(entry.id);
      const rect = entry.element.getBoundingClientRect();
      resize = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, width: rect.width, height: rect.height };
      handle.setPointerCapture(event.pointerId);
    });
    handle.addEventListener('pointermove', event => {
      if (!resize || resize.pointerId !== event.pointerId) return;
      const width = Math.max(entry.minWidth, resize.width + event.clientX - resize.startX);
      const height = Math.max(entry.minHeight, resize.height + event.clientY - resize.startY);
      entry.element.style.width = `${Math.round(Math.min(width, innerWidth - 8))}px`;
      entry.element.style.height = `${Math.round(Math.min(height, innerHeight - 8))}px`;
      dispatchResize(entry);
    });
    const stopResize = event => {
      if (!resize || resize.pointerId !== event.pointerId) return;
      resize = null;
      clampPanel(entry.element);
      save(entry.id);
      dispatchResize(entry);
    };
    handle.addEventListener('pointerup', stopResize);
    handle.addEventListener('pointercancel', stopResize);
  }

  function applySaved(entry) {
    const saved = layout[entry.id];
    if (!saved) return;
    if (Number.isFinite(saved.width)) entry.element.style.width = `${Math.max(entry.minWidth, saved.width)}px`;
    if (Number.isFinite(saved.height)) entry.element.style.height = `${Math.max(entry.minHeight, saved.height)}px`;
    if (Number.isFinite(saved.x)) entry.element.style.left = `${saved.x}px`;
    if (Number.isFinite(saved.y)) entry.element.style.top = `${saved.y}px`;
    if (Number.isFinite(saved.x) || Number.isFinite(saved.y)) {
      entry.element.style.right = 'auto';
      entry.element.style.bottom = 'auto';
      entry.element.style.transform = 'none';
    }
    if (Number.isFinite(saved.z)) {
      topZ = Math.max(topZ, saved.z);
      entry.element.style.zIndex = String(saved.z);
    }
    setMinimized(entry.id, Boolean(saved.minimized));
    requestAnimationFrame(() => clampPanel(entry.element));
  }

  function registerPanel(element, options) {
    if (!element || panels.has(options.id)) return null;
    const entry = {
      id: options.id,
      element,
      minWidth: options.minWidth ?? MIN_SIZE.width,
      minHeight: options.minHeight ?? MIN_SIZE.height,
      dockButton: document.createElement('button'),
    };
    panels.set(entry.id, entry);
    element.dataset.panelId = entry.id;
    element.classList.add('wm-panel');
    element.addEventListener('pointerdown', () => bringToFront(entry.id));
    new MutationObserver(() => {
      if (!element.hidden && !element.classList.contains('wm-minimized')) bringToFront(entry.id);
    }).observe(element, { attributes: true, attributeFilter: ['hidden'] });
    addTitleBar(entry, options.title, options.closeable !== false);
    if (options.resizable !== false) addResizeHandle(entry);
    entry.dockButton.type = 'button';
    entry.dockButton.className = 'wm-dock__button';
    entry.dockButton.textContent = options.dockLabel ?? options.title;
    entry.dockButton.hidden = true;
    entry.dockButton.addEventListener('click', () => {
      setMinimized(entry.id, false);
      bringToFront(entry.id);
      if (element.hidden) element.hidden = false;
    });
    dock.append(entry.dockButton);
    applySaved(entry);
    return entry;
  }

  function resetLayout() {
    for (const entry of panels.values()) {
      delete layout[entry.id];
      entry.element.classList.remove('wm-minimized');
      entry.element.classList.remove('wm-front');
      entry.dockButton.hidden = true;
      for (const prop of ['left', 'top', 'right', 'bottom', 'width', 'height', 'transform', 'zIndex']) entry.element.style[prop] = '';
      dispatchResize(entry);
    }
    writeLayout(layout);
  }

  function setCleanMode(on, { writeHash = true } = {}) {
    cleanMode = Boolean(on);
    document.body.classList.toggle('ui-clean', cleanMode);
    if (writeHash) {
      const nextHash = hashWithClean(cleanMode);
      if (location.hash !== nextHash) history.replaceState(null, '', nextHash);
      onCleanChange(cleanMode);
    }
    dispatchEvent(new CustomEvent('clean-mode-change', { detail: { clean: cleanMode } }));
  }

  document.addEventListener('keydown', event => {
    if (event.defaultPrevented) return;
    if (event.key === 'Escape' && cleanMode) {
      event.preventDefault();
      setCleanMode(false);
    } else if (event.key.toLowerCase() === 'h' && !isTypingTarget(event.target)) {
      event.preventDefault();
      setCleanMode(!cleanMode);
    }
  });

  addEventListener('resize', () => {
    for (const entry of panels.values()) clampPanel(entry.element);
  });

  setCleanMode(cleanMode, { writeHash: false });

  function visiblePanelRects() {
    if (cleanMode) return [];
    return [...panels.values()]
      .filter(entry => !entry.element.hidden && !entry.element.classList.contains('wm-minimized'))
      .map(entry => entry.element.getBoundingClientRect())
      .filter(rect => rect.width > 0 && rect.height > 0)
      .map(rect => ({ left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height }));
  }

  return { registerPanel, setCleanMode, resetLayout, visiblePanelRects, isClean: () => cleanMode };
}
