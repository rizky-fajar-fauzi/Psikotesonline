const fs = require('fs');
const path = './src/components/AdminPortal.tsx';
let content = fs.readFileSync(path, 'utf-8');

// 1. Change useState(false) to useState(true)
content = content.replace('useState(false);', 'useState(true);');

// 2. Add useEffect to fetch data on load if authenticated
const effectCode = `
  React.useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
      fetchConfig();
    }
  }, [isAuthenticated]);
`;

if (!content.includes('fetchSubmissions();\n      fetchConfig();\n    }\n  }, [isAuthenticated]);')) {
  // Find where to insert it, maybe after handleVerifyPin
  const insertionPoint = '  const handleVerifyPin = async (e: React.FormEvent) => {';
  content = content.replace(insertionPoint, effectCode + '\n' + insertionPoint);
}

fs.writeFileSync(path, content, 'utf-8');
console.log("Patched auth");
