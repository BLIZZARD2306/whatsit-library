# Contributing to Whatsit

Thanks for helping. The library is only as good as its explanations, so clear
writing matters as much as code.

## Ways to help

- **Add a pattern** (see below)
- **Improve a pattern's words**: a clearer `say`, a missing "also called"
  name, a better "don't mix it up with" note
- **Add a feature recipe** to `data/recipes.js`
- **Add search words**: if your description didn't find a pattern, add those
  words to its `keys`
- **Report a problem**: open an issue with what you searched for and what you expected

## Add a pattern

1. Copy `data/patterns/_template.js` to `data/patterns/<id>.js`. The id is short
   and lowercase, like `carousel` or `datepicker`.
2. Fill in every field. The template explains each one.
3. Add the id to `data/patterns/index.js` where you want it to appear.
4. Run the checks:
   ```bash
   node tests/validate.js
   ```
5. Open the site locally (`python -m http.server 8000`), try your demo in the
   card and in the detail panel, and check it in both light and dark mode.
6. Open a pull request with a screenshot of the card.

## Writing guidelines

Write for someone who has never heard the word you're teaching.

- **Plain words.** "A box that appears in the middle and darkens everything
  behind it", not "a modal overlay component".
- **Short sentences.** One idea each.
- **`keys` are how people describe it**, not how developers name it: "pictures
  slide sideways", "red number on the bell".
- **`opts` prompt text finishes the sentence "Include: …"**. Write it as a
  lowercase phrase: `"a sun icon when off and a moon icon when on"`.
- **`confuse` should explain the difference**, not just name the other pattern.
- Use curly apostrophes (’) inside single-quoted strings, or escape straight ones.

## Demo rules

- Style the demo with the theme variables (`--ink`, `--muted`, `--line`,
  `--accent`, `--accent-ink`, `--demo-2`…) so it works in light and dark mode.
- Prefix your CSS classes with something unique to your pattern to avoid clashes.
- The demo box is small (about 260 × 168 px in a card). Keep it compact.
- Build any `id` attribute from the `u` argument (`id="f${u}"`), because the demo
  appears twice (card and detail panel).
- Scope everything in `init(root)` to `root`. Never query the whole document.
- Shared helpers you can use: `.dbtn`, `.dbtn.ghost`, `.dbox`, `.ov` (an overlay
  inside the demo; add `.open` to show it), `.seg`, `.iconbtn`.
- Respect reduced motion. Global CSS turns animations off for people who ask.

## Code style

Match the surrounding code. No build tools, no dependencies, no frameworks.
Everything must run from a plain static server.
