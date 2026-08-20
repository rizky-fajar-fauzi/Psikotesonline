const fs = require('fs');

let admin = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

admin = admin.replace(
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
    };`,
`    const [printType, setPrintType] = useState<'admin' | 'client' | null>(null);
    
    useEffect(() => {
      if (printType) {
        setTimeout(() => {
          window.print();
          setPrintType(null);
        }, 300);
      }
    }, [printType]);

    const handleDownloadPDF = (type: 'admin' | 'client') => {
      setPrintType(type);
    };`
);

admin = admin.replace(
`  if (isPrintingModal && selectedSub) {`,
`  if (printType === 'admin' && selectedSub) {`
);

fs.writeFileSync('src/components/AdminPortal.tsx', admin);
console.log("Patched printType");
