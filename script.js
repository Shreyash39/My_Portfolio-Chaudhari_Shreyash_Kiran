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

  // Project card click handlers
  document.querySelectorAll('.project-card').forEach(card => {
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

  // Add hover effects to cards
  document.querySelectorAll('.content-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('project-card')) {
        this.style.transform = 'translateY(0) scale(1)';
      }
    });
  });
});
