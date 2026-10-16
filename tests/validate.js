// Checks every data file so a contribution can't break the library.
// Run: node tests/validate.js   (no dependencies)
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);

// Load the data files into a sandbox with no DOM.
const ctx = { window: {}, console };
ctx.window = ctx;
vm.createContext(ctx);
const run = (f) => {
  try { vm.runInContext(read(f), ctx, { filename: f }); }
  catch (e) { fail(f, `does not run: ${e.message}`); }
};
run('data/registry.js');
run('data/patterns/index.js');
const W = ctx.Whatsit;

// ---- pattern manifest vs files on disk ----
const onDisk = fs.readdirSync(path.join(root, 'data/patterns'))
  .filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.startsWith('_'))
  .map((f) => f.slice(0, -3));
for (const id of onDisk) if (!W.patternFiles.includes(id)) fail('data/patterns/index.js', `"${id}.js" exists but is not listed`);
for (const id of W.patternFiles) {
  if (!onDisk.includes(id)) { fail('data/patterns/index.js', `"${id}" is listed but data/patterns/${id}.js is missing`); continue; }
  const before = W.patterns.length;
  run(`data/patterns/${id}.js`);
  if (W.patterns.length !== before + 1) fail(`data/patterns/${id}.js`, 'must call Whatsit.addPattern({...}) exactly once');
  else if (W.patterns[before].id !== id) fail(`data/patterns/${id}.js`, `id is "${W.patterns[before].id}" but the file is named "${id}"`);
}
if (new Set(W.patterns.map((p) => p.id)).size !== W.patterns.length) fail('patterns', 'duplicate ids');

