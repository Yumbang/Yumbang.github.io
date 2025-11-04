# Tag System Code Examples

## Post Front Matter Examples

### Basic Tags
```yaml
---
layout: post
title: "Getting Started with Jekyll"
date: 2025-11-03
tags: [Jekyll, Tutorial, Beginner]
---
```

### Multiple Tags (YAML List)
```yaml
---
layout: post
title: "Advanced CSS Grid Techniques"
date: 2025-11-03
tags:
  - CSS
  - Grid Layout
  - Web Design
  - Tutorial
  - Advanced
---
```

### Tags with Other Metadata
```yaml
---
layout: post
title: "Building a REST API with Ruby"
date: 2025-11-03
author: "John Doe"
categories: [Programming, Backend]
tags: [Ruby, API, REST, Tutorial]
math: false
---
```

## Using the Tag Component

### Basic Usage
```liquid
<!-- Show all tags for a post -->
{% include tag-list.html tags=page.tags %}
```

**Result**:
```html
<div class="tag-list" role="list" aria-label="Post tags">
  <a href="/tags/jekyll/" class="tag">#Jekyll</a>
  <a href="/tags/tutorial/" class="tag">#Tutorial</a>
  <a href="/tags/beginner/" class="tag">#Beginner</a>
</div>
```

### Compact Mode
```liquid
<!-- Compact spacing for cards -->
{% include tag-list.html tags=post.tags compact=true %}
```

**Result**:
```html
<div class="tag-list tag-list-compact" role="list" aria-label="Post tags">
  <a href="/tags/jekyll/" class="tag">#Jekyll</a>
  <a href="/tags/tutorial/" class="tag">#Tutorial</a>
  <a href="/tags/beginner/" class="tag">#Beginner</a>
</div>
```

### With Tag Limit
```liquid
<!-- Show only first 3 tags -->
{% include tag-list.html tags=post.tags limit=3 %}
```

**Result** (when post has 5 tags):
```html
<div class="tag-list" role="list" aria-label="Post tags">
  <a href="/tags/jekyll/" class="tag">#Jekyll</a>
  <a href="/tags/tutorial/" class="tag">#Tutorial</a>
  <a href="/tags/beginner/" class="tag">#Beginner</a>
  <span class="tag-more" aria-label="Additional tags available">+2 more</span>
</div>
```

### With Label
```liquid
<!-- Show "Tags:" label before tags -->
{% include tag-list.html tags=post.tags show_label=true %}
```

**Result**:
```html
<div class="tag-list" role="list" aria-label="Post tags">
  <span class="tag-list-label">Tags:</span>
  <a href="/tags/jekyll/" class="tag">#Jekyll</a>
  <a href="/tags/tutorial/" class="tag">#Tutorial</a>
  <a href="/tags/beginner/" class="tag">#Beginner</a>
</div>
```

### Highlighting Current Tag
```liquid
<!-- On a tag page, highlight the current tag -->
{% include tag-list.html tags=post.tags current_tag="Jekyll" %}
```

**Result**:
```html
<div class="tag-list" role="list" aria-label="Post tags">
  <a href="/tags/jekyll/" class="tag tag-active">#Jekyll</a>
  <a href="/tags/tutorial/" class="tag">#Tutorial</a>
  <a href="/tags/beginner/" class="tag">#Beginner</a>
</div>
```

### Combined Parameters
```liquid
<!-- Compact, limited, with current tag highlighted -->
{% include tag-list.html
   tags=post.tags
   compact=true
   limit=5
   current_tag=page.title %}
```

## Custom Layouts

### Creating a Custom Post Card with Tags
```liquid
<!-- _includes/my-custom-card.html -->
<article class="my-card">
  <h2>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  </h2>

  <p class="date">{{ post.date | date: "%B %-d, %Y" }}</p>

  <!-- Add tags here -->
  {% if post.tags.size > 0 %}
    {% include tag-list.html tags=post.tags compact=true limit=4 %}
  {% endif %}

  <div class="excerpt">
    {{ post.excerpt }}
  </div>
</article>
```

