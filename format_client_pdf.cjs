const fs = require('fs');
let admin = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

admin = admin.replace(
`    return (
      <div className="bg-white min-h-screen w-full">
        <div id="pdf-content" className="p-10 max-w-4xl mx-auto bg-white">
          <div className="text-center mb-10 border-b border-slate-100 pb-8">
            <h1 className="text-3xl font-black text-slate-900">Laporan Kepribadian</h1>
            <p className="text-slate-500 mt-2">Dibuat khusus untuk <span className="font-bold text-slate-800">{selectedSub.participant.name}</span></p>
          </div>
          
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <div className="absolute inset-0 bg-slate-100 blur-2xl rounded-full scale-150 opacity-50"></div>
              <div className={\`relative w-36 h-36 flex items-center justify-center mb-6 border-8 border-white shadow-2xl \${avatarBg} \${avatarShape}\`}>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={\`w-16 h-16 \${avatarText}\`}>
                   <path d={avatarIcon}/>
                 </svg>
              </div>
            </div>
            <h2 className="text-4xl font-black text-slate-900 text-center mt-2">
              {visualRole}
            </h2>
            <div className="text-xl font-bold text-indigo-600 mt-2 text-center bg-indigo-50 px-4 py-1.5 rounded-full inline-block">
              Tipe {mirrorCode} - {selectedSub.interpretation.mirror?.title || selectedSub.interpretation.title}
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
    );`,
`    return (
      <div className="bg-white min-h-screen w-full flex justify-center font-sans">
        <div id="pdf-content" className="w-full max-w-[210mm] bg-white px-8 py-10 mx-auto">
          
          <div className="text-center mb-8 border-b border-slate-100 pb-6">
            <p className="text-slate-600 text-base">Dibuat khusus untuk <span className="font-bold text-slate-900">{selectedSub.participant.name}</span></p>
          </div>
          
          <div className="flex flex-col items-center mb-10 mt-4">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-slate-200 blur-2xl rounded-full scale-150 opacity-40"></div>
              <div className={\`relative w-28 h-28 flex items-center justify-center bg-white shadow-xl \${avatarShape}\`}>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={\`w-14 h-14 \${avatarText}\`}>
                   <path d={avatarIcon}/>
                 </svg>
              </div>
            </div>
            
            <h2 className="text-4xl font-black text-slate-900 text-center tracking-tight">
              {visualRole}
            </h2>
            
            <div className="text-lg font-bold text-indigo-600 mt-2 text-center uppercase tracking-wide">
              Tipe {mirrorCode} - {selectedSub.interpretation.mirror?.title || selectedSub.interpretation.title}
            </div>
          </div>

          <div className="bg-white border border-indigo-100 rounded-3xl p-8 mb-6 shadow-sm">
            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center space-x-3">
               <span className="text-slate-300 font-black text-xl">1</span>
               <span>Karakteristik Utama</span>
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
              {selectedSub.interpretation.mirror?.summary || selectedSub.interpretation.summary}
            </p>
          </div>

          <div className="bg-white border border-emerald-100 rounded-3xl p-8 mb-6 shadow-sm">
             <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center space-x-3">
               <span className="text-slate-300 font-black text-xl">2</span>
               <span>Rekomendasi Karir (Job Match)</span>
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
              {selectedSub.interpretation.mirror?.jobMatch || "Belum ada rekomendasi spesifik untuk profil ini."}
            </p>
          </div>
          
        </div>
      </div>
    );`
);

fs.writeFileSync('src/components/AdminPortal.tsx', admin);
console.log("Re-formatted client PDF");
