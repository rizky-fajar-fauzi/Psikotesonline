const fs = require('fs');

let admin = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

const oldHeaderBtn = `<button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold flex items-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{isGeneratingPDF ? 'Membuat PDF...' : 'Unduh PDF'}</span>
                </button>`;

const newHeaderBtn = `<div className="relative group">
                  <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1">
                    <Printer className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </button>
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl hidden group-hover:block z-50 overflow-hidden">
                    <button onClick={() => handleDownloadPDF('admin')} className="w-full text-left px-4 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 border-b border-slate-100">Laporan Lengkap (Admin)</button>
                    <button onClick={() => handleDownloadPDF('client')} className="w-full text-left px-4 py-3 text-xs font-bold text-indigo-700 hover:bg-indigo-50">Laporan Ringkas (Klien)</button>
                  </div>
                </div>`;

admin = admin.replace(oldHeaderBtn, newHeaderBtn);

const oldFooterBtn = `<button
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPDF}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1 shrink-0"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{isGeneratingPDF ? 'Membuat PDF...' : 'Unduh PDF'}</span>
                  </button>`;

const newFooterBtn = `<div className="relative group">
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1 shrink-0">
                    <Printer className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </button>
                  <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl hidden group-hover:block z-50 overflow-hidden">
                    <button onClick={() => handleDownloadPDF('admin')} className="w-full text-left px-4 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 border-b border-slate-100">Laporan Lengkap (Admin)</button>
                    <button onClick={() => handleDownloadPDF('client')} className="w-full text-left px-4 py-3 text-xs font-bold text-indigo-700 hover:bg-indigo-50">Laporan Ringkas (Klien)</button>
                  </div>
                </div>`;

admin = admin.replace(oldFooterBtn, newFooterBtn);

fs.writeFileSync('src/components/AdminPortal.tsx', admin);
console.log("Patched buttons");
