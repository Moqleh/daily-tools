const ar=()=>document.documentElement.dir==='rtl';

const css=document.createElement('style');
css.textContent=`.dt-ad-slot{box-sizing:border-box;width:min(94%,1180px);margin:22px auto;border-radius:22px;min-height:112px;border:1px dashed #9fc7e4;background:rgba(255,255,255,.72);display:grid;place-items:center;text-align:center;padding:18px;color:#6b8298}.dt-ad-slot b{display:block;color:#285779;font-size:15px;margin-bottom:4px}.dt-ad-slot small{font-size:12px}@media(max-width:650px){.dt-ad-slot{min-height:96px;margin:16px auto}}`;
document.head.appendChild(css);

function add(){
  if(document.querySelector('.dt-ad-slot')) return;
  const footer=document.querySelector('footer');
  if(!footer) return;
  const ad=document.createElement('aside');
  ad.className='dt-ad-slot';
  ad.setAttribute('aria-label',ar()?'مساحة إعلانية':'Advertisement area');
  ad.innerHTML=`<div><b>${ar()?'مساحة إعلانية':'Advertisement'}</b><small>${ar()?'مكان مخصص لإعلان مستقبلي':'Reserved for a future ad'}</small></div>`;
  footer.parentElement?.insertBefore(ad,footer);
}

const observer=new MutationObserver(()=>add());
observer.observe(document.body,{childList:true,subtree:true});
add();

export {};
