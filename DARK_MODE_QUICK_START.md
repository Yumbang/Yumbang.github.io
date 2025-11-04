# Dark Mode Quick Start Guide

Quick reference for using and customizing the dark mode system.

## For Users

### Toggle Theme
- **Click** the sun/moon icon in the site header
- **Keyboard**: Tab to button, press Enter or Space

### Automatic Detection
- First visit: Uses your system preference (light/dark)
- Manual toggle: Remembers your choice across sessions
- Clear saved preference: Clear browser localStorage

## For Developers

### Files You Need to Know

```
_includes/
├── theme-init.html      ← FOUC prevention (in <head>)
├── theme-toggle.html    ← Toggle button component
├── head.html           ← Updated to include theme-init
└── header.html         ← Updated to include toggle

_sass/
├── _variables.scss     ← Theme colors (EDIT HERE for colors)
├── _base.scss          ← Base element styles
├── _layout.scss        ← Layout styles
├── _components.scss    ← Component styles
└── _syntax.scss        ← Code highlighting (both themes)
```

### Quick Customization

#### Change Colors

Edit `_sass/_variables.scss`:

```scss
// Light theme
$light-bg: #ffffff;        // Change light background
$light-text: #1e293b;      // Change light text

// Dark theme
$dark-bg: #0f172a;         // Change dark background
$dark-text: #f1f5f9;       // Change dark text
```

#### Change Default Theme

Edit `_includes/theme-init.html` line ~26:

```javascript
return 'dark';  // Change to 'dark' for dark default
```

#### Add Dark Mode to New Component

```scss
.my-component {
  // Use CSS variables (auto-adapts)
  background-color: var(--color-background);
  color: var(--color-text);
  border-color: var(--color-border);
}

// Or add specific dark overrides
[data-theme="dark"] {
  .my-component {
    opacity: 0.9;  // Example: dim slightly in dark mode
  }
}
```

### Available CSS Variables

```scss
// Backgrounds
var(--color-background)      // Main background
var(--color-background-alt)  // Alternate background

// Text
var(--color-text)           // Main text
var(--color-text-light)     // Muted text

// UI
var(--color-border)         // Borders
var(--color-gray-100)       // Light gray
var(--color-gray-200)       // Medium gray
var(--color-gray-300)       // Dark gray

// Code
var(--color-code-bg)        // Code background
var(--color-code-border)    // Code border
var(--color-code-text)      // Code text

// Brand (same in both themes)
var(--color-primary)        // Primary blue
var(--color-accent)         // Accent color
var(--color-success)        // Green
var(--color-warning)        // Orange
var(--color-error)          // Red

// Shadows
var(--shadow-sm)            // Small shadow
var(--shadow-md)            // Medium shadow
var(--shadow-lg)            // Large shadow
```

## Testing Checklist

### Quick Test
1. [ ] Toggle switches between light/dark
2. [ ] Theme persists after reload
3. [ ] No white flash on page load
4. [ ] All text is readable in both modes

### Full Test
1. [ ] Homepage in both themes
2. [ ] Post page with code blocks
3. [ ] CV page in both themes
4. [ ] Tags page in both themes
5. [ ] Comments section (if enabled)
6. [ ] Mobile view (responsive)
7. [ ] Keyboard navigation
8. [ ] Browser reload test

## Common Tasks

### Reset User's Theme Choice
In browser console:
```javascript
localStorage.removeItem('theme');
location.reload();
```

### Force Light Mode
In browser console:
```javascript
document.documentElement.setAttribute('data-theme', 'light');
```

### Force Dark Mode
In browser console:
```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

### Check Current Theme
In browser console:
```javascript
console.log(document.documentElement.getAttribute('data-theme'));
```

### Listen for Theme Changes
In your JavaScript:
```javascript
window.addEventListener('themeChanged', (e) => {
  console.log('Theme changed to:', e.detail.theme);
  // Your code here
});
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| White flash on load | Ensure `theme-init.html` is in `<head>` before stylesheets |
| Theme not saving | Check browser localStorage permissions |
| Toggle not visible | Verify `theme-toggle.html` is in `header.html` |
| Wrong colors | Use `var(--color-*)` instead of hardcoded colors |
| Slow transitions | Reduce transition duration in `_variables.scss` |

## Build & Deploy

### Local Testing
```bash
bundle exec jekyll serve
# Visit http://localhost:4000
# Toggle theme and reload to test persistence
```

### Deploy to GitHub Pages
```bash
git add .
git commit -m "feat: add dark mode system"
git push origin main
# GitHub Actions will deploy automatically
```

## Quick Reference: Color Values

### Light Mode
- Background: `#ffffff` (white)
- Text: `#1e293b` (dark blue-gray)
- Border: `#e2e8f0` (light gray)

### Dark Mode
- Background: `#0f172a` (dark blue-gray)
- Text: `#f1f5f9` (light gray)
- Border: `#334155` (medium gray)

### Brand (Both Modes)
- Primary: `#2563eb` (blue)
- Accent: `#0ea5e9` (cyan)
- Success: `#10b981` (green)
- Warning: `#f59e0b` (orange)
- Error: `#ef4444` (red)

## Need More Help?

See full documentation: [`DARK_MODE_GUIDE.md`](DARK_MODE_GUIDE.md)

---

**Version**: 1.0.0 | **Updated**: 2025-11-03
