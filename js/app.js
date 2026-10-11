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
    hero_title: 'Baru di Medan?<br><span class="text-[#ffd731] relative inline-block">Naik Angkot<svg class="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6C50 2 150 2 198 6" stroke="#000000" stroke-width="3" stroke-linecap="round"/></svg></span> Aja',
    hero_subtitle: 'Baru datang ke Medan dan bingung naik angkot apa? Ketik asal & tujuan, langsung tahu rute yang tepat. Gratis, gak perlu tanya orang.',
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
    explorer_desc: 'Lihat semua 118 trayek angkot di Medan. Klik kartu untuk lihat rute detail.',
    explorer_search: 'Cari nomor trayek atau nama operator...',
    about_title: 'Tentang Angkot Medan Finder',
    popular_title: 'Rute Populer',
    about_problem: 'Kenapa Sulit Naik Angkot di Medan?',
    about_problem_desc: 'Medan punya 118 trayek angkot dengan 15+ operator berbeda. Gak ada peta rute resmi, gak ada aplikasi yang lengkap. Kalau baru pertama kali ke Medan, kamu pasti bingung: naik angkot mana? turun di mana? Berapa ongkosnya? Website ini bantu kamu temukan rute yang tepat tanpa harus tanya orang.',
    about_how: 'Cara Pakai',
    about_how1: 'Ketik Asal & Tujuan',
    about_how1_desc: 'Ketik nama tempat, halte, atau landmark. Auto-suggest bantu kamu nemu nama yang tepat.',
    about_how2: 'Lihat Rute',
    about_how2_desc: 'Sistem langsung kasih tahu angkot mana yang harus dinaiki, berapa kali pindah, dan turun di mana.',
    about_how3: 'Naik Angkot',
    about_how3_desc: 'Kenali angkot dari warna livery dan nomor trayek yang tertera di badan kendaraan.',
    about_livery: 'Panduan Warna Livery',
    about_livery_desc: 'Setiap angkot punya warna berbeda sesuai operatornya. Kenali warnanya biar gak salah naik.',
    about_data: 'Tentang Data',
    about_data_desc: 'Data 118 trayek dikumpulkan dari komunitas pengguna angkot di Medan. Bukan resmi Dishub, tapi bisa diandalkan untuk sehari-hari.',
    about_back: 'Beranda',
    tracking_searching: 'Mencari lokasi...',
    tracking_monitoring: 'Memantau pergerakan',
    btn_back: 'Beranda',
    result_title: 'Rute Ditemukan',
    no_result_title: 'Gak ada rute ditemukan',
    no_result_desc: 'Coba pakai nama halte atau jalan yang lebih umum di sekitar lokasi awal dan tujuanmu.',
    btn_try_again: 'Coba lagi',
    modal_stops: 'Daftar Halte & Waypoints'
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    hero_location: 'Medan City, North Sumatra, Indonesia',
    hero_title: 'New in Medan?<br><span class="text-[#ffd731] relative inline-block">Just Take<svg class="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6C50 2 150 2 198 6" stroke="#000000" stroke-width="3" stroke-linecap="round"/></svg></span> Angkot',
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
    hero_title: 'Parmodal di Medan?<br><span class="text-[#ffd731] relative inline-block">Numpak Angkot<svg class="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6C50 2 150 2 198 6" stroke="#000000" stroke-width="3" stroke-linecap="round"/></svg></span> Ro',
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
    hero_title: 'Anyar tekan Medan?<br><span class="text-[#ffd731] relative inline-block">Numpak Angkot<svg class="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6C50 2 150 2 198 6" stroke="#000000" stroke-width="3" stroke-linecap="round"/></svg></span> Wae',
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
    hero_title: 'Baru di Medan?<br><span class="text-[#ffd731] relative inline-block">Naik Angkot<svg class="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6C50 2 150 2 198 6" stroke="#000000" stroke-width="3" stroke-linecap="round"/></svg></span> Saja',
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
    hero_title: 'Baruah ka Medan?<br><span class="text-[#ffd731] relative inline-block">Naik Angkot<svg class="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6C50 2 150 2 198 6" stroke="#000000" stroke-width="3" stroke-linecap="round"/></svg></span> Jo',
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
    hero_title: 'Anyar ka Medan?<br><span class="text-[#ffd731] relative inline-block">Naik Angkot<svg class="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6C50 2 150 2 198 6" stroke="#000000" stroke-width="3" stroke-linecap="round"/></svg></span> Wae',
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
    hero_title: 'Baro Meugang di Medan?<br><span class="text-[#ffd731] relative inline-block">Naik Angkot<svg class="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6C50 2 150 2 198 6" stroke="#000000" stroke-width="3" stroke-linecap="round"/></svg></span> Mantong',
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
      if (key === 'hero_title') {
        el.innerHTML = trans[key];
      } else {
        el.textContent = trans[key];
      }
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

// Singkatan yang dipakai di data trayek, disamakan dulu supaya "Terminal Amplas" cocok dengan "T. Amplas".
const STOP_ABBREVIATIONS = { t: "terminal", simp: "simpang", jl: "jalan", psr: "pasar", rsu: "rs", rsup: "rs" };

function normalize(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean)
    .map(w => STOP_ABBREVIATIONS[w] || w).join(" ");
}

function stopsMatch(input, stop) {
  const ni = normalize(input);
  const ns = normalize(stop);
  if (!ni || !ns) return false;
  if (ni === ns) return true;
  // Salah satu nama memuat nama lainnya secara utuh per kata ("Amplas" di dalam "Terminal Amplas").
  if (ni.length >= 3 && ns.length >= 3 && (` ${ns} `.includes(` ${ni} `) || ` ${ni} `.includes(` ${ns} `))) return true;

  const inputWords = ni.split(" ");
  const stopWords = ns.split(" ");
  const longStopWords = stopWords.filter(w => w.length >= 3);
  if (inputWords.length === 1) {
    if (ni.length < 3) return false;
    return longStopWords.some(sw => sw.startsWith(ni) || ni.startsWith(sw));
  }
  // Kata pendek (angka romawi, huruf seperti "B" pada "Simalingkar B") harus sama persis.
  // Kalau dicocokkan longgar, "Belawan" ikut cocok dengan semua halte yang punya kata "B".
  return inputWords.every(iw => iw.length < 3
    ? stopWords.includes(iw)
    : longStopWords.some(sw => sw.includes(iw) || iw.includes(sw)));
}

