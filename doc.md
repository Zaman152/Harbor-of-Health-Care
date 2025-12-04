# Harbor of Health Care – Full App Documentation
rgb(4,170,165)
#04aaa5

rgb(255,165,208)
#ffa5d0
## Overview
- **Framework**: Next.js 14 (App Router) with TypeScript.
- **UI**: Tailwind CSS + custom utilities in `app/globals.css`.
- **Animations**: Framer Motion, CountUp, Lenis smooth scrolling.
- **Icons**: `lucide-react`.
- **Forms/Validation**: `react-hook-form` + `zod` + `@hookform/resolvers`.
- **Carousel/Media**: Swiper (present as dependency; not used in the inspected sections).
- **Theming**: 
  - Local theme switcher: `components/shared/ThemeChanger.tsx` (adds/removes `dark` class on `<html>`).
  - Framer remote component: `ThemeChangerRemote.js` and `themechanger.js` (remote import) add `toggle-theme` attributes on `<html>`/`<body>` and inject a style tag for tokens.

## Project Structure
- **Root**: `Harbor-of-Health-Care/`
  - `app/` – Next.js App Router pages and global CSS.
  - `components/` – Layout, shared, home sections, UI primitives, providers.
  - `lib/` – Utilities and country dataset.
  - `public/` – Images and static assets.
  - `tailwind.config.ts` – Tailwind theme extension (colors, fonts).
  - `postcss.config.mjs`, `next.config.mjs` – Build/runtime configuration.

## Routing
- App Router pages in `app/`:
  - `app/page.tsx` – Home page composed of sections:
    - `HeroSection`, `WhyChooseUs`, `DetailedServices`, `ServicesGrid`, `ServiceAreasSection`, `GetStartedSection`, `CTASection`.
  - `app/services/page.tsx` – Services detail page with alternating image/text sections and CTAs.
  - `app/about/page.tsx` – Brand story, values, process, premium CTA.
  - `app/contact/page.tsx` – Contact form with rich validation and country-aware phone input.
  - `app/layout.tsx` – Root layout, metadata, schema.org JSON-LD, wraps pages with common providers (`SmoothScrollProvider`), `Header`, `Footer`, `ScrollProgress`, `ChatWidget`.
  - `app/not-found.tsx`, `app/resources/page.tsx`, `app/sitemap.ts` (present; content not inspected here).

## Layout & Providers
- **`app/layout.tsx`**
  - Injects Google fonts via `next/font`: Inter as `--font-inter`, Plus Jakarta Sans as `--font-plus-jakarta`.
  - Global metadata (OpenGraph/SEO) and schema.org `HomeHealthAgency` JSON-LD.
  - Wraps body with `SmoothScrollProvider` (Lenis). Common UI elements: `ScrollProgress`, `Header`, `Footer`, `ChatWidget`.
- **`components/providers/SmoothScrollProvider.tsx`**
  - Initializes Lenis for smooth scrolling with custom easing.
  - Destroys instance on unmount.

## Navigation (Header, Mobile Menu, Footer)
- **`components/layout/Header.tsx`**
  - Fixed header; transitions to compact with shadow on scroll.
  - Desktop nav links and CTA phone button.
  - Social icons (Facebook/Instagram placeholders).
  - Uses remote image logo configured by `next.config.mjs` (`i0.wp.com` domain allowed).
  - Mobile button toggles `MobileMenu`.
- **`components/layout/MobileMenu.tsx`**
  - Slide-in drawer with animated backdrop.
  - Links list, social icons, and phone CTA button.
- **`components/layout/Footer.tsx`**
  - Gradient top border, dark background with animated blurred teal orb.
  - Four columns: About/brand, Quick Links, Services, Contact.
  - Bottom bar with copyright/policy links.

## UI Primitives & Shared Components
- **`components/ui/Button.tsx`**
  - Variants: `primary`, `secondary`, `outline`, `ghost`.
  - Sizes: `sm`, `md`, `lg`.
  - Motion hover/tap and focus ring. Primary/secondary use pink gradient backgrounds; outline uses pink border.
- **`components/shared/SectionTitle.tsx`**
  - Animated section heading with optional subtitle.
- Other shared components present (not fully inspected): `FeatureCard`, `GlassyButton`, `PricingCard`, `ServiceCard`, `ScrollProgress`, etc.

## Home Page Visual System
- **`components/home/HeroSection.tsx`**
  - Light, modern hero with:
    - Pink wave SVG backgrounds and floating gradient blob shapes.
    - Heading with pink gradient text highlight.
    - Two CTA buttons (primary gradient, outline pink).
    - Feature bullets with pink check icons.
    - Right-side image with soft pink gradient backdrop (`/images/first image.jpg`).
    - Stats cards with CountUp animations.
    - Scroll indicator.

## Services & About Pages
- **`app/services/page.tsx`**
  - Alternating sections with images and content cards.
  - Pink-accented icons and buttons.
  - Uses `SectionTitle`. Images from `/images/*` in `public/`.
- **`app/about/page.tsx`**
  - Gradient background intro, values grid, mission, network, process, premium gradient CTA.
  - Uses `SectionTitle`, `Button`, `framer-motion`.

