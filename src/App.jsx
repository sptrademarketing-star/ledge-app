import { useState, useEffect, useRef } from "react";

const CATS = [
  { label:"Food & Dining",  emoji:"🍔", color:"#FF6B35", bg:"#FFF0EB" },
  { label:"Transport",      emoji:"🚗", color:"#4DABF7", bg:"#E8F4FF" },
  { label:"Groceries",      emoji:"🛒", color:"#51CF66", bg:"#EDFAF1" },
  { label:"Health",         emoji:"🏥", color:"#FF6B6B", bg:"#FFF0F0" },
  { label:"Entertainment",  emoji:"🎬", color:"#9B59B6", bg:"#F5EEFB" },
  { label:"Housing",        emoji:"🏠", color:"#45B7D1", bg:"#EBF8FC" },
  { label:"Shopping",       emoji:"👗", color:"#F39C12", bg:"#FEF9E7" },
  { label:"Travel",         emoji:"✈️", color:"#1ABC9C", bg:"#E8F8F5" },
  { label:"Education",      emoji:"📚", color:"#E67E22", bg:"#FEF5EC" },
  { label:"Tech",           emoji:"💻", color:"#2ECC71", bg:"#EAFAF1" },
  { label:"Personal Care",  emoji:"💅", color:"#E91E63", bg:"#FCE4EC" },
  { label:"Savings",        emoji:"💰", color:"#4CAF50", bg:"#E8F5E9" },
  { label:"Other",          emoji:"❓", color:"#95A5A6", bg:"#F2F3F4" },
];

const CURRENCIES = [
  {code:"AED",symbol:"د.إ",flag:"🇦🇪"},{code:"AFN",symbol:"؋",flag:"🇦🇫"},{code:"ALL",symbol:"L",flag:"🇦🇱"},{code:"AMD",symbol:"֏",flag:"🇦🇲"},
  {code:"AOA",symbol:"Kz",flag:"🇦🇴"},{code:"ARS",symbol:"$",flag:"🇦🇷"},{code:"AUD",symbol:"A$",flag:"🇦🇺"},{code:"AZN",symbol:"₼",flag:"🇦🇿"},
  {code:"BAM",symbol:"KM",flag:"🇧🇦"},{code:"BBD",symbol:"Bds$",flag:"🇧🇧"},{code:"BDT",symbol:"৳",flag:"🇧🇩"},{code:"BGN",symbol:"лв",flag:"🇧🇬"},
  {code:"BHD",symbol:".د.ب",flag:"🇧🇭"},{code:"BIF",symbol:"Fr",flag:"🇧🇮"},{code:"BND",symbol:"$",flag:"🇧🇳"},{code:"BOB",symbol:"Bs",flag:"🇧🇴"},
  {code:"BRL",symbol:"R$",flag:"🇧🇷"},{code:"BTN",symbol:"Nu",flag:"🇧🇹"},{code:"BWP",symbol:"P",flag:"🇧🇼"},{code:"BYN",symbol:"Br",flag:"🇧🇾"},
  {code:"BZD",symbol:"BZ$",flag:"🇧🇿"},{code:"CAD",symbol:"CA$",flag:"🇨🇦"},{code:"CHF",symbol:"Fr",flag:"🇨🇭"},{code:"CLP",symbol:"$",flag:"🇨🇱"},
  {code:"CNY",symbol:"¥",flag:"🇨🇳"},{code:"COP",symbol:"$",flag:"🇨🇴"},{code:"CRC",symbol:"₡",flag:"🇨🇷"},{code:"CVE",symbol:"$",flag:"🇨🇻"},
  {code:"CZK",symbol:"Kč",flag:"🇨🇿"},{code:"DJF",symbol:"Fr",flag:"🇩🇯"},{code:"DKK",symbol:"kr",flag:"🇩🇰"},{code:"DOP",symbol:"RD$",flag:"🇩🇴"},
  {code:"DZD",symbol:"دج",flag:"🇩🇿"},{code:"EGP",symbol:"£",flag:"🇪🇬"},{code:"ERN",symbol:"Nfk",flag:"🇪🇷"},{code:"ETB",symbol:"Br",flag:"🇪🇹"},
  {code:"EUR",symbol:"€",flag:"🇪🇺"},{code:"FJD",symbol:"FJ$",flag:"🇫🇯"},{code:"GBP",symbol:"£",flag:"🇬🇧"},{code:"GEL",symbol:"₾",flag:"🇬🇪"},
  {code:"GHS",symbol:"₵",flag:"🇬🇭"},{code:"GMD",symbol:"D",flag:"🇬🇲"},{code:"GNF",symbol:"Fr",flag:"🇬🇳"},{code:"GTQ",symbol:"Q",flag:"🇬🇹"},
  {code:"GYD",symbol:"$",flag:"🇬🇾"},{code:"HKD",symbol:"HK$",flag:"🇭🇰"},{code:"HNL",symbol:"L",flag:"🇭🇳"},{code:"HRK",symbol:"kn",flag:"🇭🇷"},
  {code:"HTG",symbol:"G",flag:"🇭🇹"},{code:"HUF",symbol:"Ft",flag:"🇭🇺"},{code:"IDR",symbol:"Rp",flag:"🇮🇩"},{code:"ILS",symbol:"₪",flag:"🇮🇱"},
  {code:"INR",symbol:"₹",flag:"🇮🇳"},{code:"IQD",symbol:"ع.د",flag:"🇮🇶"},{code:"IRR",symbol:"﷼",flag:"🇮🇷"},{code:"ISK",symbol:"kr",flag:"🇮🇸"},
  {code:"JMD",symbol:"J$",flag:"🇯🇲"},{code:"JOD",symbol:"د.ا",flag:"🇯🇴"},{code:"JPY",symbol:"¥",flag:"🇯🇵"},{code:"KES",symbol:"KSh",flag:"🇰🇪"},
  {code:"KGS",symbol:"лв",flag:"🇰🇬"},{code:"KHR",symbol:"៛",flag:"🇰🇭"},{code:"KMF",symbol:"Fr",flag:"🇰🇲"},{code:"KPW",symbol:"₩",flag:"🇰🇵"},
  {code:"KRW",symbol:"₩",flag:"🇰🇷"},{code:"KWD",symbol:"د.ك",flag:"🇰🇼"},{code:"KZT",symbol:"₸",flag:"🇰🇿"},{code:"LAK",symbol:"₭",flag:"🇱🇦"},
  {code:"LBP",symbol:"ل.ل",flag:"🇱🇧"},{code:"LKR",symbol:"₨",flag:"🇱🇰"},{code:"LRD",symbol:"$",flag:"🇱🇷"},{code:"LSL",symbol:"L",flag:"🇱🇸"},
  {code:"LYD",symbol:"ل.د",flag:"🇱🇾"},{code:"MAD",symbol:"د.م.",flag:"🇲🇦"},{code:"MGA",symbol:"Ar",flag:"🇲🇬"},{code:"MKD",symbol:"ден",flag:"🇲🇰"},
  {code:"MMK",symbol:"K",flag:"🇲🇲"},{code:"MNT",symbol:"₮",flag:"🇲🇳"},{code:"MOP",symbol:"P",flag:"🇲🇴"},{code:"MRU",symbol:"UM",flag:"🇲🇷"},
  {code:"MUR",symbol:"₨",flag:"🇲🇺"},{code:"MVR",symbol:"Rf",flag:"🇲🇻"},{code:"MWK",symbol:"MK",flag:"🇲🇼"},{code:"MXN",symbol:"$",flag:"🇲🇽"},
  {code:"MXV",symbol:"MXV",flag:"🇲🇽"},{code:"MYR",symbol:"RM",flag:"🇲🇾"},{code:"MZN",symbol:"MT",flag:"🇲🇿"},{code:"NAD",symbol:"$",flag:"🇳🇦"},
  {code:"NGN",symbol:"₦",flag:"🇳🇬"},{code:"NIO",symbol:"C$",flag:"🇳🇮"},{code:"NOK",symbol:"kr",flag:"🇳🇴"},{code:"NPR",symbol:"₨",flag:"🇳🇵"},
  {code:"NZD",symbol:"NZ$",flag:"🇳🇿"},{code:"OMR",symbol:"﷼",flag:"🇴🇲"},{code:"PAB",symbol:"B/.",flag:"🇵🇦"},{code:"PEN",symbol:"S/",flag:"🇵🇪"},
  {code:"PGK",symbol:"K",flag:"🇵🇬"},{code:"PHP",symbol:"₱",flag:"🇵🇭"},{code:"PKR",symbol:"₨",flag:"🇵🇰"},{code:"PLN",symbol:"zł",flag:"🇵🇱"},
  {code:"PYG",symbol:"₲",flag:"🇵🇾"},{code:"QAR",symbol:"﷼",flag:"🇶🇦"},{code:"RON",symbol:"lei",flag:"🇷🇴"},{code:"RSD",symbol:"din",flag:"🇷🇸"},
  {code:"RUB",symbol:"₽",flag:"🇷🇺"},{code:"RWF",symbol:"Fr",flag:"🇷🇼"},{code:"SAR",symbol:"﷼",flag:"🇸🇦"},{code:"SBD",symbol:"SI$",flag:"🇸🇧"},
  {code:"SCR",symbol:"₨",flag:"🇸🇨"},{code:"SDG",symbol:"£",flag:"🇸🇩"},{code:"SEK",symbol:"kr",flag:"🇸🇪"},{code:"SGD",symbol:"S$",flag:"🇸🇬"},
  {code:"SLL",symbol:"Le",flag:"🇸🇱"},{code:"SOS",symbol:"Sh",flag:"🇸🇴"},{code:"SRD",symbol:"$",flag:"🇸🇷"},{code:"STN",symbol:"Db",flag:"🇸🇹"},
  {code:"SYP",symbol:"£",flag:"🇸🇾"},{code:"SZL",symbol:"L",flag:"🇸🇿"},{code:"THB",symbol:"฿",flag:"🇹🇭"},{code:"TJS",symbol:"SM",flag:"🇹🇯"},
  {code:"TMT",symbol:"T",flag:"🇹🇲"},{code:"TND",symbol:"د.ت",flag:"🇹🇳"},{code:"TOP",symbol:"T$",flag:"🇹🇴"},{code:"TRY",symbol:"₺",flag:"🇹🇷"},
  {code:"TTD",symbol:"TT$",flag:"🇹🇹"},{code:"TWD",symbol:"NT$",flag:"🇹🇼"},{code:"TZS",symbol:"TSh",flag:"🇹🇿"},{code:"UAH",symbol:"₴",flag:"🇺🇦"},
  {code:"UGX",symbol:"USh",flag:"🇺🇬"},{code:"USD",symbol:"$",flag:"🇺🇸"},{code:"UYU",symbol:"$U",flag:"🇺🇾"},{code:"UZS",symbol:"сум",flag:"🇺🇿"},
  {code:"VES",symbol:"Bs.S",flag:"🇻🇪"},{code:"VND",symbol:"₫",flag:"🇻🇳"},{code:"VUV",symbol:"Vt",flag:"🇻🇺"},{code:"WST",symbol:"WS$",flag:"🇼🇸"},
  {code:"XAF",symbol:"CFA",flag:"🇨🇲"},{code:"XCD",symbol:"EC$",flag:"🇦🇬"},{code:"XOF",symbol:"CFA",flag:"🇸🇳"},{code:"YER",symbol:"﷼",flag:"🇾🇪"},
  {code:"ZAR",symbol:"R",flag:"🇿🇦"},{code:"ZMW",symbol:"ZK",flag:"🇿🇲"},
];

