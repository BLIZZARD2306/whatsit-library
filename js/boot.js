// Loads every pattern listed in data/patterns/index.js and every animation in
// data/animations/index.js, then the app.
// async = false downloads the files in parallel but runs them in list order,
// which keeps the numbering stable. Works on file:// and any static host.
(function () {
  const files = Whatsit.patternFiles.map((id) => `data/patterns/${id}.js`)
    .concat(Whatsit.animationFiles.map((id) => `data/animations/${id}.js`), 'js/app.js');
  for (const src of files) {
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.onerror = () => console.error(`Whatsit: could not load ${src}`);
    document.body.appendChild(s);
  }
})();
