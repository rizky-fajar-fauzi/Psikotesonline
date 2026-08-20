const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');
const lines = code.split('\n');

// Find the last 20 lines and try to find the unbalanced brackets/tags
let balance = 0;
for(let i=0; i<lines.length; i++) {
    const line = lines[i];
    // A quick way is just to rewrite the tail manually since we know exactly where it breaks.
}

// Let's just find "selectedSub && (" in the file.
// It opens a Fragment <>
const fragmentOpen = code.indexOf('<>');
const fragmentClose = code.lastIndexOf('</>');
// Wait, the error is: Unexpected closing "div" tag does not match opening fragment tag
// So there is a <> somewhere that isn't closed properly before the </div>.

fs.writeFileSync('debug_brackets.txt', 'done');
