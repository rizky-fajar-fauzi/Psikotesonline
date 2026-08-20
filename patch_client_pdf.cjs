const fs = require('fs');

let admin = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

const clientPdfCode = `
  if (printType === 'client' && selectedSub) {
    const primaryLetter = (selectedSub.interpretation.mirror?.code || selectedSub.interpretation.primaryType || 'X').charAt(0);
    let avatarBg = "bg-indigo-100";
    let avatarText = "text-indigo-600";
    let avatarShape = "rounded-full";
    let avatarIcon = "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"; // Default polygon
    
    if (primaryLetter === 'D') {
      avatarBg = "bg-red-100";
      avatarText = "text-red-600";
      avatarShape = "rounded-[2rem]";
      avatarIcon = "M13 10V3L4 14h7v7l9-11h-7z"; // Zap
    } else if (primaryLetter === 'I') {
      avatarBg = "bg-yellow-100";
      avatarText = "text-yellow-600";
      avatarShape = "rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl";
      avatarIcon = "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"; // Sparkle
    } else if (primaryLetter === 'S') {
      avatarBg = "bg-emerald-100";
      avatarText = "text-emerald-600";
      avatarShape = "rounded-[1rem]";
      avatarIcon = "M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"; // Heart
    } else if (primaryLetter === 'C') {
      avatarBg = "bg-blue-100";
      avatarText = "text-blue-600";
      avatarShape = "rounded-none";
      avatarIcon = "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"; // Hexagon
    }

    return (
      <div className="bg-white min-h-screen w-full">
        <div id="pdf-content" className="p-10 max-w-4xl mx-auto bg-white">
          <div className="text-center mb-10 border-b border-slate-100 pb-8">
            <h1 className="text-3xl font-black text-slate-900">Laporan Kepribadian</h1>
            <p className="text-slate-500 mt-2">Dibuat khusus untuk <span className="font-bold text-slate-800">{selectedSub.participant.name}</span></p>
          </div>
          
          <div className="flex flex-col items-center mb-10">
            <div className={\`w-32 h-32 flex items-center justify-center mb-6 border-4 border-white shadow-xl \${avatarBg} \${avatarShape}\`}>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={\`w-16 h-16 \${avatarText}\`}>
                 <path d={avatarIcon}/>
               </svg>
            </div>
            <h2 className="text-4xl font-black text-slate-900 text-center">
              Tipe {selectedSub.interpretation.mirror?.code || selectedSub.interpretation.primaryType}
            </h2>
            <div className="text-xl font-bold text-indigo-600 mt-1 text-center">
              {selectedSub.interpretation.mirror?.title || selectedSub.interpretation.title}
            </div>
          </div>

          <div className="bg-indigo-50/50 border border-indigo-100 rounded-3xl p-8 mb-8">
            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center">
               <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 shrink-0">1</span>
               Karakteristik Utama
            </h3>
            <p className="text-slate-700 leading-relaxed text-[15px] whitespace-pre-line">
              {selectedSub.interpretation.mirror?.summary || selectedSub.interpretation.summary}
            </p>
          </div>

          <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8 mb-8">
             <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center">
               <span className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 shrink-0">2</span>
               Rekomendasi Karir (Job Match)
            </h3>
            <p className="text-slate-700 leading-relaxed text-[15px] whitespace-pre-line">
              {selectedSub.interpretation.mirror?.jobMatch || "Belum ada rekomendasi spesifik untuk profil ini."}
            </p>
          </div>
          
          <div className="mt-12 text-center text-xs text-slate-400 border-t border-slate-100 pt-6">
            <p>Dokumen ini dihasilkan secara otomatis dari sistem Tes Kepribadian DISC.</p>
            <p>Ref: {selectedSub.referenceCode}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
`;

admin = admin.replace(`  if (!isAuthenticated) {`, clientPdfCode);

fs.writeFileSync('src/components/AdminPortal.tsx', admin);
console.log("Injected client PDF view");
