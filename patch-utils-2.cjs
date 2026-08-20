const fs = require('fs');
let utils = fs.readFileSync('src/utils/discCalculator.ts', 'utf8');

const getPersonaProfileStr = `
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

  const discInterpretationsDb: Record<string, { title: string; desc: string }> = {
    // --- 1 TIPE KEPRIBADIAN (PURE) ---
    "Pure D": { title: "Pure Dominance", desc: "Memiliki rasa ego yang tinggi dan cenderung individualis dengan standard yang sangat tinggi. Lebih suka menganalisa masalah sendirian. Mampu memimpin situasi untuk mencapai sasarannya." },
    "Pure I": { title: "Pure Influence", desc: "Antusias dan optimistik, lebih suka mencapai sasarannya melalui orang lain. Sangat menonjol dalam keterampilan berkomunikasi dan dikenal sebagai individu yang inspirasional." },
    "Pure S": { title: "Pure Steadiness", desc: "Individu konsisten yang berusaha menjaga lingkungan yang tidak berubah. Sabar, loyal dan suka menolong. Sangat baik bekerja dengan petunjuk dan peraturan yang jelas." },
    "Pure C": { title: "Pure Compliance", desc: "Praktis, cakap dan unik. Sistematis, akurat, rapi dan terorganisir. Sangat analitis dan hati-hati dalam membuat keputusan berdasarkan pada logika, bukan emosi." },
    // --- 2 TIPE KEPRIBADIAN GABUNGAN ---
    "D-I": { title: "Dominance - Influence", desc: "Selalu ingin tahu, logis, kritis dalam memecahkan masalah. Berpandangan jauh ke depan, progresif, dan mau berkompetisi. Menginginkan otoritas yang jelas." },
    "D-S": { title: "Dominance - Steadiness", desc: "Obyektif dan analitis. Ingin terlibat dalam situasi dan memberikan dukungan. Termotivasi oleh target pribadi, mandiri, cermat dan ulet." },
    "D-C": { title: "Dominance - Compliance", desc: "Sensitif terhadap permasalahan, memiliki kreativitas pemecahan masalah yang baik. Tekun, cepat bereaksi, namun cenderung perfeksionis." },
    "I-D": { title: "Influence - Dominance", desc: "Pemimpin integratif yang bekerja melalui orang lain. Ramah dan mendapat hormat dari berbagai pihak. Kadang bertindak impulsif dan butuh tantangan." },
    "I-S": { title: "Influence - Steadiness", desc: "Mengesankan kehangatan, simpati, dan pengertian. Pendengar yang baik, sangat demonstratif, dan bertindak sebagai 'penjaga damai'." },
    "I-C": { title: "Influence - Compliance", desc: "Ramah, suka berteman, dan nyaman dengan orang asing. Cenderung perfeksionis alamiah dan mempromosikan tugas orang lain. Sangat sosial." },
    "S-D": { title: "Steadiness - Dominance", desc: "Obyektif dan analitis. Termotivasi oleh target pribadi, menyukai orang-orang, tetapi mampu sangat berorientasi pada pekerjaan saat dibutuhkan." },
    "S-I": { title: "Steadiness - Influence", desc: "Hangat, simpati, dan pengertian. Toleran pada mereka yang tidak produktif, pendengar yang baik, dan selalu menjaga kedamaian keadaan." },
    "S-C": { title: "Steadiness - Compliance", desc: "Baik secara alamiah dan sangat berorientasi detil. Peduli pada orang di sekitarnya dan berhati-hati sebelum membuat keputusan." },
    "C-D": { title: "Compliance - Dominance", desc: "Sangat berorientasi pada tugas dan kukuh dalam masalah. Tampak dingin karena membuat keputusan murni berdasar fakta, bukan emosi." },
    "C-I": { title: "Compliance - Influence", desc: "Analitis, berwatak hati-hati, ramah saat nyaman. Perfeksionis alami, suka situasi yang bisa diramalkan tanpa kejutan, dan berorientasi kualitas." },
    "C-S": { title: "Compliance - Steadiness", desc: "Berpikir sistematis, teratur, mengikuti prosedur, dan fokus pada detil. Sangat berhati-hati dan mengharapkan petunjuk standar." },
    // --- 3 TIPE KEPRIBADIAN GABUNGAN ---
    "D-I-S": { title: "Dominance - Influence - Steadiness", desc: "Fokus pada penyelesaian pekerjaan dan menunjukkan penghargaan tinggi kepada orang lain. Enerjik, sosial, dan mampu memotivasi rekan." },
    "D-I-C": { title: "Dominance - Influence - Compliance", desc: "Menggabungkan kesenangan dengan pekerjaan. Ramah secara alami namun menilai orang dan tugas secara hati-hati." },
    "D-S-I": { title: "Dominance - Steadiness - Influence", desc: "Obyektif, analitis, dan termotivasi oleh target pribadi tapi juga menyukai hubungan sesama. Tenang, stabil, dan ulet." },
    "D-S-C": { title: "Dominance - Steadiness - Compliance", desc: "Termotivasi target pribadi, obyektif dan analitis. Tenang, stabil, berdaya tahan tinggi, dan memiliki tindak lanjut yang sangat baik." },
    "D-C-I": { title: "Dominance - Compliance - Influence", desc: "Sensitif pada masalah dan memiliki reaksi cepat. Banyak memberi ide dengan fokus pada pekerjaan. Usaha keras pada ketepatan." },
    "D-C-S": { title: "Dominance - Compliance - Steadiness", desc: "Sensitif terhadap masalah, mencari semua kemungkinan solusi, cenderung perfeksionis, dan mengimbangi target dengan ketepatan terukur." },
    "I-D-S": { title: "Influence - Dominance - Steadiness", desc: "Bersahabat, suka mengendalikan situasi, dan menjadi pemimpin. Team player sekaligus team leader yang menginginkan popularitas." },
    "I-D-C": { title: "Influence - Dominance - Compliance", desc: "Berorientasi tugas sekaligus menyukai orang. Baik dalam merekrut orang, mengharapkan tugas dilakukan dengan benar, namun butuh pengakuan sosial." },
    "I-S-D": { title: "Influence - Steadiness - Dominance", desc: "Bersemangat saat termotivasi sasaran. Lebih suka memimpin tapi mau melayani. Peduli pada orang di sekitarnya dan efisien." },
    "I-S-C": { title: "Influence - Steadiness - Compliance", desc: "Berorientasi orang, lancar komunikasi, loyal, sensitif, dan berstandar tinggi. Keputusan dibuat berdasar fakta pendukung." },
    "I-C-D": { title: "Influence - Compliance - Dominance", desc: "Analitis, hati-hati, ramah saat nyaman. Menampilkan sikap peduli namun tetap mampu memusatkan perhatian pada penyelesaian tugas." },
    "I-C-S": { title: "Influence - Compliance - Steadiness", desc: "Berorientasi orang, peka, dan berstandar tinggi. Menginginkan stabilitas dan kepastian akan harapannya sebelum memulai proyek baru." },
    "S-D-I": { title: "Steadiness - Dominance - Influence", desc: "Obyektif, analitis, ingin terlibat dan mendukung. Stabil, ulet memulai pekerjaan, dan mandiri dengan tindak lanjut yang baik." },
    "S-D-C": { title: "Steadiness - Dominance - Compliance", desc: "Sabar, terkontrol, suka menggali fakta. Merencanakan pekerjaan dengan hati-hati namun bekerja konsisten dengan arahan yang benar." },
    "S-I-D": { title: "Steadiness - Influence - Dominance", desc: "Hangat dan simpati. Tidak tegas memberi perintah, toleran pada ketidakproduktifan, dan selalu menjaga kedamaian." },
    "S-I-C": { title: "Steadiness - Influence - Compliance", desc: "Stabil, ramah, membangun hubungan positif. Individualis namun berlawanan dengan ketidaksepakatan. Moderat dan diandalkan." },
    "S-C-D": { title: "Steadiness - Compliance - Dominance", desc: "Berorientasi detil dan teliti. Mempertimbangkan sekeliling dengan hati-hati agar tidak salah langkah atau dimanfaatkan orang lain." },
    "S-C-I": { title: "Steadiness - Compliance - Influence", desc: "Stabil dan ramah. Membutuhkan parameter wewenang yang jelas sebelum membuat keputusan dan suka mendukung pihak yang lemah." },
    "C-D-I": { title: "Compliance - Dominance - Influence", desc: "Kukuh/keras, pendekatan efektif pada pemecahan masalah. Keputusan berdasar fakta, bukan emosi, sehingga cenderung pendiam." },
    "C-D-S": { title: "Compliance - Dominance - Steadiness", desc: "Berorientasi pada detil, logis, standard tinggi. Kompetitif dan sangat memusatkan perhatian pada penyelesaian tugas bermutu." },
    "C-I-D": { title: "Compliance - Influence - Dominance", desc: "Analitis dan ramah. Mampu mengisolasi diri jika perlu untuk pekerjaan, sangat berorientasi pada kualitas untuk diakui kinerjanya." },
    "C-I-S": { title: "Compliance - Influence - Steadiness", desc: "Menggabungkan ketepatan dan loyalitas. Pencari fakta yang sangat baik, bersahabat, banyak bicara, namun menginginkan stabilitas sasaran." },
    "C-S-D": { title: "Compliance - Steadiness - Dominance", desc: "Sistematis, teratur, teliti. Bertindak diplomatis dan mengharapkan akurasi. Tidak menyukai kejutan dan perubahan mendadak." },
    "C-S-I": { title: "Compliance - Steadiness - Influence", desc: "Menggabungkan ketepatan dan loyalitas. Menolak agresi dan mengharapkan suasana harmonis. Pencari fakta yang sangat handal." }
  };

  const finalResult = discInterpretationsDb[patternCode];
  const typeCount = patternCode.includes("Pure") ? "1 Tipe" : (patternCode === "Transisi" ? "0 Tipe" : (patternCode.split('-').length + " Tipe"));

  return {
    code: patternCode,
    title: finalResult ? finalResult.title : (patternCode === "Transisi" ? "Transisi" : "Tidak Teridentifikasi"),
    summary: finalResult ? finalResult.desc : "Profil dalam masa transisi atau skor tidak seimbang. Disarankan tes ulang.",
    typeCount: typeCount + " Kepribadian"
  };
}
`;

utils = utils.replace("export function determineDISCInterpretation(tally: DISCTally): DISCInterpretation {", getPersonaProfileStr + "\nexport function determineDISCInterpretation(tally: DISCTally): DISCInterpretation {");

fs.writeFileSync('src/utils/discCalculator.ts', utils);
