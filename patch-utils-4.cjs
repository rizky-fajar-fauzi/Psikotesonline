const fs = require('fs');
let utils = fs.readFileSync('src/utils/discCalculator.ts', 'utf8');

const targetIndex = utils.lastIndexOf('export function determineDISCInterpretation');
if (targetIndex !== -1) {
    utils = utils.substring(0, targetIndex);
}

const newDetermine = `
export function determineDISCInterpretation(tally: DISCTally): DISCInterpretation {
  const mask = getPersonaProfile(tally.most, normTableGraph1);
  const core = getPersonaProfile(tally.least, normTableGraph2);
  const mirror = getPersonaProfile(tally.change, normTableGraph3);

  return {
    mask,
    core,
    mirror,
    // Provide fallback properties for backward compatibility with older UI rendering
    primaryType: 'D', 
    title: mirror.title,
    summary: mirror.summary,
    strengths: [''], 
    weaknesses: [''],
    workEnvironment: mirror.typeCount,
    communicationTips: [''],
    recommendedRoles: [''],
    underStress: ''
  };
}
`;

utils += newDetermine;
fs.writeFileSync('src/utils/discCalculator.ts', utils);
