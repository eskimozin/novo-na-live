import { readFileSync, writeFileSync } from 'fs';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const BASE_PATH = '/novo-na-live';
const distDir = join(process.cwd(), 'dist');

function fixFontPathsInFile(filePath) {
  try {
    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Substituir paths de fontes que começam com /fonts/ para incluir o base path
    content = content.replace(/href="\/fonts\//g, `href="${BASE_PATH}/fonts/`);
    content = content.replace(/url\(\/fonts\//g, `url(${BASE_PATH}/fonts/`);
    
    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed font paths in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dir) {
  const files = readdirSync(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      fixFontPathsInFile(filePath);
    }
  }
}

console.log('Fixing font paths in HTML files...');
processDirectory(distDir);
console.log('Done!');

