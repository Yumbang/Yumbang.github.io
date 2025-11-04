source "https://rubygems.org"

# Jekyll core
gem "jekyll", "~> 4.3"

# Sass converter (using older version for Ruby 2.6 compatibility)
gem "jekyll-sass-converter", "~> 2.2"

# Required for Ruby 3.0+
gem "webrick", "~> 1.8"

# Jekyll Plugins
# Note: jekyll-archives is NOT GitHub Pages compatible in basic mode
# But it works fine with GitHub Actions deployment
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"       # RSS feed generation
  gem "jekyll-seo-tag", "~> 2.8"     # SEO meta tags
  gem "jekyll-sitemap", "~> 1.4"     # Sitemap generation
  gem "jekyll-paginate", "~> 1.1"    # Basic pagination
  gem "jekyll-archives", "~> 2.2"    # Auto-generate tag/category pages
end

# Performance and Development
gem "kramdown-parser-gfm", "~> 1.1"  # GitHub Flavored Markdown

# Platform-specific gems
# Windows and JRuby don't include zoneinfo files
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock http_parser.rb gem to v0.6.x on JRuby
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Alternative: Use github-pages gem for maximum compatibility
# Uncomment this and comment out individual plugins above if you want
# to use the exact same versions as GitHub Pages production
# gem "github-pages", group: :jekyll_plugins
