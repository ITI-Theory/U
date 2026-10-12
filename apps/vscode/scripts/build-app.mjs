// Builds the Soma Machine (apps/instrument/visuals/soma-field-operator) into
// media/app with relative asset paths, so a VS Code webview can load it.
import { execSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const app = resolve(here, '../../instrument/visuals/soma-field-operator');
const out = resolve(here, '../media/app');
const run = cmd => execSync(cmd, { cwd: app, stdio: 'inherit' });

run('npm run generate');
run(`npx vite build --base ./ --outDir "${out}" --emptyOutDir`);
