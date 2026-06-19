const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('React.forwardRef') && !content.includes('import * as React')) {
          results.push(file);
        }
      }
    }
  });
  return results;
}

console.log(walk('src'));
