---
layout: page
title: Categories
permalink: /categories/
description: Browse posts by category to find content by topic area.
---

<div class="categories-grid">
  {% assign categories = site.categories | sort %}
  {% for category in categories %}
    {% assign category_name = category[0] %}
    {% assign category_posts = category[1] %}
    <div class="category-card">
      <a href="{{ site.baseurl }}/categories/{{ category_name | slugify }}/" class="category-link">
        <span class="category-name">{{ category_name }}</span>
        <span class="category-count">{{ category_posts.size }} {% if category_posts.size == 1 %}post{% else %}posts{% endif %}</span>
      </a>
    </div>
  {% endfor %}
</div>

<style>
/* Categories Grid Styling */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.category-card {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.category-card:hover {
  border-color: #2563eb;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
  transform: translateY(-2px);
}

.category-link {
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
}

.category-name {
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.category-card:hover .category-name {
  color: #2563eb;
}

.category-count {
  display: block;
  font-size: 0.875rem;
  color: #6b7280;
}

@media (max-width: 640px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .category-card {
    background-color: #1f2937;
    border-color: #374151;
  }

  .category-card:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  }

  .category-name {
    color: #e5e7eb;
  }

  .category-card:hover .category-name {
    color: #60a5fa;
  }

  .category-count {
    color: #9ca3af;
  }
}
</style>

## All Categories

<div class="categories-list">
  {% assign sorted_categories = site.categories | sort %}
  {% for category in sorted_categories %}
    {% assign category_name = category[0] %}
    {% assign category_posts = category[1] %}
  <div class="category-section">
    <h3 id="{{ category_name | slugify }}">
      <a href="{{ site.baseurl }}/categories/{{ category_name | slugify }}/">{{ category_name }}</a>
      <span class="category-count-inline">({{ category_posts.size }})</span>
    </h3>
    <ul class="post-list-compact">
      {% for post in category_posts %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
      </li>
      {% endfor %}
    </ul>
  </div>
  {% endfor %}
</div>

<style>
/* Categories List Styling */
.categories-list {
  margin-top: 3rem;
}

.category-section {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.category-section:last-child {
  border-bottom: none;
}

.category-section h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.category-section h3 a {
  color: #2563eb;
  text-decoration: none;
}

.category-section h3 a:hover {
  text-decoration: underline;
}

.category-count-inline {
  color: #666;
  font-size: 1rem;
  font-weight: 400;
  margin-left: 0.5rem;
}

.post-list-compact {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-list-compact li {
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.post-list-compact li a {
  color: #333;
  text-decoration: none;
  flex: 1;
}

.post-list-compact li a:hover {
  color: #2563eb;
}

.post-date {
  color: #666;
  font-size: 0.875rem;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .post-list-compact li {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .post-date {
    font-size: 0.75rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .category-section {
    border-bottom-color: #404040;
  }

  .category-count-inline {
    color: #999;
  }

  .post-list-compact li a {
    color: #e0e0e0;
  }

  .post-list-compact li a:hover {
    color: #60a5fa;
  }

  .post-date {
    color: #999;
  }
}
</style>
