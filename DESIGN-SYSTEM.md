# Design System Reference

Quick reference guide for the blog's design system.

---

## Color Palette

### Primary Colors
```
Primary:       #2563eb  ███ Modern Blue
Primary Dark:  #1e40af  ███ Darker Blue (hover states)
Primary Light: #60a5fa  ███ Lighter Blue (accents)
```

### Neutral Colors
```
Dark:       #1e293b  ███ Slate (headings, dark text)
Light:      #f8fafc  ███ Off-white (backgrounds)
Gray 100:   #f1f5f9  ███
Gray 200:   #e2e8f0  ███
Gray 300:   #cbd5e1  ███
Gray 400:   #94a3b8  ███
Gray 500:   #64748b  ███ (muted text)
Gray 600:   #475569  ███
Gray 700:   #334155  ███
```

### Semantic Colors
```
Success:  #10b981  ███ Green
Warning:  #f59e0b  ███ Orange
Error:    #ef4444  ███ Red
Accent:   #0ea5e9  ███ Bright Blue
```

### Code Colors
```
Background: #f6f8fa  ███ Light gray
Border:     #e1e4e8  ███ Subtle gray
Text:       #24292e  ███ Almost black
```

---

## Typography

### Font Families

**Body Text (Serif):**
- Georgia, Cambria, "Times New Roman", Times, serif
- Optimized for long-form reading

**Headings & UI (Sans-serif):**
- -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
- Native system fonts for performance

**Code (Monospace):**
- Menlo, Monaco, Consolas, "Courier New", monospace

### Font Sizes

| Element | Mobile | Desktop | Variable |
|---------|--------|---------|----------|
| Base    | 16px   | 16px    | `$font-size-base` |
| H1      | 32px   | 40px    | `$font-size-h1` |
| H2      | 28px   | 28px    | `$font-size-h2` |
| H3      | 24px   | 24px    | `$font-size-h3` |
| H4      | 20px   | 20px    | `$font-size-h4` |
| H5      | 18px   | 18px    | `$font-size-h5` |
| H6      | 16px   | 16px    | `$font-size-h6` |
| Small   | 14px   | 14px    | `$font-size-small` |
| Tiny    | 12px   | 12px    | `$font-size-tiny` |
| Large   | 18px   | 18px    | `$font-size-large` |

### Font Weights

| Weight | Value | Variable | Usage |
|--------|-------|----------|-------|
| Normal | 400   | `$font-weight-normal` | Body text |
| Medium | 500   | `$font-weight-medium` | Navigation, buttons |
| Semibold | 600 | `$font-weight-semibold` | Subheadings |
| Bold   | 700   | `$font-weight-bold` | Headings |

### Line Heights

| Type | Value | Variable | Usage |
|------|-------|----------|-------|
| Base | 1.7 | `$line-height-base` | Body text |
| Heading | 1.3 | `$line-height-heading` | Headings |
| Tight | 1.4 | `$line-height-tight` | Code blocks |

---

## Spacing Scale

Based on 8px grid system for visual consistency:

| Name | Size | Variable | Usage |
|------|------|----------|-------|
| XS   | 4px  | `$spacing-xs` | Tiny gaps |
| SM   | 8px  | `$spacing-sm` | Small gaps, padding |
| MD   | 16px | `$spacing-md` | Default spacing |
| LG   | 24px | `$spacing-lg` | Section spacing |
| XL   | 32px | `$spacing-xl` | Large sections |
| 2XL  | 48px | `$spacing-2xl` | Major sections |
| 3XL  | 64px | `$spacing-3xl` | Page sections |
| 4XL  | 96px | `$spacing-4xl` | Hero sections |

---

## Layout

### Max Widths

| Name | Width | Variable | Usage |
|------|-------|----------|-------|
| Content | 800px | `$max-width-content` | Main content, optimal reading |
| Narrow | 680px | `$max-width-narrow` | Focused content |
| Wide | 1200px | `$max-width-wide` | Full-width sections |

### Breakpoints

| Name | Size | Variable | Device |
|------|------|----------|--------|
| Small | 576px | `$breakpoint-sm` | Phones |
| Medium | 768px | `$breakpoint-md` | Tablets |
| Large | 1024px | `$breakpoint-lg` | Desktop |
| XLarge | 1280px | `$breakpoint-xl` | Large desktop |

---

## Border Radius

| Size | Value | Variable |
|------|-------|----------|
| Small | 4px | `$border-radius-sm` |
| Medium | 8px | `$border-radius-md` |
| Large | 12px | `$border-radius-lg` |

---

## Shadows

| Type | Value | Variable | Usage |
|------|-------|----------|-------|
| Small | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | `$shadow-sm` | Subtle depth |
| Medium | `0 4px 6px -1px rgba(0, 0, 0, 0.1)...` | `$shadow-md` | Cards |
| Large | `0 10px 15px -3px rgba(0, 0, 0, 0.1)...` | `$shadow-lg` | Modals |

---

## Transitions

| Speed | Duration | Variable | Usage |
|-------|----------|----------|-------|
| Fast | 150ms | `$transition-fast` | Hover effects |
| Base | 250ms | `$transition-base` | Standard animations |
| Slow | 350ms | `$transition-slow` | Page transitions |

