# SUNGRID UI improvement plan and implementation handoff

Prepared 4 October 2026. Audience: GPT-5.6 Sol continuing this task.

## Start here — scope, repository, and status

**The authoritative project is `/Users/muhanif/Projects/sungrid nextjs`.** The user's IDE and running localhost:3000 server both use this directory (server working directory verified with lsof). `/Users/muhanif/.codex/worktrees/4287/sungrid nextjs` is an older isolated working copy. Do not copy whole pages, styles, or directories from that worktree over the Projects repository: local image choices have diverged. Do not modify the Downloads project. Apply narrow edits to the Projects copy; use escalation for writes outside permitted workspace roots if required.

This is a refinement of the completed website, not a rebuild. This plan was completed before starting any new large-scale implementation. **The proposed visual refinements below are not yet implemented.** Existing functionality described below predates this plan. No dependency upgrade is needed for this UI task.

Read this plan, then begin implementation at phase 1. Do not repeat the full code/UX analysis. Confirm only that the files you are about to edit have not changed since this handoff. Keep a short completion log here as work proceeds, recording exact files and checks. After the plan was completed, the missing original company logo was restored and verified; do not repeat that repair.

## A. Current assessment and implementation inventory

- Pages Router, Next.js 16.3.8, React/React DOM 18.3.1; Node requirement >=22.13 <25 and `.nvmrc` 22. Existing local Node 22 installation available through nvm. npm lockfile and npm scripts are present.
- Dependencies: Next, React, React DOM, Sharp 0.35.5, self-hosted `@fontsource-variable/manrope`. ESLint 9.39.5 and eslint-config-next 16.3.8. No UI, carousel, or animation library remains. Do not add one.
- Routes: `/`, `/about`, `/gallery`, `/calculator`, `/certificates`, `/contact`, `/get-a-quote`, plus `/404`. Blog/admin/login/API features were intentionally removed. Preserve this route set.
- `_app.js` imports `globals.css`, then `site.css`, then Manrope. It supplies Header, main with skip target, Footer, favicon, viewport metadata and Google site verification. SEO uses `components/site/SEO.jsx` on each page. Preserve these.
- `styles/site.css` contains virtually all component rules and media queries, compressed into very long lines with substantial repeated font overrides and `!important`. `globals.css` contains reset rules, the contact min-width/wrapping fix, and photo focal positions. The comment claiming legacy selectors remain in globals is obsolete.
- Main breakpoints: min-width 1450; max-width 1180, 980, 850, 640, 370. Navigation collapses at 850. At 980 desktop navigation is reduced to 10px. At 768 the hero is still two columns, with 12px body text and a tall photo. Footer shifts from four to two columns at 980; small mobile keeps two compact navigation/contact columns.
- Header: 34px utility strip; sticky 92px header, smaller at breakpoints; static frosted background; active link underline, quote CTA. Mobile disclosure has aria-expanded/controls, route close, Escape and toggle focus restoration. No scroll-state treatment or opening transition.
- Footer: four columns, contacts/socials from `data/site.js`, dynamic year. **Actual source background is `#102236` (very dark blue), not neutral black.** User specifically asks to retain grey/black identity: use a neutral charcoal refinement only in footer, preserving brand blue elsewhere. Do not recolor the whole site.
- `Shared.jsx`: Button, TextLink, Eyebrow, PageIntro, Photo, Stats, ClosingCTA. Photo uses next/image fill with an explicit container, image optimization and supplied sizes. Home hero is priority loaded. Many headings have hard `<br />` breaks.
- `Scroller.jsx`: native horizontal overflow with scroll snapping, touch/trackpad support, keyboard arrows, controls, ResizeObserver, edge disabling, reduced-motion scrolling. Three sections: clients, sample reviews, brands. Keep native scrolling; no autoplay exists.
- `ImageGallery.jsx`: reusable gallery/certificate grid and native dialog; next/previous, arrow keys, Escape, close button, focus return and body scroll lock. Complete enlarged image uses contain and original file. Empty arrays have useful fallbacks.
- Calculator: positive decimal text input with inputMode decimal; exact `(monthly / 30 / 4) * 1.10`, two decimals; invalid/too-small/nonfinite handling; result clears on input edit; accessible live result. Do not change calculations or introduce prices/savings/battery sizes.
- QuoteForm: all four fields required; local validation via `lib/validation.mjs`; errors linked to fields and first invalid field focused. The completed production update submits valid inquiries to Netlify Forms, includes a honeypot, and shows success only after an OK response.
- Assets: manifest generator runs before dev/build; 30 gallery photos, 13 client logos, 20 brand logos, 3 certificate scans. The real project gallery is distinct from decorative featured imagery. Keep gallery authenticity, names and existing labels.
- Current Projects `data/featured-images.js`: homeHero `/assets/images/home3.jpg`, homeStory `/assets/images/home2.jpg`, About `/assets/images/home1.1.jpg`. Actual dimensions: 910×607, 900×601, 1024×1024 respectively. Hero and About metadata are stale (1024×1024 and 910×607). `home1.jpg` is absent in current Projects folder. **These newer local choices supersede earlier chat mappings.** Do not restore an old mapping silently. User likes people-free solar images; preserve their files and choices.
- Prior removals must stay removed: hero plaque “Made for your world”, introduction stamp “Since 2011 / Engineering with purpose”, hero caption “Solar energy in action / 01 / ROOFTOP SOLAR”. Gallery preview heading must remain “Our projects, built with care.”
- Existing motion: smooth scroll; button rise 2px; link gap transition; image zoom 1.035; reduced-motion global override. No reveal/count-up/page animation. These basics are useful; enhance selectively.