function getStopCoords(stopName) {
  if (typeof STOP_COORDS === 'undefined') return null;
  if (STOP_COORDS[stopName]) return STOP_COORDS[stopName];
  const normalized = normalize(stopName);
  for (const [name, coords] of Object.entries(STOP_COORDS)) {
    if (normalize(name) === normalized) return coords;
  }
  for (const [name, coords] of Object.entries(STOP_COORDS)) {
    if (stopsMatch(stopName, name)) return coords;
  }
  return null;
}

function findStop(input) {
  if (!input || input.trim().length < 2 || typeof ALL_STOPS === 'undefined') return null;
  const normalized = normalize(input);
  for (const stop of ALL_STOPS) {
    if (normalize(stop) === normalized) return stop;
  }
  for (const stop of ALL_STOPS) {
    if (stopsMatch(input, stop)) return stop;
  }
  return null;
}

function stopIndexInRoute(route, stop) {
  for (let i = 0; i < route.waypoints.length; i++) {
    if (normalize(route.waypoints[i]) === normalize(stop)) return i;
  }
  for (let i = 0; i < route.waypoints.length; i++) {
    if (stopsMatch(stop, route.waypoints[i])) return i;
  }
  return -1;
}

function scoreRoute(result) {
  const stops = result.subWaypoints ? result.subWaypoints.length : 10;
  let score = 0;
  if (!result.transfer) score += 0;
  else if (result.transfers === 1) score += 100;
  else score += 200 + (result.transfers || 0) * 50;
  score += stops;
  return score;
}

function findDirectRoutes(origin, destination) {
  if (typeof ANGKOT_ROUTES === 'undefined') return [];
  const results = [];
  ANGKOT_ROUTES.forEach(route => {
    const oi = stopIndexInRoute(route, origin);
    const di = stopIndexInRoute(route, destination);
    if (oi !== -1 && di !== -1 && oi !== di) {
      const forward = oi < di;
      // Trayek satu arah (pp: false) hanya bisa dinaiki searah urutan haltenya.
      if (forward || route.pp) {
        const start = Math.min(oi, di);
        const end = Math.max(oi, di);
        const subWaypoints = route.waypoints.slice(start, end + 1);
        if (!forward && route.pp) subWaypoints.reverse();
        results.push({ route, originStop: route.waypoints[oi], destStop: route.waypoints[di], subWaypoints, transfer: false, score: 0 });
      }
    }
  });
  results.forEach(r => r.score = scoreRoute(r));
  results.sort((a, b) => a.score - b.score);
  if (results.length > 0) results[0].bestMatch = true;
  return results;
}

