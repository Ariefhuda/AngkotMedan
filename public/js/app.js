/**
 * ==========================================================================
 * ANGKOT MEDAN FINDER - CORE APPLICATION LOGIC (js/app.js)
 * Author: Muhammad Arief Huda & Team (Karsa Digital)
 * ==========================================================================
 */

let currentLang = localStorage.getItem('lang') || 'id';

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.id[key] || key;
}

const I18N = {
  id: {
    nav_home: 'Beranda',
    nav_about: 'Tentang',
    hero_location: 'Kota Medan, Sumatera Utara, Indonesia',
    hero_title: 'Baru di Medan? Naik Angkot Aja',
    hero_subtitle: 'Ketik tempat asal dan tujuanmu. Kami tunjukkan angkot nomor berapa yang dinaiki, di mana naik, pindah, dan turun.',
    search_title: 'Cari Rute Angkot',
    label_origin: 'Dari mana?',
    label_dest: 'Mau ke mana?',
    placeholder_origin: 'Contoh: Bandara, Stasiun, Sun Plaza...',
    placeholder_dest: 'Contoh: USU, RS Adam Malik, Istana Maimun...',
    btn_search: 'Cari Rute',
    btn_my_location: 'Lokasi saya',
    btn_track: 'Lacak Rute Ini',
    btn_stop_track: 'Berhenti',
    btn_follow: 'Ikuti',
    route_direct: 'Rute Langsung — Tanpa Pindah',
    route_transfer: 'Perlu 1 Kali Pindah',
    route_multi: 'Perlu Beberapa Kali Pindah',
    route_no_result: 'Rute tidak ditemukan — coba halte lain',
    transfer_marker: 'Turun di Sini & Pindah Angkot',
    transfer_at: 'Pindah ke angkot lain di sini',
    stops: 'halte',
    explore_title: 'Semua Trayek Angkot',
    explorer_desc: 'Semua trayek angkot Medan yang tercatat. Ketuk satu trayek untuk melihat halte dan petanya.',
    explorer_search: 'Cari nomor trayek atau nama operator...',
    about_title: 'Tentang AngkotMedan',
    popular_title: 'Rute Populer',
    about_problem: 'Kenapa Sulit Naik Angkot di Medan?',
    about_problem_desc: 'Medan punya lebih dari seratus trayek angkot dari belasan operator. Tidak ada peta rute resmi dan tidak ada satu tempat yang memuat semuanya. Kalau baru pertama kali ke Medan, biasanya harus bertanya ke orang di jalan: naik angkot mana, turun di mana. Situs ini membantu mencarinya sendiri.',
    about_how: 'Cara Pakai',
    about_how1: 'Ketik Asal & Tujuan',
    about_how1_desc: 'Ketik nama tempat, halte, atau jalan, lalu pilih dari saran yang muncul.',
    about_how2: 'Lihat Rute',
    about_how2_desc: 'Sistem langsung kasih tahu angkot mana yang harus dinaiki, berapa kali pindah, dan turun di mana.',
    about_how3: 'Naik Angkot',
    about_how3_desc: 'Kenali angkot dari warna livery dan nomor trayek yang tertera di badan kendaraan.',
    about_livery: 'Panduan Warna Livery',
    about_livery_desc: 'Setiap angkot punya warna berbeda sesuai operatornya. Kenali warnanya biar gak salah naik.',
    about_data: 'Tentang Data',
    about_data_desc: 'Data trayek dikumpulkan dari sumber publik dan pengamatan di lapangan. Ini bukan data resmi Dishub Kota Medan.',
    about_back: 'Beranda',
    tracking_searching: 'Mencari lokasi...',
    tracking_monitoring: 'Memantau pergerakan',
    btn_back: 'Beranda',
    result_title: 'Rute Ditemukan',
    no_result_title: 'Gak ada rute ditemukan',
    no_result_desc: 'Coba pakai nama halte atau jalan yang lebih umum di sekitar lokasi awal dan tujuanmu.',
    btn_try_again: 'Coba lagi',
    modal_stops: 'Halte yang dilewati'
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    hero_location: 'Medan City, North Sumatra, Indonesia',
    hero_title: 'New in Medan? Just Take Angkot',
    hero_subtitle: 'Just arrived in Medan and don\'t know which angkot to take? Type where you are and where you\'re going — we\'ll show you the exact route. Free, no need to ask anyone.',
    search_title: 'Find Angkot Route',
    label_origin: 'Where from?',
    label_dest: 'Where to?',
    placeholder_origin: 'e.g. Airport, Train Station, Sun Plaza...',
    placeholder_dest: 'e.g. USU, Adam Malik Hospital, Maimun Palace...',
    btn_search: 'Find Route',
    btn_my_location: 'My location',
    btn_track: 'Track This Route',
    btn_stop_track: 'Stop',
    btn_follow: 'Follow',
    route_direct: 'Direct Route — No Transfer',
    route_transfer: '1 Transfer Needed',
    route_multi: 'Multiple Transfers',
    route_no_result: 'No routes found — try different stops',
    transfer_marker: 'Get Off Here & Switch Angkot',
    transfer_at: 'Change to another angkot here',
    stops: 'stops',
    explore_title: 'All Angkot Routes',
    explorer_desc: 'Explore all 118 angkot routes in Medan. Click a card for details.',
    explorer_search: 'Search by route number or operator...',
    about_title: 'About Angkot Medan Finder',
    popular_title: 'Popular Routes',
    about_problem: 'Why is Angkot in Medan So Confusing?',
    about_problem_desc: 'Medan has 118 angkot routes with 15+ different operators. There\'s no official route map, no complete app. If you\'re new to Medan, you\'re probably wondering: which angkot do I take? where do I get off? how much does it cost? This website helps you find the right route without having to ask strangers.',
    about_how: 'How to Use',
    about_how1: 'Type Origin & Destination',
    about_how1_desc: 'Enter a place name, stop, or landmark. Auto-suggest helps you find the right name.',
    about_how2: 'See Your Route',
    about_how2_desc: 'The system instantly shows which angkot to take, how many transfers, and where to get off.',
    about_how3: 'Ride the Angkot',
    about_how3_desc: 'Recognize the angkot by its livery color and route number on the vehicle.',
    about_livery: 'Livery Color Guide',
    about_livery_desc: 'Each angkot has a different color based on its operator. Learn the colors so you don\'t board the wrong one.',
    about_data: 'About Data',
    about_data_desc: 'Data for 118 routes collected from angkot commuter communities in Medan. Not official from the transport department, but reliable for daily use.',
    about_back: 'Home',
    tracking_searching: 'Searching location...',
    tracking_monitoring: 'Monitoring movement',
    btn_back: 'Home',
    result_title: 'Routes Found',
    no_result_title: 'No routes found',
    no_result_desc: 'Try using a more common stop or street name near your origin and destination.',
    btn_try_again: 'Try again',
    modal_stops: 'Stops & Waypoints'
  },
  btk: {
    nav_home: 'Boru',
    nav_about: 'Angka na',
    hero_location: 'Kota Medan, Sumatera Utara',
    hero_title: 'Parmodal di Medan? Numpak Angkot Ro',
    hero_subtitle: 'Molo parmodal ho medan, sonang au numpak angkot na? Tulis asal ma tujunmu, langsung mantap rute na. Gratis, sonang mitanyaon orang.',
    search_title: 'Hiligar Rute Angkot',
    label_origin: 'Asalma?',
    label_dest: 'Mau donganna?',
    placeholder_origin: 'Contoh: Bandara, Sun Plaza...',
    placeholder_dest: 'Contoh: USU, RS Adam Malik, Istana Maimun...',
    btn_search: 'Hiligar Rute',
    btn_my_location: 'Lokasiku',
    btn_track: 'Tangiang Rute',
    btn_stop_track: 'Padan',
    btn_follow: 'Ikut',
    route_direct: 'Rute Langsung — Ala Pindah',
    route_transfer: 'Pindah 1 Kali',
    route_multi: 'Pindah Banyak Kali',
    route_no_result: 'Rute ala kape — coba halte laen',
    transfer_marker: 'Turun Akka & Pindah Angkot',
    transfer_at: 'Pindah angkot akka',
    stops: 'halte',
    explore_title: 'Kabeh Trayek Angkot',
    explorer_desc: 'Liat kabeh 118 trayek angkot di Medan.',
    explorer_search: 'Hiligar nomor trayek...',
    about_title: 'Angka Angkot Medan Finder',
    popular_title: 'Rute Populer',
    about_problem: 'Aha Na Angkot di Medan Ari Bingung?',
    about_problem_desc: 'Medan dang punya 118 trayek angkot, tapi ala ada peta rute resmi. Molo parmodal ho medan, pasti bingung: numpak angkot na? turun di mana? Website ini bantu ho temukan rute na.',
    about_how: 'Cara Pakai',
    about_how1: 'Tulis Asal ma Tujun',
    about_how1_desc: 'Tulis nama tempat atau halte. Auto-suggest bantu ho nemu.',
    about_how2: 'Liat Rute',
    about_how2_desc: 'Sistem langsung kasih tahu angkot na, pindah berapa kali, turun di mana.',
    about_how3: 'Numpak Angkot',
    about_how3_desc: 'Kenali angkot dari warna livery ma nomor trayek.',
    about_livery: 'Panduan Warna Livery',
    about_livery_desc: 'Warna livery nunjukkan operator angkot na.',
    about_data: 'Angka Data',
    about_data_desc: 'Data 118 trayek dikumpulkan dari komunitas angkot Medan.',
    about_back: 'Boru',
    tracking_searching: 'Mangalilu lokasi...',
    tracking_monitoring: 'Mamantau gerak',
    btn_back: 'Boru',
    result_title: 'Rute Kappe',
    no_result_title: 'Ala rute kappe',
    no_result_desc: 'Coba pakai nama halte laen.',
    btn_try_again: 'Coba arang',
    modal_stops: 'Daftar Halte'
  },
  jv: {
    nav_home: 'Omah',
    nav_about: 'Babagan',
    hero_location: 'Kutha Medan, Sumatera Lor',
    hero_title: 'Anyar tekan Medan? Numpak Angkot Wae',
    hero_subtitle: 'Tekan Medan durung ngerti numpak angkot apa? Tulis asal lan tujuan, langsung weruh rute sing bener. Gratis, ora perlu takon wong.',
    search_title: 'Golek Rute Angkot',
    label_origin: 'Saka endi?',
    label_dest: 'Menyang endi?',
    placeholder_origin: 'Conto: Bandara, Sun Plaza...',
    placeholder_dest: 'Conto: USU, RS Adam Malik, Istana Maimun...',
    btn_search: 'Golek Rute',
    btn_my_location: 'Lokasiku',
    btn_track: 'Pantau Rute',
    btn_stop_track: 'Mandeg',
    btn_follow: 'Turu',
    route_direct: 'Rute Langsung',
    route_transfer: 'Butuh 1x Pindah',
    route_multi: 'Pindah Pirang-pirang',
    route_no_result: 'Rute ora ketemu',
    transfer_marker: 'Turun & Ganti Angkot',
    transfer_at: 'Ganti angkot ing kene',
    stops: 'halte',
    explore_title: 'Kabeh Trayek Angkot',
    explorer_desc: 'Jelajahi kabeh 118 trayek angkot ing Medan.',
    explorer_search: 'Golek trayek utawa operator...',
    about_title: 'Babagan Angkot Medan Finder',
    popular_title: 'Rute Populer',
    about_problem: 'Kenapa Angkot ing Medan Kebingungan?',
    about_problem_desc: 'Medan duwe 118 trayek angkot. Ora ana peta resmi. Yen anyar tekan Medan, pasti bingung: numpak angkot apa? turun ngendi? Situs iki mbantu golek rute sing bener.',
    about_how: 'Carane Kerja',
    about_how1: 'Ketik Asal & Tujuan',
    about_how1_desc: 'Ketik jeneng panggonan utawa halte.',
    about_how2: 'Deleng Rute',
    about_how2_desc: 'Sistem ngetokake pilihan rute.',
    about_how3: 'Numpak Angkot',
    about_how3_desc: 'Kenali warna angkot.',
    about_livery: 'Panduan Warna Livery',
    about_livery_desc: 'Warna nuduhake operator.',
    about_data: 'Babagan Data',
    about_data_desc: 'Data dikumpulake saka komunitas angkot Medan.',
    about_back: 'Omah',
    tracking_searching: 'Nggoleki lokasi...',
    tracking_monitoring: 'Ngawasi gerakan',
    btn_back: 'Omah',
    result_title: 'Rute Ketemu',
    no_result_title: 'Ora ana rute',
    no_result_desc: 'Coba nganggo jeneng liyane.',
    btn_try_again: 'Coba maneh',
    modal_stops: 'Daftar Halte'
  },
  ms: {
    nav_home: 'Utama',
    nav_about: 'Tentang',
    hero_location: 'Kota Medan, Sumatera Utara, Indonesia',
    hero_title: 'Baru di Medan? Naik Angkot Saja',
    hero_subtitle: 'Baru sampai di Medan dan tak tahu naik angkot apa? Taip asal & destinasi, terus tahu rute yang betul. Percuma, tak perlu tanya sesiapa.',
    search_title: 'Cari Rute Angkot',
    label_origin: 'Dari mana?',
    label_dest: 'Ke mana?',
    placeholder_origin: 'cth: Lapangan Terbang, Stesen, Sun Plaza...',
    placeholder_dest: 'cth: USU, Hospital Adam Malik, Istana Maimun...',
    btn_search: 'Cari Rute',
    btn_my_location: 'Lokasi saya',
    btn_track: 'Jejak Rute Ini',
    btn_stop_track: 'Berhenti',
    btn_follow: 'Ikut',
    route_direct: 'Rute Langsung — Tanpa Tukar',
    route_transfer: 'Perlu 1 Kali Tukar',
    route_multi: 'Perlu Beberapa Kali Tukar',
    route_no_result: 'Rute tak dijumpai',
    transfer_marker: 'Turun Sini & Tukar Angkot',
    transfer_at: 'Tukar ke angkot lain di sini',
    stops: 'hentian',
    explore_title: 'Semua Trayek Angkot',
    explorer_desc: 'Jelajah semua 118 trayek angkot di Medan.',
    explorer_search: 'Cari nombor trayek...',
    about_title: 'Tentang Angkot Medan Finder',
    popular_title: 'Rute Popular',
    about_problem: 'Kenapa Sukar Naik Angkot di Medan?',
    about_problem_desc: 'Medan ada 118 trayek angkot. Tak ada peta rasmi. Kalau baru ke Medan, mesti keliru: naik angkot mana? turun mana? Laman ini bantu cari rute yang betul.',
    about_how: 'Cara Guna',
    about_how1: 'Taip Asal & Destinasi',
    about_how1_desc: 'Taip nama tempat atau hentian.',
    about_how2: 'Lihat Rute',
    about_how2_desc: 'Sistem terus bagitahu angkot mana.',
    about_how3: 'Naik Angkot',
    about_how3_desc: 'Kenal warna livery angkot.',
    about_livery: 'Panduan Warna Livery',
    about_livery_desc: 'Warna livery tunjukkan operator.',
    about_data: 'Tentang Data',
    about_data_desc: 'Data dikumpul dari komunitas angkot Medan.',
    about_back: 'Utama',
    tracking_searching: 'Mencari lokasi...',
    tracking_monitoring: 'Memantau pergerakan',
    btn_back: 'Utama',
    result_title: 'Rute Dijumpai',
    no_result_title: 'Rute tak dijumpai',
    no_result_desc: 'Cuba nama lain.',
    btn_try_again: 'Cuba lagi',
    modal_stops: 'Senarai Hentian'
  },
  min: {
    nav_home: 'Baituo',
    nav_about: 'Tentang',
    hero_location: 'Kota Medan, Sumatera Barat',
    hero_title: 'Baruah ka Medan? Naik Angkot Jo',
    hero_subtitle: 'Baruah ka Medan ka bingung angkot apa nan dinaiki? Tulis asal jo tujuan, langsung tuo rute nan bana. Gratis, taraso tagadang maraso orang.',
    search_title: 'Cariak Rute Angkot',
    label_origin: 'Dari mano?',
    label_dest: 'Mau ka mano?',
    placeholder_origin: 'Contoh: Bandara, Sun Plaza...',
    placeholder_dest: 'Contoh: USU, RS Adam Malik...',
    btn_search: 'Cariak Rute',
    btn_my_location: 'Lokasiku',
    btn_track: 'Pantau Rute',
    btn_stop_track: 'Mancantiang',
    btn_follow: 'Ikuti',
    route_direct: 'Rute Langsung — Tanpa Pindah',
    route_transfer: 'Pindah 1 Kali',
    route_multi: 'Pindah Banyak Kali',
    route_no_result: 'Rute taraso ado',
    transfer_marker: 'Turun Siko & Pindah Angkot',
    transfer_at: 'Pindah angkot lain di siko',
    stops: 'halte',
    explore_title: 'Semua Trayek Angkot',
    explorer_desc: 'Liai semua 118 trayek angkot ka Medan.',
    explorer_search: 'Cariak nomor trayek...',
    about_title: 'Tentang Angkot Medan Finder',
    popular_title: 'Rute Populer',
    about_problem: 'Ado Apo Angkot ka Medan Bingung?',
    about_problem_desc: 'Medan ado 118 trayek angkot. Taraso ado peta resmi. Kalau baruah ka Medan, bingung: naik angkot apo? turun mano? Website ini bantu cariak rute nan bana.',
    about_how: 'Cara Pakai',
    about_how1: 'Tulis Asal jo Tujuan',
    about_how1_desc: 'Tulis namo tempat atau halte.',
    about_how2: 'Liai Rute',
    about_how2_desc: 'Sistem langsung kasih tuo angkot nan apo.',
    about_how3: 'Naik Angkot',
    about_how3_desc: 'Kanali angkot dari warna livery.',
    about_livery: 'Panduan Warna Livery',
    about_livery_desc: 'Warna livery nunjuangkan operator.',
    about_data: 'Tentang Data',
    about_data_desc: 'Data dikumpuik dari komunitas angkot Medan.',
    about_back: 'Baituo',
    tracking_searching: 'Mancariak lokasi...',
    tracking_monitoring: 'Mamantau gerak',
    btn_back: 'Baituo',
    result_title: 'Rute Ado',
    no_result_title: 'Rute taraso ado',
    no_result_desc: 'Cobaak namo lain.',
    btn_try_again: 'Cobaak dek',
    modal_stops: 'Daftar Halte'
  },
  su: {
    nav_home: 'Imah',
    nav_about: 'Ngeunaan',
    hero_location: 'Kota Medan, Sumatera Utara',
    hero_title: 'Anyar ka Medan? Naik Angkot Wae',
    hero_subtitle: 'Anyar ka Medan teu nyaho naon angkot nu kedah dinaiki? Eusian asal jeung tujuan, langsung terang rute nu leres. Gratis, teu kudu nanya ka jalma.',
    search_title: 'Milarian Rute Angkot',
    label_origin: 'Ti mana?',
    label_dest: 'Ka mana?',
    placeholder_origin: 'Contoh: Bandara, Sun Plaza...',
    placeholder_dest: 'Contoh: USU, RS Adam Malik...',
    btn_search: 'Milarian Rute',
    btn_my_location: 'Lokasi abdi',
    btn_track: 'Pantau Rute',
    btn_stop_track: 'Eureun',
    btn_follow: 'Nutut',
    route_direct: 'Rute Langsung — Teu Pindah',
    route_transfer: 'Pindah 1 Kali',
    route_multi: 'Pindah Loba Kali',
    route_no_result: 'Rute teu kapanggih',
    transfer_marker: 'Turun Di dieu & Pindah Angkot',
    transfer_at: 'Pindah ka angkot lain di dieu',
    stops: 'halte',
    explore_title: 'Sadaya Trayek Angkot',
    explorer_desc: 'Jalajah sadaya 118 trayek angkot di Medan.',
    explorer_search: 'Milarian nomor trayek...',
    about_title: 'Ngeunaan Angkot Medan Finder',
    popular_title: 'Rute Populer',
    about_problem: 'Naha Angkot di Medan Sesepuh?',
    about_problem_desc: 'Medan boga 118 trayek angkot. Teu aya peta resmi. Mun anyar ka Medan, pasti sesepuh: naon angkot nu kedah dinaiki? Turun di mana? Laman ieu ngabantuan milari rute nu leres.',
    about_how: 'Cara Ngunakkeun',
    about_how1: 'Eusian Asal jeung Tujuan',
    about_how1_desc: 'Eusian ngaran tempat atawa halte.',
    about_how2: 'Tingali Rute',
    about_how2_desc: 'Sistem langsung nunjukkeun angkot nu kuduna.',
    about_how3: 'Naik Angkot',
    about_how3_desc: 'Kenali angkot ti warna livery.',
    about_livery: 'Panduan Warna Livery',
    about_livery_desc: 'Warna livery nunjukkeun operator.',
    about_data: 'Ngeunaan Data',
    about_data_desc: 'Data dikumpulkeun ti komunitas angkot Medan.',
    about_back: 'Imah',
    tracking_searching: 'Milarian lokasi...',
    tracking_monitoring: 'Pantau gerak',
    btn_back: 'Imah',
    result_title: 'Rute Kapanggih',
    no_result_title: 'Teu aya rute',
    no_result_desc: 'Coba ngagunakeun ngaran sanés.',
    btn_try_again: 'Coba deui',
    modal_stops: 'Daptar Halte'
  },
  ace: {
    nav_home: 'U Keu Rumoh',
    nav_about: 'Tentang',
    hero_location: 'Kota Medan, Sumatera Utara',
    hero_title: 'Baro Meugang di Medan? Naik Angkot Mantong',
    hero_subtitle: 'Baro datang ke Medan teu manyangka naik angkot naon? Tulis asal dan tujuan, lheuhna teu trouh ruteu nan jjé. Gratis, teu perlu manyangsa that peuhaba.',
    search_title: 'Ucap Rute Angkot',
    label_origin: 'Keu eman?',
    label_dest: 'Mantong keu?',
    placeholder_origin: 'Contoh: Bandara, Sun Plaza...',
    placeholder_dest: 'Contoh: USU, RS Adam Malik...',
    btn_search: 'Ucap Rute',
    btn_my_location: 'Lokasi ku',
    btn_track: 'Jejak Rute',
    btn_stop_track: 'Teupueh',
    btn_follow: 'Ikot',
    route_direct: 'Ruteu Langsung — Tanpa Pindah',
    route_transfer: 'Pindah 1 Kali',
    route_multi: 'Pindah Banyak Kali',
    route_no_result: 'Ruteu teu ka limput',
    transfer_marker: 'Turun Di Neu & Pindah Angkot',
    transfer_at: 'Pindah angkot laen di neu',
    stops: 'halte',
    explore_title: 'Semua Trayek Angkot',
    explorer_desc: 'Lihat semuo 118 trayek angkot di Medan.',
    explorer_search: 'Ucap nomor trayek...',
    about_title: 'Tentang Angkot Medan Finder',
    popular_title: 'Rute Populer',
    about_problem: 'Hana Pajoh Naik Angkot di Medan?',
    about_problem_desc: 'Medan ada 118 trayek angkot. Teu ada peta resmi. Kunyo baro datang ke Medan, pasti bingong: naik angkot naon? turun di mana? Web sai mimbanh ureueng lheuh ruteu nan tepat.',
    about_how: 'Carong Ngunue',
    about_how1: 'Tulis Asal dan Tujuan',
    about_how1_desc: 'Tulis nyo tempat atau halte.',
    about_how2: 'Lihat Rute',
    about_how2_desc: 'Sistem lon nyoe tanyong angkot naon.',
    about_how3: 'Naik Angkot',
    about_how3_desc: 'Kenali angkot dari warna livery.',
    about_livery: 'Panduan Warna Livery',
    about_livery_desc: 'Warna livery nyoe tanyong operator.',
    about_data: 'Tentang Data',
    about_data_desc: 'Data dikumpul dari komunitas angkot Medan.',
    about_back: 'U Keu Rumoh',
    tracking_searching: 'Mungkhuen lokasi...',
    tracking_monitoring: 'Mantong gerak',
    btn_back: 'U Keu Rumoh',
    result_title: 'Ruteu Ka Limput',
    no_result_title: 'Teu ada ruteu',
    no_result_desc: 'Ucup nyo laen.',
    btn_try_again: 'Ucup balik',
    modal_stops: 'Daftar Halte'
  }
};

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const trans = I18N[lang] || I18N.id;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (trans[key]) {
      el.textContent = trans[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (trans[key]) {
      el.placeholder = trans[key];
    }
  });

  const langLabel = document.getElementById('lang-label');
  if (langLabel) langLabel.textContent = lang.toUpperCase();
}

