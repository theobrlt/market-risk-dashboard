# Design System: Market Risk Dashboard - Bloomberg FinTech

## Overview
Bloomberg-inspired dark theme for real-time financial market risk monitoring. Professional, data-focused, with emphasis on readability and performance data visualization.

---

## Color Palette (Financial Dashboard)

| Element | Hex | RGB | Usage |
|---------|-----|-----|-------|
| **Background (Deep)** | #020617 | 2, 6, 23 | Main background - OLED optimized |
| **Background (Dark)** | #0F172A | 15, 23, 42 | Cards, containers, primary elements |
| **Background (Secondary)** | #1E293B | 30, 41, 59 | Secondary cards, borders |
| **Text (Primary)** | #F8FAFC | 248, 250, 252 | Main text - excellent contrast |
| **Positive/Success** | #22C55E | 34, 197, 94 | Gains, positive indicators (Bloomberg green) |
| **Negative** | #EF4444 | 239, 68, 68 | Losses, warnings, alerts |
| **Warning** | #F59E0B | 245, 158, 11 | Caution, elevated risk |
| **Neutral/Muted** | #64748B | 100, 116, 139 | Secondary text, inactive states |
| **Border** | #334155 | 51, 65, 85 | Subtle borders, dividers |
| **Accent (Blue)** | #0369A1 | 3, 105, 161 | CTAs, links, information |

---

## Typography

### Font Family
- **Heading**: IBM Plex Sans (600/700 weight)
- **Body**: IBM Plex Sans (400/500 weight)
- **Rationale**: IBM Plex conveys trust and professionalism, essential for financial data

### Font Weights
- **Display**: 700 (headings, key numbers)
- **Body Regular**: 400
- **Body Strong**: 600
- **Caption**: 500

### Scale
- **Display**: 2.8em (h1 - risk score)
- **Large Title**: 1.8em (section headers)
- **Title**: 1.4em (card titles, info)
- **Body**: 1em (16px minimum on mobile)
- **Small**: 0.9em (secondary info)
- **Tiny**: 0.75em (timestamps, captions)

### Line Height
- **Headings**: 1.2
- **Body**: 1.6
- **Dense**: 1.4

---

## Styling: Dark Mode (OLED) + Glassmorphism

