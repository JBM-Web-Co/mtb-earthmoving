import { build } from 'esbuild';
import { readdirSync } from 'fs';
import { join } from 'path';

const emailDir = 'api/_src/emails';

const files = readdirSync(emailDir)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => join(emailDir, f));

await build({
    entryPoints: files,
    outdir: emailDir,
    format: 'esm',
    jsx: 'automatic',
    platform: 'node',
    bundle: false,
});
