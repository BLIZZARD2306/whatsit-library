// Copy this file to data/patterns/<id>.js, fill it in, and add the id to
// data/patterns/index.js. Files starting with "_" are ignored by the app.
Whatsit.addPattern({
  id: 'example',                       // must match the file name
  name: 'Example pattern',             // the proper name people should learn
  aka: ['Other name', 'Another name'], // what else people call it
  cat: 'Forms',                        // Forms, Navigation, Overlays, Feedback, Media, Layout or Data

  say: 'One plain sentence describing what it looks like and does.',
  keys: 'words people might type when describing it without knowing the name',
  use: 'When this is the right choice.',
  avoid: 'When to pick something else, and what.',

  // [other pattern id, how they differ]
  confuse: [['modal', 'How this differs from a modal.']],

  // [part name, what it is]: the vocabulary for a precise prompt
  parts: [['Part one', 'What it is'], ['Part two', 'What it is']],

  // [checkbox label, text added to the prompt after "Include:", 1 = ticked by default]
  opts: [
    ['Option label', 'a lowercase phrase describing this option', 1],
    ['Another option', 'another lowercase phrase', 0],
  ],

  // finishes the sentence "accessibility: …" in the prompt
  a11y: 'the roles, labels and keyboard support it needs',

  // Demo markup. u is a unique number: use it for any id attribute.
  html: (u) => `<button class="dbtn ex-btn">Try me</button>`,

  // Optional: make the demo interactive. Only query inside root.
  init(root) {
    const b = root.querySelector('.ex-btn');
    b.onclick = () => { b.textContent = 'Clicked'; };
  },

  // Optional: CSS for this demo only. Prefix classes to avoid clashes.
  css: `
.ex-btn{letter-spacing:.02em}
`,
});
