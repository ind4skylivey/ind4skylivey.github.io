---
layout: default
title: "Contact"
permalink: /contact/
---

<div class="contact-terminal">
  <div class="term-lights">
    <span></span><span></span><span></span>
  </div>
  <p class="typing">connecting to livey://digital-realm...</p>
</div>

<h1 class="contact-title">Contact</h1>

<p class="contact-description">
  Step into a space where development, security, anime energy, and creative engineering blend together.  
  If you want to collaborate or reach the real me behind the code — this is your gateway.
</p>

<div class="contact-channels">
  <h3>Official Contact Channels</h3>

  <p><strong>Email:</strong>  
    <a class="neon-link" href="mailto:ind4skylivey@proton.me">
      ind4skylivey@proton.me
    </a>
  </p>

  <p><strong>GitHub:</strong>  
    <a class="neon-link" href="https://github.com/ind4skylivey" target="_blank">
      github.com/ind4skylivey
    </a>
  </p>

  <p><strong>Organization:</strong>  
    <a class="neon-link" href="https://github.com/S1b-Team">
      S1BGr0up.inc
    </a>
  </p>

  <p><strong>Specialties:</strong><br>
  Cybersecurity, Reverse Engineering, AI Development, PHP/Laravel, Python, Rust, Linux Systems.</p>
</div>

<blockquote class="contact-quote">
  “Every signal carries a story.  
  Every command reveals a soul.  
  Reach out — and step into the realm where code, identity, and consciousness intertwine.”
</blockquote>


<h3 class="contact-portal-title">Contact Portal</h3>

<p class="contact-description">
  A more intimate doorway into my digital universe — where ideas ignite, projects are born, and curiosity is always welcome.
  If you bring passion, creativity, or rebellion, you’ll fit right in.
</p>


<!-- VIDEO WITH TECH FRAME -->
<div class="tech-frame">
  <div class="tech-border"></div>
  <video autoplay muted loop playsinline class="contact-video">
    <source src="/assets/media/contact-video.mp4" type="video/mp4">
  </video>
</div>

<!-- HOLOGRAM BUTTON -->
<div class="contact-buttons">
  <a href="mailto:ind4skylivey@proton.me" class="holo-btn">Initiate Contact</a>
</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".typing");
  const text = el.textContent.trim();
  el.textContent = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 55);
    } else {
      el.style.borderRight = "none";
    }
  }
  type();
});
</script>