### Custom Page Listing Posts by Multiple Tags
```liquid
<!-- _pages/web-development.md -->
---
layout: page
title: "Web Development Posts"
---

{% assign web_tags = "CSS,JavaScript,HTML,Web Design" | split: "," %}

{% for post in site.posts %}
  {% assign has_web_tag = false %}

  {% for tag in post.tags %}
    {% if web_tags contains tag %}
      {% assign has_web_tag = true %}
      {% break %}
    {% endif %}
  {% endfor %}

  {% if has_web_tag %}
    <article>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {% include tag-list.html tags=post.tags compact=true %}
    </article>
  {% endif %}
{% endfor %}
```

## CSS Customization Examples

### Change Tag Colors (Pink Theme)
```scss
// _sass/_components.scss

.tag {
  color: #ec4899; // Pink-500
  background-color: rgba(236, 72, 153, 0.1); // Pink with 10% opacity
  border: 1px solid rgba(236, 72, 153, 0.2); // Pink with 20% opacity

  &:hover {
    background-color: rgba(236, 72, 153, 0.2);
    border-color: #ec4899;
    color: #db2777; // Pink-600
  }

  &.tag-active {
    background-color: #ec4899;
    border-color: #ec4899;
    color: white;

    &:hover {
      background-color: #db2777;
      border-color: #db2777;
    }
  }
}

.tag-with-count .tag-count {
  background-color: #ec4899;

  &:hover {
    background-color: #db2777;
  }
}
```

### Make Tags Pill-Shaped (Fully Rounded)
```scss
// _sass/_components.scss

.tag {
  border-radius: 999px; // Fully rounded ends
  padding: $spacing-xs $spacing-lg; // More horizontal padding
}

.tag-with-count {
  border-radius: 999px;
}
```

### Square Tags (No Rounding)
```scss
// _sass/_components.scss

.tag {
  border-radius: 0; // Square corners
}

.tag-with-count {
  border-radius: 0;
}
```

### Larger Tags
```scss
// _sass/_components.scss

.tag {
  font-size: $font-size-base; // 16px instead of 14px
  padding: $spacing-sm $spacing-lg; // More padding
}
```

### Remove Hashtag Icon
```scss
// _sass/_components.scss

.tag {
  // Comment out or remove the ::before
  // &::before {
  //   content: "#";
  //   font-weight: $font-weight-semibold;
  //   opacity: 0.7;
  // }
}

.tag-with-count .tag-name {
  // Comment out or remove the ::before
  // &::before {
  //   content: "#";
  //   font-weight: $font-weight-semibold;
  //   opacity: 0.7;
  //   margin-right: 0.125rem;
  // }
}
```

### Custom Icon Instead of Hashtag
```scss
// _sass/_components.scss

.tag {
  &::before {
    content: "🏷️"; // Tag emoji
    // or
    content: "⚡"; // Lightning emoji
    // or
    content: "▸"; // Triangle
    // or
    content: "•"; // Bullet
    margin-right: 0.25rem;
  }
}
```

### Gradient Background Tags
```scss
// _sass/_components.scss

.tag {
  background: linear-gradient(135deg,
    rgba($color-primary, 0.1) 0%,
    rgba($color-primary-light, 0.1) 100%);
  border: 1px solid rgba($color-primary, 0.2);

  &:hover {
    background: linear-gradient(135deg,
      rgba($color-primary, 0.2) 0%,
      rgba($color-primary-light, 0.2) 100%);
  }
}
```

## JavaScript Enhancements (Optional)

