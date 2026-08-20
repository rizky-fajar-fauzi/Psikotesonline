const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

// Wait, the user said "MATIKAN PROTEKSI DI PORTAL ADMIN" (turn off protection in Admin Portal)
// We already did: const [isAuthenticated, setIsAuthenticated] = useState(true);
// Let's remove the login form completely if it exists just to be clean, or check how it's rendered.

const startLogin = code.indexOf('if (!isAuthenticated) {');
const endLogin = code.indexOf('return (', startLogin);

if (startLogin !== -1 && endLogin !== -1) {
    code = code.substring(0, startLogin) + code.substring(endLogin);
}

// And what about the Print/Email buttons? They wanted "Unduh pdf dan dikirim ke mail namun tidak otomatis".
// We just removed them from the participant view (since results shouldn't be shown to participants).
// But maybe they want those buttons ON THE ADMIN PORTAL view for each submission so the admin can print/email?
// Let's check AdminPortal.tsx to see where we can add them.

// Right now, AdminPortal has: 
// {/* Resend Email Tool */} 
// which is for sending the admin email. Maybe we change it to send the Participant email?
// Or we just add a "Print to PDF" button on the Admin Portal's single submission view.

fs.writeFileSync('src/components/AdminPortal.tsx', code);
