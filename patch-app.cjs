const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  `<ParticipantForm 
            onSubmit={handleStartTest} 
            onCancel={handleCancelForm}
            selectedTestName={selectedTest === 'disc' ? 'Analisa Kepribadian' : 'Tes Kepribadian'}
          />`,
  `<ParticipantForm 
            onSubmit={handleProceedToInstructions} 
            onCancel={handleCancelForm}
            selectedTestName={selectedTest === 'disc' ? 'Analisa Kepribadian' : 'Tes Kepribadian'}
            initialData={participant}
          />
        )}
        
        {step === 'instructions' && (
          <TestInstructionsView
            onStartTest={handleStartTest}
            onBack={handleBackToForm}
            participant={participant}
          />`
);

fs.writeFileSync('src/App.tsx', app);
console.log('Patched App.tsx');
