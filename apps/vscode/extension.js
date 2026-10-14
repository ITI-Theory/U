// Sherlock & the Soma Machine: the Soma Machine in a webview, Sherlock's
// findings as diagnostics, and "View in Soma Machine" from Lean and documents.
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const STOPS = [
  ['human', 'HUMAN', 'the whole person'],
  ['body', 'BODY', 'the body and its signals'],
  ['wayin', 'WAY IN', 'from the heart to the brain, by artery'],
  ['brain', 'BRAIN', 'the cathedral of thought'],
  ['limbic', 'LIMBIC', 'amygdala, memory, alarm'],
  ['thought', 'THOUGHT', 'thoughts as bursts'],
  ['neuron', 'NEURON', 'cells and synapses'],
  ['network', 'MEMORY', 'attractor networks'],
  ['landscape', 'LANDSCAPE', 'the energy landscape and the city of code'],
  ['dyad', 'DYAD', 'two people, one field'],
  ['tunnel', 'PATH', 'the path through the scales'],
  ['ureter', 'URETER', 'the stone: pain as waves'],
  ['flight', 'FLY', 'fly through a level'],
  ['score', 'SCORE', 'the score and the Tensor'],
];
// Which stop a passage is about: the stop whose words occur most often.
const STOP_WORDS = {
  ureter: /\b(ureter\w*|kidney stone|stone|stent|colic|renal)\b/gi,
  wayin: /\b(aorta|carotid\w*|arter\w*|circle of willis|blood flow|pulse)\b/gi,
  limbic: /\b(limbic|amygdala\w*|hippocamp\w*|threat|alarm|fear)\b/gi,
  thought: /\b(thoughts?|ruminat\w*|adhd|mindful\w*)\b/gi,
  neuron: /\b(neurons?|synap\w*|dendrit\w*|axons?|cellular)\b/gi,
  network: /\b(hopfield|memory|memories|attractors?)\b/gi,
  landscape: /\b(landscape|basins?|potential well|lean|theorem|proof)\b/gi,
  dyad: /\b(dyad\w*|co-?regulat\w*|attachment|couple|therapist)\b/gi,
  score: /\b(music\w*|score|tempo|rhythm|tensor|containers?)\b/gi,
  brain: /\b(brain|cort\w+|cemi|emf|electromagnetic|cathedral)\b/gi,
  body: /\b(body|vagal|vagus|heart|breath\w*|somatic|interocept\w*)\b/gi,
  flight: /\b(cosmo\w*|universe|galax\w*|planck|scales?)\b/gi,
};

function stopFor(text) {
  let best = 'human', most = 0;
  for (const [stop, rx] of Object.entries(STOP_WORDS)) {
    const n = (text.match(rx) || []).length;
    if (n > most) { most = n; best = stop; }
  }
  return best;
}

const title = stop => (STOPS.find(s => s[0] === stop) || [stop, stop.toUpperCase()])[1];

let panel = null;

function nonce() { return crypto.randomBytes(16).toString('base64'); }

function html(ctx, webview, hash) {
  const root = vscode.Uri.joinPath(ctx.extensionUri, 'media', 'app');
  const file = path.join(root.fsPath, 'index.html');
  if (!fs.existsSync(file)) {
    return '<body style="font-family:sans-serif;padding:2em">The Soma Machine is not built into this copy of the extension (npm run app).</body>';
  }
  const base = webview.asWebviewUri(root).toString() + '/';
  const n = nonce();
  const src = webview.cspSource;
  const csp = [
    "default-src 'none'",
    `img-src ${src} https: data: blob:`,
    `script-src ${src} https://cdn.jsdelivr.net 'nonce-${n}'`,
    `style-src ${src} https://cdn.jsdelivr.net https://fonts.googleapis.com 'unsafe-inline'`,
    `font-src ${src} https://cdn.jsdelivr.net https://fonts.gstatic.com data:`,
    `connect-src ${src} https:`,
    `media-src ${src} blob: data:`,
    'worker-src blob:',
  ].join('; ');
  // The document lives at the webview's origin and its assets at another, so
  // <base> points at the assets; the app's own hash updates are kept on the
  // document (a relative "#..." would otherwise resolve against <base>).
  const head = `<base href="${base}">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<script nonce="${n}">
(() => {
  const here = () => location.href.split('#')[0];
  for (const k of ['replaceState', 'pushState']) {
    const orig = history[k].bind(history);
    history[k] = (s, t, u) => orig(s, t, typeof u === 'string' && u.startsWith('#') ? here() + u : u);
  }
  const start = ${JSON.stringify(hash || '')};
  if (start) history.replaceState(null, '', '#' + start);
  const vscode = acquireVsCodeApi();
  addEventListener('message', e => { if (e.data && e.data.type === 'go') location.hash = e.data.hash; });
  addEventListener('hashchange', () => vscode.setState({ hash: location.hash.slice(1) }));
  window.SOMA_HOST = 'vscode';
  window.somaHostPost = m => vscode.postMessage(m);
})();
</script>
<style>.mother-open, .mother-terminal, .mother-settings { display: none !important; }</style>`;
  return fs.readFileSync(file, 'utf8').replace(/<head>/i, `<head>\n${head}`);
}