const AICONS = ["💳","🏦","💼","🏠","✈️","🎓","💊","🛒","🎬","💰","🚗","📱"];
const ACOLORS = ["#0F1F3D","#2D6A4F","#9B4DCA","#C0392B","#D4700A","#0077B6","#2C7873","#6D4C41","#1A535C","#4A1942"];
const FREQS = ["daily","weekly","monthly","yearly"];

const LANGS = [
  {code:"en",name:"English",   flag:"🇬🇧",dir:"ltr",locale:"en-US",abbr:"EN"},
  {code:"fr",name:"Français",  flag:"🇫🇷",dir:"ltr",locale:"fr-FR",abbr:"FR"},
  {code:"ar",name:"العربية",   flag:"🇦🇪",dir:"rtl",locale:"ar-AE",abbr:"AR"},
  {code:"vi",name:"Tiếng Việt",flag:"🇻🇳",dir:"ltr",locale:"vi-VN",abbr:"VN"},
  {code:"es",name:"Español",   flag:"🇪🇸",dir:"ltr",locale:"es-ES",abbr:"ES"},
];

const TX = {
  en:{
    t:["Accounts","Overview","Records","Budget","Recurring","Stats"],
    addAcct:"Add Account",myAccts:"My Accounts",summary:"Account Summary",
    totalExp:"Total expenses",thisMonth:"This month",clearExp:"Clear expenses",
    active:"● ACTIVE",spent:"total spent",noExp:"no expenses",
    structure:"Expenses structure",last30:"LAST 30 DAYS",more:"SHOW MORE",
    viewAll:"VIEW ALL",lastRec:"Last records",noYet:"No expenses yet",
    allRec:"All Records",searchPh:"Search expenses…",allMonths:"All months",
    allCats:"All",showAll:"SHOW ALL",noRes:"No results.",
    budgets:"Monthly Budgets",add:"+ Add",setLim:"Set limit",
    unbudget:"Unbudgeted",allBudget:"All categories have budgets 🎉",
    overBy:"Over by",remain:"remaining",
    recurTitle:"Recurring Expenses",noRecur:"No recurring expenses yet.",
    howWorks:"How it works",autoLog:"Auto-logged",onDue:"On each due date",
    markedAs:"Marked as",rbadge:"🔁 recurring",nextChk:"Next check",onOpen:"On app open",
    s7day:"7-Day Spending",last7:"LAST 7 DAYS",sMonth:"This Month",byCats:"By categories:",noData:"No expenses this month.",
    addTo:"Add to",vhint:"Voice: auto-parses · Typing: press Enter",
    shint:"start typing or dictating",parsing:"parsing…",
    parse:"Parse →",cancel:"Cancel",manual:"Manual",back:"← Back",
    confirm:"Confirm Expense",addExp:"Add Expense",
    desc:"Description",amt:"Amount",cur2:"Currency",cat2:"Category",
    date2:"Date",descPh:"e.g. Bread, Coffee, Netflix",
    newAcct:"New Account",editAcct:"Edit Account",
    aname:"Account Name",aph:"e.g. Personal, Travel, Business",
    icon:"Icon",color:"Color",save:"Save Changes",create:"Create Account",
    setBudget:"Set Monthly Budget",mLim:"Monthly Limit",saveBud:"Save Budget",budRepl:"Current limit will be replaced.",
    newRec:"New Recurring",editRec:"Edit Recurring",freq:"Frequency",nextD:"Next date",addRec:"Add Recurring",
    daily:"Daily",weekly:"Weekly",monthly:"Monthly",yearly:"Yearly",
    lang:"Language",allTime:"All Time",actAcct:"Active Account",
    edit:"✎ Edit",del:"✕ Delete",name:"Name",currency:"Currency",
    c:{"Food & Dining":"Food & Dining","Transport":"Transport","Groceries":"Groceries","Health":"Health","Entertainment":"Entertainment","Housing":"Housing","Shopping":"Shopping","Travel":"Travel","Education":"Education","Tech":"Tech","Personal Care":"Personal Care","Savings":"Savings","Other":"Other"}
  },
  fr:{
    t:["Comptes","Aperçu","Dépenses","Budget","Récurrents","Stats"],
    addAcct:"Ajouter compte",myAccts:"Mes comptes",summary:"Résumé",
    totalExp:"Total dépenses",thisMonth:"Ce mois",clearExp:"Effacer dépenses",
    active:"● ACTIF",spent:"total dépensé",noExp:"aucune dépense",
    structure:"Structure dépenses",last30:"30 DERNIERS JOURS",more:"VOIR PLUS",
    viewAll:"VOIR TOUT",lastRec:"Dernières dépenses",noYet:"Aucune dépense",
    allRec:"Toutes dépenses",searchPh:"Rechercher…",allMonths:"Tous mois",
    allCats:"Tout",showAll:"TOUT AFFICHER",noRes:"Aucun résultat.",
    budgets:"Budgets mensuels",add:"+ Ajouter",setLim:"Fixer limite",
    unbudget:"Sans budget",allBudget:"Toutes catégories ont un budget 🎉",
    overBy:"Dépassé de",remain:"restant",
    recurTitle:"Dépenses récurrentes",noRecur:"Aucune dépense récurrente.",
    howWorks:"Fonctionnement",autoLog:"Enreg. auto",onDue:"À chaque échéance",
    markedAs:"Marqué comme",rbadge:"🔁 récurrent",nextChk:"Prochain contrôle",onOpen:"À l'ouverture",
    s7day:"7 derniers jours",last7:"7 DERNIERS JOURS",sMonth:"Ce mois-ci",byCats:"Par catégories :",noData:"Aucune dépense ce mois.",
    addTo:"Ajouter à",vhint:"Voix: auto · Clavier: Entrée",
    shint:"parlez ou tapez",parsing:"analyse…",
    parse:"Analyser →",cancel:"Annuler",manual:"Manuel",back:"← Retour",
    confirm:"Confirmer",addExp:"Ajouter",
    desc:"Description",amt:"Montant",cur2:"Devise",cat2:"Catégorie",
    date2:"Date",descPh:"ex. Pain, Café, Netflix",
    newAcct:"Nouveau compte",editAcct:"Modifier compte",
    aname:"Nom du compte",aph:"ex. Personnel, Voyage, Pro",
    icon:"Icône",color:"Couleur",save:"Enregistrer",create:"Créer",
    setBudget:"Budget mensuel",mLim:"Limite mensuelle",saveBud:"Enregistrer",budRepl:"La limite actuelle sera remplacée.",
    newRec:"Nouveau récurrent",editRec:"Modifier",freq:"Fréquence",nextD:"Prochaine date",addRec:"Ajouter",
    daily:"Quotidien",weekly:"Hebdomadaire",monthly:"Mensuel",yearly:"Annuel",
    lang:"Langue",allTime:"Total",actAcct:"Compte actif",
    edit:"✎ Modifier",del:"✕ Supprimer",name:"Nom",currency:"Devise",
    c:{"Food & Dining":"Alimentation","Transport":"Transport","Groceries":"Courses","Health":"Santé","Entertainment":"Divertissement","Housing":"Logement","Shopping":"Shopping","Travel":"Voyage","Education":"Éducation","Tech":"Technologie","Personal Care":"Soins","Savings":"Épargne","Other":"Autre"}
  },
  ar:{
    t:["الحسابات","نظرة عامة","السجلات","الميزانية","المتكررة","إحصاء"],
    addAcct:"إضافة حساب",myAccts:"حساباتي",summary:"ملخص الحساب",
    totalExp:"إجمالي المصروفات",thisMonth:"هذا الشهر",clearExp:"مسح المصروفات",
    active:"● نشط",spent:"إجمالي الإنفاق",noExp:"لا مصروفات",
    structure:"هيكل المصروفات",last30:"آخر ٣٠ يومًا",more:"عرض المزيد",
    viewAll:"عرض الكل",lastRec:"آخر السجلات",noYet:"لا مصروفات بعد",
    allRec:"جميع السجلات",searchPh:"بحث…",allMonths:"كل الأشهر",
    allCats:"الكل",showAll:"عرض الكل",noRes:"لا نتائج.",
    budgets:"الميزانيات الشهرية",add:"+ إضافة",setLim:"تحديد حد",
    unbudget:"بدون ميزانية",allBudget:"جميع الفئات لها ميزانية 🎉",
    overBy:"تجاوز بمقدار",remain:"متبقي",
    recurTitle:"المصروفات المتكررة",noRecur:"لا مصروفات متكررة.",
    howWorks:"كيف يعمل",autoLog:"تسجيل تلقائي",onDue:"في كل موعد استحقاق",
    markedAs:"مُصنَّف كـ",rbadge:"🔁 متكرر",nextChk:"الفحص التالي",onOpen:"عند فتح التطبيق",
    s7day:"الإنفاق في ٧ أيام",last7:"آخر ٧ أيام",sMonth:"هذا الشهر",byCats:"حسب الفئات:",noData:"لا مصروفات هذا الشهر.",
    addTo:"إضافة إلى",vhint:"صوت: تلقائي · كتابة: Enter",
    shint:"ابدأ الكتابة أو الإملاء",parsing:"جارٍ التحليل…",
    parse:"تحليل →",cancel:"إلغاء",manual:"يدوي",back:"→ رجوع",
    confirm:"تأكيد المصروف",addExp:"إضافة",
    desc:"الوصف",amt:"المبلغ",cur2:"العملة",cat2:"الفئة",
    date2:"التاريخ",descPh:"مثل: خبز، قهوة، نتفليكس",
    newAcct:"حساب جديد",editAcct:"تعديل الحساب",
    aname:"اسم الحساب",aph:"مثل: شخصي، سفر، عمل",
    icon:"الأيقونة",color:"اللون",save:"حفظ التغييرات",create:"إنشاء",
    setBudget:"الميزانية الشهرية",mLim:"الحد الشهري",saveBud:"حفظ",budRepl:"الحد الحالي سيتم استبداله.",
    newRec:"مصروف متكرر جديد",editRec:"تعديل",freq:"التكرار",nextD:"التاريخ التالي",addRec:"إضافة",
    daily:"يومي",weekly:"أسبوعي",monthly:"شهري",yearly:"سنوي",
    lang:"اللغة",allTime:"الإجمالي",actAcct:"الحساب النشط",
    edit:"✎ تعديل",del:"✕ حذف",name:"الاسم",currency:"العملة",
    c:{"Food & Dining":"طعام ومطاعم","Transport":"مواصلات","Groceries":"بقالة","Health":"صحة","Entertainment":"ترفيه","Housing":"سكن","Shopping":"تسوق","Travel":"سفر","Education":"تعليم","Tech":"تقنية","Personal Care":"عناية شخصية","Savings":"مدخرات","Other":"أخرى"}
  },
  vi:{
    t:["Tài khoản","Tổng quan","Giao dịch","Ngân sách","Định kỳ","Thống kê"],
    addAcct:"Thêm tài khoản",myAccts:"Tài khoản của tôi",summary:"Tóm tắt",
    totalExp:"Tổng chi tiêu",thisMonth:"Tháng này",clearExp:"Xóa chi tiêu",
    active:"● ĐANG DÙNG",spent:"tổng chi",noExp:"chưa có chi tiêu",
    structure:"Cơ cấu chi tiêu",last30:"30 NGÀY QUA",more:"XEM THÊM",
    viewAll:"XEM TẤT CẢ",lastRec:"Giao dịch gần đây",noYet:"Chưa có chi tiêu",
    allRec:"Tất cả giao dịch",searchPh:"Tìm kiếm…",allMonths:"Tất cả tháng",
    allCats:"Tất cả",showAll:"XEM HẾT",noRes:"Không tìm thấy.",
    budgets:"Ngân sách hàng tháng",add:"+ Thêm",setLim:"Đặt giới hạn",
    unbudget:"Chưa có ngân sách",allBudget:"Tất cả danh mục đã có ngân sách 🎉",
    overBy:"Vượt quá",remain:"còn lại",
    recurTitle:"Chi tiêu định kỳ",noRecur:"Chưa có chi tiêu định kỳ.",
    howWorks:"Cách hoạt động",autoLog:"Tự động ghi",onDue:"Vào ngày đến hạn",
    markedAs:"Được đánh dấu là",rbadge:"🔁 định kỳ",nextChk:"Lần kiểm tra tiếp",onOpen:"Khi mở app",
    s7day:"Chi tiêu 7 ngày",last7:"7 NGÀY QUA",sMonth:"Tháng này",byCats:"Theo danh mục:",noData:"Không có chi tiêu tháng này.",
    addTo:"Thêm vào",vhint:"Giọng nói: tự động · Gõ: nhấn Enter",
    shint:"bắt đầu gõ hoặc đọc",parsing:"đang phân tích…",
    parse:"Phân tích →",cancel:"Hủy",manual:"Thủ công",back:"← Quay lại",
    confirm:"Xác nhận chi tiêu",addExp:"Thêm chi tiêu",
    desc:"Mô tả",amt:"Số tiền",cur2:"Tiền tệ",cat2:"Danh mục",
    date2:"Ngày",descPh:"vd. Bánh mì, Cà phê, Netflix",
    newAcct:"Tài khoản mới",editAcct:"Sửa tài khoản",
    aname:"Tên tài khoản",aph:"vd. Cá nhân, Du lịch, Công việc",
    icon:"Biểu tượng",color:"Màu sắc",save:"Lưu thay đổi",create:"Tạo tài khoản",
    setBudget:"Ngân sách tháng",mLim:"Giới hạn tháng",saveBud:"Lưu ngân sách",budRepl:"Giới hạn hiện tại sẽ được thay thế.",
    newRec:"Chi tiêu định kỳ mới",editRec:"Sửa định kỳ",freq:"Tần suất",nextD:"Ngày tiếp theo",addRec:"Thêm định kỳ",
    daily:"Hàng ngày",weekly:"Hàng tuần",monthly:"Hàng tháng",yearly:"Hàng năm",
    lang:"Ngôn ngữ",allTime:"Tổng cộng",actAcct:"Tài khoản đang dùng",
    edit:"✎ Sửa",del:"✕ Xóa",name:"Tên",currency:"Tiền tệ",
    c:{"Food & Dining":"Ăn uống","Transport":"Di chuyển","Groceries":"Thực phẩm","Health":"Sức khỏe","Entertainment":"Giải trí","Housing":"Nhà ở","Shopping":"Mua sắm","Travel":"Du lịch","Education":"Giáo dục","Tech":"Công nghệ","Personal Care":"Chăm sóc cá nhân","Savings":"Tiết kiệm","Other":"Khác"}
  },
  es:{
    t:["Cuentas","Resumen","Registros","Presupuesto","Recurrentes","Stats"],
    addAcct:"Añadir cuenta",myAccts:"Mis cuentas",summary:"Resumen de cuenta",
    totalExp:"Total gastos",thisMonth:"Este mes",clearExp:"Borrar gastos",
    active:"● ACTIVA",spent:"total gastado",noExp:"sin gastos",
    structure:"Estructura de gastos",last30:"ÚLTIMOS 30 DÍAS",more:"VER MÁS",
    viewAll:"VER TODO",lastRec:"Últimos registros",noYet:"Sin gastos aún",
    allRec:"Todos los registros",searchPh:"Buscar gastos…",allMonths:"Todos los meses",
    allCats:"Todo",showAll:"MOSTRAR TODO",noRes:"Sin resultados.",
    budgets:"Presupuestos mensuales",add:"+ Añadir",setLim:"Fijar límite",
    unbudget:"Sin presupuesto",allBudget:"Todas las categorías tienen presupuesto 🎉",
    overBy:"Excedido por",remain:"restante",
    recurTitle:"Gastos recurrentes",noRecur:"Sin gastos recurrentes aún.",
    howWorks:"Cómo funciona",autoLog:"Registro automático",onDue:"En cada vencimiento",
    markedAs:"Marcado como",rbadge:"🔁 recurrente",nextChk:"Próxima revisión",onOpen:"Al abrir la app",
    s7day:"Gasto en 7 días",last7:"ÚLTIMOS 7 DÍAS",sMonth:"Este mes",byCats:"Por categorías:",noData:"Sin gastos este mes.",
    addTo:"Añadir a",vhint:"Voz: automático · Escribir: pulsa Enter",
    shint:"empieza a escribir o dictar",parsing:"analizando…",
    parse:"Analizar →",cancel:"Cancelar",manual:"Manual",back:"← Volver",
    confirm:"Confirmar gasto",addExp:"Añadir gasto",
    desc:"Descripción",amt:"Importe",cur2:"Moneda",cat2:"Categoría",
    date2:"Fecha",descPh:"ej. Pan, Café, Netflix",
    newAcct:"Nueva cuenta",editAcct:"Editar cuenta",
    aname:"Nombre de cuenta",aph:"ej. Personal, Viaje, Trabajo",
    icon:"Icono",color:"Color",save:"Guardar cambios",create:"Crear cuenta",
    setBudget:"Presupuesto mensual",mLim:"Límite mensual",saveBud:"Guardar",budRepl:"El límite actual será reemplazado.",
    newRec:"Nuevo recurrente",editRec:"Editar recurrente",freq:"Frecuencia",nextD:"Próxima fecha",addRec:"Añadir recurrente",
    daily:"Diario",weekly:"Semanal",monthly:"Mensual",yearly:"Anual",
    lang:"Idioma",allTime:"Total",actAcct:"Cuenta activa",
    edit:"✎ Editar",del:"✕ Eliminar",name:"Nombre",currency:"Moneda",
    c:{"Food & Dining":"Comida y restaurantes","Transport":"Transporte","Groceries":"Supermercado","Health":"Salud","Entertainment":"Entretenimiento","Housing":"Vivienda","Shopping":"Compras","Travel":"Viajes","Education":"Educación","Tech":"Tecnología","Personal Care":"Cuidado personal","Savings":"Ahorros","Other":"Otros"}
  }
};