**Overall weakness:** good structural foundation and working interactions, but 9–13px supporting content, very small CTAs, oversized generic page intros, wide gaps and rigid tablet proportions make the site look more like a template than an intentionally composed engineering website. Solve readability and composition before decorative motion.

## B–D. Global design system, color, typography

### P1 — readable typography and spacing (highest impact)

**Where:** `styles/site.css`, plus explicit hard breaks in page JSX only when needed.
**What/how:** keep Manrope and existing weights. Add named tokens for typography, spacing, corners and motion, then replace matching current declarations, including smaller breakpoint overrides. Do not append an endless override stylesheet. Formatting the touched CSS sections is acceptable; a full style architecture migration is not.

| Role | Target | Implementation and intended result |
|---|---|---|
| Body and service descriptions | 16px desktop/mobile, line-height 1.65–1.75 | More comfortable reading without changing copy; cap prose at 58–66ch |
| Supporting text/disclaimers | 14px; never below 13px for meaningful information | Sample-review, form, sizing and certificate notes stay legible |
| Labels, buttons, navigation | 14–16px; weight 600 | Clearly readable actions; 16px inputs on mobile |
| Eyebrows | 11–12px, tracking .08–.10em | Visual hierarchy without microscopic letters; brand-logo microtagline can remain small |
| Hero h1 | clamp(36px, 4.6vw, 62px), line-height 1.10–1.15 | Strong headline without dominating entire viewport |
| Interior h1 | clamp(34px, 4.2vw, 54px) | Brings useful content closer to the top |
| Section h2 | clamp(28px, 3.2vw, 42px), line-height 1.18 | Consistent section hierarchy |
| h3 | 20–24px, line-height 1.3 | Improve service and form subheading clarity |
| Numbers | 40–56px stats, 52–64px result | Retain prominence without clipping long input/result text |

Use normal word wrapping; avoid negative tracking beyond approximately -.035em for large headings. Remove forced breaks below 640/768 when they create orphan lines. Do not change wording. Keep necessary visual spans for accent color.

Use 8px spacing rhythm: 8/16/24/32/48/64/80/96. Sections 80–96px desktop, 64–72px tablet, 48–56px mobile. Gap 48–64px desktop split layouts; 24–32px mobile. Containers max 1280px, gutters 20px mobile, 32px tablet, 48px desktop; 16px at 320px as fallback. Maintain minmax(0,1fr) tracks and min-width:0 on grid children.

### P1 — preserve brand and refine surfaces

Keep existing blue `#263fbe`, hover `#1b2f91`, ink `#172537`, navy `#132a43`, paper `#fcfcf9`, border `#dfe5e9`, soft `#f2f5f7`, yellow `#f4ce55`. Yellow is a restrained highlight, not body text on white. Existing muted `#586777` works for body; verify smaller secondary text contrast rather than simply reducing opacity.

Add footer-only neutral tokens: background approximately `#191b1f`, secondary text `#c5c8ce`, divider `#ffffff24`; inspect with existing logo before finalizing. Retain blue primary buttons and the dark navy calculator/stat panels. Expected result: charcoal foundation consistent with user's stated footer preference, familiar blue brand identity retained.

Hero gradient: `linear-gradient(125deg,#fcfcf9 0%,#eef2f8 100%)`. Closing CTA: pale blue-grey gradient with existing decorative sun at 8–12% opacity. Interior page intros: subtle paper-to-soft background, smaller/fainter static orbit. No gradients on every section or behind body text. Primary buttons stay solid for contrast. Radius 8–12px photos/panels, 6–8px buttons. One soft shadow for hero or interactive panels, not every card.