### Tag Filtering (Client-Side)
```html
<!-- _pages/tags.md -->
<input type="text" id="tag-search" placeholder="Search tags...">

<div id="tags-container">
  {% for tag in sorted_tags %}
    <a href="..." class="tag-with-count" data-tag="{{ tag[0] | downcase }}">
      <span class="tag-name">{{ tag[0] }}</span>
      <span class="tag-count">{{ tag[1].size }}</span>
    </a>
  {% endfor %}
</div>

<script>
document.getElementById('tag-search').addEventListener('input', function(e) {
  const search = e.target.value.toLowerCase();
  const tags = document.querySelectorAll('.tag-with-count');

  tags.forEach(tag => {
    const tagName = tag.dataset.tag;
    tag.style.display = tagName.includes(search) ? '' : 'none';
  });
});
</script>
```

### Copy Tag Link on Click
```javascript
// assets/js/tags.js

document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', function(e) {
    if (e.shiftKey) { // Hold Shift to copy instead of navigate
      e.preventDefault();
      const url = this.href;
      navigator.clipboard.writeText(url);

      // Show feedback
      const original = this.textContent;
      this.textContent = 'Copied!';
      setTimeout(() => {
        this.textContent = original;
      }, 1000);
    }
  });
});
```

### Animated Tag Entrance
```scss
// _sass/_components.scss

@keyframes tagFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tag {
  animation: tagFadeIn 0.3s ease-out;
  animation-fill-mode: backwards;

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.05}s;
    }
  }
}
```

## Advanced Liquid Logic

### Show Popular Tags Only
```liquid
<!-- Show only tags with 5+ posts -->
{% for tag in site.tags %}
  {% if tag[1].size >= 5 %}
    <a href="/tags/{{ tag[0] | slugify }}/" class="tag">
      #{{ tag[0] }} ({{ tag[1].size }})
    </a>
  {% endif %}
{% endfor %}
```

### Group Tags by First Letter
```liquid
{% assign tags_by_letter = site.tags | group_by_exp: "tag", "tag[0] | slice: 0 | upcase" %}

{% for group in tags_by_letter %}
  <h3>{{ group.name }}</h3>
  <div class="tags-group">
    {% for tag in group.items %}
      <a href="/tags/{{ tag[0] | slugify }}/" class="tag-with-count">
        <span class="tag-name">{{ tag[0] }}</span>
        <span class="tag-count">{{ tag[1].size }}</span>
      </a>
    {% endfor %}
  </div>
{% endfor %}
```

### Related Tags (Tags that Often Appear Together)
```liquid
<!-- On a tag page, show related tags -->
{% assign current_tag = page.title %}
{% assign related_tags = "" | split: "" %}

{% for post in page.posts %}
  {% for tag in post.tags %}
    {% if tag != current_tag %}
      {% unless related_tags contains tag %}
        {% assign related_tags = related_tags | push: tag %}
      {% endunless %}
    {% endif %}
  {% endfor %}
{% endfor %}

{% if related_tags.size > 0 %}
<div class="related-tags">
  <h3>Related Tags</h3>
  {% for tag in related_tags limit: 5 %}
    <a href="/tags/{{ tag | slugify }}/" class="tag">#{{ tag }}</a>
  {% endfor %}
</div>
{% endif %}
```

### Tag Statistics
```liquid
<!-- Calculate tag statistics -->
{% assign total_tags = site.tags.size %}
{% assign total_posts = site.posts.size %}
{% assign avg_tags_per_post = 0 %}

{% for post in site.posts %}
  {% assign avg_tags_per_post = avg_tags_per_post | plus: post.tags.size %}
{% endfor %}
{% assign avg_tags_per_post = avg_tags_per_post | divided_by: total_posts %}

<div class="tag-stats">
  <p>Total tags: {{ total_tags }}</p>
  <p>Total posts: {{ total_posts }}</p>
  <p>Average tags per post: {{ avg_tags_per_post }}</p>
</div>
```

## Layout Variations

