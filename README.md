# Chef Aniket — Restaurant Consulting Website

Premium single-page website for **Chef Aniket Restaurant Consulting** — menu engineering, staff training, kitchen setup & restaurant growth marketing.

**Live:** https://chef-aniket-consulting.web.app

## Stack
- Static HTML + CSS + vanilla JavaScript (no build step)
- **Theme:** "Modern Luxe" v2 — Deep Emerald + Champagne on Ink
- **Typography:** Fraunces (display) + Manrope (body) via Google Fonts
- Hosted on Firebase Hosting

## Structure
```
index.html      — single-page site (all sections)
style.css       — complete design system (CSS variables in :root)
script.js       — nav, scroll-reveal, WhatsApp lead form, smooth scroll
assets/         — images + favicon.svg
video/          — client success story videos (LeanFuel)
robots.txt      — crawler rules
sitemap.xml     — sitemap for search engines
firebase.json   — Firebase Hosting config
```

## Local preview
```bash
node -e "const http=require('http'),fs=require('fs'),path=require('path');const t={'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.mp4':'video/mp4'};http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';const f=path.join(process.cwd(),p);fs.stat(f,(e,s)=>{if(e||!s.isFile()){r.writeHead(404);r.end('404');return;}r.writeHead(200,{'Content-Type':t[path.extname(f)]||'application/octet-stream','Content-Length':s.size});fs.createReadStream(f).pipe(r);});}).listen(8787)"
```
Open http://localhost:8787

## Deploy
```bash
firebase deploy --only hosting
```

## Editing colors
All colors live in `style.css` → `:root` variables (`--primary`, `--accent`, `--ink`, `--paper`, …). Change the variables to restyle the whole site consistently.
