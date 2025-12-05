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
  });

});