const NAVY="#0F1F3D",GOLD="#C9922A",CORAL="#C0392B",SURF="#F7F6F3";
const gc=c=>CURRENCIES.find(x=>x.code===c)||{code:c,symbol:c,flag:"🌐"};
const gcat=l=>CATS.find(c=>c.label===l)||CATS[CATS.length-1];
const td=()=>new Date().toISOString().split("T")[0];
const uid=()=>Math.random().toString(36).slice(2,9);
const fD=(s,lo)=>new Date(s+"T12:00:00").toLocaleDateString(lo||"en-US",{month:"2-digit",day:"2-digit",year:"numeric"});
const fS=(s,lo)=>new Date(s+"T12:00:00").toLocaleDateString(lo||"en-US",{month:"short",day:"numeric"});
const AK="lg4_a",EK="lg4_e",BK="lg4_b",RK="lg4_r",LK="lg4_l";
const ld=(k,f)=>{ try{ return JSON.parse(localStorage.getItem(k))??f; }catch{ return f; } };
const sv=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const dA={id:"default",name:"My Account",icon:"💳",color:NAVY,currency:"USD",createdAt:td()};

function Donut({exp,currency}){
  const sz=180,cx=90,cy=90,r=68,sw=22;
  const tot=exp.reduce((s,e)=>s+e.amount,0);
  const cur=gc(currency);
  if(!tot) return(
    <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F0F0F0" strokeWidth={sw}/>
      <text x={cx} y={cy+5} textAnchor="middle" fontSize="13" fill="#bbb" fontFamily="sans-serif">0.00</text>
    </svg>
  );
  const byC={};
  exp.forEach(e=>{ byC[e.category]=(byC[e.category]||0)+e.amount; });
  const circ=2*Math.PI*r; let off=0;
  const sl=Object.entries(byC).map(([cat,amt])=>{
    const dash=(amt/tot)*circ;
    const s={cat,dash,gap:circ-dash,off,color:gcat(cat).color};
    off+=dash; return s;
  });
  return(
    <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} style={{transform:"rotate(-90deg)"}}>
      {sl.map((s,n)=>(
        <circle key={n} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={sw}
          strokeDasharray={`${s.dash} ${s.gap}`} strokeDashoffset={-s.off} strokeLinecap="butt"/>
      ))}
      <text x={cx} y={cy-7} textAnchor="middle" fontSize="12" fill="#666" fontFamily="sans-serif"
        style={{transform:`rotate(90deg)`,transformOrigin:`${cx}px ${cy}px`}}>{cur.symbol}</text>
      <text x={cx} y={cy+11} textAnchor="middle" fontSize="13" fontWeight="600" fill="#222" fontFamily="sans-serif"
        style={{transform:`rotate(90deg)`,transformOrigin:`${cx}px ${cy}px`}}>
        {Math.round(tot).toLocaleString()}
      </text>
    </svg>
  );
}

function Bars({exp,color}){
  const now=new Date();
  const days=Array.from({length:7},(_,n)=>{ const d=new Date(now); d.setDate(d.getDate()-(6-n)); return d.toISOString().split("T")[0]; });
  const vals=days.map(d=>exp.filter(e=>e.date===d).reduce((s,e)=>s+e.amount,0));
  const mx=Math.max(...vals,1);
  return(
    <div style={{display:"flex",alignItems:"flex-end",gap:6,height:80,padding:"0 4px"}}>
      {days.map((d,n)=>{
        const h=Math.max((vals[n]/mx)*72,vals[n]>0?4:0);
        return(
          <div key={d} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <div style={{width:"100%",height:h,background:d===td()?color:`${color}33`,borderRadius:"3px 3px 0 0",transition:"height 0.3s"}}/>
            <span style={{fontSize:9,color:"#aaa"}}>{new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"short"}).slice(0,1)}</span>
          </div>
        );
      })}
    </div>
  );
}