function open(ctx, hash) {
  if (panel) {
    panel.reveal(vscode.ViewColumn.Beside);
    if (hash) panel.webview.postMessage({ type: 'go', hash });
    return;
  }
  panel = vscode.window.createWebviewPanel('somaMachine', 'Soma Machine', vscode.ViewColumn.Beside, {
    enableScripts: true,
    retainContextWhenHidden: true,
    localResourceRoots: [vscode.Uri.joinPath(ctx.extensionUri, 'media')],
  });
  panel.iconPath = vscode.Uri.joinPath(ctx.extensionUri, 'media', 'icon.png');
  panel.webview.html = html(ctx, panel.webview, hash);
  panel.onDidDispose(() => { panel = null; }, null, ctx.subscriptions);
  panel.webview.onDidReceiveMessage(m => { if (m && m.type === 'prove') prove(m.module, m.name); }, null, ctx.subscriptions);
}

// --- PROVE: the kernel's answer for a tower floor (ISS-083) ---------------------
// The webview names a module and a declaration; only names in Sherlock's towers export are
// accepted (never free text), and one Lean process runs at a time.
let proving = false;

function prove(module, short) {
  const send = m => panel && panel.webview.postMessage({ ...m, name: short });
  const ws = folder();
  const file = ws && path.join(ws.uri.fsPath, 'bld', 'sherlock', 'towers.json');
  if (!ws || !fs.existsSync(file)) { send({ type: 'prove-out', text: 'No towers export in this workspace (make -C sherlock towers).\n' }); send({ type: 'prove-done', code: 1 }); return; }
  if (proving) { send({ type: 'prove-out', text: 'Lean is already running; one process at a time.\n' }); send({ type: 'prove-done', code: 1 }); return; }
  let full = null;
  try {
    const tower = (JSON.parse(fs.readFileSync(file, 'utf8')).towers || []).find(t => t.module === module);
    const d = tower && (tower.declarations || []).find(d => d.name === short || d.name.endsWith(`.${short}`));
    full = d && d.name;
  } catch { /* unreadable export: refused below */ }
  if (!full || !/^[\w.']+$/.test(full) || !/^[\w.]+$/.test(module)) {
    send({ type: 'prove-out', text: `${module}.${short} is not in the towers export.\n` }); send({ type: 'prove-done', code: 1 }); return;
  }
  const dir = path.join(ws.uri.fsPath, 'bld', 'sherlock', 'prove');
  fs.mkdirSync(dir, { recursive: true });
  const scratch = path.join(dir, 'Prove.lean');
  fs.writeFileSync(scratch, `import ${module}\n#check @${full}\n#print axioms ${full}\n`);
  send({ type: 'prove-out', text: `lake env lean (import ${module}; #check @${full}; #print axioms ${full})\n` });
  proving = true;
  const child = require('child_process').spawn('lake', ['env', 'lean', scratch], { cwd: ws.uri.fsPath });
  const pipe = data => send({ type: 'prove-out', text: String(data) });
  child.stdout.on('data', pipe);
  child.stderr.on('data', pipe);
  child.on('error', err => { proving = false; send({ type: 'prove-out', text: `could not run lake: ${err.message}\n` }); send({ type: 'prove-done', code: 1 }); });
  child.on('close', code => { proving = false; send({ type: 'prove-done', code: code ?? 1 }); });
}

// --- Sherlock's findings -----------------------------------------------------

const FINDING = /^(.+?):(\d+)(?::(\d+))?:\s*(error|warning|note|info):\s*(.*)$/;

function folder() { return vscode.workspace.workspaceFolders?.[0]; }

function loadFindings(diags) {
  diags.clear();
  const ws = folder();
  if (!ws) return 0;
  const file = path.join(ws.uri.fsPath, vscode.workspace.getConfiguration('sherlock').get('ledgerFile'));
  if (!fs.existsSync(file)) return 0;
  const byFile = new Map();
  let count = 0;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = FINDING.exec(line);
    if (!m) continue;
    const [, f, ln, col, sev, msg] = m;
    const uri = vscode.Uri.file(path.isAbsolute(f) ? f : path.join(ws.uri.fsPath, f));
    const l = Math.max(0, Number(ln) - 1), c = Math.max(0, Number(col || 1) - 1);
    const d = new vscode.Diagnostic(new vscode.Range(l, c, l, 1000), msg,
      sev === 'error' ? vscode.DiagnosticSeverity.Error : sev === 'warning' ? vscode.DiagnosticSeverity.Warning : vscode.DiagnosticSeverity.Information);
    d.source = 'Sherlock';
    const key = uri.toString();
    if (!byFile.has(key)) byFile.set(key, [uri, []]);
    byFile.get(key)[1].push(d);
    count += 1;
  }
  for (const [uri, list] of byFile.values()) diags.set(uri, list);
  return count;
}

