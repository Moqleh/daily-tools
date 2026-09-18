window.addEventListener('dailytools:launch',e=>{
 if(e.defaultPrevented)return;
 const name=(e as CustomEvent<{label?:string}>).detail?.label?.trim();
 if(!name)return;
 alert(document.documentElement.lang==='en'?`Tool: ${name}`:`الأداة: ${name}`);
});
