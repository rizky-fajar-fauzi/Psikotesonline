const fs = require('fs');
let admin = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

const newUI = `
              {/* Hasil Profil Kepribadian (Mask, Core, Mirror) */}
              <div className="flex flex-wrap justify-between font-sans text-black mt-5">
                {/* MASK PUBLIC SELF (KIRI ATAS) */}
                <div className="w-full md:w-[48%] mb-[30px]">
                  <div className="text-lg font-bold underline mb-[5px]">Mask Public Self</div>
                  <div className="text-base font-bold uppercase mb-[10px]">
                    {selectedSub.interpretation.mask?.title || 'TIDAK TERIDENTIFIKASI'}
                  </div>
                  <div className="list-none p-0 m-0 mb-[15px] leading-relaxed">
                    {(selectedSub.interpretation.mask?.traits || []).map((trait, idx) => (
                      <div key={idx} className="mb-[3px]">- {trait}</div>
                    ))}
                  </div>
                  <div className="mt-[10px] pt-[10px] border-t border-slate-300 text-sm text-slate-700">
                    <strong>Job Match:</strong><br />
                    <span>{selectedSub.interpretation.mask?.jobMatch || '-'}</span>
                  </div>
                </div>

                {/* CORE PRIVATE SELF (KANAN ATAS) */}
                <div className="w-full md:w-[48%] mb-[30px]">
                  <div className="text-lg font-bold underline mb-[5px]">Core Private Self</div>
                  <div className="text-base font-bold uppercase mb-[10px]">
                    {selectedSub.interpretation.core?.title || 'TIDAK TERIDENTIFIKASI'}
                  </div>
                  <div className="list-none p-0 m-0 mb-[15px] leading-relaxed">
                    {(selectedSub.interpretation.core?.traits || []).map((trait, idx) => (
                      <div key={idx} className="mb-[3px]">- {trait}</div>
                    ))}
                  </div>
                  <div className="mt-[10px] pt-[10px] border-t border-slate-300 text-sm text-slate-700">
                    <strong>Job Match:</strong><br />
                    <span>{selectedSub.interpretation.core?.jobMatch || '-'}</span>
                  </div>
                </div>

                {/* MIRROR PERCEIVED SELF (BAWAH) */}
                <div className="w-full mb-[30px]">
                  <div className="text-lg font-bold underline mb-[5px]">Mirror Perceived Self</div>
                  <div className="text-base font-bold uppercase mb-[10px]">
                    {selectedSub.interpretation.mirror?.title || 'TIDAK TERIDENTIFIKASI'}
                  </div>
                  <div className="list-none p-0 m-0 mb-[15px] leading-relaxed">
                    {(selectedSub.interpretation.mirror?.traits || []).map((trait, idx) => (
                      <div key={idx} className="mb-[3px]">- {trait}</div>
                    ))}
                  </div>
                  <div className="mt-[10px] pt-[10px] border-t border-slate-300 text-sm text-slate-700">
                    <strong>Job Match:</strong><br />
                    <span>{selectedSub.interpretation.mirror?.jobMatch || '-'}</span>
                  </div>
                </div>
              </div>

              {/* DISC Scores & Visual Comparison Graph */}
`;

// Remove the old Mask/Core/Mirror section
admin = admin.replace(/\{\/\* Hasil Profil Kepribadian \(Mask, Core, Mirror\) \*\/\}[\s\S]*?\{\/\* DISC Scores & Visual Comparison Graph \*\/\}/s, newUI.trim());

// Remove the AI HR Summary and Detailed Personality Breakdown sections
admin = admin.replace(/\{\/\* AI HR Summary \*\/\}.*?\{\/\* Resend Email Tool \*\/\}/s, "{/* Resend Email Tool */}");

fs.writeFileSync('src/components/AdminPortal.tsx', admin);
