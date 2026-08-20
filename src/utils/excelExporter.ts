import * as XLSX from 'xlsx';
import { DISCSubmission } from '../types';
import { discQuestions } from '../data/discQuestions';

/**
 * Exports a single submission into an Excel file (.xlsx) matching the web assessment layout.
 */
export function exportSingleSubmissionToExcel(submission: DISCSubmission) {
  const wb = XLSX.utils.book_new();
  const ws = createMmiFormAWorksheet(submission);
  const safeName = submission.participant.name.replace(/[/\\?%*:|"<>]/g, '_').slice(0, 25);
  XLSX.utils.book_append_sheet(wb, ws, `DISC - ${safeName}`);
  
  // Save file
  const fileName = `Tes_Kepribadian_DISC_${safeName}_${submission.referenceCode}.xlsx`;
  XLSX.writeFile(wb, fileName);
}

/**
 * Exports all submissions into a single Excel workbook.
 * Creates a "Master Summary" sheet + individual DISC sheets for each candidate.
 */
export function exportAllSubmissionsToExcel(submissions: DISCSubmission[]) {
  if (submissions.length === 0) return;

  const wb = XLSX.utils.book_new();

  // 1. Master Summary Sheet
  const summaryHeaders = [
    'No',
    'Kode Ref',
    'Tanggal Tes',
    'Nama Peserta',
    'Usia',
    'Jenis Kelamin',
    'No HP / WA',
    'Email',
    'Jabatan / Posisi',
    'Organisasi / PT',
    'Tipe Utama (DISC)',
    'Judul Profil',
    'Skor Most D',
    'Skor Most I',
    'Skor Most S',
    'Skor Most C',
    'Skor Most X',
    'Skor Least D',
    'Skor Least I',
    'Skor Least S',
    'Skor Least C',
    'Skor Least X',
    'Net D',
    'Net I',
    'Net S',
    'Net C',
    'Net X',
    'Status Email Laporan'
  ];

  const summaryRows = submissions.map((s, idx) => [
    idx + 1,
    s.referenceCode,
    new Date(s.createdAt).toLocaleDateString('id-ID'),
    s.participant.name,
    s.participant.age ? `${s.participant.age} th` : '-',
    s.participant.gender,
    s.participant.phone || '-',
    s.participant.email,
    s.participant.position || '-',
    s.participant.organization || '-',
    s.interpretation.primaryType,
    s.interpretation.title,
    s.tally.most.D,
    s.tally.most.I,
    s.tally.most.S,
    s.tally.most.C,
    s.tally.most.X || 0,
    s.tally.least.D,
    s.tally.least.I,
    s.tally.least.S,
    s.tally.least.C,
    s.tally.least.X || 0,
    s.tally.change.D,
    s.tally.change.I,
    s.tally.change.S,
    s.tally.change.C,
    s.tally.change.X || 0,
    s.emailSentStatus
  ]);

  const summaryWs = XLSX.utils.aoa_to_sheet([
    ['REKAPITULASI HASIL TES KEPRIBADIAN D.I.S.C.'],
    ['Sistem Evaluasi Digital Assessment - Form A'],
    [`Tanggal Export: ${new Date().toLocaleString('id-ID')}`],
    [],
    summaryHeaders,
    ...summaryRows
  ]);

  summaryWs['!cols'] = [
    { wch: 5 },  // No
    { wch: 14 }, // Kode Ref
    { wch: 14 }, // Tanggal Tes
    { wch: 25 }, // Nama Peserta
    { wch: 8 },  // Usia
    { wch: 14 }, // Jenis Kelamin
    { wch: 15 }, // No HP / WA
    { wch: 25 }, // Email
    { wch: 20 }, // Jabatan / Posisi
    { wch: 22 }, // Organisasi / PT
    { wch: 18 }, // Tipe Utama (DISC)
    { wch: 25 }, // Judul Profil
    { wch: 12 }, // Most D
    { wch: 12 }, // Most I
    { wch: 12 }, // Most S
    { wch: 12 }, // Most C
    { wch: 12 }, // Most X
    { wch: 12 }, // Least D
    { wch: 12 }, // Least I
    { wch: 12 }, // Least S
    { wch: 12 }, // Least C
    { wch: 12 }, // Least X
    { wch: 10 }, // Net D
    { wch: 10 }, // Net I
    { wch: 10 }, // Net S
    { wch: 10 }, // Net C
    { wch: 10 }, // Net X
    { wch: 20 }, // Status Email
  ];

  XLSX.utils.book_append_sheet(wb, summaryWs, 'Master Rekapitulasi');

  // 2. Individual Form sheets (up to 30 sheets max to avoid Excel lag)
  submissions.slice(0, 30).forEach((sub, idx) => {
    const ws = createMmiFormAWorksheet(sub);
    const safeName = `${idx + 1}. ${sub.participant.name.replace(/[/\\?%*:|"<>]/g, '_').slice(0, 20)}`;
    XLSX.utils.book_append_sheet(wb, ws, safeName);
  });

  XLSX.writeFile(wb, `Hasil_Tes_Kepribadian_DISC_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

/**
 * Helper to construct a clean Worksheet layout matching the web DISC assessment view.
 */
function createMmiFormAWorksheet(submission: DISCSubmission): XLSX.WorkSheet {
  const aoa: (string | number)[][] = [];

  // Header Title Bar
  aoa.push(['TES KEPRIBADIAN D.I.S.C.', '', '', '', '', '', '', '', '', '', '', '', '', '']);
  aoa.push(['Formulir Hasil & Lembar Jawaban Assessment - MMI Form A', '', '', '', '', '', '', '', '', '', '', '', '', '']);
  aoa.push([]);

  // Participant Metadata & Instructions
  const formattedDate = (() => {
    try {
      const d = new Date(submission.participant.date);
      return isNaN(d.getTime()) ? submission.participant.date : d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return submission.participant.date;
    }
  })();

  aoa.push(['INFORMASI PESERTA', '', '', '', 'INSTRUKSI :']);
  aoa.push(['Nama Lengkap', submission.participant.name, '', '', '1. Kolom [P] = Pernyataan PALING menggambarkan diri']);
  aoa.push(['Usia', submission.participant.age ? `${submission.participant.age} th` : '-', '', '', '2. Kolom [K] = Pernyataan PALING TIDAK menggambarkan diri']);
  aoa.push(['Jenis Kelamin', submission.participant.gender === 'Pria' ? 'LAKI-LAKI' : 'PEREMPUAN', '', '', 'Setiap nomor terdapat tepat 1 pilihan [P] dan 1 pilihan [K]']);
  aoa.push(['Tanggal Tes', formattedDate, '', '', '']);
  aoa.push(['Jabatan / Posisi', submission.participant.position || '-', '', '', '']);
  aoa.push(['Organisasi / PT', submission.participant.organization || '-', '', '', '']);
  aoa.push(['Kode Referensi', submission.referenceCode, '', '', '']);
  aoa.push([]);

  // Profile Interpretation Box
  aoa.push(['HASIL INTERPRETASI PROFIL DISC', '', '', '', '', '', '', '', '', '', '', '', '', '']);
  aoa.push(['Tipe Utama', `Tipe ${submission.interpretation.primaryType} - ${submission.interpretation.title}`, '', '', '', '', '', '', '', '', '', '', '', '']);
  aoa.push(['Deskripsi Profil', submission.interpretation.summary, '', '', '', '', '', '', '', '', '', '', '', '']);
  aoa.push([]);

  // DISC Summary Scoring Table
  aoa.push(['REKAPITULASI SKOR DISC (TALLY)', '', '', '', '', '', '', '', '', '', '', '', '', '']);
  aoa.push(['Kategori Skor', 'D (Dominance)', 'I (Influence)', 'S (Steadiness)', 'C (Conscientiousness)', 'X (◆)', 'Total (=24)', '', '', '', '', '', '', '']);
  
  const totalMost = submission.tally.most.D + submission.tally.most.I + submission.tally.most.S + submission.tally.most.C + (submission.tally.most.X || 0);
  const totalLeast = submission.tally.least.D + submission.tally.least.I + submission.tally.least.S + submission.tally.least.C + (submission.tally.least.X || 0);

  aoa.push([
    '1 ➔ Most (+)',
    submission.tally.most.D,
    submission.tally.most.I,
    submission.tally.most.S,
    submission.tally.most.C,
    submission.tally.most.X || 0,
    totalMost,
    '', '', '', '', '', '', ''
  ]);
  aoa.push([
    '2 ➔ Least (-)',
    submission.tally.least.D,
    submission.tally.least.I,
    submission.tally.least.S,
    submission.tally.least.C,
    submission.tally.least.X || 0,
    totalLeast,
    '', '', '', '', '', '', ''
  ]);
  aoa.push([
    '3 ➔ Change (Net)',
    submission.tally.change.D,
    submission.tally.change.I,
    submission.tally.change.S,
    submission.tally.change.C,
    '-',
    'N/A',
    '', '', '', '', '', '', ''
  ]);
  aoa.push([]);

  // Grid Header (3 Columns of Question Blocks side by side)
  aoa.push(['DETAIL LEMBAR JAWABAN (24 SOAL)', '', '', '', '', '', '', '', '', '', '', '', '', '']);
  aoa.push([
    'No.', 'P', 'K', 'Gambaran Diri', '',
    'No.', 'P', 'K', 'Gambaran Diri', '',
    'No.', 'P', 'K', 'Gambaran Diri'
  ]);

  // 8 Rows of Question Groups (3 questions per row)
  for (let r = 0; r < 8; r++) {
    const q1Id = r * 3 + 1; // 1, 4, 7, 10, 13, 16, 19, 22
    const q2Id = r * 3 + 2; // 2, 5, 8, 11, 14, 17, 20, 23
    const q3Id = r * 3 + 3; // 3, 6, 9, 12, 15, 18, 21, 24

    const q1 = discQuestions.find((q) => q.id === q1Id);
    const q2 = discQuestions.find((q) => q.id === q2Id);
    const q3 = discQuestions.find((q) => q.id === q3Id);

    const ans1 = submission.answers[q1Id] || { mostIndex: -1, leastIndex: -1 };
    const ans2 = submission.answers[q2Id] || { mostIndex: -1, leastIndex: -1 };
    const ans3 = submission.answers[q3Id] || { mostIndex: -1, leastIndex: -1 };

    // 4 option rows for each question block
    for (let optIdx = 0; optIdx < 4; optIdx++) {
      const opt1 = q1?.options[optIdx];
      const opt2 = q2?.options[optIdx];
      const opt3 = q3?.options[optIdx];

      const m1 = ans1.mostIndex === optIdx ? 'x' : '';
      const l1 = ans1.leastIndex === optIdx ? 'x' : '';

      const m2 = ans2.mostIndex === optIdx ? 'x' : '';
      const l2 = ans2.leastIndex === optIdx ? 'x' : '';

      const m3 = ans3.mostIndex === optIdx ? 'x' : '';
      const l3 = ans3.leastIndex === optIdx ? 'x' : '';

      const num1Str = optIdx === 0 ? q1Id : '';
      const num2Str = optIdx === 0 ? q2Id : '';
      const num3Str = optIdx === 0 ? q3Id : '';

      aoa.push([
        num1Str, m1, l1, opt1 ? opt1.text : '', '',
        num2Str, m2, l2, opt2 ? opt2.text : '', '',
        num3Str, m3, l3, opt3 ? opt3.text : ''
      ]);
    }
  }

  const ws = XLSX.utils.aoa_to_sheet(aoa);

  // Column widths formatting for precise alignment
  ws['!cols'] = [
    { wch: 6 },  // Col A: No.
    { wch: 5 },  // Col B: P
    { wch: 5 },  // Col C: K
    { wch: 42 }, // Col D: Gambaran Diri
    { wch: 3 },  // Col E: Spacer
    { wch: 6 },  // Col F: No.
    { wch: 5 },  // Col G: P
    { wch: 5 },  // Col H: K
    { wch: 42 }, // Col I: Gambaran Diri
    { wch: 3 },  // Col J: Spacer
    { wch: 6 },  // Col K: No.
    { wch: 5 },  // Col L: P
    { wch: 5 },  // Col M: K
    { wch: 42 }, // Col N: Gambaran Diri
  ];

  // Merge headers for title & section banners
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 13 } }, // Title Banner
    { s: { r: 1, c: 0 }, e: { r: 1, c: 13 } }, // Subtitle Banner
    { s: { r: 3, c: 0 }, e: { r: 3, c: 3 } },  // Informasi Peserta Header
    { s: { r: 3, c: 4 }, e: { r: 3, c: 13 } }, // Instruksi Header
    { s: { r: 12, c: 0 }, e: { r: 12, c: 13 } }, // Hasil Interpretasi Header
    { s: { r: 13, c: 1 }, e: { r: 13, c: 13 } }, // Tipe Utama
    { s: { r: 14, c: 1 }, e: { r: 14, c: 13 } }, // Deskripsi Profil
    { s: { r: 16, c: 0 }, e: { r: 16, c: 13 } }, // Rekapitulasi Skor Header
    { s: { r: 22, c: 0 }, e: { r: 22, c: 13 } }, // Detail Lembar Jawaban Header
  ];

  return ws;
}

