# Math Rendering Testing Checklist

This document provides a comprehensive testing procedure for the math rendering system.

## Prerequisites

Ensure dependencies are installed:
```bash
bundle install
```

If you encounter FFI errors, try:
```bash
bundle pristine ffi
# or
gem uninstall ffi && bundle install
```

---

## 1. Local Build Test

### Build Site
```bash
cd /Users/ybang_mac/Development/blog
bundle exec jekyll build
```

**Expected output:**
```
Configuration file: _config.yml
            Source: /Users/ybang_mac/Development/blog
       Destination: /Users/ybang_mac/Development/blog/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
       Jekyll Feed: Generating feed for posts
                    done in X.XXX seconds.
 Auto-regeneration: disabled. Use --watch to enable.
```

**Check for errors:**
- No Liquid syntax errors
- No Kramdown warnings
- Math engine configured correctly

---

## 2. Local Server Test

### Start Server
```bash
bundle exec jekyll serve --livereload
```

**Expected output:**
```
Server address: http://127.0.0.1:4000/
Server running... press ctrl-c to stop.
```

### Visit Pages

1. **Homepage:** http://localhost:4000/
   - Should load without errors

2. **Sample math post:** http://localhost:4000/2025/11/02/math-rendering-examples/
   - Math should render beautifully
   - Equations should be centered
   - Inline math should flow with text

---

## 3. Browser Console Test

### Chrome/Firefox/Safari

1. Open DevTools (F12 or Cmd+Option+I)
2. Go to Console tab
3. Visit math post
4. Look for:

**✅ Expected messages:**
```
MathJax 3 loaded and ready
MathJax rendering complete
```

**❌ Should NOT see:**
```
Failed to load resource: mathjax
Uncaught SyntaxError
MathJax is not defined
```

### Network Tab

1. Open Network tab
2. Reload math post
3. Filter by "mathjax"

**Check:**
- CDN request to jsDelivr: Status 200
- File size: ~100-150KB (gzipped)
- Load time: Should be < 500ms

---

## 4. Visual Rendering Test

Visit `/Users/ybang_mac/Development/blog/_posts/2025-11-02-math-rendering-examples.md` and verify:

### Inline Math
- [ ] $E = mc^2$ renders within text
- [ ] $\frac{dy}{dx}$ has proper size
- [ ] $\int_a^b f(x)\,dx$ aligns with baseline
- [ ] Greek letters $\alpha, \beta, \gamma$ render correctly

### Display Math
- [ ] Quadratic formula is centered
- [ ] Integral definition is properly sized
- [ ] Cauchy's integral formula looks correct
- [ ] Equations have appropriate spacing

### Complex Features
- [ ] Matrices render correctly
- [ ] Cases (piecewise functions) align properly
- [ ] Aligned equations line up at = sign
- [ ] Fractions are properly nested

### Special Symbols
- [ ] Greek letters: $\alpha$, $\Omega$
- [ ] Set notation: $\mathbb{R}$, $\mathbb{C}$
- [ ] Custom macros: $\RR$, $\abs{x}$, $\norm{v}$
- [ ] Operators: $\sum$, $\prod$, $\int$

---

## 5. Responsive Design Test

### Desktop (1920x1080)
- [ ] Equations don't overflow
- [ ] Display math centered
- [ ] Inline math flows naturally

### Tablet (768x1024)
- [ ] Equations scale appropriately
- [ ] No horizontal scroll needed
- [ ] Touch interactions work

### Mobile (375x667)
- [ ] Long equations scroll horizontally
- [ ] Font size is readable
- [ ] Zoom works correctly
- [ ] No layout breaking

**Test viewports in DevTools:**
```
Chrome: Cmd+Shift+M (Mac) or Ctrl+Shift+M (Windows)
Firefox: Cmd+Option+M (Mac) or Ctrl+Shift+M (Windows)
```

---

## 6. Browser Compatibility Test

### Chrome/Edge (Chromium)
```bash
# Test on Chrome
open -a "Google Chrome" http://localhost:4000/2025/11/02/math-rendering-examples/
```
- [ ] Equations render
- [ ] No console errors
- [ ] Copy-paste works

