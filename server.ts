import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import nodemailer from 'nodemailer';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { calculateDISCTally, determineDISCInterpretation } from './src/utils/discCalculator';
import { AdminConfig, DISCSubmission, ParticipantInfo, AnswerSelection } from './src/types';

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

// Ensure data directory exists
async function initStorage() {
  try {
    if (!existsSync(DATA_DIR)) {
      await fs.mkdir(DATA_DIR, { recursive: true });
    }
    if (!existsSync(SUBMISSIONS_FILE)) {
      await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
    if (!existsSync(CONFIG_FILE)) {
      const defaultConfig: AdminConfig = {
        adminEmail: 'risky.fauzifajar@gmail.com',
        pin: 'K33SPIRIT',
        smtpFrom: '"Assessment System" <noreply@assessment.com>',
      };
      await fs.writeFile(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2), 'utf-8');
    } else {
      try {
        const raw = await fs.readFile(CONFIG_FILE, 'utf-8');
        const cfg = JSON.parse(raw);
        if (cfg.pin === '1234') {
          cfg.pin = 'K33SPIRIT';
          await fs.writeFile(CONFIG_FILE, JSON.stringify(cfg, null, 2), 'utf-8');
        }
      } catch (e) {
        // Ignore parse error
      }
    }
  } catch (err) {
    console.error('Failed to initialize storage:', err);
  }
}

async function getSubmissions(): Promise<DISCSubmission[]> {
  try {
    await initStorage();
    const data = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading submissions:', err);
    return [];
  }
}

async function saveSubmission(submission: DISCSubmission): Promise<void> {
  await initStorage();
  const submissions = await getSubmissions();
  submissions.unshift(submission); // Newest first
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
}

