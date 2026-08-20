const fs = require('fs');

const path = './src/components/AdminPortal.tsx';
let content = fs.readFileSync(path, 'utf-8');

// Find the block from: {/* Participant Demographic Card */}
// To: {/* Send Email Tool (Participant) */} (excluding it)

const startMarker = '{/* Participant Demographic Card */}';
const endMarker = '{/* Send Email Tool (Participant) */}';

const startIndex = content.lastIndexOf(startMarker); // we want the one in the modal
const endIndex = content.lastIndexOf(endMarker);

if (startIndex > -1 && endIndex > -1) {
  const modalContentBlock = content.substring(startIndex, endIndex);
  
  content = content.replace('${modalContent}', modalContentBlock);
  fs.writeFileSync(path, content, 'utf-8');
  console.log("Successfully replaced ${modalContent} with the block.");
} else {
  console.log("Could not find markers.", {startIndex, endIndex});
}
