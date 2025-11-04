# Blog Post Templates

Use these templates when creating new posts. Save them in `_posts/` with filename format: `YYYY-MM-DD-title.md`

---

## Standard Post with Comments (Default)

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-11-02 10:00:00 -0500
categories: [category1, category2]
tags: [tag1, tag2, tag3]
author: Your Name
math: false
comments: true
---

Your post content goes here...

## Section Heading

More content...
```

**Notes:**
- `comments: true` is the default (you can omit this line)
- `math: false` is default for regular posts
- Categories and tags are optional

---

## Math Post with Comments

```markdown
---
layout: post
title: "Mathematical Proof of X"
date: 2025-11-02 10:00:00 -0500
categories: [mathematics]
tags: [calculus, proofs]
author: Your Name
math: true
comments: true
---

Here's an equation:

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

Inline math: $f(x) = x^2$ works too.
```

**Notes:**
- Set `math: true` to enable MathJax/KaTeX rendering
- Use `$$...$$` for display equations
- Use `$...$` for inline equations

---

## Post WITHOUT Comments

```markdown
---
layout: post
title: "Announcement or Personal Note"
date: 2025-11-02 10:00:00 -0500
categories: [announcements]
tags: [site-updates]
author: Your Name
comments: false
---

This post won't show the comments section.

Use this for:
- Personal announcements
- Site updates
- Posts that don't need discussion
```

**Notes:**
- Set `comments: false` to disable comments
- Comments section will not appear at all

---

## Minimal Post Template

```markdown
---
title: "Quick Post"
date: 2025-11-02
---

Minimal post with defaults:
- layout: post (from _config.yml defaults)
- comments: true (from defaults)
- math: false (from defaults)
- author: Your Name (from defaults)
```

**Notes:**
- All defaults are applied from `_config.yml`
- This is the quickest way to create a post

---

## Complete Template (All Options)

```markdown
---
layout: post
title: "Complete Example Post"
subtitle: "Optional subtitle for SEO"
date: 2025-11-02 14:30:00 -0500
last_modified_at: 2025-11-03 10:00:00 -0500
author: Your Name
categories: [tutorials, jekyll]
tags: [blogging, markdown, github-pages]
image: /assets/images/post-cover.jpg
description: "Custom meta description for SEO (optional)"
math: true
comments: true
published: true
---

This template includes all common front matter options.

## Content

Your post content...
```

**Front Matter Options:**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `layout` | string | No | `post` | Layout template to use |
| `title` | string | Yes | - | Post title |
| `subtitle` | string | No | - | Optional subtitle |
| `date` | datetime | Yes | - | Publication date/time |
| `last_modified_at` | datetime | No | - | Last update timestamp |
| `author` | string | No | Site default | Post author |
| `categories` | list | No | `[]` | Post categories |
| `tags` | list | No | `[]` | Post tags |
| `image` | string | No | - | Featured image path |
| `description` | string | No | Excerpt | SEO meta description |
| `math` | boolean | No | `false` | Enable math rendering |
| `comments` | boolean | No | `true` | Enable comments |
| `published` | boolean | No | `true` | Publish status |
| `permalink` | string | No | Auto | Custom URL path |

---

## Draft Template

Create in `_drafts/` folder (no date in filename: `my-draft.md`):

```markdown
---
layout: post
title: "Work in Progress"
categories: [category]
tags: [tag1, tag2]
math: false
comments: true
---

Draft content here...

**TODO:**
- [ ] Finish introduction
- [ ] Add examples
- [ ] Proofread
```

**Notes:**
- Drafts don't need dates
- View drafts locally: `jekyll serve --drafts`
- Move to `_posts/` with date when ready to publish

---

## Special Post Types

### Announcement Post

```markdown
---
layout: post
title: "Site Update: New Features"
date: 2025-11-02
categories: [announcements]
tags: [site-news]
comments: false
---

Quick announcement...
```

### Tutorial Post

```markdown
---
layout: post
title: "How to Build X"
date: 2025-11-02
categories: [tutorials]
tags: [howto, programming]
comments: true
---

Step-by-step tutorial...
```

### Technical Deep Dive

```markdown
---
layout: post
title: "Understanding Algorithm X"
date: 2025-11-02
categories: [computer-science]
tags: [algorithms, complexity-theory]
math: true
comments: true
---

In-depth technical explanation with equations...
```

### Book/Article Review

```markdown
---
layout: post
title: "Review: Book Title"
date: 2025-11-02
categories: [reviews]
tags: [books, recommendations]
comments: true
---

My thoughts on this book...
```

---

## Date Format Options

Choose your preferred datetime format:

```yaml
# Full datetime with timezone
date: 2025-11-02 14:30:00 -0500

# Date only (uses midnight)
date: 2025-11-02

# ISO 8601 format
date: 2025-11-02T14:30:00-05:00

