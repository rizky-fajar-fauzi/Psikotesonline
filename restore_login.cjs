const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

// 1. Set isAuthenticated to false
code = code.replace(
  "const [isAuthenticated, setIsAuthenticated] = useState(true);",
  "const [isAuthenticated, setIsAuthenticated] = useState(false);"
);

// 2. Add the login modal view before the main return
const bypassedMarker = "  // PIN Login View bypassed\n  return (\n    <div className=\"fixed inset-0";

const originalLoginView = `  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100 text-center relative"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">Portal Admin</h2>
          <p className="mt-1 text-sm text-slate-500">
            Masukkan PIN Keamanan untuk mengakses seluruh hasil tes dan database peserta.
          </p>

          <form onSubmit={handleVerifyPin} className="mt-6 space-y-4">
            <div>
              <div className="relative max-w-xs mx-auto">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Masukkan PIN Admin"
                  maxLength={20}
                  className="w-full text-center tracking-widest text-lg font-bold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                  autoFocus
                />
              </div>
              {loginError && (
                <p className="mt-2 text-xs text-rose-500 font-semibold flex items-center justify-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                  <span>{loginError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all"
            >
              Masuk Dashboard Admin
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
            Akses Terbatas: Khusus Admin & Pengelola
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0`;

code = code.replace(bypassedMarker, originalLoginView);

fs.writeFileSync('src/components/AdminPortal.tsx', code);
console.log("Restored");
