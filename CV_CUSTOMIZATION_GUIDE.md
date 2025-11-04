# CV Page Customization Guide

Complete guide for customizing your CV/Resume page on your Jekyll blog.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Uploading Your PDF](#uploading-your-pdf)
3. [Customizing Content](#customizing-content)
4. [Styling Options](#styling-options)
5. [Advanced Features](#advanced-features)
6. [Mobile Optimization](#mobile-optimization)
7. [Print Optimization](#print-optimization)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

Your CV page is now live at: **`https://yourusername.github.io/cv/`**

**Immediate steps:**

1. **Add your PDF CV**:
   - Place your PDF at: `/assets/files/cv.pdf`
   - File must be named exactly `cv.pdf`

2. **Customize the content**:
   - Edit file: `/_pages/cv.md`
   - Replace placeholder text with your information

3. **Update the date**:
   - Change "Last updated" date in the download section

4. **Test locally**:
   ```bash
   bundle exec jekyll serve
   # Visit: http://localhost:4000/cv/
   ```

---

## Uploading Your PDF

### Step 1: Prepare Your PDF

Create or export your CV as a PDF with:
- **Professional formatting**
- **Clear, readable fonts**
- **Optimized file size** (aim for under 2MB)
- **Appropriate personal information** (remember it will be public)

### Step 2: Add to Repository

```bash
# Place your PDF in the assets/files directory
cp /path/to/your/cv.pdf /Users/ybang_mac/Development/blog/assets/files/cv.pdf

# Commit and push
git add assets/files/cv.pdf
git commit -m "Add CV PDF"
git push
```

### Step 3: Update Last Modified Date

Edit `/_pages/cv.md` and find this line:

```html
<p class="cv-download-hint">Last updated: <time datetime="2024-01-01">January 2024</time></p>
```

Change both the `datetime` attribute and the display text:

```html
<p class="cv-download-hint">Last updated: <time datetime="2024-03-15">March 2024</time></p>
```

---

## Customizing Content

### File Location
**`/_pages/cv.md`** - This is the main CV page file

### Front Matter
Keep this section at the top of the file:

```yaml
---
layout: page
title: Curriculum Vitae           # Change if desired (e.g., "Resume", "CV")
permalink: /cv/                   # URL path - keep as is
description: Professional background, experience, and qualifications.
---
```

### Professional Summary

Replace this section with your own summary:

```html
<section class="cv-section">
  <h2 class="cv-section-title">Professional Summary</h2>
  <div class="cv-section-content">
    <p>
      Your 2-4 sentence professional summary here. Highlight your key strengths,
      years of experience, primary expertise, and what makes you unique.
    </p>
  </div>
</section>
```

**Example:**
```html
<p>
  Experienced software engineer with 8+ years in full-stack development,
  specializing in cloud-native applications and distributed systems.
  Proven track record leading cross-functional teams and delivering
  scalable solutions that improve user experience and business outcomes.
</p>
```

### Experience Section

Each job should follow this structure:

```html
<div class="cv-item">
  <div class="cv-item-header">
    <div class="cv-item-title-group">
      <h3 class="cv-item-title">Senior Software Engineer</h3>
      <p class="cv-item-company">Tech Company Inc.</p>
    </div>
    <div class="cv-item-meta">
      <span class="cv-item-location">San Francisco, CA</span>
      <span class="cv-item-date">Jan 2020 - Present</span>
    </div>
  </div>
  <div class="cv-item-content">
    <ul>
      <li>Led development of microservices architecture serving 1M+ users</li>
      <li>Reduced API response time by 40% through optimization</li>
      <li>Mentored team of 5 junior developers</li>
    </ul>
  </div>
</div>
```

**Tips:**
- Use **action verbs** (Led, Developed, Implemented, Achieved)
- Include **quantifiable results** (percentages, numbers, metrics)
- Keep bullets **concise** (1-2 lines max)
- List **most recent first**

### Education Section

```html
<div class="cv-item">
  <div class="cv-item-header">
    <div class="cv-item-title-group">
      <h3 class="cv-item-title">Master of Science in Computer Science</h3>
      <p class="cv-item-company">Stanford University</p>
    </div>
    <div class="cv-item-meta">
      <span class="cv-item-location">Stanford, CA</span>
      <span class="cv-item-date">2016 - 2018</span>
    </div>
  </div>
  <div class="cv-item-content">
    <p>Thesis: "Machine Learning Approaches to Natural Language Processing"</p>
    <p>GPA: 3.9/4.0 • Dean's List • Research Assistant</p>
  </div>
</div>
```

### Skills Section

The skills grid uses two columns on desktop:

```html
<div class="cv-skills-grid">
  <div class="cv-skill-category">
    <h4 class="cv-skill-category-title">Technical Skills</h4>
    <ul class="cv-skill-list">
      <li>Programming Languages: Python, JavaScript, Java, Go</li>
      <li>Frameworks: React, Node.js, Django, FastAPI</li>
      <li>Cloud: AWS (EC2, S3, Lambda), Google Cloud, Azure</li>
      <li>Databases: PostgreSQL, MongoDB, Redis</li>
      <li>DevOps: Docker, Kubernetes, CI/CD, Terraform</li>
    </ul>
  </div>

  <div class="cv-skill-category">
    <h4 class="cv-skill-category-title">Professional Skills</h4>
    <ul class="cv-skill-list">
      <li>Agile/Scrum methodologies</li>
      <li>Technical leadership & mentoring</li>
      <li>System design & architecture</li>
      <li>Code review & quality assurance</li>
      <li>Cross-functional collaboration</li>
    </ul>
  </div>
</div>
```

### Optional Sections

**To remove a section**: Simply delete the entire `<section class="cv-section">...</section>` block.

**To add a section**: Copy an existing section structure and modify:

```html
<section class="cv-section">
  <h2 class="cv-section-title">Projects</h2>
  <div class="cv-section-content">
    <!-- Your content here -->
  </div>
</section>
```

---

## Styling Options

### Changing Section Colors

Edit `/_sass/_components.scss` to customize colors:

```scss
// Change section title color
.cv-section-title {
  color: $color-primary;        // Change this variable
  border-bottom: 3px solid $color-primary;
}

// Change item left border color
.cv-item {
  border-left: 4px solid $color-primary;
}
```

### Adjusting Spacing

```scss
// Reduce spacing between sections
.cv-section {
  margin-bottom: $spacing-2xl;  // Change from $spacing-3xl
}

// Increase padding in items
.cv-item {
  padding: $spacing-xl;         // Change from $spacing-lg
}
```

### Custom Download Button Style

```scss
.btn-download {
  // Change button color
  background-color: #059669;    // Green
  border-color: #059669;

  // Change button size
  padding: $spacing-lg $spacing-2xl;
  font-size: $font-size-h5;

  // Add custom shadow
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
}
```

---

## Advanced Features

### Multiple CV Versions

To offer multiple CV downloads (e.g., different languages):

1. **Add additional PDF files**:
   ```
   /assets/files/
   ├── cv.pdf              # English version
   ├── cv-spanish.pdf      # Spanish version
   ├── cv-academic.pdf     # Academic version
   └── cv-1page.pdf        # Condensed version
   ```

2. **Add buttons in `/_pages/cv.md`**:

```html
<div class="cv-download-section">
  <!-- Primary button -->
  <a href="/assets/files/cv.pdf" class="btn btn-primary btn-download" download>
    <svg class="download-icon"><!-- icon code --></svg>
    Download CV (English)
  </a>

  <!-- Secondary button -->
  <a href="/assets/files/cv-spanish.pdf" class="btn btn-secondary btn-download" download>
    Download CV (Español)
  </a>

  <p class="cv-download-hint">Last updated: <time datetime="2024-03-15">March 2024</time></p>
</div>
```

### Inline PDF Viewer

To display the PDF on the page (in addition to download button):

Add after the download section in `/_pages/cv.md`:

```html
<section class="cv-section">
  <h2 class="cv-section-title">Preview</h2>
  <div class="cv-section-content">
    <div class="embed-responsive" style="padding-top: 141.4%;">
      <iframe
        src="/assets/files/cv.pdf"
        frameborder="0"
        allowfullscreen>
        Your browser doesn't support PDF viewing. Please use the download button above.
      </iframe>
    </div>
  </div>
</section>
```

**Note**: This works best on desktop; mobile devices may not display PDFs inline.

### Social Links Integration

Add social/professional links at the bottom:

```html
<section class="cv-section">
  <h2 class="cv-section-title">Online Presence</h2>
  <div class="cv-section-content">
    <ul class="social-icons">
      <li>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" aria-label="LinkedIn">
          <svg><!-- LinkedIn icon --></svg>
        </a>
      </li>
      <li>
        <a href="https://github.com/yourusername" target="_blank" aria-label="GitHub">
          <svg><!-- GitHub icon --></svg>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/yourusername" target="_blank" aria-label="Twitter">
          <svg><!-- Twitter icon --></svg>
        </a>
      </li>
    </ul>
  </div>
</section>
```

### Dynamic Last Updated Date

Use JavaScript to auto-update based on file modification:

```html
<script>
document.addEventListener('DOMContentLoaded', function() {
  fetch('/assets/files/cv.pdf', { method: 'HEAD' })
    .then(response => {
      const lastModified = response.headers.get('Last-Modified');
      if (lastModified) {
        const date = new Date(lastModified);
        document.querySelector('.cv-download-hint time').textContent =
          date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      }
    });
});
</script>
```

---

## Mobile Optimization

The CV page is fully responsive and adapts to mobile devices automatically.

### What Changes on Mobile:

- **Two-column layouts** → Single column
- **Side-by-side headers** → Stacked vertically
- **Skills grid** → Single column
- **Font sizes** → Slightly smaller
- **Spacing** → Reduced padding

### Testing Mobile View

```bash
# Start local server
bundle exec jekyll serve

# Open in browser and test:
# - Resize browser window
# - Use browser DevTools (F12) → Toggle device toolbar
# - Test on actual mobile device
```

### Mobile-Specific Adjustments

If you need custom mobile styles, add to `/_sass/_components.scss`:

```scss
@media (max-width: $breakpoint-sm) {
  .cv-item-title {
    font-size: $font-size-h5;  // Smaller on mobile
  }

  .cv-download-section {
    padding: $spacing-md;      // Less padding on mobile
  }
}
```

---

## Print Optimization

The CV page includes print-optimized styles so visitors can print directly from the browser.

### Print Features

When printed (Ctrl+P / Cmd+P):
- ✅ Navigation and footer are hidden
- ✅ Download buttons are hidden
- ✅ Colors adjusted for printing
- ✅ Page breaks avoid splitting sections
- ✅ Link URLs shown in parentheses

### Testing Print Layout

1. **Browser print preview**:
   - Open `/cv/` page
   - Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
   - Review print preview

2. **Print to PDF**:
   - Use browser's "Save as PDF" option
   - Check formatting and layout

### Custom Print Styles

Add to the print media query in `/_sass/_components.scss`:

```scss
@media print {
  // Remove emoji icons
  .cv-item-location::before,
  .cv-item-date::before {
    content: "" !important;
  }

  // Adjust font sizes for print
  body {
    font-size: 11pt;
  }

  .cv-section-title {
    font-size: 16pt;
  }
}
```

---

## Troubleshooting

### Download Button Shows 404

**Problem**: Clicking download shows "File not found"

**Solution**:
1. Verify file exists: `/assets/files/cv.pdf`
2. Check filename is lowercase: `cv.pdf` not `CV.pdf`
3. Ensure file is committed and pushed to GitHub
4. Wait 1-2 minutes for GitHub Pages to rebuild

```bash
# Verify file exists
ls -la assets/files/

# Should show: cv.pdf
```

### PDF Won't Open

**Problem**: Downloaded PDF is corrupted or won't open

**Solution**:
1. Verify original PDF opens correctly
2. Check file size (should match original)
3. Re-export PDF from source application
4. Try a different PDF export tool
5. Use PDF validator: https://www.pdf-online.com/osa/validate.aspx

### Styles Not Applying

**Problem**: CV page looks unstyled or formatting is broken

**Solution**:
1. Check for Sass compilation errors:
   ```bash
   bundle exec jekyll build --verbose
   ```
2. Verify `/_sass/_components.scss` saved correctly
3. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
4. Check browser console for CSS errors (F12 → Console)

### Mobile Layout Broken

**Problem**: Layout doesn't respond properly on mobile

**Solution**:
1. Verify viewport meta tag in `/_includes/head.html`:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```
2. Test responsive breakpoints in browser DevTools
3. Check for conflicting custom CSS
4. Validate HTML structure (no unclosed tags)

### Navigation Link Not Working

**Problem**: CV link in navigation doesn't work or shows 404

**Solution**:
1. Verify permalink in `/_pages/cv.md`:
   ```yaml
   permalink: /cv/
   ```
2. Check navigation URL in `/_data/navigation.yml`:
   ```yaml
   - title: CV
     url: /cv/
   ```
3. Ensure both paths match exactly (including trailing slash)
4. Rebuild site and test locally

### Content Not Updating

**Problem**: Changes to CV content don't appear on site

**Solution**:
1. **Local development**:
   ```bash
   # Stop server (Ctrl+C)
   bundle exec jekyll clean
   bundle exec jekyll serve
   ```

2. **GitHub Pages**:
   ```bash
   git add _pages/cv.md
   git commit -m "Update CV content"
   git push
   # Wait 1-2 minutes for deployment
   ```

3. Clear browser cache
4. Try incognito/private browsing window

---

## Tips & Best Practices

### Content Writing

✅ **Do:**
- Use action verbs (Led, Developed, Achieved)
- Include quantifiable results (30% improvement, $2M savings)
- Keep bullets concise (1-2 lines)
- Prioritize recent and relevant experience
- Proofread carefully

❌ **Don't:**
- Use first person ("I developed..." → "Developed...")
- Include outdated or irrelevant experience
- Exceed reasonable length (2-3 pages max for web)
- Include sensitive personal information
- Use unprofessional language

### PDF Best Practices

✅ **Do:**
- Keep file size under 2MB
- Use standard, readable fonts
- Ensure high contrast for readability
- Test on multiple devices
- Include your name in the filename for downloads

❌ **Don't:**
- Use password protection (prevents browser preview)
- Include fillable form fields
- Use exotic fonts (may not render correctly)
- Exceed 5MB file size
- Forget to remove personal metadata

### Accessibility

✅ **Ensure:**
- Proper heading hierarchy (h2 → h3 → h4)
- Sufficient color contrast (WCAG AA compliant)
- Descriptive link text
- Alt text for images (if any)
- Keyboard navigation works
- Screen reader compatibility

Test with:
- Browser accessibility inspector
- WAVE accessibility tool: https://wave.webaim.org/
- Screen reader (NVDA, JAWS, or VoiceOver)

---

## Next Steps

1. **Customize your CV page** with your actual information
2. **Upload your PDF CV** to `/assets/files/cv.pdf`
3. **Update the last modified date**
4. **Test locally** before deploying
5. **Commit and push** to GitHub
6. **Share your CV page** URL: `https://yourusername.github.io/cv/`

---

## Getting Help

- **Jekyll Documentation**: https://jekyllrb.com/docs/
- **GitHub Pages Docs**: https://docs.github.com/pages
- **Sass Documentation**: https://sass-lang.com/documentation
- **Accessibility Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

For issues specific to this blog setup, check the agent guides in `/.agents/` directory.

---

**Last updated**: November 2024
