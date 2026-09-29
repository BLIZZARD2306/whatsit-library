// Everyday fonts, display fonts and the font glossary. All from Google Fonts (OFL).
Whatsit.fonts = [
  {name:'Plus Jakarta Sans',cat:'Sans-serif',mood:'Modern, friendly, confident',use:'SaaS apps, dashboards, landing pages',pairs:['Fraunces','Lora']},
  {name:'DM Sans',cat:'Sans-serif',mood:'Clean, geometric, low-key',use:'Body text and app interfaces',pairs:['DM Serif Display','Playfair Display']},
  {name:'Manrope',cat:'Sans-serif',mood:'Technical, crisp',use:'Fintech, dev tools, data-heavy apps',pairs:['Lora','JetBrains Mono']},
  {name:'Outfit',cat:'Sans-serif',mood:'Round, playful, bold',use:'Consumer apps and startups',pairs:['DM Sans','Lora']},
  {name:'Nunito',cat:'Sans-serif',mood:'Soft, approachable',use:'Education, kids, wellness',pairs:['Fraunces','Caveat']},
  {name:'Atkinson Hyperlegible',cat:'Sans-serif',mood:'Built to be easy to read',use:'Accessibility-first apps, long reading',pairs:['Bricolage Grotesque','Fraunces']},
  {name:'Playfair Display',cat:'Serif',mood:'Elegant, high-contrast',use:'Fashion, luxury, headlines only',pairs:['DM Sans','Manrope']},
  {name:'Fraunces',cat:'Serif',mood:'Warm, quirky, old-style',use:'Food, blogs, lifestyle brands',pairs:['Plus Jakarta Sans','Nunito']},
  {name:'Lora',cat:'Serif',mood:'Calm, bookish',use:'Articles and long reading',pairs:['Manrope','Plus Jakarta Sans']},
  {name:'DM Serif Display',cat:'Serif',mood:'Classic, editorial',use:'Big headlines',pairs:['DM Sans','Outfit']},
  {name:'Bricolage Grotesque',cat:'Display',mood:'Characterful, chunky',use:'Hero headlines and brand names',pairs:['Atkinson Hyperlegible','DM Sans']},
  {name:'Bebas Neue',cat:'Display',mood:'Tall, loud, all caps',use:'Posters, sports, gaming',pairs:['DM Sans','Outfit']},
  {name:'Syne',cat:'Display',mood:'Artsy, wide, experimental',use:'Portfolios and creative agencies',pairs:['Manrope','DM Sans']},
  {name:'JetBrains Mono',cat:'Monospace',mood:'Techy, precise',use:'Code, numbers, developer tools',pairs:['Manrope','Plus Jakarta Sans']},
  {name:'Caveat',cat:'Handwritten',mood:'Casual, personal',use:'Small accents and notes, never body text',pairs:['Nunito','DM Sans']},
];

// wf = rough width factor so wide faces shrink and condensed faces grow inside the reel card
Whatsit.displayFonts = [
  {name:'Cinzel Decorative',like:'Cirlce',moods:['Fantasy','Mythical','Regal'],style:'Flared capitals that look carved in stone',body:'Lora',wf:.95},
  {name:'Italiana',like:'Cirlce',moods:['Elegant','Luxury','Editorial'],style:'Thin, tall, high-contrast serif',body:'DM Sans',wf:.7},
  {name:'Poiret One',like:'Camood',moods:['Art deco','Magical','Elegant'],style:'Thin geometric lines from the 1920s',body:'Manrope',wf:.75},
  {name:'Josefin Sans',like:'Camood',moods:['Art deco','Vintage','Minimal'],style:'Geometric with a vintage, low-waisted feel',body:'Lora',wf:.75,weight:300},
  {name:'Bodoni Moda',like:'Aroug',moods:['Luxury','Fashion','Editorial'],style:'Razor-thin hairlines and heavy stems',body:'DM Sans',wf:.8},
  {name:'Playfair Display',like:'Aroug',moods:['Elegant','Romantic','Editorial'],style:'Classic high-contrast serif with soft curves',body:'DM Sans',wf:.8},
  {name:'Bagel Fat One',like:'Raccon',moods:['Groovy','Playful','Retro'],style:'Chunky, soft and bouncy',body:'Nunito',wf:1.05},
  {name:'Shrikhand',like:'Raccon',moods:['Retro','Groovy','Bold'],style:'Heavy slanted 70s display letters',body:'DM Sans',wf:1},
  {name:'Titan One',like:'Raccon',moods:['Playful','Kids','Bold'],style:'Round, heavy, friendly',body:'Nunito',wf:.9},
  {name:'Michroma',like:'Agile',moods:['Futuristic','Techy','Sci-fi'],style:'Wide, squared letters from a control panel',body:'Manrope',wf:1.35},
  {name:'Syncopate',like:'Agile',moods:['Futuristic','Minimal','Techy'],style:'Very wide, clean capitals',body:'Manrope',wf:1.45,weight:700},
  {name:'Anton',like:'Nexus',moods:['Bold','Poster','Sporty'],style:'Tall, condensed and heavy',body:'DM Sans',wf:.55},
  {name:'Bebas Neue',like:'Nexus',moods:['Poster','Cinematic','Bold'],style:'Condensed all-caps headline face',body:'DM Sans',wf:.5},
  {name:'Big Shoulders Display',like:'Nexus',moods:['Industrial','Poster','Urban'],style:'Narrow, heavy, city-signage letters',body:'Plus Jakarta Sans',wf:.5,weight:800},
];

Whatsit.fontGlossary = [['Serif','Letters have small “feet”. Feels classic and bookish.'],['Sans-serif','No feet. Clean and modern; the usual choice for apps.'],['Display','Made for big sizes only, like headlines and logos.'],['Monospace','Every letter is the same width. Used for code and numbers.'],['Handwritten','Looks written by hand. Use for small accents only.'],['Weight','How thick the letters are: 400 is regular, 700 is bold.'],['Pairing','One font for headings, another for body text.']];
