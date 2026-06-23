# Jared Nether D. Dionela — Portfolio

Personal portfolio site built with vanilla HTML, CSS, and JavaScript.  
Charcoal + taupe bento grid design — no frameworks, no build step.

---

## Local Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/JaredDionela/portfolio.git
   cd portfolio
   ```

2. Open `index.html` in your browser. That's it — no build step needed.

   Or use a local server (recommended for Formspree):
   ```bash
   npx serve .
   ```

---

## How to Deploy

### GitHub Pages (recommended)

1. Push to a `gh-pages` branch, or serve from the repo root on the `main` branch.
2. In your repo settings → Pages → set source to the branch/folder you chose.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### Vercel (alternative)

1. Import the repo into [Vercel](https://vercel.com).
2. It auto-detects static sites — no config needed.
3. Done.

---

## How to Swap In Real Content

### Projects
Open `content.js` and edit the `projects` array. Each project is one object:

```js
{
  id: "my-new-project",
  title: "Project Name",
  description: "What it does...",
  tags: ["SQL", "Backend"],
  github: "https://github.com/...",
  live: "https://...",
  status: "Completed",
  featured: false,
}
```

Add your object to the array → the card appears automatically. No HTML editing needed.

### Résumé
Replace `Resume-Jared Nether D. Dionela.pdf` with your updated file. Keep the same filename, or update the `href` in the hero section of `index.html`.

### Contact Form
1. Create a free form at [formspree.io](https://formspree.io).
2. Replace `YOUR_FORM_ID` in the `<form action="...">` in `index.html` with your real Formspree endpoint.

### Images
Drop project screenshots into the `assets/images/` folder and reference them in your project objects or HTML.

---

## File Structure

```
portfolio/
├── index.html          ← main page
├── style.css           ← design system (charcoal + taupe bento)
├── main.js             ← interactive features (typewriter, dark mode, filter, etc.)
├── content.js          ← data-driven content (projects array, hero roles)
├── 404.html            ← custom 404 page
├── Resume-*.pdf        ← downloadable résumé
├── assets/
│   └── images/         ← project screenshots (add yours here)
└── README.md           ← you are here
```

---

## Tech

- **HTML/CSS/JS** — no frameworks, no build tools
- **CSS Grid** — bento-style responsive layout
- **IntersectionObserver** — scroll reveal animations
- **localStorage** — dark/light mode persistence
- **Formspree** — contact form (no backend needed)

---

Built by Jared Nether D. Dionela · 2026
