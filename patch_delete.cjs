const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const oldDeleteRoute = `  app.delete('/api/admin/submissions/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const submissions = await getSubmissions();
      const filtered = submissions.filter((s) => s.id !== id);
      await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: 'Gagal menghapus data: ' + err.message });
    }
  });`;

const newDeleteRoute = `  app.delete('/api/admin/submissions/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const submissions = await getSubmissions();
      
      // Find the target submission before deleting
      const targetSub = submissions.find(s => s.id === id);
      
      const filtered = submissions.filter((s) => s.id !== id);
      await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
      
      // Also send a delete signal to the Google Sheets Webhook (Database)
      if (targetSub) {
        try {
          const webhookUrl = 'https://script.google.com/macros/s/AKfycbxh_OwAy6FSmw1q4RjUda9Ab4COD9yRRzydD54heqsLHQeRt-5uie0JK0qnP6fMsQUSzw/exec';
          await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              action: 'delete',
              ticketId: targetSub.referenceCode,
              id: targetSub.id
            })
          });
          console.log(\`[Webhook] Delete signal sent for \${targetSub.referenceCode}\`);
        } catch (webhookErr) {
          console.error('[Webhook Error] Failed to send delete signal:', webhookErr);
        }
      }

      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: 'Gagal menghapus data: ' + err.message });
    }
  });`;

if (code.includes("app.delete('/api/admin/submissions/:id'")) {
    // We can't just replace oldDeleteRoute because whitespace might differ slightly.
    // Let's use regex.
    code = code.replace(/app\.delete\('\/api\/admin\/submissions\/:id',[\s\S]*?res\.status\(500\)\.json\({ error: 'Gagal menghapus data: ' \+ err\.message }\);\s*}\s*}\);/, newDeleteRoute);
    fs.writeFileSync('server.ts', code);
    console.log("Patched server.ts successfully");
} else {
    console.log("Could not find delete route");
}
