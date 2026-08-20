const fs = require('fs');
let text = fs.readFileSync('src/components/MmiFormAGridView.tsx', 'utf8');
text = text.replace('Tipe {interpretation.primaryType} - {interpretation.title}', 'Tipe {interpretation.mirror?.code || interpretation.primaryType} - {interpretation.mirror?.title || interpretation.title}');
text = text.replace('{interpretation.summary}', '{interpretation.mirror?.summary || interpretation.summary}');
text = text.replace('{interpretation.primaryType}</span>', '{interpretation.mirror?.code || interpretation.primaryType}</span>');
fs.writeFileSync('src/components/MmiFormAGridView.tsx', text);
