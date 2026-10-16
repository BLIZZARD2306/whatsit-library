// Copy this file to data/animations/<id>.js, fill it in, and add the id to
// data/animations/index.js. Files starting with "_" are ignored by the app.
// An animation is a full template: everything a pattern has, plus a build spec.
Whatsit.addAnimation({
  id: 'example',                       // must match the file name
  name: 'Example animation',           // the proper name people should learn
  aka: ['Other name', 'Another name'], // what else people call it
  kind: 'Backgrounds',                 // Backgrounds, Text, Scroll, 3D or Pages

  say: 'One plain sentence describing what it looks like and does.',
  keys: 'words people might type when describing it without knowing the name',
  use: 'When this is the right choice.',
  avoid: 'When to pick something else, and what.',

  // What it's made with, in one sentence the AI can follow.
  tech: 'CSS only: transforms and keyframes.',

  // [layer or part name, what it is]
  parts: [['Part one', 'What it is'], ['Part two', 'What it is']],

  // [motion property, value]: the numbers that make it feel right
  motion: [['Duration', '600ms'], ['Easing', 'cubic-bezier(.2,.7,.2,1)']],

  // Build steps, in order. These become the numbered list in the prompt.
  build: [
    'First step.',
    'Second step.',
    'Third step.',
  ],

  // [checkbox label, text added to the prompt after "Include:", 1 = ticked by default]
  opts: [['Option label', 'a lowercase phrase describing this option', 1]],

  perf: 'How to keep it smooth on a cheap phone.',
  a11y: 'what it needs for people who prefer reduced motion or use a screen reader',

  // Optional: other animation ids this template is built from (used by Pages).
  // uses: ['mesh-gradient'],
  // Optional: UI pattern ids it also uses.
  // patterns: ['navbar'],

  // Demo markup. u is a unique number: use it for any id attribute.
  html: (u) => `<div class="ex-a">Hello</div>`,

  // Optional: make the demo move. Only query inside root.
  // For canvas demos use Whatsit.loop(root, t => ...) and Whatsit.fitCanvas(canvas).
  init(root) {},

  // Optional: CSS for this demo only. Prefix classes to avoid clashes.
  css: `
.ex-a{animation:ex-a 2s ease-in-out infinite alternate}
@keyframes ex-a{to{transform:translateY(-8px)}}
`,
});
