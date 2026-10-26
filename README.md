# Chef Aniket — Restaurant Consulting Website

Premium one-page website for **Chef Aniket Restaurant Consulting** — menu engineering, kitchen operations, staff training and restaurant marketing for Indian restaurants and cloud kitchens.

**Live:** https://chefaniket.com (Firebase alias: https://chefaniketconsultingsite.web.app)

---

## Stack

Plain, fast, dependency-free static site:

| File | Purpose |
|------|---------|
| `index.html` | Single-page site (hero → services → marketing → packages → process/results → intro video → LeanFuel → contact) |
| `style.css` | Full design system ("Modern Luxe v2") — palette, typography, components, responsive rules |
| `script.js` | Nav, scroll reveals, active-section highlight, intro-video modal, WhatsApp lead form |
| `privacy.html` / `404.html` | Themed secondary pages |
| `intro.mp4` | Chef Aniket's 10-second introduction video (plays in a modal) |
| `robots.txt` / `sitemap.xml` | SEO — crawl rules and sitemap |
| `assets/` | Favicon, images |

**Design system** — Deep Emerald `#0B5D4E` + Champagne `#D8B26A` on Ink `#0C1B16`, warm ivory `#F7F4ED` backgrounds. Fonts: **Fraunces** (display) + **Manrope** (body). Colours are defined once as CSS variables in `:root` at the top of `style.css` — change a variable there to re-theme the whole site.

**Accessibility** — Lighthouse scores **100 / 100 / 100** (Accessibility / Best Practices / SEO). Text colours meet WCAG contrast; the site is fully responsive from 360px phones to desktop.

---

## How the contact form works

The "Request Free Audit" form does **not** use a backend. On submit it validates the required fields and opens a pre-filled WhatsApp chat to **+91 81696 40573** (`script.js` → `sendLead()`). The visitor's details reach you only when they press send on WhatsApp. The form is reset only after WhatsApp opens successfully; if the browser blocks the pop-up, the visitor keeps their data and is offered a direct link.

To change the WhatsApp number, edit the `whatsappNumber` constant in `script.js` **and** the `wa.me` links in `index.html`.

---

## Local preview

```powershell
firebase serve --only hosting        # then open http://localhost:5000
```

Or serve the folder with any static server (e.g. `npx serve .`).

---

## Deploying changes

Push to **GitHub** and **Firebase Hosting** in one flow:

```powershell
cd "E:\BootCamp 3.0\Chef Aniket Web Site"
git add -A
git commit -m "Describe your change"
firebase deploy --only hosting       # site is live ~10 seconds later
git push                             # keeps the GitHub backup in sync
```

- **Hosting project:** `chefaniketconsultingsite` (see `.firebaserc`)
- **GitHub repo:** `aniketsawant882-tech/chef-aniket-consulting-website`
- Preview a change first with `firebase serve --only hosting` if you want to check before deploying.
- Do **not** re-add the old `git:https://github.com` credential — it belongs to a suspended account. GitHub auth is handled by `gh auth setup-git`.

---

## Customising content

All copy lives in `index.html`. Frequent edits:

- **WhatsApp number** — `script.js` (`sendLead`) + every `wa.me/...` link in `index.html`
- **Phone (tel) links** — `index.html` (`tel:+918169640573`)
- **Colours / fonts** — variables in `style.css` `:root` (top of file)
- **Section order** — each `<section id="...">` block can be moved; keep the matching nav link in sync
- **Intro video** — replace `intro.mp4` (the modal picks it up automatically), or update the `#introBtn` link
- **Testimonial** — `.testimonial` block in `index.html`. *No real client quote is present yet* — replace the placeholder with a genuine, attributed quote once you have one (do not invent reviews).
- **Images** — files in `assets/`

---

## Status

1. ~~**Google Analytics (GA4)**~~ ✅ **Done** — active with measurement ID `G-SHPBE1C2Y8`.
2. ~~**Custom domain**~~ ✅ **Done** — https://chefaniket.com and https://www.chefaniket.com are live with automatic HTTPS certificates (Firebase Hosting custom domains; DNS hosted at GoDaddy).
3. **Real client testimonial** — still pending. Replace the placeholder quote with a genuine, attributed one when you have it (do not invent reviews).
