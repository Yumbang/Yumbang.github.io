# My Blog

A personal blog built with Jekyll and hosted on GitHub Pages.

## Quick Start

### Prerequisites

- Ruby (version 2.7 or higher)
- Bundler
- Git

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/username/blog.git
   cd blog
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Run the development server:
   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser to `http://localhost:4000`

### Development

- **Create a new post**: Add a file to `_posts/` with the format `YYYY-MM-DD-title.md`
- **Create a draft**: Add a file to `_drafts/` (no date needed)
- **Preview drafts**: Run `bundle exec jekyll serve --drafts`
- **Live reload**: Run `bundle exec jekyll serve --livereload`

### Project Structure

```
blog/
├── _config.yml          # Site configuration
├── Gemfile              # Ruby dependencies
├── _layouts/            # Page templates
├── _includes/           # Reusable components
├── _posts/              # Blog posts
├── _drafts/             # Draft posts
├── _data/               # Structured data (YAML/JSON)
├── _pages/              # Static pages (about, contact, etc.)
├── assets/
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript files
│   └── images/         # Image files
└── _site/              # Generated site (ignored by git)
```

## Configuration

### Site Settings

Edit `_config.yml` to customize:
- Site title, description, and author
- URL and baseurl
- Social media links
- Analytics settings

### Writing Posts

Create a new file in `_posts/` with this format:

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-11-02
categories: [category1, category2]
tags: [tag1, tag2]
---

Your content here...
```

## Deployment

This blog is configured to deploy automatically to GitHub Pages.

### Option 1: Direct GitHub Pages (Current Setup)

- Push to `main` branch
- GitHub Pages builds and deploys automatically
- Limited to GitHub-supported plugins only

### Option 2: GitHub Actions (Recommended for Custom Plugins)

See `.github/workflows/deploy.yml` for custom build configuration.

## Customization

- **Layouts**: Edit templates in `_layouts/`
- **Styles**: Modify CSS in `assets/css/`
- **Navigation**: Update `_data/navigation.yml`
- **Plugins**: Add to `Gemfile` and `_config.yml`

## Maintenance

### Update dependencies:
```bash
bundle update
```

### Check for outdated gems:
```bash
bundle outdated
```

### Clean build artifacts:
```bash
bundle exec jekyll clean
```

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Kramdown Syntax](https://kramdown.gettalong.org/syntax.html)

## License

[Your chosen license]
