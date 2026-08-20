const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');
// "Declaration or statement expected" at line 1048 means there are too many closing brackets.
// Let's remove the very last closing bracket.
code = code.replace(`      )}
    </div>
  );
};
`, `      )}
    </div>
  );
`);
fs.writeFileSync('src/components/AdminPortal.tsx', code);
