const fs = require('fs');

let admin = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

admin = admin.replace(
`    const handleDownloadPDF = async () => {`,
`    const [isPrintingModal, setIsPrintingModal] = useState(false);
    
    useEffect(() => {
      if (isPrintingModal) {
        setTimeout(() => {
          window.print();
          setIsPrintingModal(false);
        }, 300);
      }
    }, [isPrintingModal]);

    const handleDownloadPDF = async () => {
      setIsPrintingModal(true);
    };

    const handleDownloadPDF_old = async () => {`
);

admin = admin.replace(
`  if (!isAuthenticated) {`,
`  if (isPrintingModal && selectedSub) {
    return (
      <div className="bg-white min-h-screen w-full">
        <div id="pdf-content" className="p-8 max-w-4xl mx-auto bg-white space-y-6">
          {detailTab === 'mmi_form' ? (
            <MmiFormAGridView submission={selectedSub} />
          ) : (
            <>
              {/* Participant Demographic Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block">Nama Lengkap:</span>
                  <span className="font-bold text-slate-900">{selectedSub.participant.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Email:</span>
                  <span className="font-semibold text-slate-800">{selectedSub.participant.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">No HP / WA:</span>
                  <span className="font-semibold text-slate-800">{selectedSub.participant.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Posisi / Org:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedSub.participant.position || '-'} ({selectedSub.participant.organization || '-'})
                  </span>
                </div>
              </div>

              {/* Dominant Type Hero Banner */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 text-center print:bg-slate-100 print:text-black">
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 print:text-slate-500">
                  Hasil Profil Kepribadian Utama
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-1">
                  Tipe {selectedSub.interpretation.mirror?.code || selectedSub.interpretation.primaryType} - {selectedSub.interpretation.mirror?.title || selectedSub.interpretation.title}
                </h2>
                <p className="mt-2 text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed print:text-slate-700">
                  {selectedSub.interpretation.mirror?.summary || selectedSub.interpretation.summary}
                </p>
              </div>
              
              {/* Hasil Profil Kepribadian (Mask, Core, Mirror) */}
              <div className="font-sans text-slate-800 mt-5">
                <div className="flex flex-wrap gap-5 mb-10">
                  <div className="flex-1 min-w-[250px] bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
                    <h3 className="m-0 mb-2.5 text-base underline text-slate-600 font-bold">Mask Public Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black mb-[15px]">
                      {selectedSub.interpretation.mask?.code || 'N/A'} - {selectedSub.interpretation.mask?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                    <ul className="list-none p-0 m-0 text-sm leading-[1.6]">
                      {selectedSub.interpretation.mask?.traits.map((trait, i) => <li key={i}>• {trait}</li>)}
                    </ul>
                  </div>
                  <div className="flex-1 min-w-[250px] bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
                    <h3 className="m-0 mb-2.5 text-base underline text-slate-600 font-bold">Core Private Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black mb-[15px]">
                      {selectedSub.interpretation.core?.code || 'N/A'} - {selectedSub.interpretation.core?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                    <ul className="list-none p-0 m-0 text-sm leading-[1.6]">
                      {selectedSub.interpretation.core?.traits.map((trait, i) => <li key={i}>• {trait}</li>)}
                    </ul>
                  </div>
                  <div className="flex-1 min-w-[250px] bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
                    <h3 className="m-0 mb-2.5 text-base underline text-slate-600 font-bold">Mirror Perceived Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black mb-[15px]">
                      {selectedSub.interpretation.mirror?.code || 'N/A'} - {selectedSub.interpretation.mirror?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                    <ul className="list-none p-0 m-0 text-sm leading-[1.6]">
                      {selectedSub.interpretation.mirror?.traits.map((trait, i) => <li key={i}>• {trait}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Detailed Feedback & Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Deskripsi Kepribadian Utama (Berdasarkan Mirror/Shift)</h3>
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-sm leading-relaxed text-slate-700 space-y-4">
                  {selectedSub.interpretation.description?.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                  {(!selectedSub.interpretation.description || selectedSub.interpretation.description.length === 0) && (
                    <p><i>Deskripsi detail tidak tersedia untuk profil kombinasi ini.</i></p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {`
);

fs.writeFileSync('src/components/AdminPortal.tsx', admin);
console.log("Injected printable full-page view");
