---
layout: default
title: "Home"
permalink: /
---

<section class="hero reveal">
  <div class="hero-kicker">S1BGr0up.inc · Open Intelligence Division</div>
  <h1><span id="typewriter-text" class="hidden" data-text="Engineering systems that break closed chains."></span></h1>
  <p class="hero-sub">
    I’m iLivey, an Open Intelligence Engineer focused on cybersecurity, reverse engineering, AI-assisted tooling,
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

<section class="section reveal">
  <div class="section-header">
    <div>
      <h2 style="color: var(--accent-2);">Featured Research</h2>
      <p class="section-sub">Latest in-depth analysis and defense frameworks.</p>
    </div>
  </div>
  <div class="card glass-panel" style="border-color: rgba(0, 242, 195, 0.4); background: linear-gradient(180deg, rgba(13,15,24,0.8) 0%, rgba(0,242,195,0.05) 100%);">
    <div class="tags" style="margin-bottom: 12px;">
      <span class="pill" style="color: #00f2c3; border-color: rgba(0, 242, 195, 0.5);">STATUS: ACTIVE 🟢</span>
      <span class="pill">PHP / Laravel</span>
      <span class="pill">Supply Chain Security</span>
    </div>
    <h3 class="glitch-hover" data-text="Laravel Supply-Chain Defense" style="font-size: 24px; margin-bottom: 10px;">
      <a href="/research/laravel-supply-chain-defense/" style="text-decoration: none; color: var(--text);">Laravel Supply-Chain Defense</a>
    </h3>
    <p style="max-width: 800px; margin-bottom: 16px;">
      A practical defense model for the Composer ecosystem. Strategies for hardening PHP/Laravel projects against dependency confusion, trojanized packages, and maintainer compromise.
    </p>
    <div style="display: flex; flex-wrap: wrap; gap: 30px; margin-bottom: 24px;">
      <ul class="list-dots" style="margin-top: 0;">
        <li>LiveyScore™ 2.0 Scoring Engine</li>
        <li>Policy-based Allow/Deny Lists</li>
      </ul>
      <ul class="list-dots" style="margin-top: 0;">
        <li>Automated CI/CD Integration</li>
        <li>Visual Threat Dashboard</li>
      </ul>
    </div>
    <a class="btn" href="/research/laravel-supply-chain-defense/">Read Full Research &rarr;</a>
  </div>
</section>

<section class="section reveal">
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

<section class="section reveal">
  <div class="section-header">
    <div>
      <h2>Project Spotlight</h2>
      <p class="section-sub">A glimpse into the tools that define my current work.</p>
    </div>
  </div>

{% assign spotlights = site.projects | where: "featured", true %}
{% if spotlights.size > 0 %}

  <div class="grid">
    {% for spotlight in spotlights %}
    <div class="card">
      <h3 class="glitch-hover" data-text="{{ spotlight.title }}"><a href="{{ spotlight.url }}">{{ spotlight.title }}</a></h3>
      <p>{{ spotlight.description }}</p>
      {% if spotlight.repo %}<p><a href="{{ spotlight.repo }}" target="_blank" rel="noopener">View repository ↗</a></p>{% endif %}
    </div>
    {% endfor %}
  </div>
  {% else %}
  <p>No featured project yet. Mark one of your projects with <code>featured: true</code> in its front matter.</p>
  {% endif %}
</section>

<section class="section reveal">
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

<section class="section reveal">
  <div class="section-header">
    <div>
      <h2>Lab Logs</h2>
      <p class="section-sub">Recent writings, experiments, and notes from the field.</p>
    </div>
  </div>
  <div class="grid">
    {% for post in site.posts limit: 3 %}
    <div class="card">
      <div style="margin-bottom: 8px; font-size: 11px; color: var(--accent-2);">LOG: {{ post.date | date: "%Y.%m.%d" }}</div>
      <h3 class="glitch-hover" data-text="{{ post.title }}"><a href="{{ post.url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt | strip_html | truncate: 130 }}</p>
    </div>
    {% endfor %}
  </div>
</section>
