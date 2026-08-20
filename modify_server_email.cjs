const fs = require('fs');
let serverStr = fs.readFileSync('server.ts', 'utf8');

// We want to add an endpoint /api/send-participant-email
const sendParticipantEmailStr = `
app.post('/api/send-participant-email', async (req, res) => {
  try {
    const { referenceCode, email } = req.body;
    if (!referenceCode || !email) {
      return res.status(400).json({ error: 'Kode referensi dan email diperlukan' });
    }
    
    const submissions = await getSubmissions();
    const submission = submissions.find(s => s.referenceCode === referenceCode);
    
    if (!submission) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }

    const config = await getAdminConfig();
    const targetEmail = email;
    const emailSubject = \`Hasil Evaluasi Kepribadian DISC - \${submission.participant.name}\`;
    const emailBodyHtml = \`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">Hasil Evaluasi Kepribadian DISC</h2>
        </div>
        <div style="padding: 20px;">
          <p>Halo <strong>\${submission.participant.name}</strong>,</p>
          <p>Berikut adalah hasil ringkasan evaluasi kepribadian DISC Anda:</p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 10px 0;"><strong>Kode Referensi:</strong> \${submission.referenceCode}</p>
            <p style="margin: 0 0 10px 0;"><strong>Profil Kepribadian (Core):</strong> \${submission.interpretation.core?.title || '-'}</p>
            <p style="margin: 0;"><strong>Kesesuaian Karier:</strong> \${submission.interpretation.core?.jobMatch || '-'}</p>
          </div>
          <p style="margin-bottom: 20px;">\${submission.interpretation.core?.summary || '-'}</p>
          <p>Terima kasih telah mengikuti tes kepribadian kami.</p>
        </div>
      </div>
    \`;

    if (config.smtpHost && config.smtpUser && config.smtpPass) {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: config.smtpHost,
        port: config.smtpPort || 587,
        secure: config.smtpPort === 465,
        auth: {
          user: config.smtpUser,
          pass: config.smtpPass,
        },
      });
      await transporter.sendMail({
        from: config.smtpFrom || config.smtpUser,
        to: targetEmail,
        subject: emailSubject,
        html: emailBodyHtml,
      });
      console.log(\`Email sent to participant: \${targetEmail}\`);
      return res.json({ success: true, message: 'Email berhasil dikirim' });
    } else {
      console.log(\`[SIMULATED] Email sent to participant: \${targetEmail}\`);
      return res.json({ success: true, message: 'Email berhasil disimulasikan (SMTP belum dikonfigurasi)' });
    }
  } catch (err) {
    console.error('Failed to send participant email:', err);
    return res.status(500).json({ error: 'Gagal mengirim email: ' + err.message });
  }
});
`;

serverStr = serverStr.replace(
  "// Admin Routes",
  `${sendParticipantEmailStr}\n  // Admin Routes`
);

// We should also stop the automatic admin email on submission if requested "tidak otomatis".
// Let's comment out the automatic sendAdminEmailNotification in /api/submit-test
serverStr = serverStr.replace(
  "const emailRes = await sendAdminEmailNotification(config, newSubmission);",
  "// const emailRes = await sendAdminEmailNotification(config, newSubmission);\n      const emailRes = { status: 'simulated', recipient: config.adminEmail }; // Disabled automatic email"
);

fs.writeFileSync('server.ts', serverStr);
