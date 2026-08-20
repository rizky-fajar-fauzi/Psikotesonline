const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

const newEmailHtml = `
      <div style="margin-bottom: 24px; text-align: center; padding: 16px; background-color: #eff6ff; border-radius: 8px;">
        <span style="font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #2563eb;">Hasil Analisis 3 Grafik Kepribadian</span>
        <div style="text-align: left; margin-top: 12px;">
          <p style="margin: 4px 0; color: #1e3a8a; font-size: 16px;"><strong>Grafik 1 (Mask / Public Self):</strong> \${submission.interpretation.mask?.title} (\${submission.interpretation.mask?.code})</p>
          <p style="margin: 4px 0; color: #1e3a8a; font-size: 16px;"><strong>Grafik 2 (Core / Private Self):</strong> \${submission.interpretation.core?.title} (\${submission.interpretation.core?.code})</p>
          <p style="margin: 4px 0; color: #1e3a8a; font-size: 16px;"><strong>Grafik 3 (Mirror / Perceived Self):</strong> \${submission.interpretation.mirror?.title} (\${submission.interpretation.mirror?.code})</p>
        </div>
      </div>
`;

server = server.replace(/<div style="margin-bottom: 24px; text-align: center; padding: 16px; background-color: #eff6ff; border-radius: 8px;">[\s\S]*?<\/div>/s, newEmailHtml.trim());
fs.writeFileSync('server.ts', server);
