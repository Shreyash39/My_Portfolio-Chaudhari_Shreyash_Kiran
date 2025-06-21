document.addEventListener('DOMContentLoaded', function() {
  // Create shooting stars
  function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDuration = (2 + Math.random() * 3) + 's';
    star.style.animationDelay = Math.random() * 2 + 's';
    
    document.getElementById('shooting-stars').appendChild(star);
    
    setTimeout(() => {
      star.remove();
    }, 5000);
  }

  // Create shooting stars periodically
  setInterval(createShootingStar, 200);

  // Smooth scrolling for navigation
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Section visibility and navigation highlighting
  function updateVisibleSections() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        section.classList.add('visible');
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      } else if (scrollPosition < sectionTop - 100) {
        section.classList.remove('visible');
      }
    });
  }

  window.addEventListener('scroll', updateVisibleSections);
  updateVisibleSections(); // Initialize

  // Project card click handlers - only for cards with live links
  document.querySelectorAll('.project-card[data-live-link]').forEach(card => {
    card.addEventListener('click', function(e) {
      const liveLink = this.getAttribute('data-live-link');
      if (liveLink && !e.target.closest('a')) {
        window.open(liveLink, '_blank');
      }
    });
  });

  // Stop propagation for links inside project cards
  document.querySelectorAll('.project-card a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });

  // Enhanced hover effects for cards
  document.querySelectorAll('.content-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Check if it's a project card with live link for enhanced hover
      if (this.classList.contains('project-card') && this.hasAttribute('data-live-link')) {
        // Enhanced hover is handled by CSS
        return;
      } else if (this.classList.contains('project-card')) {
        // Regular project card hover
        this.style.transform = 'translateY(-5px) scale(1.02)';
      } else {
        // Regular content card hover
        this.style.transform = 'translateY(-5px) scale(1.02)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      // Reset transform for non-CSS handled hovers
      if (!this.classList.contains('project-card') || !this.hasAttribute('data-live-link')) {
        this.style.transform = 'translateY(0) scale(1)';
      }
    });
  });

  // Add cursor pointer style dynamically for project cards with live links
  document.querySelectorAll('.project-card[data-live-link]').forEach(card => {
    card.style.cursor = 'pointer';
  });

  // Add subtle animation to click hints
  document.querySelectorAll('.project-card[data-live-link] .click-hint').forEach(hint => {
    setInterval(() => {
      hint.style.transform = 'scale(1.1)';
      setTimeout(() => {
        hint.style.transform = 'scale(1)';
      }, 200);
    }, 3000);
  });
});
