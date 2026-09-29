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
console.log(`✓ ${W.patterns.length} patterns, ${W.recipes.length} recipes, ${W.fonts.length + W.displayFonts.length} fonts, ${Object.keys(W.palettes).length} palettes — all valid`);
