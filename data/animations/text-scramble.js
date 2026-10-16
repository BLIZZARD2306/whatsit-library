Whatsit.addAnimation({id:'text-scramble',name:'Text scramble',aka:['Decode effect','Glitch text','Hacker text','Shuffle text'],kind:'Text',
  say:'Letters flicker through random characters before settling, left to right, into the real word.',
  keys:'letters random characters shuffle decode hacker matrix glitch text changing typing effect cycling words',
  use:'Short rotating words in a hero (“Build / Ship / Scale”), labels on hover, or a techy intro.',
  avoid:'Anything longer than a few words, or text people must read quickly.',
  tech:'A small script that rewrites the text each frame with requestAnimationFrame. No libraries.',
  parts:[['Target word','The final text it settles on'],['Glyph set','The random characters it flickers through, such as A–Z, 0–9 and !<>-_/'],['Resolve front','The point moving left to right where letters lock in'],['Cycle','The list of words it rotates through, with a pause on each']],
  motion:[['Resolve time','600–900ms per word'],['Flicker rate','a new random glyph every 1–2 frames'],['Hold','about 1.8s on each finished word'],['Order','left to right, each letter locking a little after the one before']],
  build:[
    'Keep the real word in an aria-label and render the visible letters in an aria-hidden span.',
    'For each letter, pick a random lock time between the start and the resolve time, rising from left to right.',
    'Every frame, show the real letter if its lock time has passed, otherwise a random glyph (styled dimmer).',
    'When all letters are locked, wait for the hold time, then start on the next word in the cycle.',
    'Use a monospace or fixed-width setting (font-variant-numeric: tabular-nums) so the width doesn’t jump.',
  ],
  opts:[['Cycle through words','rotating through a list of words with a pause on each',1],['Dim random letters','the random letters shown dimmer than the settled ones',1],['Scramble on hover','replaying the scramble when hovered',0],['Monospace font','a monospace font so the width stays steady',1]],
  perf:'Update only the text node; stop the loop between words; never run more than a few on screen at once.',
  a11y:'the real word exposed through aria-label (not announced letter by letter) and the final word shown without scrambling under prefers-reduced-motion',
  html:()=>`<div class="ts"><small>We help you</small><b class="ts-w" aria-label="Build"><span aria-hidden="true">Build</span></b></div>`,
  init(root){
    const words=['Build','Ship','Scale','Launch'],G='ABCDEFGHJKLMNPQRSTUVWXYZ0123456789!<>/_-',b=root.querySelector('.ts-w'),s=b.firstChild;
    let wi=0,start=0,locks=[];
    const next=t=>{wi=(wi+1)%words.length;start=t;locks=[...words[wi]].map((_,i,a)=>.15+(i/a.length)*.55+Math.random()*.15);b.setAttribute('aria-label',words[wi]);};
    Whatsit.loop(root,t=>{
      if(!locks.length){if(t>1.6)next(t);return;}
      const e=t-start,w=words[wi];
      if(e>.95+1.8){next(t);return;}
      s.innerHTML=[...w].map((ch,i)=>e>=locks[i]?ch:`<i>${G[(Math.random()*G.length)|0]}</i>`).join('');
    });
  },
  css:`
.ts{display:grid;gap:4px;text-align:center}
.ts small{font:500 12px var(--mono);text-transform:uppercase;letter-spacing:.12em;color:var(--muted)}
.ts-w{font:700 34px/1 var(--mono);letter-spacing:.02em;color:var(--ink);min-width:7ch}
.ts-w i{font-style:normal;color:var(--accent);opacity:.7}
`
});
