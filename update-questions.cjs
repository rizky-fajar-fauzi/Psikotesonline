const fs = require('fs');

const userQuestions = [
  {
    "id": 1,
    "statements": [
      "Supel, bersahabat, serta mudah bersepakat dengan orang lain",
      "Menaruh kepercayaan dan berprasangka baik kepada orang lain",
      "Berjiwa petualang, berani berspekulasi dan mengambil risiko",
      "Bertoleransi tinggi serta menghargai hak orang lain"
    ]
  },
  {
    "id": 2,
    "statements": [
      "Cenderung tenang, bersuara lembut, dan tertutup",
      "Berpandangan optimis serta visioner terhadap masa depan",
      "Suka menjadi pusat perhatian dan aktif bersosialisasi",
      "Pembawa damai dan berusaha menciptakan keharmonisan"
    ]
  },
  {
    "id": 3,
    "statements": [
      "Senang memberi semangat dan motivasi kepada rekan sekitar",
      "Berupaya mencapai hasil kerja yang sempurna tanpa cela",
      "Menikmati kebersamaan dan menjadi bagian solid dalam tim",
      "Berorientasi menetapkan target dan sasaran yang jelas"
    ]
  },
  {
    "id": 4,
    "statements": [
      "Mudah merasa tertekan atau frustrasi saat situasi buntu",
      "Cenderung memendam perasaan dan unek-unek secara pribadi",
      "Tegas mengekspresikan sudut pandang atau opini pribadi",
      "Berani mengambil sikap serta siap menghadapi pertentangan"
    ]
  },
  {
    "id": 5,
    "statements": [
      "Komunikatif, ekspresif, dan ceria saat berbicara",
      "Bertindak serba cepat, tekun, dan penuh keyakinan",
      "Menjaga kestabilan emosi serta keseimbangan lingkungan kerja",
      "Patuh dan taat pada regulasi serta prosedur yang ada"
    ]
  },
  {
    "id": 6,
    "statements": [
      "Mengelola ritme kerja dan alokasi waktu secara produktif",
      "Mudah merasa dikejar waktu dan berada di bawah tekanan",
      "Menganggap relasi sosial dan networking sebagai hal utama",
      "Komitmen menyelesaikan tanggung jawab yang telah dimulai"
    ]
  },
  {
    "id": 7,
    "statements": [
      "Menolak atau enggan menerima perubahan situasi yang tiba-tiba",
      "Cenderung terlalu banyak mengumbar janji atau komitmen",
      "Menarik diri atau pasif ketika menghadapi tekanan berat",
      "Berani berhadapan langsung dan tidak gentar beradu argumen"
    ]
  },
  {
    "id": 8,
    "statements": [
      "Mampu menjadi penyokong serta pendorong semangat yang andal",
      "Pendengar yang penuh perhatian dan berempati",
      "Pemikir analitis yang cermat dalam mengolah informasi",
      "Pandai mendelegasikan wewenang serta membagi tugas kerja"
    ]
  },
  {
    "id": 9,
    "statements": [
      "Fokus utama tertuju pada pencapaian hasil akhir",
      "Mementingkan akurasi dan proses kerja yang sesuai standar",
      "Mengupayakan suasana agar tetap rileks dan menyenangkan",
      "Mengedepankan kolaborasi dan kerja bersama secara kooperatif"
    ]
  },
  {
    "id": 10,
    "statements": [
      "Mampu bertindak mandiri tanpa perlu banyak kontrol luar",
      "Terbiasa bertindak atau membeli sesuatu berdasarkan dorongan impulsif",
      "Sabar menanti proses tanpa merasa terburu-buru",
      "Bertekad kuat untuk merealisasikan segala hal yang diinginkan"
    ]
  },
  {
    "id": 11,
    "statements": [
      "Hangat, ramah, dan cepat membaur di lingkungan baru",
      "Memiliki karakter unik dan mudah jenuh dengan rutinitas monoton",
      "Proaktif melakukan perubahan dan langkah pembaharuan",
      "Menghendaki kepastian, data konkret, dan ketepatan informasi"
    ]
  },
  {
    "id": 12,
    "statements": [
      "Memilih mengalah guna menghindari perdebatan atau konfrontasi",
      "Sangat teliti dalam memperhatikan hal-hal detail dan teknis",
      "Fleksibel mengubah rencana pada saat-saat terakhir",
      "Cenderung mendesak, menuntut, dan bersikap agak keras"
    ]
  },
  {
    "id": 13,
    "statements": [
      "Terus menginginkan peningkatan mutu dan kemajuan karier",
      "Mudah merasa puas serta menikmati ketenangan yang ada",
      "Terbuka dan ekspresif dalam memperlihatkan emosi",
      "Berpembawaan rendah hati, bersahaja, dan sederhana"
    ]
  },
  {
    "id": 14,
    "statements": [
      "Berperilaku kalem, pendiam, dan menjaga privasi",
      "Berjiwa bebas, ceria, dan tanpa beban",
      "Menyenangkan, penuh kebaikan, dan tulus kepada orang lain",
      "Tampil mencolok, berani, serta percaya diri di depan publik"
    ]
  },
  {
    "id": 15,
    "statements": [
      "Menyediakan waktu berkualitas untuk berkumpul bersama rekan",
      "Gemar menyusun strategi masa depan secara matang",
      "Antusias menyambut petualangan dan hal-hal baru",
      "Bangga menerima rekognisi atau ganjaran atas capaian target"
    ]
  },
  {
    "id": 16,
    "statements": [
      "Berani menguji atau mempertanyakan efektivitas peraturan",
      "Meyakini regulasi dibuat demi menegakkan rasa keadilan",
      "Merasa aturan yang kaku justru membatasi dan membosankan",
      "Memandang ketetapan aturan sebagai jaminan rasa aman"
    ]
  },
  {
    "id": 17,
    "statements": [
      "Tertarik pada pengembangan wawasan dan kebudayaan",
      "Menghargai rekognisi prestasi, status, dan penghargaan",
      "Mengutamakan jaminan keselamatan, proteksi, dan kepastian",
      "Menyukai kegiatan perkumpulan, komunitas, dan interaksi sosial"
    ]
  },
  {
    "id": 18,
    "statements": [
      "Bersikap lugas, to-the-point, dan mengambil inisiatif memimpin",
      "Ceria, antusias, dan gemar memperluas pergaulan",
      "Konsisten, stabil, dan langkahnya mudah diprediksi",
      "Selalu waspada, berhati-hati, dan penuh perhitungan"
    ]
  },
  {
    "id": 19,
    "statements": [
      "Berkepribadian tangguh, gigih, dan pantang ditundukkan",
      "Patuh menjalankan instruksi sesuai komando atasan",
      "Berjiwa riang, bersemangat, dan ekspresif",
      "Menghendaki kerapian, tatanan tertib, dan keteraturan"
    ]
  },
  {
    "id": 20,
    "statements": [
      "Siap mengambil kendali untuk memimpin kelompok",
      "Bersedia mengikuti arahan dan menjadi pengikut yang baik",
      "Mampu memengaruhi serta membujuk orang lain dengan persuasif",
      "Berfokus mencari fakta, data, dan bukti nyata sebelum bersikap"
    ]
  },
  {
    "id": 21,
    "statements": [
      "Mengedepankan kepentingan orang lain terlebih dahulu",
      "Suka berkompetisi, tertantang, dan berjiwa pemenang",
      "Berpikir positif dan selalu optimis memandang peluang",
      "Berpikir secara metodis, sistematis, dan logis"
    ]
  },
  {
    "id": 22,
    "statements": [
      "Berusaha menyenangkan perasaan rekan dan mudah beradaptasi",
      "Spontan, mudah tertawa lepas, dan menghidupkan suasana",
      "Berani, tegas mengambil keputusan, dan berpendirian kuat",
      "Berkarakter kalem, tenang, dan tidak banyak bicara"
    ]
  },
  {
    "id": 23,
    "statements": [
      "Menginginkan wewenang yang lebih besar serta kebebasan bertindak",
      "Tertarik mengeksplorasi kesempatan serta peluang baru",
      "Berupaya keras menjauhi segala bentuk konflik atau gesekan",
      "Membutuhkan instruksi, batasan, dan petunjuk operasional yang jelas"
    ]
  },
  {
    "id": 24,
    "statements": [
      "Dapat diandalkan, konsisten, serta memegang amanah",
      "Kreatif, orisinal, serta memiliki ide-ide unik",
      "Fokus pada hasil konkret, profitabilitas, dan efisiensi",
      "Berpegang teguh pada standar mutu yang tinggi dan presisi"
    ]
  }
];

const lines = fs.readFileSync('src/data/discQuestions.ts', 'utf8').split('\n');

let currentQuestion = -1;
let currentOption = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  const idMatch = line.match(/"id":\s*(\d+)/);
  if (idMatch) {
    currentQuestion = parseInt(idMatch[1], 10) - 1;
    currentOption = 0;
  }
  
  if (line.includes('"text":')) {
    if (currentQuestion >= 0 && currentQuestion < 24) {
      const newText = userQuestions[currentQuestion].statements[currentOption];
      lines[i] = line.replace(/"text":\s*".*"/, '"text": "' + newText + '"');
      currentOption++;
    }
  }
}

fs.writeFileSync('src/data/discQuestions.ts', lines.join('\n'));
console.log('Update complete via regex');
