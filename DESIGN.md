# Design Brief: Premium Homoeopathic Knowledge Platform

## Tone & Differentiation
Refined medical authority meets premium healthcare software. Sophisticated dual-theme system with deliberate color psychology: dark mode (navy→slate gradient) conveys clinical precision and late-night study comfort with warm gold accents; light mode (cream→warm-beige gradient) suggests natural remedies and clinical documentation clarity with cool clinical green. Not generic wellness — serious, educational, premium knowledge platform with elevated card design and refined typography hierarchy.

## Color Palette

| Token | Light (L C H) | Dark (L C H) | Purpose |
|-------|---------------|-------------|---------|
| **Background** | 0.97 0 0 | 0.10 0 0 | Primary canvas (cream/navy) |
| **Foreground** | 0.15 0 0 | 0.95 0 0 | Text on backgrounds |
| **Primary** | 0.52 0.08 145 | 0.62 0.22 48 | Clinical green (light) / warm gold (dark) |
| **Secondary** | 0.90 0.02 60 | 0.20 0 0 | Warm beige (light) / muted navy (dark) |
| **Muted** | 0.92 0 0 | 0.20 0 0 | Subdued surfaces |
| **Accent** | 0.52 0.08 145 | 0.62 0.22 48 | CTA & highlights (green/gold) |
| **Destructive** | 0.55 0.22 25 | 0.65 0.19 22 | Error states (consistent red) |
| **Border** | 0.88 0 0 | 0.22 0 0 | Soft dividers |

## Typography
- **Display:** Fraunces (serif, elegant, premium) — headings, remedy titles, key sections; enhanced hierarchy with 5xl for primary heading "Med/Similiar"
- **Body:** DM Sans (sans-serif, clean, readable) — content, descriptions, study material; light weight for subtitles, regular for body copy
- **Mono:** Geist Mono (fixed-width) — data, formulas, codes

Type scale: XL (5xl, +1), LG (4xl, +1), MD (2xl), Base (base), SM (sm) with generous leading for premium medical documentation readability.

## Elevation & Depth
Medical precision with refined visual depth. Shadows support elevation: `shadow-medical-sm` (content), `shadow-medical-md` (interaction), `shadow-medical-lg` (modals), `shadow-card-elevated` (premium hover state). Card hover lift via `card-hover` utility. Subtle gradient backgrounds (light: cream→warm-beige 135°; dark: navy→slate 135°) add sophistication without visual noise.

## Structural Zones

| Zone | Light Treatment | Dark Treatment | Purpose |
|------|-----------------|-----------------|---------|
| **Header** | `bg-card border-b border-border shadow-medical-sm` | `bg-card border-b border-border shadow-medical-sm` | Logo, navigation, theme toggle, "Med/Similiar" title — elevated baseline |
| **Hero/Background** | `gradient-background` (cream→warm-beige) | `gradient-background` (navy→slate) | Subtle directional gradient for premium feel |
| **Quick-Access Cards** | `bg-card shadow-medical-md card-hover` (green accents) | `bg-card shadow-medical-md card-hover` (gold accents) | Elevated cards for Literature, Flashcards, Quiz, Repertory, Organon with icon + label |
| **Content Sections** | `bg-background` with `bg-card` blocks | `bg-background` with `bg-card` blocks | Main study area — symptom cards, quizzes, flashcards |
| **Footer** | `bg-muted/30 border-t border-border text-muted-foreground` | `bg-muted/30 border-t border-border text-muted-foreground` | Minimal metadata, copyright |

## Spacing & Rhythm
Baseline: 4px grid (0.25rem increments). Dense information layout with generous typography whitespace. Card padding: 1.5rem. Section gaps: 2rem vertical. Quick-access icons: 3rem size with 0.5rem bottom label gap. Creates visual breathing room while maintaining professional density. Responsive: mobile-first with `sm:`, `md:`, `lg:` breakpoints.