const css=`
*{box-sizing:border-box;margin:0;padding:0;}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes sU{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
@keyframes fI{from{opacity:0;}to{opacity:1;}}
body,.la{background:#F7F6F3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;}
.la{min-height:100vh;max-width:420px;margin:0 auto;}
.hdr{padding:16px 20px 18px;display:flex;align-items:flex-start;justify-content:space-between;}
.hdr-ey{font-size:9px;color:rgba(255,255,255,0.45);font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;}
.hdr-ti{color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.3px;}
.hdr-su{color:rgba(255,255,255,0.6);font-size:11px;margin-top:3px;}
.hdr-am{font-size:23px;font-weight:700;color:#fff;text-align:right;font-family:Georgia,serif;}
.hdr-lb{color:rgba(255,255,255,0.45);font-size:10px;text-align:right;margin-top:3px;}
.gl{height:3px;background:linear-gradient(90deg,#C9922A,#E8B84B,#C9922A);}
.tabs{display:flex;background:#fff;border-bottom:1px solid rgba(0,0,0,0.06);position:sticky;top:0;z-index:10;overflow-x:auto;box-shadow:0 2px 8px rgba(0,0,0,0.04);}
.tabs::-webkit-scrollbar{display:none;}
.tab{flex:1;min-width:54px;padding:12px 3px;font-size:10px;font-weight:700;color:#b0b8c8;background:none;border:none;cursor:pointer;border-bottom:3px solid transparent;transition:all 0.2s;white-space:nowrap;text-transform:uppercase;letter-spacing:0.4px;}
.card{background:#fff;border-radius:16px;margin:12px;padding:18px;box-shadow:0 2px 12px rgba(15,31,61,0.06);border:1px solid rgba(15,31,61,0.04);}
.stit{font-size:15px;font-weight:800;color:#0F1F3D;letter-spacing:-0.2px;}
.per{font-size:10px;color:#a0aaba;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;font-weight:600;}
.bamt{font-size:30px;font-weight:700;color:#0F1F3D;font-family:Georgia,serif;letter-spacing:-0.5px;}
.ey{padding:13px 12px 3px;font-size:10px;color:#a0aaba;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;}
.leg{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:8px;}
.ldot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.lit{display:flex;align-items:center;gap:5px;font-size:11px;color:#6b7a90;font-weight:500;}
.sbtn{background:none;border:none;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;color:#C9922A;}
.div{border-top:1px solid rgba(0,0,0,0.05);margin-top:10px;padding-top:10px;text-align:center;}
.ri{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.04);}
.ri:last-child{border-bottom:none;padding-bottom:0;}
.ric{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0;}
.rn{font-size:14px;font-weight:600;color:#0F1F3D;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.rs{font-size:10px;color:#a0aaba;margin-top:2px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;}
.ra{font-size:14px;font-weight:800;color:#C0392B;letter-spacing:-0.2px;}
.rd{font-size:10px;color:#b0b8c8;margin-top:3px;}
.db{background:none;border:none;cursor:pointer;color:#d0d8e8;padding:6px;border-radius:10px;transition:all 0.2s;flex-shrink:0;display:flex;}
.db:hover{color:#C0392B;background:#FDF0EE;}
.rb{font-size:9px;background:#EEF4FF;color:#4B6CB7;padding:2px 7px;border-radius:6px;font-weight:700;margin-left:4px;vertical-align:middle;}
.sw{padding:10px 12px 0;}
.si{width:100%;border:1.5px solid rgba(0,0,0,0.08);border-radius:12px;padding:10px 14px 10px 38px;font-size:14px;color:#1a1a2e;outline:none;transition:border-color 0.2s;font-family:inherit;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='%23a0aaba' stroke-width='2.5'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='M21 21l-4.35-4.35'/%3E%3C/svg%3E") no-repeat 12px center;}
.si:focus{border-color:#0F1F3D;}
.fr{display:flex;gap:6px;padding:8px 12px;overflow-x:auto;}
.fr::-webkit-scrollbar{display:none;}
.fc{padding:5px 12px;border-radius:20px;border:1.5px solid rgba(0,0,0,0.08);background:#fff;font-size:11px;font-weight:700;color:#8090a8;cursor:pointer;white-space:nowrap;transition:all 0.15s;flex-shrink:0;}
.ac{background:#fff;border-radius:16px;margin:0 12px 10px;padding:14px 16px;box-shadow:0 2px 12px rgba(15,31,61,0.06);display:flex;align-items:center;gap:14px;cursor:pointer;transition:all 0.25s;border:2px solid transparent;}
.ac:hover{box-shadow:0 6px 20px rgba(15,31,61,0.1);transform:translateY(-1px);}
.ac.act{border-color:var(--ac);}
.ai{width:50px;height:50px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;}
.aab{display:flex;align-items:center;justify-content:center;gap:8px;margin:0 12px 12px;padding:15px;background:#fff;border:2px dashed rgba(0,0,0,0.12);border-radius:16px;cursor:pointer;font-size:13px;font-weight:700;color:#b0b8c8;transition:all 0.2s;}
.aab:hover{border-color:#0F1F3D;color:#0F1F3D;}
.sr{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid rgba(0,0,0,0.04);}
.sr:last-child{border-bottom:none;}
.sl{font-size:13px;color:#7080a0;font-weight:500;}
.sv2{font-size:13px;font-weight:700;color:#0F1F3D;text-align:right;}
.rit{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.04);}
.rit:last-child{border-bottom:none;padding-bottom:0;}
.ig{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;}
.io{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;border:2px solid transparent;transition:all 0.15s;background:#F7F6F3;}
.io.sel{border-color:#0F1F3D;background:#fff;}
.cg{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;}
.co{width:28px;height:28px;border-radius:50%;cursor:pointer;border:3px solid transparent;transition:all 0.15s;}
.co.sel{border-color:#fff;outline:3px solid #1a1a2e;transform:scale(1.1);}
.fab{position:fixed;bottom:26px;right:calc(50% - 210px + 18px);width:54px;height:54px;border-radius:16px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(0,0,0,0.22);z-index:50;transition:all 0.2s;background:linear-gradient(135deg,#C9922A,#E8B84B);}
.fab:hover{transform:scale(1.06) translateY(-2px);}
.ov{position:fixed;inset:0;background:rgba(10,20,40,0.5);z-index:60;display:flex;align-items:flex-end;justify-content:center;animation:fI 0.2s;backdrop-filter:blur(2px);}
.mo{background:#fff;border-radius:24px 24px 0 0;padding:20px 20px 34px;width:100%;max-width:420px;animation:sU 0.28s ease;max-height:90vh;overflow-y:auto;}
.mh{width:36px;height:4px;background:rgba(0,0,0,0.1);border-radius:2px;margin:0 auto 18px;}
.mt{font-size:17px;font-weight:800;color:#0F1F3D;margin-bottom:14px;letter-spacing:-0.3px;}
.va{width:100%;border:1.5px solid rgba(0,0,0,0.1);border-radius:14px;padding:13px 14px 44px;font-size:14px;color:#1a1a2e;resize:none;outline:none;min-height:82px;line-height:1.6;transition:all 0.2s;font-family:inherit;background:#F7F6F3;}
.va:focus{background:#fff;box-shadow:0 0 0 3px rgba(15,31,61,0.08);}
.va::placeholder{color:#c0c8d8;}
.vw{position:relative;margin-bottom:10px;}
.va2{position:absolute;bottom:11px;left:13px;right:13px;display:flex;justify-content:space-between;align-items:center;}
.vh{font-size:10px;color:#c0c8d8;font-weight:600;}
.pb{padding:6px 16px;border:none;border-radius:20px;font-size:11px;font-weight:800;color:#fff;cursor:pointer;}
.pb:disabled{background:#d8dce8!important;color:#a0aaba;cursor:not-allowed;}
.micbtn{width:64px;height:64px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;flex-shrink:0;}
.micbtn.idle{background:#F7F6F3;border:2px solid rgba(15,31,61,0.15);}
.micbtn.idle:hover{background:#eef0f5;border-color:#0F1F3D;}
.micbtn.active{background:#C0392B;border:2px solid #C0392B;animation:micpulse 1.2s ease infinite;}
@keyframes micpulse{0%,100%{box-shadow:0 0 0 0 rgba(192,57,43,0.3);}50%{box-shadow:0 0 0 14px rgba(192,57,43,0);}}
.wavebar{display:flex;align-items:center;gap:3px;height:28px;}
.wv{width:3px;border-radius:2px;background:#C0392B;animation:wvanim 0.6s ease infinite;}
@keyframes wvanim{0%,100%{height:4px;}50%{height:22px;}}
.voicezone{display:flex;align-items:center;gap:14px;padding:16px;background:#F7F6F3;border-radius:16px;margin-bottom:12px;border:1.5px solid rgba(15,31,61,0.08);transition:all 0.2s;}
.voicezone.active{background:#FFF5F5;border-color:#C0392B33;}
.chs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;}
.ch{font-size:10px;padding:5px 11px;border-radius:20px;background:#F0F4FF;color:#4B6CB7;border:1px solid #D8E0F8;font-weight:700;}
.ff{margin-bottom:12px;}
.fl{font-size:10px;font-weight:800;color:#a0aaba;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;display:block;}
.fi{width:100%;border:1.5px solid rgba(0,0,0,0.1);border-radius:12px;padding:11px 14px;font-size:14px;color:#1a1a2e;outline:none;transition:all 0.2s;font-family:inherit;background:#fff;}
.fi:focus{border-color:#0F1F3D;box-shadow:0 0 0 3px rgba(15,31,61,0.08);}
.fg{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;}
.fs{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%23a0aaba' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:30px;}
.mb{display:flex;gap:10px;margin-top:6px;}
.mc{flex:1;padding:13px;border-radius:14px;border:none;color:#fff;font-size:15px;font-weight:800;cursor:pointer;transition:all 0.2s;}
.mc:hover{opacity:0.9;}
.mx{flex:1;padding:13px;border-radius:14px;border:1.5px solid rgba(0,0,0,0.1);background:#F7F6F3;color:#7080a0;font-size:15px;font-weight:700;cursor:pointer;}
.em{font-size:12px;color:#C0392B;margin-bottom:10px;font-weight:600;}
.sp{width:16px;height:16px;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block;}
.es{text-align:center;padding:28px 0 10px;color:#c0c8d8;}
.es div{font-size:36px;margin-bottom:8px;opacity:0.45;}
.es p{font-size:13px;font-weight:500;}
.toast{position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(64px);background:#0F1F3D;border-radius:14px;padding:10px 22px;font-size:13px;font-weight:600;color:#fff;transition:transform 0.3s cubic-bezier(.34,1.56,.64,1);z-index:200;white-space:nowrap;box-shadow:0 8px 24px rgba(15,31,61,0.3);}
.toast.on{transform:translateX(-50%) translateY(0);}
.bb{display:flex;height:8px;background:#F0F0F0;border-radius:4px;overflow:hidden;margin-top:5px;}
.bf{height:100%;border-radius:4px;transition:width 0.4s;}
.lb{padding:7px 14px;border-radius:20px;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.15s;display:inline-flex;align-items:center;gap:6px;margin:3px;}
`;