## E. Animation strategy

**Where:** `site.css`; optional `components/site/Reveal.jsx` only after baseline UI passes.

- P1: buttons/link/icons 160–200ms ease-out. Translate at most 1–2px; stable borders avoid layout shift. Apply hover transforms only within `(hover:hover) and (pointer:fine)` and preserve focus-visible styling.
- P2: CSS-only hero entrance, opacity + 8px rise, 350–450ms; small stagger up to 80ms between text/photo. Base content must remain visible without JS. No delays on actionable buttons exceeding 120ms.
- P2: optional Reveal for introduction/services/CTA only, one-time IntersectionObserver, rootMargin roughly `0px 0px -40px`, threshold .1, 400ms ease-out. Keep default server-rendered content visible and arm offscreen animation only after client initialization. Reduced motion and missing IntersectionObserver display immediately. Disconnect observers after completion and on unmount. Do not reveal every grid item or use a page-wide opacity gate.
- Mobile disclosure: opening opacity/6px translate 160ms when visible. Closed nav must remain display:none or otherwise inert; never leave hidden tabbable links. Instant close is acceptable. No full-screen drawer required.
- Dialog: opening 180ms fade/scale .99; do not delay close or interfere with native focus restoration. No exit-state machinery solely for cosmetics.
- Scrollers: native smooth behavior on user action; keep reduced-motion auto behavior. **No automatic logo/review movement needed.** If ever introduced, require visible pause and pause on focus/hover/touch; lower priority than readability.
- Statistics: keep real values static. Count-up, continuous CTA pulsing, background motion and animated gradients are optional and explicitly not recommended for this pass.
- Put reduced-motion rule after new animation declarations. Never animate height/top/left or introduce scroll-linked layout recalculation.

## F. Responsive implementation strategy

Test every page at 360,390,430,768,1024,1366,1920; include 320 regression and 200% browser zoom. Also check intermediate 850/980/1180 transitions after changing navigation.

- Collapse navigation at 1024 or 1100 based on actual 14px label fit; do not shrink nav to 10px to force it in. Keep header 80–88px desktop and 72–76px mobile. Update html scroll-padding and nav max-height to actual header height using shared CSS variables. Header stays sticky without shrinking on scroll.
- Stack hero at <=850, not only 640. Keep text before image. Below 430 use full-width primary button and clearly spaced secondary link; permit wrapping instead of compressing text.
- Use image aspect-ratio rather than 510–590px fixed minimums at every width; desktop hero approximately 1:1, mobile 4:3; introduce min-height:0 in overrides. Preserve object-fit:cover, tune focal point using current image. Avoid slicing off useful solar panels.
- Gallery 3 columns desktop, 2 tablet, 1 small mobile; certificates 3 desktop only if readable, 2 tablet, 1 mobile. Shared image sizes strings must reflect real grid breakpoints.
- Calculator/quote one column <=850; form control font 16px, min-height 48px. Labels and messages wrap. Unit suffix cannot consume the editable input on 320px.
- Footer two broad columns tablet; one column <=480 for contact/nav legibility, optionally two sections only if fit at >=480. Touch/social/scroller/close controls >=44×44px at all widths.
- Clamp logo/review item width to available track; section heading/controls can wrap to next row. Avoid page-level overflow:hidden as a substitute for fixing the element.

## G. Header improvements — P1

**Weakness:** visually small links and logo tagline; cramped mid-width nav; header background does not distinguish scroll state.
**Where:** `Header.jsx`, header and media sections of `site.css`.
**How:** increase nav to 14px and links' interactive padding, retain order/active aria-current. Active underline plus subtle tint on mobile. Quote CTA min-height 44–48px. Keep existing logo, constrain width 160–180px. Use the responsive strategy above. Optional tiny passive scroll listener with cleanup and state updates only when crossing y=12px adds `.is-scrolled` shadow; do not animate header height. No listener needed if fixed subtle border/shadow looks sufficient.
Menu remains a disclosure, not a modal: no unnecessary focus trap or body lock. Retain Escape and route close; add close on outside pointer if useful and tested. Reset stale open state when crossing to desktop if necessary. Test focus remains visible after anchor skip and keyboard navigation.
**Expected:** readable, calm navigation with confident primary CTA and an intentional tablet menu.

## H. Footer improvements — P1