## Component Patterns
- **Home Header:** Large serif "Med/Similiar" title (5xl), light subtitle in DM Sans, optional user greeting
- **Quick-Access Cards:** Elevated cards (144px × 144px), centered icon (3rem), label below, primary color accent on hover
- **Flashcards:** Centered elevated card with symptom (top) / remedy (bottom), smooth flip transition
- **Quiz buttons:** Semantic green (primary) for correct, warm accents for highlights, destructive red for error feedback
- **Literature browser:** Left sidebar navigation with selected state using primary accent color, content cards on main canvas
- **Form inputs:** Light background with subtle border, focus: `ring-2 ring-primary/50`

## Motion
Smooth transitions: `transition-smooth` (0.3s cubic-bezier) for all interactive elements. Card hover: lift with `shadow-card-elevated`. Entrance animations: fade + scale for modals. Flip animations for flashcards. No bounce, no overshoot — medical precision. Page transitions: fade (200ms).

## Constraints
- No generic blue. Green (light) and gold (dark) provide intentional color hierarchy; no rainbow palettes.
- Uniform `rounded-md` (8px) for medical card aesthetic — not rounded-lg (12px) for subtlety.
- All shadows use `shadow-medical-*` or `shadow-card-elevated` utilities — no default Tailwind shadows.
- Dark mode is class-based (`.dark` on `<html>`) with localStorage persistence for user preference.
- Typography always uses font tokens (`font-display`, `font-body`, `font-mono`) — never system fonts.
- Gradient backgrounds via `gradient-background` utility; dark overlay tinted with warm gold shadow on hover.

## Home Screen Redesign
- **Header:** Change text from "Homoeopathic" to "Med/Similiar" (5xl Fraunces, bold)
- **Subtitle:** Light typography (DM Sans) with refined spacing
- **Gradient Background:** Subtle directional gradient (135°) across hero section
- **Stats Bar:** Refined typography, secondary accent color
- **Quick-Access Cards:** Five elevated sections (Literature, Flashcards, Quiz, Repertory, Organon) with icon + label, smooth hover lift
- **Feature Showcase:** Remedy preview carousel with refined shadows
- **CTA Section:** Bottom call-to-action with elevated button styling
- **Authenticated User:** Welcome badge with personalized greeting, quick-access links

## New Features: Leaderboard, Repertory, Organon, Spaced Repetition, Multi-Source Materia Medica

### Leaderboard
Separate page, three difficulty tabs (Beginner/Intermediate/Advanced). Rank table: medal badges (🥇/🥈/🥉 for top 3), rank number, username, score, streak count. Row hover: subtle lift (`shadow-medical-md`). Badges use primary accent (clinical green/warm gold) for visual hierarchy.

### Repertory
Separate page, left sidebar with symptom tree navigation. Right pane shows remedy list + source count badge. Symptom selection fills pane with remedies. Tap remedy → modal with multi-source picker (Boericke / Allen's Keynotes / Lotus). Tap source → full remedy detail view with exact citation text and attribution.

### Organon
Separate page, left sidebar with aphorism index (links to I–VI sections). Central reading pane: large serif title per aphorism, authentic text in light reading weight, inline student commentary indented and smaller. Smooth section navigation, bookmark icon for personal notes. Potential progress tracker to mark studied aphorisms.

### Spaced Repetition
Flashcard confidence meter: five-point scale (Very Unsure → Very Sure) visible on flip reveal. Backend tracks per-remedy confidence; adjusts review interval (unsure: 1 day, neutral: 3 days, sure: 7 days). Dashboard shows remedies due for review with next-review date.

### Multi-Source Materia Medica
Remedy cards display source badge (Boericke / Allen's / Lotus). Tap badge → modal showing available sources for that remedy. Tap source → full remedy details from that source with exact citation text. Remedy list filterable by source (dropdown or filter tab). Expanded to 1000+ remedies from authentic literature with clear source separation.

## Signature Detail
Dual-theme toggle in header (sun/moon icon) with smooth color transition. Fraunces display font used for remedy names, section headers, and "Med/Similiar" title creates premium, medical-journal feel. Warm gold accent in dark mode (0.62 0.22 48) contrasts with cool clinical green in light mode (0.52 0.08 145) — both palettes feel intentional, not randomized. Medal icons in leaderboard use primary colors. Aphorism numbers in Organon use serif display font for authenticity. Gradient backgrounds and elevated card shadows provide depth without visual clutter.
