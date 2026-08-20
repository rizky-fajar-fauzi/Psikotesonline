import { AnswerSelection, DISCTally, DISCType, DISCDimension, DISCInterpretation, DISCProfile } from '../types';
import { discQuestions } from '../data/discQuestions';

// ============================================================================
// STEP 1: ANSWER KEY JSON
// ============================================================================
export const ANSWER_KEY_JSON: Record<string, Record<string, { most: DISCDimension; least: DISCDimension }>> = {
  "1": { "1": { "most": "S", "least": "S" }, "2": { "most": "I", "least": "I" }, "3": { "most": "X", "least": "D" }, "4": { "most": "C", "least": "C" } },
  "2": { "1": { "most": "C", "least": "X" }, "2": { "most": "D", "least": "D" }, "3": { "most": "X", "least": "I" }, "4": { "most": "S", "least": "S" } },
  "3": { "1": { "most": "I", "least": "I" }, "2": { "most": "X", "least": "C" }, "3": { "most": "X", "least": "S" }, "4": { "most": "D", "least": "X" } },
  "4": { "1": { "most": "C", "least": "C" }, "2": { "most": "S", "least": "S" }, "3": { "most": "X", "least": "I" }, "4": { "most": "D", "least": "D" } },
  "5": { "1": { "most": "I", "least": "X" }, "2": { "most": "D", "least": "D" }, "3": { "most": "S", "least": "S" }, "4": { "most": "X", "least": "C" } },
  "6": { "1": { "most": "C", "least": "X" }, "2": { "most": "D", "least": "D" }, "3": { "most": "I", "least": "I" }, "4": { "most": "S", "least": "S" } },
  "7": { "1": { "most": "S", "least": "X" }, "2": { "most": "I", "least": "I" }, "3": { "most": "X", "least": "C" }, "4": { "most": "X", "least": "D" } },
  "8": { "1": { "most": "I", "least": "I" }, "2": { "most": "S", "least": "S" }, "3": { "most": "C", "least": "C" }, "4": { "most": "D", "least": "D" } },
  "9": { "1": { "most": "D", "least": "D" }, "2": { "most": "C", "least": "C" }, "3": { "most": "X", "least": "I" }, "4": { "most": "X", "least": "S" } },
  "10": { "1": { "most": "X", "least": "C" }, "2": { "most": "D", "least": "D" }, "3": { "most": "S", "least": "S" }, "4": { "most": "I", "least": "X" } },
  "11": { "1": { "most": "S", "least": "X" }, "2": { "most": "X", "least": "I" }, "3": { "most": "D", "least": "D" }, "4": { "most": "C", "least": "C" } },
  "12": { "1": { "most": "X", "least": "S" }, "2": { "most": "C", "least": "X" }, "3": { "most": "I", "least": "I" }, "4": { "most": "D", "least": "D" } },
  "13": { "1": { "most": "D", "least": "D" }, "2": { "most": "S", "least": "X" }, "3": { "most": "I", "least": "X" }, "4": { "most": "X", "least": "C" } },
  "14": { "1": { "most": "C", "least": "C" }, "2": { "most": "I", "least": "I" }, "3": { "most": "S", "least": "X" }, "4": { "most": "D", "least": "D" } },
  "15": { "1": { "most": "S", "least": "S" }, "2": { "most": "C", "least": "X" }, "3": { "most": "I", "least": "I" }, "4": { "most": "D", "least": "D" } },
  "16": { "1": { "most": "X", "least": "D" }, "2": { "most": "C", "least": "X" }, "3": { "most": "I", "least": "I" }, "4": { "most": "S", "least": "S" } },
  "17": { "1": { "most": "X", "least": "C" }, "2": { "most": "D", "least": "D" }, "3": { "most": "S", "least": "S" }, "4": { "most": "I", "least": "X" } },
  "18": { "1": { "most": "D", "least": "D" }, "2": { "most": "X", "least": "I" }, "3": { "most": "X", "least": "S" }, "4": { "most": "C", "least": "X" } },
  "19": { "1": { "most": "D", "least": "D" }, "2": { "most": "S", "least": "X" }, "3": { "most": "I", "least": "I" }, "4": { "most": "X", "least": "C" } },
  "20": { "1": { "most": "D", "least": "X" }, "2": { "most": "S", "least": "S" }, "3": { "most": "I", "least": "I" }, "4": { "most": "C", "least": "X" } },
  "21": { "1": { "most": "S", "least": "S" }, "2": { "most": "D", "least": "D" }, "3": { "most": "I", "least": "I" }, "4": { "most": "X", "least": "C" } },
  "22": { "1": { "most": "S", "least": "S" }, "2": { "most": "X", "least": "I" }, "3": { "most": "D", "least": "D" }, "4": { "most": "C", "least": "C" } },
  "23": { "1": { "most": "X", "least": "D" }, "2": { "most": "I", "least": "X" }, "3": { "most": "S", "least": "S" }, "4": { "most": "X", "least": "C" } },
  "24": { "1": { "most": "X", "least": "S" }, "2": { "most": "I", "least": "I" }, "3": { "most": "D", "least": "X" }, "4": { "most": "C", "least": "X" } }
};

// ============================================================================
// STEP 3: NORM SCORE CONVERSION LOOKUP TABLE (GRAPH 3)

// Tabel Norma untuk MASK (Berdasarkan Total Pilihan 'Most')
export const normTableGraph1: Record<string, Record<DISCType, number>> = {
  "0": {"D": -6.0, "I": -7.0, "S": -5.7, "C": -6.0},
  "1": {"D": -5.3, "I": -4.6, "S": -4.3, "C": -4.7},
  "2": {"D": -4.0, "I": -2.5, "S": -3.5, "C": -3.5},
  "3": {"D": -2.5, "I": -1.3, "S": -1.5, "C": -1.5},
  "4": {"D": -1.7, "I": 1.0, "S": -0.7, "C": 0.5},
  "5": {"D": -1.3, "I": 3.0, "S": 0.5, "C": 2.0},
  "6": {"D": 0.0, "I": 3.5, "S": 1.0, "C": 3.0},
  "7": {"D": 0.5, "I": 5.3, "S": 2.5, "C": 5.3},
  "8": {"D": 1.0, "I": 5.7, "S": 3.0, "C": 5.7},
  "9": {"D": 2.0, "I": 6.0, "S": 4.0, "C": 6.0},
  "10": {"D": 3.0, "I": 6.5, "S": 4.6, "C": 6.3},
  "11": {"D": 3.5, "I": 7.0, "S": 5.0, "C": 6.5},
  "12": {"D": 4.0, "I": 7.0, "S": 5.7, "C": 6.7},
  "13": {"D": 4.7, "I": 7.0, "S": 6.0, "C": 7.0},
  "14": {"D": 5.3, "I": 7.0, "S": 6.5, "C": 7.3},
  "15": {"D": 6.5, "I": 7.0, "S": 6.5, "C": 7.3},
  "16": {"D": 7.0, "I": 7.5, "S": 7.0, "C": 7.3},
  "17": {"D": 7.0, "I": 7.5, "S": 7.0, "C": 7.5},
  "18": {"D": 7.0, "I": 7.5, "S": 7.0, "C": 8.0},
  "19": {"D": 7.3, "I": 8.0, "S": 7.3, "C": 8.0},
  "20": {"D": 7.3, "I": 8.0, "S": 7.5, "C": 8.0},
  "21": {"D": 7.5, "I": 8.0, "S": 8.0, "C": 8.0},
  "22": {"D": 8.0, "I": 8.0, "S": 8.0, "C": 8.0},
  "23": {"D": 8.0, "I": 8.0, "S": 8.0, "C": 8.0},
  "24": {"D": 8.0, "I": 8.0, "S": 8.0, "C": 8.0}
};

// Tabel Norma untuk CORE (Berdasarkan Total Pilihan 'Least')
export const normTableGraph2: Record<string, Record<DISCType, number>> = {
  "0": {"D": 7.5, "I": 7.0, "S": 7.5, "C": 7.5},
  "1": {"D": 6.5, "I": 6.0, "S": 7.0, "C": 7.0},
  "2": {"D": 4.3, "I": 4.0, "S": 6.0, "C": 5.6},
  "3": {"D": 2.5, "I": 2.5, "S": 4.0, "C": 4.0},
  "4": {"D": 1.5, "I": 0.5, "S": 2.5, "C": 2.5},
  "5": {"D": 0.5, "I": 0.0, "S": 1.5, "C": 1.5},
  "6": {"D": 0.0, "I": -2.0, "S": 0.5, "C": 0.5},
  "7": {"D": -1.3, "I": -3.5, "S": -1.3, "C": 0.0},
  "8": {"D": -1.5, "I": -4.3, "S": -2.0, "C": -1.3},
  "9": {"D": -2.5, "I": -5.3, "S": -3.0, "C": -2.5},
  "10": {"D": -3.0, "I": -6.0, "S": -4.3, "C": -3.5},
  "11": {"D": -3.5, "I": -6.5, "S": -5.3, "C": -5.3},
  "12": {"D": -4.3, "I": -7.0, "S": -6.0, "C": -5.7},
  "13": {"D": -5.3, "I": -7.2, "S": -6.5, "C": -6.0},
  "14": {"D": -5.7, "I": -7.2, "S": -6.7, "C": -6.5},
  "15": {"D": -6.0, "I": -7.2, "S": -6.7, "C": -7.0},
  "16": {"D": -6.5, "I": -7.3, "S": -7.0, "C": -7.3},
  "17": {"D": -6.7, "I": -7.3, "S": -7.2, "C": -7.5}, // Bug Minus Excel diperbaiki
  "18": {"D": -7.0, "I": -7.3, "S": -7.3, "C": -7.7}, // Bug Minus Excel diperbaiki
  "19": {"D": -7.3, "I": -7.5, "S": -7.5, "C": -7.9},
  "20": {"D": -7.5, "I": -8.0, "S": -8.0, "C": -8.0},
  "21": {"D": -8.0, "I": -8.0, "S": -8.0, "C": -8.0},
  "22": {"D": -8.0, "I": -8.0, "S": -8.0, "C": -8.0},
  "23": {"D": -8.0, "I": -8.0, "S": -8.0, "C": -8.0},
  "24": {"D": -8.0, "I": -8.0, "S": -8.0, "C": -8.0}
};