async function getAdminConfig(): Promise<AdminConfig> {
  try {
    await initStorage();
    const data = await fs.readFile(CONFIG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return {
      adminEmail: 'risky.fauzifajar@gmail.com',
      pin: 'K33SPIRIT',
      smtpFrom: '"Assessment System" <noreply@assessment.com>',
    };
  }
}

async function saveAdminConfig(config: AdminConfig): Promise<void> {
  await initStorage();
  await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

// Generate AI HR Summary using Gemini API
async function generateAiHRSummary(
  participant: ParticipantInfo,
  tally: any,
  interp: any
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return `Kandidat ${participant.name} memiliki profil dominan Tipe ${interp.primaryType} (${interp.title}). Menunjukkan kecenderungan ${interp.summary} Disarankan untuk posisi ${interp.recommendedRoles.join(', ')}.`;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
Anda adalah seorang konsultan psikologi dan pakar asesmen kepribadian berpengalaman.
Berikan ringkasan eksekutif analisis kepribadian DISC untuk kandidat berikut:

Nama: ${participant.name}
Jenis Kelamin: ${participant.gender}
Email: ${participant.email}
Posisi/Jabatan: ${participant.position || 'Tidak disebutkan'}
Organisasi/Perusahaan: ${participant.organization || 'Tidak disebutkan'}

Hasil Skor DISC MMI Form A:
- Most (+): D=${tally.most.D}, I=${tally.most.I}, S=${tally.most.S}, C=${tally.most.C}, X=${tally.most.X || 0} (Total: ${tally.most.D + tally.most.I + tally.most.S + tally.most.C + (tally.most.X || 0)})
- Least (-): D=${tally.least.D}, I=${tally.least.I}, S=${tally.least.S}, C=${tally.least.C}, X=${tally.least.X || 0} (Total: ${tally.least.D + tally.least.I + tally.least.S + tally.least.C + (tally.least.X || 0)})
- Net (Change): D=${tally.change.D}, I=${tally.change.I}, S=${tally.change.S}, C=${tally.change.C}

Tipe Dominan: Tipe ${interp.primaryType} (${interp.title}) ${interp.secondaryType ? `dengan sekunder Tipe ${interp.secondaryType}` : ''}

Tolong tuliskan Laporan Singkat Evaluasi dalam bahasa Indonesia yang mencakup:
1. Ringkasan Karakter Utama & Gaya Perilaku
2. Kekuatan Utama dalam Tim
3. Area Pengembangan / Potensi Risiko
4. Rekomendasi Cara Memimpin / Komunikasi dengan Kandidat Ini
5. Kesesuaian Aktivitas / Peran yang Ideal

Tulis dalam format poin-poin yang mudah dibaca oleh Admin & Evaluator.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || 'Ringkasan AI berhasil dibuat.';
  } catch (err) {
    console.error('Gemini API Error:', err);
    return `Kandidat ${participant.name} memiliki profil dominan Tipe ${interp.primaryType} (${interp.title}). Menunjukkan kecenderungan ${interp.summary}`;
  }
}

// Function to send email notification to Admin
async function sendAdminEmailNotification(
  config: AdminConfig,
  submission: DISCSubmission
): Promise<{ status: "sent" | "failed" | "simulated"; recipient: string }> {
  const targetEmail = config.adminEmail || 'risky.fauzifajar@gmail.com';

  const emailSubject = `[HASIL TES DISC] ${submission.participant.name} - ${submission.interpretation.primaryType} (${submission.referenceCode})`;

  const emailBodyHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; borderRadius: 8px; overflow: hidden; color: #1e293b;">
    <div style="background-color: #1e3a8a; padding: 24px; text-align: center; color: #ffffff;">
      <h1 style="margin: 0; font-size: 22px; font-weight: bold;">Laporan Hasil Tes Kepribadian</h1>
      <p style="margin-top: 8px; margin-bottom: 0; opacity: 0.9; font-size: 14px;">Kode Referensi: ${submission.referenceCode}</p>
    </div>

    <div style="padding: 24px; background-color: #ffffff;">
      <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
        <h2 style="margin-top: 0; font-size: 16px; color: #1e3a8a;">Data Peserta Tes</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
          <tr><td style="width: 140px; font-weight: bold; color: #64748b;">Nama Lengkap:</td><td><strong>${submission.participant.name}</strong></td></tr>
          <tr><td style="font-weight: bold; color: #64748b;">Email Peserta:</td><td>${submission.participant.email}</td></tr>
          <tr><td style="font-weight: bold; color: #64748b;">No HP / WhatsApp:</td><td>${submission.participant.phone || '-'}</td></tr>
          <tr><td style="font-weight: bold; color: #64748b;">Jenis Kelamin:</td><td>${submission.participant.gender}</td></tr>
          <tr><td style="font-weight: bold; color: #64748b;">Posisi / Jabatan:</td><td>${submission.participant.position || '-'}</td></tr>
          <tr><td style="font-weight: bold; color: #64748b;">Organisasi / PT:</td><td>${submission.participant.organization || '-'}</td></tr>
          <tr><td style="font-weight: bold; color: #64748b;">Waktu Pengerjaan:</td><td>${new Date(submission.createdAt).toLocaleString('id-ID')}</td></tr>
        </table>
      </div>

      <div style="margin-bottom: 24px; text-align: center; padding: 16px; background-color: #eff6ff; border-radius: 8px;">
        <span style="font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #2563eb;">Hasil Analisis 3 Grafik Kepribadian</span>
        <div style="text-align: left; margin-top: 12px;">
          <p style="margin: 4px 0; color: #1e3a8a; font-size: 16px;"><strong>Grafik 1 (Mask / Public Self):</strong> ${submission.interpretation.mask?.title} (${submission.interpretation.mask?.code})</p>
          <p style="margin: 4px 0; color: #1e3a8a; font-size: 16px;"><strong>Grafik 2 (Core / Private Self):</strong> ${submission.interpretation.core?.title} (${submission.interpretation.core?.code})</p>
          <p style="margin: 4px 0; color: #1e3a8a; font-size: 16px;"><strong>Grafik 3 (Mirror / Perceived Self):</strong> ${submission.interpretation.mirror?.title} (${submission.interpretation.mirror?.code})</p>
        </div>
      </div>

      <h3 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; font-size: 16px;">Ringkasan Skor DISC (Tally MMI)</h3>
      <table style="width: 100%; border-collapse: collapse; text-align: center; margin-bottom: 8px; font-size: 14px;">
        <thead>
          <tr style="background-color: #f1f5f9; color: #334155;">
            <th style="padding: 10px; border: 1px solid #e2e8f0; text-align: left;">Skor</th>
            <th style="padding: 10px; border: 1px solid #e2e8f0; color: #dc2626;">D (Dominance)</th>
            <th style="padding: 10px; border: 1px solid #e2e8f0; color: #d97706;">I (Influence)</th>
            <th style="padding: 10px; border: 1px solid #e2e8f0; color: #16a34a;">S (Steadiness)</th>
            <th style="padding: 10px; border: 1px solid #e2e8f0; color: #2563eb;">C (Conscientiousness)</th>
            <th style="padding: 10px; border: 1px solid #e2e8f0; color: #475569;">X (◆)</th>
            <th style="padding: 10px; border: 1px solid #e2e8f0; background-color: #e2e8f0; color: #0f172a;">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; text-align: left; background-color: #fffbeb;">1 ➔ Most (+)</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submission.tally.most.D}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submission.tally.most.I}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submission.tally.most.S}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submission.tally.most.C}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submission.tally.most.X || 0}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; background-color: #d1fae5; color: #065f46;">
              ${submission.tally.most.D + submission.tally.most.I + submission.tally.most.S + submission.tally.most.C + (submission.tally.most.X || 0)}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; text-align: left; background-color: #eff6ff;">2 ➔ Least (-)</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submission.tally.least.D}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submission.tally.least.I}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submission.tally.least.S}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submission.tally.least.C}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submission.tally.least.X || 0}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; background-color: #d1fae5; color: #065f46;">
              ${submission.tally.least.D + submission.tally.least.I + submission.tally.least.S + submission.tally.least.C + (submission.tally.least.X || 0)}
            </td>
          </tr>
          <tr style="background-color: #f8fafc; font-weight: bold;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: left;">3 ➔ Net (Change)</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submission.tally.change.D}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submission.tally.change.I}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submission.tally.change.S}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${submission.tally.change.C}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0; background-color: #e2e8f0; color: #94a3b8;">—</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0; background-color: #f1f5f9; color: #94a3b8; font-weight: normal;">N/A</td>
          </tr>
        </tbody>
      </table>
      <p style="font-size: 11px; color: #64748b; font-style: italic; margin-bottom: 24px;">* Total Most dan Least masing-masing bernilai 24. Poin X (◆) tidak dihitung pada Row 3 (Change).</p>

      ${
        submission.aiSummary
          ? `
      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <h3 style="margin-top: 0; color: #166534; font-size: 16px;">Analisis AI HR Executive Summary</h3>
        <div style="font-size: 14px; line-height: 1.6; color: #14532d; white-space: pre-line;">${submission.aiSummary}</div>
      </div>
      `
          : ''
      }

      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 12px;">
        <p style="margin: 0;">Sistem Pengujian Kepribadian Online.</p>
        <p style="margin: 4px 0 0 0;">Laporan ini dikirim otomatis oleh sistem untuk Admin & Evaluator.</p>
      </div>
    </div>
  </div>
  `;

  // If SMTP configuration is provided in config or env
  if (config.smtpHost && config.smtpUser && config.smtpPass) {
    try {
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

      console.log(`Email successfully sent via SMTP to ${targetEmail}`);
      return { status: "sent", recipient: targetEmail };
    } catch (err) {
      console.error('Failed to send email via SMTP:', err);
      return { status: 'failed', recipient: targetEmail };
    }
  } else {
    // If no custom SMTP credentials, log simulated email dispatch
    console.log(`[SIMULATED EMAIL DISPATCH] To: ${targetEmail}, Subject: ${emailSubject}`);
    return { status: 'simulated', recipient: targetEmail };
  }
}

async function startServer() {
  await initStorage();
  const app = express();
  app.use(express.json());

  // API Routes

  // Submit test endpoint
  app.post('/api/submit-test', async (req, res) => {
    try {
      const { participant, answers } = req.body as {
        participant: ParticipantInfo;
        answers: Record<number, AnswerSelection>;
      };

      if (!participant || !participant.name || !participant.email || !answers) {
        return res.status(400).json({ error: 'Data peserta dan jawaban tes tidak lengkap' });
      }

      // Calculate DISC scores
      const tally = calculateDISCTally(answers);
      const interp = determineDISCInterpretation(tally);

      // Generate AI HR Summary
      const aiSummary = await generateAiHRSummary(participant, tally, interp);

      const refCode = `DISC-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

      const config = await getAdminConfig();

      const newSubmission: DISCSubmission = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
        referenceCode: refCode,
        participant,
        answers,
        tally,
        interpretation: interp,
        aiSummary,
        createdAt: new Date().toISOString(),
        emailSentStatus: 'simulated',
        emailSentTo: config.adminEmail || 'risky.fauzifajar@gmail.com',
      };

      // Send email notification to Admin
      // const emailRes = await sendAdminEmailNotification(config, newSubmission);
      const emailRes = { status: 'simulated', recipient: config.adminEmail }; // Disabled automatic email
      newSubmission.emailSentStatus = emailRes.status;
      newSubmission.emailSentTo = emailRes.recipient;

      // Save submission to database
      await saveSubmission(newSubmission);

      // Send data to Google Sheets Webhook
      try {
        const webhookUrl = 'https://script.google.com/macros/s/AKfycbxh_OwAy6FSmw1q4RjUda9Ab4COD9yRRzydD54heqsLHQeRt-5uie0JK0qnP6fMsQUSzw/exec';
        const webhookPayload = {
          name: participant.name,
          email: participant.email,
          position: participant.position || '-',
          scoreD: `M:${tally.most.D} L:${tally.least.D} (Net: ${tally.change.D})`,
          scoreI: `M:${tally.most.I} L:${tally.least.I} (Net: ${tally.change.I})`,
          scoreS: `M:${tally.most.S} L:${tally.least.S} (Net: ${tally.change.S})`,
          scoreC: `M:${tally.most.C} L:${tally.least.C} (Net: ${tally.change.C})`,
          profile: interp.title,
          ticketId: refCode
        };
        
        await fetch(webhookUrl, {
          method: 'POST',
          // Note: Google Apps Script Webhooks typically require either text/plain,
          // or we just send it and ignore the CORS preflight since it's server-to-server.
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(webhookPayload)
        });
        console.log(`[Webhook] Data sent to Google Sheets for ${participant.name}`);
      } catch (webhookErr) {
        console.error('[Webhook Error] Failed to send data to Google Sheets:', webhookErr);
      }

      // CRITICAL SECURITY RULE FOR CANDIDATE:
      // Do NOT send back DISC scores, tallies, or detailed profile interpretation to participant!
      // Return ONLY confirmation reference code and participant name!
      return res.json({
        success: true,
        referenceCode: refCode,
        participantName: participant.name,
        result: {
          tally: newSubmission.tally,
          interpretation: newSubmission.interpretation
        },
        message:
          'Tes Anda telah berhasil diselesaikan dan disimpan. Hasil tes telah dikirimkan secara otomatis ke tim Admin.',
      });
    } catch (err: any) {
      console.error('Error handling test submission:', err);
      return res.status(500).json({ error: 'Gagal memproses tes: ' + err.message });
    }
  });

  
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
    const emailSubject = `Hasil Evaluasi Kepribadian DISC - ${submission.participant.name}`;
    const emailBodyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">Hasil Evaluasi Kepribadian DISC</h2>
        </div>
        <div style="padding: 20px;">
          <p>Halo <strong>${submission.participant.name}</strong>,</p>
          <p>Berikut adalah hasil ringkasan evaluasi kepribadian DISC Anda:</p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 10px 0;"><strong>Kode Referensi:</strong> ${submission.referenceCode}</p>
            <p style="margin: 0 0 10px 0;"><strong>Profil Kepribadian (Core):</strong> ${submission.interpretation.core?.title || '-'}</p>
            <p style="margin: 0;"><strong>Kesesuaian Karier:</strong> ${submission.interpretation.core?.jobMatch || '-'}</p>
          </div>
          <p style="margin-bottom: 20px;">${submission.interpretation.core?.summary || '-'}</p>
          <p>Terima kasih telah mengikuti tes kepribadian kami.</p>
        </div>
      </div>
    `;

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
      console.log(`Email sent to participant: ${targetEmail}`);
      return res.json({ success: true, message: 'Email berhasil dikirim' });
    } else {
      console.log(`[SIMULATED] Email sent to participant: ${targetEmail}`);
      return res.json({ success: true, message: 'Email berhasil disimulasikan (SMTP belum dikonfigurasi)' });
    }
  } catch (err) {
    console.error('Failed to send participant email:', err);
    return res.status(500).json({ error: 'Gagal mengirim email: ' + err.message });
  }
});

  // Admin Routes
  app.post('/api/admin/verify-pin', async (req, res) => {
    const { pin } = req.body;
    const config = await getAdminConfig();
    if (pin === config.pin) {
      return res.json({ valid: true });
    }
    return res.status(401).json({ valid: false, message: 'PIN Admin tidak valid' });
  });

  app.get('/api/admin/submissions', async (req, res) => {
    try {
      const submissions = await getSubmissions();
      res.json(submissions);
    } catch (err: any) {
      res.status(500).json({ error: 'Gagal mengambil data peserta: ' + err.message });
    }
  });

    app.delete('/api/admin/submissions/:id', async (req, res) => {
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
          console.log(`[Webhook] Delete signal sent for ${targetSub.referenceCode}`);
        } catch (webhookErr) {
          console.error('[Webhook Error] Failed to send delete signal:', webhookErr);
        }
      }

      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: 'Gagal menghapus data: ' + err.message });
    }
  });

  app.post('/api/admin/resend-email/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { customEmail } = req.body;
      const submissions = await getSubmissions();
      const subIndex = submissions.findIndex((s) => s.id === id);
      if (subIndex === -1) {
        return res.status(404).json({ error: 'Data peserta tidak ditemukan' });
      }

      const config = await getAdminConfig();
      if (customEmail) {
        config.adminEmail = customEmail;
      }

      const emailRes = await sendAdminEmailNotification(config, submissions[subIndex]);
      submissions[subIndex].emailSentStatus = emailRes.status;
      submissions[subIndex].emailSentTo = emailRes.recipient;

      await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');

      res.json({ success: true, emailSentStatus: emailRes.status, recipient: emailRes.recipient });
    } catch (err: any) {
      res.status(500).json({ error: 'Gagal mengirim ulang email: ' + err.message });
    }
  });

  app.get('/api/admin/config', async (req, res) => {
    try {
      const config = await getAdminConfig();
      // Mask password in response for security
      const safeConfig = { ...config, smtpPass: config.smtpPass ? '********' : '' };
      res.json(safeConfig);
    } catch (err: any) {
      res.status(500).json({ error: 'Gagal mengambil konfigurasi: ' + err.message });
    }
  });

  app.post('/api/admin/config', async (req, res) => {
    try {
      const newConfig = req.body as AdminConfig;
      const currentConfig = await getAdminConfig();

      // If password wasn't updated, keep previous password
      if (newConfig.smtpPass === '********') {
        newConfig.smtpPass = currentConfig.smtpPass;
      }

      await saveAdminConfig(newConfig);
      res.json({ success: true, config: newConfig });
    } catch (err: any) {
      res.status(500).json({ error: 'Gagal menyimpan konfigurasi: ' + err.message });
    }
  });

  // Vite Middleware integration for dev / static in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    
    // Explicit SPA fallback for development to handle direct navigation
    app.use('*', async (req, res, next) => {
      // Don't catch API requests
      if (req.originalUrl.startsWith('/api')) {
        return next();
      }
      try {
        let template = await fs.readFile(path.join(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use('*', (req, res, next) => {
      // Don't catch API requests
      if (req.originalUrl.startsWith('/api')) {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