All transitions use `ease-in-out` easing.

---

## Components

### Buttons

**Primary Button:**
- Background: `$color-primary`
- Text: White
- Padding: `$spacing-sm $spacing-lg`
- Border radius: `$border-radius-md`
- Hover: Darker background

**Secondary Button:**
- Background: Transparent
- Text: `$color-primary`
- Border: `$color-primary`
- Hover: Filled with primary color

**Small Button:**
- Padding: `$spacing-xs $spacing-md`
- Font size: `$font-size-small`

### Tags

- Background: `rgba($color-primary, 0.1)`
- Border: `rgba($color-primary, 0.2)`
- Text: `$color-primary`
- Padding: `$spacing-xs $spacing-md`
- Font size: `$font-size-small`

### Cards

- Background: White
- Border: `$color-border`
- Border radius: `$border-radius-md`
- Padding: `$spacing-lg`
- Shadow: `$shadow-sm`
- Hover: `$shadow-md` + slight lift

### Alerts

Four types: info, success, warning, error

- Border-left: 4px solid (semantic color)
- Background: Tinted with semantic color
- Padding: `$spacing-md $spacing-lg`
- Border radius: `$border-radius-md`

---

## Usage Examples

### Using Variables in Custom Sass

```scss
// In your custom _sass file
.my-component {
  padding: $spacing-lg;
  background-color: $color-primary;
  border-radius: $border-radius-md;
  transition: all $transition-fast;

  &:hover {
    background-color: $color-primary-dark;
    box-shadow: $shadow-md;
  }

  @media (min-width: $breakpoint-md) {
    padding: $spacing-xl;
  }
}
```

### Creating Custom Colors

```scss
// Add to _variables.scss
$color-custom: #ff6b6b;
$color-custom-dark: darken($color-custom, 10%);
$color-custom-light: lighten($color-custom, 10%);
```

### Custom Spacing

```scss
// Combine spacing variables
.my-section {
  margin: $spacing-3xl 0;
  padding: $spacing-xl $spacing-lg;
}
```

---

## Accessibility Guidelines

### Color Contrast

All text meets WCAG AA standards:
- Normal text: 4.5:1 contrast ratio
- Large text (18px+): 3:1 contrast ratio

### Focus States

All interactive elements have visible focus indicators:
- Outline: 2px solid `$color-primary`
- Offset: 2px

### Semantic HTML

- Use proper heading hierarchy (h1 → h2 → h3)
- Use semantic elements (`<nav>`, `<main>`, `<article>`, etc.)
- Include ARIA labels where needed

---

## Responsive Design Strategy

### Mobile-First Approach

1. **Base styles** - Mobile (320px+)
2. **Small breakpoint** - Large phones (576px+)
3. **Medium breakpoint** - Tablets (768px+)
4. **Large breakpoint** - Desktop (1024px+)
5. **XLarge breakpoint** - Large desktop (1280px+)

### Example Pattern

```scss
.component {
  // Mobile styles (default)
  padding: $spacing-md;
  font-size: $font-size-base;

  // Tablet
  @media (min-width: $breakpoint-md) {
    padding: $spacing-lg;
  }

  // Desktop
  @media (min-width: $breakpoint-lg) {
    padding: $spacing-xl;
    font-size: $font-size-large;
  }
}
```

---

## Performance Best Practices

### CSS Optimization

- Use Sass variables for consistency
- Avoid deep nesting (max 3 levels)
- Group related properties
- Use shorthand properties where possible

### Asset Loading

- System fonts load instantly
- No external font files
- Minimal CSS bundle
- CSS minified in production

### Critical CSS

Base styles are loaded first:
1. Variables
2. Reset
3. Base elements
4. Layout
5. Components
6. Syntax highlighting

---

## Browser Support

### Target Browsers

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Android Chrome (last 2 versions)

### Fallbacks

- Modern CSS with graceful degradation
- No JavaScript required for core functionality
- Progressive enhancement approach

---

## Customization Workflow

### 1. Update Variables

Edit `/Users/ybang_mac/Development/blog/assets/css/_sass/_variables.scss`

### 2. Override Styles

Create `_sass/_custom.scss` and import in `main.scss`:

```scss
// main.scss
@import "variables";
@import "reset";
@import "base";
@import "layout";
@import "components";
@import "syntax";
@import "custom";  // Your overrides
```

### 3. Test Responsively

- Test on real devices
- Use browser DevTools
- Check all breakpoints
- Verify accessibility

---

## Design Principles

1. **Simplicity** - Clean, uncluttered interface
2. **Readability** - Optimized typography for long-form content
3. **Consistency** - Predictable patterns and spacing
4. **Accessibility** - Inclusive design for all users
5. **Performance** - Fast loading, minimal resources
6. **Maintainability** - Modular, well-organized code

---

## Resources

### Tools

- [Coolors](https://coolors.co) - Color palette generator
- [Type Scale](https://type-scale.com) - Typography scale calculator
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Color contrast verification

### Documentation

- [Jekyll Docs](https://jekyllrb.com/docs/)
- [Sass Documentation](https://sass-lang.com/documentation)
- [MDN Web Docs](https://developer.mozilla.org)

---

This design system provides the foundation for a professional, accessible, and maintainable blog theme.
