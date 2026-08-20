const fs = require('fs');
let types = fs.readFileSync('src/types.ts', 'utf8');
types = types.replace(
  /export interface DISCProfile \{[\s\S]*?\}/,
  `export interface DISCProfile {\n  code: string;\n  title: string;\n  summary: string;\n  typeCount: string;\n  traits: string[];\n  jobMatch: string;\n}`
);
fs.writeFileSync('src/types.ts', types);
