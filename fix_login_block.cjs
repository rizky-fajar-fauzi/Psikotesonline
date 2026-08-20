const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

const start = `  // PIN Login View
  return (
      <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">`;

const end = `      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 overflow-hidden">`;

const startIdx = code.indexOf(start);
const endIdx = code.indexOf(end);

if (startIdx !== -1 && endIdx !== -1) {
    code = code.substring(0, startIdx) + `  // PIN Login View bypassed
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 overflow-hidden">` + code.substring(endIdx + end.length);
    fs.writeFileSync('src/components/AdminPortal.tsx', code);
    console.log("Success");
} else {
    console.log("Failed to find boundaries");
}
