const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

const regex = /{\/\* Resend Email Tool \*\/}[\s\S]*?(?={\/\* Resend Email Tool \*\/|<\/>)/g;
// actually let's just replace the exact text
const textToReplace = `              {/* Resend Email Tool */}
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h5 className="font-bold text-indigo-950 text-sm">Kirim Ulang Laporan Hasil Tes Ke Email</h5>
                  <p className="text-xs text-indigo-800">
                    Kirimkan salinan dokumen ini ke email admin/pengelola.
                  </p>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <input
                    type="email"
                    value={resendCustomEmail}
                    onChange={(e) => setResendCustomEmail(e.target.value)}
                    placeholder="email.admin@domain.com"
                    className="px-3 py-2 bg-white border border-indigo-300 rounded-xl text-xs text-slate-900 focus:outline-none flex-1 sm:w-60"
                  />
                  <button
                    onClick={() => handleResendEmail(selectedSub.id)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim</span>
                  </button>
                </div>
              </div>`;

const newText = `              {/* Send Email Tool (Participant) */}
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
                <div>
                  <h5 className="font-bold text-indigo-950 text-sm">Kirim Laporan Hasil Tes Ke Email Peserta</h5>
                  <p className="text-xs text-indigo-800">
                    Kirimkan salinan dokumen hasil evaluasi DISC ini ke email peserta.
                  </p>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <input
                    type="email"
                    value={resendCustomEmail || selectedSub.participant.email}
                    onChange={(e) => setResendCustomEmail(e.target.value)}
                    placeholder="email.peserta@domain.com"
                    className="px-3 py-2 bg-white border border-indigo-300 rounded-xl text-xs text-slate-900 focus:outline-none flex-1 sm:w-60"
                  />
                  <button
                    onClick={async () => {
                        try {
                          const res = await fetch('/api/send-participant-email', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                                referenceCode: selectedSub.referenceCode, 
                                email: resendCustomEmail || selectedSub.participant.email 
                            }),
                          });
                          const data = await res.json();
                          if (res.ok) {
                            setResendStatusMsg('Email laporan berhasil dikirim ke peserta.');
                          } else {
                            setResendStatusMsg('Gagal mengirim email: ' + data.error);
                          }
                        } catch (err) {
                          setResendStatusMsg('Gagal mengirim email.');
                        }
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim ke Peserta</span>
                  </button>
                  <button
                    onClick={() => {
                        window.print();
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1 shrink-0"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </button>
                </div>
              </div>`;

code = code.replace(textToReplace, newText);

fs.writeFileSync('src/components/AdminPortal.tsx', code);
