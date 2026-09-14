import {mkdir,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
const base='https://moqleh.github.io/daily-tools/';
const cats=[
['الحاسبات','Calculators',['حاسبة العمر','النسبة المئوية','الخصم','فرق تاريخين','تقسيم الفاتورة','تكلفة الوقود'],['Age calculator','Percentage','Discount','Date difference','Split bill','Fuel cost']],
['التاريخ والتقويم','Date & Calendar',['تاريخ اليوم','فرق تاريخين','إضافة أيام','طرح أيام','رقم الأسبوع','عد تنازلي'],['Today','Date difference','Add days','Subtract days','Week number','Countdown']],
['الوقت والساعة','Time & Clock',['ساعة رقمية','مؤقت','ساعة إيقاف','تحويل ساعات ودقائق','مدة زمنية'],['Digital clock','Timer','Stopwatch','Hours & minutes','Duration']],
['تحويل الوحدات','Unit Conversion',['الطول','الوزن','المساحة','الحجم','الحرارة','السرعة'],['Length','Weight','Area','Volume','Temperature','Speed']],
['السيارة والسفر','Car & Travel',['استهلاك الوقود','تكلفة الرحلة','كم/لتر','لتر/100كم','ميل/كم','قائمة سفر'],['Fuel consumption','Trip cost','Km/L','L/100km','Miles/Km','Travel checklist']],
['المال والادخار','Money & Savings',['هدف الادخار','فائدة بسيطة','فائدة مركبة','ROI','تقسيم الميزانية','شهري/سنوي'],['Savings goal','Simple interest','Compound interest','ROI','Budget split','Monthly/Annual']],
['العقار والسكن','Property & Housing',['الإيجار الشهري/السنوي','سعر المتر','مساحة العقار','تقسيم الإيجار','دفعة أولى','ميزانية سكن'],['Monthly/annual rent','Price per meter','Property area','Split rent','Down payment','Housing budget']],
['الموظف والراتب','Employee & Salary',['الراتب الشهري/السنوي','زيادة الراتب','العمل الإضافي','رصيد الإجازات','بدل الإجازة','نهاية الخدمة'],['Monthly/annual salary','Salary increase','Overtime','Leave balance','Leave pay','End of service']],
['أدوات النصوص','Text Tools',['عد الكلمات','عد الحروف','إزالة الفراغات','ترتيب الأسطر','إزالة التكرار','وقت القراءة'],['Word count','Character count','Trim spaces','Sort lines','Remove duplicates','Reading time']],
['التعليم','Education',['المعدل','النسبة','المتوسط','الدرجة المطلوبة','مؤقت مذاكرة','جدول الضرب'],['Average','Percentage','Mean','Required grade','Study timer','Times table']],
['الصحة العامة','General Health',['BMI','تحويل الطول','تحويل الوزن','احتياج الماء التقريبي','BMR','Pace'],['BMI','Height conversion','Weight conversion','Water estimate','BMR','Pace']],
['المطبخ','Kitchen',['جرام/كيلو','مل/لتر','كوب/مل','مئوي/فهرنهايت','مضاعفة الوصفة','مؤقت مطبخ'],['Gram/Kg','ml/L','Cup/ml','Celsius/Fahrenheit','Scale recipe','Kitchen timer']],
['الرموز والباركود','QR & Barcode',['QR لرابط','QR لنص','QR لهاتف','QR لبريد','QR لـ Wi-Fi'],['QR for link','QR for text','QR for phone','QR for email','QR for Wi-Fi']],
['الأمان والخصوصية','Security & Privacy',['مولد كلمة مرور','فحص القوة محلياً','مولد PIN','عبارة مرور','نصائح حماية'],['Password generator','Password strength','PIN generator','Passphrase','Protection tips']],
['الاختيار والقرعة','Random & Draw',['رقم عشوائي','اختيار اسم','قرعة','رمي نرد','قلب عملة','عجلة اختيار'],['Random number','Pick a name','Draw','Dice','Coin flip','Choice wheel']],
['الألعاب','Games',['XO','حجر ورقة مقص','تحدي حساب','ألغاز'],['Tic Tac Toe','Rock Paper Scissors','Math challenge','Puzzles']],
['أدوات يومية متنوعة','Daily Utilities',['عداد نقرات','عداد أيام','مولد قائمة','تقسيم قائمة','مؤقت تركيز','ملاحظات مؤقتة'],['Click counter','Day counter','List maker','Split list','Focus timer','Temporary notes']],
['مواقع الصور','Image Websites',['ضغط الصور','تغيير الحجم','إزالة الخلفية','تحويل الصيغ','تصميم الصور'],['Compress images','Resize images','Remove background','Convert formats','Image design']],
['مواقع الفيديو','Video Websites',['قص الفيديو','ضغط الفيديو','تحويل الصيغة','تحرير الفيديو','تسجيل الشاشة'],['Trim video','Compress video','Convert format','Video editing','Screen recording']],
['مواقع مفيدة','Useful Websites',['تعليم','إنتاجية','سفر','تقنية','مراجع'],['Education','Productivity','Travel','Technology','References']]
];
const esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const urls=[base];
for(let ci=0;ci<cats.length;ci++){
 const [catAr,catEn,arTools,enTools]=cats[ci];
 for(let ti=0;ti<arTools.length;ti++){
  const id=`c${ci}-t${ti}`,dir=join('public','tools',id); await mkdir(dir,{recursive:true});
  const ar=arTools[ti],en=enTools[ti],url=`${base}tools/${id}/`; urls.push(url);
  const desc=`${ar} (${en}) ضمن ${catAr}. أداة مجانية وسريعة من أدواتك اليومية، تعمل بدون تسجيل.`;
  const html=`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(ar)} | ${esc(en)} — أدواتك اليومية</title><meta name="description" content="${esc(desc)}"><meta name="robots" content="index,follow"><link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(ar)} | ${esc(en)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta name="theme-color" content="#0b4f8a"><link rel="manifest" href="../../manifest.webmanifest"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'WebApplication',name:`${ar} | ${en}`,url,applicationCategory:'UtilitiesApplication',operatingSystem:'Any',isAccessibleForFree:true,inLanguage:['ar','en']})}</script><style>*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;background:#f5f9fd;color:#0b315f;min-height:100vh;display:grid;place-items:center;padding:24px}.card{max-width:680px;background:#fff;border:1px solid #dce8f3;border-radius:28px;padding:clamp(28px,6vw,52px);box-shadow:0 18px 55px rgba(11,49,95,.1)}.brand{font-weight:800;color:#0b67b2}.eyebrow{color:#6f879d;margin-top:28px}h1{font-size:clamp(2rem,6vw,3.7rem);margin:.25em 0}.en{font-size:1.15rem;color:#5c7690}p{line-height:1.9;color:#526b84}a{display:inline-block;margin-top:16px;background:#0b67b2;color:#fff;text-decoration:none;padding:13px 22px;border-radius:14px;font-weight:700}</style></head><body><main class="card"><div class="brand">MO • أدواتك اليومية</div><div class="eyebrow">${esc(catAr)} • ${esc(catEn)}</div><h1>${esc(ar)}</h1><div class="en">${esc(en)}</div><p>${esc(desc)}</p><a href="../../#tool=${id}">فتح الأداة الآن</a></main></body></html>`;
  await writeFile(join(dir,'index.html'),html);
 }
}
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(join('public','sitemap.xml'),sitemap);
console.log(`Generated ${urls.length-1} tool pages and sitemap.`);
