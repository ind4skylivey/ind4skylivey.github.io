document.addEventListener('DOMContentLoaded', () => {

  // --- 1. TYPEWRITER EFFECT ---
  const typeWriterElement = document.getElementById('typewriter-text');
  if (typeWriterElement) {
    const text = typeWriterElement.getAttribute('data-text');
    typeWriterElement.innerText = ''; // Clear initial text
    typeWriterElement.classList.remove('hidden'); // Show cursor

    let i = 0;
    const speed = 30; // typing speed in ms

    function type() {
      if (i < text.length) {
        typeWriterElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        // Animation complete
        typeWriterElement.classList.add('typing-done');
      }
    }
    // Small delay before starting
    setTimeout(type, 500);
  }

  // --- 2. NEON READING PROGRESS BAR ---
  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      progressBar.style.width = scrollPercent + '%';

      // Optional: Glow intensity based on completion
      if (scrollPercent > 99) {
        progressBar.style.boxShadow = "0 0 20px var(--red-team)";
      } else {
        progressBar.style.boxShadow = "none";
      }
    });
  }

  // --- 3. COPY CODE BUTTONS ---
  // Find all code blocks wrapped in pre
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach((block) => {
    // Create the button container
    const button = document.createElement('button');
    button.className = 'copy-code-btn';
    button.type = 'button';
    button.innerText = 'COPY';
    button.ariaLabel = 'Copy code to clipboard';

    // Add button to the pre block
    block.style.position = 'relative'; // Ensure positioning works
    block.appendChild(button);

    button.addEventListener('click', () => {
      // Get the code text
      const code = block.querySelector('code').innerText;

      // Copy to clipboard
      navigator.clipboard.writeText(code).then(() => {
        // Success feedback
        button.innerText = 'COPIED';
        button.classList.add('copied');

        // Reset after 2 seconds
        setTimeout(() => {
          button.innerText = 'COPY';
          button.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
        button.innerText = 'ERROR';
      });
    });
  });  // --- 4. COMMAND PALETTE (HUD) ---
  const cmdOverlay = document.getElementById('cmd-palette-overlay');
  const cmdInput = document.getElementById('cmd-input');
  const cmdResults = document.getElementById('cmd-results');

  if (cmdOverlay && cmdInput && cmdResults) {

    // Command Definitions
    const commands = [
      { id: 'home', label: 'Go to Home', icon: '🏠', action: () => window.location.href = '/' },
      { id: 'projects', label: 'View Projects', icon: '🚀', action: () => window.location.href = '/projects/' },
      { id: 'research', label: 'Access Research Logs', icon: '🧪', action: () => window.location.href = '/research/' },
      { id: 'blog', label: 'Read Lab Notes', icon: '📝', action: () => window.location.href = '/blog/' },
      { id: 'about', label: 'Who is Livey?', icon: '👤', action: () => window.location.href = '/about/' },
      { id: 'contact', label: 'Open Comms / Contact', icon: '📡', action: () => window.location.href = '/contact/' },
      { id: 'terminal', label: 'Launch Web Terminal', icon: '💻', action: () => window.location.href = '/terminal/' },
      { id: 'github', label: 'View Source (GitHub)', icon: '🐙', action: () => window.open('https://github.com/ind4skylivey', '_blank') },
      { id: 'status', label: 'System Status Check', icon: '🟢', action: () => alert('SYSTEM INTEGRITY: 100%\nNET: SECURE\nOP-SEC: ACTIVE') }
    ];

    let activeIndex = 0;
    let filteredCommands = [...commands];

    // Render List
    function renderCommands() {
      cmdResults.innerHTML = '';

      if (filteredCommands.length === 0) {
        const div = document.createElement('div');
        div.className = 'cmd-item';
        div.style.cursor = 'default';
        div.innerHTML = '<span style="opacity:0.5">No commands found.</span>';
        cmdResults.appendChild(div);
        return;
      }

      filteredCommands.forEach((cmd, index) => {
        const div = document.createElement('div');
        div.className = `cmd-item ${index === activeIndex ? 'selected' : ''}`;
        div.onclick = () => {
          cmd.action();
          togglePalette(false);
        };
        div.innerHTML = `
          <div style="display:flex; align-items:center;">
            <span class="cmd-icon">${cmd.icon}</span>
            <span>${cmd.label}</span>
          </div>
          <span class="cmd-shortcut">↵</span>
        `;
        cmdResults.appendChild(div);
      });

      // Ensure selected item is in view
      const selected = cmdResults.querySelector('.selected');
      if (selected) {
        selected.scrollIntoView({ block: 'nearest' });
      }
    }

    // Toggle Visibility
    function togglePalette(show) {
      if (show) {
        cmdOverlay.classList.add('visible');
        cmdInput.value = '';
        filteredCommands = [...commands];
        activeIndex = 0;
        renderCommands();
        setTimeout(() => cmdInput.focus(), 50);
      } else {
        cmdOverlay.classList.remove('visible');
      }
    }

    // Global Keyboard Listener
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const isVisible = cmdOverlay.classList.contains('visible');
        togglePalette(!isVisible);
      }
      if (e.key === 'Escape' && cmdOverlay.classList.contains('visible')) {
        togglePalette(false);
      }
    });

    // Input Listener (Filtering & Navigation)
    cmdInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % filteredCommands.length;
        renderCommands();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + filteredCommands.length) % filteredCommands.length;
        renderCommands();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[activeIndex]) {
          filteredCommands[activeIndex].action();
          togglePalette(false);
        }
      }
    });

    cmdInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query)
      );
      activeIndex = 0;
      renderCommands();
    });

    // Close on outside click
    cmdOverlay.addEventListener('click', (e) => {
      if (e.target === cmdOverlay) {
        togglePalette(false);
      }
    });
  }

  // --- 5. SCROLL REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll('.card, .hero, .section h2, .section-sub');

  // Add initial reveal class
  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- 6. 3D TILT EFFECT FOR CARDS ---
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  // --- 7. GLITCH TEXT INITIALIZATION ---
  // Automatically add data-text attribute to card titles for the CSS glitch effect
  const cardTitles = document.querySelectorAll('.card h3 a');
  cardTitles.forEach(title => {
    title.parentElement.classList.add('glitch-hover');
    title.parentElement.setAttribute('data-text', title.innerText);
  });

  // --- 8. BACKGROUND PARALLAX ---
  const bgParticles = document.querySelector('.bg-particles');
  if (bgParticles) {
    document.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth - e.pageX * 2) / 100;
      const y = (window.innerHeight - e.pageY * 2) / 100;
      bgParticles.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // --- 9. SKILL BAR ANIMATION ---
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.width = width;
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

  skillFills.forEach(fill => {
    fill.style.width = '0%'; // Start at 0
    skillObserver.observe(fill);
  });

});
