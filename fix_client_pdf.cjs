const fs = require('fs');
let admin = fs.readFileSync('src/components/AdminPortal.tsx', 'utf8');

admin = admin.replace(
`    const primaryLetter = (selectedSub.interpretation.mirror?.code || selectedSub.interpretation.primaryType || 'X').charAt(0);
    let avatarBg = "bg-indigo-100";
    let avatarText = "text-indigo-600";
    let avatarShape = "rounded-full";
    let avatarIcon = "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"; // Default polygon
    
    if (primaryLetter === 'D') {
      avatarBg = "bg-red-100";
      avatarText = "text-red-600";
      avatarShape = "rounded-[2rem]";
      avatarIcon = "M13 10V3L4 14h7v7l9-11h-7z"; // Zap
    } else if (primaryLetter === 'I') {
      avatarBg = "bg-yellow-100";
      avatarText = "text-yellow-600";
      avatarShape = "rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl";
      avatarIcon = "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"; // Sparkle
    } else if (primaryLetter === 'S') {
      avatarBg = "bg-emerald-100";
      avatarText = "text-emerald-600";
      avatarShape = "rounded-[1rem]";
      avatarIcon = "M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"; // Heart
    } else if (primaryLetter === 'C') {
      avatarBg = "bg-blue-100";
      avatarText = "text-blue-600";
      avatarShape = "rounded-none";
      avatarIcon = "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"; // Hexagon
    }`,
`    const mirrorCode = selectedSub.interpretation.mirror?.code || selectedSub.interpretation.primaryType || 'X';
    const primaryLetter = mirrorCode.replace('Pure ', '').charAt(0);
    let avatarBg = "bg-indigo-100";
    let avatarText = "text-indigo-600";
    let avatarShape = "rounded-full";
    let avatarIcon = "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"; 
    let visualRole = "Pecatur";
    
    if (primaryLetter === 'D') {
      avatarBg = "bg-rose-100";
      avatarText = "text-rose-600";
      avatarShape = "rounded-[2rem]";
      avatarIcon = "M13 10V3L4 14h7v7l9-11h-7z"; // Zap
      visualRole = "Sang Penggerak (Driver)";
    } else if (primaryLetter === 'I') {
      avatarBg = "bg-amber-100";
      avatarText = "text-amber-600";
      avatarShape = "rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl";
      avatarIcon = "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"; // Sparkle
      visualRole = "Sang Inspirator (Influencer)";
    } else if (primaryLetter === 'S') {
      avatarBg = "bg-emerald-100";
      avatarText = "text-emerald-600";
      avatarShape = "rounded-[1rem]";
      avatarIcon = "M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"; // Heart
      visualRole = "Sang Penyeimbang (Steadiness)";
    } else if (primaryLetter === 'C') {
      avatarBg = "bg-sky-100";
      avatarText = "text-sky-600";
      avatarShape = "rounded-none";
      avatarIcon = "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"; // Hexagon
      visualRole = "Sang Analis (Compliance)";
    }`
);

admin = admin.replace(
`<div className={\`w-32 h-32 flex items-center justify-center mb-6 border-4 border-white shadow-xl \${avatarBg} \${avatarShape}\`}>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={\`w-16 h-16 \${avatarText}\`}>
                 <path d={avatarIcon}/>
               </svg>
            </div>
            <h2 className="text-4xl font-black text-slate-900 text-center">
              Tipe {selectedSub.interpretation.mirror?.code || selectedSub.interpretation.primaryType}
            </h2>
            <div className="text-xl font-bold text-indigo-600 mt-1 text-center">
              {selectedSub.interpretation.mirror?.title || selectedSub.interpretation.title}
            </div>`,
`<div className="relative">
              <div className="absolute inset-0 bg-slate-100 blur-2xl rounded-full scale-150 opacity-50"></div>
              <div className={\`relative w-36 h-36 flex items-center justify-center mb-6 border-8 border-white shadow-2xl \${avatarBg} \${avatarShape}\`}>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={\`w-16 h-16 \${avatarText}\`}>
                   <path d={avatarIcon}/>
                 </svg>
              </div>
            </div>
            <h2 className="text-4xl font-black text-slate-900 text-center mt-2">
              {visualRole}
            </h2>
            <div className="text-xl font-bold text-indigo-600 mt-2 text-center bg-indigo-50 px-4 py-1.5 rounded-full inline-block">
              Tipe {mirrorCode} - {selectedSub.interpretation.mirror?.title || selectedSub.interpretation.title}
            </div>`
);

fs.writeFileSync('src/components/AdminPortal.tsx', admin);
console.log("Patched avatar design");
