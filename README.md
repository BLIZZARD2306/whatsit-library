# Whatsit Library

**You know what it looks like. Whatsit tells you what it's called, and gives you
a prompt that builds it.**

**Try it: [whatsit-library.vercel.app](https://whatsit-library.vercel.app)**

Whatsit is a visual dictionary of UI patterns for vibe coders: people who build
apps with AI tools like Cursor, Claude Code, Lovable or Bolt. Getting a good
result from an AI depends on naming things precisely ("a carousel with dot
indicators and swipe support"), and most people don't know the words. Whatsit
fills that gap.

## What's inside

- **52 UI patterns with live demos**: carousel, modal, toast, stepper, command
  palette, date picker, code input and more. Each one has:
  - the names people also use for it ("Modal = Dialog, Popup, Lightbox")
  - its parts, so you can describe it precisely (backdrop, dialog, actions…)
  - when to use it and when not to
  - "Don't mix it up with" links (Tooltip vs Popover, Toast vs Alert banner)
  - a prompt builder: tick the options you want and copy the prompt
- **Search in plain words**: type "box pops up and the page goes dark" and it
  answers *Modal*.
- **15 feature recipes**: Checkout, Login & sign up, Dashboard, Admin panel, Landing page…
  Each shows which patterns it's built from.
- **Fonts**: 15 everyday fonts and 14 display fonts, all free for commercial
  use (Google Fonts, SIL Open Font License), with mood filters and a font glossary.
- **Design system builder**: 12 palettes, colors explained in plain words,
  typography, corners, shadows, a live preview and a readability check.
- **Cart**: save patterns, recipes, fonts and your design system, then copy
  everything as **one combined prompt**.

Every prompt is framework-neutral. It tells the AI to use whatever framework and
component library the project already has.

## Run it

It's a static site with no build step and no dependencies.

```bash
git clone <this repo>
cd whatsit-library
python -m http.server 8000     # or: npx serve
```

Open http://localhost:8000. Opening `index.html` directly also works.

## Project layout

```
index.html                page markup
css/styles.css            app styles + shared demo styles
js/boot.js                loads every pattern file, then the app
js/app.js                 search, views, prompt builder, cart, design system
data/registry.js          the Whatsit object that data files write into
data/patterns/index.js    list of pattern files, in display order
data/patterns/<id>.js     one file per pattern: text, demo, options and its own CSS
data/patterns/_template.js  copy this to add a pattern
data/recipes.js           feature recipes
data/fonts.js             everyday fonts, display fonts, font glossary
data/palettes.js          design-system starting palettes
tests/validate.js         checks every data file (node tests/validate.js)
```

## Contributing

New patterns, better explanations, recipes and translations are all welcome.
Adding a pattern means creating **one file**. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Deploy

The live site is on Vercel and redeploys automatically on every push to `main`.
Any static host works: on Vercel choose the **Other** preset with no build
command; on GitHub Pages use **Settings → Pages → Deploy from a branch → `main` / root**.

## License

Code: [MIT](LICENSE). Fonts are loaded from Google Fonts and keep their own
licenses (SIL Open Font License). Fonts mentioned as paid ("similar to the paid
Cirlce font") are named for reference only and are not included.
