// The extension's smoke test in a throwaway VS Code (@vscode/test-electron; ISS-132): node test/run.js
const path = require('path');
const { runTests } = require('@vscode/test-electron');

(async () => {
  const ext = path.resolve(__dirname, '..');
  const workspace = path.resolve(ext, '..', '..');  // U
  try {
    await runTests({
      extensionDevelopmentPath: ext,
      extensionTestsPath: path.join(__dirname, 'suite.js'),
      launchArgs: [workspace, '--disable-extensions', '--user-data-dir', path.join(ext, '.vscode-test', 'user')],
    });
  } catch (e) {
    console.error('smoke test failed:', e.message || e);
    process.exit(1);
  }
})();
