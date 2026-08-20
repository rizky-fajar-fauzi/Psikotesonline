const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

code = code.replace(
`<button
                    onClick={() => {
                        window.print();
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1 shrink-0"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </button>`,
`<button
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPDF}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1 shrink-0"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{isGeneratingPDF ? 'Membuat PDF...' : 'Unduh PDF'}</span>
                  </button>`
);

fs.writeFileSync('src/components/AdminPortal.tsx', code);
console.log("Fixed window.print()");
