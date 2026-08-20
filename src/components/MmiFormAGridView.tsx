import React from 'react';
import { DISCSubmission } from '../types';
import { discQuestions } from '../data/discQuestions';
import { FileSpreadsheet, Printer } from 'lucide-react';
import { exportSingleSubmissionToExcel } from '../utils/excelExporter';
import { Graph3Chart } from './Graph3Chart';

interface MmiFormAGridViewProps {
  submission: DISCSubmission;
  onDownloadExcel?: () => void;
}

export const MmiFormAGridView: React.FC<MmiFormAGridViewProps> = ({
  submission,
  onDownloadExcel,
}) => {
  const { participant, answers, tally, interpretation } = submission;

  const handleDownloadExcel = () => {
    if (onDownloadExcel) {
      onDownloadExcel();
    } else {
      exportSingleSubmissionToExcel(submission);
    }
  };

  // Format date to Indonesian string e.g. "19 April 2019"
  const formatDateString = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formattedDate = formatDateString(participant.date);

  return (
    <div className="bg-slate-50/80 p-3 sm:p-6 rounded-3xl border border-slate-200/80">
      {/* Top Action Toolbar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            DISC
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">Formulir Lembar Jawaban Assessment DISC</h4>
            <p className="text-xs text-slate-500">
              Hasil evaluasi lengkap 24 nomor pertanyaan - Form A
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownloadExcel}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center space-x-2 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Download Excel (.xlsx)</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center space-x-2 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* PAPER CANVAS - CLEAN & MODERN */}
      <div className="bg-white text-slate-900 border border-slate-200/90 rounded-2xl p-4 sm:p-8 max-w-6xl mx-auto shadow-sm font-sans text-xs">
        {/* Title Banner */}
        <div className="bg-slate-900 text-white text-center py-3 px-6 mb-6 rounded-xl shadow-sm">
          <h1 className="text-lg sm:text-2xl font-extrabold tracking-wider uppercase">
            TES KEPRIBADIAN D.I.S.C.
          </h1>
          <p className="text-[11px] text-slate-300 mt-0.5 tracking-normal">
            Formulir Hasil & Lembar Jawaban Assessment - MMI Form A
          </p>
        </div>

        {/* Participant Info & Instructions Top Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6 items-stretch">
          {/* Left: Participant Info Table */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white h-full flex flex-col justify-center">
              <table className="w-full text-xs border-collapse">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="p-2.5 bg-slate-50/80 w-32 font-semibold text-slate-600 border-r border-slate-100">
                      Nama Peserta
                    </td>
                    <td className="p-2.5 font-bold text-slate-900 text-xs">
                      {participant.name}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-2.5 bg-slate-50/80 font-semibold text-slate-600 border-r border-slate-100">
                      Usia
                    </td>
                    <td className="p-2.5 font-medium text-slate-800">
                      {participant.age ? `${participant.age} tahun` : '-'}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-2.5 bg-slate-50/80 font-semibold text-slate-600 border-r border-slate-100">
                      Jenis Kelamin
                    </td>
                    <td className="p-2.5 font-medium text-slate-800">
                      {participant.gender === 'Pria' ? 'Laki-Laki' : 'Perempuan'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 bg-slate-50/80 font-semibold text-slate-600 border-r border-slate-100">
                      Tanggal Tes
                    </td>
                    <td className="p-2.5 font-medium text-slate-800">
                      {formattedDate}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Instructions Box */}
          <div className="md:col-span-7 border border-slate-200 bg-slate-50/70 rounded-xl p-4 text-xs leading-relaxed flex flex-col justify-center text-slate-700">
            <p className="font-bold text-slate-900 mb-1.5">
              PETUNJUK LEMBAR JAWABAN:
            </p>
            <ol className="space-y-1 ml-1 text-slate-700 font-normal">
              <li className="flex items-start space-x-2">
                <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded text-[11px] shrink-0 mt-0.5">P</span>
                <span>= Pernyataan yang <strong>PALING menggambarkan</strong> diri Anda (Hijau)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded text-[11px] shrink-0 mt-0.5">K</span>
                <span>= Pernyataan yang <strong>PALING TIDAK menggambarkan</strong> diri Anda (Merah)</span>
              </li>
            </ol>
            <p className="text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-200/80">
              * Setiap nomor terdiri dari tepat 1 pilihan [P] dan 1 pilihan [K].
            </p>
          </div>
        </div>

        {/* 24 QUESTION BLOCKS (3 Columns x 8 Rows Layout) */}
        <div className="space-y-3.5">
          {Array.from({ length: 8 }).map((_, r) => {
            const col1Q = r * 3 + 1; // 1, 4, 7, 10, 13, 16, 19, 22
            const col2Q = r * 3 + 2; // 2, 5, 8, 11, 14, 17, 20, 23
            const col3Q = r * 3 + 3; // 3, 6, 9, 12, 15, 18, 21, 24
            const rowQuestions = [col1Q, col2Q, col3Q];

            return (
              <div key={r} className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {rowQuestions.map((qId) => {
                  const q = discQuestions.find((item) => item.id === qId);
                  if (!q) return null;

                  const ans = answers[qId] || { mostIndex: -1, leastIndex: -1 };

                  return (
                    <div key={qId} className="overflow-hidden border border-slate-200/90 rounded-xl bg-white shadow-sm">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="text-center font-bold text-xs border-b border-slate-200 bg-slate-100 text-slate-700">
                            <th className="border-r border-slate-200 bg-slate-100 text-slate-700 w-8 py-1.5 text-center font-bold">
                              No.
                            </th>
                            <th className="border-r border-slate-200 bg-emerald-600 text-white w-8 py-1.5 text-center font-bold">
                              P
                            </th>
                            <th className="border-r border-slate-200 bg-rose-600 text-white w-8 py-1.5 text-center font-bold">
                              K
                            </th>
                            <th className="bg-slate-800 text-white py-1.5 px-2 text-center font-semibold">
                              Gambaran Diri
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {q.options.map((opt, optIdx) => {
                            const isMost = ans.mostIndex === optIdx;
                            const isLeast = ans.leastIndex === optIdx;

                            return (
                              <tr
                                key={optIdx}
                                className={`border-b border-slate-100 last:border-b-0 transition-colors ${
                                  isMost
                                    ? 'bg-emerald-50/70'
                                    : isLeast
                                    ? 'bg-rose-50/70'
                                    : 'hover:bg-slate-50/50'
                                }`}
                              >
                                {optIdx === 0 && (
                                  <td
                                    rowSpan={4}
                                    className="border-r border-slate-200 bg-slate-50 font-bold text-xs text-slate-700 text-center align-middle w-8"
                                  >
                                    {qId}
                                  </td>
                                )}
                                <td
                                  className={`border-r border-slate-200 text-center font-black text-xs w-8 py-1.5 ${
                                    isMost
                                      ? 'bg-emerald-600 text-white'
                                      : 'text-slate-300'
                                  }`}
                                >
                                  {isMost ? '✓' : ''}
                                </td>
                                <td
                                  className={`border-r border-slate-200 text-center font-black text-xs w-8 py-1.5 ${
                                    isLeast
                                      ? 'bg-rose-600 text-white'
                                      : 'text-slate-300'
                                  }`}
                                >
                                  {isLeast ? '✓' : ''}
                                </td>
                                <td className="px-2.5 py-1.5 text-slate-800 font-medium text-[11px] leading-snug">
                                  {opt.text}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Tally Summary & Personality Interpretation at Bottom */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Tally Table */}
            <div className="md:col-span-6 border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                  Rekapitulasi Skor DISC (Tally)
                </h4>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  24 Soal
                </span>
              </div>
              <table className="w-full text-center border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-1.5 text-left pl-2 font-semibold">Skor</th>
                    <th className="p-1.5 text-rose-600 font-bold">D</th>
                    <th className="p-1.5 text-amber-600 font-bold">I</th>
                    <th className="p-1.5 text-emerald-600 font-bold">S</th>
                    <th className="p-1.5 text-blue-600 font-bold">C</th>
                    <th className="p-1.5 text-purple-600 font-bold">X (◆)</th>
                    <th className="p-1.5 text-slate-800 font-bold bg-slate-200/60 rounded-t">Total</th>
                  </tr>
                </thead>
                <tbody className="font-medium text-slate-800">
                  <tr className="border-b border-slate-100">
                    <td className="p-1.5 text-emerald-700 font-semibold text-left pl-2 flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                      <span>1 ➔ Most (+)</span>
                    </td>
                    <td className="p-1.5">{tally.most.D}</td>
                    <td className="p-1.5">{tally.most.I}</td>
                    <td className="p-1.5">{tally.most.S}</td>
                    <td className="p-1.5">{tally.most.C}</td>
                    <td className="p-1.5 text-slate-500">{tally.most.X || 0}</td>
                    <td className="p-1.5 bg-emerald-50 text-emerald-800 font-bold">
                      {tally.most.D + tally.most.I + tally.most.S + tally.most.C + (tally.most.X || 0)}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-1.5 text-rose-700 font-semibold text-left pl-2 flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                      <span>2 ➔ Least (-)</span>
                    </td>
                    <td className="p-1.5">{tally.least.D}</td>
                    <td className="p-1.5">{tally.least.I}</td>
                    <td className="p-1.5">{tally.least.S}</td>
                    <td className="p-1.5">{tally.least.C}</td>
                    <td className="p-1.5 text-slate-500">{tally.least.X || 0}</td>
                    <td className="p-1.5 bg-rose-50 text-rose-800 font-bold">
                      {tally.least.D + tally.least.I + tally.least.S + tally.least.C + (tally.least.X || 0)}
                    </td>
                  </tr>
                  <tr className="bg-slate-50 font-semibold">
                    <td className="p-1.5 text-slate-700 text-left pl-2">
                      3 ➔ Change (Net)
                    </td>
                    <td className="p-1.5">{tally.change.D}</td>
                    <td className="p-1.5">{tally.change.I}</td>
                    <td className="p-1.5">{tally.change.S}</td>
                    <td className="p-1.5">{tally.change.C}</td>
                    <td className="p-1.5 text-slate-400 italic">—</td>
                    <td className="p-1.5 text-slate-400 text-[10px]">N/A</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg text-[11px] text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800 flex items-center justify-between">
                  <span>Status Verifikasi Skor:</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    Valid (=24)
                  </span>
                </p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Total Most (+) dan Least (-) masing-masing bernilai tepat 24 setelah menyertakan poin penetral X (◆).
                </p>
              </div>
            </div>

            {/* Profile Result Box */}
            <div className="md:col-span-6 border border-slate-200 bg-slate-900 text-white rounded-xl p-5 shadow-sm flex flex-col justify-between h-full">
              <div>
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest block mb-1">
                  Hasil Interpretasi Profil DISC
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Tipe {interpretation.mirror?.code || interpretation.primaryType} - {interpretation.mirror?.title || interpretation.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-normal">
                  {interpretation.mirror?.summary || interpretation.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between font-medium">
                <span>Profil Kepribadian Utama</span>
                <span className="text-indigo-300 font-bold">{interpretation.mirror?.code || interpretation.primaryType}</span>
              </div>
            </div>
          </div>

          {/* Graph 3 CHANGE Line Chart */}
          <div className="mt-6">
            <Graph3Chart
              rawD={tally.change.D}
              rawI={tally.change.I}
              rawS={tally.change.S}
              rawC={tally.change.C}
            />
          </div>

          <div className="mt-6 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span>SISTEM EVALUASI DIGITAL ASSESSMENT DISC</span>
            <span>FORMULIR MM-FORM A</span>
          </div>
        </div>
      </div>
    </div>
  );
};
