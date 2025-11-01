import { writeFileSync } from 'fs';
import { readFileSync } from 'fs';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const BASE_PATH = '/novo-na-live';
const distDir = join(process.cwd(), 'dist');

// Criar .nojekyll
console.log('Creating .nojekyll file...');
const nojekyllPath = join(distDir, '.nojekyll');
writeFileSync(nojekyllPath, '', 'utf8');
console.log('✓ Created .nojekyll file');

// Corrigir paths das fontes
function fixFontPathsInFile(filePath) {
  try {
    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Substituir paths de fontes que começam com /fonts/ para incluir o base path
    content = content.replace(/href="\/fonts\//g, `href="${BASE_PATH}/fonts/`);
    content = content.replace(/url\(\/fonts\//g, `url(${BASE_PATH}/fonts/`);
    
    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dir) {
  let fixedCount = 0;
  const files = readdirSync(dir);
  
  for (const file of files) {
    // Pular arquivos ocultos e o próprio .nojekyll
    if (file.startsWith('.') && file !== '.nojekyll') continue;
    
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      fixedCount += processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      if (fixFontPathsInFile(filePath)) {
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

console.log('Fixing font paths in HTML files...');
const fixedCount = processDirectory(distDir);
console.log(`✓ Fixed font paths in ${fixedCount} HTML file(s)`);
console.log('Post-build tasks completed!');