## Contact Page and Data Handling
- **`app/contact/page.tsx`**
  - Libraries: `react-hook-form`, `zod`, `@hookform/resolvers/zod`, `framer-motion`.
  - Schema: `contactSchema` validates first/last name, DOB, email, country, phone, optional postal code, acknowledgment checkbox, message (>= 10 chars).
  - Real-time validation utilities:
    - `validateEmail()` – regex + TLD checks.
    - `validatePhone()` – country-aware via `lib/countries.ts` (min/max length, regex pattern, formatter per country).
    - `validatePostalCode()` – numeric 5-digit example logic.
  - `CountrySelector` with searchable dropdown and flags/dial codes.
  - Enhanced inputs display validation state icons/messages.
  - Submit simulates API call, then resets; CTA button disabled until validations pass.

## Theming & Design Tokens
- **Fonts**: Declared in `app/layout.tsx`; applied in `app/globals.css`.
  - Headings: `var(--font-plus-jakarta)`.
  - Body: `var(--font-inter)`.
- **Tailwind Theme**: `tailwind.config.ts`
  - Extended colors:
    - `teal`: 50 `#E6F5FF` → 900 `#1A394D` (note: teal values lean blue; used subtly in footer glow and accents).
    - `cyan`: 50 `#F0F9FF` → 900 `#1E2B33`.
    - `pink`: 50 `#FFF0F5` → 900 `#332029` with core pinks around 400–600 (`#FFA7D1`, `#FF9ECF`, `#CC7FA5`).
    - `gray`: 50 `#F9FAFB`, 100 `#F3F4F6`, 200 `#E5E7EB`, 700 `#374151`, 900 `#111827`.
    - `cream`: `#FFF9F5`.
  - Fonts: `sans` and `heading` mapped to CSS variables.
- **Global Utilities**: `app/globals.css`
  - Base body: `bg-white text-gray-900`.
  - Utilities:
    - `glass-card`, `glass-nav` – glassmorphism.
    - `gradient-text` – pink gradient text.
    - `animated-gradient`, `gradient-btn` – animated/interactive gradients.
    - `blob-shape` + `@keyframes blob` – organic morphing shapes.
    - `scroll-progress` – fixed top gradient progress bar.
    - Brand text helpers: `brand-text-harbor`, `brand-text-services`, `brand-text-serve`.
  - Custom scrollbar with vertical pink gradient.
  - Reduced motion media query.
- **Theme Switchers**:
  - `components/shared/ThemeChanger.tsx`
    - Toggles between light/dark by adding/removing `dark` on `<html>`.
    - Uses localStorage `theme` and `prefers-color-scheme` fallback.
    - Uses classes like `bg-lavender-100`/`-800` (not defined in Tailwind config; if used, add to config or replace with existing palette).
  - `ThemeChangerRemote.js` + `themechanger.js`
    - Remote Framer component; toggles `toggle-theme="light|dark"` attributes on `<html>` and `<body>`.
    - Extracts CSS token rules from stylesheets and injects a `<style id="toggle-theme">` with token sets.
    - Dispatches `themeChange` event and persists to localStorage `theme`.
    - If both switchers are used simultaneously, decide on a single strategy to avoid conflicts (prefer one mechanism).

## Color Usage Patterns (Where gradients/colors live)
- **Buttons**: `components/ui/Button.tsx`
  - `primary`/`secondary` gradients: `from-pink-500 via-pink-400 to-pink-300`; hover pushes to 600/500/400.
  - `outline`: `border-pink-500` with pink hover background tint.
- **Header Links**: `components/layout/Header.tsx`
  - Hover underline span: `bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300`.
  - CTA phone button uses same pink gradient.
- **Hero**: `components/home/HeroSection.tsx`
  - Wave SVG fills: `rgba(255, 122, 197, 0.4)` and `rgba(255, 210, 235, 0.3)`.
  - Gradient text span: from `pink-500 → pink-300`.
  - Right image soft background: `from-pink-100 via-pink-50 to-pink-100`.
- **Footer**: `components/layout/Footer.tsx`
  - Top gradient bar: `from-teal-500 via-pink-500 to-cyan-400`.
  - Animated blurred orb: `bg-teal-500` with opacity pulsing.
  - Links hover: `hover:text-pink-500`.
- **Contact Page**: pink accents for fields focus/validation rings and element accents; gradient success box `bg-pink-50` with pink border.
- **Globals**: `gradient-text`, `gradient-btn`, scrollbar thumb gradient.

## Media & Assets
- **`public/`** contains images referenced by pages/components:
  - `/images/logo.png` – footer brand logo.
  - `/images/first image.jpg` – hero right image.
  - `/images/Boutique HomeCare IMage.jpeg`, `/images/Companion Care.jpg`, `/images/Palliative Care.jpg`, `/images/Respite Care.jpg`, `/images/homecare services.jpg`, `/images/postsurgery care.jpg`, `/images/infacility care.jpg` – content imagery.
