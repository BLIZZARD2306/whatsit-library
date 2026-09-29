// The registry every data file writes into. Loaded first, before any data.
window.Whatsit = {
  patternFiles: [],   // filled by data/patterns/index.js
  patterns: [],       // filled by each data/patterns/<id>.js, in patternFiles order
  recipes: [],
  fonts: [],
  displayFonts: [],
  fontGlossary: [],
  palettes: {},

  // A pattern carries its own demo CSS, so contributors only ever touch one file.
  addPattern(p) {
    if (p.css && typeof document !== 'undefined') {
      const s = document.createElement('style');
      s.dataset.pattern = p.id;
      s.textContent = p.css;
      document.head.appendChild(s);
    }
    this.patterns.push(p);
  },
};
