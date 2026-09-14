const isAr=()=>document.documentElement.dir==='rtl';

const legal={
 privacy:{arTitle:'سياسة الخصوصية',enTitle:'Privacy Policy',ar:'نحترم خصوصيتك. صُممت الأدوات المحلية لمعالجة المدخلات داخل جهازك قدر الإمكان. قد تستخدم بعض الروابط خدمات خارجية مستقلة تخضع لسياسات أصحابها. لا تُدخل بيانات حساسة في الخدمات الخارجية.',en:'We respect your privacy. Local tools are designed to process inputs on your device whenever possible. Some links may use independent third-party services governed by their own policies. Do not enter sensitive data into external services.'},
 terms:{arTitle:'الشروط والأحكام',enTitle:'Terms & Conditions',ar:'باستخدام أدواتك اليومية فإنك توافق على استخدام الموقع بصورة قانونية ومسؤولة. الأدوات والنتائج مقدمة للمساعدة العامة، وقد تتغير أو تُحدّث دون إشعار مسبق.',en:'By using Daily Tools, you agree to use the website lawfully and responsibly. Tools and results are provided for general assistance and may be changed or updated without prior notice.'},
 disclaimer:{arTitle:'إخلاء المسؤولية',enTitle:'Disclaimer',ar:'النتائج والحسابات والمعلومات في الموقع إرشادية وعامة وليست بديلاً عن الاستشارة المهنية أو الطبية أو المالية أو القانونية أو عن المصادر الرسمية. تحقّق دائماً من المعلومات المهمة قبل الاعتماد عليها.',en:'Results, calculations and information on this website are general guidance only and do not replace professional, medical, financial, legal advice or official sources. Always verify important information before relying on it.'}
};

type LegalKey=keyof typeof legal;

function showLegal(key:LegalKey){
 const item=legal[key],ar=isAr();
 let back=document.querySelector<HTMLElement>('.dt-legal-back');
 if(!back){
  back=document.createElement('div');back.className='dt-legal-back';
  back.innerHTML='<section class="dt-legal" role="dialog" aria-modal="true"><button class="dt-legal-close" aria-label="Close">×</button><h2></h2><p></p></section>';
  document.body.appendChild(back);
  back.addEventListener('click',e=>{if(e.target===back)back?.remove()});
  back.querySelector('.dt-legal-close')?.addEventListener('click',()=>back?.remove());
 }
 const title=back.querySelector('h2'),text=back.querySelector('p');
 if(title)title.textContent=ar?item.arTitle:item.enTitle;
 if(text)text.textContent=ar?item.ar:item.en;
}

function enhanceFooter(){
 const footer=document.querySelector('footer');if(!footer)return;
 const contact=[...footer.querySelectorAll('div')].find(x=>x.querySelector('a[href^="mailto:"]'));
 if(contact&&!contact.querySelector('.dt-whatsapp')){
  const wa=document.createElement('a');
  wa.className='dt-whatsapp';
  wa.href='https://wa.me/962799880062';
  wa.target='_blank';
  wa.rel='noopener noreferrer';
  wa.setAttribute('aria-label',isAr()?'تواصل عبر واتساب على الرقم 00962799880062':'Contact on WhatsApp at +962 79 988 0062');
  wa.title=isAr()?'تواصل عبر واتساب':'Contact on WhatsApp';
  wa.innerHTML='<span class="dt-wa-icon"><svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.03 3C8.86 3 3.03 8.83 3.03 16c0 2.29.6 4.52 1.75 6.48L3 29l6.7-1.75A12.94 12.94 0 0 0 16.03 29C23.2 29 29 23.17 29 16S23.2 3 16.03 3Zm0 23.82a10.8 10.8 0 0 1-5.5-1.5l-.4-.24-3.98 1.04 1.06-3.88-.26-.4A10.78 10.78 0 0 1 5.21 16c0-5.96 4.86-10.82 10.82-10.82 5.97 0 10.8 4.86 10.8 10.82s-4.83 10.82-10.8 10.82Zm5.93-8.1c-.32-.16-1.9-.94-2.2-1.04-.29-.11-.5-.16-.71.16-.22.32-.83 1.04-1.02 1.25-.19.21-.37.24-.7.08-.32-.16-1.36-.5-2.59-1.6a9.76 9.76 0 0 1-1.8-2.24c-.19-.32-.02-.5.14-.65.15-.14.32-.37.48-.56.16-.19.22-.32.32-.54.11-.21.06-.4-.02-.56-.08-.16-.72-1.73-.99-2.37-.26-.63-.53-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.66 0 1.57 1.15 3.08 1.31 3.3.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.83.68.77.25 1.46.21 2.01.13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.3-.22-.62-.38Z"/></svg></span><span class="dt-wa-number">00962799880062</span>';
  contact.appendChild(wa);
 }
 const legalBox=[...footer.querySelectorAll('div')].find(x=>x.querySelector('strong')?.textContent?.includes(isAr()?'الخصوصية':'Privacy'));
 if(legalBox){
  legalBox.innerHTML='';
  ([['privacy','الخصوصية','Privacy'],['terms','الشروط','Terms'],['disclaimer','إخلاء المسؤولية','Disclaimer']] as [LegalKey,string,string][]).forEach(([key,a,e],i)=>{
   const b=document.createElement('button');b.type='button';b.className='dt-legal-link';b.textContent=isAr()?a:e;b.onclick=()=>showLegal(key);legalBox.appendChild(b);if(i<2)legalBox.append(' • ');
  });
 }
}

const css=document.createElement('style');css.textContent=`.dt-whatsapp{display:inline-flex;align-items:center;gap:10px;margin-top:8px;color:inherit;text-decoration:none;font-weight:800;direction:ltr}.dt-wa-icon{display:inline-grid;place-items:center;width:42px;height:42px;border-radius:50%;background:#25D366;color:#fff;box-shadow:0 6px 16px rgba(37,211,102,.28);transition:transform .18s ease,box-shadow .18s ease}.dt-wa-icon svg{width:25px;height:25px;display:block}.dt-wa-number{font-variant-numeric:tabular-nums;white-space:nowrap}.dt-whatsapp:hover .dt-wa-icon{transform:translateY(-2px) scale(1.04);box-shadow:0 9px 20px rgba(37,211,102,.34)}.dt-whatsapp:hover .dt-wa-number{text-decoration:underline}.dt-whatsapp:focus-visible{outline:3px solid rgba(37,211,102,.35);outline-offset:3px;border-radius:8px}.dt-legal-link{border:0;background:none;padding:0;color:inherit;font:inherit;font-weight:800;cursor:pointer}.dt-legal-link:hover{text-decoration:underline}.dt-legal-back{position:fixed;inset:0;z-index:10000;background:rgba(8,31,51,.58);display:grid;place-items:center;padding:20px}.dt-legal{position:relative;width:min(92vw,650px);background:#fff;color:#18384f;border-radius:22px;padding:30px;box-shadow:0 24px 70px rgba(0,0,0,.25);line-height:1.9}.dt-legal h2{margin:0 0 14px;color:#174f78}.dt-legal p{margin:0}.dt-legal-close{position:absolute;top:10px;inset-inline-end:14px;border:0;background:none;font-size:30px;cursor:pointer;color:#587487}`;document.head.appendChild(css);

const observer=new MutationObserver(enhanceFooter);observer.observe(document.body,{childList:true,subtree:true});enhanceFooter();

export {};
