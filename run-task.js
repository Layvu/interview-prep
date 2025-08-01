import { join } from 'path';
import { execSync } from 'child_process';

const folder = process.argv[2];
const task = process.argv[3];

if (!folder || !task) {
    console.error('Usage: npm run <js|ts|algo> <task-name>');
    process.exit(1);
}

const ext = folder === 'ts' ? '.ts' : '.js';
const cmd = folder === 'ts' ? 'ts-node' : 'node';
const file = join(folder, `${task}${ext}`);

try {
    execSync(`${cmd} ${file}`, { stdio: 'inherit' });
} catch (err) {
    console.error(`Error running ${file}: ${err.message}`);
    process.exit(1);
}
