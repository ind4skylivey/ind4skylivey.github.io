---
layout: default
title: "Home"
permalink: /
---

<section class="hero">
  <h1>Livey — Software Engineer & Cybersecurity Researcher</h1>
  <p class="lede">I build AI-powered frameworks, secure tooling, and high‑performance Linux workflows. Focus: PHP/Laravel, Python, Rust, Reverse Engineering, and local AI.</p>
  <p><a class="btn" href="/projects/">Explore Projects</a></p>
</section>

<h2>Featured Projects</h2>
<div class="grid">
  {% assign featured = site.projects | where_exp: "p","p.featured == true" %}
  {% for p in featured limit: 6 %}
  <div class="card">
    <h3><a href="{{ p.url }}">{{ p.title }}</a></h3>
    <p>{{ p.description }}</p>
    <p><a href="{{ p.url }}">Read more →</a></p>
  </div>
  {% endfor %}
</div>

<h2>Latest Posts</h2>
<div class="grid">
  {% for post in site.posts limit: 3 %}
  <div class="card">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
    <p><a href="{{ post.url }}">Read →</a></p>
  </div>
  {% endfor %}
</div>