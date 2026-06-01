// Term dataset for Diplomatik Lug'at
// Each term has Latin + Cyrillic forms, definition (UZ), translations (RU/EN),
// etymology, and usage examples.

window.CATEGORIES = [
  { id: '01', slugLatin: 'huquq',    slugCyr: 'ҳуқуқ',    name: { lat: 'Xalqaro huquq',     cyr: 'Халқаро ҳуқуқ',     en: 'International Law' },     count: 184 },
  { id: '02', slugLatin: 'protokol', slugCyr: 'протокол', name: { lat: 'Diplomatik protokol', cyr: 'Дипломатик протокол', en: 'Diplomatic Protocol' }, count: 142 },
  { id: '03', slugLatin: 'iqtisod',  slugCyr: 'иқтисод',  name: { lat: 'Iqtisodiy diplomatiya', cyr: 'Иқтисодий дипломатия', en: 'Economic Diplomacy' }, count: 121 },
  { id: '04', slugLatin: 'tarix',    slugCyr: 'тарих',    name: { lat: 'Tarix va doktrinalar', cyr: 'Тарих ва доктриналар', en: 'History & Doctrines' }, count: 98 },
  { id: '05', slugLatin: 'tashkilot', slugCyr: 'ташкилот', name: { lat: 'Tashkilotlar',       cyr: 'Ташкилотлар',         en: 'Organizations' },          count: 156 },
  { id: '06', slugLatin: 'muzokara', slugCyr: 'музокара', name: { lat: 'Muzokara va shartnoma', cyr: 'Музокара ва шартнома', en: 'Negotiation & Treaties' }, count: 167 },
  { id: '07', slugLatin: 'konsul',   slugCyr: 'консул',   name: { lat: 'Konsullik ishlari',  cyr: 'Консуллик ишлари',    en: 'Consular Affairs' },       count: 87 },
  { id: '08', slugLatin: 'havfsiz',  slugCyr: 'хавфсиз',  name: { lat: 'Xavfsizlik',         cyr: 'Хавфсизлик',          en: 'Security' },               count: 112 },
];