export default function LedgeApp(){
  const [accounts,setAccounts]=useState(()=>ld(AK,[dA]));
  const [expenses,setExpenses]=useState(()=>ld(EK,[]));
  const [budgets,setBudgets]=useState(()=>ld(BK,{}));
  const [recurring,setRecurring]=useState(()=>ld(RK,[]));
  const [lang,setLang]=useState(()=>ld(LK,"en"));
  const [activeId,setActiveId]=useState(()=>ld(AK,[dA])[0]?.id||"default");
  const [tab,setTab]=useState("account");
  const [showExp,setShowExp]=useState(false);
  const [step,setStep]=useState("input");
  const [input,setInput]=useState("");
  const [busy,setBusy]=useState(false);
  const [listening,setListening]=useState(false);
  const [parsed,setParsed]=useState(null);
  const [err,setErr]=useState("");
  const recognitionRef=useRef(null);
  const [showAcct,setShowAcct]=useState(false);
  const [editAcct,setEditAcct]=useState(null);
  const [aForm,setAForm]=useState({name:"",icon:"💳",color:NAVY,currency:"USD"});
  const [showBudget,setShowBudget]=useState(false);
  const [bForm,setBForm]=useState({category:"Food & Dining",amount:""});
  const [showRecur,setShowRecur]=useState(false);
  const [editRec,setEditRec]=useState(null);
  const [rForm,setRForm]=useState({description:"",amount:"",category:"Other",freq:"monthly",nextDate:td()});
  const [search,setSearch]=useState("");
  const [fCat,setFCat]=useState("__all");
  const [fMonth,setFMonth]=useState("");
  const [showAll,setShowAll]=useState(false);
  const [toast,setToast]=useState({show:false,msg:""});
  const tRef=useRef(null);
  const prevInput=useRef("");

  useEffect(()=>{ sv(AK,accounts); },[accounts]);
  useEffect(()=>{ sv(EK,expenses); },[expenses]);
  useEffect(()=>{ sv(BK,budgets); },[budgets]);
  useEffect(()=>{ sv(RK,recurring); },[recurring]);
  useEffect(()=>{ sv(LK,lang); },[lang]);

  useEffect(()=>{
    const old=["#2DC98A","#51CF66","#4CAF50","#1ABC9C","#2ECC71"];
    if(accounts.some(a=>old.includes(a.color))) setAccounts(p=>p.map(a=>old.includes(a.color)?{...a,color:NAVY}:a));
  },[]);

  useEffect(()=>{
    if(!recurring.length) return;
    const today=td();
    const toAdd=[];

    const advanceDate=(dateStr, freq)=>{
      const d=new Date(dateStr+"T12:00:00");
      if(freq==="daily")   d.setDate(d.getDate()+1);
      if(freq==="weekly")  d.setDate(d.getDate()+7);
      if(freq==="monthly") d.setMonth(d.getMonth()+1);
      if(freq==="yearly")  d.setFullYear(d.getFullYear()+1);
      return d.toISOString().split("T")[0];
    };

    const upd=recurring.map(r=>{
      let next=r.nextDate;
      while(next<=today){
        toAdd.push({
          id:uid(),
          accountId:r.accountId,
          description:r.description,
          amount:r.amount,
          currency:r.currency,
          category:r.category,
          date:next,
          isRecurring:true
        });
        next=advanceDate(next, r.freq);
      }
      return next!==r.nextDate ? {...r,nextDate:next} : r;
    });

    if(toAdd.length){
      setExpenses(p=>{
        const keys=new Set(
          p.filter(e=>e.isRecurring)
           .map(e=>`${e.accountId}-${e.description}-${e.date}`)
        );
        const fresh=toAdd.filter(e=>!keys.has(`${e.accountId}-${e.description}-${e.date}`));
        return fresh.length?[...fresh,...p]:p;
      });
      setRecurring(upd);
    }
  },[recurring.length]);

  const tx=TX[lang]||TX.en;
  const lo=LANGS.find(l=>l.code===lang)||LANGS[0];
  const acct=accounts.find(a=>a.id===activeId)||accounts[0];
  const acctExp=expenses.filter(e=>e.accountId===activeId);
  const cur=gc(acct?.currency||"USD");
  const acctB=budgets[activeId]||{};

  const toast2=msg=>{ setToast({show:true,msg}); setTimeout(()=>setToast(t=>({...t,show:false})),2400); };

  const now=new Date();
  const mExp=acctExp.filter(e=>{ const d=new Date(e.date+"T12:00:00"); return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear(); });
  const mTot=mExp.reduce((s,e)=>s+e.amount,0);
  const aTot=acctExp.reduce((s,e)=>s+e.amount,0);
  const catT={};
  mExp.forEach(e=>{ catT[e.category]=(catT[e.category]||0)+e.amount; });
  const sCats=Object.entries(catT).sort((a,b)=>b[1]-a[1]);
  const dStr=now.toLocaleDateString(lo.locale,{month:"long",year:"numeric"}).toUpperCase();
  const mOpts=[...new Set(acctExp.map(e=>e.date.slice(0,7)))].sort().reverse();

  const filtExp=acctExp.filter(e=>{
    const ms=!search||e.description?.toLowerCase().includes(search.toLowerCase())||e.category.toLowerCase().includes(search.toLowerCase())||(tx.c[e.category]||"").toLowerCase().includes(search.toLowerCase());
    const mc=fCat==="__all"||e.category===fCat;
    const mm=!fMonth||e.date.startsWith(fMonth);
    return ms&&mc&&mm;
  });
  const visExp=showAll?filtExp:filtExp.slice(0,10);
  const bAlerts=Object.entries(acctB).filter(([cat,lim])=>(catT[cat]||0)>=lim*0.8);

  const openNA=()=>{ setAForm({name:"",icon:"💳",color:NAVY,currency:"USD"}); setEditAcct(null); setShowAcct(true); };
  const openEA=a=>{ setAForm({name:a.name,icon:a.icon,color:a.color,currency:a.currency}); setEditAcct(a); setShowAcct(true); };
  const saveA=()=>{
    if(!aForm.name.trim()) return;
    if(editAcct){ setAccounts(p=>p.map(a=>a.id===editAcct.id?{...a,...aForm}:a)); toast2("Account updated ✓"); }
    else{ const n={id:uid(),...aForm,createdAt:td()}; setAccounts(p=>[...p,n]); setActiveId(n.id); setTab("overview"); toast2(`"${aForm.name}" created ✓`); }
    setShowAcct(false);
  };
  const delA=a=>{
    if(accounts.length===1){ toast2("Can't delete only account"); return; }
    if(!window.confirm(`Delete "${a.name}"?`)) return;
    setAccounts(p=>p.filter(x=>x.id!==a.id));
    setExpenses(p=>p.filter(e=>e.accountId!==a.id));
    setActiveId(accounts.find(x=>x.id!==a.id)?.id||"default");
    toast2("Deleted");
  };

  const openExp=()=>{ setShowExp(true); setStep("input"); setInput(""); prevInput.current=""; setParsed(null); setErr(""); setListening(false); };
  const closeExp=()=>{
    clearTimeout(window._pt);
    if(recognitionRef.current){ try{ recognitionRef.current.stop(); }catch{} }
    setListening(false);
    setShowExp(false); setInput(""); prevInput.current=""; setParsed(null); setErr("");
  };

  const startListening=()=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){ setErr("Voice not supported in this browser. Type your expense instead."); return; }
    if(listening){ try{ recognitionRef.current?.stop(); }catch{} setListening(false); return; }
    const r=new SR();
    r.continuous=false;
    r.interimResults=true;
    r.lang=lo.locale||"en-US";
    r.onstart=()=>{ setListening(true); setErr(""); };
    r.onresult=e=>{
      let final="", interim="";
      for(let i=e.resultIndex;i<e.results.length;i++){
        if(e.results[i].isFinal) final+=e.results[i][0].transcript;
        else interim+=e.results[i][0].transcript;
      }
      const val=final||interim;
      setInput(val);
      prevInput.current=val;
    };
    r.onend=()=>{
      setListening(false);
      setInput(prev=>{ if(prev.trim().length>2){ clearTimeout(window._pt); window._pt=setTimeout(()=>parseE(prev),1500); } return prev; });
    };
    r.onerror=e=>{
      setListening(false);
      if(e.error==="not-allowed") setErr("Mic permission denied. Allow microphone access in your browser settings.");
      else if(e.error==="no-speech") setErr("No speech detected. Try again.");
      else setErr(`Voice error: ${e.error}`);
    };
    recognitionRef.current=r;
    try{ r.start(); }catch{ setErr("Could not start mic. Try again."); }
  };

  // ── Rule-based offline parser ──────────────────────────
  const ruleParser = (text, defaultCurrency) => {
    const t = text.toLowerCase();
    const today = td();

    // ── Amount: handle 20,000 / 20.000 / 1,234.56 / "20 thousand" / "20k"
    let amount = "";
    // First try: word-based multipliers like "20 thousand", "5k", "1.5 million"
    const wordAmt = t.match(/(\d+(?:[.,]\d+)?)\s*(k|thousand|million|m)\b/);
    if(wordAmt){
      const base = parseFloat(wordAmt[1].replace(",","."));
      const mult = /million|^m$/.test(wordAmt[2]) ? 1000000 : 1000;
      amount = base * mult;
    } else {
      // Second try: numbers with thousand separators like 20,000 or 1.234.567
      // Pattern: digit groups separated by comma/period where last group is not 2 digits (not a decimal)
      const bigNum = t.match(/(\d{1,3}(?:[,. ]\d{3})+(?:[.,]\d{1,2})?)/);
      if(bigNum){
        // Strip thousand separators — keep only the decimal part if present
        const raw = bigNum[1].replace(/[,. ](\d{3})(?=[,. ]|\d{3}|$)/g, (m,g)=>g); // remove thousand seps
        amount = parseFloat(raw.replace(/[^0-9.]/g,"").replace(/\.(\d+)$/,(m,d)=>d.length<=2?m:""));
        // Simpler: just strip commas/spaces used as thousand separators
        const cleaned = bigNum[1].replace(/[, ](?=\d{3}\b)/g,"").replace(/\.(?=\d{3}\b)/g,"");
        amount = parseFloat(cleaned.replace(",","."));
      } else {
        // Simple number: 45, 3.50, 1,234 as decimal
        const simple = t.match(/(\d+[.,]\d+|\d+)/);
        amount = simple ? parseFloat(simple[1].replace(",",".")) : "";
      }
    }

    // ── Currency: look for symbols or codes
    const curMap = {
      "$":"USD","€":"EUR","£":"GBP","¥":"JPY","₹":"INR","₺":"TRY",
      "₩":"KRW","฿":"THB","kr":"SEK","fr":"CHF","rp":"IDR","rm":"MYR",
      "usd":"USD","eur":"EUR","gbp":"GBP","all":"ALL","jpy":"JPY",
      "cad":"CAD","aud":"AUD","chf":"CHF","sgd":"SGD","aed":"AED",
      "inr":"INR","brl":"BRL","try":"TRY","krw":"KRW","cny":"CNY",
      "mxn":"MXN","dollar":"USD","euro":"EUR","euros":"EUR",
      "pound":"GBP","pounds":"GBP","lek":"ALL","leke":"ALL",
      "yen":"JPY","franc":"CHF","rupee":"INR","won":"KRW",
      "dirham":"AED","real":"BRL","lira":"TRY","yuan":"CNY","peso":"MXN",
    };
    let currency = defaultCurrency || "USD";
    for(const [k,v] of Object.entries(curMap)){
      if(t.includes(k)){ currency=v; break; }
    }

    // ── Category: keyword matching
    const catKw = [
      { label:"Food & Dining",   kw:["restaurant","dinner","lunch","breakfast","pizza","burger","coffee","cafe","café","sushi","takeaway","takeout","eat","food","meal","drink","bar","pub","bistro","snack","dessert","taco","pasta","ramen","noodle","manger","repas","دجاج","مطعم","طعام","ăn","cơm"] },
      { label:"Groceries",       kw:["grocery","groceries","supermarket","market","bread","milk","eggs","fruit","vegetable","produce","walmart","lidl","aldi","carrefour","tesco","courses","boulangerie","supermercado","bakkeri","خضار","بقالة","thực phẩm","siêu thị"] },
      { label:"Transport",       kw:["uber","taxi","cab","bus","metro","subway","train","tram","fuel","petrol","gas","parking","toll","flight","ticket","lyft","bolt","fare","transport","commute","ride","carpool","منقل","مواصلات","di chuyển","xăng"] },
      { label:"Health",          kw:["doctor","pharmacy","medicine","hospital","clinic","dental","dentist","gym","fitness","prescription","health","medical","drug","pharmaci","santé","صيدلية","دواء","thuốc","bệnh viện","sức khỏe"] },
      { label:"Entertainment",   kw:["netflix","spotify","cinema","movie","film","concert","game","gaming","xbox","playstation","steam","disney","amazon prime","hulu","apple tv","ticket","show","theater","theatre","entertainment","divertissement","ترفيه","giải trí"] },
      { label:"Housing",         kw:["rent","mortgage","electricity","water","gas bill","internet","wifi","cable","insurance","maintenance","repair","plumber","landlord","loyer","logement","إيجار","سكن","thuê nhà","điện","nước"] },
      { label:"Shopping",        kw:["amazon","ebay","zara","h&m","clothing","clothes","shoes","fashion","shop","store","mall","purchase","order","delivery","package","compras","shopping","tient","acheter","تسوق","mua sắm"] },
      { label:"Travel",          kw:["hotel","airbnb","hostel","flight","airline","airport","vacation","holiday","trip","travel","booking","expedia","suitcase","passport","viaje","voyage","سفر","du lịch","vé máy bay"] },
      { label:"Education",       kw:["school","university","course","tuition","book","textbook","class","lesson","tutorial","udemy","coursera","education","study","learn","éducation","تعليم","giáo dục","học phí"] },
      { label:"Tech",            kw:["apple","iphone","samsung","laptop","computer","software","app","subscription","domain","hosting","tech","gadget","phone","cable","charger","technologie","تقنية","công nghệ"] },
      { label:"Personal Care",   kw:["haircut","salon","barber","spa","beauty","cosmetic","makeup","perfume","shampoo","soap","toothpaste","razor","نظافة","عناية","chăm sóc","cắt tóc"] },
      { label:"Savings",         kw:["savings","save","deposit","invest","investment","épargne","مدخرات","tiết kiệm"] },
    ];
    let category = "Other";
    for(const {label,kw} of catKw){
      if(kw.some(k=>t.includes(k))){ category=label; break; }
    }

    // ── Date: look for relative keywords or explicit dates
    let date = today;
    const now2 = new Date();
    if(/yesterday|gestern|hier|ayer|hôm qua|أمس/.test(t)){
      const y=new Date(now2); y.setDate(y.getDate()-1); date=y.toISOString().split("T")[0];
    } else if(/last week|la semaine dernière|la semana pasada/.test(t)){
      const y=new Date(now2); y.setDate(y.getDate()-7); date=y.toISOString().split("T")[0];
    }
    // explicit date like "march 15" or "15/03"
    const mNames=["january","february","march","april","may","june","july","august","september","october","november","december"];
    for(let m=0;m<mNames.length;m++){
      const re=new RegExp(`(${mNames[m]})\\s+(\\d{1,2})`);
      const match=t.match(re);
      if(match){
        const day=parseInt(match[2]);
        const yr=now2.getFullYear();
        date=`${yr}-${String(m+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
        break;
      }
    }

    // ── Description: first meaningful noun phrase (skip amount + currency words)
    const stopWords=new Set(["i","a","an","the","for","on","at","in","to","from","my","of","with","and","spent","paid","bought","purchased","bought","got","had","pay","buy","cost","costs","spending","expense","euros","dollars","pounds","usd","eur","gbp",...Object.keys(curMap)]);
    const words=text.trim().split(/\s+/).filter(w=>{
      const wl=w.toLowerCase().replace(/[^a-z]/g,"");
      return wl.length>1 && !stopWords.has(wl) && isNaN(w.replace(",","."));
    });
    const description = words.slice(0,3).join(" ") || category;

    return { description, amount, currency, category, date, isRecurring:false };
  };

  const parseE=async text=>{
    if(!text.trim()) return;
    setBusy(true); setErr("");
    const today=td();
    const prompt=`Extract expense from: "${text}"\nReturn ONLY JSON: {"description":"1-4 words","amount":number,"currency":"${acct.currency}","category":"one of: ${CATS.map(c=>c.label).join(",")}","date":"YYYY-MM-DD"}\nToday: ${today}`;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":import.meta.env.VITE_ANTHROPIC_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:300,messages:[{role:"user",content:prompt}]})});
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      const data=await res.json();
      const raw=data.content?.map(b=>b.text||"").join("").replace(/```json|```/g,"").trim();
      if(!raw) throw new Error("empty response");
      const obj=JSON.parse(raw);
      if(!obj.amount) throw new Error("no amount");
      setParsed({description:obj.description||"",amount:obj.amount,currency:acct.currency,category:CATS.find(c=>c.label===obj.category)?.label||"Other",date:obj.date||today,isRecurring:false});
      setStep("confirm");
    }catch(e){
      // Fallback to rule-based parser (offline or API error)
      const offline=!navigator.onLine;
      const result=ruleParser(text, acct.currency);
      setParsed(result);
      setStep("confirm");
      setErr(offline?"📡 Offline — parsed locally. Please review.":"⚠ AI parse failed — parsed locally. Please review.");
    }
    finally{ setBusy(false); }
  };

  const confirmE=()=>{
    const amt=parseFloat(parsed.amount);
    if(!amt||amt<=0){ setErr("Enter a valid amount."); return; }
    setExpenses(p=>[{id:uid(),accountId:activeId,...parsed,amount:amt},...p]);
    const ns=(catT[parsed.category]||0)+amt;
    const lim=acctB[parsed.category];
    closeExp();
    toast2(lim&&ns>=lim?`⚠ Budget exceeded for ${tx.c[parsed.category]||parsed.category}!`:"Expense added ✓");
  };

  const saveBud=()=>{
    const amt=parseFloat(bForm.amount);
    if(!amt||amt<=0) return;
    setBudgets(p=>({...p,[activeId]:{...(p[activeId]||{}),[bForm.category]:amt}}));
    toast2("Budget set ✓"); setShowBudget(false); setBForm({category:"Food & Dining",amount:""});
  };
  const remBud=cat=>{ setBudgets(p=>{ const b={...(p[activeId]||{})}; delete b[cat]; return {...p,[activeId]:b}; }); toast2("Budget removed"); };

  const saveR=()=>{
    const amt=parseFloat(rForm.amount);
    if(!rForm.description.trim()||!amt) return;
    if(editRec){ setRecurring(p=>p.map(r=>r.id===editRec.id?{...r,...rForm,amount:amt}:r)); toast2("Updated ✓"); }
    else{ setRecurring(p=>[...p,{id:uid(),accountId:activeId,currency:acct.currency,...rForm,amount:amt}]); toast2("Recurring added ✓"); }
    setShowRecur(false);
  };

  const exportCSV=()=>{
    const rows=[["Date","Description","Category","Amount","Currency"],...filtExp.map(e=>[e.date,e.description||e.category,e.category,e.amount.toFixed(2),e.currency])];
    const csv=rows.map(r=>r.map(c=>`"${c}"`).join(",")).join("\n");
    const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"})); a.download=`${acct.name}.csv`; a.click();
    toast2("CSV downloaded ✓");
  };

  const RR=({e})=>{
    const cat=gcat(e.category);
    return(
      <div className="ri">
        <div className="ric" style={{background:cat.bg}}>{cat.emoji}</div>
        <div style={{flex:1,minWidth:0}}>
          <div className="rn">{e.description||e.category}{e.isRecurring&&<span className="rb">{tx.rbadge}</span>}</div>
          <div className="rs">{tx.c[e.category]||e.category} · {fS(e.date,lo.locale)}</div>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div className="ra">−{cur.symbol}{e.amount.toFixed(2)}</div>
          <div className="rd">{fD(e.date,lo.locale)}</div>
        </div>
        <button className="db" onClick={()=>{ setExpenses(p=>p.filter(x=>x.id!==e.id)); toast2("Removed"); }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
    );
  };

  return(
    <>
      <style>{css}</style>
      <div className="la" dir={lo.dir}>
        {/* Brand */}
        <div style={{background:NAVY,padding:"11px 20px 10px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:GOLD,letterSpacing:"-0.5px"}}>Ledge</span>
            <span style={{width:1,height:13,background:"rgba(201,146,42,0.4)",display:"inline-block"}}/>
            <span style={{fontSize:9,color:"rgba(255,255,255,0.4)",fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase"}}>Speak it. Track it. Budget it.</span>
          </div>
          <select
            value={lang}
            onChange={e=>{ setLang(e.target.value); toast2("Language updated ✓"); }}
            style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,color:"#fff",fontSize:11,fontWeight:800,padding:"4px 8px",cursor:"pointer",outline:"none",letterSpacing:"1px",appearance:"none",WebkitAppearance:"none",minWidth:42,textAlign:"center"}}
            size={1}>
            {LANGS.map(l=><option key={l.code} value={l.code} style={{background:NAVY,color:"#fff"}}>{l.abbr}</option>)}
          </select>
        </div>
        <div className="gl"/>
        {/* Banner */}
        <div className="hdr" style={{background:"linear-gradient(135deg,#1a3057 0%,#243d6b 100%)"}}>
          <div>
            <div className="hdr-ey">{tx.actAcct}</div>
            <div className="hdr-ti">{acct?.icon} {acct?.name}</div>
            <div className="hdr-su">{cur.flag} {cur.code} · {acctExp.length} expenses</div>
          </div>
          <div>
            <div className="hdr-am">{cur.symbol}{aTot.toLocaleString(lo.locale,{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
            <div className="hdr-lb">{tx.allTime}</div>
          </div>
        </div>
        {/* Tabs */}
        <div className="tabs">
          {["account","overview","records","budget","recurring","statistics"].map((t,n)=>(
            <button key={t} className="tab" onClick={()=>setTab(t)}
              style={tab===t?{color:NAVY,borderBottomColor:GOLD}:{}}>{(tx.t||TX.en.t)[n]}</button>
          ))}
        </div>

        {/* ACCOUNTS */}
        {tab==="account"&&<>
          <div className="ey">{tx.myAccts}</div>
          {accounts.map(a=>{
            const aE=expenses.filter(e=>e.accountId===a.id);
            const aT=aE.reduce((s,e)=>s+e.amount,0);
            const aC=gc(a.currency);
            const isA=a.id===activeId;
            return(
              <div key={a.id} className={`ac${isA?" act":""}`} style={{"--ac":a.color}} onClick={()=>{ setActiveId(a.id); setTab("overview"); setShowAll(false); }}>
                <div className="ai" style={{background:`${a.color}22`}}><span style={{fontSize:24}}>{a.icon}</span></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:15,fontWeight:800,color:NAVY}}>{a.name}</div>
                  <div style={{fontSize:11,color:"#a0aaba",marginTop:3}}>{aC.flag} {a.currency} · {aE.length} expenses</div>
                  <div style={{display:"flex",gap:6,marginTop:8}} onClick={ev=>ev.stopPropagation()}>
                    <button onClick={()=>openEA(a)} style={{background:"none",border:"1px solid rgba(0,0,0,0.1)",borderRadius:8,padding:"4px 10px",fontSize:11,color:"#888",cursor:"pointer",fontWeight:600}}>{tx.edit}</button>
                    {accounts.length>1&&<button onClick={()=>delA(a)} style={{background:"none",border:"1px solid rgba(0,0,0,0.1)",borderRadius:8,padding:"4px 10px",fontSize:11,color:"#888",cursor:"pointer",fontWeight:600}}>{tx.del}</button>}
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontWeight:700,fontSize:16,color:NAVY}}>{aC.symbol}{Math.round(aT).toLocaleString()}</div>
                  <div style={{fontSize:11,color:"#a0aaba"}}>{aE.length>0?tx.spent:tx.noExp}</div>
                  {isA&&<div style={{fontSize:10,color:a.color,fontWeight:800,marginTop:4}}>{tx.active}</div>}
                </div>
              </div>
            );
          })}
          <button className="aab" onClick={openNA}><span style={{fontSize:20}}>＋</span> {tx.addAcct}</button>
          <div className="card">
            <div className="stit" style={{marginBottom:12}}>{tx.summary}</div>
            <div className="sr"><span className="sl">{tx.name}</span><span className="sv2">{acct?.icon} {acct?.name}</span></div>
            <div className="sr"><span className="sl">{tx.currency}</span><span className="sv2">{cur.flag} {cur.code}</span></div>
            <div className="sr"><span className="sl">{tx.totalExp}</span><span className="sv2">{acctExp.length}</span></div>
            <div className="sr"><span className="sl">{tx.thisMonth}</span><span className="sv2">{mExp.length} · {cur.symbol}{mTot.toFixed(2)}</span></div>
            <button onClick={()=>{ if(window.confirm("Clear all expenses for this account?")){ setExpenses(p=>p.filter(e=>e.accountId!==activeId)); toast2("Cleared"); } }}
              style={{marginTop:14,width:"100%",padding:10,borderRadius:10,border:`1.5px solid ${CORAL}44`,background:"#FDF0EE",color:CORAL,fontSize:13,fontWeight:700,cursor:"pointer"}}>
              {tx.clearExp}
            </button>
          </div>
        </>}

        {/* OVERVIEW */}
        {tab==="overview"&&<>
          {bAlerts.length>0&&(
            <div className="card" style={{background:"#FFFBF0",border:`1.5px solid ${GOLD}`}}>
              <div style={{fontSize:13,fontWeight:700,color:GOLD,marginBottom:8}}>⚠ Budget Alerts</div>
              {bAlerts.map(([cat,lim])=>(
                <div key={cat} style={{fontSize:12,color:"#666",marginBottom:3}}>{gcat(cat).emoji} {tx.c[cat]||cat}: {cur.symbol}{(catT[cat]||0).toFixed(2)} / {cur.symbol}{lim.toFixed(2)}</div>
              ))}
            </div>
          )}
          <div className="card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span className="stit">{tx.structure}</span>
            </div>
            <div className="per">{tx.last30} · {acct?.name}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
              <div className="bamt">{cur.symbol} {mTot.toLocaleString(lo.locale,{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
              <span style={{fontSize:12,color:"#a0aaba"}}>{cur.code}</span>
            </div>
            <div style={{display:"flex",justifyContent:"center",margin:"12px 0 8px"}}>
              <Donut exp={mExp} currency={cur.code}/>
            </div>
            {sCats.length>0&&(
              <div className="leg">{sCats.slice(0,5).map(([cat])=>{ const c=gcat(cat); return <div key={cat} className="lit"><div className="ldot" style={{background:c.color}}/>{tx.c[cat]||cat}</div>; })}</div>
            )}
            {acctExp.length===0
              ?<div style={{textAlign:"center",padding:"10px 0 2px",color:"#c0c8d8",fontSize:13}}>{tx.noYet}</div>
              :<div className="div"><button className="sbtn" onClick={()=>setTab("statistics")}>{tx.more}</button></div>
            }
          </div>
          <div className="card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span className="stit">{tx.lastRec}</span>
              <span style={{fontSize:10,color:"#a0aaba",textTransform:"uppercase",letterSpacing:"0.5px"}}>{tx.last30}</span>
            </div>
            {acctExp.length===0?<div className="es"><div>🧾</div><p>{tx.noYet}</p></div>
              :<>{acctExp.slice(0,4).map(e=><RR key={e.id} e={e}/>)}
                {acctExp.length>4&&<div className="div"><button className="sbtn" onClick={()=>setTab("records")}>{tx.viewAll}</button></div>}</>
            }
          </div>
        </>}

        {/* RECORDS */}
        {tab==="records"&&<>
          <div className="sw"><input className="si" placeholder={tx.searchPh} value={search} onChange={e=>{ setSearch(e.target.value); setShowAll(false); }}/></div>
          <div className="fr">
            <select style={{padding:"5px 26px 5px 10px",borderRadius:20,border:"1.5px solid rgba(0,0,0,0.08)",background:"#fff",fontSize:11,fontWeight:700,color:"#8090a8",cursor:"pointer",appearance:"none",backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23aaa' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:"right 8px center",flexShrink:0}}
              value={fMonth} onChange={e=>{ setFMonth(e.target.value); setShowAll(false); }}>
              <option value="">{tx.allMonths}</option>
              {mOpts.map(m=><option key={m} value={m}>{new Date(m+"-15").toLocaleDateString(lo.locale,{month:"long",year:"numeric"})}</option>)}
            </select>
            <button className="fc" style={fCat==="__all"?{background:NAVY,borderColor:NAVY,color:"#fff"}:{}} onClick={()=>{ setFCat("__all"); setShowAll(false); }}>{tx.allCats}</button>
            {CATS.map(c=>(
              <button key={c.label} className="fc" style={fCat===c.label?{background:NAVY,borderColor:NAVY,color:"#fff"}:{}} onClick={()=>{ setFCat(c.label); setShowAll(false); }}>
                {c.emoji} {tx.c[c.label]||c.label}
              </button>
            ))}
          </div>
          <div className="card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span className="stit">{filtExp.length} {tx.allRec}</span>
              <button onClick={exportCSV} style={{fontSize:11,fontWeight:700,color:NAVY,background:"none",border:`1px solid ${NAVY}`,borderRadius:8,padding:"4px 10px",cursor:"pointer"}}>CSV</button>
            </div>
            {filtExp.length===0?<div className="es"><div>🔍</div><p>{tx.noRes}</p></div>
              :<>{visExp.map(e=><RR key={e.id} e={e}/>)}
                {!showAll&&filtExp.length>10&&<div className="div"><button className="sbtn" onClick={()=>setShowAll(true)}>{tx.showAll} ({filtExp.length})</button></div>}</>
            }
          </div>
        </>}

        {/* BUDGET */}
        {tab==="budget"&&<>
          <div className="card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span className="stit">{tx.budgets}</span>
              <button onClick={()=>setShowBudget(true)} style={{fontSize:12,fontWeight:700,color:"#fff",background:NAVY,border:"none",borderRadius:8,padding:"6px 12px",cursor:"pointer"}}>{tx.add}</button>
            </div>
            <div className="per">{dStr}</div>
            {Object.keys(acctB).length===0?<div className="es"><div>📊</div><p>No budgets set yet.</p></div>
              :Object.entries(acctB).map(([cat,lim])=>{
                const sp=catT[cat]||0; const pct=Math.min((sp/lim)*100,100);
                const over=sp>lim; const warn=pct>=80&&!over;
                const bc=over?CORAL:warn?GOLD:gcat(cat).color;
                return(
                  <div key={cat} style={{marginBottom:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontSize:13,fontWeight:600,color:NAVY}}>{gcat(cat).emoji} {tx.c[cat]||cat}</span>
                      <span style={{fontSize:12,fontWeight:700,color:over?CORAL:warn?GOLD:"#666"}}>{cur.symbol}{sp.toFixed(2)} / {cur.symbol}{lim.toFixed(2)}</span>
                    </div>
                    <div className="bb"><div className="bf" style={{width:`${pct}%`,background:bc}}/></div>
                    {(over||warn)&&<div style={{fontSize:11,color:bc,marginTop:3,fontWeight:600}}>{over?`⚠ ${tx.overBy} ${cur.symbol}${(sp-lim).toFixed(2)}`:`⚠ ${Math.round(100-pct)}% ${tx.remain}`}</div>}
                    <button onClick={()=>remBud(cat)} style={{fontSize:11,color:"#ccc",background:"none",border:"none",cursor:"pointer",marginTop:2}}>remove</button>
                  </div>
                );
              })
            }
          </div>
          <div className="card">
            <div className="stit" style={{marginBottom:12}}>{tx.unbudget}</div>
            {CATS.filter(c=>!acctB[c.label]&&catT[c.label]).map(c=>(
              <div key={c.label} className="sr">
                <span className="sl">{c.emoji} {tx.c[c.label]||c.label}</span>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span className="sv2">{cur.symbol}{(catT[c.label]||0).toFixed(2)}</span>
                  <button onClick={()=>{ setBForm({category:c.label,amount:""}); setShowBudget(true); }} style={{fontSize:11,color:GOLD,background:"none",border:`1px solid ${GOLD}`,borderRadius:6,padding:"3px 8px",cursor:"pointer",fontWeight:700}}>{tx.setLim}</button>
                </div>
              </div>
            ))}
            {CATS.filter(c=>!acctB[c.label]&&catT[c.label]).length===0&&<div style={{fontSize:13,color:"#a0aaba",textAlign:"center",padding:"10px 0"}}>{tx.allBudget}</div>}
          </div>
        </>}

        {/* RECURRING */}
        {tab==="recurring"&&<>
          <div className="card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <span className="stit">{tx.recurTitle}</span>
              <button onClick={()=>{ setRForm({description:"",amount:"",category:"Other",freq:"monthly",nextDate:td()}); setEditRec(null); setShowRecur(true); }} style={{fontSize:12,fontWeight:700,color:"#fff",background:NAVY,border:"none",borderRadius:8,padding:"6px 12px",cursor:"pointer"}}>{tx.add}</button>
            </div>
            {recurring.filter(r=>r.accountId===activeId).length===0?<div className="es"><div>🔁</div><p>{tx.noRecur}</p></div>
              :recurring.filter(r=>r.accountId===activeId).map(r=>{
                const cat=gcat(r.category);
                const fk={daily:tx.daily,weekly:tx.weekly,monthly:tx.monthly,yearly:tx.yearly};
                return(
                  <div key={r.id} className="rit">
                    <div className="ric" style={{background:cat.bg}}>{cat.emoji}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:14,fontWeight:600,color:NAVY}}>{r.description}</div>
                      <div style={{fontSize:10,color:"#a0aaba",textTransform:"uppercase",letterSpacing:0.3,marginTop:2}}>{fk[r.freq]||r.freq} · {fS(r.nextDate,lo.locale)}</div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:14,fontWeight:700,color:CORAL}}>−{cur.symbol}{parseFloat(r.amount).toFixed(2)}</div>
                      <div style={{fontSize:11,color:"#a0aaba"}}>{tx.c[r.category]||r.category}</div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:4,marginLeft:8}}>
                      <button className="db" style={{color:"#4DABF7"}} onClick={()=>{ setRForm({description:r.description,amount:r.amount,category:r.category,freq:r.freq,nextDate:r.nextDate}); setEditRec(r); setShowRecur(true); }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="db" onClick={()=>{ setRecurring(p=>p.filter(x=>x.id!==r.id)); toast2("Removed"); }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </>}

        {/* STATISTICS */}
        {tab==="statistics"&&<>
          <div className="card">
            <div className="stit" style={{marginBottom:4}}>{tx.s7day}</div>
            <div className="per">{acct?.name} · {tx.last7}</div>
            <Bars exp={acctExp} color={NAVY}/>
          </div>
          <div className="card">
            <div className="stit" style={{marginBottom:4}}>{tx.sMonth}</div>
            <div className="per">{dStr}</div>
            <div className="bamt" style={{marginBottom:14}}>{cur.symbol} {mTot.toLocaleString(lo.locale,{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
            {sCats.length===0?<div className="es"><div>📊</div><p>{tx.noData}</p></div>
              :<>
                <div style={{fontSize:11,fontWeight:700,color:"#333",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.5px"}}>{tx.byCats}</div>
                {sCats.map(([cat,amt])=>{
                  const pct=mTot>0?(amt/mTot)*100:0;
                  return(
                    <div key={cat} style={{marginBottom:14}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                        <span style={{fontSize:14,fontWeight:600,color:NAVY}}>{gcat(cat).emoji} {tx.c[cat]||cat}</span>
                        <span style={{fontSize:14,color:"#444"}}>{cur.symbol}{amt.toLocaleString(lo.locale,{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                      </div>
                      <div className="bb"><div className="bf" style={{width:`${pct}%`,background:gcat(cat).color}}/></div>
                    </div>
                  );
                })}
              </>
            }
          </div>
        </>}

        {/* FAB */}
        <button className="fab" onClick={openExp}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>

        {/* ACCOUNT MODAL */}
        {showAcct&&(
          <div className="ov" onClick={e=>{ if(e.target.classList.contains("ov")) setShowAcct(false); }}>
            <div className="mo">
              <div className="mh"/>
              <div className="mt">{editAcct?tx.editAcct:tx.newAcct}</div>
              <div className="ff"><label className="fl">{tx.aname}</label>
                <input className="fi" type="text" placeholder={tx.aph} value={aForm.name} autoFocus onChange={e=>setAForm(f=>({...f,name:e.target.value}))} onKeyDown={e=>{ if(e.key==="Enter") saveA(); }}/>
              </div>
              <div className="ff"><label className="fl">{tx.currency}</label>
                <select className="fi fs" value={aForm.currency} onChange={e=>setAForm(f=>({...f,currency:e.target.value}))}>
                  {CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                </select>
              </div>
              <div className="ff"><label className="fl">{tx.icon}</label>
                <div className="ig">{AICONS.map(ic=><div key={ic} className={`io${aForm.icon===ic?" sel":""}`} onClick={()=>setAForm(f=>({...f,icon:ic}))}>{ic}</div>)}</div>
              </div>
              <div className="ff"><label className="fl">{tx.color}</label>
                <div className="cg">{ACOLORS.map(c=><div key={c} className={`co${aForm.color===c?" sel":""}`} style={{background:c}} onClick={()=>setAForm(f=>({...f,color:c}))}/>)}</div>
              </div>
              <div style={{background:SURF,borderRadius:12,padding:"12px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:42,height:42,borderRadius:12,background:`${aForm.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{aForm.icon}</div>
                <div><div style={{fontWeight:700,fontSize:14,color:NAVY}}>{aForm.name||"Account Name"}</div><div style={{fontSize:12,color:"#a0aaba"}}>{gc(aForm.currency).flag} {aForm.currency}</div></div>
                <div style={{marginLeft:"auto",width:12,height:12,borderRadius:"50%",background:aForm.color}}/>
              </div>
              <div className="mb">
                <button className="mx" onClick={()=>setShowAcct(false)}>{tx.cancel}</button>
                <button className="mc" style={{background:aForm.color||NAVY}} disabled={!aForm.name.trim()} onClick={saveA}>{editAcct?tx.save:tx.create}</button>
              </div>
            </div>
          </div>
        )}

        {/* BUDGET MODAL */}
        {showBudget&&(
          <div className="ov" onClick={e=>{ if(e.target.classList.contains("ov")) setShowBudget(false); }}>
            <div className="mo">
              <div className="mh"/>
              <div className="mt">{tx.setBudget}</div>
              <div className="ff"><label className="fl">{tx.cat2}</label>
                <select className="fi fs" value={bForm.category} onChange={e=>setBForm(f=>({...f,category:e.target.value}))}>
                  {CATS.map(c=><option key={c.label} value={c.label}>{c.emoji} {tx.c[c.label]||c.label}</option>)}
                </select>
              </div>
              <div className="ff"><label className="fl">{tx.mLim} ({cur.symbol})</label>
                <input className="fi" type="number" step="1" min="0" placeholder="300" value={bForm.amount} autoFocus onChange={e=>setBForm(f=>({...f,amount:e.target.value}))} onKeyDown={e=>{ if(e.key==="Enter") saveBud(); }}/>
              </div>
              {acctB[bForm.category]&&<div style={{fontSize:12,color:"#a0aaba",marginBottom:10}}>{tx.budRepl}</div>}
              <div className="mb">
                <button className="mx" onClick={()=>setShowBudget(false)}>{tx.cancel}</button>
                <button className="mc" style={{background:NAVY}} disabled={!bForm.amount} onClick={saveBud}>{tx.saveBud}</button>
              </div>
            </div>
          </div>
        )}

        {/* RECURRING MODAL */}
        {showRecur&&(
          <div className="ov" onClick={e=>{ if(e.target.classList.contains("ov")) setShowRecur(false); }}>
            <div className="mo">
              <div className="mh"/>
              <div className="mt">{editRec?tx.editRec:tx.newRec}</div>
              <div className="ff"><label className="fl">{tx.desc}</label>
                <input className="fi" type="text" placeholder="Netflix, Rent, Gym" value={rForm.description} autoFocus onChange={e=>setRForm(f=>({...f,description:e.target.value}))}/>
              </div>
              <div className="fg">
                <div className="ff" style={{margin:0}}><label className="fl">{tx.amt} ({cur.symbol})</label>
                  <input className="fi" type="number" step="0.01" min="0" placeholder="0.00" value={rForm.amount} onChange={e=>setRForm(f=>({...f,amount:e.target.value}))}/>
                </div>
                <div className="ff" style={{margin:0}}><label className="fl">{tx.freq}</label>
                  <select className="fi fs" value={rForm.freq} onChange={e=>setRForm(f=>({...f,freq:e.target.value}))}>
                    {FREQS.map(f=><option key={f} value={f}>{tx[f]||f}</option>)}
                  </select>
                </div>
              </div>
              <div className="fg">
                <div className="ff" style={{margin:0}}><label className="fl">{tx.cat2}</label>
                  <select className="fi fs" value={rForm.category} onChange={e=>setRForm(f=>({...f,category:e.target.value}))}>
                    {CATS.map(c=><option key={c.label} value={c.label}>{c.emoji} {tx.c[c.label]||c.label}</option>)}
                  </select>
                </div>
                <div className="ff" style={{margin:0}}><label className="fl">{tx.nextD}</label>
                  <input className="fi" type="date" value={rForm.nextDate} onChange={e=>setRForm(f=>({...f,nextDate:e.target.value}))} style={{colorScheme:"light"}}/>
                </div>
              </div>
              <div className="mb">
                <button className="mx" onClick={()=>setShowRecur(false)}>{tx.cancel}</button>
                <button className="mc" style={{background:NAVY}} disabled={!rForm.description.trim()||!rForm.amount} onClick={saveR}>{editRec?tx.save:tx.addRec}</button>
              </div>
            </div>
          </div>
        )}

        {/* EXPENSE MODAL */}
        {showExp&&(
          <div className="ov" onClick={e=>{ if(e.target.classList.contains("ov")) closeExp(); }}>
            <div className="mo">
              <div className="mh"/>
              {step==="input"&&<>
                <div className="mt">{tx.addTo} {acct?.icon} {acct?.name}</div>

                {/* Mic button zone */}
                <div className={`voicezone${listening?" active":""}`}>
                  <button className={`micbtn${listening?" active":" idle"}`} onClick={startListening}>
                    {listening
                      ? <svg width="26" height="26" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
                      : <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="2" width="6" height="13" rx="3"/>
                          <path d="M5 10a7 7 0 0 0 14 0"/>
                          <line x1="12" y1="19" x2="12" y2="22"/>
                          <line x1="9" y1="22" x2="15" y2="22"/>
                        </svg>
                    }
                  </button>
                  <div style={{flex:1}}>
                    {listening
                      ? <>
                          <div style={{fontSize:13,fontWeight:700,color:CORAL,marginBottom:6}}>Listening… tap ■ to stop</div>
                          <div className="wavebar">
                            {[0,0.1,0.2,0.15,0.3,0.2,0.1,0].map((d,n)=>(
                              <div key={n} className="wv" style={{animationDelay:`${d}s`}}/>
                            ))}
                          </div>
                        </>
                      : <>
                          <div style={{fontSize:13,fontWeight:700,color:NAVY,marginBottom:2}}>Tap mic to speak</div>
                          <div style={{fontSize:11,color:"#a0aaba"}}>e.g. "paid {cur.symbol}45 for groceries today"</div>
                        </>
                    }
                  </div>
                </div>

                {/* Transcript / text input */}
                <div className="vw">
                  <textarea ref={tRef} className="va"
                    placeholder={`Or type: "${tx.shint}…"`}
                    value={input} rows={2}
                    onChange={e=>{
                      const val=e.target.value;
                      const isVoice=val.length-prevInput.current.length>=8;
                      prevInput.current=val;
                      setInput(val);
                      if(isVoice&&val.trim().length>4){ clearTimeout(window._pt); window._pt=setTimeout(()=>parseE(val),1500); }
                    }}
                    onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); clearTimeout(window._pt); parseE(input); } }}
                    style={{borderColor:busy?`${NAVY}99`:`${NAVY}22`,minHeight:60}}/>
                  <div className="va2">
                    {busy
                      ? <span style={{fontSize:10,color:NAVY}}>{tx.parsing}</span>
                      : <span className="vh">{input.trim().length>2?"Enter to parse →":""}</span>
                    }
                    {busy
                      ? <span className="sp" style={{border:`2px solid ${NAVY}33`,borderTopColor:NAVY}}/>
                      : <button className="pb" style={{background:NAVY}} disabled={!input.trim()||busy} onClick={()=>{ clearTimeout(window._pt); parseE(input); }}>{tx.parse}</button>
                    }
                  </div>
                </div>

                {err&&<div className="em">{err}</div>}
                <div className="mb">
                  <button className="mx" onClick={closeExp}>{tx.cancel}</button>
                  <button className="mx" onClick={()=>{ clearTimeout(window._pt); if(recognitionRef.current){try{recognitionRef.current.stop();}catch{}} setListening(false); setParsed({description:"",amount:"",currency:acct.currency,category:"Other",date:td(),isRecurring:false}); setStep("confirm"); }}>{tx.manual}</button>
                </div>
              </>}
              {step==="confirm"&&parsed&&<>
                <div className="mt">{tx.confirm}</div>
                {err&&<div className="em">{err}</div>}
                <div className="ff"><label className="fl">{tx.desc}</label>
                  <input className="fi" type="text" placeholder={tx.descPh} value={parsed.description} onChange={e=>setParsed(p=>({...p,description:e.target.value}))}/>
                </div>
                <div className="fg">
                  <div className="ff" style={{margin:0}}><label className="fl">{tx.amt}</label>
                    <input className="fi" type="number" step="0.01" min="0" placeholder="0.00" value={parsed.amount} onChange={e=>setParsed(p=>({...p,amount:e.target.value}))}/>
                  </div>
                  <div className="ff" style={{margin:0}}><label className="fl">{tx.cur2}</label>
                    <input className="fi" value={`${cur.flag} ${cur.code}`} readOnly style={{color:"#888",background:SURF}}/>
                  </div>
                </div>
                <div className="fg">
                  <div className="ff" style={{margin:0}}><label className="fl">{tx.cat2}</label>
                    <select className="fi fs" value={parsed.category} onChange={e=>setParsed(p=>({...p,category:e.target.value}))}>
                      {CATS.map(c=><option key={c.label} value={c.label}>{c.emoji} {tx.c[c.label]||c.label}</option>)}
                    </select>
                  </div>
                  <div className="ff" style={{margin:0}}><label className="fl">{tx.date2}</label>
                    <input className="fi" type="date" value={parsed.date} onChange={e=>setParsed(p=>({...p,date:e.target.value}))} style={{colorScheme:"light"}}/>
                  </div>
                </div>
                <div className="mb" style={{marginTop:8}}>
                  <button className="mx" onClick={()=>setStep("input")}>{tx.back}</button>
                  <button className="mc" style={{background:NAVY}} onClick={confirmE}>{tx.addExp}</button>
                </div>
              </>}
            </div>
          </div>
        )}

        <div className={`toast${toast.show?" on":""}`}>{toast.msg}</div>
        <div style={{height:80}}/>
      </div>
    </>
  );
}