# Jared Nether D. Dionela

**Enterprise Database Management · SAP/ERP Reporting · Full-Stack Development**

[![Live Portfolio](https://img.shields.io/badge/Live-Portfolio-000000?style=for-the-badge&logo=vercel)](https://jareddionela.vercel.app/) 
[![Resume](https://img.shields.io/badge/View-Resume-000000?style=for-the-badge&logo=read-the-docs)](Resume-Jared%20Nether%20D.%20Dionela.pdf)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/jared-nether-2209ab2bb/)

## Technical Details

The site runs on plain HTML, CSS, and JavaScript. The goal was to build a clean bento-grid layout while keeping the architecture as light as possible.

- **Content Management:** Project and experience data is stored in `content.js` and injected dynamically. This keeps the HTML structure clean and makes updating the portfolio trivial.
- **Layout:** Built on CSS Grid and Flexbox. 
- **Animations:** Scroll reveals use the native `IntersectionObserver` API instead of an external library to save bandwidth.
- **Theming:** A built-in dark/light toggle that persists user preference via `localStorage`.
- **Forms:** The contact form uses the Fetch API to submit asynchronously without page reloads.

## Running Locally

Because there are no build steps or dependencies, you can serve the directory directly. For example, using Python:

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
python -m http.server 8000
```
Then open `http://localhost:8000`.

## Repository Layout

- `index.html` — The main page structure
- `style.css` — The design system and responsive grid
- `main.js` — Interaction logic (theme toggle, animations, form handling)
- `content.js` — The data source for portfolio projects and metadata
- `instructions.md` — Setup and customization notes
