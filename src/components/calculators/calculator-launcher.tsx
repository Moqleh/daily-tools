import {createRoot,Root} from 'react-dom/client';
import CalculatorTools from './CalculatorTools';
type Tool='age'|'percentage'|'discount'|'dates'|'bill';
const map:Record<string,Tool>={'حاسبة العمر':'age','Age calculator':'age','النسبة المئوية':'percentage','Percentage':'percentage','الخصم':'discount','Discount':'discount','فرق تاريخين':'dates','Date difference':'dates','تقسيم الفاتورة':'bill','Split bill':'bill'};
let root:Root|null=null;
const text=(el:Element)=>Array.from(el.childNodes).filter(n=>n.nodeType===Node.TEXT_NODE).map(n=>n.textContent||'').join('').trim();
window.addEventListener('click',e=>{const target=e.target as Element|null,button=target?.closest('.subgrid button');if(!button)return;const tool=map[text(button)];if(!tool)return;e.preventDefault();e.stopImmediatePropagation();let host=document.getElementById('calculator-tool-root');if(!host){host=document.createElement('div');host.id='calculator-tool-root';document.body.appendChild(host);root=createRoot(host)}root!.render(<CalculatorTools tool={tool} onClose={()=>root!.render(<></>)}/>)},true);
