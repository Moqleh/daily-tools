const directText=(el:Element)=>Array.from(el.childNodes).filter(n=>n.nodeType===Node.TEXT_NODE).map(n=>n.textContent||'').join('').trim();
document.addEventListener('click',e=>{
 const target=e.target as Element|null;
 const button=target?.closest('button[data-tool-id]') as HTMLButtonElement|null;
 if(!button)return;
 const name=directText(button);
 if(!name)return;
 alert(document.documentElement.lang==='en'?`Tool: ${name}`:`الأداة: ${name}`);
});