### Firefox
```bash
# Test on Firefox
open -a "Firefox" http://localhost:4000/2025/11/02/math-rendering-examples/
```
- [ ] Equations render
- [ ] No console errors
- [ ] Right-click menu works

### Safari
```bash
# Test on Safari
open -a "Safari" http://localhost:4000/2025/11/02/math-rendering-examples/
```
- [ ] Equations render
- [ ] No console errors
- [ ] Performance acceptable

---

## 7. Copy-Paste Functionality Test

### Test Right-Click Menu

1. Right-click any equation
2. Verify menu appears with options:
   - [ ] "Copy to Clipboard" submenu
   - [ ] "Show Math As" submenu
   - [ ] "Math Settings" option
   - [ ] "About MathJax" option

### Test Copy Options

1. Right-click equation
2. Copy to Clipboard → LaTeX Command
3. Paste in text editor

**Expected result:**
```latex
E = mc^2
```

**Not:**
```
(garbled or empty)
```

---

## 8. Performance Test

### Page Load Time

**Without math (regular post):**
```javascript
// In console
performance.timing.loadEventEnd - performance.timing.navigationStart
```
**Expected:** < 1000ms

**With math:**
**Expected:** < 2000ms (first load), < 1000ms (cached)

### Math Rendering Time

```javascript
// In console on math page
MathJax.startup.promise.then(() => {
  console.log('Rendering took:', performance.now(), 'ms');
});
```

**Expected:** < 500ms for typical post (10-20 equations)

### Lighthouse Audit

```bash
# Run Lighthouse
# Chrome DevTools → Lighthouse → Run audit
```

**Targets:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90

---

## 9. Dark Mode Test

If your theme supports dark mode:

### Manual Toggle
1. Switch to dark mode
2. Check equations

**Verify:**
- [ ] Equations are visible (not black on black)
- [ ] Text color matches theme
- [ ] No contrast issues

### System Preference
```javascript
// Test dark mode preference
window.matchMedia('(prefers-color-scheme: dark)').matches
```

### CSS Check
```css
/* Should be in _includes/math.html */
mjx-container svg {
  color: inherit;  /* This ensures proper color */
}
```

---

## 10. Accessibility Test

### Screen Reader Test

**macOS VoiceOver:**
```bash
# Enable VoiceOver
Cmd + F5
```

1. Navigate to equation
2. Listen to output

**Expected:**
- Equation is announced
- LaTeX or spoken math is readable
- Not gibberish or "image"

### Keyboard Navigation

1. Tab to equation
2. Press Enter (if explorer enabled)
3. Use arrow keys

**Verify:**
- [ ] Can navigate to equations
- [ ] Can explore subexpressions
- [ ] Escape exits explorer

### Assistive MathML

Inspect element on an equation:

**Should see:**
```html
<mjx-container>
  <svg>...</svg>
  <mjx-assistive-mml>
    <math>...</math>  <!-- Hidden MathML for screen readers -->
  </mjx-assistive-mml>
</mjx-container>
```

---

## 11. CDN Fallback Test

### Simulate CDN Failure

1. Open DevTools → Network tab
2. Right-click → Block request domain
3. Add: `cdn.jsdelivr.net`
4. Reload page
5. Wait 5 seconds

**Expected behavior:**
- Console warning: "Primary MathJax CDN failed, loading from fallback..."
- Fallback CDN loads: `cdnjs.cloudflare.com`
- Math still renders correctly

---

## 12. Front Matter Test

### Test with math: true
Create test post:
```yaml
---
layout: post
title: "Test Math Enabled"
math: true
---

This should render: $x^2$
```

**Result:** Equation renders

### Test with math: false
```yaml
---
layout: post
title: "Test Math Disabled"
math: false
---

This should NOT render: $x^2$
```

**Result:** Literal text: `$x^2$`

### Test without math key
```yaml
---
layout: post
title: "Test Math Default"
---

This should NOT render: $x^2$
```

**Result:** Literal text: `$x^2$` (default is false)

---

## 13. LaTeX Syntax Test

### Test Common Errors

**Unbalanced delimiters:**
```latex
$\left( \frac{x}{y}$  ❌ Should show error
```

