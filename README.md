# A little something — personal invitation website

A cinematic, mobile-first story site: falling petals → "Let's begin" → five gentle sections → a pressure-free invitation.

**Stack:** React 18 · Vite 5 · Tailwind CSS 3 · Framer Motion · Lucide icons · Lenis (desktop smooth scroll)

---

## 1. Run it

You need [Node.js 18+](https://nodejs.org). Then, in this folder:

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

**See it on your phone** (same Wi-Fi): `npm run dev` also prints a `Network:` address, e.g. `http://192.168.1.20:5173`. Open that on your phone.

While running `npm run dev` you'll see dashed "add a photo here" boxes. They are **hidden automatically in the public build**, so she never sees an unfinished box.

---

## 2. Personalise it (one file: `src/config.js`)

Open `src/config.js`. Every word on the site is in there, in the order it appears.

**Must-do checklist**

- [ ] `names.me` → your name (it's the sign-off under the invitation; currently shows "Your Name")
- [ ] `names.her` → optional; use `{her}` in any text (e.g. `'Hey, {her}...'`)
- [ ] Read every line aloud and rewrite anything that doesn't sound like *you*
- [ ] Add photos + memories (below) — real ones only
- [ ] Decide how she can reply (section 5)

**Text tricks**

| Write this | You get |
|---|---|
| `*word*` | the word in soft italic rose |
| `♡` | a small, consistent heart icon |
| `{her}` / `{me}` | her / your name |

**Photos**

1. Copy images into `public/photos/`
2. Reference them **without a leading slash**: `photo: 'photos/us-1.jpg'`
3. Resize to ~1600px and compress to under 300 KB each (squoosh.app) so it loads fast on mobile data.

Where photos go:

- `friendship.photo` – the main arch-framed portrait (portrait orientation works best; if empty, a soft illustrated frame is shown)
- `friendship.memories` – polaroid cards. Add/remove/reorder freely. A card needs a photo **or** a caption to appear. Photo-less cards become paper note cards.
- `beach.image` – optional. Leave empty to use the built-in animated golden-hour beach (SVG). A real photo of a beach at sunset also works well.

**Music (optional)** — put an `.mp3` in `public/music/` and set `music.src: 'music/our-song.mp3'`. It never autoplays; she presses the button in the top-right. Empty `src` hides the button.

**Theme** — `theme: 'blush' | 'sand' | 'rose'`. Colours live in `src/themes.js` if you want to fine-tune.

---

## 3. Build & check the public version

```bash
npm run build      # creates the dist/ folder
npm run preview    # serves dist/ so you can click through exactly what she'll see
```

---

## 4. Put it online (get a shareable link)

Pick one. All are free. `npm run build` first for A and C.

**A) Netlify Drop — fastest (no Git needed)**
1. Run `npm run build`.
2. Go to https://app.netlify.com/drop and drag the **`dist`** folder onto the page.
3. You get a public `https://….netlify.app` link instantly. Create a free account to keep it permanently, and you can rename the subdomain in *Site settings → Change site name*.

**B) Vercel**
```bash
npm i -g vercel
vercel          # follow the prompts (framework: Vite — auto-detected)
vercel --prod   # gives your final https://….vercel.app link
```

**C) Cloudflare Pages / GitHub Pages**
Upload `dist/` (Cloudflare: *Workers & Pages → Create → Upload assets*). For GitHub Pages, push the repo and publish the `dist` folder (the build already uses relative paths, so sub-folder URLs work).

**Tip:** the link preview in WhatsApp/iMessage only says *"A little something — Open when you have a quiet minute."* — it gives nothing away. Change it in `index.html` if you like. The page is also set to `noindex`, so search engines won't list it.

**Before you send the link:** open it on your own phone once, start to finish, with sound on if you added music.

---

## 5. How will you know her answer?

The site has no server, so it can't notify you by itself. In `config.js` → `contact`, enable **one** method:

```js
contact: { method: 'whatsapp', whatsapp: '919876543210', ... }   // number with country code, no +
// or  method: 'sms', phone: '+919876543210'
// or  method: 'email', email: 'you@example.com'
```

After she picks an option, a button appears ("Let {me} know ♡") that opens a ready-typed message to you. It's her choice to tap it — nothing is ever sent automatically. With `method: 'none'`, no button is shown and she can simply tell you in person.

Both answers are intentionally equal in size and warmth, and she can go back and change her choice. Please keep it that way.

---

## 6. Project map

```
src/config.js            ← ALL your text, photos, music, theme, reply options
src/themes.js            colour themes + petal colours
src/App.jsx              intro → transition → site; scroll lock; smooth scroll
src/components/
  PetalCanvas.jsx        the falling petals (one canvas, 3 depth layers)
  Intro.jsx              opening lines + "Let's begin"
  Hello / Friendship / Feelings / Beach / Invitation .jsx    the 5 story sections
  BeachScene.jsx         animated sunset beach (pure SVG)
  PhotoFrame.jsx         photo reveal + parallax, placeholders
  MusicToggle / CustomCursor / ScrollProgress .jsx
  Reveal / SplitHeading / ScrollWords .jsx    scroll animations
```

## 7. Notes

- **Accessibility:** respects "reduce motion" (fewer, slower petals; no parallax), visible focus rings, readable contrast, screen-reader-friendly buttons, scroll/keyboard locked behind the intro only while it plays.
- **Performance:** ~105 KB gzipped JS, fonts self-hosted (no Google Fonts request), petals drawn from pre-rendered sprites on a single canvas, lazy-loaded images. Desktop-only smooth scroll and cursor; phones keep native scrolling.
- **Reference reels:** the two Instagram reels couldn't be opened (login-gated), so the design is an original interpretation of your written brief: petals as the opening → an editorial "digital letter" layout. If you can screen-record the reels or describe particular details (fonts, colours, a specific transition), tell me and I'll match them more closely.