// ===== DATA =====
// Trayek dan halte diambil dari server saat halaman dibuka. Pencarian rute sendiri
// dikerjakan server (/api/navigate); data ini dipakai untuk daftar trayek dan peta.
let ANGKOT_ROUTES = [];
let STOP_COORDS = {};
let ALL_STOPS = [];
let POPULAR_ROUTES = [];

async function loadData() {
  const res = await fetch("/api/data");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  ANGKOT_ROUTES = data.routes;
  STOP_COORDS = data.stops;
  ALL_STOPS = Object.keys(data.stops);
  POPULAR_ROUTES = data.popular;
}

function normalize(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function getStopCoords(stopName) {
  return STOP_COORDS[stopName] || null;
}

function getLiveryColor(warna) {
  return LIVERY_COLORS[warna] || LIVERY_COLORS["-"];
}

let osrmCache = {};
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving/";

async function fetchRoadSegment(from, to) {
  const key = `${from[0]},${from[1]}->${to[0]},${to[1]}`;
  if (osrmCache[key]) return osrmCache[key];
  try {
    const url = `${OSRM_URL}${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
    const resp = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const data = await resp.json();
    if (data.code === "Ok" && data.routes && data.routes[0]) {
      const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
      osrmCache[key] = coords;
      return coords;
    }
  } catch (e) {}
  osrmCache[key] = [from, to];
  return [from, to];
}

async function fetchRoadGeometry(coords) {
  if (coords.length < 2) return coords;
  if (coords.length === 2) return fetchRoadSegment(coords[0], coords[1]);

  const segments = [];
  for (let i = 0; i < coords.length - 1; i++) {
    segments.push(fetchRoadSegment(coords[i], coords[i + 1]));
  }
  const results = await Promise.all(segments);
  const merged = [results[0][0]];
  for (const seg of results) {
    for (let j = 1; j < seg.length; j++) {
      const last = merged[merged.length - 1];
      if (seg[j][0] !== last[0] || seg[j][1] !== last[1]) {
        merged.push(seg[j]);
      }
    }
  }
  return merged;
}

async function upgradeToRoadGeometry(map, straightLine, coords) {
  try {
    const roadCoords = await fetchRoadGeometry(coords);
    if (roadCoords.length > 2) {
      straightLine.setLatLngs(roadCoords);
    }
  } catch (e) {}
}

let currentView = "home";
let previousView = "home";
let searchResults = null;

function switchView(view) {
  if (view === "tracking") previousView = currentView;
  currentView = view;
  document.querySelectorAll("[data-view]").forEach(el => {
    const isActive = el.dataset.view === view;
    el.classList.toggle("hidden", !isActive);
  });
  window.scrollTo({ top: 0 });
  if (view === "tracking" && typeof trackingMap !== 'undefined' && trackingMap) {
    setTimeout(() => trackingMap.invalidateSize(), 200);
  }
}

// Titik yang dipilih dari saran atau GPS disimpan di input tersembunyi sebagai JSON {name, lat, lng}.
// Kalau kosong, teks yang diketik dikirim apa adanya dan server yang mencocokkannya.
function readPoint(inputEl, hiddenEl, prefix, params) {
  let picked = null;
  try { picked = hiddenEl.value ? JSON.parse(hiddenEl.value) : null; } catch { picked = null; }
  if (picked && Number.isFinite(picked.lat) && Number.isFinite(picked.lng)) {
    params.set(`${prefix}_lat`, picked.lat);
    params.set(`${prefix}_lng`, picked.lng);
    params.set(`${prefix}_name`, picked.name || inputEl.value.trim());
  } else {
    params.set(prefix, inputEl.value.trim());
  }
}

function setPoint(inputEl, hiddenEl, point) {
  inputEl.value = point.name;
  hiddenEl.value = JSON.stringify({ name: point.name, lat: point.lat, lng: point.lng });
}

function showSearchError(message) {
  const errEl = document.getElementById("search-error");
  if (!errEl) return;
  errEl.textContent = message;
  errEl.classList.toggle("hidden", !message);
}

async function performSearch() {
  const originInput = document.getElementById("origin-input");
  const destInput = document.getElementById("dest-input");
  if (!originInput.value.trim() || !destInput.value.trim()) {
    showSearchError("Isi dulu tempat asal dan tujuannya, lek.");
    return;
  }
  showSearchError("");

  const params = new URLSearchParams();
  readPoint(originInput, document.getElementById("origin-resolved"), "from", params);
  readPoint(destInput, document.getElementById("dest-resolved"), "to", params);

  showLoading(originInput.value.trim(), destInput.value.trim());
  try {
    const res = await fetch(`/api/navigate?${params}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    searchResults = await res.json();
  } catch {
    hideLoading();
    showSearchError("Server tidak bisa dihubungi. Periksa koneksi internet, lalu cari lagi.");
    return;
  }
  hideLoading();

  // Tempat yang tidak dikenali ditangani di form, supaya pengguna bisa langsung membetulkan ketikannya.
  if (searchResults.reason === "unknown_origin" || searchResults.reason === "unknown_destination") {
    const which = searchResults.reason === "unknown_origin" ? "asal" : "tujuan";
    showSearchError(`Tempat ${which} "${searchResults.text}" tidak dikenali. Ketik ulang, lalu pilih salah satu saran yang muncul.`);
    return;
  }
  renderResults();
  switchView("result");
}

function showLoading(origin, dest) {
  const overlay = document.getElementById("loading-overlay");
  const oEl = document.getElementById("loading-origin");
  const dEl = document.getElementById("loading-dest");
  if (oEl) oEl.textContent = origin;
  if (dEl) dEl.textContent = dest;
  if (overlay) overlay.classList.remove("hidden");
}

function hideLoading() {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) overlay.classList.add("hidden");
}

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