# Alternative format
date: November 2, 2025 14:30:00
```

**Recommendation:** Use `YYYY-MM-DD HH:MM:SS TZ` for consistency.

---

## Category and Tag Best Practices

### Categories (Broad Topics)

Use 1-3 categories per post:

```yaml
categories: [tutorials]
categories: [mathematics, tutorials]
categories: [computer-science, algorithms, theory]
```

**Good categories:**
- tutorials
- reviews
- announcements
- mathematics
- computer-science
- philosophy
- projects

### Tags (Specific Topics)

Use 3-10 tags per post:

```yaml
tags: [python, flask, web-development, backend, api, rest]
```

**Good tags:**
- Programming languages: python, javascript, rust
- Frameworks: react, django, rails
- Concepts: recursion, concurrency, optimization
- Tools: git, docker, vim
- Formats: markdown, json, yaml

**Tips:**
- Use lowercase
- Use hyphens for multi-word tags
- Be consistent across posts
- Don't duplicate category in tags

---

## Filename Convention

**Format:** `YYYY-MM-DD-title-with-hyphens.md`

**Examples:**
- `2025-11-02-getting-started-with-jekyll.md`
- `2025-11-15-understanding-recursion.md`
- `2025-12-01-year-in-review-2025.md`

**Rules:**
- Date must match or be earlier than `date:` in front matter
- Use lowercase letters
- Replace spaces with hyphens
- No special characters except hyphens
- Extension must be `.md` or `.markdown`

---

## Quick Create Commands

### Create a new post with current date:

```bash
# Get today's date
TODAY=$(date +%Y-%m-%d)

# Create post file
cat > _posts/${TODAY}-my-new-post.md << 'EOF'
---
title: "My New Post"
date: $(date +"%Y-%m-%d %H:%M:%S %z")
categories: [category]
tags: [tag1, tag2]
---

Post content here...
EOF
```

### Create from template:

```bash
# Copy template
cp POST_TEMPLATES.md _posts/2025-11-02-new-post.md

# Edit
nano _posts/2025-11-02-new-post.md
```

---

## Example Real Posts

### 1. Tutorial: "How to Use Giscus Comments"

**Filename:** `2025-11-02-how-to-add-comments-with-giscus.md`

```markdown
---
layout: post
title: "How to Add Comments to Your Jekyll Blog with Giscus"
date: 2025-11-02 15:00:00 -0500
categories: [tutorials, jekyll]
tags: [github-pages, comments, giscus, blogging]
author: Your Name
comments: true
---

In this tutorial, you'll learn how to add GitHub-based comments...

## What is Giscus?

Giscus is a comments system powered by GitHub Discussions...

## Setup Steps

Follow these steps...
```

### 2. Math Post: "Euler's Identity"

**Filename:** `2025-11-03-eulers-identity-explained.md`

```markdown
---
layout: post
title: "Euler's Identity: The Most Beautiful Equation"
date: 2025-11-03 10:00:00 -0500
categories: [mathematics]
tags: [number-theory, complex-numbers, euler]
math: true
comments: true
---

Euler's identity is often called the most beautiful equation in mathematics:

$$
e^{i\pi} + 1 = 0
$$

Let's explore why this is so elegant...
```

### 3. Personal Post: "Site Update"

**Filename:** `2025-11-02-site-redesign-announcement.md`

```markdown
---
layout: post
title: "Site Redesign and New Features"
date: 2025-11-02 09:00:00 -0500
categories: [announcements]
tags: [site-news, updates]
comments: false
---

I've redesigned the blog! Here's what's new...
```

---

## Testing Your Post

Before publishing:

```bash
# 1. Build site
bundle exec jekyll build

# 2. Serve locally
bundle exec jekyll serve --livereload

# 3. Visit http://localhost:4000

# 4. Check:
- Post appears on homepage
- Post title and date correct
- Content renders properly
- Math renders (if math: true)
- Comments section appears (if comments: true)
- Categories and tags work
- Links are valid
```

---

## Publishing Workflow

1. **Create post** in `_posts/` with correct date format
2. **Add front matter** using templates above
3. **Write content** in Markdown
4. **Test locally** with `jekyll serve`
5. **Commit changes:**
   ```bash
   git add _posts/YYYY-MM-DD-title.md
   git commit -m "post: add new post about X"
   git push
   ```
6. **Wait for deployment** (2-3 minutes)
7. **Verify live** on your blog
8. **Share** on social media

---

## Need Help?

- **Jekyll docs:** https://jekyllrb.com/docs/posts/
- **Markdown guide:** https://www.markdownguide.org/
- **Front matter:** https://jekyllrb.com/docs/front-matter/
- **Liquid syntax:** https://shopify.github.io/liquid/

---

**Quick reference:**
- Standard post: `comments: true` (default)
- No comments: `comments: false`
- Math post: `math: true`
- Draft: Save in `_drafts/` (no date in filename)
- Published: Set `published: false` to hide

Happy blogging!
