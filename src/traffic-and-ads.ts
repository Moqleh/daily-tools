const ar=()=>document.documentElement.dir==='rtl';

const COUNTER_BASE=0;
const COUNTER_NAMESPACE='moqleh-github-io';
const COUNTER_KEY='daily-tools-visits';

const css=document.createElement('style');
css.textContent=`.dt-ad-slot{box-sizing:border-box;width:min(94%,1180px);margin:22px auto;border-radius:18px;min-height:0;border:0;background:transparent;display:block;text-align:center;padding:0;color:#6b8298;overflow:hidden}.dt-ad-slot b{display:block;color:#285779;font-size:15px;margin-bottom:4px}.dt-ad-slot small{font-size:12px}.dt-visit-counter{box-sizing:border-box;width:min(94%,1180px);margin:4px auto 20px;display:flex;align-items:center;justify-content:center;gap:9px;color:#6b8298;font-size:14px}.dt-visit-counter .eye{font-size:18px;line-height:1}.dt-visit-counter b{color:#285779;font-size:16px;font-variant-numeric:tabular-nums}@media(max-width:650px){.dt-ad-slot{min-height:96px;margin:16px auto}.dt-visit-counter{margin-bottom:16px}}`;
document.head.appendChild(css);

function addAd(){
  if(document.querySelector('.dt-ad-slot')) return;
  const footer=document.querySelector('footer');
  if(!footer) return;
  const ad=document.createElement('aside');
  ad.className='dt-ad-slot';
  ad.setAttribute('aria-label',ar()?'مساحة إعلانية':'Advertisement area');
  ad.innerHTML=`<a href="https://whatsapp.com/channel/0029Vb94n169mrGho0W9v63j" target="_blank" rel="noopener noreferrer" aria-label="تابع قناة ملصقات متنوعة على واتساب" style="display:block;width:100%;text-decoration:none"><img src="./whatsapp-stickers-cover.jpg?v=20261015" alt="إعلان قناة ملصقات متنوعة على واتساب" style="display:block;width:100%;height:auto;aspect-ratio:2/1;object-fit:contain;max-height:none;border-radius:18px"></a>`;
  footer.parentElement?.insertBefore(ad,footer);
}

function addCounter(){
  if(document.querySelector('.dt-visit-counter')) return;
  const footer=document.querySelector('footer');
  if(!footer) return;
  const counter=document.createElement('div');
  counter.className='dt-visit-counter';
  counter.setAttribute('aria-live','polite');
  counter.innerHTML=`<span class="eye" aria-hidden="true">◉</span><span class="label">${ar()?'عدد الزيارات':'Visits'}</span><b class="value">—</b>`;
  footer.parentElement?.insertBefore(counter,footer);

  const value=counter.querySelector<HTMLElement>('.value');
  const show=(v:unknown)=>{const n=Number(v);if(value&&Number.isFinite(n)&&n>=0)value.textContent=n.toLocaleString(ar()?'ar-JO':'en-US')};
  fetch(`https://abacus.jasoncameron.dev/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`,{cache:'no-store'})
    .then(r=>{if(!r.ok)throw new Error('counter');return r.json()})
    .then(d=>show(COUNTER_BASE+Number(d.value||0)))
    .catch(()=>show(COUNTER_BASE));
}

function add(){addAd();addCounter()}
const observer=new MutationObserver(()=>add());
observer.observe(document.body,{childList:true,subtree:true});
add();

export {};