function formatMeters(m) {
  return m >= 1000 ? `${(m / 1000).toFixed(1).replace(".", ",")} km` : `${Math.round(m / 10) * 10} m`;
}

function formatMinutes(min) {
  if (min < 60) return `${min} mnt`;
  const h = Math.floor(min / 60), m = min % 60;
  return m ? `${h} jam ${m} mnt` : `${h} jam`;
}

// Pesan saat tidak ada rute: apa yang terjadi dan apa yang bisa dilakukan.
function emptyResultMessage(result) {
  const from = escapeHtml(result.from.name), to = escapeHtml(result.to.name);
  if (result.reason === "walk") {
    return {
      title: "Jalan kaki saja",
      body: `<strong>${from}</strong> dan <strong>${to}</strong> hanya berjarak sekitar ${formatMeters(result.meters)}, kira-kira ${result.minutes} menit jalan kaki. Tidak perlu naik angkot.`,
    };
  }
  if (result.reason === "no_stop_near_origin" || result.reason === "no_stop_near_destination") {
    const place = result.reason === "no_stop_near_origin" ? from : to;
    const near = result.nearest;
    return {
      title: "Tidak ada halte angkot di dekat situ",
      body: `Dalam jarak 1 km dari <strong>${place}</strong> tidak ada halte yang tercatat. Halte terdekat adalah <strong>${escapeHtml(near.name)}</strong>, sekitar ${formatMeters(near.meters)} dari sana. Coba cari dari halte itu.`,
    };
  }
  return {
    icon: "search-x",
    title: "Belum ada rangkaian angkot ke sana",
    body: `Dari <strong>${from}</strong> ke <strong>${to}</strong> tidak ketemu rute dengan paling banyak dua kali pindah angkot. Coba pilih halte lain di dekat asal atau tujuan.`,
  };
}

