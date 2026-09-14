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
  const wa=document.createElement('a');wa.className='dt-whatsapp';wa.href='https://wa.me/962799880062';wa.target='_blank';wa.rel='noopener noreferrer';wa.textContent=isAr()?'واتساب: 00962799880062':'WhatsApp: +962 79 988 0062';contact.appendChild(wa);
 }
 const legalBox=[...footer.querySelectorAll('div')].find(x=>x.querySelector('strong')?.textContent?.includes(isAr()?'الخصوصية':'Privacy'));
 if(legalBox){
  legalBox.innerHTML='';
  ([['privacy','الخصوصية','Privacy'],['terms','الشروط','Terms'],['disclaimer','إخلاء المسؤولية','Disclaimer']] as [LegalKey,string,string][]).forEach(([key,a,e],i)=>{
   const b=document.createElement('button');b.type='button';b.className='dt-legal-link';b.textContent=isAr()?a:e;b.onclick=()=>showLegal(key);legalBox.appendChild(b);if(i<2)legalBox.append(' • ');
  });
 }
}

const css=document.createElement('style');css.textContent=`.dt-whatsapp{display:block;margin-top:6px;font-weight:800;text-decoration:none}.dt-legal-link{border:0;background:none;padding:0;color:inherit;font:inherit;font-weight:800;cursor:pointer}.dt-legal-link:hover,.dt-whatsapp:hover{text-decoration:underline}.dt-legal-back{position:fixed;inset:0;z-index:10000;background:rgba(8,31,51,.58);display:grid;place-items:center;padding:20px}.dt-legal{position:relative;width:min(92vw,650px);background:#fff;color:#18384f;border-radius:22px;padding:30px;box-shadow:0 24px 70px rgba(0,0,0,.25);line-height:1.9}.dt-legal h2{margin:0 0 14px;color:#174f78}.dt-legal p{margin:0}.dt-legal-close{position:absolute;top:10px;inset-inline-end:14px;border:0;background:none;font-size:30px;cursor:pointer;color:#587487}`;document.head.appendChild(css);

const observer=new MutationObserver(enhanceFooter);observer.observe(document.body,{childList:true,subtree:true});enhanceFooter();

export {};
