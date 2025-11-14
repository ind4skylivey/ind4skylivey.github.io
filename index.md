---
layout: default
title: "Home"
permalink: /
---

<section class="hero">
  <div class="hero-kicker">S1BGr0up.inc · Open Intelligence Division</div>
  <h1>Engineering systems that break closed chains.</h1>
  <p class="hero-sub">
    I’m Livey, an Open Intelligence Engineer focused on cybersecurity, reverse engineering, AI-assisted tooling,
    and Linux performance architecture. I design frameworks, workflows, and tools that turn complexity into leverage.
  </p>
  <div class="hero-inline">
    <span>// live mode enabled</span>
    <span class="cursor"></span>
  </div>
  <div class="hero-actions">
    <a class="btn" href="/projects/">Explore Projects</a>
    <a class="btn btn-outline" href="/research/">View Research Logs</a>
  </div>
</section>

<section class="section">
  <div class="section-header">
    <div>
      <h2>What I Build</h2>
      <p class="section-sub">Systems, frameworks, and tools for developers, researchers, and security teams.</p>
    </div>
    <span class="pill">Open Systems · Ethical Hacking</span>
  </div>
  <div class="grid">
    <div class="card">
      <h3>AI-Assisted Tooling</h3>
      <p>Local and remote AI integrated into developer workflows: refactoring, analysis, automation, and secure copilots.</p>
    </div>
    <div class="card">
      <h3>Security & Reverse Engineering</h3>
      <p>Tools and baselines for red teams, malware analysis, and secure Laravel / Linux environments.</p>
    </div>
    <div class="card">
      <h3>Linux Performance Architecture</h3>
      <p>Upscaling frameworks, GPU/CPU tuning, and observability stacks tailored for power users and researchers.</p>
    </div>
    <div class="card">
      <h3>Developer Productivity Systems</h3>
      <p>IDE configs, CLI assistants, and automation pipelines that turn daily workflows into repeatable power moves.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="section-header">
    <div>
      <h2>Project Spotlight</h2>
      <p class="section-sub">A glimpse into the tools that define my current work.</p>
    </div>
  </div>

  {% assign spotlight = site.projects | where_exp: "p","p.featured == true" | first %}
  {% if spotlight %}
  <div class="card">
    <h3><a href="{{ spotlight.url }}">{{ spotlight.title }}</a></h3>
    <p>{{ spotlight.description }}</p>
    {% if spotlight.repo %}<p><a href="{{ spotlight.repo }}" target="_blank" rel="noopener">View repository ↗</a></p>{% endif %}
  </div>
  {% else %}
  <p>No featured project yet. Mark one of your projects with <code>featured: true</code> in its front matter.</p>
  {% endif %}
</section>

<section class="section">
  <div class="section-header">
    <div>
      <h2>Core Philosophy</h2>
      <p class="section-sub">How I think about engineering, security, and intelligence.</p>
    </div>
  </div>
  <div class="grid">
    <div class="card">
      <h3>Open Intelligence</h3>
      <ul class="list-dots">
        <li>Intelligence should empower creators, not lock them in.</li>
        <li>Local-first where possible, privacy-aware always.</li>
      </ul>
    </div>
    <div class="card">
      <h3>Security as Craft</h3>
      <ul class="list-dots">
        <li>Red teaming and reverse engineering as tools for understanding systems deeply.</li>
        <li>Defensive value rooted in offensive insight.</li>
      </ul>
    </div>
    <div class="card">
      <h3>Engineering as Storytelling</h3>
      <ul class="list-dots">
        <li>Every tool encodes a way of thinking.</li>
        <li>Good systems teach users to see differently.</li>
      </ul>
    </div>
    <div class="card">
      <h3>Respect for Time & Attention</h3>
      <ul class="list-dots">
        <li>Automation should reduce cognitive noise, not add more dashboards.</li>
        <li>Good tools disappear into the flow.</li>
      </ul>
    </div>
  </div>
</section>

<section class="section">
  <div class="section-header">
    <div>
      <h2>Lab Logs</h2>
      <p class="section-sub">Recent writings, experiments, and notes from the field.</p>
    </div>
  </div>
  <div class="grid">
    {% for post in site.posts limit: 3 %}
    <div class="card">
      <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt | strip_html | truncate: 130 }}</p>
    </div>
    {% endfor %}
  </div>
</section>