// Copy into your main website project and run: node update-links.cjs
const fs = require('fs'), path = require('path');
const root = path.join(process.cwd(), 'src');
if (!fs.existsSync(root)) throw new Error('Run this from the main website folder containing src.');
let count = 0;
function walk(dir) {
 for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
  const file = path.join(dir,entry.name);
  if(entry.isDirectory()) walk(file);
  else if(/\.(tsx?|jsx?)$/.test(file)) {
   const original = fs.readFileSync(file,'utf8');
   const updated = original.replace(/https:\/\/discord\.gg\/RdEwzSeN/g,'https://discord.gg/aJMCvs2dNb')
    .replace(/https:\/\/forms\.gle\/iwHVEQ7zrrh1Y3Ku9/g,'https://dash.hacktheridge.ca/')
    .replace(/https:\/\/htr-dashboard2026\.pages\.dev\/auth/g,'https://dash.hacktheridge.ca/')
    .replace(/https:\/\/(?:dash\.hacktheridge\.ca|htr-dashboard2026\.pages\.dev)\/dashboard/g,'https://dash.hacktheridge.ca/');
   if(updated !== original) { fs.writeFileSync(file,updated); count++; console.log(path.relative(process.cwd(),file)); }
  }
 }
}
walk(root); console.log(`Updated ${count} source files. Build and deploy your website.`);
