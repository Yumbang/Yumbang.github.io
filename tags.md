---
layout: page
title: Tags
permalink: /tags/
description: Browse posts by tag to explore specific topics.
---

<div class="tags-cloud">
  {% assign tags = site.tags | sort %}
  {% for tag in tags %}
    {% assign tag_name = tag[0] %}
    {% assign tag_posts = tag[1] %}
    <div class="tag-item">
      <a href="{{ site.baseurl }}/tags/{{ tag_name | slugify }}/" class="tag-link">
        <span class="tag-name">{{ tag_name }}</span>
        <span class="tag-count">{{ tag_posts.size }}</span>
      </a>
    </div>
  {% endfor %}
</div>

<style>
/* Tags Cloud Styling */
.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.tag-item {
  display: inline-block;
}

.tag-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  text-decoration: none;
  color: #333;
  transition: all 0.2s ease;
}

.tag-link:hover {
  background-color: #2563eb;
  border-color: #2563eb;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
}

.tag-name {
  font-weight: 500;
}

.tag-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0 0.375rem;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
}

.tag-link:hover .tag-count {
  background-color: rgba(255, 255, 255, 0.25);
  color: white;
}

/* Dark mode support (if you add dark mode later) */
@media (prefers-color-scheme: dark) {
  .tag-link {
    background-color: #2a2a2a;
    border-color: #404040;
    color: #e0e0e0;
  }

  .tag-link:hover {
    background-color: #2563eb;
    border-color: #2563eb;
    color: white;
  }
}
</style>

## All Tags

<div class="tags-list">
  {% assign sorted_tags = site.tags | sort %}
  {% for tag in sorted_tags %}
    {% assign tag_name = tag[0] %}
    {% assign tag_posts = tag[1] %}
  <div class="tag-section">
    <h3 id="{{ tag_name | slugify }}">
      <a href="{{ site.baseurl }}/tags/{{ tag_name | slugify }}/">{{ tag_name }}</a>
      <span class="tag-count-inline">({{ tag_posts.size }})</span>
    </h3>
    <ul class="post-list-compact">
      {% for post in tag_posts %}
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
/* Tags List Styling */
.tags-list {
  margin-top: 3rem;
}

.tag-section {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.tag-section:last-child {
  border-bottom: none;
}

.tag-section h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.tag-section h3 a {
  color: #2563eb;
  text-decoration: none;
}

.tag-section h3 a:hover {
  text-decoration: underline;
}

.tag-count-inline {
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
  .tag-section {
    border-bottom-color: #404040;
  }

  .tag-count-inline {
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
