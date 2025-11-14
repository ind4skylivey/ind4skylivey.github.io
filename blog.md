---
layout: default
title: "Lab Logs"
permalink: /blog/
---

# Lab Logs

<p class="section-sub">Switch between standard view and Intelligence Briefing mode.</p>
<button id="briefing-toggle">Enter Intelligence Briefing Mode</button>

<div class="grid" style="margin-top:18px;">
{% for post in site.posts %}
  <div class="card">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p>{{ post.excerpt | strip_html | truncate: 140 }}</p>
  </div>
{% endfor %}
</div>