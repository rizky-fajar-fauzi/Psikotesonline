const fs = require('fs');
let admin = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

// Find the modal content which starts at `<>` (around 1047) and ends at `</>` (around 1316)
let modalStartIndex = admin.indexOf('<>', admin.indexOf('detailTab === \'mmi_form\'', 1000));
let modalEndIndex = admin.indexOf('</>', modalStartIndex);

if (modalStartIndex > -1 && modalEndIndex > -1) {
  let modalContent = admin.substring(modalStartIndex + 2, modalEndIndex);
  
  // Now replace the admin print block
  let adminPrintRegex = /if \(printType === 'admin' && selectedSub\) \{\s*return \(\s*<div className="bg-white min-h-screen w-full">\s*<div id="pdf-content" className="[^"]*">\s*\{detailTab === 'mmi_form' \? \(\s*<MmiFormAGridView submission=\{selectedSub\} \/>\s*\) : \(\s*<>\s*([\s\S]*?)\s*<\/>\s*\)\}\s*<\/div>\s*<\/div>\s*\);\s*\}/;
  
  let newAdminPrintBlock = `if (printType === 'admin' && selectedSub) {
    return (
      <div className="bg-white min-h-screen w-full font-sans">
        <div id="pdf-content" className="p-8 max-w-[210mm] mx-auto bg-white">
          <div className="print:break-after-page pb-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Lembar Jawaban Asli (MMI Form)</h1>
            <MmiFormAGridView submission={selectedSub} />
          </div>
          <div className="space-y-6 pt-8">
            \${modalContent}
          </div>
        </div>
      </div>
    );
  }`;
  
  admin = admin.replace(adminPrintRegex, newAdminPrintBlock);
  fs.writeFileSync('src/components/AdminPortal.tsx', admin);
  console.log("Patched admin print view successfully");
} else {
  console.log("Could not find modal bounds");
}

