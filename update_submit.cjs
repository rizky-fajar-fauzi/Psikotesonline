const fs = require('fs');
let code = fs.readFileSync('src/components/DiscTestRunner.tsx', 'utf8');

// Replace handleAttemptSubmit
code = code.replace(
  `    setShowConfirmModal(true);
  };

  const confirmSubmit = () => {
    setShowConfirmModal(false);
    onSubmitTest(answers);
  };`,
  `    onSubmitTest(answers);
  };`
);

fs.writeFileSync('src/components/DiscTestRunner.tsx', code);