function renderResults() {
  const container = document.getElementById("results-container");
  if (!container) return;
  if (!searchResults) { container.innerHTML = ""; return; }

  const { from, to, itineraries } = searchResults;
  let html = `
    <div>
      <h1>${escapeHtml(from.name)} ke ${escapeHtml(to.name)}</h1>
      <p class="note">${itineraries.length > 0 ? `${itineraries.length} pilihan rute, yang tercepat di atas.` : "Tidak ada rute angkot untuk perjalanan ini."}</p>
    </div>`;

  if (itineraries.length === 0) {
    const msg = emptyResultMessage(searchResults);
    html += `
      <div class="empty">
        <h2>${msg.title}</h2>
        <p>${msg.body}</p>
        <button type="button" class="btn" onclick="switchView('home')">Cari rute lain</button>
      </div>`;
  } else {
    html += itineraries.map((it, i) => renderItinerary(it, i)).join("");
    html += `<p class="note">Waktu dan jarak adalah perkiraan dari posisi halte, bukan dari kondisi lalu lintas. Angkot tidak punya jadwal tetap, jadi waktu tunggu bisa lebih lama.</p>`;
  }

  container.innerHTML = html;
  lucide.createIcons();

  // Peta dibuat saat kartunya dibuka, supaya pilihan yang tidak dilihat tidak ikut memuat peta.
  container.querySelectorAll("details.trip").forEach(card => {
    const showMap = () => {
      const el = card.querySelector(".trip-map");
      if (!card.open || el.dataset.ready) return;
      el.dataset.ready = "1";
      renderItineraryMap(el, itineraries[Number(card.dataset.index)]);
    };
    card.addEventListener("toggle", showMap);
    showMap();
  });
}

