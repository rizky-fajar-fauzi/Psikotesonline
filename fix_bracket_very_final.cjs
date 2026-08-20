const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

// The error was: 
// src/components/AdminPortal.tsx(768,14): error TS17008: JSX element 'div' has no corresponding closing tag.
// Which means `<div className="p-6 overflow-y-auto space-y-6">` wasn't closed properly.
// The structure is:
// <div className="p-6 overflow-y-auto space-y-6">
//   {detailTab === 'mmi_form' ? ( ... ) : ( <> ... </> )}
// </div>

// We need to make sure the closing `</div>` is there before the `</motion.div>`.
// Right now it's:
//               )}
//                 </>
//               )}
//             </div>
//           </motion.div>

// Wait, the error is at line 768. 
// "JSX element 'div' has no corresponding closing tag."

// Let's replace the whole tail.

const tail = `
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

// It seems there are two opening divs? 
// 696: <div className="fixed inset-0 ...">
// 697:   <motion.div ...>
// 703:     <div className="bg-slate-900 ..."> ... </div> (Modal Header)
// 742:     <div className="bg-slate-50 ..."> ... </div> (Modal Tabs)
// 768:     <div className="p-6 overflow-y-auto space-y-6">
// 769:       {detailTab === 'mmi_form' ? ( ... ) : ( <> ... </> )}
// 1042:    </div>
// 1043:  </motion.div>
// 1044: </div>
// 1045: )}
// 1046: </div>
// 1047: );
// 1048: };

code = code.replace(`
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
};
`);

// The problem was previously:
// 1040: 15 error TS17015: Expected corresponding closing tag for JSX fragment.
// So the <> at 772 is not being closed properly.
// Let's check 772.

