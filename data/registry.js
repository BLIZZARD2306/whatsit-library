// The registry every data file writes into. Loaded first, before any data.
window.Whatsit = {
  patternFiles: [],   // filled by data/patterns/index.js
  patterns: [],       // filled by each data/patterns/<id>.js, in patternFiles order
  animationFiles: [], // filled by data/animations/index.js
  animations: [],     // filled by each data/animations/<id>.js, in animationFiles order
  recipes: [],
  fonts: [],
  displayFonts: [],
  fontGlossary: [],
  palettes: {},

  // A pattern carries its own demo CSS, so contributors only ever touch one file.
  addPattern(p) {
    this.addStyle('pattern', p);
    this.patterns.push(p);
  },
  // Animations are full templates: same idea as a pattern, with a longer build spec.
  addAnimation(a) {
    this.addStyle('animation', a);
    this.animations.push(a);
  },
  addStyle(kind, item) {
    if (item.css && typeof document !== 'undefined') {
      const s = document.createElement('style');
      s.dataset[kind] = item.id;
      s.textContent = item.css;
      document.head.appendChild(s);
    }
  },

  // Runs draw(seconds) every frame while root is on the page and on screen.
  // Under reduced motion it draws a single still frame. Use it for canvas demos.
  loop(root, draw) {
    const still = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now();
    let visible = true, running = false, io = null;
    const stop = () => { running = false; if (io) io.disconnect(); };
    const tick = (now) => {
      if (!root.isConnected) return stop();
      draw((now - t0) / 1000);
      if (!still && visible) requestAnimationFrame(tick); else running = false;
    };
    const start = () => { if (!running) { running = true; requestAnimationFrame(tick); } };
    if (!still && typeof IntersectionObserver === 'function') {
      io = new IntersectionObserver(([e]) => {
        if (!root.isConnected) return stop();
        visible = e.isIntersecting;
        if (visible) start();
      });
      io.observe(root);
    }
    start();
  },

  // Sizes a canvas to its box at the screen's pixel density. Returns [ctx, width, height] in CSS pixels.
  fitCanvas(c) {
    const r = window.devicePixelRatio || 1, w = c.clientWidth || 300, h = c.clientHeight || 150;
    if (c.width !== Math.round(w * r) || c.height !== Math.round(h * r)) { c.width = Math.round(w * r); c.height = Math.round(h * r); }
    const ctx = c.getContext('2d');
    ctx.setTransform(r, 0, 0, r, 0, 0);
    return [ctx, w, h];
  },
};
