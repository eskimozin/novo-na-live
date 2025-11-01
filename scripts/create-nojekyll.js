import { writeFileSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist', '.nojekyll');
writeFileSync(distPath, '', 'utf8');
console.log('Created .nojekyll file');