**Weakness:** 9–12px content, 34px social targets and tight phone/WhatsApp row. Source is navy despite user's grey/black description.
**Where:** `Footer.jsx` and footer CSS.
**How:** use footer-only charcoal tokens; headings 15px, links/contact/address 14–15px, legal line 12–13px. Increase social targets to 44px and restrained grey hover background. Phone rows use flexible width rather than max-width:170px; allow wrap with stable WhatsApp control. Preserve exact link destinations and office address. Clear column headings; one-column small-mobile layout. Use existing Get a Quote navigation link as an emphasized footer link if needed, without duplicating another large CTA panel.
**Expected:** readable, grounded footer with actionable contact information, no cramped two-column microtext.

## I. Home page improvements

**Where:** `pages/index.js`, relevant home selectors, Shared and Scroller.

1. **P1 hero:** strongest impact. Keep approved wording and user's solar-only choice. Fix stale asset dimensions and image update strategy first (see Q). Reduce fixed heights, align copy vertically, moderate h1 and tracking; 16px introduction, 14px secondary link, 13px location note. Use pale gradient and a 10px radius image with restrained border/shadow. No text/plaque/stamp overlay: user explicitly removed them. Stack at tablet width. One subtle entrance after structural checks. Expected: balanced solar imagery and readable message, with both CTAs easy to find.
2. **P1 company introduction:** remove padding-right/padding-bottom originally reserved for deleted `.sg-photo-stamp`; image should fill a clean frame. Increase body text and paragraph spacing, use responsive 4:3 crop. Do not re-add the since-2011 badge. Preserve founding-year prose. Expected: clean editorial image/text split.
3. **P1 services:** retain numbered editorial list and SVG icons; do not turn into four generic shadow cards. Descriptions 16px, notes 14px, titles 22–24px. Align icons consistently, give 28–32px row padding and subtle separators. Hover/focus-within may tint row background very lightly; do not imply entire row is clickable. Tablet two-column only if body paragraphs fit comfortably; otherwise one column. Expected: readable comparison of four services.
4. **P1 stats:** 40–48px static values, labels 14px with natural two-line wrap. Use equal minmax tracks; allow vertical alignment at mobile without clipping. Keep 100+,10+,8+ exactly and supplied labels. No count-up required.
5. **P2 clients/brands:** normalize visual area using contain, 48–64px max logo height (client composite marks may need 72px), 160–220px tiles and 20–28px padding. Preserve aspect ratios and Inverex dark tile. Use consistent faint borders, no forced grayscale that changes marks. Keep native scrolling; visible 44px controls and a peek of next item communicate continuation. Optional fade at track edges must not obscure logos/focus outlines. No partner/endorsement wording.
6. **P1 testimonials readability / P2 hover:** review text 16px, names 14px, disclaimer 14px, sample badge at least 11px. Card width min(360px, available width), 24–28px padding, adequate space between quote and author. Allow rating/badge row to wrap. Keep sample data separate and visibly labeled; no Google aggregate stars or verified claims. Hover can use border change and 2px elevation, no autoplay.
7. **P2 gallery preview:** preserve three real installation photos and approved heading. Consistent 4:3 crop or existing subtle first-image emphasis, labels 14px, a visible arrow and focus ring. Hover zoom max 1.025; full gallery remains the destination. Never use stock photos as completed SUNGRID projects.
8. **P1 closing CTA/calculator teaser:** 16px copy, 14–16px actions, subtle pale closing gradient with static decoration. Mobile buttons stack and primary stretches naturally. Preserve 600→5.50 example. Align desktop action cluster with heading without the arbitrary 70px right margin. Expected: clear next action without shouting.

## J. About page — P1 readability, P2 treatment

**Weakness:** large repeated intro, small story text, static image with focal position inherited from now-removed human stock image.
**Where:** `pages/about.jsx`, `.sg-page-intro`, `.sg-section-copy`, `.sg-about-photo`, `.sg-vision`, `.sg-values`.
**How:** compact PageIntro padding to 56–64px desktop/40px mobile; shared h1 max 54px. Story body 16px max 62ch. Preserve user's `home1.1.jpg` image; correct metadata and center crop unless inspection justifies another focal point. Keep visual a readable 4:3 mobile/near-square desktop. Values stay an ordered-looking divider list, no unnecessary cards; 16px text and 20–24px row spacing. Vision background stays a very subtle existing green-grey tint (do not propagate it as a new brand). Use small reveal only for story or vision, not every value. Keep certificates link and closing quote CTA. Expected: credible engineering story with a calm editorial rhythm.

