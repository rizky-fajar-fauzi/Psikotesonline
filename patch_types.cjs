const fs = require('fs');

let calc = fs.readFileSync('src/utils/discCalculator.ts', 'utf8');
calc = calc.replace("import { AnswerSelection, DISCTally, DISCType, DISCDimension, DISCInterpretation } from '../types';", "import { AnswerSelection, DISCTally, DISCType, DISCDimension, DISCInterpretation, DISCProfile } from '../types';");
fs.writeFileSync('src/utils/discCalculator.ts', calc);

// Check if server.ts needs fixing
let server = fs.readFileSync('server.ts', 'utf8');
server = server.replace(/status: ['"]sent['"],/g, 'status: "sent" as const,');
fs.writeFileSync('server.ts', server);

console.log("Fixed types.");
