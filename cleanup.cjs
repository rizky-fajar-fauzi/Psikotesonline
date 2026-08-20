const fs = require('fs');
let code = fs.readFileSync('src/components/DiscTestRunner.tsx', 'utf8');

// Remove state
code = code.replace("  const [showConfirmModal, setShowConfirmModal] = useState(false);\n", "");

// Let's find the confirmation modal and remove it
const startModal = `      {/* Confirmation Modal */}
      {showConfirmModal && (`;
const endModal = `      )}
    </div>
  );
};`;

const startIdx = code.indexOf(startModal);
const endIdx = code.lastIndexOf(endModal);

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + `    </div>\n  );\n};\n`;
  fs.writeFileSync('src/components/DiscTestRunner.tsx', code);
  console.log("Cleanup success");
} else {
  console.log("Cleanup boundaries not found");
}