// Lean declaration name -> module (the city of code has a tower per module).
function towersIndex() {
  const ws = folder();
  const file = ws && path.join(ws.uri.fsPath, 'bld', 'sherlock', 'towers.json');
  const index = new Map();
  if (!file || !fs.existsSync(file)) return index;
  try {
    for (const t of JSON.parse(fs.readFileSync(file, 'utf8')).towers || []) {
      for (const d of t.declarations || []) index.set(d.name, t.module);
    }
  } catch { /* an unreadable export only loses the shortcut */ }
  return index;
}

function moduleOf(name, index) {
  if (index.has(name)) return index.get(name);
  for (const [full, mod] of index) if (full.endsWith(`.${name}`)) return mod;
  return null;
}

function towerHash(mod) { return `voyage=landscape&tower=${encodeURIComponent(mod)}`; }

// A Lean file with no tower of its own (not exported) opens the city of code.
function leanHash(file) {
  const mod = path.basename(file, '.lean');
  const known = new Set(towersIndex().values());
  return known.size && !known.has(mod) ? 'voyage=landscape' : towerHash(mod);
}

// --- "View in Soma Machine" --------------------------------------------------

function section(doc, line) {
  let a = line, b = line;
  while (a > 0 && !/^#{1,6}\s/.test(doc.lineAt(a).text)) a -= 1;
  while (b < doc.lineCount - 1 && !/^#{1,6}\s/.test(doc.lineAt(b + 1).text)) b += 1;
  return doc.getText(new vscode.Range(a, 0, b, doc.lineAt(b).text.length));
}

function hashFor(editor) {
  const doc = editor.document;
  if (doc.languageId === 'lean4' || doc.fileName.endsWith('.lean')) {
    return leanHash(doc.fileName);
  }
  const sel = editor.selection;
  const text = sel && !sel.isEmpty ? doc.getText(sel) : section(doc, sel ? sel.active.line : 0);
  return `voyage=${stopFor(text)}`;
}

class Lenses {
  constructor() { this.changed = new vscode.EventEmitter(); this.onDidChangeCodeLenses = this.changed.event; }
  provideCodeLenses(doc) {
    if (!vscode.workspace.getConfiguration('sherlock').get('codeLens')) return [];
    const top = new vscode.Range(0, 0, 0, 0);
    if (doc.languageId === 'lean4' || doc.fileName.endsWith('.lean')) {
      const mod = path.basename(doc.fileName, '.lean');
      const hash = leanHash(doc.fileName);
      const what = hash.includes('tower=') ? `the tower of ${mod}` : 'the city of code';
      return [new vscode.CodeLens(top, { title: `◇ View in Soma Machine: ${what}`, command: 'somaMachine.go', arguments: [hash] })];
    }
    if (doc.languageId === 'markdown' && doc.lineCount > 20) {
      const stop = stopFor(doc.getText());
      return [new vscode.CodeLens(top, { title: `◇ View in Soma Machine: ${title(stop)}`, command: 'somaMachine.go', arguments: [`voyage=${stop}`] })];
    }
    return [];
  }
}

class FindingActions {
  provideCodeActions(doc, range, context) {
    const index = towersIndex();
    const out = [];
    for (const d of context.diagnostics.filter(d => d.source === 'Sherlock')) {
      const name = (/`([^`]+)`/.exec(d.message) || [])[1];
      const mod = name && moduleOf(name, index);
      if (!mod) continue;
      const a = new vscode.CodeAction(`View \`${name}\` in Soma Machine (tower ${mod})`, vscode.CodeActionKind.QuickFix);
      a.command = { command: 'somaMachine.go', title: a.title, arguments: [towerHash(mod)] };
      a.diagnostics = [d];
      out.push(a);
    }
    return out;
  }
}

