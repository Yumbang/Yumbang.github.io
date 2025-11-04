# CV/Resume PDF Files

This directory contains downloadable CV/Resume files for your blog visitors.

## Adding Your CV PDF

1. **Export your CV as a PDF** from your preferred tool (Word, LaTeX, Google Docs, etc.)

2. **Name the file `cv.pdf`** and place it in this directory:
   ```
   /assets/files/cv.pdf
   ```

3. The CV page at `/cv/` will automatically link to this file for download.

## File Naming Conventions

### Primary CV (Required)
- **File name**: `cv.pdf`
- **Purpose**: Default CV file that all download buttons point to
- **Recommended size**: Keep under 2MB for fast downloads

### Multiple Versions (Optional)

If you need to provide multiple CV versions (different languages, formats, or versions):

```
/assets/files/
├── cv.pdf                    # Primary/default version
├── cv-academic.pdf           # Academic CV with publications
├── cv-industry.pdf           # Industry-focused CV
├── cv-spanish.pdf            # Spanish version
├── cv-korean.pdf             # Korean version
└── resume-1page.pdf          # Condensed 1-page resume
```

To add links for alternative versions, edit `/pages/cv.md` and add buttons in the download section:

```html
<a href="/assets/files/cv-academic.pdf" class="btn btn-secondary btn-download" download>
  Download Academic Version
</a>
```

## Updating Your CV

When you update your CV:

1. Replace the `cv.pdf` file with your new version
2. Update the "Last updated" date in `/pages/cv.md`:
   ```html
   <time datetime="2024-03-15">March 2024</time>
   ```
3. Commit and push changes to GitHub
4. GitHub Pages will automatically deploy the updated file

## File Size Guidelines

- **Recommended**: 500KB - 2MB
- **Maximum**: 5MB (GitHub Pages has a 100MB repository limit)
- **Optimization tips**:
  - Use PDF compression tools if your file is too large
  - Optimize images embedded in your CV
  - Use standard fonts to reduce file size
  - Remove unnecessary metadata

## Security & Privacy

**Important considerations:**

- Your CV will be **publicly accessible** once uploaded
- Anyone with the link can download it
- Consider what personal information you include:
  - Full address (often not necessary)
  - Phone number (use a professional contact number)
  - Email (use a professional email address)
  - Social media (only professional profiles)

**Pro tip**: Create a separate "public CV" version with limited personal details for your website, and keep a detailed version for direct applications.

## Version Control

Since this is a Git repository:

- Old versions of your CV will be in Git history
- Consider using `.gitignore` if you want to exclude draft versions
- You can view previous versions with `git log` and `git checkout`

## Testing Your CV Links

After uploading, verify:

1. **Local testing**: Run `bundle exec jekyll serve` and navigate to `http://localhost:4000/cv/`
2. **Click the download button** to ensure the file downloads correctly
3. **Check file opens** properly in a PDF reader
4. **Verify mobile**: Test download on mobile devices

## Troubleshooting

### "File not found" error
- Ensure the file is named exactly `cv.pdf` (lowercase)
- Verify it's in `/assets/files/` directory
- Check that the file was committed and pushed to GitHub

### PDF won't display in browser
- Some browsers download PDFs instead of displaying them (this is normal)
- Ensure your PDF is not corrupted
- Try opening the PDF in Adobe Reader or another PDF viewer

### File too large
- Use PDF compression tools:
  - [Adobe Acrobat Compress PDF](https://www.adobe.com/acrobat/online/compress-pdf.html)
  - [Smallpdf](https://smallpdf.com/compress-pdf)
  - [iLovePDF](https://www.ilovepdf.com/compress_pdf)
- Optimize images before embedding in your CV
- Use web-optimized PDF export settings

## Alternative: Inline PDF Viewer

If you want to display the PDF directly on the page (instead of just a download button), add this to `/pages/cv.md`:

```html
<div class="cv-pdf-viewer">
  <iframe
    src="/assets/files/cv.pdf"
    width="100%"
    height="800px"
    style="border: 1px solid #e2e8f0; border-radius: 8px;">
    <p>Your browser doesn't support PDF viewing.
       <a href="/assets/files/cv.pdf" download>Download the CV instead</a>.
    </p>
  </iframe>
</div>
```

**Note**: Inline viewing doesn't work well on all mobile devices, so always keep the download button as the primary option.

## Need Help?

If you encounter issues:
1. Check the [Jekyll documentation](https://jekyllrb.com/docs/)
2. Verify your file paths are correct
3. Test locally before deploying
4. Check browser console for errors