// Pelat nomor angkot dengan warna badannya: cara orang Medan mengenali angkot di jalan.
// Angkot dua warna digambar terbelah miring.
function platHtml(route, size = "md") {
  const livery = getLiveryColor(route.warna);
  const fill = livery.hex2
    ? `linear-gradient(115deg, ${livery.hex} 0 70%, ${livery.hex2} 70% 100%)`
    : livery.hex;
  return `<span class="plat${size === "lg" ? " plat-lg" : ""}" style="background:${fill};color:${livery.ink}">${escapeHtml(route.nomor)}</span>`;
}

function renderItinerary(it, index) {
  const rides = it.legs.filter(l => l.type === "ride");
  const transferLabel = it.transfers === 0 ? "Langsung, tanpa pindah" : `${it.transfers} kali pindah angkot`;
  const plates = rides.map(l => platHtml(l.route, "lg")).join(`<i data-lucide="chevron-right"></i>`);

  const steps = it.legs.map((leg, i) => {
    if (leg.type === "walk") {
      const isLast = i === it.legs.length - 1;
      const target = isLast ? `ke tujuan, <b>${escapeHtml(leg.to.name)}</b>` : `ke halte <b>${escapeHtml(leg.to.name)}</b>`;
      return `
        <li class="step step-walk">
          <span class="step-mark"><i data-lucide="footprints"></i></span>
          Jalan kaki sekitar <b>${formatMeters(leg.meters)}</b> ${target}.
          <small>Kira-kira ${leg.minutes} menit</small>
        </li>`;
    }

    const livery = getLiveryColor(leg.route.warna);
    const isTransfer = rides.indexOf(leg) > 0;
    const passed = leg.stops.slice(1, -1);
    const passedHtml = passed.length === 0 ? "" : `
          <details>
            <summary>Lewat ${passed.length} halte</summary>
            <ol>${passed.map(s => `<li>${escapeHtml(s.name)}</li>`).join("")}</ol>
          </details>`;
    return `
        <li class="step">
          <span class="step-mark"><i data-lucide="bus-front"></i></span>
          <span class="step-label">${isTransfer ? "Pindah angkot di" : "Naik di"} ${escapeHtml(leg.board.name)}</span>
          <div class="step-ride">${platHtml(leg.route)}<span>Angkot <b>${escapeHtml(leg.route.nomor)}</b> warna ${escapeHtml(livery.label).toLowerCase()}, arah <b>${escapeHtml(leg.towards)}</b></span></div>
          Turun di <b>${escapeHtml(leg.alight.name)}</b>, ${leg.stopCount === 1 ? "halte berikutnya" : `halte ke-${leg.stopCount} setelah naik`}.
          <small>${escapeHtml(leg.route.operator)}, sekitar ${formatMeters(leg.km * 1000)}, kira-kira ${formatMinutes(leg.minutes)}</small>${passedHtml}
        </li>`;
  }).join("");

  // Pilihan tercepat langsung terbuka. Pilihan lain cukup ringkasannya; langkah dan petanya dibuka kalau diketuk.
  return `
    <details class="trip" data-index="${index}" ${index === 0 ? "open" : ""}>
      <summary>
        <div class="trip-plates">${plates}</div>
        <div class="trip-time">± ${formatMinutes(it.minutes)}</div>
        <div class="trip-meta">
          <span>${index === 0 ? `<span class="best">Paling cepat.</span> ` : ""}${transferLabel}${it.walkMeters > 0 ? `, jalan kaki ${formatMeters(it.walkMeters)}` : ""}</span>
          <span class="trip-toggle"></span>
        </div>
      </summary>
      <div class="trip-body">
        <div class="trip-map" data-index="${index}"></div>
        <ol class="steps">
          ${steps}
          <li class="step step-end">
            <span class="step-mark"><i data-lucide="flag"></i></span>
            <b>Sampai di ${escapeHtml(searchResults.to.name)}</b>
          </li>
        </ol>
        <div class="trip-actions">
          <button type="button" class="btn track-route-btn" data-index="${index}"><i data-lucide="navigation"></i>Pantau posisi saya di rute ini</button>
        </div>
      </div>
    </details>`;
}

