const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

// Add imports
if (!code.includes("import html2canvas")) {
  code = code.replace("import { motion } from 'motion/react';", "import { motion } from 'motion/react';\nimport html2canvas from 'html2canvas';\nimport { jsPDF } from 'jspdf';");
}

// Add state for PDF generation
if (!code.includes("const [isGeneratingPDF, setIsGeneratingPDF]")) {
  code = code.replace("const [detailTab, setDetailTab] = useState<'report' | 'mmi_form'>('report');", "const [detailTab, setDetailTab] = useState<'report' | 'mmi_form'>('report');\n  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);");
}

// Add PDF download handler
const pdfHandler = `
  const handleDownloadPDF = async () => {
    const element = document.getElementById('pdf-content');
    if (!element) return;
    
    try {
      setIsGeneratingPDF(true);
      
      // We want to temporarily hide the scrollbar for the screenshot
      const originalOverflow = element.style.overflow;
      element.style.overflow = 'visible';
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });
      
      element.style.overflow = originalOverflow;
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = pdfHeight;
      let position = 0;
      
      // First page
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
      
      // Subsequent pages if content is long
      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      
      pdf.save(\`Laporan_DISC_\${selectedSub?.participant.name.replace(/\\s+/g, '_')}_\${selectedSub?.referenceCode}.pdf\`);
    } catch (err) {
      alert('Gagal membuat PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };
`;

if (!code.includes("handleDownloadPDF")) {
  code = code.replace("const handleDeleteSubmission = async", pdfHandler + "\n  const handleDeleteSubmission = async");
}

// Update the print button
code = code.replace(
  `onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak PDF</span>`,
  `onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold flex items-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{isGeneratingPDF ? 'Membuat PDF...' : 'Unduh PDF'}</span>`
);

// Add ID to scrollable area
code = code.replace(
  'className="p-6 overflow-y-auto space-y-6 print:overflow-visible print:p-0">',
  'id="pdf-content" className="p-6 overflow-y-auto space-y-6 print:overflow-visible print:p-0 bg-white">'
);

fs.writeFileSync('src/components/AdminPortal.tsx', code);
console.log("Patched PDF");
