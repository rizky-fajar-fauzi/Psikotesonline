const fs = require('fs');
let admin = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

const newUI = `
              {/* Hasil Profil Kepribadian (Mask, Core, Mirror) */}
              <div className="font-sans text-slate-800 mt-5">
                {/* BAGIAN ATAS: MASK, CORE, MIRROR (Berisi List Sifat Sesuai Excel) */}
                <div className="flex flex-wrap gap-5 mb-10">
                  <div className="flex-1 min-w-[250px] bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
                    <h3 className="m-0 mb-2.5 text-base underline text-slate-600 font-bold">Mask Public Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black mb-[15px]">
                      {selectedSub.interpretation.mask?.code || 'N/A'} - {selectedSub.interpretation.mask?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                    <ul className="list-none p-0 m-0 text-sm leading-[1.6]">
                      {(selectedSub.interpretation.mask?.traits || []).map((trait, idx) => (
                        <li key={idx} className="mb-1">- {trait}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 min-w-[250px] bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
                    <h3 className="m-0 mb-2.5 text-base underline text-slate-600 font-bold">Core Private Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black mb-[15px]">
                      {selectedSub.interpretation.core?.code || 'N/A'} - {selectedSub.interpretation.core?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                    <ul className="list-none p-0 m-0 text-sm leading-[1.6]">
                      {(selectedSub.interpretation.core?.traits || []).map((trait, idx) => (
                        <li key={idx} className="mb-1">- {trait}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 min-w-[250px] bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
                    <h3 className="m-0 mb-2.5 text-base underline text-slate-600 font-bold">Mirror Perceived Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black mb-[15px]">
                      {selectedSub.interpretation.mirror?.code || 'N/A'} - {selectedSub.interpretation.mirror?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                    <ul className="list-none p-0 m-0 text-sm leading-[1.6]">
                      {(selectedSub.interpretation.mirror?.traits || []).map((trait, idx) => (
                        <li key={idx} className="mb-1">- {trait}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* BAGIAN BAWAH: DESKRIPSI PARAGRAF & JOB MATCH (Berdasarkan Kepribadian Utama) */}
                <div className="bg-slate-50 p-[25px] rounded-lg border border-slate-200 mb-8">
                  <h2 className="text-lg mt-0 mb-2.5 uppercase text-slate-800 font-bold">Deskripsi Kepribadian</h2>
                  <p className="text-[15px] leading-[1.8] text-justify mb-[25px] text-slate-700">
                    {selectedSub.interpretation.core?.summary || "Deskripsi tidak tersedia untuk profil ini."}
                  </p>

                  <div className="bg-[#eef7ee] p-[15px] border-l-[5px] border-[#4CAF50] rounded text-sm leading-[1.6] text-slate-900">
                    <strong className="text-[15px] block mb-1">Kesesuaian Karier (Job Match):</strong>
                    <span>{selectedSub.interpretation.core?.jobMatch || '-'}</span>
                  </div>
                </div>
              </div>

              {/* DISC Scores & Visual Comparison Graph */}
`;

admin = admin.replace(/\{\/\* Hasil Profil Kepribadian \(Mask, Core, Mirror\) \*\/\}[\s\S]*?\{\/\* DISC Scores & Visual Comparison Graph \*\/\}/s, newUI.trim() + '\n              ');
fs.writeFileSync('src/components/AdminPortal.tsx', admin);