// ===== PETA =====
// Ubin OpenStreetMap. Atribusi wajib tampil sesuai ketentuan pemakaian OSM.
function baseTiles() {
  return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
}

// Gambar satu rute di peta: garis putus-putus untuk jalan kaki, garis tebal berwarna angkot untuk tiap angkot.
const INK = "#14202b";
const STOP_RED = "#c8372d";

function drawItinerary(map, it) {
  const bounds = [];
  it.legs.forEach(leg => {
    if (leg.type === "walk") {
      const coords = [leg.from.coord, leg.to.coord];
      L.polyline(coords, { color: INK, weight: 3, opacity: 0.7, dashArray: "2 8" }).addTo(map);
      bounds.push(...coords);
      return;
    }
    const coords = leg.stops.map(s => s.coord);
    const livery = getLiveryColor(leg.route.warna);
    const outline = L.polyline(coords, { color: INK, weight: 8, opacity: 0.9 }).addTo(map);
    const line = L.polyline(coords, { color: livery.hex, weight: 4, opacity: 1 }).addTo(map);
    // Garis lurus antarhalte diganti garis yang mengikuti jalan begitu OSRM menjawab.
    fetchRoadGeometry(coords).then(road => {
      if (road.length > 2) { outline.setLatLngs(road); line.setLatLngs(road); }
    }).catch(() => {});
    L.circleMarker(leg.board.coord, { radius: 6, fillColor: "#ffffff", color: INK, weight: 2, fillOpacity: 1 })
      .bindTooltip(`Naik ${leg.route.nomor}: ${leg.board.name}`).addTo(map);
    L.circleMarker(leg.alight.coord, { radius: 6, fillColor: "#ffffff", color: INK, weight: 2, fillOpacity: 1 })
      .bindTooltip(`Turun: ${leg.alight.name}`).addTo(map);
    bounds.push(...coords);
  });
  const start = bounds[0], end = bounds[bounds.length - 1];
  L.circleMarker(start, { radius: 8, fillColor: "#ffffff", color: INK, weight: 2, fillOpacity: 1 }).bindTooltip("Asal").addTo(map);
  L.circleMarker(end, { radius: 8, fillColor: STOP_RED, color: INK, weight: 2, fillOpacity: 1 }).bindTooltip("Tujuan").addTo(map);
  return L.latLngBounds(bounds);
}

function renderItineraryMap(el, it) {
  const map = L.map(el, { zoomControl: true, attributionControl: true, scrollWheelZoom: false });
  baseTiles().addTo(map);
  const bounds = drawItinerary(map, it);
  map.fitBounds(bounds, { padding: [30, 30] });
  // Peta dibuat saat tampilan hasil masih tersembunyi, jadi ukuran dan batasnya dihitung ulang setelah tampil.
  setTimeout(() => {
    map.invalidateSize();
    map.fitBounds(bounds, { padding: [30, 30] });
  }, 300);
}

function renderPopularRoutes() {
  const container = document.getElementById("popular-routes");
  if (!container) return;

  container.innerHTML = POPULAR_ROUTES.map(r => `
    <button type="button" class="popular-btn" data-from="${escapeHtml(r.from)}" data-to="${escapeHtml(r.to)}">
      <b>${escapeHtml(r.from)}</b><span>ke</span><b>${escapeHtml(r.to)}</b>
    </button>
  `).join("");

  container.querySelectorAll(".popular-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("origin-input").value = btn.dataset.from;
      document.getElementById("dest-input").value = btn.dataset.to;
      document.getElementById("origin-resolved").value = "";
      document.getElementById("dest-resolved").value = "";
      performSearch();
    });
  });
}

// Saran saat mengetik: halte angkot dan tempat umum (mal, kampus, rumah sakit) dari server.
function setupSuggestions(inputEl, hiddenEl, listEl) {
  if (!inputEl) return;
  let timer = null;
  let lastQuery = "";

  const close = () => listEl.classList.add("hidden");

  inputEl.addEventListener("input", () => {
    const val = inputEl.value.trim();
    hiddenEl.value = "";
    clearTimeout(timer);
    if (val.length < 2) { close(); return; }

    timer = setTimeout(async () => {
      lastQuery = val;
      let places = [];
      try {
        const res = await fetch(`/api/places?q=${encodeURIComponent(val)}`);
        if (res.ok) places = await res.json();
      } catch { /* tanpa saran, teks tetap bisa dicari */ }
      // Jawaban untuk ketikan lama diabaikan.
      if (lastQuery !== inputEl.value.trim()) return;
      if (places.length === 0) { close(); return; }

      listEl.innerHTML = places.map((p, i) => `
        <button type="button" class="sugg-item" data-index="${i}">
          <i data-lucide="${p.type === "halte" ? "bus-front" : "map-pin"}"></i>
          <span><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.detail)}</small></span>
        </button>
      `).join("");
      listEl.classList.remove("hidden");
      lucide.createIcons({ nodes: listEl.querySelectorAll("[data-lucide]") });

      listEl.querySelectorAll(".sugg-item").forEach(item => {
        // mousedown, bukan click: input kehilangan fokus lebih dulu dan daftar keburu tertutup.
        item.addEventListener("mousedown", (e) => {
          e.preventDefault();
          setPoint(inputEl, hiddenEl, places[Number(item.dataset.index)]);
          close();
        });
      });
    }, 220);
  });

  inputEl.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  document.addEventListener("click", (e) => {
    if (!inputEl.contains(e.target) && !listEl.contains(e.target)) close();
  });
}

