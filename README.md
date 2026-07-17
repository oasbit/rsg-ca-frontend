# RS Group Advance Consulting — Frontend

Dark luxury Next.js frontend for [rsg-ac.ca](https://rsg-ac.ca). WordPress provides content via the REST API; all layout, styling, and interactions are implemented in React.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion-ready styling patterns
- WordPress REST API + ACF (structured content)
- Resend (optional contact email delivery)

## Getting started

```bash
cd rsg-frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Favicons and app icons

Browser icons are defined through the Next.js App Router files in `src/app`, while installable web app icons and `site.webmanifest` are served from `public`.

### Environment variables

| Variable | Description |
|----------|-------------|
| `WORDPRESS_API_URL` | WordPress base URL (default: `https://rsg-ac.ca`) |
| `NEXT_PUBLIC_SITE_URL` | Public frontend URL for SEO/sitemap |
| `REVALIDATE_SECRET` | Secret for `/api/revalidate` webhook |
| `RESEND_API_KEY` | Optional Resend API key for contact form email |
| `CONTACT_EMAIL` | Recipient for contact submissions |
| `CONTACT_FROM_EMAIL` | Verified sender in Resend |

## Architecture

```text
WordPress (CMS)  -->  REST API  -->  Next.js data layer  -->  React components
```

- **WordPress:** pages, media, ACF fields, SEO copy
- **Next.js:** routing, design system, forms, caching, deployment

Pages are statically regenerated every hour (`revalidate: 3600`) and can be refreshed on publish via webhook.

## Routes

| Route | WordPress slug |
|-------|----------------|
| `/` | `coworking-space` |
| `/about-us` | `about-us` |
| `/services` | `services` |
| `/contact` | `contact` |
| `/privacy-policy` | `privacy-policy-2` |

Redirects:
- `/privacy-policy-2` → `/privacy-policy`
- `/our-story` → `/about-us`
- `/coworking-space` → `/`

## WordPress setup (ACF)

Install [Advanced Custom Fields](https://www.wordpress.org/plugins/advanced-custom-fields/) and enable **Show in REST API** on each field group.

### Home (`coworking-space`)

| Field | Type |
|-------|------|
| `hero_eyebrow` | Text |
| `hero_headline` | Text |
| `hero_headline_emphasis` | Text |
| `hero_body` | Textarea |
| `editorial_headline` | Text |
| `editorial_body` | Textarea |
| `about_teaser_title` | Text |
| `about_teaser_body` | Textarea |
| `pillars` | Repeater: `title`, `description` |
| `services_preview` | Repeater: `title`, `tagline`, `slug` |
| `process_steps` | Repeater: `title`, `description` |
| `cta_title` | Text |
| `cta_body` | Textarea |
| `gallery_image_ids` | Gallery / relationship to media |

### About (`about-us`)

| Field | Type |
|-------|------|
| `story_eyebrow` | Text |
| `story_headline` | Text |
| `story_paragraphs` | Repeater / textarea (array) |
| `who_we_are_eyebrow` | Text |
| `who_we_are_headline` | Text |
| `who_we_are_paragraphs` | Repeater / textarea (array) |
| `founder_name` | Text |
| `founder_title` | Text |
| `founder_bio_paragraphs` | Repeater / textarea (array) |
| `community_headline_lead` | Text |
| `community_headline_emphasis` | Text |
| `approach_blocks` | Repeater: `title`, `body`, `closing` |
| `approach_bullets` | Repeater / text (array) |
| `focus_bullets` | Repeater / text (array) |
| `vision` | Textarea |
| `team_paragraphs` | Repeater / textarea (array) |

Live-site section order: **Our Story** hero → **Who We Are** → **Meet Dr. Andrew Peters** → **Our Approach** → **Our Focus Areas** → **Our Vision** → **Our Team** → Connect CTA (layout).

In **Our Focus Areas**, the closing strategy statement sits directly beneath the introductory performance statement before the focus-area grid.

The **Our Team** partnership CTA follows the team profiles without a decorative top rule.

### Services (`services`)

| Field | Type |
|-------|------|
| `intro` | Textarea |
| `quote` | Textarea |
| `quote_author` | Text |
| `quote_role` | Text |
| `service_blocks` | Repeater: `title`, `tagline`, `body`, `paragraphs`, `bulletsLead`, `bullets`, `quoteBullets`, `detailHref` |

Services page order: **PageHero** → **ServicesOverview** (four linked cards) → **QuoteBanner** → four **ServiceBlock** sections → Connect CTA (layout). Section backgrounds alternate black (`--background`) and gray (`--surface`): Overview (black) → Quote (gray) → Strategic Planning (black) → Leadership (gray) → Team Building (black) → Facilitation (gray).

**Service detail pages.** A `service_blocks` entry with a `detailHref` links to a dedicated detail page. When present, the homepage `ServicesTabs` "Learn more" link and the services page `ServiceBlock` "Explore the program" link both point to it. These detail pages are intentionally **not** in the main menu (`menus.ts`); they are reached only from the Team Building sections.

- **`/services/team-building`** — dedicated Team Building program page (hero, "What We Do" / Discover Your Inner Leader, Interactive & Engaging Development, Why Choose Us). Content sourced from the Rising Stars leadership & team-building program.

### Contact (`contact`)

| Field | Type |
|-------|------|
| `headline` | Text |
| `phone` | Text |
| `email` | Text |
| `address` | Textarea |
| `social_links` | Repeater: `platform`, `url` |

### Privacy (`privacy-policy-2`)

| Field | Type |
|-------|------|
| `body` | WYSIWYG |

The frontend ships a complete PIPEDA-aligned privacy policy in `src/lib/privacy-policy.ts`. It is shown when the WordPress ACF `body` field and page content are empty. To override from WordPress, populate the ACF body with your custom policy text.

## CORS and on-demand revalidation (WordPress)

Use the must-use plugin at `wordpress/rsg-headless-bridge.php` (see **Deployment** above). It replaces manual `functions.php` snippets for CORS and the publish webhook.

For reference, the CORS filter alone looks like this:

```php
add_action('rest_api_init', function () {
  remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
  add_filter('rest_pre_serve_request', function ($value) {
    $allowed = ['https://rsg-ac.ca', 'http://localhost:3000'];
    if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed, true)) {
      header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
      header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
      header('Access-Control-Allow-Credentials: true');
    }
    return $value;
  });
}, 15);
```

## On-demand revalidation

Handled by `wordpress/rsg-headless-bridge.php` on publish. For manual testing:

```http
POST /api/revalidate?secret=YOUR_SECRET
Content-Type: application/json

{ "slug": "about-us" }
```

WordPress hook example:

```php
add_action('save_post_page', function ($post_id) {
  if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) return;

  $slug = get_post_field('post_name', $post_id);
  wp_remote_post('https://rsg-ac.ca/api/revalidate?secret=YOUR_SECRET', [
    'body' => wp_json_encode(['slug' => $slug]),
    'headers' => ['Content-Type' => 'application/json'],
  ]);
});
```

## Contact form

The native React form posts to `/api/contact`. Without `RESEND_API_KEY`, submissions are accepted and logged server-side. Configure Resend for production email delivery to `info@rsg-ac.ca`.

## Deployment (WordPress CMS + Vercel frontend)

This project uses a **headless** setup:

```text
WordPress on SiteGround (CMS)  →  REST API  →  Vercel (Next.js frontend)  →  rsg-ac.ca
```

- **WordPress** stores pages, media, and ACF fields. Editors continue using wp-admin.
- **Vercel** serves the public website (`rsg-ac.ca`). Visitors never load Elementor/theme HTML.
- Content is cached on Vercel (ISR, 1 hour) and refreshed when WordPress publishes a page.

### Recommended DNS layout

| Host | Points to | Purpose |
|------|-----------|---------|
| `rsg-ac.ca` | Vercel | Public Next.js frontend |
| `www.rsg-ac.ca` | Vercel | Redirect / alias |
| `cms.rsg-ac.ca` | SiteGround | WordPress admin + REST API |

During migration you can keep WordPress on `rsg-ac.ca` until the Vercel preview is verified, then move WordPress to `cms.rsg-ac.ca` and point the apex domain to Vercel.

### Step 1 — Deploy the frontend to Vercel

1. Push the `rsg-frontend` repository to GitHub (or GitLab/Bitbucket).
2. In [Vercel](https://vercel.com): **Add New → Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected). Root directory: repo root if the repo *is* `rsg-frontend`.
4. Add **Environment Variables** (Production, and optionally Preview):

| Variable | Production value |
|----------|------------------|
| `WORDPRESS_API_URL` | `https://cms.rsg-ac.ca` (or `https://rsg-ac.ca` until CMS subdomain is live) |
| `NEXT_PUBLIC_SITE_URL` | `https://rsg-ac.ca` |
| `REVALIDATE_SECRET` | Long random string (generate with `openssl rand -hex 32`) |
| `RESEND_API_KEY` | Resend API key (contact form) |
| `CONTACT_EMAIL` | `info@rsg-ac.ca` |
| `CONTACT_FROM_EMAIL` | Verified sender, e.g. `noreply@rsg-ac.ca` |

5. Deploy. Vercel assigns a preview URL (`*.vercel.app`) — test all routes there first.
6. **Settings → Domains**: add `rsg-ac.ca` and `www.rsg-ac.ca`. Follow Vercel’s DNS instructions at your registrar/SiteGround.

### Step 2 — Keep WordPress on SiteGround

1. **Move WordPress to a subdomain** (recommended): create `cms.rsg-ac.ca` in SiteGround and install or migrate WordPress there.
2. In **Settings → General**, set WordPress Address and Site URL to `https://cms.rsg-ac.ca`.
3. Install [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) and enable **Show in REST API** on each field group.
4. Verify the API responds: `https://cms.rsg-ac.ca/wp-json/wp/v2/pages?per_page=5`

### Step 3 — Connect WordPress to Vercel

Copy the must-use plugin to SiteGround:

```text
rsg-frontend/wordpress/rsg-headless-bridge.php
  →  wp-content/mu-plugins/rsg-headless-bridge.php
```

Edit the two constants at the top of that file:

```php
define('RSG_FRONTEND_URL', 'https://rsg-ac.ca');
define('RSG_REVALIDATE_SECRET', 'your-vercel-revalidate-secret');
```

`RSG_REVALIDATE_SECRET` must match `REVALIDATE_SECRET` on Vercel.

The plugin:

- Sends CORS headers so the frontend can reach the REST API when needed
- POSTs to `/api/revalidate` when a page is published, so Vercel refreshes cached content

Manual revalidation (for testing):

```http
POST https://rsg-ac.ca/api/revalidate?secret=YOUR_SECRET
Content-Type: application/json

{ "slug": "about-us" }
```

Slug → path mapping lives in `src/app/api/revalidate/route.ts`.

### Step 4 — Contact form (production email)

1. Create a [Resend](https://resend.com) account and verify `rsg-ac.ca`.
2. Add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_EMAIL` on Vercel.
3. Test `/contact` after deploy.

Without `RESEND_API_KEY`, submissions are accepted but only logged server-side.

### Step 5 — Go live checklist

- [ ] `npm run build` passes locally
- [ ] Vercel preview URL loads: `/`, `/about-us`, `/services`, `/services/team-building`, `/contact`, `/privacy-policy`
- [ ] Images load (WordPress media + `public/images/`)
- [ ] `WORDPRESS_API_URL` points at the live CMS host
- [ ] `NEXT_PUBLIC_SITE_URL` is `https://rsg-ac.ca`
- [ ] DNS: apex + `www` → Vercel; `cms` → SiteGround
- [ ] `rsg-headless-bridge.php` installed with matching secrets
- [ ] Publish a test page in WordPress → frontend updates within seconds
- [ ] Contact form delivers email via Resend
- [ ] Redirects work: `/our-story` → `/about-us`, `/coworking-space` → `/`

### Local production build

```bash
npm run build
npm run start
```

Opens on port 3000. Use the same environment variables as Vercel (via `.env.local`).

## Design system

Brand tokens are taken from the live WordPress Elementor kit (UICore theme):

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#000000` | Backgrounds, buttons |
| Secondary | `#232323` | Surfaces, hover states |
| Accent | `#F1ECDC` | Headlines, CTAs, links |
| Light | `#DFDECD` | Secondary text on dark |
| Body | `#49685E` | Body copy on light sections |
| Cream | `#FEFDF0` | Light section backgrounds |
| Muted | `#8C8C8C` | Supporting text |

- **Font:** Clash Display (loaded from WordPress media library, same as live site)
- **Typography style:** headings, quotations, labels, and supporting copy use upright type; italic styling is intentionally disabled throughout the interface
- **Page hero:** shared `PageHero` component on every route — full viewport height without an eyebrow label on `/`, compact (~44–50vh) on inner pages
- **Patterns:** transparent-to-white header, line CTAs, grain overlays, editorial typography
- **Motion:** page fade-in on route change, scroll-reveal sections, staggered grids, mobile menu animation (respects `prefers-reduced-motion`)

### Mobile layout

All sections use a mobile-first spacing scale so pages stay compact on small screens without changing desktop layout:

| Pattern | Mobile | Tablet (`sm`/`md`) | Desktop (`lg`+) |
|---------|--------|---------------------|-----------------|
| Section padding | `py-10`–`py-12` | `py-14`–`py-16` | `py-24`–`py-32` |
| Grid gaps | `gap-6`–`gap-8` | `gap-8`–`gap-10` | `gap-16`–`gap-20` |
| Display headings | `text-2xl`–`text-3xl` | `text-3xl`–`text-4xl` | `text-5xl`–`text-7xl` |
| Hero height | `min-h-[85svh]` | — | full viewport on `/` |

Global tweaks in `src/styles/globals.css`:

- Responsive `--header-height` (96px → 120px → 140px) for the hero/at-top header; `--header-height-compact` (52px → 58px → 64px) when the sticky bar appears on scroll-up, with a matching smaller logo
- Shared contrast tokens keep dividers and borders visible without dominating the layout, while improving numbering, captions, supporting copy, and small labels
- `overflow-x: clip` on `body` to prevent horizontal scroll from full-bleed sections
- Tighter `.prose-legal` typography on mobile for the privacy policy page

Shared components (`PageHero`, `ConnectCta`, `QuoteBanner`, `ValuesBand`, `Footer`, `ServiceBlock`, about sections, contact layout) all follow this scale. Test at 375px and 390px widths when changing section spacing.

### Homepage section order

1. PageHero → 2. PillarsGrid → 3. EditorialBand → 4. **AboutTeaser** → 5. **ServicesTabs** → 6. HowItWorks → (layout) ConnectCta

**ServicesTabs** presents four homepage service panels (Strategic Planning, Leadership Development, Team Building, and Facilitation) from `home_service_blocks`. Their bullets use action-oriented marketing copy and gain a bordered background, extended accent rule, and subtle text movement on hover. Leadership focuses on applied development and organizational advocacy; Team Building is rooted in creating environments for leadership development; Facilitation uses an “As facilitators, we will…” framework.

**AboutTeaser** uses a black editorial layout: split headline/body, numbered highlight cards from pillars, no image.

The four numbered points in **Our Approach** also receive a background, brighter number, and slight text movement on hover.

### Image mapping

All site images live under `public/assets/` and `public/images/` (23 files total). Unused WordPress export copies and scaffold SVGs have been removed.

| Section | Asset |
|---------|-------|
| Page heroes | WebP/JPG backgrounds (`heroBackgrounds` in `images.ts`) |
| Home hero | `public/images/home-hero.jpg` |
| Home editorial strip | `coworking-space-hero-scaled-1.webp` |
| About page hero | `rs-group-group-pic.jpg` |
| About founder profile | `Dr-Andrew-Peters-RS-Consulting.png` |
| About vision panel | `286dc_Brew-Bloom-Gallery-Image-2.webp`, served unoptimized at its native 866×984 resolution with a visible center and strong top/bottom fades |
| About approach background | `leadership.jpg`, shown at increased opacity with a softened directional overlay and strong top/bottom fades |
| Services hero | `Generated-Image-March-18-2026-10_21AM.jpg` |
| Service blocks / home tabs | `Andrew-Peters-1.jpeg`, `leadership.jpg`, `pexels-yankrukov-7693708-scaled.jpg`, `8-glp-1-roi.webp`, `rs-group-group-pic.jpg` |
| Team building detail page | `public/images/team-building/*.jpg` + shared assets above |
| About team headshots | `public/images/team/*.jpg` |
| Contact hero | `financial-services-features-hero-scaled-1.webp` |
| Privacy hero | `financial-services-contact-hero-scaled-1.webp` |
| Connect CTA (footer) | `andrew-peters-transparent-background.png` |
| Logo | `RS-Group_black_high-res.png` / `RS-Group_white_high-res.png` |

## Project structure

```text
src/
  app/                 # Routes and API handlers
  components/          # React UI (all design lives here)
  lib/wordpress/       # API client, types, content fallbacks
  styles/globals.css   # Design tokens
wordpress/
  rsg-headless-bridge.php   # MU-plugin: CORS + revalidate webhook (install on SiteGround)
```

## Notes

- Elementor HTML is intentionally not rendered on marketing pages.
- Privacy policy is the only page that renders WordPress HTML content.
- Images are loaded from the WordPress media library via `next/image`.