### Dark Mode (OLED)
- **Colors**: Deep black (#020617), dark grey (#0F172A), midnight blue accents
- **Effects**: Minimal glow, dark-to-light transitions, low white emission
- **Performance**: ⚡ Excellent (OLED power saving)
- **Accessibility**: ✓ WCAG AAA (text contrast 7:1+)

### Glassmorphism (For Cards)
- **Backdrop Blur**: 15px
- **Background**: rgba(31, 41, 55, 0.6) or rgba(30, 41, 59, 0.7)
- **Border**: 1px solid rgba(255, 255, 255, 0.1)
- **CSS**: `backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);`

---

## Component Styles

### Cards
```css
/* Glass Card */
background: rgba(30, 41, 59, 0.6);
backdrop-filter: blur(15px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 12px;
padding: 28px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

### Buttons
- **Primary**: Background #0369A1, text #F8FAFC, hover scale slightly
- **Disabled**: Opacity 0.5, cursor not-allowed
- **Transitions**: 150-250ms ease

### Hover States
- Cards: Lift effect (translateY -4px), border brightening
- Buttons: Color shift, shadow increase
- All interactive: `cursor: pointer`

### Loading States
- Spinners: #0369A1 color, minimal size
- Skeleton screens: Pulse animation on muted background

---

## Key Effects

### Shadows (OLED-optimized)
- **Subtle**: 0 4px 12px rgba(0, 0, 0, 0.3)
- **Medium**: 0 8px 24px rgba(0, 0, 0, 0.4)
- **Large**: 0 12px 32px rgba(0, 0, 0, 0.5)
- **Inset**: inset 0 2px 8px rgba(0, 0, 0, 0.2)

### Glow (Minimal)
- Used sparingly: `text-shadow: 0 0 10px rgba(3, 105, 161, 0.3)` for emphasis
- Never on body text (readability)

### Transitions
- Standard: `transition: all 0.2s ease`
- Slow: `transition: all 0.4s ease` (for animations)
- Fast: `transition: all 0.1s ease` (micro-interactions)

### Animations
- Respect `prefers-reduced-motion`
- Pulse on real-time data updates
- Smooth fade-in on load

---

## Interaction Guidelines

### Touch Targets (Mobile)
- Minimum: 44x44px
- Recommended: 48x48px
- Spacing: 12px minimum between targets

### Keyboard Navigation
- Tab order follows visual flow
- Focus rings visible (2px outline, color #0369A1)
- All interactive elements keyboard accessible

### Accessibility
- **Text Contrast**: 7:1 minimum (WCAG AAA)
- **Focus States**: Visible 2px outline
- **Alt Text**: All images described
- **ARIA Labels**: Icon-only buttons have aria-label
- **Color Not Alone**: Don't rely on color only to indicate state

---

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile | 375px | Small phones |
| Mobile+ | 480px | Larger phones |
| Tablet | 768px | Tablets |
| Desktop | 1024px | Small screens |
| Desktop+ | 1440px+ | Large monitors |

### Grid Adjustments
- **Desktop**: `grid-template-columns: repeat(auto-fit, minmax(450px, 1fr))`
- **Tablet**: `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
- **Mobile**: `grid-template-columns: 1fr` (single column)

---

## Charts & Data Visualization

### Chart Colors (Risk-aware)
- **Low Risk**: #22C55E (Green)
- **Moderate**: #06B6D4 (Cyan)
- **Elevated**: #F59E0B (Amber)
- **High**: #F97316 (Orange)
- **Critical**: #EF4444 (Red)

### Chart Backgrounds
- Light mode: Transparent (grid visible)
- Dark mode: rgba(30, 41, 59, 0.4) (subtle background)

### Data Labels
- Font: IBM Plex Sans, 0.85em
- Color: #F8FAFC for dark backgrounds
- Always readable (sufficient contrast)

---

## Pre-Delivery Checklist

### Visual Quality
- [ ] No emojis as icons (use Heroicons/Lucide SVGs)
- [ ] All icons from consistent set
- [ ] Hover states don't cause layout shift
- [ ] Glassmorphism cards visible on dark background
- [ ] Text shadows minimal and intentional

### Interaction
- [ ] All clickable elements have `cursor: pointer`
- [ ] Hover states provide clear visual feedback
- [ ] Transitions smooth (150-300ms)
- [ ] Focus states visible for keyboard nav
- [ ] Buttons disabled during async operations

### Dark Mode (OLED)
- [ ] Background colors: #020617, #0F172A, #1E293B
- [ ] Text contrast: 7:1 minimum
- [ ] No pure white (#FFFFFF) - use #F8FAFC
- [ ] Borders visible (rgba white 0.1-0.2)
- [ ] Test on OLED devices if possible

### Layout
- [ ] Floating elements have proper spacing from edges
- [ ] No content hidden behind fixed navbars
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile
- [ ] Cards stack properly on mobile

### Accessibility
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Color is not the only indicator
- [ ] `prefers-reduced-motion` respected
- [ ] Tab order makes sense visually

### Performance
- [ ] Image optimization (WebP, lazy loading)
- [ ] No layout thrashing (batch DOM changes)
- [ ] Animations use transform/opacity only
- [ ] Bundle size within budget

---

## Implementation Notes

### CSS Variables (Recommended)
```css
:root {
  /* Colors */
  --bg-deep: #020617;
  --bg-dark: #0F172A;
  --bg-secondary: #1E293B;
  --text-primary: #F8FAFC;
  --text-muted: #64748B;
  --border-color: #334155;
  --accent-blue: #0369A1;
  --accent-green: #22C55E;
  --accent-red: #EF4444;
  --accent-warning: #F59E0B;
  
  /* Effects */
  --blur-amount: 15px;
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
  --transition: all 0.2s ease;
}
```

### Font Import
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
```

### Reset
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  background-color: var(--bg-deep);
  color: var(--text-primary);
  font-family: 'IBM Plex Sans', sans-serif;
}
```

---

## Design Decisions & Rationale

**Why Dark Mode (OLED)?**
- Reduces eye strain for prolonged monitoring
- Saves OLED power consumption
- Professional financial sector standard
- Better contrast for data visualization

**Why Glassmorphism?**
- Modern, premium feel appropriate for FinTech
- Subtle depth without heavy shadows
- Works well with dark backgrounds
- Creates visual hierarchy through transparency

**Why IBM Plex Sans?**
- Designed for enterprise and finance
- Excellent readability at all sizes
- Conveys trust and professionalism
- Better international character support

**Why Bloomberg Colors?**
- Green for gains (positive) aligns with financial industry
- Blue for neutral/CTAs (professional, trustworthy)
- Red for losses/warnings (universal danger signal)
- Reduces cognitive load for traders/analysts

---

## Anti-patterns to Avoid

- ❌ Light backgrounds (use dark mode)
- ❌ Pure white text (#FFFFFF) on dark - use #F8FAFC
- ❌ Emojis as UI icons - use SVGs
- ❌ Heavy shadows that obscure content
- ❌ Animations that disrespect prefers-reduced-motion
- ❌ Unlabeled interactive elements
- ❌ Color-only status indicators (add icons/text)
- ❌ Insufficient text contrast (< 7:1)
- ❌ Glassmorphism without backdrop-filter support (provide fallback)

---

## Future Enhancements

- [ ] Animated gauge for risk score
- [ ] Real-time data streaming (WebSocket)
- [ ] Custom chart animations
- [ ] Dark mode toggle (for light mode support later)
- [ ] Theme customization (color picker)
- [ ] Multi-currency display
- [ ] Export to PDF/CSV
- [ ] Alert thresholds configurator

---

**Version**: 1.0  
**Created**: 2026-05-05  
**Updated**: 2026-05-05  
**Status**: Ready for Implementation
