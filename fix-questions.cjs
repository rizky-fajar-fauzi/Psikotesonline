const fs = require('fs');

const userQuestions = [
  { "id": 1, "statements": [ "Supel, bersahabat, serta mudah bersepakat dengan orang lain", "Menaruh kepercayaan dan berprasangka baik kepada orang lain", "Berjiwa petualang, berani berspekulasi dan mengambil risiko", "Bertoleransi tinggi serta menghargai hak orang lain" ] },
  { "id": 2, "statements": [ "Cenderung tenang, bersuara lembut, dan tertutup", "Berpandangan optimis serta visioner terhadap masa depan", "Suka menjadi pusat perhatian dan aktif bersosialisasi", "Pembawa damai dan berusaha menciptakan keharmonisan" ] },
  { "id": 3, "statements": [ "Senang memberi semangat dan motivasi kepada rekan sekitar", "Berupaya mencapai hasil kerja yang sempurna tanpa cela", "Menikmati kebersamaan dan menjadi bagian solid dalam tim", "Berorientasi menetapkan target dan sasaran yang jelas" ] },
  { "id": 4, "statements": [ "Mudah merasa tertekan atau frustrasi saat situasi buntu", "Cenderung memendam perasaan dan unek-unek secara pribadi", "Tegas mengekspresikan sudut pandang atau opini pribadi", "Berani mengambil sikap serta siap menghadapi pertentangan" ] },
  { "id": 5, "statements": [ "Komunikatif, ekspresif, dan ceria saat berbicara", "Bertindak serba cepat, tekun, dan penuh keyakinan", "Menjaga kestabilan emosi serta keseimbangan lingkungan kerja", "Patuh dan taat pada regulasi serta prosedur yang ada" ] },
  { "id": 6, "statements": [ "Mengelola ritme kerja dan alokasi waktu secara produktif", "Mudah merasa dikejar waktu dan berada di bawah tekanan", "Menganggap relasi sosial dan networking sebagai hal utama", "Komitmen menyelesaikan tanggung jawab yang telah dimulai" ] },
  { "id": 7, "statements": [ "Menolak atau enggan menerima perubahan situasi yang tiba-tiba", "Cenderung terlalu banyak mengumbar janji atau komitmen", "Menarik diri atau pasif ketika menghadapi tekanan berat", "Berani berhadapan langsung dan tidak gentar beradu argumen" ] },
  { "id": 8, "statements": [ "Mampu menjadi penyokong serta pendorong semangat yang andal", "Pendengar yang penuh perhatian dan berempati", "Pemikir analitis yang cermat dalam mengolah informasi", "Pandai mendelegasikan wewenang serta membagi tugas kerja" ] },
  { "id": 9, "statements": [ "Fokus utama tertuju pada pencapaian hasil akhir", "Mementingkan akurasi dan proses kerja yang sesuai standar", "Mengupayakan suasana agar tetap rileks dan menyenangkan", "Mengedepankan kolaborasi dan kerja bersama secara kooperatif" ] },
  { "id": 10, "statements": [ "Mampu bertindak mandiri tanpa perlu banyak kontrol luar", "Terbiasa bertindak atau membeli sesuatu berdasarkan dorongan impulsif", "Sabar menanti proses tanpa merasa terburu-buru", "Bertekad kuat untuk merealisasikan segala hal yang diinginkan" ] },
  { "id": 11, "statements": [ "Hangat, ramah, dan cepat membaur di lingkungan baru", "Memiliki karakter unik dan mudah jenuh dengan rutinitas monoton", "Proaktif melakukan perubahan dan langkah pembaharuan", "Menghendaki kepastian, data konkret, dan ketepatan informasi" ] },
  { "id": 12, "statements": [ "Memilih mengalah guna menghindari perdebatan atau konfrontasi", "Sangat teliti dalam memperhatikan hal-hal detail dan teknis", "Fleksibel mengubah rencana pada saat-saat terakhir", "Cenderung mendesak, menuntut, dan bersikap agak keras" ] },
  { "id": 13, "statements": [ "Terus menginginkan peningkatan mutu dan kemajuan karier", "Mudah merasa puas serta menikmati ketenangan yang ada", "Terbuka dan ekspresif dalam memperlihatkan emosi", "Berpembawaan rendah hati, bersahaja, dan sederhana" ] },
  { "id": 14, "statements": [ "Berperilaku kalem, pendiam, dan menjaga privasi", "Berjiwa bebas, ceria, dan tanpa beban", "Menyenangkan, penuh kebaikan, dan tulus kepada orang lain", "Tampil mencolok, berani, serta percaya diri di depan publik" ] },
  { "id": 15, "statements": [ "Menyediakan waktu berkualitas untuk berkumpul bersama rekan", "Gemar menyusun strategi masa depan secara matang", "Antusias menyambut petualangan dan hal-hal baru", "Bangga menerima rekognisi atau ganjaran atas capaian target" ] },
  { "id": 16, "statements": [ "Berani menguji atau mempertanyakan efektivitas peraturan", "Meyakini regulasi dibuat demi menegakkan rasa keadilan", "Merasa aturan yang kaku justru membatasi dan membosankan", "Memandang ketetapan aturan sebagai jaminan rasa aman" ] },
  { "id": 17, "statements": [ "Tertarik pada pengembangan wawasan dan kebudayaan", "Menghargai rekognisi prestasi, status, dan penghargaan", "Mengutamakan jaminan keselamatan, proteksi, dan kepastian", "Menyukai kegiatan perkumpulan, komunitas, dan interaksi sosial" ] },
  { "id": 18, "statements": [ "Bersikap lugas, to-the-point, dan mengambil inisiatif memimpin", "Ceria, antusias, dan gemar memperluas pergaulan", "Konsisten, stabil, dan langkahnya mudah diprediksi", "Selalu waspada, berhati-hati, dan penuh perhitungan" ] },
  { "id": 19, "statements": [ "Berkepribadian tangguh, gigih, dan pantang ditundukkan", "Patuh menjalankan instruksi sesuai komando atasan", "Berjiwa riang, bersemangat, dan ekspresif", "Menghendaki kerapian, tatanan tertib, dan keteraturan" ] },
  { "id": 20, "statements": [ "Siap mengambil kendali untuk memimpin kelompok", "Bersedia mengikuti arahan dan menjadi pengikut yang baik", "Mampu memengaruhi serta membujuk orang lain dengan persuasif", "Berfokus mencari fakta, data, dan bukti nyata sebelum bersikap" ] },
  { "id": 21, "statements": [ "Mengedepankan kepentingan orang lain terlebih dahulu", "Suka berkompetisi, tertantang, dan berjiwa pemenang", "Berpikir positif dan selalu optimis memandang peluang", "Berpikir secara metodis, sistematis, dan logis" ] },
  { "id": 22, "statements": [ "Berusaha menyenangkan perasaan rekan dan mudah beradaptasi", "Spontan, mudah tertawa lepas, dan menghidupkan suasana", "Berani, tegas mengambil keputusan, dan berpendirian kuat", "Berkarakter kalem, tenang, dan tidak banyak bicara" ] },
  { "id": 23, "statements": [ "Menginginkan wewenang yang lebih besar serta kebebasan bertindak", "Tertarik mengeksplorasi kesempatan serta peluang baru", "Berupaya keras menjauhi segala bentuk konflik atau gesekan", "Membutuhkan instruksi, batasan, dan petunjuk operasional yang jelas" ] },
  { "id": 24, "statements": [ "Dapat diandalkan, konsisten, serta memegang amanah", "Kreatif, orisinal, serta memiliki ide-ide unik", "Fokus pada hasil konkret, profitabilitas, dan efisiensi", "Berpegang teguh pada standar mutu yang tinggi dan presisi" ] }
];

