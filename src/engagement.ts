const textOnly=(el:Element)=>Array.from(el.childNodes).filter(n=>n.nodeType===Node.TEXT_NODE).map(n=>n.textContent||'').join('').trim();
window.addEventListener('click',e=>{
 const target=e.target as Element|null;
 const button=target?.closest('button[data-tool-id]') as HTMLButtonElement|null;
 if(!button)return;
 const label=textOnly(button);
 const id=button.dataset.toolId;
 if(label)window.dispatchEvent(new CustomEvent('dailytools:used',{detail:label}));
 if(id&&history.replaceState)history.replaceState(null,'',`${location.pathname}${location.search}#tool=${id}`);
},true);