- **Remote images** allowed by `next.config.mjs`:
  - `images.unsplash.com`, `via.placeholder.com`, `i0.wp.com` (used by header logo URL).

## Configuration
- **`next.config.mjs`** – `images.remotePatterns` allowlisted for Next Image.
- **`tailwind.config.ts`** – content globs include `./app/**/*`, `./components/**/*`, `./pages/**/*` and theme extensions (colors/fonts).
- **`app/globals.css`** – Tailwind layers and custom utilities.

## How to Tweak UI/UX Themes Safely
1. **Define/adjust palette**: Edit `tailwind.config.ts` → `theme.extend.colors`.
   - Add semantic aliases if needed, e.g. `brand: { 50: ..., 500: ... }`.
2. **Map gradients** used across the app:
   - Buttons/Header/Hero gradients currently use Tailwind pinks (`pink-300/400/500/600`).
   - Update utility classes where used, or create semantic classes in `globals.css` for centralized control.
3. **Global utilities**: Update `app/globals.css` for:
   - `gradient-text`, `gradient-btn`, `glass-card`, `blob-shape` colors/shadows.
   - Custom scrollbar gradient.
4. **Component-specific overrides**:
   - `Button.tsx`: change gradient classes for `primary/secondary/outline/ghost`.
   - `Header.tsx`: nav hover underline gradient and CTA button classes.
   - `HeroSection.tsx`: wave SVG fill colors, blob background gradients, gradient text span.
   - `Footer.tsx`: top gradient bar and hover colors.
5. **Typography**:
   - Fonts are set in `app/layout.tsx` and applied in `app/globals.css`.
   - Adjust sizes/weights in components or abstract to utilities.
6. **Dark mode** (if enabling):
   - Choose one theme mechanism: `dark` class or `toggle-theme` attributes.
   - Add Tailwind dark variants in components/utilities (e.g., `dark:bg-gray-900`).
   - Ensure `ThemeChanger.tsx` or `ThemeChangerRemote.js` is the single source of truth.

## Where to Change What (Quick Index)
- **Primary gradient color**: `components/ui/Button.tsx` variants + occurrences in `Header.tsx`, `HeroSection.tsx`, `Footer.tsx`, `globals.css` utilities.
- **Neutral background/text**: `app/globals.css` base `body` and component text classes.
- **Glassmorphism look**: `app/globals.css` `.glass-card`, `.glass-nav`.
- **Blob shapes animation**: `app/globals.css` `.blob-shape` and `@keyframes blob` + `HeroSection.tsx` floating shapes array.
- **Scroll progress bar**: `components/shared/ScrollProgress.tsx` (behavior) and `app/globals.css` `.scroll-progress` (style).
- **Footer gradients/auras**: `components/layout/Footer.tsx`.
- **Icons color**: Classes like `text-pink-500` in components (Header, Services, Contact).
- **Form focus/validation rings**: Tailwind classes in `app/contact/page.tsx` inputs/selects.

## UX Patterns
- **Motion**: Enter-on-scroll animations (`whileInView`, `viewport={{ once: true }}`), hover scale/translate accents, counters.
- **Content density**: Generous spacing (`py-20`, `mb-12`, grid gaps), rounded corners (`rounded-2xl/3xl`), soft shadows.
- **CTAs**: Prominent gradient buttons, outline alternates, persistent phone CTA.
- **Accessibility**: Proper labels, `aria-label`s for social links, focus rings on buttons/inputs.

## Known Notes / Potential Cleanups
- `ThemeChanger.tsx` uses `lavender-*` classes not defined in `tailwind.config.ts`. Either:
  - Add `lavender` palette to Tailwind config, or
  - Replace these classes with existing `pink/teal/gray` tokens.
- Ensure only one theme system is active (choose between `ThemeChanger` and `ThemeChangerRemote`).
- Swiper is listed but not referenced in inspected files; remove if unused or document usage.

## Applying Changes From a Screenshot (Workflow)
- **Identify target section**: Map the screenshot to a component/route (e.g., hero → `components/home/HeroSection.tsx`).
- **Extract colors/typography**: Sample hex values and font sizes/weights.
- **Update tokens**: Add or adjust Tailwind tokens in `tailwind.config.ts`.
- **Swap classes**: Update component class strings to semantic tokens or new classes.
- **Test motion**: Adjust Framer Motion durations/easings if needed.
- **Validate dark/light**: If supporting dark mode, confirm variants render correctly.

## File Map (Key Targets)
- **Colors & Fonts**: `tailwind.config.ts`
- **Global Utilities**: `app/globals.css`
- **Header**: `components/layout/Header.tsx`
- **Footer**: `components/layout/Footer.tsx`
- **Hero**: `components/home/HeroSection.tsx`
- **Buttons**: `components/ui/Button.tsx`
- **Contact Form styling**: `app/contact/page.tsx`
- **Theme switchers**: `components/shared/ThemeChanger.tsx`, `ThemeChangerRemote.js`, `themechanger.js`
- **Images/domains**: `public/images/*`, `next.config.mjs`

---

If you provide a screenshot and the desired palette/feel, I can map it to the exact components and classes listed above and implement the changes rapidly.
