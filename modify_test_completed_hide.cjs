const fs = require('fs');
let code = fs.readFileSync('src/components/TestCompletedView.tsx', 'utf8');

// The goal is to remove the detailed results layout and just show a message.
// The code currently has: {submissionResult && ( ... detailed result ... )}
// We want to replace it with just the proteksi result banner.

const startResult = code.indexOf('{submissionResult ? (');
const endResult = code.indexOf('          {/* Participant Info Summary */}');

if (startResult !== -1 && endResult !== -1) {
    const replacement = `
          {/* Result Section (HIDDEN) */}
          <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-5 text-left flex items-start space-x-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-blue-600/20">
              <Lock className="w-5 h-5" />
            </div>
            <div className="text-sm text-slate-700 leading-relaxed">
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Proteksi Hasil Tes (Kerahasiaan Evaluasi)
              </h3>
              <p className="mb-2">
                Sesuai standar kerahasiaan evaluasi psikometri dan instruksi pengelola, <strong className="text-blue-900">hasil tes akhir tidak ditampilkan di layar ini</strong>.
              </p>
              <p className="text-xs text-slate-600">
                Data jawaban Anda telah tersimpan otomatis di database server. Admin/pengelola HR dapat mengakses dan melihat hasil evaluasi lengkap Anda melalui Portal Admin.
              </p>
            </div>
          </div>
\n`;
    
    code = code.substring(0, startResult) + replacement + code.substring(endResult);
}

// We should also remove the "Action Buttons" block that shows "Unduh PDF" and "Kirim Email" since they can't see the result.
const startActionButtons = code.indexOf('{submissionResult && (');
const endActionButtons = code.indexOf('<button\n              onClick={onReset}');

if (startActionButtons !== -1 && endActionButtons !== -1) {
    code = code.substring(0, startActionButtons) + code.substring(endActionButtons);
}

fs.writeFileSync('src/components/TestCompletedView.tsx', code);
