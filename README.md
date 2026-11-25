# MD Raju Howlader — Portfolio

Personal portfolio of **MD Raju Howlader**, Founder of **Khoka Tech**.
Dark editorial design (black, crimson, cream) built with React + Vite, GSAP animations and Lenis smooth scrolling.
It is a fully static site — free to host on GitHub Pages, no server, no paid APIs, no secret keys.

---

## 1. Edit your content (no coding needed)

**Everything you see on the site lives in one file:**

```
src/config/site.js
```

Open it in any editor (VS Code is recommended) and change the text between the quotes.
You can update:

| What | Where in `site.js` |
|---|---|
| Name, titles, tagline, email, WhatsApp, photo | `profile` |
| Big editorial headlines (cream + red words) | `editorial` |
| About text, goals, journey timeline | `about` |
| Animated numbers (verified numbers only!) | `stats` |
| Khoka Tech text, logo, website & Facebook links | `khokaTech` |
| Skills | `skillGroups` |
| Projects, status, links, screenshots | `projects` |
| Research case studies | `research` |
| Services | `services` |
| Work process steps | `process` |
| Social links | `socials` |
| Contact form service | `contact` |

**Rules that keep it working**

- Keep the quotes `'...'` and the commas `,` at the end of lines.
- To hide a link, set it to an empty string: `url: ''`.
- Project status can be: `'Live'`, `'Completed'`, `'Demo'`, `'In Development'`, `'Coming Soon'`.

### Images

Put images in `public/images/` (see `public/images/README.txt`):

- **Your photo** → save as `public/images/profile.jpg` (square, at least 900×900). It is picked up
  automatically. Until then, the photo from your previous portfolio is shown.
- **Khoka Tech logo** → `public/images/khoka-tech-logo.png`, then set `logo: 'images/khoka-tech-logo.png'`.
- **Project screenshots** → `public/images/projects/dineflow.jpg` etc., then set that project's
  `image: 'images/projects/dineflow.jpg'`. Without a screenshot, each project shows its own animated artwork.

---

## 2. Run it on your computer

You need **Node.js 18 or newer** (https://nodejs.org — choose the LTS version).

Open a terminal in this folder and run:

```bash
npm install      # first time only — downloads the libraries
npm run dev      # starts the site at http://localhost:5173
```

The page reloads automatically when you save a file. Press `Ctrl + C` to stop.

To test the final production version:

```bash
npm run build    # creates the "dist" folder
npm run preview  # serves the built site
```

---

## 3. Publish on GitHub Pages (free)

This project includes an automatic deployment workflow (`.github/workflows/deploy.yml`).

1. Create a repository on GitHub, for example **`portfolio-v2`**
   (or reuse **`portfolio`** to replace your current site — see the note below).
2. In this folder, run:

   ```bash
   git init
   git add .
   git commit -m "New portfolio"
   git branch -M main
   git remote add origin https://github.com/rsraju6734/portfolio-v2.git
   git push -u origin main
   ```

3. On GitHub open the repository → **Settings → Pages** → under *Build and deployment*,
   set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for the green check (about 1–2 minutes).
5. Your site is live at `https://rsraju6734.github.io/portfolio-v2/`.

Every time you push a change to `main`, the site rebuilds and updates by itself.

> **Paths:** the site uses relative paths (`base: './'` in `vite.config.js`), so it works with
> **any** repository name without changes.
>
> **Replacing your old portfolio:** if you push this into the existing `portfolio` repository,
> the old site (and its `assets/profile.jpg`) is replaced. Save your photo into
> `public/images/profile.jpg` first (section 1).
>
> If you use a different repo name, also update the URLs in `index.html`
> (`og:url`, `og:image`, JSON-LD `url`) for correct link previews.

---

## 4. Contact form

GitHub Pages cannot send email by itself, so the form starts in **demo mode**:
it validates the message, clearly says it was **not** sent, and offers a button that opens the
visitor's email app with the message already filled in.

To receive messages directly (free tier available):

1. Create an account at https://formspree.io and create a new form.
2. Copy the form endpoint (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `src/config/site.js` → `contact.formEndpoint`.

The endpoint is a public URL, not a password — it is safe in your code.
**Never** put passwords, API keys or tokens in this project; everything here is public.

---

## 5. Project structure

```
├── index.html               SEO tags, social preview, structured data
├── public/                  copied as-is: favicon, 404 page, images
├── src/
│   ├── config/site.js       ← ALL YOUR CONTENT
│   ├── App.jsx              page layout (section order)
│   ├── sections/            Hero, Approach, Founder, Services, Difference, Toolkit,
│   │                        Projects, Research, Method, Proof, Contact (+ Footer)
│   ├── components/          nav/menu, loader, cursor, icons, buttons
│   ├── lib/                 animation helpers (GSAP, Lenis, scroll reveals)
│   └── styles/              base.css (design system), editorial.css (sections)
└── .github/workflows/       automatic GitHub Pages deployment
```

Colours and fonts are defined at the top of `src/styles/base.css` (`:root { ... }`).

---

## 6. Performance & accessibility

- Visitors with **"reduce motion"** enabled get a calm version: no smooth scroll, no intro,
  static 3D frame.
- Custom cursor and tilt effects only run on devices with a mouse.
- Fonts are bundled locally (no Google Fonts requests).
- Keyboard friendly: skip link, focus styles, Esc closes the menu and project dialogs.
