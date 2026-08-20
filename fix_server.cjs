const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

// Fix the return type definition
server = server.replace(/status: "sent" as const \| 'failed' \| 'simulated'/g, 'status: "sent" | "failed" | "simulated"');

// Fix the returned object 
server = server.replace(/status: "sent" as const as const/g, 'status: "sent"');
server = server.replace(/status: "sent" as const,/g, 'status: "sent",');
server = server.replace(/status: "sent"/g, 'status: "sent"');

fs.writeFileSync('server.ts', server);
console.log("Fixed server.ts syntax");
