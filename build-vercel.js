import fs from 'fs';
import path from 'path';

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  console.log("Preparing Vercel output...");
  fs.mkdirSync(".vercel/output", { recursive: true });

  fs.mkdirSync(".vercel/output/static", { recursive: true });
  copyDir("dist/client", ".vercel/output/static");

  fs.mkdirSync(".vercel/output/functions/__server.func", { recursive: true });
  copyDir("dist/server", ".vercel/output/functions/__server.func");

  fs.copyFileSync("dist/config.json", ".vercel/output/config.json");

  console.log("Vercel output ready!");
} catch (e) {
  console.error("Error creating Vercel output:", e);
  process.exit(1);
}
