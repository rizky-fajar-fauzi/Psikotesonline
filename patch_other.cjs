const fs = require('fs');

// Patch server.ts
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(/status: 'sent',/, 'status: "sent" as const,');
fs.writeFileSync('server.ts', code);

// Patch discCalculator.ts
let calc = fs.readFileSync('src/utils/discCalculator.ts', 'utf8');
calc = calc.replace("import { AnswerSelection, ParticipantInfo } from '../types';", "import { AnswerSelection, ParticipantInfo, DISCProfile } from '../types';");
fs.writeFileSync('src/utils/discCalculator.ts', calc);