// ===== EXPLORER GRID & MODAL (untuk semua-trayek.html) =====
let explorerFilter = "";
let explorerPage = 1;
const EXPLORER_PAGE_SIZE = 12;
let modalMap = null;

function filterRoutes(query) {
  if (typeof ANGKOT_ROUTES === 'undefined') return [];
  return ANGKOT_ROUTES.filter(r => {
    const matchQuery = !query || normalize(`${r.nomor} ${r.operator} ${r.asal} ${r.tujuan} ${r.waypoints.join(" ")}`).includes(normalize(query));
    const matchFilter = !explorerFilter || r.warna.toLowerCase().includes(explorerFilter.toLowerCase());
    return matchQuery && matchFilter;
  });
}

function renderRouteExplorer() {
  const container = document.getElementById("explorer-grid");
  const countEl = document.getElementById("explorer-count");
  if (!container) return;

  const filtered = filterRoutes(document.getElementById("explorer-search")?.value || "");
  const totalPages = Math.ceil(filtered.length / EXPLORER_PAGE_SIZE);
  explorerPage = Math.min(explorerPage, Math.max(1, totalPages));
  const pageRoutes = filtered.slice((explorerPage - 1) * EXPLORER_PAGE_SIZE, explorerPage * EXPLORER_PAGE_SIZE);

  if (countEl) {
    countEl.textContent = filtered.length === 0
      ? "Tidak ada trayek yang cocok. Coba nomor atau nama operator lain."
      : `${filtered.length} trayek`;
  }

  container.innerHTML = pageRoutes.map(r => `
    <button type="button" class="route-row" data-route-id="${escapeHtml(r.id)}">
      ${platHtml(r, "lg")}
      <b>${escapeHtml(r.asal)} ke ${escapeHtml(r.tujuan)}</b>
      <small>${escapeHtml(r.operator)}, ${r.pp ? "pulang-pergi" : "satu arah"}</small>
      <small class="count">${r.waypoints.length} titik</small>
    </button>
  `).join("");

  container.querySelectorAll(".route-row").forEach(row => {
    row.addEventListener("click", () => {
      const route = ANGKOT_ROUTES.find(r => r.id === row.dataset.routeId);
      if (route) openRouteDetail(route);
    });
  });

  renderExplorerPagination(totalPages);
}

function handleExplorerSearch() {
  explorerPage = 1;
  renderRouteExplorer();
}

function renderExplorerPagination(totalPages) {
  const el = document.getElementById("explorer-pagination");
  if (!el) return;
  if (totalPages <= 1) { el.innerHTML = ""; return; }

  let html = `<button type="button" class="page-btn" data-page="${explorerPage - 1}" ${explorerPage === 1 ? "disabled" : ""}>Sebelumnya</button>`;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= explorerPage - 1 && i <= explorerPage + 1)) {
      html += `<button type="button" class="page-btn" data-page="${i}" ${i === explorerPage ? 'aria-current="page"' : ""}>${i}</button>`;
    } else if (i === explorerPage - 2 || i === explorerPage + 2) {
      html += `<span aria-hidden="true">…</span>`;
    }
  }
  html += `<button type="button" class="page-btn" data-page="${explorerPage + 1}" ${explorerPage === totalPages ? "disabled" : ""}>Berikutnya</button>`;
  el.innerHTML = html;

  el.querySelectorAll(".page-btn:not([disabled])").forEach(btn => {
    btn.addEventListener("click", () => {
      explorerPage = parseInt(btn.dataset.page, 10);
      renderRouteExplorer();
      document.getElementById("route-explorer").scrollIntoView({ block: "start" });
    });
  });
}

function openRouteDetail(route) {
  const modal = document.getElementById("route-detail-modal");
  if (!modal) return;
  const wps = route.waypoints;
  const livery = getLiveryColor(route.warna);

  document.getElementById("modal-route-title").innerHTML = `${platHtml(route, "lg")} ${escapeHtml(route.asal)} ke ${escapeHtml(route.tujuan)}`;
  document.getElementById("modal-stats").textContent =
    `${route.operator}. Warna ${livery.label.toLowerCase()}, ${route.pp ? "pulang-pergi" : "satu arah"}, ${wps.length} titik tercatat.`;
  document.getElementById("modal-stops").innerHTML = wps.map(wp => `<li>${escapeHtml(wp)}</li>`).join("");
  document.getElementById("modal-search-btn").onclick = () => {
    window.location.href = `/?origin=${encodeURIComponent(route.asal)}&dest=${encodeURIComponent(route.tujuan)}`;
  };

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    const mapEl = document.getElementById("modal-map");
    if (modalMap) { modalMap.remove(); modalMap = null; }
    modalMap = L.map(mapEl, { zoomControl: false, attributionControl: true, scrollWheelZoom: false });
    baseTiles().addTo(modalMap);

    const coords = wps.map(wp => getStopCoords(wp)).filter(Boolean);
    if (coords.length >= 2) {
      const outline = L.polyline(coords, { color: INK, weight: 8, opacity: 0.9 }).addTo(modalMap);
      const line = L.polyline(coords, { color: livery.hex, weight: 4 }).addTo(modalMap);
      L.circleMarker(coords[0], { radius: 7, fillColor: "#ffffff", color: INK, weight: 2, fillOpacity: 1 }).addTo(modalMap);
      L.circleMarker(coords[coords.length - 1], { radius: 7, fillColor: STOP_RED, color: INK, weight: 2, fillOpacity: 1 }).addTo(modalMap);
      modalMap.fitBounds(coords, { padding: [30, 30] });
      fetchRoadGeometry(coords).then(road => {
        if (road.length > 2) { outline.setLatLngs(road); line.setLatLngs(road); }
      }).catch(() => {});
    } else {
      modalMap.setView([3.5950, 98.6700], 12);
    }
    setTimeout(() => modalMap.invalidateSize(), 200);
  });
}