function activate(ctx) {
  const diags = vscode.languages.createDiagnosticCollection('sherlock');
  ctx.subscriptions.push(diags);
  const reload = () => loadFindings(diags);
  reload();

  const ws = folder();
  if (ws) {
    const rel = vscode.workspace.getConfiguration('sherlock').get('ledgerFile');
    const watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(ws, rel));
    watcher.onDidChange(reload); watcher.onDidCreate(reload); watcher.onDidDelete(reload);
    ctx.subscriptions.push(watcher);
  }

  const lenses = new Lenses();
  ctx.subscriptions.push(
    vscode.languages.registerCodeLensProvider([{ language: 'lean4' }, { pattern: '**/*.lean' }, { language: 'markdown' }], lenses),
    vscode.languages.registerCodeActionsProvider({ scheme: 'file' }, new FindingActions(), { providedCodeActionKinds: [vscode.CodeActionKind.QuickFix] }),
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('sherlock')) { reload(); lenses.changed.fire(); }
    }),
    vscode.commands.registerCommand('somaMachine.open', () => open(ctx)),
    vscode.commands.registerCommand('somaMachine.go', hash => open(ctx, hash)),
    vscode.commands.registerCommand('somaMachine.openStop', async () => {
      const pick = await vscode.window.showQuickPick(STOPS.map(([id, t, d]) => ({ label: t, description: d, id })), { placeHolder: 'Go to a stop of the Soma Machine' });
      if (pick) open(ctx, `voyage=${pick.id}`);
    }),
    vscode.commands.registerCommand('somaMachine.viewHere', () => {
      const ed = vscode.window.activeTextEditor;
      open(ctx, ed ? hashFor(ed) : '');
    }),
    vscode.commands.registerCommand('sherlock.reload', () => {
      const n = reload();
      vscode.window.setStatusBarMessage(`Sherlock: ${n} finding${n === 1 ? '' : 's'}`, 4000);
    }),
    // Sherlock: Set up (ISS-090): the local build Sherlock's Lean checks need, after a warning.
    vscode.commands.registerCommand('sherlock.setup', async () => {
      const w = folder();
      if (!w) return vscode.window.showWarningMessage('Sherlock: open the U repository as the workspace first.');
      try {
        require('child_process').execSync('lake --version', { stdio: 'ignore', cwd: w.uri.fsPath });
      } catch {
        const how = 'How to install Lean';
        const pick = await vscode.window.showErrorMessage('Sherlock: Set up needs Lean (lake, from elan), which is not on the PATH.', how);
        if (pick === how) vscode.env.openExternal(vscode.Uri.parse('https://lean-lang.org/lean4/doc/setup.html'));
        return;
      }
      const go = 'Set up';
      const answer = await vscode.window.showWarningMessage(
        'Sherlock: Set up downloads and builds, in this workspace: Mathlib\'s prebuilt cache for Lean (several GB), ' +
        'NextKB, the OpenCyc knowledge base (about 20 MB, checked against its SHA-256), and builds OpenCyc in Lean and ' +
        'the affidavits. It needs Lean (elan) and make, and can take an hour or more. Continue?',
        { modal: true }, go);
      if (answer !== go) return;
      const cmd = vscode.workspace.getConfiguration('sherlock').get('setupCommand');
      const task = new vscode.Task({ type: 'shell' }, w, 'Sherlock: set up', 'sherlock', new vscode.ShellExecution(cmd));
      const exec = await vscode.tasks.executeTask(task);
      const done = vscode.tasks.onDidEndTaskProcess(e => {
        if (e.execution !== exec) return;
        done.dispose();
        reload();
        if (e.exitCode === 0) vscode.window.showInformationMessage('Sherlock is set up: the checks and the ledger are ready.');
        else vscode.window.showErrorMessage(`Sherlock: set up stopped (exit ${e.exitCode}); see the terminal.`);
      });
    }),
    vscode.commands.registerCommand('sherlock.check', async () => {
      const w = folder();
      if (!w) return vscode.window.showWarningMessage('Sherlock: open a workspace first.');
      const cmd = vscode.workspace.getConfiguration('sherlock').get('checkCommand');
      const task = new vscode.Task({ type: 'shell' }, w, 'Sherlock: check', 'sherlock', new vscode.ShellExecution(cmd));
      const exec = await vscode.tasks.executeTask(task);
      const done = vscode.tasks.onDidEndTaskProcess(e => {
        if (e.execution !== exec) return;
        done.dispose();
        const n = reload();
        vscode.window.showInformationMessage(`Sherlock: ${n === 0 ? 'no disagreements' : `${n} finding${n === 1 ? '' : 's'} in Problems`}.`);
      });
    }),
  );
}

function deactivate() {}

module.exports = { activate, deactivate, stopFor };
