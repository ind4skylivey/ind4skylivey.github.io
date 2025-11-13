---
layout: default
title: "Blog"
permalink: /blog/
---

# Blog

<div class="grid">
{% for post in site.posts %}
  <div class="card">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p>{{ post.excerpt | strip_html | truncate: 140 }}</p>
  </div>
{% endfor %}
</div>