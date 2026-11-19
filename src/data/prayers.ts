export type StageId =
  | 'berangkat'
  | 'ihram'
  | 'mekkah'
  | 'thawaf'
  | 'sai'
  | 'tahallul';

export interface StageInfo {
  id: StageId;
  name: string;
  shortName: string;
  subtitle: string;
  order: number;
}

export interface Prayer {
  id: number;
  stageId: StageId;
  stageName: string;
  title: string;
  arabic: string;
  latin: string;
  meaning: string;
  note?: string;
}

export const STAGES: StageInfo[] = [
  {
    id: 'berangkat',
    name: 'Berangkat',
    shortName: 'Berangkat',
    subtitle: 'Keluar rumah hingga naik kendaraan',
    order: 1,
  },
  {
    id: 'ihram',
    name: 'Ihram',
    shortName: 'Ihram',
    subtitle: 'Niat ihram di miqat & talbiyah',
    order: 2,
  },
  {
    id: 'mekkah',
    name: 'Tiba di Mekkah',
    shortName: 'Mekkah',
    subtitle: 'Masuk tanah haram & melihat Ka’bah',
    order: 3,
  },
  {
    id: 'thawaf',
    name: 'Thawaf',
    shortName: 'Thawaf',
    subtitle: '7 putaran mengelilingi Ka’bah',
    order: 4,
  },
  {
    id: 'sai',
    name: 'Sa’i',
    shortName: 'Sa’i',
    subtitle: '7 lintasan antara Safa dan Marwah',
    order: 5,
  },
  {
    id: 'tahallul',
    name: 'Tahallul',
    shortName: 'Tahallul',
    subtitle: 'Mencukur rambut & penutup umrah',
    order: 6,
  },
];

