const fs = require('fs');

const descDb = {
    "Pure D": "Suka mengambil alih, mandiri, dan berorientasi pada hasil. Berani, inovatif, serta cepat mengambil keputusan dan suka memecahkan masalah.",
    "Pure I": "Ramah, antusias, dan banyak bicara. Sangat peduli dengan pandangan orang terhadap mereka. Termotivasi oleh pengakuan dan selalu siap mengambil peluang baru.",
    "Pure S": "Loyal, konsisten, dan sangat teguh. Menghindari konflik dan tidak menyukai perubahan mendadak. Sangat baik bekerja dengan petunjuk dan peraturan yang jelas.",
    "Pure C": "Praktis, cakap dan unik. Sistematis, akurat, rapi dan terorganisir. Sangat analitis dan hati-hati dalam membuat keputusan berdasarkan pada logika, bukan emosi.",
    "D-I": "Selalu ingin tahu, logis, kritis dalam memecahkan masalah. Berpandangan jauh ke depan, progresif, dan mau berkompetisi. Menginginkan otoritas yang jelas.",
    "D-S": "Obyektif dan analitis. Ingin terlibat dalam situasi dan memberikan dukungan. Termotivasi oleh target pribadi, mandiri, cermat dan ulet.",
    "D-C": "Sensitif terhadap permasalahan, memiliki kreativitas pemecahan masalah yang baik. Tekun, cepat bereaksi, namun cenderung perfeksionis.",
    "I-D": "Pemimpin integratif yang bekerja melalui orang lain. Ramah dan mendapat hormat dari berbagai pihak. Kadang bertindak impulsif dan butuh tantangan.",
    "I-S": "Mengesankan kehangatan, simpati, dan pengertian. Pendengar yang baik, sangat demonstratif, dan bertindak sebagai 'penjaga damai'.",
    "I-C": "Ramah, suka berteman, dan nyaman dengan orang asing. Cenderung perfeksionis alamiah dan mempromosikan tugas orang lain. Sangat sosial.",
    "S-D": "Obyektif dan analitis. Termotivasi oleh target pribadi, menyukai orang-orang, tetapi mampu sangat berorientasi pada pekerjaan saat dibutuhkan.",
    "S-I": "Hangat, simpati, dan pengertian. Toleran pada mereka yang tidak produktif, pendengar yang baik, dan selalu menjaga kedamaian keadaan.",
    "S-C": "Sangat bisa diandalkan dan konsisten, ia akan berusaha mempertahankan lingkungan yang tidak berubah. Ia sangat sabar, pendengar yang baik dan sering tidak mementingkan diri sendiri. Sangat peduli pada perasaan orang lain dan berusaha untuk menghindari konflik.",
    "C-D": "Sangat berorientasi pada tugas dan kukuh dalam masalah. Tampak dingin karena membuat keputusan murni berdasar fakta, bukan emosi.",
    "C-I": "Analitis, berwatak hati-hati, ramah saat nyaman. Perfeksionis alami, suka situasi yang bisa diramalkan tanpa kejutan, dan berorientasi kualitas.",
    "C-S": "Berpikir sistematis dan cenderung mengikuti prosedur dalam kehidupan pribadi dan pekerjaannya. Teratur dan memiliki perencanaan yang baik, ia teliti dan fokus pada detil. Ia bertindak dengan penuh kebijaksanaan, diplomatis dan jarang menentang rekan kerjanya dengan sengaja. Ia sangat berhati-hati, sungguh-sungguh mengharapkan akurasi dan standard tinggi dalam pekerjaannya. Ia cenderung terjebak dalam hal detil, khususnya jika harus memutuskan. Menginginkan adanya petunjuk standard pelaksanaan kerja dan tanpa perubahan mendadak.",
    "D-I-S": "Fokus pada penyelesaian pekerjaan dan menunjukkan penghargaan tinggi kepada orang lain. Enerjik, sosial, dan mampu memotivasi rekan.",
    "D-I-C": "Menggabungkan kesenangan dengan pekerjaan. Ramah secara alami namun menilai orang dan tugas secara hati-hati.",
    "D-S-I": "Obyektif, analitis, dan termotivasi oleh target pribadi tapi juga menyukai hubungan sesama. Tenang, stabil, dan ulet.",
    "D-S-C": "Termotivasi target pribadi, obyektif dan analitis. Tenang, stabil, berdaya tahan tinggi, dan memiliki tindak lanjut yang sangat baik.",
    "D-C-I": "Sensitif pada masalah dan memiliki reaksi cepat. Banyak memberi ide dengan fokus pada pekerjaan. Usaha keras pada ketepatan.",
    "D-C-S": "Sensitif terhadap masalah, mencari semua kemungkinan solusi, cenderung perfeksionis, dan mengimbangi target dengan ketepatan terukur.",
    "I-D-S": "Bersahabat, suka mengendalikan situasi, dan menjadi pemimpin. Team player sekaligus team leader yang menginginkan popularitas.",
    "I-D-C": "Berorientasi tugas sekaligus menyukai orang. Baik dalam merekrut orang, mengharapkan tugas dilakukan dengan benar, namun butuh pengakuan sosial.",
    "I-S-D": "Bersemangat saat termotivasi sasaran. Lebih suka memimpin tapi mau melayani. Peduli pada orang di sekitarnya dan efisien.",
    "I-S-C": "Berorientasi orang, lancar komunikasi, loyal, sensitif, dan berstandar tinggi. Keputusan dibuat berdasar fakta pendukung.",
    "I-C-D": "Analitis, hati-hati, ramah saat nyaman. Menampilkan sikap peduli namun tetap mampu memusatkan perhatian pada penyelesaian tugas.",
    "I-C-S": "Berorientasi orang, peka, dan berstandar tinggi. Menginginkan stabilitas dan kepastian akan harapannya sebelum memulai proyek baru.",
    "S-D-I": "Obyektif, analitis, ingin terlibat dan mendukung. Stabil, ulet memulai pekerjaan, dan mandiri dengan tindak lanjut yang baik.",
    "S-D-C": "Sabar, terkontrol, suka menggali fakta. Merencanakan pekerjaan dengan hati-hati namun bekerja konsisten dengan arahan yang benar.",
    "S-I-D": "Hangat dan simpati. Tidak tegas memberi perintah, toleran pada ketidakproduktifan, dan selalu menjaga kedamaian.",
    "S-I-C": "Stabil, ramah, membangun hubungan positif. Individualis namun berlawanan dengan ketidaksepakatan. Moderat dan diandalkan.",
    "S-C-D": "Berorientasi detil dan teliti. Mempertimbangkan sekeliling dengan hati-hati agar tidak salah langkah atau dimanfaatkan orang lain.",
    "S-C-I": "Stabil dan ramah. Membutuhkan parameter wewenang yang jelas sebelum membuat keputusan dan suka mendukung pihak yang lemah.",
    "C-D-I": "Kukuh/keras, pendekatan efektif pada pemecahan masalah. Keputusan berdasar fakta, bukan emosi, sehingga cenderung pendiam.",
    "C-D-S": "Berorientasi pada detil, logis, standard tinggi. Kompetitif dan sangat memusatkan perhatian pada penyelesaian tugas bermutu.",
    "C-I-D": "Analitis dan ramah. Mampu mengisolasi diri jika perlu untuk pekerjaan, sangat berorientasi pada kualitas untuk diakui kinerjanya.",
    "C-I-S": "Menggabungkan ketepatan dan loyalitas. Pencari fakta yang sangat baik, bersahabat, banyak bicara, namun menginginkan stabilitas sasaran.",
    "C-S-D": "Sistematis, teratur, teliti. Bertindak diplomatis dan mengharapkan akurasi. Tidak menyukai kejutan dan perubahan mendadak.",
    "C-S-I": "Menggabungkan ketepatan dan loyalitas. Menolak agresi dan mengharapkan suasana harmonis. Pencari fakta yang sangat handal."
};

let utils = fs.readFileSync('src/utils/discCalculator.ts', 'utf8');

// Replace the database section with a patched one
let newDbCode = utils.replace(/const discDatabase[\s\S]*?\}  \};/, function(match) {
    let result = match;
    for (const key in descDb) {
        // we want to add "summary": "..." to each entry
        const searchStr = `"${key}": { `;
        const summaryStr = `"summary": ${JSON.stringify(descDb[key])}, `;
        result = result.replace(searchStr, searchStr + summaryStr);
    }
    return result;
});

// Update the returned object to use summary
newDbCode = newDbCode.replace('summary: "", // Optional if not used', 'summary: finalResult ? finalResult.summary : "Profil dalam masa transisi atau skor tidak seimbang.",');
newDbCode = newDbCode.replace('summary: ""', 'summary: finalResult ? finalResult.summary : "Profil dalam masa transisi atau skor tidak seimbang."');

fs.writeFileSync('src/utils/discCalculator.ts', newDbCode);