// ---- each pattern's fields ----
const ids = new Set(W.patterns.map((p) => p.id));
const CATS = ['Forms', 'Navigation', 'Overlays', 'Feedback', 'Media', 'Layout', 'Data'];
const str = (v) => typeof v === 'string' && v.trim().length > 0;
for (const p of W.patterns) {
  const at = `data/patterns/${p.id}.js`;
  for (const k of ['name', 'cat', 'say', 'keys', 'use', 'avoid', 'a11y']) if (!str(p[k])) fail(at, `"${k}" must be a non-empty string`);
  if (p.cat && !CATS.includes(p.cat)) fail(at, `cat "${p.cat}" must be one of ${CATS.join(', ')}`);
  if (!Array.isArray(p.aka) || !p.aka.length || !p.aka.every(str)) fail(at, '"aka" must be a non-empty list of names');
  if (!Array.isArray(p.parts) || p.parts.length < 2 || !p.parts.every((x) => Array.isArray(x) && x.length === 2 && x.every(str))) fail(at, '"parts" must be at least 2 [name, explanation] pairs');
  if (!Array.isArray(p.opts) || !p.opts.length || !p.opts.every((x) => Array.isArray(x) && str(x[0]) && str(x[1]) && (x[2] === 0 || x[2] === 1))) fail(at, '"opts" must be [label, prompt text, 0 or 1] triples');
  if (!Array.isArray(p.confuse)) fail(at, '"confuse" must be a list (it can be empty)');
  else for (const [cid, why] of p.confuse) {
    if (!ids.has(cid)) fail(at, `confuse links to unknown pattern "${cid}"`);
    if (!str(why)) fail(at, `confuse entry for "${cid}" needs an explanation`);
  }
  if (typeof p.html !== 'function') fail(at, '"html" must be a function returning the demo markup');
  else {
    const out = p.html(1);
    if (!str(out)) fail(at, 'html() must return markup');
    else if (/\bid="(?![^"]*\$\{)[^"]*"/.test(out.replace(/id="[^"]*1"/g, ''))) fail(at, 'fixed id="" attributes clash when the demo appears twice; build ids from the u argument');
  }
  if (p.init !== undefined && typeof p.init !== 'function') fail(at, '"init" must be a function if present');
  if (p.css !== undefined && typeof p.css !== 'string') fail(at, '"css" must be a string if present');
}

// ---- animation manifest vs files on disk ----
run('data/animations/index.js');
const animDisk = fs.readdirSync(path.join(root, 'data/animations'))
  .filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.startsWith('_'))
  .map((f) => f.slice(0, -3));
for (const id of animDisk) if (!W.animationFiles.includes(id)) fail('data/animations/index.js', `"${id}.js" exists but is not listed`);
for (const id of W.animationFiles) {
  if (!animDisk.includes(id)) { fail('data/animations/index.js', `"${id}" is listed but data/animations/${id}.js is missing`); continue; }
  const before = W.animations.length;
  run(`data/animations/${id}.js`);
  if (W.animations.length !== before + 1) fail(`data/animations/${id}.js`, 'must call Whatsit.addAnimation({...}) exactly once');
  else if (W.animations[before].id !== id) fail(`data/animations/${id}.js`, `id is "${W.animations[before].id}" but the file is named "${id}"`);
}
const animIds = new Set(W.animations.map((a) => a.id));
if (animIds.size !== W.animations.length) fail('animations', 'duplicate ids');
for (const id of animIds) if (ids.has(id)) fail(`data/animations/${id}.js`, 'id is already used by a UI pattern');

// ---- each animation's fields ----
const KINDS = ['Backgrounds', 'Text', 'Scroll', '3D', 'Pages'];
const pairs = (v, min) => Array.isArray(v) && v.length >= min && v.every((x) => Array.isArray(x) && x.length === 2 && x.every(str));
for (const a of W.animations) {
  const at = `data/animations/${a.id}.js`;
  for (const k of ['name', 'kind', 'say', 'keys', 'use', 'avoid', 'tech', 'perf', 'a11y']) if (!str(a[k])) fail(at, `"${k}" must be a non-empty string`);
  if (a.kind && !KINDS.includes(a.kind)) fail(at, `kind "${a.kind}" must be one of ${KINDS.join(', ')}`);
  if (!Array.isArray(a.aka) || !a.aka.length || !a.aka.every(str)) fail(at, '"aka" must be a non-empty list of names');
  if (!pairs(a.parts, 2)) fail(at, '"parts" must be at least 2 [name, explanation] pairs');
  if (!pairs(a.motion, 2)) fail(at, '"motion" must be at least 2 [property, value] pairs');
  if (!Array.isArray(a.build) || a.build.length < 3 || !a.build.every(str)) fail(at, '"build" must be at least 3 steps');
  if (!Array.isArray(a.opts) || !a.opts.length || !a.opts.every((x) => Array.isArray(x) && str(x[0]) && str(x[1]) && (x[2] === 0 || x[2] === 1))) fail(at, '"opts" must be [label, prompt text, 0 or 1] triples');
  for (const u of a.uses || []) if (!animIds.has(u) || u === a.id) fail(at, `uses unknown animation "${u}"`);
  for (const u of a.patterns || []) if (!ids.has(u)) fail(at, `patterns lists unknown pattern "${u}"`);
  if (a.page !== undefined) {
    // A full template previews a real page instead of an inline demo.
    if (!str(a.page) || !/^templates\/[a-z0-9-]+\.html$/.test(a.page)) fail(at, '"page" must look like templates/<id>.html');
    else if (!fs.existsSync(path.join(root, a.page))) fail(at, `page "${a.page}" does not exist`);
  } else if (typeof a.html !== 'function') fail(at, '"html" must be a function returning the demo markup (or set "page")');
  else {
    const out = a.html(1);
    if (!str(out)) fail(at, 'html() must return markup');
    else if (/\bid="(?![^"]*\$\{)[^"]*"/.test(out.replace(/id="[^"]*1"/g, ''))) fail(at, 'fixed id="" attributes clash when the demo appears twice; build ids from the u argument');
  }
  if (a.init !== undefined && typeof a.init !== 'function') fail(at, '"init" must be a function if present');
  if (a.css !== undefined && typeof a.css !== 'string') fail(at, '"css" must be a string if present');
}

// ---- recipes, fonts, palettes ----
run('data/recipes.js');
run('data/fonts.js');
run('data/palettes.js');
for (const r of W.recipes) {
  const at = `data/recipes.js (${r.id || '?'})`;
  if (!str(r.id) || !str(r.name) || !str(r.say)) fail(at, 'needs id, name and say');
  if (!Array.isArray(r.uses) || !r.uses.length) fail(at, '"uses" must list pattern ids');
  else for (const u of r.uses) if (!ids.has(u)) fail(at, `uses unknown pattern "${u}"`);
  if (!Array.isArray(r.spec) || !r.spec.every(str)) fail(at, '"spec" must be a list of sentences');
}
if (new Set(W.recipes.map((r) => r.id)).size !== W.recipes.length) fail('data/recipes.js', 'duplicate ids');
for (const f of [...W.fonts, ...W.displayFonts]) if (!str(f.name)) fail('data/fonts.js', 'every font needs a name');
const ROLES = ['primary', 'accent', 'background', 'surface', 'text', 'muted', 'success', 'warning', 'danger'];
for (const [name, c] of Object.entries(W.palettes)) {
  for (const k of ROLES) if (!/^#[0-9a-fA-F]{6}$/.test(c[k] || '')) fail(`data/palettes.js (${name})`, `"${k}" must be a 6-digit hex color`);
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n` + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`✓ ${W.patterns.length} patterns, ${W.animations.length} animations, ${W.recipes.length} recipes, ${W.fonts.length + W.displayFonts.length} fonts, ${Object.keys(W.palettes).length} palettes — all valid`);
