// Runs inside the test VS Code, with U as the workspace (bld/sherlock/usc.txt from `make -C sherlock usc`).
const assert = require('assert');
const path = require('path');
const vscode = require('vscode');

async function run() {
  const ext = vscode.extensions.getExtension('iti-theory.t-theory-explorer');
  assert.ok(ext, 'the extension is present');
  await ext.activate();
  const ws = vscode.workspace.workspaceFolders[0].uri.fsPath;
  const results = [];
  const ok = (name, cond) => { assert.ok(cond, name); results.push('ok  ' + name); };

  const cmds = await vscode.commands.getCommands(true);
  for (const c of ['usc.check', 'usc.tag', 'usc.ideas', 'ttheory.catalogue', 'sherlock.check', 'somaMachine.open']) ok(`command ${c}`, cmds.includes(c));

  const wkb = vscode.Uri.file(path.join(ws, 'sherlock', 'Fishing', 'WKB.lean'));
  const diags = vscode.languages.getDiagnostics(wkb).filter(d => d.source === 'USC');
  ok(`USC findings in Problems for WKB.lean (${diags.length})`, diags.length >= 5);
  ok('an open assumption at its line', diags.some(d => /open assumption: exp\(-2S\) is called an amplitude/.test(d.message)));

  const langs = await vscode.languages.getLanguages();
  ok('the affidavit language', langs.includes('affidavit'));
  const aff = await vscode.workspace.openTextDocument({ language: 'affidavit', content: 'threads:\n  - {id: x, disposition: queued}\n' });
  ok('an .aff document opens as affidavit', aff.languageId === 'affidavit');

  ok('stopFor still finds a stop', require(path.join(ext.extensionPath, 'extension.js')).stopFor('the amygdala and the limbic system') === 'limbic');
  const cat = require(path.join(ext.extensionPath, 'extension.js')).catalogue(ext.extensionPath);
  ok(`the catalogue: papers, datasets and books (${cat.length})`, ['paper', 'dataset', 'book'].every(k => cat.some(i => i.kind === k)));
  ok('a published paper has its DOI', cat.some(i => i.kind === 'paper' && /^10\.5281\/zenodo\./.test(i.doi)));
  console.log(results.join('\n'));
}

module.exports = { run };
