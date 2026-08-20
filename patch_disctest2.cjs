const fs = require('fs');
let code = fs.readFileSync('src/components/DiscTestRunner.tsx', 'utf8');

// The error says Cannot find name 'isObscured'. We missed removing the {isObscured && ( ... )} block in the render function.

code = code.replace(/\{\/\* Anti-Screenshot Overlay \*\/\}\n      \{isObscured && \(\n        <div className="fixed inset-0 z-\[9999\] bg-black flex flex-col items-center justify-center p-6 text-center">\n          <AlertCircle className="w-16 h-16 text-rose-500 mb-4" \/>\n          <h2 className="text-2xl font-bold text-white mb-2">Tampilan Disembunyikan<\/h2>\n          <p className="text-slate-300">\n            Untuk menjaga kerahasiaan soal, layar otomatis digelapkan saat mendeteksi perpindahan aplikasi atau upaya tangkapan layar.\n            <br className="hidden sm:block" \/> Silakan klik kembali ke area ini untuk melanjutkan tes.\n          <\/p>\n        <\/div>\n      \)\}/, "");

fs.writeFileSync('src/components/DiscTestRunner.tsx', code);
console.log("Patched DiscTestRunner.tsx again");
