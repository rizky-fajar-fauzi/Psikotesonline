const fs = require('fs');

let testCompleted = fs.readFileSync('src/components/TestCompletedView.tsx', 'utf8');

// Update Props
testCompleted = testCompleted.replace(
  'interface TestCompletedViewProps {',
  'interface TestCompletedViewProps {\n  submissionResult?: any;'
);

testCompleted = testCompleted.replace(
  'export const TestCompletedView: React.FC<TestCompletedViewProps> = ({',
  'export const TestCompletedView: React.FC<TestCompletedViewProps> = ({\n  submissionResult,'
);

// Update max-w
testCompleted = testCompleted.replace(
  'className="max-w-2xl mx-auto my-12 px-4 sm:px-6"',
  'className="max-w-4xl mx-auto my-12 px-4 sm:px-6"'
);

const privacyBannerRegex = /{\/\* Privacy & Result Protection Banner \*\/}[\s\S]*?<\/div>\s*<\/div>/;

const resultSection = `
          {/* Result Section */}
          {submissionResult ? (
            <div className="font-sans text-slate-800 mt-5 text-left border-t border-slate-200 pt-6">
                <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Hasil Evaluasi Kepribadian Anda</h3>
                
                {/* BAGIAN ATAS: MASK, CORE, MIRROR */}
                <div className="flex flex-col sm:flex-row gap-5 mb-8">
                  <div className="flex-1 bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
                    <h3 className="m-0 mb-2.5 text-base underline text-slate-600 font-bold">Mask Public Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black mb-[15px]">
                      {submissionResult.interpretation.mask?.code || 'N/A'} - {submissionResult.interpretation.mask?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                    <ul className="list-none p-0 m-0 text-sm leading-[1.6]">
                      {(submissionResult.interpretation.mask?.traits || []).map((trait: string, idx: number) => (
                        <li key={idx} className="mb-1">- {trait}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-1 bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
                    <h3 className="m-0 mb-2.5 text-base underline text-slate-600 font-bold">Core Private Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black mb-[15px]">
                      {submissionResult.interpretation.core?.code || 'N/A'} - {submissionResult.interpretation.core?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                    <ul className="list-none p-0 m-0 text-sm leading-[1.6]">
                      {(submissionResult.interpretation.core?.traits || []).map((trait: string, idx: number) => (
                        <li key={idx} className="mb-1">- {trait}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-1 bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
                    <h3 className="m-0 mb-2.5 text-base underline text-slate-600 font-bold">Mirror Perceived Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black mb-[15px]">
                      {submissionResult.interpretation.mirror?.code || 'N/A'} - {submissionResult.interpretation.mirror?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                    <ul className="list-none p-0 m-0 text-sm leading-[1.6]">
                      {(submissionResult.interpretation.mirror?.traits || []).map((trait: string, idx: number) => (
                        <li key={idx} className="mb-1">- {trait}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* BAGIAN BAWAH: DESKRIPSI PARAGRAF & JOB MATCH */}
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
                  <h2 className="text-lg mt-0 mb-2.5 uppercase text-slate-800 font-bold">Deskripsi Kepribadian</h2>
                  <p className="text-[15px] leading-[1.8] text-justify mb-[25px] text-slate-700">
                    {submissionResult.interpretation.core?.summary || "Deskripsi tidak tersedia untuk profil ini."}
                  </p>
                  
                  <div className="bg-[#eef7ee] p-[15px] border-l-[5px] border-[#4CAF50] rounded text-sm leading-[1.6] text-slate-900">
                    <strong className="text-[15px] block mb-1">Kesesuaian Karier (Job Match):</strong>
                    <span>{submissionResult.interpretation.core?.jobMatch || '-'}</span>
                  </div>
                </div>
            </div>
          ) : (
            <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-5 text-left flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-blue-600/20">
                <Lock className="w-5 h-5" />
              </div>
              <div className="text-sm text-slate-700 leading-relaxed">
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  Proteksi Hasil Tes (Kerahasiaan Evaluasi)
                </h3>
                <p className="mb-2">
                  Sesuai standar kerahasiaan evaluasi psikometri dan instruksi pengelola, <strong className="text-blue-900">hasil tes akhir tidak ditampilkan di layar ini</strong>.
                </p>
                <p className="text-xs text-slate-600">
                  Data jawaban Anda telah tersimpan otomatis di database server dan laporan lengkap analisis evaluasi telah dikirimkan secara langsung ke <strong>Email Admin</strong> untuk proses evaluasi lebih lanjut.
                </p>
              </div>
            </div>
          )}
`;

testCompleted = testCompleted.replace(privacyBannerRegex, resultSection.trim());

fs.writeFileSync('src/components/TestCompletedView.tsx', testCompleted);