// Maps raw Change score (-24 to +24) to Graph 3 Norm Coordinates
// ============================================================================
export const normTableGraph3: Record<string, Record<DISCType, number>> = {
  "-24": {"D": -8.0, "I": -8.0, "S": -8.0, "C": -8.0},
  "-23": {"D": -8.0, "I": -8.0, "S": -8.0, "C": -8.0},
  "-22": {"D": -8.0, "I": -8.0, "S": -8.0, "C": -7.5},
  "-21": {"D": -7.5, "I": -8.0, "S": -8.0, "C": -7.3},
  "-20": {"D": -7.0, "I": -8.0, "S": -8.0, "C": -7.3},
  "-19": {"D": -6.8, "I": -8.0, "S": -8.0, "C": -7.0},
  "-18": {"D": -6.75, "I": -7.0, "S": -7.5, "C": -6.7},
  "-17": {"D": -6.7, "I": -6.7, "S": -7.3, "C": -6.7},
  "-16": {"D": -6.5, "I": -6.7, "S": -7.3, "C": -6.7},
  "-15": {"D": -6.3, "I": -6.7, "S": -7.0, "C": -6.5},
  "-14": {"D": -6.1, "I": -6.7, "S": -6.5, "C": -6.3},
  "-13": {"D": -5.9, "I": -6.7, "S": -6.5, "C": -6.0},
  "-12": {"D": -5.7, "I": -6.7, "S": -6.5, "C": -5.85},
  "-11": {"D": -5.3, "I": -6.7, "S": -6.5, "C": -5.85},
  "-10": {"D": -4.3, "I": -6.5, "S": -6.0, "C": -5.7},
  "-9": {"D": -3.5, "I": -6.0, "S": -4.7, "C": -4.7},
  "-8": {"D": -3.25, "I": -5.7, "S": -4.3, "C": -4.3},
  "-7": {"D": -3.0, "I": -4.7, "S": -3.5, "C": -3.5},
  "-6": {"D": -2.75, "I": -4.3, "S": -3.0, "C": -3.0},
  "-5": {"D": -2.5, "I": -3.5, "S": -2.0, "C": -2.5},
  "-4": {"D": -1.5, "I": -3.0, "S": -1.5, "C": -0.5},
  "-3": {"D": -1.0, "I": -2.0, "S": -1.0, "C": 0.0},
  "-2": {"D": -0.5, "I": -1.5, "S": -0.5, "C": 0.3},
  "-1": {"D": -0.25, "I": 0.0, "S": 0.0, "C": 0.5},
  "0": {"D": 0.0, "I": 0.5, "S": 1.0, "C": 1.5},
  "1": {"D": 0.5, "I": 1.0, "S": 1.5, "C": 3.0},
  "2": {"D": 0.7, "I": 1.5, "S": 2.0, "C": 4.0},
  "3": {"D": 1.0, "I": 3.0, "S": 3.0, "C": 4.3},
  "4": {"D": 1.3, "I": 4.0, "S": 3.5, "C": 5.5},
  "5": {"D": 1.5, "I": 4.3, "S": 4.0, "C": 5.7},
  "6": {"D": 2.0, "I": 5.0, "S": 4.3, "C": 6.0},
  "7": {"D": 2.5, "I": 5.5, "S": 4.7, "C": 6.3},
  "8": {"D": 3.5, "I": 6.5, "S": 5.0, "C": 6.5},
  "9": {"D": 4.0, "I": 6.7, "S": 5.5, "C": 6.7},
  "10": {"D": 4.7, "I": 7.0, "S": 6.0, "C": 7.0},
  "11": {"D": 4.85, "I": 7.3, "S": 6.2, "C": 7.3},
  "12": {"D": 5.0, "I": 7.3, "S": 6.3, "C": 7.3},
  "13": {"D": 5.5, "I": 7.3, "S": 6.5, "C": 7.3},
  "14": {"D": 6.0, "I": 7.3, "S": 6.7, "C": 7.3},
  "15": {"D": 6.3, "I": 7.3, "S": 7.0, "C": 7.3},
  "16": {"D": 6.5, "I": 7.3, "S": 7.3, "C": 7.3},
  "17": {"D": 6.7, "I": 7.3, "S": 7.3, "C": 7.5},
  "18": {"D": 7.0, "I": 7.5, "S": 7.3, "C": 8.0},
  "19": {"D": 7.3, "I": 8.0, "S": 7.3, "C": 8.0},
  "20": {"D": 7.3, "I": 8.0, "S": 7.5, "C": 8.0},
  "21": {"D": 7.5, "I": 8.0, "S": 8.0, "C": 8.0},
  "22": {"D": 8.0, "I": 8.0, "S": 8.0, "C": 8.0},
  "23": {"D": 8.0, "I": 8.0, "S": 8.0, "C": 8.0},
  "24": {"D": 8.0, "I": 8.0, "S": 8.0, "C": 8.0}
};

/**
 * Converts a raw Change Score (-24 to +24) into a Graph 3 Norm Score.
 */
export function convertChangeToNormScore(trait: DISCType, changeScore: number): number {
  return normTableGraph3[String(changeScore)]?.[trait] ?? 0;
}

// ============================================================================
// STEP 4: DETERMINE PERSONALITY CODE / PATTERN
// ============================================================================
/**
 * Calculates personality pattern code based on Graph 3 Norm Coordinates:
 * 1. Lookup Norm Score for D, I, S, C using normTableGraph3
 * 2. Filter traits: Keep ONLY traits where Norm Score > 0
 * 3. Sort traits descending by Norm Score
 * 4. Format string:
 *    - 0 traits > 0 -> "Invalid/Transisi"
 *    - 1 trait > 0  -> "Pure X"
 *    - > 1 traits > 0 -> "X-Y-Z"
 */
export function getPersonalityPattern(
  rawChangeD: number,
  rawChangeI: number,
  rawChangeS: number,
  rawChangeC: number
): string {
  // 1. Lookup Norm Scores
  const normD = normTableGraph3[String(rawChangeD)]?.D ?? 0;
  const normI = normTableGraph3[String(rawChangeI)]?.I ?? 0;
  const normS = normTableGraph3[String(rawChangeS)]?.S ?? 0;
  const normC = normTableGraph3[String(rawChangeC)]?.C ?? 0;

  const traitNorms: { type: DISCType; normScore: number }[] = [
    { type: 'D', normScore: normD },
    { type: 'I', normScore: normI },
    { type: 'S', normScore: normS },
    { type: 'C', normScore: normC },
  ];

  // 2. Filter traits: Keep ONLY traits strictly greater than 0 (> 0)
  const positiveTraits = traitNorms.filter((item) => item.normScore > 0);

  // 3. Sort descending based on Norm Score
  positiveTraits.sort((a, b) => {
    const diff = b.normScore - a.normScore;
    if (diff !== 0) return diff;
    const order: DISCType[] = ['D', 'I', 'S', 'C'];
    return order.indexOf(a.type) - order.indexOf(b.type);
  });

  // 4. Format output string
  if (positiveTraits.length === 0) {
    return 'Invalid/Transisi';
  }

  if (positiveTraits.length === 1) {
    return `Pure ${positiveTraits[0].type}`;
  }

  return positiveTraits.map((t) => t.type).join('-');
}

export function determinePersonalityCode(normScores: Record<DISCType, number>): string {
  const traitOrder: DISCType[] = ['D', 'I', 'S', 'C'];
  const positiveTraits = traitOrder.filter((trait) => normScores[trait] > 0);

  if (positiveTraits.length === 0) {
    return 'Invalid/Transisi';
  }

  positiveTraits.sort((a, b) => {
    const diff = normScores[b] - normScores[a];
    if (diff !== 0) return diff;
    return traitOrder.indexOf(a) - traitOrder.indexOf(b);
  });

  if (positiveTraits.length === 1) {
    return `Pure ${positiveTraits[0]}`;
  }

  return positiveTraits.join('-');
}

export function calculateDISCTally(answers: Record<number, AnswerSelection>): DISCTally {
  const most: Record<DISCDimension, number> = { D: 0, I: 0, S: 0, C: 0, X: 0 };
  const least: Record<DISCDimension, number> = { D: 0, I: 0, S: 0, C: 0, X: 0 };

  Object.entries(answers).forEach(([questionIdStr, sel]) => {
    const qId = parseInt(questionIdStr, 10);
    const questionKey = ANSWER_KEY_JSON[String(qId)];

    if (questionKey) {
      if (sel.mostIndex >= 0 && sel.mostIndex < 4) {
        const optionKey = questionKey[String(sel.mostIndex + 1)];
        if (optionKey && optionKey.most) {
          most[optionKey.most] = (most[optionKey.most] || 0) + 1;
        }
      }

      if (sel.leastIndex >= 0 && sel.leastIndex < 4) {
        const optionKey = questionKey[String(sel.leastIndex + 1)];
        if (optionKey && optionKey.least) {
          least[optionKey.least] = (least[optionKey.least] || 0) + 1;
        }
      }
    } else {
      const question = discQuestions.find((q) => q.id === qId);
      if (question) {
        if (sel.mostIndex >= 0 && sel.mostIndex < question.options.length) {
          const mType = question.options[sel.mostIndex].mostType;
          if (mType) most[mType] = (most[mType] || 0) + 1;
        }
        if (sel.leastIndex >= 0 && sel.leastIndex < question.options.length) {
          const lType = question.options[sel.leastIndex].leastType;
          if (lType) least[lType] = (least[lType] || 0) + 1;
        }
      }
    }
  });

  const change: Record<DISCDimension, number> = {
    D: most.D - least.D,
    I: most.I - least.I,
    S: most.S - least.S,
    C: most.C - least.C,
    X: most.X - least.X,
  };

  return { most, least, change };
}




