const fs = require('fs');
let code = fs.readFileSync('src/components/DiscTestRunner.tsx', 'utf8');

// Remove isObscured state
code = code.replace("const [isObscured, setIsObscured] = useState(false);", "");

// Remove useEffect
code = code.replace(/useEffect\(\(\) => \{\n    const handleVisibilityChange = \(\) => \{\n      setIsObscured\(document.hidden\);\n    \};\n\n    const handleBlur = \(\) => setIsObscured\(true\);\n    const handleFocus = \(\) => setIsObscured\(false\);\n\n    const handleKeyDown = \(e: KeyboardEvent\) => \{\n      if \(e.key === 'PrintScreen' \|\| e.metaKey\) \{\n        setIsObscured\(true\);\n        setTimeout\(\(\) => setIsObscured\(false\), 3000\);\n      \}\n    \};\n\n    document.addEventListener\('visibilitychange', handleVisibilityChange\);\n    window.addEventListener\('blur', handleBlur\);\n    window.addEventListener\('focus', handleFocus\);\n    window.addEventListener\('keydown', handleKeyDown\);\n\n    return \(\) => \{\n      document.removeEventListener\('visibilitychange', handleVisibilityChange\);\n      window.removeEventListener\('blur', handleBlur\);\n      window.removeEventListener\('focus', handleFocus\);\n      window.removeEventListener\('keydown', handleKeyDown\);\n    \};\n  \}, \[\]\);/, "");

// Remove no-select and onContextMenu
code = code.replace(/ className="max-w-4xl mx-auto my-6 px-4 sm:px-6 no-select relative"\n      onContextMenu=\{\(e\) => e.preventDefault\(\)\}/, ' className="max-w-4xl mx-auto my-6 px-4 sm:px-6 relative"');

// Remove anti screenshot overlay
code = code.replace(/\{\/\* Anti-Screenshot Overlay \*\/\}\n      \{isObscured && \(\n        <div className="fixed inset-0 z-\[9999\] bg-black flex flex-col items-center justify-center p-6 text-center">\n          <AlertCircle className="w-16 h-16 text-rose-500 mb-4" \/>\n          <h2 className="text-2xl font-bold text-white mb-2">\n            Fokus & Privasi Diperlukan\n          <\/h2>\n          <p className="text-slate-300 max-w-md">\n            Mohon tidak melakukan tangkapan layar, meninggalkan halaman, atau\n            beralih aplikasi selama tes berlangsung untuk menjaga validitas hasil.\n          <\/p>\n        <\/div>\n      \)\}/, "");

fs.writeFileSync('src/components/DiscTestRunner.tsx', code);
console.log("Patched DiscTestRunner.tsx successfully");
