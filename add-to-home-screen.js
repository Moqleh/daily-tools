/* Daily Tools — Add to Home Screen only; never trigger PWA Install app */
(()=>{
 const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 const mobile=()=>/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||matchMedia('(max-width:820px)').matches;
 const ios=()=>/iPhone|iPad|iPod/i.test(navigator.userAgent);
 const ar=()=>document.documentElement.dir==='rtl'||document.documentElement.lang==='ar';
 function mount(){
  if(!mobile()||standalone()||document.getElementById('dtHomeBanner'))return;
  const box=document.createElement('div');box.id='dtHomeBanner';
  box.style.cssText='position:fixed;z-index:2147483646;left:50%;bottom:max(16px,env(safe-area-inset-bottom));transform:translateX(-50%);width:min(92vw,520px);box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;border:1px solid #dbe7f7;border-radius:16px;background:#fff;color:#071d49;box-shadow:0 12px 36px rgba(7,29,73,.16);font:600 14px/1.5 system-ui,-apple-system,Segoe UI,Arial,sans-serif';
  const text=document.createElement('span');text.textContent=ar()?'أضف أدواتك اليومية إلى الشاشة الرئيسية.':'Add Daily Tools to your Home Screen.';
  const b=document.createElement('button');b.type='button';b.textContent=ar()?'إضافة إلى الشاشة الرئيسية':'Add to Home Screen';b.style.cssText='border:0;border-radius:12px;padding:10px 13px;background:#0b5ed7;color:#fff;font:700 13px system-ui,-apple-system,Segoe UI,Arial,sans-serif;white-space:nowrap;cursor:pointer';
  b.addEventListener('click',()=>{text.textContent=ios()?(ar()?'اضغط مشاركة ثم إضافة إلى الشاشة الرئيسية':'Tap Share, then Add to Home Screen'):(ar()?'اضغط قائمة المتصفح ⋮ ثم إضافة إلى الشاشة الرئيسية':'Tap browser menu ⋮, then Add to Home screen');b.textContent=ar()?'حسنًا':'Got it';b.onclick=()=>box.remove()});
  box.append(text,b);document.body.appendChild(box);
 }
 addEventListener('beforeinstallprompt',e=>e.preventDefault());
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(mount,500));else setTimeout(mount,500);
})();
