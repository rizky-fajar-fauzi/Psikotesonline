const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// State
app = app.replace(
  "const [referenceCode, setReferenceCode] = useState<string>('');",
  "const [referenceCode, setReferenceCode] = useState<string>('');\n  const [submissionResult, setSubmissionResult] = useState<any>(null);"
);

// Form
app = app.replace(
  "if (res.ok && data.success) {\n        setReferenceCode(data.referenceCode);\n        setStep('completed');",
  "if (res.ok && data.success) {\n        setReferenceCode(data.referenceCode);\n        setSubmissionResult(data.result);\n        setStep('completed');"
);

// Render
app = app.replace(
  "referenceCode={referenceCode}\n            onReset={handleResetSession}",
  "referenceCode={referenceCode}\n            submissionResult={submissionResult}\n            onReset={handleResetSession}"
);

fs.writeFileSync('src/App.tsx', app);