## K. Gallery — P2

**Weakness:** 30 uniform crops and small captions; thumbnails and controls need clearer interaction affordance.
**Where:** `pages/gallery.jsx`, `ImageGallery.jsx`, gallery/lightbox CSS.
**How:** compact intro; collection bar and captions 14px, gap 20–24px. Retain ordered responsive grid, not JS masonry. Preview cover, enlarged contain. Make zoom affordance 44px on touch and visibly focusable via parent button. Border/radius match shared photos. Only a subtle zoom on fine pointer. Match next/image sizes to <=640 one column, <=850 two, above three (or actual chosen thresholds). Dialog close/arrow buttons >=44px, mobile navigation below full image, max-height using dvh; meaningful title and count. Opening fade only; maintain Escape, focus return, body lock, next/previous. No filters without asset metadata and no invented capacities/locations. CTA remains after collection. Expected: polished portfolio, easy viewing at every size.

## L. Calculator — P1

**Weakness:** oversized introductory block postpones utility, small helper text, input suffix takes large fixed padding.
**Where:** `pages/calculator.jsx`, calculator CSS; do not edit algorithm.
**How:** compact intro to bring form near first viewport. 16px labels/input minimum (number itself 26–30px), help 14px, 48px button; responsive suffix on separate row at very narrow sizes if needed. Result area keeps stable space, strong 52–64px number, 14–16px explanation and clear quote button. Explanation steps use 16px body, max 60ch, 24px gaps; formula can wrap naturally. Maintain live announcements and error focus. Animate result opacity at most 180ms, never interpolate the number. Background remains dark navy for valid result and pale grey for empty state. Expected: useful, transparent tool with reassuring hierarchy.

## M. Certificates — P1 legibility, P2 polish

**Weakness:** long intro plus two expertise columns push certificate previews down; small scan previews/notes.
**Where:** `pages/certificates.jsx`, ImageGallery certificate styles.
**How:** compact intro and expertise spacing, 16px supporting text, 14px certification disclaimer. Keep two expertise articles with separators, not extra cards. White/light-grey contained scan frame, aspect ratio matching document readability; previews must never imply cropping of originals. Caption 16px and action 14px. If 3-column documents become too small at laptop sizes, transition earlier to 2 columns; one mobile. Reuse shared lightbox improvements. No new badge/accreditation language. Expected: readable evidence and clear distinction between training and registrations.

## N. Contact — P1

**Weakness:** intro overshadows contact tasks, WhatsApp links 10px, decorative placeholder occupies a large panel.
**Where:** `pages/contact.jsx`, contact selectors.
**How:** phone/email 16px, WhatsApp 14px in >=44px targets. Preserve exact values/config links. Group icon, label and contact with 16–20px gaps; address max 45ch. Map stays explicitly a placeholder, muted and 280–340px mobile; no live-map styling claims, fake pins for a specific address or embeds. Keep its note 14px. CTA heading 20px and body 16px; button wraps below copy at narrow widths. Retain contact min-width:0 and heading wrapping fix. Optional icon hover only for actual linked controls. Expected: contacting the company becomes the clear primary task.

## O. Get a Quote — P1

**Weakness:** small inputs, privacy copy at 9–11px, comparatively long intro before form.
**Where:** `pages/get-a-quote.jsx`, `QuoteForm.jsx`, quote/field CSS.
**How:** shared compact intro; form heading 26px, labels 15–16px, controls 16px with 48–52px height, textarea >=144px. Mobile single column and 20–24px padding; desktop name/phone paired only when each fits. Form notice 14px with icon, calm background and clear contrast. Error messages 14px and `aria-describedby` retained. Direct phone/WhatsApp/email links become 15–16px with generous targets. The submit button reports its loading state, and success appears only after Netlify accepts the request. No animated input movement; success/error blocks may fade without stealing focus. Expected: comfortable, honest and trustworthy inquiry experience.

## P–R. Shared components and exact file map

Modify existing components rather than replacing them:

