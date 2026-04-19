# Buy Me Maybe — landing site

One-page hand-drawn marketing site for **buymemaybe.us**.
Plain HTML / CSS / JS. No build step, no framework.

## File layout

```
buymemaybe-landing/
├── index.html        ← the page
├── style.css         ← all the styling
├── script.js         ← tiny vanilla JS
└── assets/
    ├── logo.png      ← put your real logo here
    └── coffee.svg    ← custom coffee-mug cursor
```

## Run it locally

**Easiest way:** double-click `index.html`. It opens in your browser. Done.

**Cleaner way (recommended):** serve it with a tiny local server so it behaves
exactly like production.

```bash
cd ~/buymemaybe-landing
python3 -m http.server 5173
```

Now open <http://localhost:5173>. Any edit → save → refresh.

## Add your logo

Drop a file called `logo.png` into `assets/` (overwrite the placeholder).
That's it — the hero picks it up automatically.

## Swap the placeholder links

- **YouTube demo video:** in `index.html`, find `dQw4w9WgXcQ` and replace with
  your real video id.
- **GitHub repo button:** in `index.html`, find the line marked
  `<!-- TODO: paste real GitHub URL -->` and set `href="..."`.

## Deploy to Vercel (step by step, zero prior knowledge)

1. **Make it a git repo.**
   ```bash
   cd ~/buymemaybe-landing
   git init
   git add .
   git commit -m "initial commit"
   ```

2. **Push to GitHub.**
   - Go to <https://github.com/new>, create a new empty repo called
     `buymemaybe-landing`. Don't add a README (you already have one).
   - Follow the "…or push an existing repository" instructions GitHub shows:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/buymemaybe-landing.git
     git branch -M main
     git push -u origin main
     ```

3. **Import into Vercel.**
   - Go to <https://vercel.com/new>, sign in with GitHub.
   - Click **Import** next to your `buymemaybe-landing` repo.
   - Settings:
     - Framework Preset: **Other**
     - Root Directory: `./`
     - Build Command: *leave empty*
     - Output Directory: *leave empty*
   - Click **Deploy**. In ~15 seconds you'll get a `*.vercel.app` URL. Open it.
     Looks the same as local? You're done with step 3.

4. **Connect `buymemaybe.us`.**
   - In your Vercel project: **Settings → Domains**.
   - Type `buymemaybe.us` → **Add**.
   - Also add `www.buymemaybe.us` → **Add** (Vercel will auto-redirect www → apex).
   - Vercel shows you the DNS records you need to set. For most registrars:
     - **A record** for `@` (apex) → `76.76.21.21`
     - **CNAME** for `www` → `cname.vercel-dns.com`
   - Go to your registrar (wherever you bought buymemaybe.us), open DNS
     settings, and add those records. Delete any conflicting default records.
   - Wait. DNS usually propagates in a few minutes. Vercel's domain page turns
     green when it sees the records; SSL cert is auto-issued right after.

5. **Push = redeploy.** Any `git push` to `main` triggers a new Vercel deploy
   automatically. No dashboard needed.

## Future tweaks

- Colors live at the top of `style.css` under `:root` — change the CSS variables
  to reskin the whole page.
- Doodles are inline SVG in `index.html` under `<div class="doodles">`. Add or
  remove at will.
- Everything is in three files. If something looks off, it's in one of three
  files.
