Whatsit.addPattern({id:'player',name:'Audio player',aka:['Media player','Music player','Playback controls','Now playing bar'],cat:'Media',
  say:'A play button, a line you drag to move through the track, and the time, usually with the cover and title.',
  keys:'play pause button music song podcast track line drag time skip next previous cover now playing bar seek scrub volume',
  use:'Music, podcasts, voice messages and audiobooks.',
  avoid:'Short sound effects. Those just need a button.',
  confuse:[['range','A range slider sets a value. The scrubber in a player moves through time.'],['progress','A progress bar only shows how far along something is. A scrubber can be dragged.'],['carousel','A carousel flips through pictures. A player moves through one recording.']],
  parts:[['Cover','The album or episode art'],['Title and artist','What’s playing'],['Play / pause','The main button'],['Scrubber','The line you drag to jump around'],['Time','Elapsed and total, like 0:42 / 3:20'],['Skip buttons','Previous and next, or back and forward 15 seconds']],
  opts:[['Scrubber with times','a draggable scrubber with elapsed and total time',1],['Previous and next','previous and next track buttons',1],['Mini bar that expands','a compact “now playing” bar docked at the bottom that expands to a full-screen player',0],['Speed control','a playback speed control (1×, 1.5×, 2×)',0],['Volume','a volume slider with a mute button',0]],
  a11y:'buttons labelled “Play”, “Pause”, “Next”, a scrubber that works with the arrow keys, and Space to play or pause',
  html:()=>`<div class="pl"><div class="pl-top"><div class="pl-cv" aria-hidden="true"></div><div><b>Slow Tide</b><small>The Harbor Lights</small></div></div><input class="pl-r" type="range" min="0" max="200" value="42" aria-label="Seek"><div class="pl-t"><span class="pl-a">0:42</span><span>3:20</span></div><div class="pl-c"><button aria-label="Previous"><svg viewBox="0 0 24 24"><path d="M6 5v14M19 5 9 12l10 7z"/></svg></button><button class="pl-pp" aria-label="Play"><svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z"/></svg></button><button aria-label="Next"><svg viewBox="0 0 24 24"><path d="M18 5v14M5 5l10 7-10 7z"/></svg></button></div></div>`,
  init(r){const s=r.querySelector('.pl-r'),a=r.querySelector('.pl-a'),p=r.querySelector('.pl-pp'),b=r.querySelectorAll('.pl-c button');const ico={play:'M8 5l11 7-11 7z',pause:'M8 5v14M16 5v14'};let on=false,id=0;const paint=()=>{const v=+s.value;a.textContent=Math.floor(v/60)+':'+String(v%60).padStart(2,'0');};const set=x=>{on=x;p.setAttribute('aria-label',on?'Pause':'Play');p.querySelector('path').setAttribute('d',on?ico.pause:ico.play);clearInterval(id);if(on)id=setInterval(()=>{if(!r.isConnected)return clearInterval(id);if(+s.value>=200)return set(false);s.value=+s.value+1;paint();},1000);};p.onclick=()=>set(!on);s.oninput=paint;b[0].onclick=()=>{s.value=0;paint();};b[2].onclick=()=>{s.value=0;paint();set(false);};},
  css:`
.pl{width:210px;background:var(--demo-2);border:1px solid var(--line);border-radius:14px;padding:10px 12px;display:grid;gap:5px}
.pl-top{display:flex;gap:10px;align-items:center}
.pl-cv{width:38px;height:38px;border-radius:8px;background:linear-gradient(135deg,var(--accent),#E0A526)}
.pl-top b{display:block;font-size:13px}
.pl-top small{color:var(--muted);font-size:11px}
.pl-r{width:100%;accent-color:var(--accent);margin:2px 0 0}
.pl-t{display:flex;justify-content:space-between;font:11px var(--mono);color:var(--muted)}
.pl-c{display:flex;justify-content:center;align-items:center;gap:12px}
.pl-c button{border:0;background:none;color:var(--ink);cursor:pointer;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;padding:0}
.pl-c svg{width:16px;height:16px;fill:currentColor;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.pl-c .pl-pp{background:var(--accent);color:var(--accent-ink);width:34px;height:34px}
`
});
