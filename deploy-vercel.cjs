const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
const vercelOutputDir = path.join(__dirname, '.vercel', 'output');

if (fs.existsSync(distPath)) {
  fs.mkdirSync(path.dirname(vercelOutputDir), { recursive: true });
  if (fs.existsSync(vercelOutputDir)) {
    fs.rmSync(vercelOutputDir, { recursive: true, force: true });
  }
  fs.cpSync(distPath, vercelOutputDir, { recursive: true });
  console.log('Copied dist to .vercel/output for Vercel deployment.');
}
