const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace("  const [submissionResult, setSubmissionResult] = useState<any>(null);\n  const [submissionResult, setSubmissionResult] = useState<any>(null);", "  const [submissionResult, setSubmissionResult] = useState<any>(null);");
fs.writeFileSync('src/App.tsx', app);
