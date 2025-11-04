# Tag and Category System Documentation

## Overview

Your Jekyll blog now has a fully functional tag and category system using the **jekyll-archives** plugin. This system automatically generates individual archive pages for each tag and category, with clean URLs and SEO-friendly structure.

## How It Works

### Automatic Page Generation

When you add tags or categories to a post's front matter, jekyll-archives automatically creates:

1. **Individual tag pages** at `/tags/tag-name/` (e.g., `/tags/jekyll/`, `/tags/tutorial/`)
2. **Individual category pages** at `/categories/category-name/` (e.g., `/categories/blogging/`)
3. **Index pages** at `/tags/` and `/categories/` showing all tags/categories

### URL Structure

- Tags index: `https://yoursite.com/tags/`
- Individual tag: `https://yoursite.com/tags/ruby/`
- Categories index: `https://yoursite.com/categories/`
- Individual category: `https://yoursite.com/categories/tutorial/`

All URLs are automatically slugified (lowercased, spaces replaced with hyphens).

## Adding Tags to Posts

### Basic Usage

In your post's front matter (the section between `---` at the top), add tags like this:

```yaml
---
layout: post
title: "Your Post Title"
date: 2025-11-03
tags: [ruby, programming, tutorial]
categories: [blogging, tutorials]
---
```

### Tag Naming Conventions

**Best Practices:**

1. **Use lowercase** - Tags are automatically slugified, so "Ruby" and "ruby" become the same tag
2. **Be consistent** - Decide on naming conventions early:
   - Single word: `jekyll`, `ruby`, `tutorial`
   - Multi-word with hyphen: `getting-started`, `web-development`
   - Multi-word with space: `Machine Learning` (becomes `machine-learning`)
3. **Be specific but not too narrow** - Aim for 3-10 uses per tag
4. **Limit tags per post** - 3-7 tags is ideal
5. **Avoid redundancy** - Don't use both "Ruby" category and "ruby" tag for the same content

### Tags vs Categories

**Tags:**
- Specific topics or keywords
- Can have many tags per post
- Example: `jekyll`, `markdown`, `tutorial`, `liquid`

**Categories:**
- Broad content groupings
- Usually 1-2 categories per post
- Example: `programming`, `tutorials`, `projects`

### Examples

#### Technical Tutorial Post
```yaml
---
title: "Building a REST API with Ruby on Rails"
tags: [ruby, rails, api, rest, backend]
categories: [programming, tutorials]
---
```

#### Blog Post
```yaml
---
title: "My Journey Learning Jekyll"
tags: [jekyll, blogging, static-sites, github-pages]
categories: [blogging, personal]
---
```

#### Math/Academic Post
```yaml
---
title: "Understanding Linear Algebra Basics"
tags: [mathematics, linear-algebra, vectors, matrices]
categories: [mathematics, education]
math: true
---
```

## Configuration

### Current Setup

The tag system is configured in `_config.yml`:

```yaml
jekyll-archives:
  enabled:
    - tags
    - categories
  layouts:
    tag: tag        # Uses _layouts/tag.html
    category: category  # Uses _layouts/category.html
  permalinks:
    tag: '/tags/:name/'
    category: '/categories/:name/'
  slugify:
    mode: 'pretty'  # Clean URLs
    cased: false    # Lowercase
```

### Customization Options

If you want to change how tags are displayed, you can modify:

1. **Layouts:**
   - `/Users/ybang_mac/Development/blog/_layouts/tag.html` - Individual tag page
   - `/Users/ybang_mac/Development/blog/_layouts/category.html` - Individual category page

2. **Index Pages:**
   - `/Users/ybang_mac/Development/blog/tags.md` - All tags overview
   - `/Users/ybang_mac/Development/blog/categories.md` - All categories overview

3. **Navigation:**
   - Tags and Categories links are in `_data/navigation.yml`

## Features

### Tag Cloud on Pages

The main tag index (`/tags/`) includes:

1. **Visual tag cloud** - Clickable tag bubbles with post counts
2. **Complete tag list** - All tags with their posts grouped together

### Category Cards

The category index (`/categories/`) shows:

1. **Card grid** - Visual cards for each category
2. **Post counts** - Number of posts per category
3. **Complete category list** - All categories with grouped posts

### Post Display

On individual posts:
- Tags appear as clickable pills/buttons
- Categories appear in the post metadata
- Both link to their respective archive pages

## Building and Testing

### Local Development

1. **Install dependencies** (if not already done):
   ```bash
   bundle install
   ```

2. **Build the site**:
   ```bash
   bundle exec jekyll build
   ```

3. **Serve locally**:
   ```bash
   bundle exec jekyll serve
   ```

4. **View in browser**:
   ```
   http://localhost:4000/tags/
   http://localhost:4000/categories/
   ```

### Deployment

The tag system works with your GitHub Actions deployment:

1. Add tags to your posts
2. Commit and push to GitHub
3. GitHub Actions automatically builds and deploys
4. Tag pages are generated during the build process

## Common Tasks

### Renaming a Tag

If you want to rename a tag across all posts:

1. Use find and replace in your editor:
   ```
   Find: tags: [old-name,
   Replace: tags: [new-name,
   ```

2. Or manually update each post's front matter

3. The tag pages will automatically update on next build

### Deleting a Tag

