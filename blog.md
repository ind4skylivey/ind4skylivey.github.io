---
layout: default
title: "Lab Logs"
permalink: /blog/
---

<div class="blog-container">

  <div class="section-header" style="margin-bottom: 32px; align-items: center;">
    <div>
      <h1 class="glitch-hover" data-text="Intelligence Logs">Intelligence Logs</h1>
      <p class="section-sub">Research notes, technical deep dives, and field reports.</p>
    </div>
    <button id="briefing-toggle" class="btn btn-outline">Toggle Briefing Mode</button>
  </div>

  <div class="grid">
    {% for post in site.posts %}
      <div class="card reveal">
        <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
          <span class="pill" style="border-color: var(--accent-2); color: var(--accent-2);">LOG: {{ post.date | date: "%Y.%m.%d" }}</span>
          {% if post.categories %}
            <div class="tags" style="margin: 0;">
              {% for cat in post.categories limit:1 %}
                <span style="margin: 0; font-size: 10px;">{{ cat }}</span>
              {% endfor %}
            </div>
          {% endif %}
        </div>

        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>

        <div style="margin-top: 16px;">
          <a href="{{ post.url }}" class="hero-inline" style="font-size: 11px;">
            ACCESS LOG <span class="cursor"></span>
          </a>
        </div>
      </div>
    {% endfor %}

  </div>

</div>
