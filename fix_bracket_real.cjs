const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

// I know exactly what it is. The tail should look exactly like this:
const properTail = `
              {resendStatusMsg && (
                <p className="text-xs font-semibold text-center text-indigo-900 bg-indigo-100 p-2 rounded-lg">
                  {resendStatusMsg}
                </p>
              )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};`;

// But there's a weird thing going on. Let's just rewrite the whole file's tail from `onClick={() => handleResendEmail(selectedSub.id)}` onwards.

const splitPoint = '<span>Unduh PDF</span>\n                  </button>\n                </div>\n              </div>';

const parts = code.split(splitPoint);
if(parts.length === 2) {
    code = parts[0] + splitPoint + `

              {resendStatusMsg && (
                <p className="text-xs font-semibold text-center text-indigo-900 bg-indigo-100 p-2 rounded-lg">
                  {resendStatusMsg}
                </p>
              )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
`;
    fs.writeFileSync('src/components/AdminPortal.tsx', code);
}