function closeRouteDetail() {
  const modal = document.getElementById("route-detail-modal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
  if (modalMap) {
    modalMap.remove();
    modalMap = null;
  }
}

// ===== TRACKING SYSTEM =====
let trackingMap = null;
let trackingWatchId = null;
let trackingUserMarker = null;
let trackingFollowMode = true;

// Pantau posisi sendiri di atas rute yang dipilih, supaya tahu kapan harus turun.
function startTracking(itinerary) {
  switchView("tracking");
  setTimeout(() => initTrackingMap(itinerary), 200);
}

function initTrackingMap(itinerary) {
  const mapEl = document.getElementById("tracking-map");
  if (!mapEl) return;
  if (trackingMap) { trackingMap.remove(); trackingMap = null; }

  trackingMap = L.map(mapEl, { zoomControl: false, attributionControl: true }).setView([3.5950, 98.6700], 13);
  baseTiles().addTo(trackingMap);

  const rides = itinerary.legs.filter(l => l.type === "ride");
  const nameEl = document.getElementById("tracking-route-name");
  const infoEl = document.getElementById("tracking-route-info");
  if (nameEl) nameEl.textContent = rides.map(l => `Angkot ${l.route.nomor}`).join(", lalu ");
  if (infoEl) infoEl.textContent = `Turun terakhir di ${rides[rides.length - 1].alight.name}`;

  trackingMap.fitBounds(drawItinerary(trackingMap, itinerary), { padding: [50, 50] });
  startGPSWatch();
}

function startGPSWatch() {
  if (!navigator.geolocation) {
    const cEl = document.getElementById("tracking-coords");
    if (cEl) cEl.textContent = "GPS tidak didukung";
    return;
  }

  trackingWatchId = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude: lat, longitude: lng, speed } = pos.coords;
      const latlng = [lat, lng];

      if (!trackingUserMarker) {
        const icon = L.divIcon({
          className: 'user-marker',
          html: `<div style="background:#4da2ff;width:20px;height:20px;border:3px solid #000;border-radius:50%;box-shadow:0 0 0 4px rgba(77,162,255,0.3)"></div>`,
          iconSize: [20, 20], iconAnchor: [10, 10]
        });
        trackingUserMarker = L.marker(latlng, { icon }).addTo(trackingMap);
        if (trackingFollowMode) trackingMap.setView(latlng, 15);
      } else {
        trackingUserMarker.setLatLng(latlng);
        if (trackingFollowMode) trackingMap.panTo(latlng);
      }

      const cEl = document.getElementById("tracking-coords");
      const sEl = document.getElementById("tracking-speed");
      if (cEl) cEl.textContent = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      if (sEl) {
        const speedKmh = speed !== null ? (speed * 3.6).toFixed(1) : "0";
        sEl.textContent = speed !== null ? `Kecepatan: ${speedKmh} km/jam` : "Memantau pergerakan";
      }
    },
    (err) => {
      const cEl = document.getElementById("tracking-coords");
      if (cEl) cEl.textContent = "Gagal mendapatkan GPS";
    },
    { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
  );
}

function stopTracking() {
  if (trackingWatchId !== null) {
    navigator.geolocation.clearWatch(trackingWatchId);
    trackingWatchId = null;
  }
  if (trackingMap) { trackingMap.remove(); trackingMap = null; }
  trackingUserMarker = null;
  switchView("home");
}

async function initApp() {
  lucide.createIcons();
  try {
    await loadData();
  } catch {
    showSearchError("Data trayek tidak bisa dimuat. Periksa koneksi internet, lalu muat ulang halaman.");
  }
  document.dispatchEvent(new Event("angkot:data"));
  renderPopularRoutes();

  // Angka di hero diambil dari data, supaya tidak tertinggal saat data berubah.
  const heroStops = document.getElementById("hero-stops-count");
  if (heroStops && ALL_STOPS.length > 0) heroStops.textContent = ALL_STOPS.length;

  applyLang(currentLang);

  const langToggle = document.getElementById('lang-toggle');
  const langDropdown = document.getElementById('lang-dropdown');
  if (langToggle && langDropdown) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('hidden');
    });
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', () => {
        applyLang(btn.dataset.lang);
        langDropdown.classList.add('hidden');
      });
    });
    document.addEventListener('click', () => langDropdown.classList.add('hidden'));
  }

  setupSuggestions(document.getElementById("origin-input"), document.getElementById("origin-resolved"), document.getElementById("origin-suggestions"));
  setupSuggestions(document.getElementById("dest-input"), document.getElementById("dest-resolved"), document.getElementById("dest-suggestions"));

  const searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      performSearch();
    });
  }

  const swapBtn = document.getElementById("swap-btn");
  if (swapBtn) {
    swapBtn.addEventListener("click", () => {
      const oInput = document.getElementById("origin-input");
      const dInput = document.getElementById("dest-input");
      const oRes = document.getElementById("origin-resolved");
      const dRes = document.getElementById("dest-resolved");
      
      const tempVal = oInput.value; oInput.value = dInput.value; dInput.value = tempVal;
      const tempRes = oRes.value; oRes.value = dRes.value; dRes.value = tempRes;
    });
  }

  const geolocBtn = document.getElementById("geoloc-btn");
  if (geolocBtn) {
    geolocBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        showSearchError("Browser ini tidak mendukung GPS. Ketik nama tempat asalmu.");
        return;
      }
      geolocBtn.classList.add("animate-pulse");
      geolocBtn.disabled = true;
      navigator.geolocation.getCurrentPosition((pos) => {
        geolocBtn.classList.remove("animate-pulse");
        geolocBtn.disabled = false;
        // Posisi GPS dipakai apa adanya; server yang mencari halte terdekat dan jarak jalan kakinya.
        setPoint(document.getElementById("origin-input"), document.getElementById("origin-resolved"),
          { name: "Lokasi saya", lat: pos.coords.latitude, lng: pos.coords.longitude });
        showSearchError("");
      }, (err) => {
        geolocBtn.classList.remove("animate-pulse");
        geolocBtn.disabled = false;
        let msg = "Lokasi tidak bisa diambil. Ketik nama tempat asalmu.";
        if (err.code === 1) msg = "Izin lokasi ditolak. Izinkan lokasi di pengaturan browser, atau ketik nama tempat asalmu.";
        else if (err.code === 2) msg = "Sinyal GPS tidak dapat. Coba di tempat terbuka, atau ketik nama tempat asalmu.";
        else if (err.code === 3) msg = "GPS terlalu lama merespons. Tekan lagi, atau ketik nama tempat asalmu.";
        showSearchError(msg);
      }, { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 });
    });
  }

  document.addEventListener("click", (e) => {
    const trackBtn = e.target.closest(".track-route-btn");
    if (trackBtn && searchResults) {
      startTracking(searchResults.itineraries[Number(trackBtn.dataset.index)]);
    }
  });

  const stopBtn = document.getElementById("tracking-stop-btn");
  if (stopBtn) stopBtn.addEventListener("click", stopTracking);

  const centerBtn = document.getElementById("tracking-center-btn");
  if (centerBtn) {
    centerBtn.addEventListener("click", () => {
      if (trackingUserMarker && trackingMap) trackingMap.setView(trackingUserMarker.getLatLng(), 15);
    });
  }

  const followBtn = document.getElementById("tracking-follow-btn");
  if (followBtn) {
    followBtn.addEventListener("click", () => {
      trackingFollowMode = !trackingFollowMode;
      followBtn.setAttribute('aria-pressed', String(trackingFollowMode));
    });
  }

  const modalClose = document.getElementById("modal-close");
  const modalBackdrop = document.getElementById("modal-backdrop");
  if (modalClose) modalClose.addEventListener("click", closeRouteDetail);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeRouteDetail);

  const countBadge = document.getElementById("route-count-badge");
  if (countBadge && typeof ANGKOT_ROUTES !== 'undefined') {
    countBadge.textContent = ANGKOT_ROUTES.length;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const qOrigin = urlParams.get('origin');
  const qDest = urlParams.get('dest');
  if (qOrigin && qDest) {
    document.getElementById("origin-input").value = qOrigin;
    document.getElementById("dest-input").value = qDest;
    performSearch();
  }
}

document.addEventListener("DOMContentLoaded", initApp);