| File | Change |
|---|---|
| `styles/site.css` | Most improvements: tokens, readable sizes, spacing, surfaces, footer/header, breakpoint repair, motion and reduced-motion |
| `styles/globals.css` | Preserve reset/contact fixes; remove stale people-focused crop offsets only when new photo focal treatment is applied |
| `components/site/Header.jsx` | Optional scroll state/outside close, keep disclosure accessibility |
| `components/site/Footer.jsx` | Minimal grouping/CTA refinements if CSS alone insufficient |
| `components/site/Shared.jsx` | Shared intro/CTA/photo refinements; accurate image sizes; optional per-photo objectPosition prop only if more than one consumer needs it |
| `components/site/Scroller.jsx` | Small badge/layout/control refinements; native behavior preserved |
| `components/site/ImageGallery.jsx` | sizes, button affordance, dialog visual polish; preserve lifecycle |
| `components/site/QuoteForm.jsx` | Accessible presentation; retain validation contract and exact status |
| `pages/index.js` | Hero composition/breaks, introduction padding, service layout hooks; preserve removed overlays |
| `pages/about.jsx` | Story/vision spacing, responsive line breaks |
| `pages/gallery.jsx` | Intro/bar spacing only unless needed for shared layout |
| `pages/calculator.jsx` | Input unit suffix/layout and results presentation only |
| `pages/certificates.jsx` | Expertise/scan hierarchy |
| `pages/contact.jsx` | Contact/WhatsApp target layout and placeholder proportions |
| `pages/get-a-quote.jsx` | Intro/form/direct-contact hierarchy |
| `data/featured-images.js` | Correct dimensions, preserve CURRENT Projects mapping |

New files: this plan (required); `components/site/Reveal.jsx` (optional P2); `scripts/verify-ui.cjs` (optional reusable browser regression helper, only if installed/local Playwright can be used without heavy runtime dependency). Do not create a new button/component framework, Tailwind config, App Router, UI library, or generic service-card abstraction for one use.

**Repeated image refresh issue (P1 targeted repair):** updating dimensions alone cannot invalidate next/image output for a public file replaced under the same URL. Current Projects hero is explicitly home3.jpg, not home1.1.jpg; do not silently undo this. Correct dimensions to actual files. Prefer static image imports in featured-images.js with Photo passing the imported StaticImageData to next/image; this gives hashed build URLs on actual byte changes. Check imports/Photo shape together and preserve alt labels. Alternative: deliberate content-hash query/source version updated by an asset step, but avoid timestamps every render or disabling optimization globally. No mass `.next` deletion while the user's dev server is running. Confirm source file and rendered URL against intended mapping. If user later asks to return home1.1 to hero, make that specific swap only.

## S–T. Implementation order and priority

1. P1: operate in Projects copy; correct featured-image metadata/cache strategy; establish tokens and legible sizes in current CSS. Preserve all latest content/image edits.
2. P1: shared header/footer/navigation, >=44px controls and 16px inputs; desktop/tablet fit and mobile stacking.
3. P1: home hero/introduction, adaptive photo frame, removal of obsolete stamp padding; shared PageIntro and CTA rhythm.
4. P1: calculator/quote/contact utility layouts; readabilty of services, reviews, stats and certificate explanations.
5. P2: gallery/certificate frames, native scroller logo balance, testimonial borders/spacing, image sizes/focal positions.
6. P2: restrained CSS hover/hero/menu/dialog transitions; optional Reveal only after responsive baseline passes.
7. Validate all routes and interaction contracts; fix regressions, record evidence and update completion log.

High priority: readable typography, navigation fit, useful first viewport, responsive photos/forms, honest contact/quote interactions. Medium: subtle gradients, logo rhythm, scan presentation, sparse entrance animations. Optional: Reveal abstraction, scroll-state header shadow, edge fades. Skip: autoplay, count-up, page transitions, animated backgrounds, new frameworks.

## U–V. Accessibility and performance guardrails

- Maintain one h1/page, semantic main/nav/footer/section headings, skip link, active route aria-current, input labels and associated errors, focus-visible outlines. Never use color alone for active/error state.
- Measure contrast: normal text >=4.5:1, large text >=3:1; focus/control boundaries >=3:1 where applicable. Keep sample and form notes readable; no opacity fades that make them effectively disappear.
- Native dialog keyboard containment/focus restoration must survive style changes. Hidden menu links must be removed from keyboard flow. Test Tab/Shift+Tab and Escape after every menu/viewer edit.
- Keep descriptions/long email/large results wrapping without arbitrary ellipsis. Test 200% zoom and long input text; no horizontal page scroll.
- Motion optional, short, reduced-motion aware. No flashing or continuous attention grabbers. No focus movement solely for decoration.
- No new runtime libraries, remote fonts, review/map services, analytics, or forms backend. Keep all local images optimized and appropriately sized, hero alone eager/priority. Preserve intrinsic containers to avoid CLS. Do not upscale user images or re-download assets to pursue artificial resolution numbers.
- Avoid repeated observers/listeners per logo or gallery item. Preserve native scrollers and CSS layout, lazy below-fold images. Do not add client state to all static page sections.

