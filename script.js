// Smooth scrolling and active nav highlighting
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a');
  
  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Enhanced active section highlighting in navigation
  function updateActiveNav() {
    const fromTop = window.scrollY + 180; // Adjusted for better accuracy
    
    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        if (section.offsetTop <= fromTop && 
            section.offsetTop + section.offsetHeight > fromTop) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
    
    // Handle edge cases for first and last sections
    if (window.scrollY < 100) {
      navLinks.forEach(l => l.classList.remove('active'));
      navLinks[0].classList.add('active'); // Activate "About" when at top
    }
  }

  // Throttle scroll event for better performance
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
  updateActiveNav(); // Initial call

  // Add fade-in animation for sections on scroll
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections for animation
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(section);
  });

  // Enhanced hover effects for contact list items
  const contactItems = document.querySelectorAll('.contact-list li');
  contactItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(8px) scale(1.02)';
      this.style.borderLeftWidth = '6px';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0) scale(1)';
      this.style.borderLeftWidth = '4px';
    });
  });

  // Enhanced hover effects for item boxes
  const itemBoxes = document.querySelectorAll('.item-box');
  itemBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    box.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add sparkle effect to navigation links
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.filter = 'brightness(1.2) saturate(1.3)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.filter = 'brightness(1) saturate(1)';
    });
  });

  // Back button navigation
  const backButton = document.querySelector('.top-right-button');
  if (backButton && backButton.getAttribute('href') === 'index.html') {
    backButton.addEventListener('click', function(e) {
      // Allow normal navigation to index.html
      // Remove e.preventDefault() to let the link work normally
      window.location.href = 'index.html';
    });
  }
});
