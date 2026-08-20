const fs = require('fs');
let code = fs.readFileSync('src/components/TestCompletedView.tsx', 'utf8');

// Add useState
code = code.replace(
  "import React from 'react';",
  "import React, { useState } from 'react';"
);

// Add icons
code = code.replace(
  "import { CheckCircle2, ShieldCheck, Mail, Lock, FileText, ArrowRight, RefreshCw } from 'lucide-react';",
  "import { CheckCircle2, ShieldCheck, Lock, RefreshCw, Printer, Send, Check } from 'lucide-react';"
);

// Add state and handlers
const stateCode = `
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailTarget, setEmailTarget] = useState(participant.email);

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    setEmailStatus('idle');
    try {
      const res = await fetch('/api/send-participant-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referenceCode,
          email: emailTarget,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEmailStatus('success');
      } else {
        setEmailStatus('error');
      }
    } catch (err) {
      setEmailStatus('error');
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
`;

code = code.replace("  return (", stateCode);

// Add buttons
const buttonsCode = `
          {/* Action Buttons */}
          <div className="pt-4 flex flex-col space-y-4 no-print border-t border-slate-200 mt-6 pt-6">
            
            {submissionResult && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Kirim Hasil ke Email:</label>
                  <div className="flex">
                    <input 
                      type="email" 
                      value={emailTarget}
                      onChange={(e) => setEmailTarget(e.target.value)}
                      className="flex-1 text-sm rounded-l-lg border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 px-3 py-2 border"
                    />
                    <button 
                      onClick={handleSendEmail}
                      disabled={isSendingEmail}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-r-lg font-medium text-sm flex items-center transition-colors disabled:opacity-70"
                    >
                      {isSendingEmail ? (
                         <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : emailStatus === 'success' ? (
                         <Check className="w-4 h-4 mr-2" />
                      ) : (
                         <Send className="w-4 h-4 mr-2" />
                      )}
                      {isSendingEmail ? 'Mengirim...' : emailStatus === 'success' ? 'Terkirim!' : 'Kirim'}
                    </button>
                  </div>
                  {emailStatus === 'error' && <p className="text-red-500 text-xs mt-1">Gagal mengirim email. Pastikan SMTP dikonfigurasi.</p>}
                </div>
                
                <div className="flex items-end h-full">
                  <button 
                    onClick={handlePrint}
                    className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors w-full sm:w-auto h-[42px]"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Unduh PDF</span>
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={onReset}
              className="w-full px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-lg flex items-center justify-center space-x-2 mx-auto transition-all"
            >
              <RefreshCw className="w-4 h-4 text-slate-300" />
              <span>Kembali ke Halaman Awal</span>
            </button>
          </div>
        </div>
`;

code = code.replace(
  /{\/\* Action Button \*\/}[\s\S]*?<\/div>\s*<\/div>/,
  buttonsCode.trim() + '\n        </div>'
);

fs.writeFileSync('src/components/TestCompletedView.tsx', code);
