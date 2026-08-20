const fs = require('fs');
let utils = fs.readFileSync('src/utils/discCalculator.ts', 'utf8');

utils = utils.replace('Record<string, { title: string; traits: string[]; job_match: string }>', 'Record<string, { title: string; traits: string[]; job_match: string; summary: string }>');

fs.writeFileSync('src/utils/discCalculator.ts', utils);
