---
layout: default
title: "Research & Security"
permalink: /research/
---

# Research & Security

<div class="grid">
{% assign sorted = site.research | sort: 'title' %}
{% for r in sorted %}
  <div class="card">
    <h3><a href="{{ r.url }}">{{ r.title }}</a></h3>
    <p>{{ r.description }}</p>
  </div>
{% endfor %}
</div>