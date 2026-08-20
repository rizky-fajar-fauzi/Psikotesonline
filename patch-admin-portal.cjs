const fs = require('fs');
let admin = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

const newProfilesHtml = `
              {/* Hasil Profil Kepribadian (Mask, Core, Mirror) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* MASK Profile */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h4 className="font-bold text-amber-900 text-xs mb-1 uppercase tracking-wider">Grafik 1 (Mask / Public Self)</h4>
                  <div className="text-amber-700 text-sm font-black mb-2">{selectedSub.interpretation.mask?.code || 'N/A'} - {selectedSub.interpretation.mask?.title || 'N/A'}</div>
                  <p className="text-xs text-amber-800 leading-relaxed">{selectedSub.interpretation.mask?.summary || '-'}</p>
                </div>
                
                {/* CORE Profile */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-bold text-blue-900 text-xs mb-1 uppercase tracking-wider">Grafik 2 (Core / Private Self)</h4>
                  <div className="text-blue-700 text-sm font-black mb-2">{selectedSub.interpretation.core?.code || 'N/A'} - {selectedSub.interpretation.core?.title || 'N/A'}</div>
                  <p className="text-xs text-blue-800 leading-relaxed">{selectedSub.interpretation.core?.summary || '-'}</p>
                </div>

                {/* MIRROR Profile */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <h4 className="font-bold text-emerald-900 text-xs mb-1 uppercase tracking-wider">Grafik 3 (Mirror / Perceived Self)</h4>
                  <div className="text-emerald-700 text-sm font-black mb-2">{selectedSub.interpretation.mirror?.code || 'N/A'} - {selectedSub.interpretation.mirror?.title || 'N/A'}</div>
                  <p className="text-xs text-emerald-800 leading-relaxed">{selectedSub.interpretation.mirror?.summary || '-'}</p>
                </div>
              </div>

              {/* DISC Scores & Visual Comparison Graph */}
`;

admin = admin.replace("{/* DISC Scores & Visual Comparison Graph */}", newProfilesHtml);

fs.writeFileSync('src/components/AdminPortal.tsx', admin);
