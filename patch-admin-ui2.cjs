const fs = require('fs');
let admin = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

const newUI = `
              {/* Hasil Profil Kepribadian (Mask, Core, Mirror) */}
              <div className="font-sans text-slate-800 mt-5">
                {/* BAGIAN ATAS: 3 KOTAK HANYA BERISI NAMA TIPE KEPRIBADIAN */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex-1 min-w-[200px] bg-slate-50 p-4 border border-slate-200 rounded-lg text-center">
                    <h3 className="m-0 mb-2 text-base underline text-slate-600 font-bold">Mask Public Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black">
                      {selectedSub.interpretation.mask?.code || 'N/A'} - {selectedSub.interpretation.mask?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-[200px] bg-slate-50 p-4 border border-slate-200 rounded-lg text-center">
                    <h3 className="m-0 mb-2 text-base underline text-slate-600 font-bold">Core Private Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black">
                      {selectedSub.interpretation.core?.code || 'N/A'} - {selectedSub.interpretation.core?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-[200px] bg-slate-50 p-4 border border-slate-200 rounded-lg text-center">
                    <h3 className="m-0 mb-2 text-base underline text-slate-600 font-bold">Mirror Perceived Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black">
                      {selectedSub.interpretation.mirror?.code || 'N/A'} - {selectedSub.interpretation.mirror?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                  </div>
                </div>

                {/* BAGIAN BAWAH: 1 DESKRIPSI & 1 JOB MATCH (DIAMBIL DARI GRAFIK CHANGE / MIRROR) */}
                <div className="border-t-2 border-slate-300 pt-6 mb-8">
                  <h2 className="text-lg mb-4 uppercase font-bold text-slate-900">Karakteristik Utama & Kesesuaian Karier</h2>
                  
                  {/* Daftar Sifat Memanjang ke Bawah */}
                  <div className="leading-relaxed mb-6 text-[15px]">
                    {(selectedSub.interpretation.mirror?.traits || []).length > 0 ? (
                      (selectedSub.interpretation.mirror?.traits || []).map((trait, idx) => (
                        <div key={idx} className="mb-1 flex items-start">
                          <span className="mr-2 text-emerald-600 font-bold">•</span>
                          <span>{trait}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-500 italic">Karakteristik tidak tersedia (Mungkin profil transisi).</div>
                    )}
                  </div>
                  
                  {/* Kolom Job Match */}
                  <div className="bg-emerald-50 p-4 border-l-4 border-emerald-500 rounded text-sm leading-relaxed text-emerald-950">
                    <strong className="block mb-1 text-emerald-800">Job Match:</strong>
                    <span>{selectedSub.interpretation.mirror?.jobMatch || '-'}</span>
                  </div>
                </div>
              </div>

              {/* DISC Scores & Visual Comparison Graph */}
`;

admin = admin.replace(/\{\/\* Hasil Profil Kepribadian \(Mask, Core, Mirror\) \*\/\}[\s\S]*?\{\/\* DISC Scores & Visual Comparison Graph \*\/\}/s, newUI.trim());
fs.writeFileSync('src/components/AdminPortal.tsx', admin);
