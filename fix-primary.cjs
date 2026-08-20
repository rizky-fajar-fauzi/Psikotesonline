const fs = require('fs');
let utils = fs.readFileSync('src/utils/discCalculator.ts', 'utf8');

utils = utils.replace("primaryType: 'D',", "primaryType: mirror.code,");

fs.writeFileSync('src/utils/discCalculator.ts', utils);
