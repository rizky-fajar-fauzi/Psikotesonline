const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(/@media print\s*{\s*body\s*{\s*display:\s*none\s*!important;\s*}\s*}/g, '');
fs.writeFileSync('src/index.css', css);