### Sidebar Widget with Popular Tags
```liquid
<!-- _includes/popular-tags-widget.html -->
<aside class="widget popular-tags">
  <h3>Popular Tags</h3>

  {% assign sorted_tags = site.tags | sort: "size" | reverse %}

  <div class="tag-list">
    {% for tag in sorted_tags limit: 10 %}
      <a href="/tags/{{ tag[0] | slugify }}/" class="tag">
        #{{ tag[0] }}
      </a>
    {% endfor %}
  </div>
</aside>
```

### Footer Tag Cloud
```liquid
<!-- _includes/footer.html -->
<footer class="site-footer">
  <!-- Other footer content -->

  <div class="footer-tags">
    <h4>Explore Topics</h4>
    <div class="tag-cloud">
      {% for tag in site.tags limit: 20 %}
        {% assign size = tag[1].size %}
        {% if size <= 3 %}
          {% assign size_class = "tag-size-1" %}
        {% elsif size <= 7 %}
          {% assign size_class = "tag-size-2" %}
        {% elsif size <= 12 %}
          {% assign size_class = "tag-size-3" %}
        {% else %}
          {% assign size_class = "tag-size-4" %}
        {% endif %}

        <a href="/tags/{{ tag[0] | slugify }}/"
           class="tag-cloud-item {{ size_class }}">
          #{{ tag[0] }}
        </a>
      {% endfor %}
    </div>
  </div>
</footer>
```

### Archive Page with Tag Filter
```liquid
<!-- _pages/archive.md -->
---
layout: page
title: Archive
---

<div class="archive-filters">
  <button class="filter-btn active" data-filter="all">All</button>
  {% for tag in site.tags limit: 10 %}
    <button class="filter-btn" data-filter="{{ tag[0] | slugify }}">
      {{ tag[0] }}
    </button>
  {% endfor %}
</div>

<div class="archive-posts">
  {% for post in site.posts %}
    <article class="archive-post"
             data-tags="{{ post.tags | join: ' ' | slugify }}">
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <p class="date">{{ post.date | date: "%B %-d, %Y" }}</p>
      {% include tag-list.html tags=post.tags compact=true %}
    </article>
  {% endfor %}
</div>

<script>
// Simple filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const filter = this.dataset.filter;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b =>
      b.classList.remove('active'));
    this.classList.add('active');

    // Filter posts
    document.querySelectorAll('.archive-post').forEach(post => {
      const tags = post.dataset.tags;
      if (filter === 'all' || tags.includes(filter)) {
        post.style.display = '';
      } else {
        post.style.display = 'none';
      }
    });
  });
});
</script>
```

## Testing Snippets

### Test Tag Display
```liquid
<!-- Add to any page to test tag rendering -->
<div style="padding: 2rem; border: 1px solid #ccc;">
  <h3>Tag Display Test</h3>

  {% assign test_tags = "Jekyll,Tutorial,CSS,Design,Ruby,Git,API,Testing,DevOps,Blog" | split: "," %}

  <h4>Standard</h4>
  {% include tag-list.html tags=test_tags %}

  <h4>Compact</h4>
  {% include tag-list.html tags=test_tags compact=true %}

  <h4>With Limit (3)</h4>
  {% include tag-list.html tags=test_tags limit=3 %}

  <h4>With Label</h4>
  {% include tag-list.html tags=test_tags show_label=true %}

  <h4>With Active Tag</h4>
  {% include tag-list.html tags=test_tags current_tag="Jekyll" %}
</div>
```

### Debug Tag Data
```liquid
<!-- Show all tag information for debugging -->
<pre style="background: #f5f5f5; padding: 1rem; overflow: auto;">
Total tags: {{ site.tags.size }}

{% for tag in site.tags %}
Tag: {{ tag[0] }}
Posts: {{ tag[1].size }}
Slug: {{ tag[0] | slugify }}
---
{% endfor %}
</pre>
```

---

These examples show the flexibility and power of the tag system. Mix and match these snippets to create custom tag displays that fit your specific needs.