function findTransferRoutes(origin, destination) {
  if (typeof ANGKOT_ROUTES === 'undefined') return [];
  const results = [];
  const originRoutes = ANGKOT_ROUTES.filter(r => stopIndexInRoute(r, origin) !== -1);
  const destRoutes = ANGKOT_ROUTES.filter(r => stopIndexInRoute(r, destination) !== -1);

  // Bisa ditempuh dari indeks a ke b? Trayek satu arah hanya maju.
  const reachable = (route, a, b) => a !== b && (a < b || route.pp);
  const segment = (route, a, b) => {
    const sub = route.waypoints.slice(Math.min(a, b), Math.max(a, b) + 1);
    return a > b ? sub.reverse() : sub;
  };

  originRoutes.forEach(r1 => {
    const oIdx = stopIndexInRoute(r1, origin);
    // Kalau r1 sendiri sampai ke tujuan, itu sudah muncul sebagai rute langsung.
    const r1Dest = stopIndexInRoute(r1, destination);
    if (r1Dest !== -1 && reachable(r1, oIdx, r1Dest)) return;

    destRoutes.forEach(r2 => {
      if (r1.id === r2.id) return;
      const dIdx = stopIndexInRoute(r2, destination);
      const r2Origin = stopIndexInRoute(r2, origin);
      if (r2Origin !== -1 && reachable(r2, r2Origin, dIdx)) return;

      // Dari semua halte yang dilewati kedua trayek, pilih titik pindah dengan halte paling sedikit.
      let best = null;
      r2.waypoints.forEach((wp, tIdx2) => {
        const tIdx = r1.waypoints.findIndex(w => normalize(w) === normalize(wp));
        if (tIdx === -1) return;
        if (!reachable(r1, oIdx, tIdx) || !reachable(r2, tIdx2, dIdx)) return;
        const sub1 = segment(r1, oIdx, tIdx);
        const sub2 = segment(r2, tIdx2, dIdx);
        if (!best || sub1.length + sub2.length < best.leg1.subWaypoints.length + best.leg2.subWaypoints.length) {
          best = {
            leg1: { route: r1, originStop: r1.waypoints[oIdx], destStop: wp, subWaypoints: sub1 },
            leg2: { route: r2, originStop: wp, destStop: r2.waypoints[dIdx], subWaypoints: sub2 },
            transferStop: wp,
            transferCount: 1
          };
        }
      });
      if (best) results.push(best);
    });
  });

  const seen = new Set();
  const unique = results.filter(r => {
    const key = `${r.leg1.route.id}-${r.leg2.route.id}-${r.transferStop}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  unique.forEach(r => {
    const stops1 = r.leg1.subWaypoints.length;
    const stops2 = r.leg2.subWaypoints.length;
    r.score = 100 + stops1 + stops2;
  });
  unique.sort((a, b) => a.score - b.score);
  if (unique.length > 0) unique[0].bestMatch = true;
  return unique;
}

function getLiveryColor(warna) {
  if (typeof LIVERY_COLORS !== 'undefined' && LIVERY_COLORS[warna]) {
    return LIVERY_COLORS[warna];
  }
  return { bg: 'bg-amber-100', text: 'text-black', hex: '#ffd731', label: warna || 'Kuning' };
}

// OSRM Road Snapping cache & fetch
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
    el.classList.toggle("flex", isActive);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (view === "tracking" && typeof trackingMap !== 'undefined' && trackingMap) {
    setTimeout(() => trackingMap.invalidateSize(), 200);
  }
}

function performSearch() {
  const originInput = document.getElementById("origin-input");
  const destInput = document.getElementById("dest-input");
  const originValue = document.getElementById("origin-resolved").value || originInput.value;
  const destValue = document.getElementById("dest-resolved").value || destInput.value;

  const errEl = document.getElementById("search-error");
  if (!originValue.trim() || !destValue.trim()) {
    if (errEl) {
      errEl.textContent = "Isi kedua kolom asal dan tujuan terlebih dahulu, lek!";
      errEl.classList.remove("hidden");
    }
    return;
  }
  if (errEl) errEl.classList.add("hidden");

  showLoading(originValue, destValue);

  setTimeout(() => {
    const resolvedOrigin = findStop(originValue) || originValue;
    const resolvedDest = findStop(destValue) || destValue;

    const direct = findDirectRoutes(resolvedOrigin, resolvedDest);
    const transfer = findTransferRoutes(resolvedOrigin, resolvedDest);

    searchResults = { origin: resolvedOrigin, destination: resolvedDest, direct, transfer, multiTransfer: [], pubTransport: [] };
    hideLoading();
    renderResults();
    switchView("result");
  }, 600);
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

function renderResults() {
  const container = document.getElementById("results-container");
  if (!container) return;
  
  if (!searchResults) { 
    container.innerHTML = ""; 
    return; 
  }

  const { direct, transfer } = searchResults;
  const origin = escapeHtml(searchResults.origin);
  const destination = escapeHtml(searchResults.destination);
  const totalCount = direct.length + transfer.length;
  let html = "";

  html += `
    <div class="mb-6 bg-white border-2 border-[#000000] shadow-brutal p-5 rounded-2xl">
      ${totalCount > 0 ? `<div class="flex items-center gap-3 mb-2">
        <h2 class="font-display text-2xl font-bold text-[#000000]" data-i18n="result_title">Rute Ditemukan</h2>
        <span class="px-3 py-0.5 rounded-pill text-xs font-bold bg-[#ffd731] border-2 border-[#000000] shadow-brutal-sm">${totalCount} rute</span>
      </div>` : ""}
      <p class="font-body text-sm text-[#000]/60">
        <span class="font-bold text-[#000000]">${origin}</span> 
        <i data-lucide="arrow-right" class="w-3.5 h-3.5 inline mx-1"></i> 
        <span class="font-bold text-[#000000]">${destination}</span>
      </p>
    </div>
  `;

  if (direct.length === 0 && transfer.length === 0) {
    html += `
      <div class="bg-white border-2 border-[#000000] shadow-brutal p-8 rounded-2xl text-center">
        <div class="w-14 h-14 bg-[#fb4903]/10 border-2 border-[#fb4903]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <i data-lucide="search-x" class="w-7 h-7 text-[#fb4903]"></i>
        </div>
        <h3 class="font-display text-lg font-bold text-[#000000] mb-2">Tidak Ada Rute</h3>
        <p class="font-body text-sm text-[#000]/50 mb-5">Tidak ditemukan rute langsung maupun transfer dari <strong>${origin}</strong> ke <strong>${destination}</strong>.</p>
        <button onclick="switchView('home')" class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ffd731] border-2 border-[#000000] shadow-brutal-sm rounded-pill font-display text-xs font-bold hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> <span data-i18n="btn_back">Kembali</span>
        </button>
      </div>`;
  } else {
    if (direct.length > 0) {
      html += `<div class="mb-2"><h3 class="font-display text-sm font-bold text-[#000]/40 uppercase tracking-wider">Rute Langsung</h3></div>`;
      html += `<div id="results-direct" class="space-y-4"></div>`;
    }
    if (transfer.length > 0) {
      html += `<div class="mt-6 mb-2"><h3 class="font-display text-sm font-bold text-[#000]/40 uppercase tracking-wider">Rute Transfer</h3></div>`;
      html += `<div id="results-transfer" class="space-y-4"></div>`;
    }
  }

  container.innerHTML = html;
  appendResultCards(document.getElementById("results-direct"), direct, renderDirectCard, 0);
  appendResultCards(document.getElementById("results-transfer"), transfer, renderTransferCard, 0);
  lucide.createIcons();
  applyLang(currentLang);
}

// Kartu hasil dimuat per RESULTS_PAGE_SIZE. Tiap kartu membuat peta Leaflet dan
// memanggil OSRM, jadi memuat puluhan sekaligus membuat halaman berat.
const RESULTS_PAGE_SIZE = 5;

function appendResultCards(listEl, items, renderCard, start) {
  if (!listEl) return;
  const oldBtn = listEl.querySelector(".results-more");
  if (oldBtn) oldBtn.remove();

  const batch = document.createElement("div");
  batch.className = "space-y-4";
  batch.innerHTML = items.slice(start, start + RESULTS_PAGE_SIZE).map(renderCard).join("");
  listEl.appendChild(batch);

  const next = start + RESULTS_PAGE_SIZE;
  if (next < items.length) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "results-more w-full py-3 bg-white border-2 border-[#000000] shadow-brutal-sm rounded-pill font-display text-xs font-bold hover:bg-[#ffd731] transition-all";
    btn.textContent = `Tampilkan ${Math.min(RESULTS_PAGE_SIZE, items.length - next)} rute lagi (sisa ${items.length - next})`;
    btn.addEventListener("click", () => {
      appendResultCards(listEl, items, renderCard, next);
      lucide.createIcons();
      applyLang(currentLang);
    });
    listEl.appendChild(btn);
  }

  batch.querySelectorAll(".route-map").forEach(el => { renderCardMap(el); });
  batch.querySelectorAll(".route-map-multi").forEach(el => { renderTransferMap(el); });
}
function renderDirectCard(result) {
  const { route, originStop, destStop, subWaypoints } = result;
  const livery = getLiveryColor(route.warna);
  const totalStops = subWaypoints.length;

  return `
    <div class="bg-white border-2 border-[#000000] shadow-brutal rounded-2xl overflow-hidden">
      <div class="p-4 sm:p-6 pb-0">
        <div class="flex items-start gap-3 sm:gap-4 mb-4">
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${livery.bg} ${livery.text} border-2 border-[#000000] font-display font-black text-base sm:text-lg flex items-center justify-center shadow-brutal-sm shrink-0">
            ${route.nomor}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-display text-sm font-bold text-[#000000]">Angkot ${route.nomor}</span>
              <span class="text-[10px] font-display font-bold px-2 py-0.5 rounded-pill ${livery.bg} ${livery.text}">${livery.label}</span>
            </div>
            <p class="font-body text-xs text-[#000]/50">${route.operator} · ${totalStops} halte</p>
          </div>
        </div>
      </div>

      <div class="px-4 sm:px-6 pb-4 sm:pb-6">
        <div class="route-map w-full h-48 sm:h-56 border-2 border-[#000000] rounded-xl overflow-hidden mb-4" data-waypoints='${JSON.stringify(route.waypoints)}' data-origin="${originStop}" data-dest="${destStop}"></div>
      </div>

      <div class="px-4 sm:px-6 pb-5 sm:pb-6">
        <div class="relative pl-[3.5rem]">

          <!-- ORIGIN -->
          <div class="relative pb-8">
            <div class="absolute left-[-16px] top-[1px] w-8 h-8 rounded-full bg-[#55db9c] border-2 border-[#000000] z-10 shrink-0"></div>
            <div class="absolute left-[-1px] top-[33px] w-[2px] h-[calc(100%-4px)] bg-[#000]/10"></div>
            <div class="ml-7">
              <p class="font-display text-[10px] font-bold text-[#55db9c] uppercase tracking-widest mb-1.5">Naik di sini</p>
              <p class="font-display text-sm font-bold text-[#000000]">${originStop}</p>
            </div>
          </div>

          <!-- JOURNEY -->
          <div class="relative pb-8">
            <div class="absolute left-[-16px] top-[1px] w-8 h-8 rounded-full border-2 border-[#000000] z-10 flex items-center justify-center shrink-0" style="background:${livery.hex}">
              <span class="font-display font-black text-[8px] leading-none ${route.warna === 'kuning' ? 'text-[#000]' : 'text-white'}">${route.nomor}</span>
            </div>
            <div class="absolute left-[-1px] top-[33px] w-[2px] h-[calc(100%-4px)] bg-[#000]/10"></div>
            <div class="ml-7">
              <p class="font-body text-xs text-[#000]/70 mb-1.5">Naik <strong class="text-[#000000]">Angkot ${route.nomor}</strong> selama <strong class="text-[#000]">${totalStops} halte</strong></p>
              <p class="font-body text-[11px] text-[#000]/50 leading-relaxed">
                Langsung dari <strong class="text-[#000]">${originStop}</strong> ke <strong class="text-[#000]">${destStop}</strong> tanpa pindah.
              </p>
            </div>
          </div>

          <!-- DESTINATION -->
          <div class="relative">
            <div class="absolute left-[-16px] top-[1px] w-8 h-8 rounded-full bg-[#fb4903] border-2 border-[#000000] z-10 flex items-center justify-center shrink-0">
              <i data-lucide="flag" class="w-3 h-3 text-white"></i>
            </div>
            <div class="ml-7">
              <p class="font-display text-[10px] font-bold text-[#fb4903] uppercase tracking-widest mb-1">Turun di sini</p>
              <p class="font-display text-sm font-bold text-[#000000]">${destStop}</p>
            </div>
          </div>

        </div>
      </div>

      <div class="px-4 sm:px-6 pb-4 sm:pb-6">
        <button class="track-route-btn w-full py-3 bg-[#4da2ff] text-white font-display font-bold text-xs rounded-xl border-2 border-[#000000] shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-brutal transition-all flex items-center justify-center gap-2" data-route='${JSON.stringify({ nomor: route.nomor, asal: originStop, tujuan: destStop, operator: route.operator, warna: route.warna, waypoints: route.waypoints })}'>
          <i data-lucide="navigation" class="w-4 h-4"></i> <span data-i18n="btn_track">Lacak Rute Ini</span>
        </button>
      </div>
    </div>
  `;
}

function renderTransferCard(result) {
  const { leg1, leg2, transferStop } = result;
  const l1 = getLiveryColor(leg1.route.warna);
  const l2 = getLiveryColor(leg2.route.warna);

  const leg1Stops = leg1.subWaypoints.length;
  const leg2Stops = leg2.subWaypoints.length;

  function stopsPreview(stops, max) {
    if (stops.length <= max) return stops.map(s => `<span class="text-[#000]/40">${s}</span>`).join(' → ');
    const first = stops.slice(0, 2);
    const last = stops.slice(-1);
    return [...first, `<span class="text-[#000]/30 italic">...${stops.length - 3} halte lagi</span>`, ...last].map(s => typeof s === 'string' && s.includes('...') ? s : `<span class="text-[#000]/40">${s}</span>`).join(' → ');
  }

  return `
    <div class="bg-white border-2 border-[#000000] shadow-brutal rounded-2xl overflow-hidden">
      <div class="p-4 sm:p-6 pb-0">
        <div class="flex items-center gap-2 mb-4 flex-wrap">
          <div class="px-3 py-1 rounded-lg ${l1.bg} ${l1.text} border-2 border-[#000000] font-display font-black text-xs">#${leg1.route.nomor}</div>
          <i data-lucide="arrow-right" class="w-4 h-4 text-[#000]/40"></i>
          <div class="px-3 py-1 rounded-lg ${l2.bg} ${l2.text} border-2 border-[#000000] font-display font-black text-xs">#${leg2.route.nomor}</div>
          <span class="ml-auto text-[10px] font-display font-bold bg-[#ffd731] text-[#000000] px-2.5 py-1 rounded-pill border-2 border-[#000000] shadow-brutal-sm">${leg1Stops + leg2Stops} halte · 1x pindah</span>
        </div>
      </div>

      <div class="px-4 sm:px-6 pb-4 sm:pb-6">
        <div class="route-map-multi w-full h-44 sm:h-52 border-2 border-[#000000] rounded-xl overflow-hidden" 
             data-waypoints='${JSON.stringify([...leg1.route.waypoints, ...leg2.route.waypoints])}' 
             data-origin="${leg1.originStop}" 
             data-dest="${leg2.destStop}"
             data-transfer="${transferStop}"></div>
      </div>

      <div class="px-4 sm:px-6 pb-5 sm:pb-6">
        <div class="flex gap-3">

          <!-- Timeline Line -->
          <div class="flex flex-col items-center shrink-0 w-7">
            <div class="w-7 h-7 rounded-full bg-[#55db9c] border-2 border-[#000000] flex items-center justify-center shrink-0"></div>
            <div class="w-[2px] flex-1 bg-[#000]/10"></div>
          </div>

          <!-- Origin Text -->
          <div class="pb-6 pt-0.5">
            <p class="font-display text-[10px] font-bold text-[#55db9c] uppercase tracking-widest mb-1">Naik di sini</p>
            <p class="font-display text-sm font-bold text-[#000000]">${leg1.originStop}</p>
          </div>

        </div>

        <div class="flex gap-3">

          <div class="flex flex-col items-center shrink-0 w-7">
            <div class="w-7 h-7 rounded-full border-2 border-[#000000] flex items-center justify-center shrink-0" style="background:${l1.hex}">
              <span class="font-display font-black text-[7px] leading-none ${leg1.route.warna === 'kuning' ? 'text-[#000]' : 'text-white'}">${leg1.route.nomor}</span>
            </div>
            <div class="w-[2px] flex-1 bg-[#000]/10"></div>
          </div>

          <div class="pb-6 pt-0.5">
            <p class="font-body text-xs text-[#000]/70 mb-1">Naik <strong class="text-[#000000]">Angkot ${leg1.route.nomor}</strong> <span class="text-[10px] px-1.5 py-0.5 rounded-pill ${l1.bg} ${l1.text} font-display font-bold">${l1.label}</span></p>
            <p class="font-body text-[11px] text-[#000]/50 leading-relaxed mb-1.5">
              Dari <strong class="text-[#000]">${leg1.originStop}</strong> → turun di <strong class="text-[#000]">${transferStop}</strong>
            </p>
            <div class="flex items-center gap-1 text-[10px] text-[#000]/35 font-body flex-wrap">
              <i data-lucide="map-pin" class="w-3 h-3 shrink-0"></i>
              <span>${leg1Stops} halte · ${leg1.route.operator}</span>
            </div>
          </div>

        </div>

        <div class="flex gap-3">

          <div class="flex flex-col items-center shrink-0 w-7">
            <div class="w-7 h-7 rounded-full bg-[#ffd731] border-2 border-[#000000] flex items-center justify-center shrink-0">
              <i data-lucide="repeat" class="w-3 h-3 text-[#000000]"></i>
            </div>
            <div class="w-[2px] flex-1 bg-[#000]/10"></div>
          </div>

          <div class="pb-6 pt-0.5">
            <p class="font-display text-[10px] font-bold text-[#ffd731] uppercase tracking-widest mb-1">Pindah Angkot</p>
            <p class="font-display text-sm font-bold text-[#000000]">${transferStop}</p>
            <p class="font-body text-[11px] text-[#000]/50 mt-1.5 leading-relaxed">Turun dari <strong>#${leg1.route.nomor}</strong>, jalan kaki sebentar, lalu naik <strong>#${leg2.route.nomor}</strong></p>
          </div>

        </div>

        <div class="flex gap-3">

          <div class="flex flex-col items-center shrink-0 w-7">
            <div class="w-7 h-7 rounded-full border-2 border-[#000000] flex items-center justify-center shrink-0" style="background:${l2.hex}">
              <span class="font-display font-black text-[7px] leading-none ${leg2.route.warna === 'kuning' ? 'text-[#000]' : 'text-white'}">${leg2.route.nomor}</span>
            </div>
            <div class="w-[2px] flex-1 bg-[#000]/10"></div>
          </div>

          <div class="pb-6 pt-0.5">
            <p class="font-body text-xs text-[#000]/70 mb-1">Naik <strong class="text-[#000000]">Angkot ${leg2.route.nomor}</strong> <span class="text-[10px] px-1.5 py-0.5 rounded-pill ${l2.bg} ${l2.text} font-display font-bold">${l2.label}</span></p>
            <p class="font-body text-[11px] text-[#000]/50 leading-relaxed mb-1.5">
              Dari <strong class="text-[#000]">${transferStop}</strong> → turun di <strong class="text-[#000]">${leg2.destStop}</strong>
            </p>
            <div class="flex items-center gap-1 text-[10px] text-[#000]/35 font-body flex-wrap">
              <i data-lucide="map-pin" class="w-3 h-3 shrink-0"></i>
              <span>${leg2Stops} halte · ${leg2.route.operator}</span>
            </div>
          </div>

        </div>

        <div class="flex gap-3">

          <div class="flex flex-col items-center shrink-0 w-7">
            <div class="w-7 h-7 rounded-full bg-[#fb4903] border-2 border-[#000000] flex items-center justify-center shrink-0">
              <i data-lucide="flag" class="w-2.5 h-2.5 text-white"></i>
            </div>
          </div>

          <div class="pt-0.5">
            <p class="font-display text-[10px] font-bold text-[#fb4903] uppercase tracking-widest mb-1">Turun di sini</p>
            <p class="font-display text-sm font-bold text-[#000000]">${leg2.destStop}</p>
          </div>

        </div>
      </div>

      <div class="px-4 sm:px-6 pb-4 sm:pb-6">
        <div class="bg-[#f0f7ff] border border-[#000]/10 rounded-xl p-3 text-[11px] font-body text-[#000]/55 leading-relaxed flex items-start gap-2">
          <i data-lucide="info" class="w-3.5 h-3.5 text-[#4da2ff] shrink-0 mt-0.5"></i>
          <span>Perjalanan total <strong class="text-[#000]">${leg1Stops + leg2Stops} halte</strong> dengan 1x pindah angkot. Estimasi waktu ±15–25 menit (bergantung lalu lintas).</span>
        </div>
      </div>

      <div class="px-4 sm:px-6 pb-4 sm:pb-6">
        <button class="track-route-btn w-full py-3 bg-[#4da2ff] text-white font-display font-bold text-xs rounded-xl border-2 border-[#000000] shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-brutal transition-all flex items-center justify-center gap-2" data-route='${JSON.stringify({ nomor: leg1.route.nomor + "+" + leg2.route.nomor, asal: leg1.originStop, tujuan: leg2.destStop, operator: leg1.route.operator + " + " + leg2.route.operator, warna: leg1.route.warna, waypoints: [...leg1.route.waypoints, ...leg2.route.waypoints] })}'>
          <i data-lucide="navigation" class="w-4 h-4"></i> <span data-i18n="btn_track">Lacak Rute Ini</span>
        </button>
      </div>
    </div>
  `;
}

// ===== PETA DASAR =====
// Ubin OpenStreetMap. Atribusi wajib tampil sesuai ketentuan pemakaian OSM.
function baseTiles() {
  return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

async function renderCardMap(el) {
  const waypoints = JSON.parse(el.dataset.waypoints || "[]");
  const origin = el.dataset.origin;
  const dest = el.dataset.dest;
  const coords = waypoints.map(w => getStopCoords(w)).filter(Boolean);
  
  if (coords.length < 2) {
    el.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-[#000]/40 font-body">Peta tidak tersedia</div>';
    return;
  }

  // Wajib pastikan elemen card map punya tinggi CSS eksplisit
  el.style.height = "220px"; 

  const map = L.map(el, { zoomControl: true, attributionControl: true, dragging: true, scrollWheelZoom: true });
  baseTiles().addTo(map);

  const straightLine = L.polyline(coords, { color: '#000000', weight: 4, opacity: 0.8 }).addTo(map);
  
  const oCoord = getStopCoords(origin);
  const dCoord = getStopCoords(dest);
  if (oCoord) L.circleMarker(oCoord, { radius: 7, fillColor: '#55db9c', color: '#000000', weight: 2, fillOpacity: 1 }).addTo(map);
  if (dCoord) L.circleMarker(dCoord, { radius: 7, fillColor: '#fb4903', color: '#000000', weight: 2, fillOpacity: 1 }).addTo(map);

  map.fitBounds(L.latLngBounds(coords), { padding: [30, 30] });

  // Peta dibuat saat tampilan hasil masih tersembunyi, jadi ukuran dan batasnya dihitung ulang setelah tampil.
  setTimeout(() => {
    map.invalidateSize();
    map.fitBounds(L.latLngBounds(coords), { padding: [30, 30] });
  }, 300);

  // Upgrade dengan OSRM road snapping jika ada jaringan
  upgradeToRoadGeometry(map, straightLine, coords);
}

async function renderTransferMap(el) {
  const waypoints = JSON.parse(el.dataset.waypoints || "[]");
  const origin = el.dataset.origin;
  const dest = el.dataset.dest;
  const transfer = el.dataset.transfer;
  const coords = waypoints.map(w => getStopCoords(w)).filter(Boolean);
  
  if (coords.length < 2) {
    el.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-[#000]/40 font-body">Peta tidak tersedia</div>';
    return;
  }

  el.style.height = "220px";

  const map = L.map(el, { zoomControl: true, attributionControl: true, dragging: true, scrollWheelZoom: true });
  baseTiles().addTo(map);

  const straightLine = L.polyline(coords, { color: '#000000', weight: 4, opacity: 0.8 }).addTo(map);
  
  const oCoord = getStopCoords(origin);
  const dCoord = getStopCoords(dest);
  const tCoord = getStopCoords(transfer);
  if (oCoord) L.circleMarker(oCoord, { radius: 7, fillColor: '#55db9c', color: '#000000', weight: 2, fillOpacity: 1 }).addTo(map);
  if (dCoord) L.circleMarker(dCoord, { radius: 7, fillColor: '#fb4903', color: '#000000', weight: 2, fillOpacity: 1 }).addTo(map);
  if (tCoord) L.circleMarker(tCoord, { radius: 9, fillColor: '#ffd731', color: '#000000', weight: 2, fillOpacity: 1 }).addTo(map);

  map.fitBounds(L.latLngBounds(coords), { padding: [30, 30] });
  el._leaflet_map = map;

  // Peta dibuat saat tampilan hasil masih tersembunyi, jadi batasnya dihitung ulang setelah tampil.
  setTimeout(() => {
    map.invalidateSize();
    map.fitBounds(L.latLngBounds(coords), { padding: [30, 30] });
  }, 300);
  upgradeToRoadGeometry(map, straightLine, coords);
}

function renderPopularRoutes() {
  const container = document.getElementById("popular-routes");
  if (!container || typeof POPULAR_ROUTES === 'undefined') return;
  
  container.innerHTML = POPULAR_ROUTES.map(r => `
    <button type="button" class="popular-btn bg-white border-2 border-[#000000] shadow-brutal-sm p-3.5 text-left rounded-xl hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-brutal transition-all flex items-center justify-between group" data-from="${r.from}" data-to="${r.to}">
      <div class="min-w-0 pr-2">
        <p class="font-body text-xs font-bold text-[#000000] truncate">${r.from}</p>
        <p class="font-body text-[11px] text-[#000]/40 truncate mt-0.5">&rarr; ${r.to}</p>
      </div>
      <div class="w-7 h-7 bg-[#ffd731]/20 border border-[#000000]/20 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#ffd731] group-hover:border-[#000000] transition-colors">
        <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-[#000000]"></i>
      </div>
    </button>
  `).join("");

  container.querySelectorAll(".popular-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("origin-input").value = btn.dataset.from;
      document.getElementById("dest-input").value = btn.dataset.to;
      document.getElementById("origin-resolved").value = btn.dataset.from;
      document.getElementById("dest-resolved").value = btn.dataset.to;
      performSearch();
    });
  });
  lucide.createIcons();
}

function setupSuggestions(inputEl, hiddenEl, listEl) {
  if (!inputEl) return;
  inputEl.addEventListener("input", () => {
    const val = inputEl.value.trim();
    hiddenEl.value = "";
    if (val.length < 1 || typeof ALL_STOPS === 'undefined') {
      listEl.classList.add("hidden");
      return;
    }
    const typed = normalize(val);
    const matches = ALL_STOPS.filter(s => normalize(s).includes(typed) || stopsMatch(val, s)).slice(0, 6);
    if (matches.length === 0) {
      listEl.classList.add("hidden");
      return;
    }
    listEl.innerHTML = matches.map(m => `
      <div class="sugg-item px-4 py-2.5 text-xs font-body hover:bg-[#4da2ff]/10 cursor-pointer border-b border-[#000]/5 last:border-0 font-medium flex items-center gap-2" data-value="${escapeHtml(m)}">
        <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#4da2ff] shrink-0"></i>
        <span class="truncate">${escapeHtml(m)}</span>
      </div>
    `).join("");
    listEl.classList.remove("hidden");
    lucide.createIcons({ nodes: listEl.querySelectorAll("[data-lucide]") });

    listEl.querySelectorAll(".sugg-item").forEach(item => {
      item.addEventListener("mousedown", (e) => {
        e.preventDefault();
        inputEl.value = item.dataset.value;
        hiddenEl.value = item.dataset.value;
        listEl.classList.add("hidden");
      });
    });
  });

  document.addEventListener("click", (e) => {
    if (!inputEl.contains(e.target) && !listEl.contains(e.target)) {
      listEl.classList.add("hidden");
    }
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

  if (countEl) countEl.textContent = `Menampilkan ${pageRoutes.length} dari ${filtered.length} trayek`;

  if (pageRoutes.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-12 font-display text-sm text-[#000]/40">Gak ada trayek yang cocok</div>`;
    renderExplorerPagination(totalPages);
    return;
  }

  container.innerHTML = pageRoutes.map(r => {
    const livery = getLiveryColor(r.warna);
    return `
      <div class="explorer-card bg-white border-2 border-[#000000] shadow-brutal p-4 rounded-2xl hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all cursor-pointer flex flex-col justify-between" data-route-id="${r.id}">
        <div>
          <div class="flex items-start gap-3 mb-3">
            <div class="w-12 h-12 rounded-xl ${livery.bg} ${livery.text} border-2 border-[#000000] font-display font-black text-sm flex items-center justify-center shadow-brutal-sm shrink-0">
              ${r.nomor}
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-body text-xs font-bold text-[#000000] truncate">${r.asal}</p>
              <div class="flex items-center gap-1 my-0.5">
                <i data-lucide="arrow-down" class="w-3 h-3 text-[#4da2ff]"></i>
              </div>
              <p class="font-body text-xs font-bold text-[#000000] truncate">${r.tujuan}</p>
            </div>
          </div>
        </div>
        <div class="pt-3 border-t border-[#000]/8 flex items-center justify-between text-[11px] font-body text-[#000]/50">
          <span class="truncate pr-2">${r.operator}</span>
          <span class="shrink-0 font-bold">${r.waypoints.length} halte</span>
        </div>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".explorer-card").forEach(card => {
    card.addEventListener("click", () => {
      const route = ANGKOT_ROUTES.find(r => r.id === card.dataset.routeId);
      if (route) openRouteDetail(route);
    });
  });

  renderExplorerPagination(totalPages);
  lucide.createIcons();
}

function handleExplorerSearch(e) {
  explorerPage = 1;
  renderRouteExplorer();
}

function renderExplorerPagination(totalPages) {
  const el = document.getElementById("explorer-pagination");
  if (!el || totalPages <= 1) { if (el) el.innerHTML = ""; return; }

  let html = `<button class="page-btn px-3 py-1.5 border-2 border-[#000000]/20 rounded-lg font-display text-xs font-bold ${explorerPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#4da2ff]/10 hover:border-[#000000]'}" data-page="${explorerPage - 1}" ${explorerPage === 1 ? 'disabled' : ''}>&larr;</button>`;
  
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= explorerPage - 1 && i <= explorerPage + 1)) {
      const isActive = i === explorerPage;
      html += `<button class="page-btn w-8 h-8 border-2 rounded-lg font-display text-xs font-bold ${isActive ? 'bg-[#ffd731] border-[#000000] shadow-brutal-sm' : 'border-[#000000]/20 hover:border-[#000000]'}" data-page="${i}">${i}</button>`;
    } else if (i === explorerPage - 2 || i === explorerPage + 2) {
      html += `<span class="text-xs text-[#000]/40">...</span>`;
    }
  }

  html += `<button class="page-btn px-3 py-1.5 border-2 border-[#000000]/20 rounded-lg font-display text-xs font-bold ${explorerPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#4da2ff]/10 hover:border-[#000000]'}" data-page="${explorerPage + 1}" ${explorerPage === totalPages ? 'disabled' : ''}>&rarr;</button>`;

  el.innerHTML = html;
  el.querySelectorAll(".page-btn:not([disabled])").forEach(btn => {
    btn.addEventListener("click", () => {
      explorerPage = parseInt(btn.dataset.page);
      renderRouteExplorer();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function openRouteDetail(route) {
  const modal = document.getElementById("route-detail-modal");
  const titleEl = document.getElementById("modal-route-title");
  const statsEl = document.getElementById("modal-stats");
  const stopsEl = document.getElementById("modal-stops");
  const searchBtn = document.getElementById("modal-search-btn");
  if (!modal) return;

  const wps = route.waypoints;
  const livery = getLiveryColor(route.warna);

  if (titleEl) titleEl.textContent = `Angkot #${route.nomor} — ${route.operator}`;
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="bg-white border-2 border-[#000000] shadow-brutal-sm p-3 rounded-xl text-center">
        <p class="font-display text-base sm:text-lg font-black text-[#000000]">${wps.length}</p>
        <p class="font-body text-[10px] text-[#000]/40 uppercase">Halte</p>
      </div>
      <div class="bg-white border-2 border-[#000000] shadow-brutal-sm p-3 rounded-xl text-center">
        <p class="font-display text-base sm:text-lg font-black text-[#4da2ff]">${route.warna}</p>
        <p class="font-body text-[10px] text-[#000]/40 uppercase">Livery</p>
      </div>
      <div class="bg-white border-2 border-[#000000] shadow-brutal-sm p-3 rounded-xl text-center">
        <p class="font-display text-base sm:text-lg font-black text-[#55db9c]">${route.pp ? 'PP' : 'Satu Arah'}</p>
        <p class="font-body text-[10px] text-[#000]/40 uppercase">Trayek</p>
      </div>
    `;
  }

  if (stopsEl) {
    stopsEl.innerHTML = wps.map((wp, i) => {
      const isFirst = i === 0;
      const isLast = i === wps.length - 1;
      const dotBg = isFirst ? 'bg-[#55db9c]' : isLast ? 'bg-[#fb4903]' : 'bg-white border-2 border-[#000000]/30';
      return `
        <div class="flex items-center gap-3 relative py-1">
          <div class="w-6 h-6 ${dotBg} border-2 border-[#000000] rounded-full flex items-center justify-center shrink-0 z-10">
            ${isFirst ? '<div class="w-2 h-2 rounded-full bg-white"></div>' : isLast ? '<div class="w-2 h-2 rounded-full bg-white"></div>' : ''}
          </div>
          <p class="font-body text-xs ${isFirst || isLast ? 'font-bold text-[#000000]' : 'text-[#000]/60'} truncate">${wp}</p>
        </div>
      `;
    }).join("");
  }

  if (searchBtn) {
    searchBtn.onclick = () => {
      window.location.href = `/?origin=${encodeURIComponent(route.asal)}&dest=${encodeURIComponent(route.tujuan)}`;
    };
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    const mapEl = document.getElementById("modal-map");
    if (!mapEl) return;
    if (modalMap) { modalMap.remove(); modalMap = null; }
    
    modalMap = L.map(mapEl, { zoomControl: false, attributionControl: true, scrollWheelZoom: false });
    baseTiles().addTo(modalMap);
    
    const validCoords = wps.map(wp => getStopCoords(wp)).filter(Boolean);
    if (validCoords.length >= 2) {
      const straightLine = L.polyline(validCoords, { color: '#000000', weight: 4, opacity: 0.8 }).addTo(modalMap);
      validCoords.forEach((c, i) => {
        if (i === 0 || i === validCoords.length - 1) {
          L.circleMarker(c, { radius: 6, fillColor: i === 0 ? '#55db9c' : '#fb4903', color: '#000', weight: 2, fillOpacity: 1 }).addTo(modalMap);
        }
      });
      modalMap.fitBounds(validCoords, { padding: [30, 30] });
      upgradeToRoadGeometry(modalMap, straightLine, validCoords);
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

function startTracking(routeData) {
  switchView("tracking");
  setTimeout(() => initTrackingMap(routeData), 200);
}

function initTrackingMap(routeData) {
  const mapEl = document.getElementById("tracking-map");
  if (!mapEl) return;
  if (trackingMap) { trackingMap.remove(); trackingMap = null; }

  trackingMap = L.map(mapEl, { zoomControl: false, attributionControl: true }).setView([3.5950, 98.6700], 13);
  baseTiles().addTo(trackingMap);

  const nameEl = document.getElementById("tracking-route-name");
  const infoEl = document.getElementById("tracking-route-info");
  if (nameEl) nameEl.textContent = `Angkot #${routeData.nomor} — ${routeData.asal || routeData.tujuan ? routeData.asal + ' → ' + routeData.tujuan : ''}`;
  if (infoEl) infoEl.textContent = `${routeData.operator || 'Trayek Medan'} · ${routeData.waypoints.length} halte`;

  const allCoords = routeData.waypoints.map(w => getStopCoords(w)).filter(Boolean);
  if (allCoords.length >= 2) {
    const livery = getLiveryColor(routeData.warna);
    const routeColor = livery.hex === '#FFFFFF' ? '#000000' : livery.hex;
    
    L.polyline(allCoords, { color: 'white', weight: 6, opacity: 0.9 }).addTo(trackingMap);
    const mainLine = L.polyline(allCoords, { color: routeColor, weight: 4, opacity: 0.9, dashArray: '8 6' }).addTo(trackingMap);
    
    allCoords.forEach((coord, i) => {
      const isFirst = i === 0;
      const isLast = i === allCoords.length - 1;
      if (isFirst || isLast) {
        L.circleMarker(coord, { radius: 6, color: '#000', fillColor: isFirst ? '#55db9c' : '#fb4903', fillOpacity: 1, weight: 2 }).addTo(trackingMap);
      }
    });

    trackingMap.fitBounds(mainLine.getBounds(), { padding: [50, 50] });
  }

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

function initApp() {
  lucide.createIcons();
  renderPopularRoutes();

  // Angka di hero diambil dari data, supaya tidak tertinggal saat data.js berubah.
  const heroStops = document.getElementById("hero-stops-count");
  if (heroStops && typeof ALL_STOPS !== "undefined") heroStops.textContent = ALL_STOPS.length;

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
        alert("GPS tidak didukung browser ini.");
        return;
      }
      geolocBtn.classList.add("animate-pulse");
      geolocBtn.disabled = true;
      navigator.geolocation.getCurrentPosition((pos) => {
        geolocBtn.classList.remove("animate-pulse");
        geolocBtn.disabled = false;
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;
        let best = null, bestDist = Infinity;
        if (typeof STOP_COORDS !== 'undefined') {
          for (const [name, coords] of Object.entries(STOP_COORDS)) {
            const dLat = (lat - coords[0]) * 111;
            const dLng = (lng - coords[1]) * 111 * Math.cos(lat * Math.PI / 180);
            const d = Math.sqrt(dLat * dLat + dLng * dLng);
            if (d < bestDist) { bestDist = d; best = name; }
          }
        }
        if (best && bestDist < 5) {
          document.getElementById("origin-input").value = best;
          document.getElementById("origin-resolved").value = best;
          if (typeof showToast === "function") {
            showToast(`Lokasi ditemukan: ${best} (${accuracy.toFixed(0)}m akurasi)`, "success");
          }
        } else if (best) {
          document.getElementById("origin-input").value = best;
          document.getElementById("origin-resolved").value = best;
          if (typeof showToast === "function") {
            showToast(`Lokasi terdekat: ${best} (${bestDist.toFixed(1)}km)`, "info");
          }
        } else {
          document.getElementById("origin-input").value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
          document.getElementById("origin-resolved").value = "";
        }
      }, (err) => {
        geolocBtn.classList.remove("animate-pulse");
        geolocBtn.disabled = false;
        let msg = "Gagal mengambil lokasi GPS.";
        if (err.code === 1) msg = "Akses lokasi ditolak. Aktifkan izin lokasi di browser.";
        else if (err.code === 2) msg = "Lokasi tidak tersedia. Coba di luar ruangan.";
        else if (err.code === 3) msg = "Timeout GPS. Coba lagi.";
        alert(msg);
      }, { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 });
    });
  }

  document.addEventListener("click", (e) => {
    const trackBtn = e.target.closest(".track-route-btn");
    if (trackBtn) {
      const routeData = JSON.parse(trackBtn.dataset.route || "{}");
      startTracking(routeData);
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
      followBtn.classList.toggle('bg-[#ffd731]', trackingFollowMode);
      followBtn.classList.toggle('bg-white', !trackingFollowMode);
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
    document.getElementById("origin-resolved").value = qOrigin;
    document.getElementById("dest-input").value = qDest;
    document.getElementById("dest-resolved").value = qDest;
    performSearch();
  }

  const navbar = document.getElementById("site-navbar");
  if (navbar) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          navbar.style.boxShadow = window.scrollY > 4 ? "0 4px 20px rgba(0,0,0,0.12)" : "none";
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
}

document.addEventListener("DOMContentLoaded", initApp);