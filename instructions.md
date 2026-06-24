# Portfolio Setup & Customization Guide

This document contains instructions on how to set up, deploy, and customize the content of this portfolio website.

---

## Local Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/JaredDionela/portfolio.git
   cd portfolio
   ```

2. Open `index.html` in your browser. That's it — no build step needed.

   Or use a local server (recommended to avoid CORS issues when testing):
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
Place your updated resume PDF in the repository. Make sure the `href` in the hero section of `index.html` correctly points to the new filename.

### Contact Form
The contact form uses [FormSubmit](https://formsubmit.co) to send emails without a backend server.
1. The `action` attribute in the `<form>` inside `index.html` should point to your email (e.g., `https://formsubmit.co/your@email.com`). 
2. **Important:** The very first time a message is submitted, FormSubmit will send a verification link to that email address. You must click "Activate" in that email before you can receive future messages.

### Images
Drop project screenshots into the `assets/images/` folder and reference them in your project objects or HTML.