## W. Validation and acceptance checklist

Run with Node 22: `source "$HOME/.nvm/nvm.sh"`, `nvm use`, `npm run lint`, `npm test`, `npm run build`. There is no standalone TypeScript test script (JavaScript project); do not claim a separate typecheck passed. Build includes Next's own checks. Prefer an isolated preview port for production validation; do not overwrite a running dev server's build artifacts.

For ALL seven routes × widths 360,390,430,768,1024,1366,1920:

- HTTP 200, exactly one h1, correct title, no browser exceptions, no missing images after scrolling/lazy-load completion.
- document scrollWidth <= viewport width; inspect offending elements rather than masking overflow. Include 320px and 200% zoom regressions.
- Nav readable without compressed labels; sticky header doesn't cover targets; mobile menu toggles, Escape closes, route selection closes, focus returns correctly.
- All CTA paths and exact phone/email/WhatsApp/social hrefs retained. Avoid sending messages during testing.
- Logo/review touch/trackpad/keyboard scrolling; arrows and disabled edge state; no duplicate accessible logo lists; all logos contain correctly.
- Gallery AND certificates: open, arrows, next/previous, visible close, Escape, focus return, modal focus containment, full image view and no page scroll behind dialog. Test single item/empty fallback where practical.
- Calculator: 600→5.50; empty, zero, negative, alphabetic, infinity and excessive values produce errors with no NaN; input edit clears stale result; quote CTA works.
- Quote: all fields required, permissive valid international phone formats, invalid focus; exact not-sent status; edit clears status; zero requests/storage/logging of submitted data.
- Reduced motion disables animation and smooth scrolling; no hidden content if JS reveal is unavailable. Focus rings remain visible inside scrollers.
- Inspect screenshots at mobile, tablet and desktop: no awkward heading breaks, button overflow, unnatural panel cropping, giant empty gaps or tiny disclaimers. Test touch target sizes with bounding boxes.
- Existing tests in `tests/validation.test.mjs` cover calculator and quote rules. Temporary prior scripts `/private/tmp/sungrid-interactions.cjs` and `/private/tmp/sungrid-browser-check.cjs` use port 3001 and existing labels; adapt base URL, do not assume server or file availability forever.

### Known issues / prior results / handoff boundaries

Earlier redesign passed build/lint, four unit tests, 92 interaction assertions and basic mobile/tablet/desktop checks. Those results are historical, not proof of the new refinements. A new baseline responsive audit is being recorded below for this plan.

Production audit previously reported zero vulnerabilities; full audit showed development-tool transitive braces advisories. Do not run `npm audit fix --force` as part of visual work (it suggested incompatible downgrade). No need to revisit dependency research to implement this plan.

Preserve editorial inconsistency: supplied founding year 2011 and supplied statistic 8+ years; do not invent a corrected statistic. The quote form now uses Netlify Forms, the Contact page uses the supplied Google Maps embed, and reviews use the supplied static snapshot. Preserve no deployment and no blog restoration. No fake partners, projects, claims or certifications. Do not reintroduce removed image overlays, people photos or “out in the world” copy.

### Baseline browser evidence — 4 October 2026

The current Projects dev server was checked with headless Chrome at 360, 390, 430, 768, 1024, 1366 and 1920px across all seven routes (49 page/viewport combinations). All returned HTTP 200, had one h1 and had no document-level horizontal overflow. No JavaScript page exceptions were captured. Evidence is saved in `docs/ui-audit-baseline.json`.

The company logo failed to load in the header/footer: both components reference `/assets/images/logo.png`, but that file is missing from the Projects images directory. The existing original logo is available in the worktree at `/Users/muhanif/.codex/worktrees/4287/sungrid nextjs/public/assets/images/logo.png`. Restore this one asset before visual refinements; do not copy the rest of the older images directory. This is a source-file absence, not an image-cache diagnosis.

Computed quote input text is 12px at every tested width. Base text is 14px at phone sizes and 15px otherwise; individual selectors make some content smaller. Desktop navigation is 11px at 1024 and 12px at 1366/1920. The measured footer background is rgb(16,34,54), confirming the dark navy source value. Hidden navigation styles at mobile sizes are not evidence that the menu was interaction-tested.

Fresh screenshots of Home, About, Gallery, Calculator, Certificates, Contact and Quote were visually reviewed. They confirm that the existing compositions are coherent and should be refined, not replaced. Desktop certificate introductions consume too much vertical space; mobile contact headings wrap awkwardly; the mobile quote form follows a long introduction; footer and supporting copy need larger text. Preserve the clean service rows and existing certificate previews. Photo choices currently render consistently with the recorded mapping.

