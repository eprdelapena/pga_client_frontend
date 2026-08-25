# Design System — Phase 4

Direction remains **luxury golf lifestyle + premium brokerage + sophisticated corporate editorial publication**.

## Core system
- Deep forest/emerald institutional palette
- Warm ivory/paper surfaces
- Restrained lime accents
- Serif-led editorial display typography with compact sans-serif interface copy
- Fine dividers, asymmetry, whitespace and large typographic statements instead of generic SaaS cards

## Motion
- CSS transform/opacity animation for most visual motion
- Shared IntersectionObserver for reveal components instead of one observer per reveal
- `requestAnimationFrame` throttled scroll-progress/header updates
- Reduced continuous decorative animation on small mobile screens
- Site-wide `prefers-reduced-motion` fallback makes content visible immediately and disables nonessential animation

## Accessibility hardening
- Consistent `:focus-visible` treatment
- Touch-friendly navigation/menu controls
- Mobile menu items removed from keyboard tab order while hidden
- Error states use `role=alert`; loading/status states remain announced appropriately

## Responsive hardening
At 1024px the navigation switches to the controlled menu before desktop links become crowded, while page layouts retain their own content breakpoints. Existing 820/560px layout rules continue to handle tablet/mobile content composition.

## Home + About company photography refinement — Phase 5
- Real PGA company/event photography is now treated as editorial content rather than a generic gallery layer.
- Home hero uses a layered golf-course + PGA-team composition with restrained floating information cards.
- Home company story uses an asymmetric photo collage and a factual 10-year marker.
- About uses a full-bleed team hero, decade story composition, editorial event gallery, and image-led closing CTA.
- Motion continues to use the existing shared IntersectionObserver reveal system plus CSS transform/opacity/scale transitions; no new animation dependency was introduced.
- All new image motion is disabled under `prefers-reduced-motion`.
- Company imagery is optimized to WebP in `public/images/company/`; `next/image` handles responsive delivery.