**Missing backslash:**
```latex
$sum_{i=1}^n$  ❌ Should not render as sum symbol
```

**Correct syntax:**
```latex
$\left( \frac{x}{y} \right)$  ✅
$\sum_{i=1}^n$  ✅
```

### Test Custom Macros

```latex
$\RR$         → ℝ
$\abs{x}$     → |x|
$\norm{v}$    → ‖v‖
$\braket{\psi}{\phi}$  → ⟨ψ|φ⟩
```

All should render correctly.

---

## 14. Production Deployment Test

### After Pushing to GitHub

1. **Check GitHub Actions:**
   - Go to repository → Actions tab
   - Verify build succeeded
   - Check for warnings

2. **Visit deployed site:**
   ```
   https://username.github.io/
   # or
   https://username.github.io/blog/
   ```

3. **Test math post on production:**
   - Should load from GitHub Pages
   - CDN should load (check Network tab)
   - Equations should render

4. **Check HTTPS:**
   - Ensure no mixed content warnings
   - CDN uses HTTPS
   - SRI (integrity) works

---

## 15. Regression Test

After any config changes, re-test:

- [ ] Sample math post still renders
- [ ] No console errors
- [ ] Performance hasn't degraded
- [ ] Mobile still works
- [ ] Dark mode still works
- [ ] Copy-paste still works

---

## Quick Verification Script

Run this in browser console on a math post:

```javascript
// Math Rendering Health Check
(() => {
  const checks = {
    'MathJax loaded': typeof MathJax !== 'undefined',
    'MathJax version': MathJax?.version || 'Not found',
    'Math containers found': document.querySelectorAll('mjx-container').length,
    'Assistive MML': document.querySelectorAll('mjx-assistive-mml').length,
    'CDN loaded': !!document.getElementById('MathJax-script'),
    'Page has math frontmatter': true  // Assuming we're on math page
  };

  console.table(checks);

  // Performance
  if (MathJax?.startup?.promise) {
    MathJax.startup.promise.then(() => {
      console.log('✅ MathJax rendering complete');
    });
  }

  // Check for errors
  const errors = document.querySelectorAll('merror');
  if (errors.length > 0) {
    console.error('❌ Found', errors.length, 'math errors');
    errors.forEach(err => console.error(err.textContent));
  } else {
    console.log('✅ No math errors found');
  }
})();
```

**Expected output:**
```
┌─────────────────────────────┬────────────┐
│ MathJax loaded              │ true       │
│ MathJax version             │ 3.2.2      │
│ Math containers found       │ 50+        │
│ Assistive MML               │ 50+        │
│ CDN loaded                  │ true       │
│ Page has math frontmatter   │ true       │
└─────────────────────────────┴────────────┘
✅ MathJax rendering complete
✅ No math errors found
```

---

## Troubleshooting During Testing

### Issue: Math not rendering
**Solution:**
1. Check `math: true` in front matter
2. Check browser console for errors
3. Verify CDN loaded (Network tab)
4. Check LaTeX syntax

### Issue: CDN blocked
**Solution:**
1. Check Network tab for failed requests
2. Try different network
3. Verify fallback activates
4. Check firewall/ad blocker

### Issue: Slow rendering
**Solution:**
1. Reduce number of equations
2. Use display math instead of inline
3. Check network speed
4. Check browser performance

### Issue: Mobile overflow
**Solution:**
1. Break long equations into multiple lines
2. Use `align` environment
3. Check CSS max-width settings

---

## Success Criteria

✅ **All tests passed when:**
- Build succeeds with no errors
- Local server runs smoothly
- No browser console errors
- Math renders on all browsers
- Mobile responsive
- Copy-paste works
- Performance acceptable (< 2s load)
- Accessibility features work
- Dark mode compatible
- CDN fallback functional
- Production deployment works

---

## Notes

- Run full test suite after any configuration changes
- Test on multiple browsers and devices
- Monitor production for any user-reported issues
- Keep CDN versions updated (check quarterly)
- Re-test after Jekyll/dependency updates

---

**Last updated:** 2025-11-02
**Next review:** When making configuration changes