export function getPersonaProfile(rawScores: Record<DISCDimension, number>, normTable: Record<string, Record<DISCType, number>>): DISCProfile {
  const normD = normTable[String(rawScores.D)]?.D ?? 0;
  const normI = normTable[String(rawScores.I)]?.I ?? 0;
  const normS = normTable[String(rawScores.S)]?.S ?? 0;
  const normC = normTable[String(rawScores.C)]?.C ?? 0;

  const arrayScores = [
    { trait: 'D', value: normD },
    { trait: 'I', value: normI },
    { trait: 'S', value: normS },
    { trait: 'C', value: normC }
  ];

  const positiveTraits = arrayScores.filter(item => item.value > 0);
  positiveTraits.sort((a, b) => {
    const diff = b.value - a.value;
    if (diff !== 0) return diff;
    const order = ['D', 'I', 'S', 'C'];
    return order.indexOf(a.trait) - order.indexOf(b.trait);
  });

  let patternCode = "";
  if (positiveTraits.length === 0) {
    patternCode = "Transisi";
  } else if (positiveTraits.length === 1) {
    patternCode = "Pure " + positiveTraits[0].trait;
  } else {
    patternCode = positiveTraits.map(item => item.trait).join("-");
  }

  const discDatabase: Record<string, { title: string; traits: string[]; job_match: string; summary: string }> = {
    "Pure D": { "title": "ESTABLISHER", "traits": ["Individualis","Ego Tinggi, Kurang Sensitif","Kurang Pertimbangan","Efektif","High Motivation","Bersemangat Tinggi","Percaya Diri, cenderung Nekat","Kreatif","Terlalu Dominan","Agresif","Terlalu Dinamis","Penuh Ambisi"], "job_match": "Attorney, Researcher, Sales Representative, Planning Consultant, Transport Personnel, Production (Director, Manager, Supervisor), Technologist, Strategic Planning, Trouble Shooting, Marketing Services, Consultant, Engineering (Director, Manager, Supervisor) and Self-Employment.", "summary": "Memiliki rasa ego yang tinggi dan cenderung invidualis dengan standard yang sangat tinggi. Ia lebih suka menganalisa masalah sendirian daripada bersama orang lain. Rasa egoisnya yang kuat membuatnya tidak nyaman di bawah kendali orang lain; ia lebih suka menjadi \"boss\" dan menetapkan standard tinggi baik untuk dirinya maupun orang lain. Ia menghindari sesuatu yang biasa-biasa dan cenderung mencari tantangan yang baru. Ia menyukai petualangan dan kadang-kadang beralih ke dalam petualangan baru sebelum mempertimbangkannya secara menyeluruh. Mampu memimpin situasi dan orang lain dalam rangka mencapai sasarannya; ia ingin selalu unggul dalam persaingan dengan taruhan apapun." },
    "Pure I": { "title": "COMMUNICATOR", "traits": ["Antusias","Percaya","Optimis","Persuasif","Bicara aktif","Impulsif","Emosional","Ramah","Inspirasional"], "job_match": "Promoting, Demonstrating, Canvassing, Marketing Services, Public Relations, Lecturing, Advertising, Publican, Publishing, Hospitality, Retail-General, Human Resources, Journalist, Singers, Technical Writing, Tour Guide, Promotional Work, Hotelier, Dancers, Host, Actors, Travel Agent, Politician, and very soft selling.", "summary": "Merupakan seorang yang antusias dan optimistik, ia lebih suka mencapai sasarannya melalui orang lain. Ia suka berhubungan dengan sesamanya - ia bahkan suka mengadakan “pesta” atau kegiatan untuk berkumpul, dan ini menunjukkan kepribadiannya yang ramah. Ia tidak suka bekerja sendirian dan cenderung bersama dengan orang lain dalam menyelesaikan proyek. Perhatian dan fokusnya tidak sebaik apa yang dia inginkan - maka ia membutuhkan energi yang besar untuk mampu bergerak cepat dari satu hal ke hal berikutnya tanpa penundaan. Ia sangat menonjol dalam keterampilan berkomunikasi, dan ini merupakan salah satu kekuatan yang paling sering digunakan. Ia memiliki kemampuan untuk memotivasi dan memberi semangat dengan kata-katanya, dan ia dikenal sebagai individu yang inspirasional. Ketika ia harus memusatkan perhatiannya pada tugas, Ia akan menjadi tidak akurat dan bahkan tidak terorganisir. Tetapi ia akan memusatkan perhatian kepada yang harus ia senangkan, karena ia enggan sekali untuk menolak. Ia menginginkan pengakuan sosial dan takut akan penolakan. Ia mudah menemukan teman dan berusaha menciptakan suasana yang menyenangkan. Ia membutuhkan seorang manajer atau supervisor untuk menentukan batas waktu yang jelas dalam pekerjaannya, ia lebih suka menggunakan gaya manajemen partisipatif yang dibangun berdasarkan hubungan yang kuat." },
    "Pure S": { "title": "SPECIALIST", "traits": ["Stabil & Konsisten","Terkendali","Nyaman di Belakang Layar","Sabar","Loyal","Sulit Adaptasi","Process Oriented","Teguh","Need for Peace","Anti Perubahan","Sulit Menentukan Prioritas"], "job_match": "Administrative Work, Engineering and Production areas (Sales, Services, Project, Painter, Plumber, Draughtsman, Designer, Operative), Chef, Accounting, Telemarketing/Tele-Sales, Research and Development, Administrator, Florist/Floral Designer, Retail-General, Sales-General, Accounting-General, Service-General, Landscape Gardener.", "summary": "Merupakan individu konsisten yang berusaha menjaga lingkungan/suasana yang tidak berubah. Ia bekerja dengan baik bersama orang-orang dengan berbagai kepribadian karena perilakunya yang terkendali dan rendah hati. Sabar, loyal dan suka menolong. Persahabatan dikembangkannya dengan lambat dan selektif. Ia tidak bosan dengan rutinitas dan sangat baik bekerja dengan petunjuk dan peraturan yang jelas. Ia mengharapkan bantuan dan supervisi pada saat mengawali proyek baru. Ia butuh waktu untuk menyesuaikan diri dengan perubahan dan sungkan menjalankan \"cara-cara lama mengerjakan sesuatu\". Ia akan menghindari konfrontasi dan berusaha sekuat tenaga memendam perasaannya." },
    "Pure C": { "title": "LOGICAL THINKER", "traits": ["Pendiam","Anti Kritik","Perfeksionis","Cenderung Santai","Detail","Empati","Rapi","Organized","Kaku pada Metode & Prosedur"], "job_match": "Planner (any function), Engineer (Installation, Technical), Technical/Research (Chemist Technician), Academic, Statistician, Government Worker, IT Management, Prison Officer, Quality Controller.", "summary": "Seorang yang praktis, cakap dan unik. Ia orang yang mampu menilai diri sendiri dan kritis terhadap dirinya dan orang lain. Ia menyukai hal yang detil dan logis; secara alamiah ia sangat analitis. Karena menyimpan informasi, ia meneliti isu berulang-ulang kali. Ia cenderung malu dan tertutup; ia hati-hati dalam membuat keputusan yang berdasarkan pada logika, bukan emosi, selalu menggunakan pertanyaan \"bagaimana dan mengapa\". Ia mengerjakan sesuatu dengan sistematis dan akurat. Ia rapi dan terorganisir sebab ia merasa bahwa keadaan berantakan sama dengan mutu yang rendah; demikian juga, rapi dan teratur merupakan mutu yang tinggi. Sangat teliti dalam segala sesuatu seperti halnya dalam pekerjaan dan penggunaan waktunya. Ia merencanakan dan mengorganisir semua sisi kehidupannya. Kelambanan sangat mengganggunya dan tak dapat ditolerir." },
    "D-I": { "title": "PENGAMBIL KEPUTUSAN", "traits": ["Pekerja Keras","Leader","Banyak Minat","Dingin / Task Oriented","Kurang Pergaulan","Kontrol Emosi Kurang","Suka Tantangan","Cepat Bosan","Anti Aturan","Kurang Detail","Kurang Peduli Wewenang","Argumentatif"], "job_match": "General Management (Directing/Managing/Supervising, Public Relations, Business Management, Conflict Resolution, Industrial Relations, Business Consultant, Trouble Shooting, Sales and Sales Management, Marketing, Promoting, Production (Director, Manager, Supervisor), Consultancy, Publishing, Sales Executive, Promotional Work, Brokers, Self-Employment, Advertising, Lecturing, Dealing/Broking.", "summary": "Tidak basa-basi dan tegas, ia cenderung merupakan seorang invidualis yang kuat. Ia berpandangan jauh ke depan, progresif dan mau berkompetisi untuk mencapai sasaran. DI seorang yang selalu ingin tahu dan mempunyai minat dengan cakupan yang luas. Ia seorang yang logis, kritis dan tajam dalam memecahkan masalah. Sering kali ia tampak imajinatif. Ia mempunyai kemampuan memimpinan yang baik. Ia kadang tampak keras kepala atau dingin karena orientasi dan prioritasnya pada tugas cenderung melebihi orientasi terhadap sesama. Ia mencanangkan standard tinggi pada dirinya dan akan sangat kritis ketika standard ini tidak dicapai. Ia juga menempatkan standard tinggi pada orang-orang di sekitarnya, serta mengutamakan kesempurnaan. Ia menginginkan otoritas yang jelas dan menyukai tugas-tugas baru." },
    "D-S": { "title": "SELF-MOTIVATED", "traits": ["Objektif & Analitis","Mandiri","Good Planner","Komitmen thd Target","Menghindari Konflik"], "job_match": "Engineering and Production (Directing, Managing, Supervising), Project Management, Researcher, Chemist (R&D), Planner, Engineering (R&D), Systems Analyst, Commercial Planner, Computer Engineer, Programmer, IT, Other computer-related disciplines, Technical Trouble Shooting and Directing, Lawyer, Solicitor, Development Engineer, Work Study, Barrister, Attorney.", "summary": "Seorang yang obyektif dan analitis. Ia ingin terlibat dalam situasi, dan ia juga ingin memberikan bantuan dan dukungan kepada orang yang ia hormati. Secara internal termotivasi oleh target pribadi, ia berorientasi terhadap pekerjaannya tapi juga menyukai hubungan dengan sesama. Karena determinasinya yang kuat, ia sering berhasil dalam berbagai hal; karakternya yang tenang, stabil dan daya tahannya yang tinggi memiliki kontribusi dalam keberhasilannya. Ulet dalam memulai pekerjaan. Ia akan berusaha keras untuk mencapai sasarannya. Seorang yang mandiri dan cermat serta memiliki tindak lanjut yang baik." },
    "D-C": { "title": "CHALLENGER", "traits": ["Seorang yang tekun","Sensitif terhadap permasalahan","Mempunyai keputusan yang kuat","Kreatif  dalam memecahkan masalah","Memiliki reaksi yang cepat","Mampu mencari solusi permasalahan","Banyak memberikan ide-ide.","Usaha yang keras pada ketepatan","Cenderung perfeksionis"], "job_match": "Engineering (Management, Research, Design), Actuaries, Research (R&D), Planning, Chemist, Hospital Supervisor, Industrial Marketing, Investment Banking, Medical Administrator, Mortgage Brokers, Accountancy, Fund Management, Specialist Finance, Quality Control and Specialist work in any area where knowledge and experience is available, Production, Financial Services, Technical Management, Project Leader, Matron, Strategic Planning, Industrial Marketing.", "summary": "Seorang yang sensitif terhadap permasalahan, dan memiliki kreativitas yang baik dalam memecahkan masalah. Ia dapat menyelesaikan tugas-tugas penting dalam waktu singkat karena mempunyai keputusan yang kuat. Seorang yang tekun dan memiliki reaksi yang cepat. Ia akan meneliti dan mengejar semua kemungkinan yang ada dalam mencari solusi permasalahan. Ia banyak memberikan ide-ide dengan berfokus pada pekerjaan. Usaha yang keras pada ketepatan akan mengimbangi keinginannya pada hasil yang terukur. Ia cenderung perfeksionis dan dapat juga memperlambat pengambilan keputusan karena keinginannya untuk menentukan pilihan yang terbaik." },
    "I-D": { "title": "NEGOTIATOR", "traits": ["Suka Bergaul","Anti Rutin","Aktif","Terlalu Percaya Diri","Agresif","Optimis","Kurang Detail","Result Oriented"], "job_match": "Sales and Marketing (Directing, Manager, Person), Public Relations, Recruitment Consultant, Politician, Director, Self-Employed, Hotelier, Travel Agent, Trainer, Hospitality, Lawyer, Solicitor, Motivators, Team Leader, Politician, Trainer, Lecturer, Theatrical Agent, General Management and Leading People, Attorney.", "summary": "Merupakan seorang pemimpin integratif yang bekerja dengan dan melalui orang lain. Ia ramah, memiliki perhatian yang tinggi akan orang dan juga mempunyai kemampuan untuk memperoleh hormat dan penghargaan dari berbagai tipe orang. Melakukan pekerjaannya dengan cara yang bersahabat, baik dalam mencapai sasarannya maupun meyakinkan pandangannya kepada orang lain. Ia tidak begitu memperhatikan hal-hal kecil. Kadang bertindak sesuai dengan kata hati/impulsif, terlalu antusias dan sangat banyak bicara. Ia terlalu berlebihan menilai kemampuannya dalam memotivasi atau mengubah perilaku orang lain. Mencari kebebasan dari rutinitas, menginginkan otoritas/wewenang dan juga prestise. Ia menginginkan aktivitas yang bervariasi dan bekerja lebih efisien jika data-data analitis disediakan oleh orang lain. Menginginkan penugasan yang mengutamakan mobilitas dan tantangan." },
    "I-S": { "title": "ADVISOR", "traits": ["Hangat","Simpati","Tenang dalam situasi sosial","Pendengar yang baik","Demonstratif","Tidak memaksakan idenya pada orang lain","Kurang tegas dalam memberi perintah","Menerima kritik","Toleran dan sabar","Penjaga damai"], "job_match": "Personnel, Welfare, Training, Hotelier, Promoting, Travel Agent, Lecturing, Upmarket/Speciality Sales, Soft/Service Selling, Beauty Therapist, Psychologist, Nursing, Human Resources, Retail-Specialist, Veterinarian, Social Work, Personal Assistant, Personnel-HR, Coach, Mentor.", "summary": "Seorang yang mengesankan orang akan kehangatan, simpati dan pengertiannya. Ia memiliki ketenangan dalam sebagian besar situasi sosial dan jarang tidak menyenangkan orang lain. Faktanya, banyak orang datang padanya karena ia kelihatan sebagai pendengar yang baik. Ia cenderung sangat demonstratif dan emosinya biasanya tampak jelas bagi orang di sekitarnya. Ia tidak akan memaksakan idenya pada orang lain; ia tidak tegas dalam mengekspresikan atau memberi perintah. Jika ia sangat kuat merasakan sesuatu, Ia akan bicara secara terbuka dan terus terang tentang pendiriannya. Ia cenderung menerima kritik atas pekerjaannya sebagai serangan pribadi. Ia dapat menjadi sangat toleran dan sabar kepada mereka yang tidak produktif di pekerjaan. Ia merupakan \"penjaga damai\" dan akan bekerja untuk menjaga kedamaian dalam setiap keadaan." },
    "I-C": { "title": "ASSESSOR", "traits": ["Ramah","Suka berteman","Nyaman walapun dengan orang asing","Mudah mengembangkan hubungan baru","Dapat mengendalikan diri","Sangat sosial","Cenderung perfeksionis alamiah","Mempromosikan tugas-tugas orang lain"], "job_match": "Teaching, Training, Inventing, Specialist Selling (Engineering, Finance or any area involving capital equipment), Project Engineer, Finance, Service Engineer or Supervising within a Technical/Specialist Area, Public Relations, Environmentalist, Marketing, Conference Organiser, Estate Agent.", "summary": "Merupakan seorang yang ramah dan suka berteman; ia merasa nyaman walaupun dengan orang asing. Ia dapat mengembangkan hubungan baru dengan mudah, dan pada umumnya dapat mengendalikan diri sampai pada tingkat dimana ia jarang menimbulkan rasa benci pada orang lain dengan sengaja. Ia seorang yang sangat sosial, menunjukkan kepedulian dan persahabatan ketika sedang melakukan tugas-tugas di tangannya. Ia cenderung perfeksionis secara alamiah, dan akan mengisolasi dirinya jika diperlukan untuk melaksanakan pekerjaan. Ia berkeinginan mempromosikan tugas-tugas orang lain, juga kepunyaannya. Kadang-kadang ia salah menilai kemampuan orang lain dikarenakan pandangan-pandangannya yang optimis." },
    "S-D": { "title": "SELF-MOTIVATED", "traits": ["Objektif & Analitis","Mandiri","Good planner","Komitmen terhadap target","Menghindari konflik","Ingin terlibat dalam situasi","Ingin memberikan bantuan dan dukungan","Termotivasi oleh target pribadi","Stabil","Tekun"], "job_match": "Investigator, Researcher, Accountant, Engineering, Production/Engineering Supervisor, Computer Specialist, Architect, Transport/Warehouse Supervisor, Credit Controller, DP Supervisor, Computer Specialist, Research and Development, Private Investigator, Quality Controller, Engineering (Designer, Draughtsman, Project Engineer), Sales and Service Engineer, Property Manager, Attorney, Administration Manager", "summary": "Merupakan seorang yang obyektif dan analitis. Ia ingin terlibat dalam situasi, dan juga ingin memberikan bantuan dan dukungan. Secara internal termotivasi oleh target pribadi, Ia menyukai orang-orang, tetapi juga mempunyai kemampuan untuk berorientasi pada pekerjaannya pada saat dibutuhkan. Karena determinasinya yang kuat, ia sering berhasil dalam berbagai hal; karakternya yang tenang, stabil dan daya tahannya memiliki kontribusi akan keberhasilannya. Keuletannya setelah memulai pekerjaan, ia akan berusaha keras untuk mendapatkan sasarannya. Seorang yang bebas, ia orang yang cermat dan memiliki tindak lanjut yang baik. Ia bisa menjadi tidak ramah walaupun ia pada dasarnya ia yang berorientasi pada orang; dan pada situasi yang tidak membuatnya nyaman, ia lebih suka mendukung pemimpinnya dari pada keterlibatannya dengan situasi." },
    "S-I": { "title": "ADVISOR", "traits": ["Hangat","Simpati dan Pengertian","Tenang dalam situasi sosial","Pendengar yang baik","Demonstratif","Tidak memaksakan idenya pada orang lain","Kurang tegas dalam memberi perintah","Menerima kritik","Toleran dan sabar","Penjaga damai"], "job_match": "Personnel Welfare, Training, Hotelier, Promoting, Travel Agent, Lecturing, Child Care, Charitable Organizations, Soft or Service Selling, Psychologist, Therapist, Nurse, Personal Assistant, Hospitality Manager, Social Work, Student Services, Upmarket/Speciality Sales.", "summary": "Seorang yang mengesankan orang akan kehangatan, simpati dan pengertiannya. Ia memiliki ketenangan dalam sebagian besar situasi sosial dan jarang tidak menyenangkan orang lain. Faktanya, banyak orang datang padanya karena ia kelihatan sebagai pendengar yang baik. Ia cenderung sangat demonstratif dan emosinya biasanya tampak jelas bagi orang di sekitarnya. Ia tidak akan memaksakan idenya pada orang lain; ia tidak tegas dalam mengekspresikan atau memberi perintah. Jika ia sangat kuat merasakan sesuatu, Ia akan bicara secara terbuka dan terus terang tentang pendiriannya. Ia cenderung menerima kritik atas pekerjaannya sebagai serangan pribadi. Ia dapat menjadi sangat toleran dan sabar kepada mereka yang tidak produktif di pekerjaan. Ia merupakan \"penjaga damai\" yang sebenarnya dan akan bekerja untuk menjaga kedamaian dalam setiap keadaan." },
    "S-C": { "title": "PEACEMAKER, RESPECTFULL & ACCURATE", "traits": ["Sulit Beradaptasi","Anti Kritik","Pendendam","Sukar Berubah","Detail","Empati","Memikirkan Dampak ke Orang Lain","Terlalu Mendalam dalam Berpikir","Concern ke Data dan Fakta","Introvert","Loyal"], "job_match": "Office (Manager, Supervisor, Person), Chief Clerk, General Administrator, Production Supervisor, Planner, Accountant, Research and Development, Flight Attendant, Engineering (Project Manager, Supervisor, Technician), Computer Programmer, Draughtsman, Soft/Service Selling, Doctor, Cashier, Receptionist, Data Entry, Planner, Word Processing, Property Manager, Database Administrator, Health Care, Statistician, Nursing-Administration, Company Secretary, System Analyst, Programmer, Statistician, Accounting-General, Security Specialist.", "summary": "Ia adalah orang yang baik secara alamiah dan sangat berorientasi detil. Ia peduli dengan orang-orang di sekitarnya dan mempunyai kualitas yang membuatnya sangat teliti dalam penyelesaian tugas. Ia mempertimbangkan sekelilingnya dengan hati-hati sebelum membuat keputusan untuk melihat pengaruhnya pada mereka; saat tertentu ia terlalu hati-hati. Jika ia merasa seseorang memanfaatkan situasi, ia akan memperlambat kerjanya sehingga dapat mengamati apa yang sedang berlangsung di sekitarnya." },
    "C-D": { "title": "DESIGNER", "traits": ["Sensitif","Kurang Cepat","Anti Tekanan","Terlalu Mandiri","Kurang Percaya Orang Lain","Anti Kritik","Dingin","Kreatif","Result Oriented","Suka Tantangan"], "job_match": "Engineering (Management, Research, Design), Research (R&D), Planning, Chemist, Accountancy, Specialist, Finance, Technician, Quality Control, Production Planning/Management, Design Engineer, Bookkeeper, Chemist Technician, Safety Officer, Librarian.", "summary": "Seorang yang sangat berorientasi pada tugas dan sensitif pada permasalahan. Ia lebih mempedulikan tugas yang ada dibanding orang-orang di sekitarnya, termasuk perasaan mereka. Sangat kukuh/keras dan mempunyai pendekatan yang efektif dalam pemecahan masalah. Oleh karena sifat alamiah dan keinginannya akan hasil yang terukur, Akan tampak dingin, tidak berperasaan dan menjaga jarak. Ia membuat keputusan berdasar pada fakta, bukan emosi. Cenderung pendiam dan tidak mudah percaya." },
    "C-I": { "title": "ASSESSOR", "traits": ["Analitis","Berwatak hati-hati","Ramah pada saat merasa nyaman","Sangat biasa dengan orang asing","Mudah mengembangkan hubungan baru","Dapat mengendalikan diri","Peduli dan ramah","Memusatkan perhatian pada penyelesaian tugas","Perfeksionis secara alami","Mengisolasi dirinya jika diperlukan","Mudah diramalkan","Berorientasi pada kualitas"], "job_match": "Sales (Technical/Specialist), Public Relations, Lecturer, Academic, Personnel Administration, Purchasing, Travel Agent, Training, Teaching, Real Estate Agent, Hospitality Administration, Sales-Technical, Hotelier, Project Engineer, Service Engineer.", "summary": "Merupakan seseorang yang analitis, berwatak hati-hati dan ramah pada saat merasa nyaman. Ia sangat biasa dengan orang asing, karena ia dapat menilai dan menyesuaikan diri dalam hubungan mereka. Ia dapat mengembangkan hubungan baru dengan mudah ketika ia ingin melakukannya, dan pada umumnya dapat mengendalikan diri sampai pada tingkat di mana ia jarang menimbulkan rasa benci pada orang lain dengan sengaja. Ia menampilkan sikap peduli dan ramah, namun mampu memusatkan perhatian pada penyelesaian tugas yang ada. Ia cenderung perfeksionis secara alami, dan akan mengisolasi dirinya jika diperlukan untuk melaksanakan pekerjaan. Ia suka berada pada situasi yang dapat diramalkan dan tidak ada kejutan. Ia sangat berorientasi pada kualitas dan akan bekerja dengan keras untuk menyelesaikan pekerjakan dengan benar. Ia ingin orang-orang berkenan akan pekerjaan yang sudah ia selesaikan dengan baik." },
    "C-S": { "title": "PERFECTIONIST", "traits": ["Detail & Teliti","Butuh Situasi Stabil","Sistematik & Prosedural","Menghindari Konflik","Anti Kritik","Lambat Memutuskan","Sulit Adaptasi","Pendendam","Anti Perubahan"], "job_match": "Researcher (Technician, Chemist, Quality Control), Engineer (Project, Draughtsman, Armed Forces, Designer), Statistician, Surveyor, Optician, Medical Specialist, Health Care, IT Management, Planner, Technical Writing, Production, Dentist, Quality Control, Planning, Dental Technician, Accounting, Computer Programmer, Psychologist, Surgeon, Architect, Medical Specialist.", "summary": "Berpikir sistematis dan cenderung mengikuti prosedur dalam kehidupan pribadi dan pekerjaannya. Teratur dan memiliki perencanaan yang baik, ia teliti dan fokus pada detil. Ia bertindak dengan penuh kebijaksanaan, diplomatis dan jarang menentang rekan kerjanya dengan sengaja. Ia sangat berhati-hati, ia sungguh-sungguh mengharapkan akurasi dan standard tinggi dalam pekerjaannya. Ia cenderung terjebak dalam hal detil, khususnya jika harus memutuskan. ia menginginkan adanya petunjuk standard pelaksanaan kerja dan tanpa perubahan mendadak." },
    "D-I-S": { "title": "DIRECTOR", "traits": ["Pengelola","Enerjik","Kurang Detail","Mudah Bosan","Agresif","Arogan","Kurang Focus"], "job_match": "Engineering and Production (Directing, Managing, Supervising), Sales, Sales Management, Service Manager, Distribution, Public Relations, Office Management, Account Manager, Customer Service, Retail Manager, IT, Lecturer, Logistics, Manager-General, National Accounts Manager, Teacher, Projects Manager.", "summary": "Fokus pada penyelesaian pekerjaan dan menunjukkan penghargaan yang tinggi kepada orang lain. Ia memiliki kemampuan untuk menggerakkan orang dan pekerjaan dikarenakan keterampilannya berpikir ke depan dan hubungan antar manusia. Tidak berorientasi detil, ia fokus pada target secara keseluruhan dengan menyerahkan hal detil kepada orang lain. Enerjik dan sosial, ia mampu memotivasi orang lain sambil menyelesaikan pekerjaannya. Ia menampilkan rasa percaya diri dan mampu meyakinkan orang lain. Sekali ia memutuskan sesuatu, ia akan terus mengerjakannya dan bertahan sampai selesai." },
    "D-I-C": { "title": "CHANCELLOR", "traits": ["Seorang yang ramah secara alami","Menggabungkan kesenangan dengan pekerjaan","Menyukai hubungan dengan sesama","Menikmati interaksi dengan sesama","Dapat mengerjakan hal-hal detil","Ingin melakukan segala sesuatu dengan tepat","Menilai orang dan tugas secara hati-hati","Sering melalaikan perencanaan yang seksama","Mudah beralih kepada proyek-proyek baru"], "job_match": "Technical/Scientific (Directing, Management, Supervision), Engineering, Finance, Production Planning, Personnel Disciplines, Self-Employment, Credit Manager, Planner, Fund Management, Computer Hardware/Software Sales, IT, Business Consultant, Banking, Logistics, Lecturing, Work Study, Film Director, Transport, Consultancy, Industrial Relations and Computers (Selling, Software, Systems Analyst) and General Manager.", "summary": "Ia menggabungkan antara kesenangan dengan pekerjaan/bisnis ketika melakukan sesuatu. Ia kelihatan menyukai hubungan dengan sesama tetapi juga dapat mengerjakan hal-hal detil. Ia ingin melakukan segala sesuatu dengan tepat, dan ia akan menyelesaikan tugasnya untuk meyakinkan ketepatan dan kelengkapannya. Seorang yang ramah secara alami dan menikmati interaksi dengan sesama, akan tetapi ia akan juga menilai orang dan tugas secara hati-hati; persahabatannya akan bergeser sesuai dengan dorongan hatinya pada orang lain di sekitarnya. Ia sering melalaikan perencanaan yang seksama dan akan beralih ke pada proyek-proyek baru tanpa pertimbangan yang menyeluruh." },
    "D-S-I": { "title": "DIRECTOR", "traits": ["Seorang yang obyektif dan analitis","Ingin terlibat dalam situasi","Ingin memberikan bantuan dan dukungan","Termotivasi oleh target pribadi","Berorientasi terhadap pekerjaannya","Menyukai hubungan dengan sesama","Mempunyai determinasi yang kuat","Karakternya tenang","Stabil dan daya tahannya tinggi","Ulet dalam memulai pekerjaan","Berusaha keras mencapai sasarannya","Mandiri dan cermat"], "job_match": "Engineering and Production (Directing, Managing, Supervising), Sales, Sales Management, Service Manager, Distribution, Public Relations, Creative Designer, Office Management, Chief Engineer, Business Consultant, Chief Financial Officer, Customer Service, National Accounts Manager, Chief Accountant, Lecturer, Projects Manager, Research Planning, Human Resources, Scientific Work, Security Specialist, Solicitor, Planner, Production Administrator.", "summary": "Seorang yang obyektif dan analitis. Ia ingin terlibat dalam situasi, dan ia juga ingin memberikan bantuan dan dukungan kepada orang yang ia hormati. Secara internal termotivasi oleh target pribadi, ia berorientasi terhadap pekerjaannya tapi juga menyukai hubungan dengan sesama. Karena determinasinya yang kuat, ia sering berhasil dalam berbagai hal; karakternya yang tenang, stabil dan daya tahannya yang tinggi memiliki kontribusi dalam keberhasilannya. Ulet dalam memulai pekerjaan. Ia akan berusaha keras untuk mencapai sasarannya. Seorang yang mandiri dan cermat serta memiliki tindak lanjut yang baik." },
    "D-S-C": { "title": "Director", "traits": ["Seorang yang obyektif dan analitis","Ingin terlibat dalam situasi","Ingin memberikan bantuan dan dukungan","Termotivasi oleh target pribadi","Berorientasi terhadap pekerjaannya","Menyukai hubungan dengan sesama","Mempunyai determinasi yang kuat","Karakternya tenang","Stabil dan daya tahannya tinggi","Ulet dalam memulai pekerjaan","Berusaha keras mencapai sasarannya","Mandiri dan cermat"], "job_match": "Engineering and Production (Directing, Managing, Supervising), Sales, Sales Management, Service Manager, Distribution, Public Relations, Creative Designer, Office Management, Chief Engineer, Business Consultant, Chief Financial Officer, Customer Service, National Accounts Manager, Chief Accountant, Lecturer, Projects Manager, Research Planning, Human Resources, Scientific Work, Security Specialist, Solicitor, Planner, Production Administrator.", "summary": "Seorang yang obyektif dan analitis. Ia ingin terlibat dalam situasi, dan ia juga ingin memberikan bantuan dan dukungan kepada orang yang ia hormati. Secara internal termotivasi oleh target pribadi, ia berorientasi terhadap pekerjaannya tapi juga menyukai hubungan dengan sesama. Karena determinasinya yang kuat, ia sering berhasil dalam berbagai hal; karakternya yang tenang, stabil dan daya tahannya yang tinggi memiliki kontribusi dalam keberhasilannya. Ulet dalam memulai pekerjaan. Ia akan berusaha keras untuk mencapai sasarannya. Seorang yang mandiri dan cermat serta memiliki tindak lanjut yang baik." },
    "D-C-I": { "title": "CHALLENGER", "traits": ["Seorang yang tekun","Sensitif terhadap permasalahan","Mempunyai keputusan yang kuat","Kreatif  dalam memecahkan masalah","Memiliki reaksi yang cepat","Mampu mencari solusi permasalahan","Banyak memberikan ide-ide.","Usaha yang keras pada ketepatan","Cenderung perfeksionis"], "job_match": "Technical/Scientific (Directing, Management, Supervision), Engineering, Finance, Production Planning, Personnel Disciplines, Self-Employment, Credit Manager, Planner, Lecturing, Work Study, Transport, Consultancy, Industrial Relations and Computers (Selling, Software, Systems Analyst) and General Manager.", "summary": "Seorang yang sensitif terhadap permasalahan, dan memiliki kreativitas yang baik dalam memecahkan masalah. Ia dapat menyelesaikan tugas-tugas penting dalam waktu singkat karena mempunyai keputusan yang kuat. Seorang yang tekun dan memiliki reaksi yang cepat. Ia akan meneliti dan mengejar semua kemungkinan yang ada dalam mencari solusi permasalahan. Ia banyak memberikan ide-ide dengan berfokus pada pekerjaan. Usaha yang keras pada ketepatan akan mengimbangi keinginannya pada hasil yang terukur. Ia cenderung perfeksionis dan dapat juga memperlambat pengambilan keputusan karena keinginannya untuk menentukan pilihan yang terbaik." },
    "D-C-S": { "title": "CHALLENGER", "traits": ["Seorang yang tekun","Sensitif terhadap permasalahan","Mempunyai keputusan yang kuat","Kreatif  dalam memecahkan masalah","Memiliki reaksi yang cepat","Mampu mencari solusi permasalahan","Banyak memberikan ide-ide.","Usaha yang keras pada ketepatan","Cenderung perfeksionis"], "job_match": "Engineering, Production and Finance (Directing, Administrating, Managing and Managing Specialist Work), Scientific, Research Planning, Personnel, Trouble Shooting, Credit Control, Chief Accountant, Accountant, Chief Engineer, Work Study, Consultancy, Designer, Draughtsman, Project Work, Security Specialist, Doctor, Attorney.", "summary": "Seorang yang sensitif terhadap permasalahan, dan memiliki kreativitas yang baik dalam memecahkan masalah. Ia dapat menyelesaikan tugas-tugas penting dalam waktu singkat karena mempunyai keputusan yang kuat. Seorang yang tekun dan memiliki reaksi yang cepat. Ia akan meneliti dan mengejar semua kemungkinan yang ada dalam mencari solusi permasalahan. Ia banyak memberikan ide-ide dengan berfokus pada pekerjaan. Usaha yang keras pada ketepatan akan mengimbangi keinginannya pada hasil yang terukur. Ia cenderung perfeksionis dan dapat juga memperlambat pengambilan keputusan karena keinginannya untuk menentukan pilihan yang terbaik." },
    "I-D-S": { "title": "REFORMER", "traits": ["Mudah Bergaul","Leader","Sadar Diri","Butuh Pujian & Penghargaan","Cepat Percaya Orang","Mudah Simpati & Empati","Motivator","Optimis & Positif","Anti Aturan","Kurang Detail","Terlalu Selektif"], "job_match": "Hotelier, Customer Service, Complaints Manager, Recruiting Agent, Sales (Manager/Person), Marketing Services, Public Relations, Politician, Computer Software Sales, Lecturer, Engineering and Production (Manager/Supervisor).", "summary": "Seorang yang bersahabat dan sosial; ia juga suka mengendalikan situasi dan menjadi pemimpin. Ia menyelesaikan tugasnya melalui keterampilan sosialnya; ia peduli dan menerima orang lain. Ia berkonsentrasi pada tugas yang ada di tangannya sampai selesai dan akan minta bantuan orang lain jika perlu. Ia menyadari keterbatasannya dan meminta bantuan jika memerlukannya. Ia disukai dan orang ingin menolongnya. Senang membagi kebanggaannya dengan kelompok; ia seorang team player tetapi juga team leader. Menginginkan popularitas dan pengakuan." },
    "I-D-C": { "title": "CONFIDENT & DETERMINED", "traits": ["Terorganisir","Peduli","Perhatian terhadap sesama","Kemampuan analitis tinggi","Dapat mendengarkan dengan baik","Terkadang berlebihan menilai orang lain","Kurang fokus","Sangat membutuhkan pengakuan sosial"], "job_match": "Specialist/Technical Selling (Computer, Finance, Engineer and others, Chef, Technical/Capital Equipment Selling), Financial (Manager, Specialist), Computer Hardware Sales, Engineering (Manager, Designer, Buyer, Draughtsman), Project Engineer, Sales Engineer, Consultant, Trainer, Lecturer, Hotelier, Insurance, Mortgage and Finance Sales, Teacher, Travel Agent, Personnel and Marketing Services.", "summary": "Sangat berorientasi terhadap tugas dan juga menyukai orang. Ia sangat baik dalam menarik orang/recruiting. Seorang yang bersahabat, tetapi menyukai keadaan di mana tugas-tugas harus dilakukan dengan benar. Ia kadang-kadang tampak dingin dan mendominasi. Ia juga bisa sangat fokus pada tugas dan melupakan orang-orang di sekitarnya. Sangat mengharapkan orang-orang terlibat dalam proyeknya, tetapi tidak memperdulikan apa yang diinginkan oleh orang-orang itu. Ia perlu mendengar dan memikirkan apa yang menjadi keinginan orang di sekitarnya, khususnya kesempatan untuk mencoba. Ia sangat membutuhkan persetujuan sosial seperti halnya ia sangat mempercayai orang lain. Karena itu, ia kadang-kadang berlebihan dalam menilai orang dan kemampuannya. Ia tampak tidak konsisten dan tidak karuan karena ketidakmampuannya berkonsentrasi dan fokus dalam waktu yang lama. Perlu belajar untuk secara sungguh-sungguh mendengarkan orang-orang di sekitarnya dari pada selalu berpikir apa yang ingin dikatakan. Ia mempunyai kemampuan logika yang tinggi ketika ia mau menggunakannya." },
    "I-S-D": { "title": "MOTIVATOR", "traits": ["Leader (Kelompok Kecil)","Supporter","Sosialisasi Baik","Butuh Ketegasan","Butuh Pujian & Penghargaan","Kurang Detail","Agak Kaku"], "job_match": "Hotelier, Community Counseling, Customer Service, Complaints Manager, Community Work, Recruitment Consultant, Hospitality, Teacher, Telemarketing, Production Manager, Complaints Manager, Recruiting Agent, Sales (Manager/Person), Marketing Services, Public Relations, Politician, Call Centre Manager, Lecturer, Engineering and Production (Manager/Supervisor).", "summary": "Seorang yang menampilkan gaya bersemangat ketika termotivasi pada sasaran. Ia lebih suka memimpin atau melibatkan diri, walaupun ia juga mau melayani sebagai pembantu. Ia membutuhkan pengakuan dan penghargaan serta senang pada peran pendukung. Ia peduli kepada orang-orang di sekitarnya dan akan mempertimbangkan perasaan orang lain dalam proses pengambilan keputusan. Menampilkan keterampilan berhubungan dan berkomunikasi dengan sangat baik. Ia akan berusaha keras menyelesaikan tugas dengan cepat dan efisien." },
    "I-S-C": { "title": "RESPONSIVE & THOUGHTFUL", "traits": ["High Energy","Good Communication Skill","To The Point","Sensitif","Banyak Bicara","Need Recognation","Need Socialism","Anti thd Kritik","Terlalu banyak bersosialisasi","Leadership kurang","Kurang Fokus","Anti Deadline"], "job_match": "Actors, Chef, Personnel, Welfare, Broadcasting, Training, Attorney, Teaching, Accounting, Technical Instructor, Accounting-General, Accounts Supervisor, Customer Services, Public Relations, Artist, Hotelier, Demonstrator, Florist/Floral Designer, Engineering (Sales, Service, Project, Draughtsman, Designer), Graphic Designer, Specialist (Soft/Services), Selling, Purchasing, Singers, Technical Instructor, Personnel Management, Politician, Supervising (Engineering, Production, Accounts), Administration Work, Sales Engineer,Secretarial, Industrial Relations Specialist.", "summary": "Merupakan individu yang berorientasi pada orang dan lancar berkomunikasi serta loyal. Ia cenderung sensitif dan mempunyai standard yang tinggi. Keputusannya dibuat berdasarkan fakta dan data pendukung. Ia sepertinya tidak bisa diam. Ia perlu untuk lebih terus terang dan jangan terlalu subyektif. Ia butuh pengakuan sosial dan perhatian pribadi; ia dapat cepat akrab dengan orang lain. Ia bersahabat, antusias, informal, banyak bicara dan terlalu khawatir terhadap apa yang dipikirkan orang. Ia menguasai banyak hal. Ia ingin diterima sebagai anggota kelompok dan ingin mengetahui secara pasti apa yang diharapkan darinya sebelum ia memulai proyek baru." },
    "I-C-D": { "title": "ASSESSOR", "traits": ["Analitis","Berwatak hati-hati","Ramah pada saat merasa nyaman","Sangat biasa dengan orang asing","Mudah mengembangkan hubungan baru","Dapat mengendalikan diri","Peduli dan ramah","Memusatkan perhatian pada penyelesaian tugas","Perfeksionis secara alami","Mengisolasi dirinya jika diperlukan","Mudah diramalkan","Berorientasi pada kualitas"], "job_match": "Specialist/Technical Selling (Computer, Finance, Engineer and others, Technical/Capital Equipment Selling), Financial (Manager, Specialist), Engineering (Manager, Designer, Buyer, Draughtsman), Project Engineer, Sales Engineer, Consultant, Trainer, Lecturer, Hotelier, Travel Agent, Personnel and Marketing Services.", "summary": "Merupakan seseorang yang analitis, berwatak hati-hati dan ramah pada saat merasa nyaman. Ia sangat biasa dengan orang asing, karena ia dapat menilai dan menyesuaikan diri dalam hubungan mereka. Ia dapat mengembangkan hubungan baru dengan mudah ketika ia ingin melakukannya, dan pada umumnya dapat mengendalikan diri sampai pada tingkat di mana ia jarang menimbulkan rasa benci pada orang lain dengan sengaja. Ia menampilkan sikap peduli dan ramah, namun mampu memusatkan perhatian pada penyelesaian tugas yang ada. Ia cenderung perfeksionis secara alami, dan akan mengisolasi dirinya jika diperlukan untuk melaksanakan pekerjaan. Ia suka berada pada situasi yang dapat diramalkan dan tidak ada kejutan. Ia sangat berorientasi pada kualitas dan akan bekerja dengan keras untuk menyelesaikan pekerjakan dengan benar. Ia ingin orang-orang berkenan akan pekerjaan yang sudah ia selesaikan dengan baik." },
    "I-C-S": { "title": "ASSESSOR", "traits": ["Sangat ramah","Banyak bicara","Fokus","Terkadang impulsif","Suka persetujuan dari orang lain","Sulit menerima kritik","Bersikap toleran"], "job_match": "Actors, Chef, Personnel, Welfare, Broadcasting, Training, Attorney, Teaching, Accounting, Technical Instructor, Accounting-General, Accounts Supervisor, Customer Services, Public Relations, Artist, Hotelier, Demonstrator, Florist/Floral Designer, Engineering (Sales, Service, Project, Draughtsman, Designer), Graphic Designer, Specialist (Soft/Services), Selling, Purchasing, Singers, Technical Instructor, Personnel Management, Politician, Supervising (Engineering, Production, Accounts), Administration Work, Sales Engineer.", "summary": "Seorang yang ramah dan sosial; sangat menonjol dalam berhubungan dengan orang lain, dan ia benar-benar peduli. Ia berkeinginan menolong orang-orang sekitarnya sebaik yang ia bisa, tetapi juga tidak memaksakan diri. Kadang-kadang ia tampak impulsif. Cenderung terlalu positif dalam memandang kemampuan orang lain. Tidak begitu memperhatikan sasaran dan arahan. Perlu banyak petunjuk mengenai detil proyek/pekerjaan. Ia sungguh-sungguh memikirkan persetujuan dari sesamanya dan membutuhkan pujian." },
    "S-D-I": { "title": "DIRECTOR", "traits": ["Analitis","Mandiri","Obyektif","Target Oriented","Tekun","Terkadang kurang ramah"], "job_match": "Investigator, Researcher, Accountant, Engineering, Production/Engineering Supervisor, Computer Specialist, Architect, Transport/Warehouse Supervisor, Credit Controller, DP Supervisor, Computer Specialist, Research and Development, Private Investigator, Quality Controller, Engineering (Designer, Draughtsman, Project Engineer), Sales and Service Engineer, Property Manager, Attorney, Administration Manager.", "summary": "Seorang yang obyektif dan analitis. Ia ingin terlibat dalam situasi, dan ia juga ingin memberikan bantuan dan dukungan kepada orang yang ia hormati. Secara internal termotivasi oleh target pribadi, ia berorientasi terhadap pekerjaannya tapi juga menyukai hubungan dengan sesama. Karena determinasinya yang kuat, ia sering berhasil dalam berbagai hal; karakternya yang tenang, stabil dan daya tahannya yang tinggi memiliki kontribusi dalam keberhasilannya. Ulet dalam memulai pekerjaan. Ia akan berusaha keras untuk mencapai sasarannya. Seorang yang mandiri dan cermat serta memiliki tindak lanjut yang baik." },
    "S-D-C": { "title": "Director", "traits": ["Objektif","Fokus pada penyelesaian tugas","Analitis","Kuat dalam logika","Stabil","Menarik diri jika stres"], "job_match": "Investigator, Researcher, Accountant, Engineering, Production/Engineering Supervisor, Computer Specialist, Architect, Transport/Warehouse Supervisor, Credit Controller, DP Supervisor, Computer Specialist, Research and Development, Private Investigator, Quality Controller, Engineering (Designer, Draughtsman, Project Engineer), Sales and Service Engineer, Property Manager, Attorney, Administration Manager.", "summary": "Seorang yang obyektif dan analitis. Ia ingin terlibat dalam situasi, dan ia juga ingin memberikan bantuan dan dukungan kepada orang yang ia hormati. Secara internal termotivasi oleh target pribadi, ia berorientasi terhadap pekerjaannya tapi juga menyukai hubungan dengan sesama. Karena determinasinya yang kuat, ia sering berhasil dalam berbagai hal; karakternya yang tenang, stabil dan daya tahannya yang tinggi memiliki kontribusi dalam keberhasilannya. Ulet dalam memulai pekerjaan. Ia akan berusaha keras untuk mencapai sasarannya. Seorang yang mandiri dan cermat serta memiliki tindak lanjut yang baik." },
    "S-I-D": { "title": "REFORMER", "traits": ["Mendukung","Penuh semangat","Mudah setuju","Tidak menonjolkan diri","Team Player","Kadang sulit memutuskan"], "job_match": "Administration Management, Community Work, Personnel Management, Teaching, Training, Demonstrating, Complaints Manager, Social Work, Customer Service, Welfare, Call Centre Manager, Nursing, Therapy, Psychology.", "summary": "Seorang yang menampilkan gaya bersemangat ketika termotivasi pada sasaran. Ia lebih suka memimpin atau melibatkan diri, walaupun ia juga mau melayani sebagai pembantu. Ia membutuhkan pengakuan dan penghargaan serta senang pada peran pendukung. Ia peduli kepada orang-orang di sekitarnya dan akan mempertimbangkan perasaan orang lain dalam proses pengambilan keputusan. Menampilkan keterampilan berhubungan dan berkomunikasi dengan sangat baik. Ia akan berusaha keras menyelesaikan tugas dengan cepat dan efisien." },
    "S-I-C": { "title": "COOPERATIVE & ACCOMMODATING", "traits": ["Stabil","Setia kawan","Suka membantu","Tenang","Kaku jika tertekan","Menghindari konflik"], "job_match": "Administration Management, Accountancy, Architect, Auditing, Child Care, Computer Operations, Secretarial, Designer, Dietician, Quality Control, Personnel Work, Data Processing (Operator, Processor, Entry), Technical Management, Statistician, Computer Hardware/Software Sales.", "summary": "Seorang yang memiliki keseimbangan kepribadian; kepribadiannya di antara \"task\" atau \"people\". Ia mau bekerjasama dan orang lain merespon positif karena penampilannya yang tidak menuntut. Ia bekerja dan merespon dalam kondisi kerja yang menyenangkan dan akan menyatukan tim jika diberi kesempatan untuk menggunakan keterampilannya. Biasanya ia bukan inisiator dalam berhubungan dengan sesama melainkan bersemangat mempertahankan suatu hubungan begitu hubungan itu terbina. Ramah, mudah berteman, pendengar yang baik." },
    "S-C-D": { "title": "PERFECTIONIST", "traits": ["Cermat","Teliti","Pendiam","Loyal","Sangat analitis","Sukar percaya orang lain","Kurang luwes dalam sosialisasi"], "job_match": "Research/Science Work, Technical Management, IT Management, Credit Controller, Production/Distribution Supervisor, Administrator, Chief Engineer, Engineer (Design, Project, Production, Service, Maintenance), Engineering and Production (Control, Supervisor), Plumber, Work Study.", "summary": "Berpikir sistematis dan cenderung mengikuti prosedur dalam kehidupan pribadi dan pekerjaannya. Teratur dan memiliki perencanaan yang baik, ia teliti dan fokus pada detil. Ia bertindak dengan penuh kebijaksanaan, diplomatis dan jarang menentang rekan kerjanya dengan sengaja. Ia sangat berhati-hati, ia sungguh-sungguh mengharapkan akurasi dan standard tinggi dalam pekerjaannya. Ia cenderung terjebak dalam hal detil, khususnya jika harus memutuskan. ia menginginkan adanya petunjuk standard pelaksanaan kerja dan tanpa perubahan mendadak." },
    "S-C-I": { "title": "COOPERATIVE & ACCOMMODATING", "traits": ["Hati-hati","Toleran","Mengakomodasi","Berpikir sebelum bicara","Menghargai tradisi","Memerlukan kepastian"], "job_match": "Administration Management, Accountancy, Architect, Auditing, Child Care, Computer Operations, Secretarial, Designer, Dietician, Quality Control, Personnel Work, Data Processing (Operator, Processor, Entry), Technical Management, Statistician, Computer Hardware/Software Sales.", "summary": "Seorang yang memiliki keseimbangan kepribadian; kepribadiannya di antara \"task\" atau \"people\". Ia mau bekerjasama dan orang lain merespon positif karena penampilannya yang tidak menuntut. Ia bekerja dan merespon dalam kondisi kerja yang menyenangkan dan akan menyatukan tim jika diberi kesempatan untuk menggunakan keterampilannya. Biasanya ia bukan inisiator dalam berhubungan dengan sesama melainkan bersemangat mempertahankan suatu hubungan begitu hubungan itu terbina. Ramah, mudah berteman, pendengar yang baik." },
    "C-D-I": { "title": "CHALLENGER", "traits": ["Cerdas","Perfeksionis","Berpikir mendalam","Cepat menangkap esensi","Cenderung menuntut"], "job_match": "Engineering, Production and Finance (Directing, Administrating, Managing and Managing Specialist Work), Scientific, Research Planning, Personnel, Trouble Shooting, Credit Control, Chief Accountant, Accountant, Chief Engineer, Work Study, Consultancy, Designer, Draughtsman, Project Work, Security Specialist, Doctor, Attorney.", "summary": "Seorang yang sensitif terhadap permasalahan, dan memiliki kreativitas yang baik dalam memecahkan masalah. Ia dapat menyelesaikan tugas-tugas penting dalam waktu singkat karena mempunyai keputusan yang kuat. Seorang yang tekun dan memiliki reaksi yang cepat. Ia akan meneliti dan mengejar semua kemungkinan yang ada dalam mencari solusi permasalahan. Ia banyak memberikan ide-ide dengan berfokus pada pekerjaan. Usaha yang keras pada ketepatan akan mengimbangi keinginannya pada hasil yang terukur. Ia cenderung perfeksionis dan dapat juga memperlambat pengambilan keputusan karena keinginannya untuk menentukan pilihan yang terbaik." },
    "C-D-S": { "title": "DESIGNER", "traits": ["Rapi","Terorganisir","Sistematik","Menyukai detail teknis","Sulit kompromi"], "job_match": "Engineering (Management, Research, Design), Research (R&D), Planning, Chemist, Accountancy, Specialist, Finance, Technician, Quality Control, Production Planning/Management, Design Engineer, Bookkeeper, Chemist Technician, Safety Officer, Librarian.", "summary": "Seorang yang sangat berorientasi pada tugas dan sensitif pada permasalahan. Ia lebih mempedulikan tugas yang ada dibanding orang-orang di sekitarnya, termasuk perasaan mereka. Sangat kukuh/keras dan mempunyai pendekatan yang efektif dalam pemecahan masalah. Oleh karena sifat alamiah dan keinginannya akan hasil yang terukur, Akan tampak dingin, tidak berperasaan dan menjaga jarak. Ia membuat keputusan berdasar pada fakta, bukan emosi. Cenderung pendiam dan tidak mudah percaya." },
    "C-I-D": { "title": "ASSESSOR", "traits": ["Kritis","Ramah","Adaptif","Menyukai fakta","Perfeksionis namun luwes","Berorientasi ke kualitas","Sering menunda jika kurang info"], "job_match": "Sales (Technical/Specialist), Public Relations, Lecturer, Academic, Personnel Administration, Purchasing, Travel Agent, Training, Teaching, Real Estate Agent, Hospitality Administration, Sales-Technical, Hotelier, Project Engineer, Service Engineer.", "summary": "Merupakan seseorang yang analitis, berwatak hati-hati dan ramah pada saat merasa nyaman. Ia sangat biasa dengan orang asing, karena ia dapat menilai dan menyesuaikan diri dalam hubungan mereka. Ia dapat mengembangkan hubungan baru dengan mudah ketika ia ingin melakukannya, dan pada umumnya dapat mengendalikan diri sampai pada tingkat di mana ia jarang menimbulkan rasa benci pada orang lain dengan sengaja. Ia menampilkan sikap peduli dan ramah, namun mampu memusatkan perhatian pada penyelesaian tugas yang ada. Ia cenderung perfeksionis secara alami, dan akan mengisolasi dirinya jika diperlukan untuk melaksanakan pekerjaan. Ia suka berada pada situasi yang dapat diramalkan dan tidak ada kejutan. Ia sangat berorientasi pada kualitas dan akan bekerja dengan keras untuk menyelesaikan pekerjakan dengan benar. Ia ingin orang-orang berkenan akan pekerjaan yang sudah ia selesaikan dengan baik." },
    "C-I-S": { "title": "ASSESSOR", "traits": ["Hati-hati","Analitis","Ramah","Sensitif","Loyal pada tugas","Konsisten","Fokus"], "job_match": "Sales (Technical/Specialist), Public Relations, Lecturer, Academic, Personnel Administration, Purchasing, Travel Agent, Training, Teaching, Real Estate Agent, Hospitality Administration, Sales-Technical, Hotelier, Project Engineer, Service Engineer.", "summary": "Merupakan seseorang yang analitis, berwatak hati-hati dan ramah pada saat merasa nyaman. Ia sangat biasa dengan orang asing, karena ia dapat menilai dan menyesuaikan diri dalam hubungan mereka. Ia dapat mengembangkan hubungan baru dengan mudah ketika ia ingin melakukannya, dan pada umumnya dapat mengendalikan diri sampai pada tingkat di mana ia jarang menimbulkan rasa benci pada orang lain dengan sengaja. Ia menampilkan sikap peduli dan ramah, namun mampu memusatkan perhatian pada penyelesaian tugas yang ada. Ia cenderung perfeksionis secara alami, dan akan mengisolasi dirinya jika diperlukan untuk melaksanakan pekerjaan. Ia suka berada pada situasi yang dapat diramalkan dan tidak ada kejutan. Ia sangat berorientasi pada kualitas dan akan bekerja dengan keras untuk menyelesaikan pekerjakan dengan benar. Ia ingin orang-orang berkenan akan pekerjaan yang sudah ia selesaikan dengan baik." },
    "C-S-D": { "title": "PERFECTIONIST", "traits": ["Analitis","Tenang","Kaku pada aturan","Penuh perhitungan","Kritis","Perfeksionis","Sulit diubah pemikirannya"], "job_match": "Research/Science Work, Technical Management, IT Management, Credit Controller, Production/Distribution Supervisor, Administrator, Chief Engineer, Engineer (Design, Project, Production, Service, Maintenance), Engineering and Production (Control, Supervisor), Plumber, Work Study.", "summary": "Berpikir sistematis dan cenderung mengikuti prosedur dalam kehidupan pribadi dan pekerjaannya. Teratur dan memiliki perencanaan yang baik, ia teliti dan fokus pada detil. Ia bertindak dengan penuh kebijaksanaan, diplomatis dan jarang menentang rekan kerjanya dengan sengaja. Ia sangat berhati-hati, ia sungguh-sungguh mengharapkan akurasi dan standard tinggi dalam pekerjaannya. Ia cenderung terjebak dalam hal detil, khususnya jika harus memutuskan. ia menginginkan adanya petunjuk standard pelaksanaan kerja dan tanpa perubahan mendadak." },
    "C-S-I": { "title": "PERFECTIONIST", "traits": ["Berorientasi pada kualitas","Tenang","Ramah di komunitas kecil","Kreatif teknis","Perlu dorongan dan validasi"], "job_match": "Research/Science Work, Technical Management, IT Management, Credit Controller, Production/Distribution Supervisor, Administrator, Chief Engineer, Engineer (Design, Project, Production, Service, Maintenance), Engineering and Production (Control, Supervisor), Plumber, Work Study.", "summary": "Berpikir sistematis dan cenderung mengikuti prosedur dalam kehidupan pribadi dan pekerjaannya. Teratur dan memiliki perencanaan yang baik, ia teliti dan fokus pada detil. Ia bertindak dengan penuh kebijaksanaan, diplomatis dan jarang menentang rekan kerjanya dengan sengaja. Ia sangat berhati-hati, ia sungguh-sungguh mengharapkan akurasi dan standard tinggi dalam pekerjaannya. Ia cenderung terjebak dalam hal detil, khususnya jika harus memutuskan. ia menginginkan adanya petunjuk standard pelaksanaan kerja dan tanpa perubahan mendadak." },
  };

  const finalResult = discDatabase[patternCode];
  const typeCount = patternCode.includes("Pure") ? "1 Tipe" : (patternCode === "Transisi" ? "0 Tipe" : (patternCode.split('-').length + " Tipe"));

  return {
    code: patternCode,
    title: finalResult ? finalResult.title : (patternCode === "Transisi" ? "Transisi" : "Tidak Teridentifikasi"),
    summary: finalResult ? finalResult.summary : "Profil dalam masa transisi atau skor tidak seimbang.",
    typeCount: typeCount + " Kepribadian",
    traits: finalResult ? finalResult.traits : [],
    jobMatch: finalResult ? finalResult.job_match : ""
  };
}

export function determineDISCInterpretation(tally: DISCTally): DISCInterpretation {
  const mask = getPersonaProfile(tally.most, normTableGraph1);
  const core = getPersonaProfile(tally.least, normTableGraph2);
  const mirror = getPersonaProfile(tally.change, normTableGraph3);

  return {
    mask,
    core,
    mirror,
    // Provide fallback properties for backward compatibility with older UI rendering
    primaryType: mirror.code as any, 
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