const mappedTypes = [
  [ {m: 'S', l: 'S'}, {m: 'I', l: 'I'}, {m: 'X', l: 'D'}, {m: 'C', l: 'C'} ], // Q1 (Old Q1)
  [ {m: 'C', l: 'X'}, {m: 'D', l: 'D'}, {m: 'X', l: 'I'}, {m: 'S', l: 'S'} ], // Q2 (Old Q4)
  [ {m: 'I', l: 'I'}, {m: 'X', l: 'C'}, {m: 'X', l: 'S'}, {m: 'D', l: 'X'} ], // Q3 (Old Q7)
  [ {m: 'C', l: 'C'}, {m: 'S', l: 'S'}, {m: 'X', l: 'I'}, {m: 'D', l: 'D'} ], // Q4 (Old Q10)
  [ {m: 'I', l: 'X'}, {m: 'D', l: 'D'}, {m: 'S', l: 'S'}, {m: 'X', l: 'C'} ], // Q5 (Old Q13)
  [ {m: 'C', l: 'X'}, {m: 'D', l: 'D'}, {m: 'I', l: 'I'}, {m: 'S', l: 'S'} ], // Q6 (Old Q16)
  [ {m: 'S', l: 'X'}, {m: 'I', l: 'I'}, {m: 'X', l: 'C'}, {m: 'X', l: 'D'} ], // Q7 (Old Q19)
  [ {m: 'I', l: 'I'}, {m: 'S', l: 'S'}, {m: 'C', l: 'C'}, {m: 'D', l: 'D'} ], // Q8 (Old Q22)
  [ {m: 'D', l: 'D'}, {m: 'C', l: 'C'}, {m: 'X', l: 'I'}, {m: 'X', l: 'S'} ], // Q9 (Old Q2)
  [ {m: 'X', l: 'C'}, {m: 'D', l: 'D'}, {m: 'S', l: 'S'}, {m: 'I', l: 'X'} ], // Q10 (Old Q5)
  [ {m: 'S', l: 'X'}, {m: 'X', l: 'I'}, {m: 'D', l: 'D'}, {m: 'C', l: 'C'} ], // Q11 (Old Q8)
  [ {m: 'X', l: 'S'}, {m: 'C', l: 'X'}, {m: 'I', l: 'I'}, {m: 'D', l: 'D'} ], // Q12 (Old Q11)
  [ {m: 'D', l: 'D'}, {m: 'S', l: 'X'}, {m: 'I', l: 'X'}, {m: 'X', l: 'C'} ], // Q13 (Old Q14)
  [ {m: 'C', l: 'C'}, {m: 'I', l: 'I'}, {m: 'S', l: 'X'}, {m: 'D', l: 'D'} ], // Q14 (Old Q17)
  [ {m: 'S', l: 'S'}, {m: 'C', l: 'X'}, {m: 'I', l: 'I'}, {m: 'D', l: 'D'} ], // Q15 (Old Q20)
  [ {m: 'X', l: 'D'}, {m: 'C', l: 'X'}, {m: 'I', l: 'I'}, {m: 'S', l: 'S'} ], // Q16 (Old Q23)
  [ {m: 'X', l: 'C'}, {m: 'D', l: 'D'}, {m: 'S', l: 'S'}, {m: 'I', l: 'X'} ], // Q17 (Old Q3)
  [ {m: 'D', l: 'D'}, {m: 'X', l: 'I'}, {m: 'X', l: 'S'}, {m: 'C', l: 'X'} ], // Q18 (Old Q6)
  [ {m: 'D', l: 'D'}, {m: 'S', l: 'X'}, {m: 'I', l: 'I'}, {m: 'X', l: 'C'} ], // Q19 (Old Q9)
  [ {m: 'D', l: 'X'}, {m: 'S', l: 'S'}, {m: 'I', l: 'I'}, {m: 'C', l: 'X'} ], // Q20 (Old Q12)
  [ {m: 'S', l: 'S'}, {m: 'D', l: 'D'}, {m: 'I', l: 'I'}, {m: 'X', l: 'C'} ], // Q21 (Old Q15)
  [ {m: 'S', l: 'S'}, {m: 'X', l: 'I'}, {m: 'D', l: 'D'}, {m: 'C', l: 'C'} ], // Q22 (Old Q18)
  [ {m: 'X', l: 'D'}, {m: 'I', l: 'X'}, {m: 'S', l: 'S'}, {m: 'X', l: 'C'} ], // Q23 (Old Q21)
  [ {m: 'X', l: 'S'}, {m: 'I', l: 'I'}, {m: 'D', l: 'X'}, {m: 'C', l: 'X'} ]  // Q24 (Old Q24)
];

const finalData = userQuestions.map((uq, qIdx) => {
  return {
    id: uq.id,
    options: uq.statements.map((stmt, optIdx) => {
      return {
        text: stmt,
        mostType: mappedTypes[qIdx][optIdx].m,
        leastType: mappedTypes[qIdx][optIdx].l
      };
    })
  };
});

const content = `import { DISCQuestion } from "../types";\n\nexport const discQuestions: DISCQuestion[] = ${JSON.stringify(finalData, null, 2)};\n`;
fs.writeFileSync('src/data/discQuestions.ts', content);
console.log('Fixed and mapped successfully!');
