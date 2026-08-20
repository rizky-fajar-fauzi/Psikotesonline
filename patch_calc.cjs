const fs = require('fs');

// Patch discCalculator.ts
let calc = fs.readFileSync('src/utils/discCalculator.ts', 'utf8');
calc = calc.replace("primaryType: mirror.code,", "primaryType: mirror.code as any,");
fs.writeFileSync('src/utils/discCalculator.ts', calc);

// Patch server.ts
let server = fs.readFileSync('server.ts', 'utf8');
server = server.replace(/status: 'sent'/g, 'status: "sent" as const');
server = server.replace(/status: "sent"/g, 'status: "sent" as const');
server = server.replace(/status: "sent" as const as const/g, 'status: "sent" as const');
fs.writeFileSync('server.ts', server);

console.log("Patched again.");
