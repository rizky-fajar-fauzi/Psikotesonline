const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

// Re-add the </>} that we just removed, because it was actually closing {detailTab === 'mmi_form' ? ... : (<> ... </>)}
// Let's put it back properly.

code = code.replace(`
              {resendStatusMsg && (
                <p className="text-xs font-semibold text-center text-indigo-900 bg-indigo-100 p-2 rounded-lg">
                  {resendStatusMsg}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};`, `
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
};`);

fs.writeFileSync('src/components/AdminPortal.tsx', code);
