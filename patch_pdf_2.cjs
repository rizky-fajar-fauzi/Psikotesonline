const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

const oldFn = `  const handleDownloadPDF = async () => {
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
  };`;
  
const newFn = `  const handleDownloadPDF = async () => {
    const element = document.getElementById('pdf-content');
    if (!element || !selectedSub) return;
    
    try {
      setIsGeneratingPDF(true);
      
      // Save original styles
      const originalOverflow = element.style.overflow;
      const originalHeight = element.style.height;
      const originalMaxHeight = element.style.maxHeight;
      
      // Prepare element for complete capture
      element.style.overflow = 'visible';
      element.style.height = 'auto';
      element.style.maxHeight = 'none';
      
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true, // Handle any external images/svgs
        logging: false,
        backgroundColor: '#ffffff',
        // Make sure it captures the full scrollable height
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });
      
      // Restore styles
      element.style.overflow = originalOverflow;
      element.style.height = originalHeight;
      element.style.maxHeight = originalMaxHeight;
      
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // First page
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
      
      // Subsequent pages if content is long
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(\`Laporan_DISC_\${selectedSub.participant.name.replace(/\\s+/g, '_')}.pdf\`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Gagal membuat PDF: " + (error).message);
    } finally {
      setIsGeneratingPDF(false);
    }
  };`;
  
if (code.includes("const handleDownloadPDF = async")) {
    code = code.replace(/const handleDownloadPDF = async \(\) => \{[\s\S]*?setIsGeneratingPDF\(false\);\n    \}\n  \};\n/, newFn + "\n");
    fs.writeFileSync('src/components/AdminPortal.tsx', code);
    console.log("Updated handleDownloadPDF successfully");
} else {
    console.log("Could not find handleDownloadPDF");
}
