// Functional replacements for the Games category.
// Capture at window level so these actions run before legacy document handlers.
const isArabic = () => document.documentElement.dir === 'rtl';
const gameLabels = new Set(['XO','Tic Tac Toe','حجر ورقة مقص','Rock Paper Scissors','تحدي حساب','Math challenge','ألغاز','Puzzles']);

function labelOf(button: Element) {
  return Array.from(button.childNodes)
    .filter(n => n.nodeType === Node.TEXT_NODE)
    .map(n => n.textContent || '')
    .join('').trim();
}

function show(message: string) { window.alert(message); }

function playTicTacToe() {
  const ar = isArabic();
  let board = Array(9).fill('·');
  const win = (p:string) => [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].some(a=>a.every(i=>board[i]===p));
  for (let turn=0; turn<9; turn++) {
    const view = `${board.slice(0,3).join('  ')}\n${board.slice(3,6).join('  ')}\n${board.slice(6,9).join('  ')}`;
    const raw = prompt((ar?'لعبة XO — اختر خانة من 1 إلى 9\n':'XO — choose a cell from 1 to 9\n')+view);
    if (raw === null) return;
    const i = Number(raw)-1;
    if (i<0 || i>8 || board[i] !== '·') { show(ar?'الخانة غير متاحة، اختر رقماً من 1 إلى 9.':'That cell is unavailable. Choose 1–9.'); turn--; continue; }
    board[i]='X';
    if (win('X')) { show(ar?'فزت! 🎉':'You won! 🎉'); return; }
    const empty=board.map((v,i)=>v==='·'?i:-1).filter(i=>i>=0);
    if (!empty.length) break;
    const cpu=empty[Math.floor(Math.random()*empty.length)]; board[cpu]='O';
    if (win('O')) { show(ar?'فاز الكمبيوتر. جرّب مرة ثانية.':'Computer won. Try again.'); return; }
  }
  show(ar?'تعادل!':'Draw!');
}

function rps() {
  const ar=isArabic(), choices=ar?['حجر','ورقة','مقص']:['rock','paper','scissors'];
  const input=(prompt(ar?'اكتب: حجر أو ورقة أو مقص':'Type: rock, paper, or scissors')||'').trim().toLowerCase();
  const map:Record<string,number>={حجر:0,ورقة:1,مقص:2,rock:0,paper:1,scissors:2};
  if (!(input in map)) return show(ar?'اختيار غير صحيح.':'Invalid choice.');
  const u=map[input], c=Math.floor(Math.random()*3), result=u===c?0:(u-c+3)%3===1?1:-1;
  show(`${ar?'اختيار الكمبيوتر':'Computer'}: ${choices[c]}\n${result===0?(ar?'تعادل':'Draw'):result===1?(ar?'فزت! 🎉':'You won! 🎉'):(ar?'فاز الكمبيوتر':'Computer won')}`);
}

function mathChallenge() {
  const ar=isArabic(), a=Math.ceil(Math.random()*30), b=Math.ceil(Math.random()*30), op=Math.random()<.5?'+':'×', answer=op==='+'?a+b:a*b;
  const v=prompt(`${a} ${op} ${b} = ?`); if(v===null)return;
  show(Number(v)===answer?(ar?'إجابة صحيحة! 🎉':'Correct! 🎉'):(ar?`الإجابة الصحيحة: ${answer}`:`Correct answer: ${answer}`));
}

function puzzle() {
  const ar=isArabic();
  const puzzles=ar?[
    ['ما الشيء الذي كلما أخذت منه كبر؟','الحفرة'],
    ['له أسنان ولا يعض، ما هو؟','المشط'],
    ['يمشي بلا أرجل ويبكي بلا عيون، ما هو؟','السحاب']
  ]:[
    ['What gets bigger the more you take away?','A hole'],
    ['What has teeth but cannot bite?','A comb'],
    ['What can travel around the world while staying in a corner?','A stamp']
  ];
  const [q,a]=puzzles[Math.floor(Math.random()*puzzles.length)];
  const v=prompt(q); if(v===null)return; show(`${ar?'الإجابة':'Answer'}: ${a}`);
}

window.addEventListener('click', e => {
  const target=e.target as Element|null; const button=target?.closest('.subgrid button'); if(!button)return;
  const label=labelOf(button); if(!gameLabels.has(label))return;
  e.preventDefault(); e.stopImmediatePropagation();
  if(label==='XO'||label==='Tic Tac Toe') playTicTacToe();
  else if(label==='حجر ورقة مقص'||label==='Rock Paper Scissors') rps();
  else if(label==='تحدي حساب'||label==='Math challenge') mathChallenge();
  else puzzle();
}, true);
