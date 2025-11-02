---
layout: page
title: Archive
permalink: /archive/
description: Browse all blog posts organized by date.
---

## All Posts

<ul class="post-list">
{% for post in site.posts %}
  <li class="post-list-item">
    <article>
      <h3 class="post-title">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h3>

      <div class="post-meta">
        <span class="meta-item">
          <time datetime="{{ post.date | date_to_xmlschema }}">
            {{ post.date | date: "%B %-d, %Y" }}
          </time>
        </span>

        {% if post.categories.size > 0 %}
        <span class="meta-separator">•</span>
        <span class="meta-item">
          {% for category in post.categories %}
            {{ category }}{% unless forloop.last %}, {% endunless %}
          {% endfor %}
        </span>
        {% endif %}
      </div>

      {% if post.excerpt %}
      <div class="post-excerpt">
        {{ post.excerpt }}
      </div>
      {% endif %}

      <a href="{{ post.url | relative_url }}" class="read-more">Read more</a>
    </article>
  </li>
{% endfor %}
</ul>

{% if site.posts.size == 0 %}
<p class="text-center text-muted">No posts yet.</p>
{% endif %}