Scope limits: this baseline did not scroll through every lazy image, exercise dialogs/forms/menus, measure contrast, test zoom or emulate reduced motion. Grey below-fold screenshot boxes are untriggered lazy images, not proof of missing assets. Run the complete W checklist after implementation. Screenshots and the audit runner are temporary files under `/private/tmp/ui-audit-*` and `/private/tmp/sungrid-ui-audit.cjs`; the durable JSON records measurements. Build/lint/unit tests were not rerun for this documentation-only stage.

### Completion log

- 2026-10-04: complete source/interaction architecture assessment and implementation plan written. No new visual-system implementation yet. Current Projects image mapping recorded to prevent accidental overwrites by older worktree files.
- 2026-10-04: created `UI_IMPROVEMENT_PLAN.md` and `docs/ui-audit-baseline.json` in the Projects repository. Completed 49 responsive baseline checks; limits documented above. Restored only `public/assets/images/logo.png` from the existing original worktree asset after the plan was complete. A fresh Chrome check confirmed both header and footer logo images loaded successfully. Baseline JSON intentionally retains the pre-repair failures. No JSX, CSS, configuration or dependency files changed in this planning pass; no new build/lint/unit-test run. All remaining visual refinements are pending in the S–T implementation order.
- 2026-10-04: implemented the complete P1/P2 refinement pass without changing routes, approved content, business logic, dependencies, or integration boundaries. Updated `styles/site.css`, `components/site/Header.jsx`, `data/featured-images.js`, and `pages/_document.js`; restored the existing `public/assets/images/favicon.png`. Added readable type/spacing tokens, responsive navigation at 1100px, scroll-state header treatment, adaptive hero/image layouts, 44px controls, 16px inputs, editorial service rows, improved stats/scrollers/reviews/gallery/certificates/dialog/calculator/contact/quote layouts, charcoal footer, restrained CSS motion, and reduced-motion fallbacks. Featured images now use static imports so replaced bytes receive hashed build URLs; current home3/home2/home1.1 mapping remains unchanged.
- 2026-10-04 validation: `npm run lint` passed; all 4 unit tests passed; the real `npm run build` passed with all 9 routes statically generated. The interaction suite passed 92 assertions covering exact navigation/contact destinations, mobile disclosure/focus, native scrollers, calculator errors and 600→5.50, gallery/certificate dialogs, quote validation/no transmission or storage, 320px layouts, reduced motion, images and console errors. The final browser audit passed all 77 combinations (7 routes × 11 widths: 320,360,390,430,768,850,1024,1100,1180,1366,1920) with HTTP 200, one h1, no horizontal overflow, no broken loaded images, no form text below 16px and no browser errors. Durable evidence: `docs/ui-audit-final.json` and `docs/ui-interactions-final.json`. The dev server was restarted at `http://localhost:3000` after the production build.
- 2026-10-04 visual-direction revision: strengthened `styles/site.css` after user feedback. The shared header and hero now use deep navy gradients; homepage sections alternate between slate-blue, blue-grey, navy and charcoal; interior page heroes use the same dark brand rhythm; testimonials, calculator panels, closing CTAs, forms and footer have clearer depth. Added hover/focus motion for navigation, buttons, statistics, service rows, photos, logos, gallery/certificate items, contact rows and fields, plus CSS view-timeline section entrances and a subtle map-pin animation. Motion remains disabled under `prefers-reduced-motion`. Reran lint, 4 unit tests and the real production build successfully. Reran all 92 interaction assertions and all 77 responsive route/viewport cases with zero failures/browser errors. A separate Chrome motion check confirmed button/service/logo transforms, field focus treatment and reduced-motion behavior. Final audit JSON files were refreshed and localhost:3000 restarted.
- 2026-10-04 hover-strength revision: increased the persistent hovered/focused states without changing layout dimensions. Buttons/nav scale about 4–8%; statistics/logos scale about 8%; service rows translate and scale with a stronger blue edge; project/gallery/certificate images zoom about 7–9%; reviews, contact rows, icon buttons and social controls receive clearer lift, color and shadow changes. Transitions use a 280ms cubic-bezier curve and stay applied for the complete hover/focus duration. Fine-pointer media queries prevent unwanted touch behavior, and reduced-motion still disables all movement. Chrome motion verification, the 21-page desktop/tablet/mobile route check and the real production build passed; localhost:3000 was restarted.