export const PRAYERS: Prayer[] = [
  {
    id: 0,
    stageId: 'berangkat',
    stageName: 'Berangkat',
    title: 'Keluar rumah',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    latin: 'Bismillāhi tawakkaltu ‘alallāh, lā ḥawla wa lā quwwata illā billāh.',
    meaning:
      'Dengan nama Allah, aku bertawakal kepada Allah. Tiada daya dan kekuatan kecuali dengan pertolongan Allah.',
  },
  {
    id: 1,
    stageId: 'berangkat',
    stageName: 'Berangkat',
    title: 'Naik kendaraan',
    arabic:
      'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    latin:
      'Subḥānalladzī sakhkhara lanā hādzā wa mā kunnā lahū muqrinīn, wa innā ilā rabbinā lamunqalibūn.',
    meaning:
      'Maha Suci Allah yang menundukkan kendaraan ini bagi kami, padahal kami tidak mampu menguasainya. Dan sesungguhnya kepada Tuhan kami, kami akan kembali.',
    note: 'Dibaca juga saat naik pesawat terbang atau bus menuju Tanah Suci.',
  },
  {
    id: 2,
    stageId: 'ihram',
    stageName: 'Ihram',
    title: 'Niat ihram umrah',
    arabic: 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً',
    latin: 'Labbaika Allāhumma ‘umratan.',
    meaning: 'Aku penuhi panggilan-Mu ya Allah untuk berumrah.',
    note: 'Dibaca di miqat setelah mandi sunnah dan berpakaian ihram.',
  },
  {
    id: 3,
    stageId: 'ihram',
    stageName: 'Ihram',
    title: 'Talbiyah',
    arabic:
      'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
    latin:
      'Labbaik Allāhumma labbaik, labbaika lā syarīka laka labbaik, innal ḥamda wan ni‘mata laka wal mulk, lā syarīka lak.',
    meaning:
      'Aku penuhi panggilan-Mu ya Allah. Tiada sekutu bagi-Mu. Sesungguhnya segala puji, nikmat, dan kerajaan adalah milik-Mu.',
    note: 'Disunnahkan untuk diperbanyak sepanjang perjalanan sampai memulai thawaf.',
  },
  {
    id: 4,
    stageId: 'mekkah',
    stageName: 'Tiba di Mekkah',
    title: 'Memasuki kota Mekkah',
    arabic:
      'اللَّهُمَّ هَذَا حَرَمُكَ وَأَمْنُكَ فَحَرِّمْ لَحْمِي وَدَمِي عَلَى النَّارِ وَآمِنِّي مِنْ عَذَابِكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    latin:
      'Allāhumma hādzā ḥaramuka wa amnuka faḥarrim laḥmī wa damī ‘alan nār, wa āminnī min ‘adzābika yauma tab‘atsu ‘ibādak.',
    meaning:
      'Ya Allah, ini tanah haram dan tempat aman-Mu. Haramkanlah dagingku dan darahku dari api neraka, dan amankan aku dari azab-Mu pada hari Engkau bangkitkan hamba-hamba-Mu.',
  },
  {
    id: 5,
    stageId: 'mekkah',
    stageName: 'Tiba di Mekkah',
    title: 'Masuk Masjidil Haram',
    arabic:
      'بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    latin:
      'Bismillāhi waṣ-ṣalātu was-salāmu ‘alā rasūlillāh, Allāhummaftaḥ lī abwāba raḥmatik.',
    meaning:
      'Dengan nama Allah, shalawat dan salam atas Rasulullah. Ya Allah, bukakanlah pintu-pintu rahmat-Mu untukku.',
    note: 'Melangkah masuk masjid dengan mendahulukan kaki kanan.',
  },
  {
    id: 6,
    stageId: 'mekkah',
    stageName: 'Tiba di Mekkah',
    title: 'Pertama melihat Ka’bah',
    arabic:
      'اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً',
    latin:
      'Allāhumma zid hādzal baita tasyrīfan wa ta‘ẓīman wa takrīman wa mahābah.',
    meaning:
      'Ya Allah, tambahkanlah kemuliaan, keagungan, kehormatan, dan wibawa pada rumah ini.',
    note: 'Angkat kedua tangan dan berdoa dengan khusyuk; momen melihat Ka’bah termasuk waktu yang mustajab.',
  },
  {
    id: 7,
    stageId: 'thawaf',
    stageName: 'Thawaf',
    title: 'Istilam Hajar Aswad',
    arabic: 'بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ',
    latin: 'Bismillāhi wallāhu akbar.',
    meaning: 'Dengan nama Allah, Allah Maha Besar.',
    note: 'Dibaca sambil menghadap dan memberi isyarat tangan kanan ke arah Hajar Aswad di awal setiap putaran.',
  },
  {
    id: 8,
    stageId: 'thawaf',
    stageName: 'Thawaf',
    title: 'Antara Rukun Yamani & Hajar Aswad',
    arabic:
      'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin:
      'Rabbanā ātinā fid-dunyā ḥasanah, wa fil-ākhirati ḥasanah, wa qinā ‘adzāban-nār.',
    meaning:
      'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.',
    note: 'Diulang pada setiap putaran antara Rukun Yamani hingga Hajar Aswad. Di bagian lain thawaf, bebas membaca dzikir atau doa pribadi.',
  },
  {
    id: 9,
    stageId: 'thawaf',
    stageName: 'Thawaf',
    title: 'Di belakang Maqam Ibrahim',
    arabic: 'وَاتَّخِذُوا مِنْ مَقَامِ إِبْرَاهِيمَ مُصَلًّى',
    latin: 'Wattakhidzū min maqāmi Ibrāhīma muṣallā.',
    meaning: 'Dan jadikanlah sebagian maqam Ibrahim sebagai tempat shalat.',
    note: 'Dibaca saat menuju belakang Maqam Ibrahim setelah menyelesaikan 7 putaran thawaf untuk melaksanakan shalat sunnah dua rakaat.',
  },
  {
    id: 10,
    stageId: 'thawaf',
    stageName: 'Thawaf',
    title: 'Minum air zamzam',
    arabic:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ',
    latin:
      'Allāhumma innī as’aluka ‘ilman nāfi‘ā, wa rizqan wāsi‘ā, wa syifā’an min kulli dā’.',
    meaning:
      'Ya Allah, aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang luas, dan kesembuhan dari segala penyakit.',
    note: 'Dianjurkan minum dengan tangan kanan dalam posisi menghadap Ka’bah sambil berdoa sesuai hajat.',
  },
  {
    id: 11,
    stageId: 'sai',
    stageName: 'Sa’i',
    title: 'Mendekati bukit Safa',
    arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ',
    latin: 'Innaṣ-ṣafā wal-marwata min sya‘ā’irillāh.',
    meaning: 'Sesungguhnya Safa dan Marwah adalah sebagian dari syiar Allah.',
    note: 'Dibaca saat mendekati bukit Safa di awal Sa’i, lalu naik ke bukit Safa, menghadap Ka’bah, bertakbir, dan berdoa.',
  },
  {
    id: 12,
    stageId: 'sai',
    stageName: 'Sa’i',
    title: 'Berjalan antara Safa & Marwah',
    arabic: 'رَبِّ اغْفِرْ وَارْحَمْ إِنَّكَ أَنْتَ الْأَعَزُّ الْأَكْرَمُ',
    latin: 'Rabbigfir warḥam innaka antal a‘azzul akram.',
    meaning:
      'Ya Tuhanku, ampunilah dan rahmatilah, sesungguhnya Engkau Maha Perkasa lagi Maha Mulia.',
    note: 'Dilakukan sebanyak 7 lintasan: Safa ke Marwah dihitung 1, Marwah ke Safa dihitung 2, hingga berakhir di Marwah pada lintasan ke-7.',
  },
  {
    id: 13,
    stageId: 'tahallul',
    stageName: 'Tahallul',
    title: 'Selesai umrah & tahallul',
    arabic:
      'اللَّهُمَّ تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
    latin: 'Allāhumma taqabbal minnā innaka antas-samī‘ul ‘alīm.',
    meaning:
      'Ya Allah, terimalah amal kami, sesungguhnya Engkau Maha Mendengar lagi Maha Mengetahui.',
    note: 'Cukur atau potong rambut (minimal beberapa helai secara merata bagi wanita, atau gundul/pendek merata bagi pria). Dengan tahallul, rangkaian ibadah umrah selesai.',
  },
];
