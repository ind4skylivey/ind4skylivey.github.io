---
layout: default
title: "Projects"
permalink: /projects/
---

# Projects

<div class="grid">
{% assign sorted = site.projects | sort: 'title' %}
{% for p in sorted %}
  <div class="card">
    <h3><a href="{{ p.url }}">{{ p.title }}</a></h3>
    <p>{{ p.description }}</p>
    {% if p.repo %}<p><a href="{{ p.repo }}" target="_blank" rel="noopener">Repository ↗</a></p>{% endif %}
  </div>
{% endfor %}
</div>