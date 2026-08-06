const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\arghy\\.gemini\\antigravity\\scratch\\solid-state-chem\\src';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('<Canvas')) return;
  if (filePath.endsWith('AppCanvas.tsx')) return;

  let newContent = content;
  
  // Remove Canvas from the @react-three/fiber import
  const r3fImportMatch = newContent.match(/import\s*\{([^}]*)\}\s*from\s*['"]@react-three\/fiber['"];?/);
  if (r3fImportMatch) {
    let namedImports = r3fImportMatch[1].split(',').map(s => s.trim());
    if (namedImports.includes('Canvas')) {
      namedImports = namedImports.filter(s => s !== 'Canvas');
      if (namedImports.length === 0) {
        newContent = newContent.replace(r3fImportMatch[0], '');
      } else {
        const newImportStr = `import { ${namedImports.join(', ')} } from '@react-three/fiber';`;
        newContent = newContent.replace(r3fImportMatch[0], newImportStr);
      }
      
      const appCanvasPath = path.resolve(dir, 'components', 'ui', 'AppCanvas');
      let relativePath = path.relative(path.dirname(filePath), appCanvasPath).replace(/\\/g, '/');
      if (!relativePath.startsWith('.')) relativePath = './' + relativePath;

      const importStatement = `import { AppCanvas as Canvas } from '${relativePath}';\n`;
      
      const r3fIndex = newContent.indexOf("@react-three/fiber");
      if (r3fIndex !== -1) {
         const endOfLine = newContent.indexOf('\n', r3fIndex);
         newContent = newContent.slice(0, endOfLine + 1) + importStatement + newContent.slice(endOfLine + 1);
      } else {
         const lastImportIndex = newContent.lastIndexOf('import ');
         if (lastImportIndex !== -1) {
            const endOfLine = newContent.indexOf('\n', lastImportIndex);
            newContent = newContent.slice(0, endOfLine + 1) + importStatement + newContent.slice(endOfLine + 1);
         } else {
            newContent = importStatement + newContent;
         }
      }
      
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated', filePath);
    }
  }
}

function walkDir(currentPath) {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    const fullPath = path.join(currentPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walkDir(dir);