1. Remove the tag from all post front matter
2. Rebuild the site
3. The tag page will automatically disappear

### Finding All Posts with a Tag

#### Method 1: Use the tag page
Visit `/tags/your-tag/` on your site

#### Method 2: Search front matter
```bash
grep -r "tags:.*your-tag" _posts/
```

### Viewing All Tags

#### In your site:
Visit `/tags/` to see all tags

#### In terminal:
```bash
grep -h "^tags:" _posts/*.md | sort | uniq
```

## Troubleshooting

### Tags Not Appearing

**Check:**
1. Is `jekyll-archives` in your `Gemfile`?
2. Is it listed in `_config.yml` plugins?
3. Did you run `bundle install`?
4. Are tags in the post's front matter formatted correctly?

**Solution:**
```bash
bundle install
bundle exec jekyll clean
bundle exec jekyll build
```

### Tag Pages Not Generating

**Check:**
1. Tag layout exists at `_layouts/tag.html`
2. `_config.yml` has correct `jekyll-archives` configuration
3. Build logs for errors

### Wrong URL Format

**Check `_config.yml`:**
```yaml
jekyll-archives:
  permalinks:
    tag: '/tags/:name/'  # Ensure leading and trailing slashes
```

### Duplicate Tag Pages

**Issue:** Multiple tags.md files

**Solution:** Keep only ONE of:
- `/tags.md` (root directory) ✓ Recommended
- `/_pages/tags.md`

### Build Errors

**If you see "Nesting too deep":**
- Check for circular includes
- Ensure no Liquid syntax in HTML comments
- Review include files for recursion

**If you see "Liquid Exception":**
- Check for syntax errors in layouts
- Verify all Liquid tags are properly closed
- Check front matter YAML is valid

## Performance

### Build Time

- Tag pages are generated during `jekyll build`
- Build time increases slightly with many tags (usually negligible)
- Typical impact: +0.1-0.5 seconds for 20-50 tags

### Optimization

To keep builds fast:

1. **Limit tags** - 50-100 unique tags is reasonable
2. **Be selective** - Don't over-tag posts
3. **Use categories** - Use broader categories instead of too many specific tags

## GitHub Pages Compatibility

### Important Note

The jekyll-archives plugin is **NOT** compatible with basic GitHub Pages deployment. However, your blog uses **GitHub Actions** for deployment, which allows custom plugins.

### What This Means

- ✅ Your setup works correctly
- ✅ All custom plugins are supported
- ✅ No limitations on features
- ❌ Won't work if you switch to basic GitHub Pages
- ❌ Requires GitHub Actions workflow (already configured)

### Deployment Workflow

Your `.github/workflows/deploy.yml` handles:
1. Installing Ruby and dependencies
2. Running `bundle install` (includes jekyll-archives)
3. Building the site with all plugins
4. Deploying to GitHub Pages

## SEO Benefits

The tag system provides SEO advantages:

1. **Clean URLs** - `/tags/ruby/` instead of `?tag=ruby`
2. **Dedicated pages** - Each tag gets its own indexed page
3. **Internal linking** - Posts link to tag pages, tag pages link to posts
4. **Semantic HTML** - Proper heading structure and meta tags
5. **Sitemaps** - Tag pages included in sitemap.xml

## Future Enhancements

### Optional Improvements

You can add:

1. **Tag descriptions** - Add metadata about each tag
2. **Tag colors** - Visual color coding for tag categories
3. **Related tags** - Show similar/related tags
4. **Tag analytics** - Track popular tags
5. **Tag RSS feeds** - Separate feed per tag (requires additional plugin)

### Adding Tag Metadata

Create `_data/tags.yml`:

```yaml
ruby:
  description: "Posts about the Ruby programming language"
  color: "#CC342D"

jekyll:
  description: "Jekyll static site generator tips and tutorials"
  color: "#CC0000"
```

Then reference in layouts with `site.data.tags[tag].description`

## Support

If you encounter issues:

1. Check Jekyll docs: https://jekyllrb.com/docs/
2. jekyll-archives repo: https://github.com/jekyll/jekyll-archives
3. Rebuild from clean state:
   ```bash
   bundle exec jekyll clean
   bundle exec jekyll build --verbose
   ```

## Summary

### What You Have

- ✅ Automatic tag page generation
- ✅ Automatic category page generation
- ✅ Clean, SEO-friendly URLs
- ✅ Visual tag cloud and category cards
- ✅ Tag/category links in posts
- ✅ Navigation menu integration
- ✅ GitHub Actions deployment

### How to Use

1. Add `tags: [tag1, tag2]` to post front matter
2. Add `categories: [cat1]` to post front matter
3. Commit and push to GitHub
4. Tags and categories appear automatically

### Key Files

```
blog/
├── _config.yml                  # jekyll-archives configuration
├── Gemfile                      # jekyll-archives gem
├── _layouts/
│   ├── tag.html                # Tag archive layout
│   └── category.html           # Category archive layout
├── tags.md                      # All tags index
├── categories.md                # All categories index
├── _data/
│   └── navigation.yml          # Navigation menu (includes tags/categories links)
└── _includes/
    └── tag-list.html           # Reusable tag component
```

---

**Last Updated:** November 3, 2025
**System Version:** jekyll-archives 2.3.0
