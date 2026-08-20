const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

const newPrompt = `
    const prompt = \`Anda adalah seorang konsultan psikologi dan pakar asesmen kepribadian berpengalaman.

Berikan ringkasan eksekutif analisis kepribadian DISC untuk kandidat berikut:
Nama: \${participant.name}
Jenis Kelamin: \${participant.gender}
Email: \${participant.email}
Posisi/Jabatan: \${participant.position || 'Tidak disebutkan'}
Organisasi/Perusahaan: \${participant.organization || 'Tidak disebutkan'}

Hasil Skor DISC MMI Form A:
- Most (+): D=\${tally.most.D}, I=\${tally.most.I}, S=\${tally.most.S}, C=\${tally.most.C}, X=\${tally.most.X || 0}
- Least (-): D=\${tally.least.D}, I=\${tally.least.I}, S=\${tally.least.S}, C=\${tally.least.C}, X=\${tally.least.X || 0}
- Net (Change): D=\${tally.change.D}, I=\${tally.change.I}, S=\${tally.change.S}, C=\${tally.change.C}

Hasil Analisis 3 Grafik (Norma DISC):
1. Grafik 1 (Mask / Public Self): \${interp.mask?.title || 'Transisi'} (\${interp.mask?.code || 'N/A'})
2. Grafik 2 (Core / Private Self): \${interp.core?.title || 'Transisi'} (\${interp.core?.code || 'N/A'})
3. Grafik 3 (Mirror / Perceived Self): \${interp.mirror?.title || 'Transisi'} (\${interp.mirror?.code || 'N/A'})

Tolong tuliskan Laporan Singkat Evaluasi Kepribadian (berdasarkan kombinasi 3 Grafik) dalam bahasa Indonesia yang mencakup:
1. Ringkasan Karakter Utama & Gaya Perilaku (Fokus ke Grafik 3)
2. Tekanan/Kesenjangan antara Perilaku Asli (Grafik 2) dan Adaptasi (Grafik 1)
3. Kekuatan Utama dalam Tim
4. Area Pengembangan / Potensi Risiko
5. Kesesuaian Aktivitas / Peran yang Ideal

Tulis dalam format paragraf dan poin-poin yang profesional dan mudah dibaca oleh HR & Evaluator.\`;
`;

server = server.replace(/const prompt = `Anda adalah seorang konsultan psikologi[\s\S]*?Evaluator.`;/s, newPrompt.trim());
fs.writeFileSync('server.ts', server);