window.TERMS = [
  {
    id: 'agrement',
    term: { lat: 'Agreman',           cyr: 'Агреман' },
    pron:  { lat: '[ag-re-mán]',      cyr: '[аг-ре-ма́н]' },
    cat: '02',
    origin: { lang: 'Frantsuz', word: 'agrément', mean: '“rozilik, ma\'qullash”' },
    def:   { lat: 'Bir davlatning chet el elchisini qabul qilishga oldindan beradigan rasmiy roziligi. Yuborilayotgan diplomatik vakil shaxsi qabul qiluvchi davlat tomonidan ma\'qullanmaguncha, uni rasman tayinlab bo\'lmaydi.',
             cyr: 'Бир давлатнинг чет эл элчисини қабул қилишга олдиндан берадиган расмий розилиги. Юборилаётган дипломатик вакил шахси қабул қилувчи давлат томонидан маъқулланмагунча, уни расман тайинлаб бўлмайди.' },
    trans: { ru: 'Агреман', en: 'Agrément' },
    examples: [
      { lat: 'Tomonlar yangi elchini tayinlash uchun agreman so\'rovini almashdilar.',
        cyr: 'Томонлар янги элчини тайинлаш учун агреман сўровини алмашдилар.',
        src: 'Vena konventsiyasi, 1961 — 4-modda izohi' }
    ],
    related: ['persona-non-grata', 'verbal-nota', 'akkreditatsiya']
  },
  {
    id: 'akkreditatsiya',
    term: { lat: 'Akkreditatsiya', cyr: 'Аккредитация' },
    pron:  { lat: '[ak-kre-di-tát-si-ya]', cyr: '[ак-кре-ди-та́т-си-я]' },
    cat: '02',
    origin: { lang: 'Lotin', word: 'accredere', mean: '“ishonch bildirmoq”' },
    def:   { lat: 'Diplomatik vakilning qabul qiluvchi davlatda rasman tan olinishi va vakolatlarini boshlashi tartibi. Akkreditatsiya — ishonchnomani topshirish bilan tugallanadi.',
             cyr: 'Дипломатик вакилнинг қабул қилувчи давлатда расман тан олиниши ва ваколатларини бошлаши тартиби. Аккредитация — ишончномани топшириш билан тугалланади.' },
    trans: { ru: 'Аккредитация', en: 'Accreditation' },
    examples: [
      { lat: 'Yangi tayinlangan elchi akkreditatsiyadan o\'tgach, vakolatlarini boshladi.',
        cyr: 'Янги тайинланган элчи аккредитациядан ўтгач, ваколатларини бошлади.',
        src: 'Diplomatik amaliyot bo\'yicha qo\'llanma' }
    ],
    related: ['agrement', 'ishonchnoma', 'verbal-nota']
  },
  {
    id: 'aneksiya',
    term: { lat: 'Anneksiya', cyr: 'Аннексия' },
    pron:  { lat: '[an-nék-si-ya]', cyr: '[ан-не́к-си-я]' },
    cat: '01',
    origin: { lang: 'Lotin', word: 'annexio', mean: '“qo\'shib olish”' },
    def:   { lat: 'Bir davlat hududining boshqa davlat tomonidan kuch ishlatish yoki kuch ishlatish tahdidi bilan, xalqaro huquqqa zid ravishda majburan o\'z tarkibiga qo\'shib olinishi.',
             cyr: 'Бир давлат ҳудудининг бошқа давлат томонидан куч ишлатиш ёки куч ишлатиш таҳдиди билан, халқаро ҳуқуққа зид равишда мажбуран ўз таркибига қўшиб олиниши.' },
    trans: { ru: 'Аннексия', en: 'Annexation' },
    examples: [
      { lat: 'BMT Bosh Assambleyasi anneksiyani xalqaro huquqqa zid deb e\'lon qildi.',
        cyr: 'БМТ Бош Ассамблеяси аннексияни халқаро ҳуқуққа зид деб эълон қилди.',
        src: 'BMT Bosh Assambleyasi rezolyutsiyasi 2625 (XXV)' }
    ],
    related: ['suverenitet', 'protektorat', 'okkupatsiya']
  },
  {
    id: 'arbitrazh',
    term: { lat: 'Arbitraj', cyr: 'Арбитраж' },
    pron:  { lat: '[ar-bit-rázh]', cyr: '[ар-бит-ра́ж]' },
    cat: '01',
    origin: { lang: 'Frantsuz', word: 'arbitrage', mean: '“hakamlik, hukm chiqarish”' },
    def:   { lat: 'Davlatlar yoki xalqaro sub\'ektlar o\'rtasidagi nizolarni bitaraf uchinchi tomon — hakamlar hay\'ati orqali, kelishilgan tartibda hal qilish usuli.',
             cyr: 'Давлатлар ёки халқаро субъектлар ўртасидаги низоларни битараф учинчи томон — ҳакамлар ҳайъати орқали, келишилган тартибда ҳал қилиш усули.' },
    trans: { ru: 'Арбитраж', en: 'Arbitration' },
    examples: [
      { lat: 'Tomonlar nizoni doimiy arbitraj sudiga taqdim etishga qaror qilishdi.',
        cyr: 'Томонлар низони доимий арбитраж судига тақдим этишга қарор қилишди.',
        src: 'Gaaga konventsiyasi, 1907' }
    ],
    related: ['mediatsiya', 'xalqaro-sud', 'muzokara']
  },
  {
    id: 'bilateral',
    term: { lat: 'Bilateral munosabatlar', cyr: 'Билатерал муносабатлар' },
    pron:  { lat: '[bi-la-te-rál]', cyr: '[би-ла-те-ра́л]' },
    cat: '06',
    origin: { lang: 'Lotin', word: 'bi + lateralis', mean: '“ikki tomonli”' },
    def:   { lat: 'Ikki davlat o\'rtasida o\'rnatilgan rasmiy diplomatik, iqtisodiy yoki madaniy aloqalar tizimi. Asosan ikki tomonlama shartnomalar va muzokaralar orqali rivojlantiriladi.',
             cyr: 'Икки давлат ўртасида ўрнатилган расмий дипломатик, иқтисодий ёки маданий алоқалар тизими. Асосан икки томонлама шартномалар ва музокаралар орқали ривожлантирилади.' },
    trans: { ru: 'Двусторонние отношения', en: 'Bilateral relations' },
    examples: [
      { lat: 'Bilateral hamkorlik strategik sheriklik darajasiga ko\'tarildi.',
        cyr: 'Билатерал ҳамкорлик стратегик шериклик даражасига кўтарилди.',
        src: 'Tashqi siyosat konsepsiyasi' }
    ],
    related: ['multilateral', 'shartnoma', 'memorandum']
  },
  {
    id: 'demarsh',
    term: { lat: 'Demarsh', cyr: 'Демарш' },
    pron:  { lat: '[de-márš]', cyr: '[де-ма́рш]' },
    cat: '02',
    origin: { lang: 'Frantsuz', word: 'démarche', mean: '“qadam, harakat”' },
    def:   { lat: 'Bir davlatning boshqa davlatga rasmiy norozilik yoki ogohlantirish bildirish maqsadida amalga oshiradigan diplomatik harakati; odatda nota yoki shifohiy bayonot tarzida.',
             cyr: 'Бир давлатнинг бошқа давлатга расмий норозилик ёки огоҳлантириш билдириш мақсадида амалга оширадиган дипломатик ҳаракати; одатда нота ёки шифоҳий баёнот тарзида.' },
    trans: { ru: 'Демарш', en: 'Démarche' },
    examples: [
      { lat: 'Tashqi ishlar vazirligi do\'st bo\'lmagan harakatga javoban demarsh bayon etdi.',
        cyr: 'Ташқи ишлар вазирлиги дўст бўлмаган ҳаракатга жавобан демарш баён этди.',
        src: 'Diplomatik amaliyot, XX asr' }
    ],
    related: ['nota', 'persona-non-grata', 'verbal-nota']
  },
  {
    id: 'ekstraditsiya',
    term: { lat: 'Ekstraditsiya', cyr: 'Экстрадиция' },
    pron:  { lat: '[eks-tra-dít-si-ya]', cyr: '[экс-тра-ди́т-си-я]' },
    cat: '01',
    origin: { lang: 'Lotin', word: 'extraditio', mean: '“topshirish”' },
    def:   { lat: 'Bir davlat hududidagi shaxsni jinoiy ish qo\'zg\'atilgan yoki sud hukmi chiqarilgan boshqa davlatga rasmiy ravishda topshirish jarayoni. Tegishli xalqaro shartnomalar asosida amalga oshiriladi.',
             cyr: 'Бир давлат ҳудудидаги шахсни жиноий иш қўзғатилган ёки суд ҳукми чиқарилган бошқа давлатга расмий равишда топшириш жараёни. Тегишли халқаро шартномалар асосида амалга оширилади.' },
    trans: { ru: 'Экстрадиция', en: 'Extradition' },
    examples: [
      { lat: 'Ikki davlat ekstraditsiya shartnomasini imzoladilar.',
        cyr: 'Икки давлат экстрадиция шартномасини имзоладилар.',
        src: 'Jinoiy huquqiy yordam to\'g\'risidagi shartnoma' }
    ],
    related: ['konsullik', 'shartnoma', 'huquqiy-yordam']
  },
  {
    id: 'embargo',
    term: { lat: 'Embargo', cyr: 'Эмбарго' },
    pron:  { lat: '[em-bár-go]', cyr: '[эм-ба́р-го]' },
    cat: '03',
    origin: { lang: 'Ispan', word: 'embargo', mean: '“taqiq, to\'sqinlik”' },
    def:   { lat: 'Bir yoki bir guruh davlatlar tomonidan boshqa davlatga nisbatan tovarlar, xizmatlar yoki kapital harakatini cheklash yoki to\'liq taqiqlashga qaratilgan iqtisodiy chora.',
             cyr: 'Бир ёки бир гуруҳ давлатлар томонидан бошқа давлатга нисбатан товарлар, хизматлар ёки капитал ҳаракатини чеклаш ёки тўлиқ тақиқлашга қаратилган иқтисодий чора.' },
    trans: { ru: 'Эмбарго', en: 'Embargo' },
    examples: [
      { lat: 'Xavfsizlik Kengashi qurol-yarog\' eksportiga embargo joriy qildi.',
        cyr: 'Хавфсизлик Кенгаши қурол-яроғ экспортига эмбарго жорий қилди.',
        src: 'BMT Xavfsizlik Kengashi rezolyutsiyasi' }
    ],
    related: ['sanksiya', 'blokada', 'protektsionizm']
  },
  {
    id: 'elchi',
    term: { lat: 'Elchi', cyr: 'Элчи' },
    pron:  { lat: '[el-čí]', cyr: '[эл-чи́]' },
    cat: '02',
    origin: { lang: 'Turkiy', word: 'elči', mean: '“xabar yetkazuvchi, vakil”' },
    def:   { lat: 'Bir davlatning boshqa davlatdagi eng yuqori darajadagi doimiy diplomatik vakili. Elchi o\'z hukumati nomidan ish yuritadi va o\'z davlati manfaatlarini himoya qiladi.',
             cyr: 'Бир давлатнинг бошқа давлатдаги энг юқори даражадаги доимий дипломатик вакили. Элчи ўз ҳукумати номидан иш юритади ва ўз давлати манфаатларини ҳимоя қилади.' },
    trans: { ru: 'Посол', en: 'Ambassador' },
    examples: [
      { lat: 'Yangi tayinlangan elchi ishonchnomasini topshirdi.',
        cyr: 'Янги тайинланган элчи ишончномасини топширди.',
        src: 'Vena konventsiyasi, 1961 — 14-modda' }
    ],
    related: ['agrement', 'akkreditatsiya', 'ishonchnoma']
  },
  {
    id: 'ishonchnoma',
    term: { lat: 'Ishonchnoma', cyr: 'Ишончнома' },
    pron:  { lat: '[i-šónč-no-ma]', cyr: '[и-шо́нч-но-ма]' },
    cat: '02',
    origin: { lang: 'O\'zbek', word: 'ishonch + noma', mean: '“ishonch hujjati”' },
    def:   { lat: 'Davlat rahbari tomonidan diplomatik vakilga beriladigan rasmiy hujjat. Bu hujjat orqali vakil qabul qiluvchi davlatda ishonchli vakolatga ega bo\'ladi.',
             cyr: 'Давлат раҳбари томонидан дипломатик вакилга бериладиган расмий ҳужжат. Бу ҳужжат орқали вакил қабул қилувчи давлатда ишончли ваколатга эга бўлади.' },
    trans: { ru: 'Верительная грамота', en: 'Letter of Credence' },
    examples: [
      { lat: 'Ishonchnoma topshirish marosimi prezident saroyida o\'tkazildi.',
        cyr: 'Ишончнома топшириш маросими президент саройида ўтказилди.',
        src: 'Diplomatik protokol qoidalari' }
    ],
    related: ['elchi', 'akkreditatsiya', 'agrement']
  },
  {
    id: 'konsensus',
    term: { lat: 'Konsensus', cyr: 'Консенсус' },
    pron:  { lat: '[kon-sén-sus]', cyr: '[кон-се́н-сус]' },
    cat: '06',
    origin: { lang: 'Lotin', word: 'consensus', mean: '“kelishuv, umumiy fikr”' },
    def:   { lat: 'Xalqaro muzokaralarda ovoz berishsiz, ochiq qarshilik bo\'lmagan holda umumiy kelishuvga erishish usuli. Konsensus — manfaatlarni muvofiqlashtirishning oliy shakllaridan biri.',
             cyr: 'Халқаро музокараларда овоз беришсиз, очиқ қаршилик бўлмаган ҳолда умумий келишувга эришиш усули. Консенсус — манфаатларни мувофиқлаштиришнинг олий шаклларидан бири.' },
    trans: { ru: 'Консенсус', en: 'Consensus' },
    examples: [
      { lat: 'Hujjat ishtirokchi davlatlar konsensusi bilan qabul qilindi.',
        cyr: 'Ҳужжат иштирокчи давлатлар консенсуси билан қабул қилинди.',
        src: 'YEXHT yakuniy hujjati' }
    ],
    related: ['muzokara', 'shartnoma', 'kompromiss']
  },
  {
    id: 'konsullik',
    term: { lat: 'Konsullik', cyr: 'Консуллик' },
    pron:  { lat: '[kon-sul-lík]', cyr: '[кон-сул-ли́к]' },
    cat: '07',
    origin: { lang: 'Lotin', word: 'consul', mean: '“maslahatchi, vakil”' },
    def:   { lat: 'Bir davlatning boshqa davlatdagi fuqarolari, savdo manfaatlari va boshqa rasmiy ishlarini yurituvchi muassasa. Konsullik elchixonadan farqli ravishda asosan ma\'muriy va xizmat masalalari bilan shug\'ullanadi.',
             cyr: 'Бир давлатнинг бошқа давлатдаги фуқаролари, савдо манфаатлари ва бошқа расмий ишларини юритувчи муассаса. Консуллик элчихонадан фарқли равишда асосан маъмурий ва хизмат масалалари билан шуғулланади.' },
    trans: { ru: 'Консульство', en: 'Consulate' },
    examples: [
      { lat: 'Bosh konsullik vizalar va fuqarolik masalalari bilan shug\'ullanadi.',
        cyr: 'Бош консуллик визалар ва фуқаролик масалалари билан шуғулланади.',
        src: 'Vena konsullik konventsiyasi, 1963' }
    ],
    related: ['elchixona', 'viza', 'fuqarolik']
  },
  {
    id: 'multilateral',
    term: { lat: 'Multilateral diplomatiya', cyr: 'Мультилатерал дипломатия' },
    pron:  { lat: '[mul-ti-la-te-rál]', cyr: '[мул-ти-ла-те-ра́л]' },
    cat: '06',
    origin: { lang: 'Lotin', word: 'multi + lateralis', mean: '“ko\'p tomonli”' },
    def:   { lat: 'Uch yoki undan ortiq davlatlar ishtirokida olib boriladigan diplomatik faoliyat. Asosan xalqaro tashkilotlar, anjumanlar va konferensiyalar doirasida amalga oshiriladi.',
             cyr: 'Уч ёки ундан ортиқ давлатлар иштирокида олиб бориладиган дипломатик фаолият. Асосан халқаро ташкилотлар, анжуманлар ва конференциялар доирасида амалга оширилади.' },
    trans: { ru: 'Многосторонняя дипломатия', en: 'Multilateral diplomacy' },
    examples: [
      { lat: 'Multilateral muzokaralar BMT shtab-kvartirasida bo\'lib o\'tdi.',
        cyr: 'Мультилатерал музокаралар БМТ штаб-квартирасида бўлиб ўтди.',
        src: 'BMT yillik hisoboti' }
    ],
    related: ['bilateral', 'BMT', 'konferensiya']
  },
  {
    id: 'nota',
    term: { lat: 'Nota', cyr: 'Нота' },
    pron:  { lat: '[nó-ta]', cyr: '[но́-та]' },
    cat: '02',
    origin: { lang: 'Lotin', word: 'nota', mean: '“yozma belgi, xabar”' },
    def:   { lat: 'Bir davlat tashqi ishlar vazirligi yoki diplomatik vakolatxonasi tomonidan boshqa davlatga yo\'llanadigan rasmiy yozma murojaat. Nota turlari: shaxsiy nota, verbal nota, kollektiv nota.',
             cyr: 'Бир давлат ташқи ишлар вазирлиги ёки дипломатик ваколатхонаси томонидан бошқа давлатга йўлланадиган расмий ёзма мурожаат. Нота турлари: шахсий нота, вербал нота, коллектив нота.' },
    trans: { ru: 'Нота', en: 'Note' },
    examples: [
      { lat: 'Verbal nota orqali tashrif tafsilotlari kelishildi.',
        cyr: 'Вербал нота орқали ташриф тафсилотлари келишилди.',
        src: 'Diplomatik yozishmalar bo\'yicha qo\'llanma' }
    ],
    related: ['verbal-nota', 'demarsh', 'memorandum']
  },
  {
    id: 'persona-non-grata',
    term: { lat: 'Persona non grata', cyr: 'Персона нон грата' },
    pron:  { lat: '[per-só-na non grá-ta]', cyr: '[пер-со́-на нон гра́-та]' },
    cat: '02',
    origin: { lang: 'Lotin', word: 'persona non grata', mean: '“istalmagan shaxs”' },
    def:   { lat: 'Qabul qiluvchi davlat tomonidan istalmagan deb e\'lon qilingan diplomatik vakil. Bunday shaxs qisqa muddat ichida mamlakatni tark etishi shart. Vena konventsiyasining 9-moddasida nazarda tutilgan.',
             cyr: 'Қабул қилувчи давлат томонидан исталмаган деб эълон қилинган дипломатик вакил. Бундай шахс қисқа муддат ичида мамлакатни тарк этиши шарт. Вена конвенциясининг 9-моддасида назарда тутилган.' },
    trans: { ru: 'Персона нон грата', en: 'Persona non grata' },
    examples: [
      { lat: 'Diplomat persona non grata deb e\'lon qilindi va 72 soat ichida mamlakatni tark etdi.',
        cyr: 'Дипломат персона нон грата деб эълон қилинди ва 72 соат ичида мамлакатни тарк этди.',
        src: 'Vena konventsiyasi, 1961 — 9-modda' }
    ],
    related: ['demarsh', 'agrement', 'immunitet']
  },
  {
    id: 'protokol',
    term: { lat: 'Diplomatik protokol', cyr: 'Дипломатик протокол' },
    pron:  { lat: '[pro-to-kól]', cyr: '[про-то-ко́л]' },
    cat: '02',
    origin: { lang: 'Yunon', word: 'protokollon', mean: '“birinchi varaq, dastlabki yozuv”' },
    def:   { lat: 'Davlat tadbirlari va xalqaro muloqotda qabul qilingan rasmiy odob va tartib qoidalari majmui. Protokol — mamlakatlar va vakillar o\'rtasidagi tenglik va o\'zaro hurmat tamoyillariga asoslanadi.',
             cyr: 'Давлат тадбирлари ва халқаро мулоқотда қабул қилинган расмий одоб ва тартиб қоидалари мажмуи. Протокол — мамлакатлар ва вакиллар ўртасидаги тенглик ва ўзаро ҳурмат тамойилларига асосланади.' },
    trans: { ru: 'Дипломатический протокол', en: 'Diplomatic Protocol' },
    examples: [
      { lat: 'Davlat tashrifi diplomatik protokol asosida tashkil etildi.',
        cyr: 'Давлат ташрифи дипломатик протокол асосида ташкил этилди.',
        src: 'Davlat protokoli qoidalari to\'plami' }
    ],
    related: ['eteket', 'ceremoniya', 'davlat-tashrifi']
  },
  {
    id: 'ratifikatsiya',
    term: { lat: 'Ratifikatsiya', cyr: 'Ратификация' },
    pron:  { lat: '[ra-ti-fi-kát-si-ya]', cyr: '[ра-ти-фи-ка́т-си-я]' },
    cat: '01',
    origin: { lang: 'Lotin', word: 'ratificatio', mean: '“tasdiqlash”' },
    def:   { lat: 'Davlat tomonidan imzolangan xalqaro shartnomaning oliy davlat hokimiyati organi (parlament) tomonidan rasman tasdiqlanishi. Ratifikatsiyadan so\'ng shartnoma huquqiy kuchga ega bo\'ladi.',
             cyr: 'Давлат томонидан имзоланган халқаро шартноманинг олий давлат ҳокимияти органи (парламент) томонидан расман тасдиқланиши. Ратификациядан сўнг шартнома ҳуқуқий кучга эга бўлади.' },
    trans: { ru: 'Ратификация', en: 'Ratification' },
    examples: [
      { lat: 'Parlament konventsiyani ratifikatsiya qildi va u yuridik kuchga kirdi.',
        cyr: 'Парламент конвенцияни ратификация қилди ва у юридик кучга кирди.',
        src: 'Vena konventsiyasi shartnomalar huquqi to\'g\'risida, 1969' }
    ],
    related: ['shartnoma', 'denonsatsiya', 'konventsiya']
  },
  {
    id: 'sanksiya',
    term: { lat: 'Sanksiya', cyr: 'Санкция' },
    pron:  { lat: '[san-kt-síy-ya]', cyr: '[санк-ци́-я]' },
    cat: '03',
    origin: { lang: 'Lotin', word: 'sanctio', mean: '“qat\'iy ko\'rsatma, jazo”' },
    def:   { lat: 'Xalqaro huquq normalarini buzgan davlatga nisbatan qo\'llaniladigan iqtisodiy, siyosiy yoki diplomatik chora. Sanksiyalar bir tomonlama yoki BMT Xavfsizlik Kengashi qarori asosida joriy etiladi.',
             cyr: 'Халқаро ҳуқуқ нормаларини бузган давлатга нисбатан қўлланиладиган иқтисодий, сиёсий ёки дипломатик чора. Санкциялар бир томонлама ёки БМТ Хавфсизлик Кенгаши қарори асосида жорий этилади.' },
    trans: { ru: 'Санкция', en: 'Sanction' },
    examples: [
      { lat: 'Maqsadli sanksiyalar muayyan shaxslar va tashkilotlarga qarshi qo\'llanildi.',
        cyr: 'Мақсадли санкциялар муайян шахслар ва ташкилотларга қарши қўлланилди.',
        src: 'BMT Xavfsizlik Kengashi rezolyutsiyalari' }
    ],
    related: ['embargo', 'blokada', 'BMT']
  },
  {
    id: 'shartnoma',
    term: { lat: 'Shartnoma', cyr: 'Шартнома' },
    pron:  { lat: '[šart-no-má]', cyr: '[шарт-но-ма́]' },
    cat: '06',
    origin: { lang: 'O\'zbek', word: 'shart + noma', mean: '“shartlar yozuvi”' },
    def:   { lat: 'Ikki yoki undan ortiq xalqaro huquq sub\'ektlari o\'rtasida xalqaro huquq normalari asosida tuzilgan rasmiy yozma kelishuv. Shartnoma — xalqaro huquqning asosiy manbalaridan biri.',
             cyr: 'Икки ёки ундан ортиқ халқаро ҳуқуқ субъектлари ўртасида халқаро ҳуқуқ нормалари асосида тузилган расмий ёзма келишув. Шартнома — халқаро ҳуқуқнинг асосий манбаларидан бири.' },
    trans: { ru: 'Договор', en: 'Treaty' },
    examples: [
      { lat: 'Hamkorlik to\'g\'risidagi shartnoma poytaxtda imzolandi.',
        cyr: 'Ҳамкорлик тўғрисидаги шартнома пойтахтда имзоланди.',
        src: 'Vena konventsiyasi shartnomalar huquqi to\'g\'risida, 1969' }
    ],
    related: ['ratifikatsiya', 'memorandum', 'konventsiya']
  },
  {
    id: 'suverenitet',
    term: { lat: 'Suverenitet', cyr: 'Суверенитет' },
    pron:  { lat: '[su-ve-re-ni-tét]', cyr: '[су-ве-ре-ни-те́т]' },
    cat: '01',
    origin: { lang: 'Frantsuz', word: 'souveraineté', mean: '“oliy hokimlik”' },
    def:   { lat: 'Davlatning o\'z hududida oliy va mustaqil hokimiyatga ega bo\'lishi va xalqaro maydonda boshqa davlatlardan mustaqil ravishda harakat qilishi. Suverenitet — zamonaviy davlatchilikning asosiy belgisi.',
             cyr: 'Давлатнинг ўз ҳудудида олий ва мустақил ҳокимиятга эга бўлиши ва халқаро майдонда бошқа давлатлардан мустақил равишда ҳаракат қилиши. Суверенитет — замонавий давлатчиликнинг асосий белгиси.' },
    trans: { ru: 'Суверенитет', en: 'Sovereignty' },
    examples: [
      { lat: 'Davlatlar suvereniteti va hududiy yaxlitligi xalqaro huquqning asosi hisoblanadi.',
        cyr: 'Давлатлар суверенитети ва ҳудудий яхлитлиги халқаро ҳуқуқнинг асоси ҳисобланади.',
        src: 'BMT Nizomi, 2-modda' }
    ],
    related: ['anneksiya', 'protektorat', 'territorial-yaxlitlik']
  },
  {
    id: 'verbal-nota',
    term: { lat: 'Verbal nota', cyr: 'Вербал нота' },
    pron:  { lat: '[ver-bál nó-ta]', cyr: '[вер-ба́л но́-та]' },
    cat: '02',
    origin: { lang: 'Lotin', word: 'verbalis', mean: '“og\'zaki, so\'zga oid”' },
    def:   { lat: 'Diplomatik aloqalarda eng ko\'p qo\'llaniladigan rasmiy yozma murojaat shakli; uchinchi shaxsda yoziladi va imzolanmaydi, faqat muhrlanadi.',
             cyr: 'Дипломатик алоқаларда энг кўп қўлланиладиган расмий ёзма мурожаат шакли; учинчи шахсда ёзилади ва имзоланмайди, фақат муҳрланади.' },
    trans: { ru: 'Вербальная нота', en: 'Note Verbale' },
    examples: [
      { lat: 'Vakolatxona verbal nota orqali so\'rovini rasmiylashtirildi.',
        cyr: 'Ваколатхона вербал нота орқали сўровини расмийлаштирилди.',
        src: 'Diplomatik yozishmalar bo\'yicha qo\'llanma' }
    ],
    related: ['nota', 'demarsh', 'memorandum']
  },
  {
    id: 'viza',
    term: { lat: 'Viza', cyr: 'Виза' },
    pron:  { lat: '[ví-za]', cyr: '[ви́-за]' },
    cat: '07',
    origin: { lang: 'Lotin', word: 'visa (charta)', mean: '“ko\'rilgan (hujjat)”' },
    def:   { lat: 'Chet el fuqarosining muayyan davlatga kirishi, undan o\'tishi yoki vaqtincha yashashi uchun beriladigan rasmiy ruxsatnoma. Viza pasportga belgi yoki alohida hujjat shaklida rasmiylashtiriladi.',
             cyr: 'Чет эл фуқаросининг муайян давлатга кириши, ундан ўтиши ёки вақтинча яшаши учун бериладиган расмий рухсатнома. Виза паспортга белги ёки алоҳида ҳужжат шаклида расмийлаштирилади.' },
    trans: { ru: 'Виза', en: 'Visa' },
    examples: [
      { lat: 'Viza rejimi soddalashtirilganidan so\'ng turistlar oqimi sezilarli oshdi.',
        cyr: 'Виза режими соддалаштирилганидан сўнг туристлар оқими сезиларли ошди.',
        src: 'Konsullik kelishuvi' }
    ],
    related: ['konsullik', 'pasport', 'fuqarolik']
  }
];

// Pre-sort by Latin term
window.TERMS.sort((a, b) => a.term.lat.localeCompare(b.term.lat, 'uz-Latn'));

window.WORD_OF_DAY_ID = 'persona-non-grata';

window.RECENT_IDS = ['agrement', 'ratifikatsiya', 'demarsh', 'multilateral', 'suverenitet'];
