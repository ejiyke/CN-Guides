/**
 * Connect Nigeria — Interactive Application & Figma 12-Designs HUD
 */

document.addEventListener('DOMContentLoaded', () => {
  initPromoBanner();
  initMobileMenu();
  initGuideStepTracker();
  initGuideCheckboxes();
});

// 1. Promo Announcement Banner Dismiss
function initPromoBanner() {
  const closeBtn = document.querySelector('.promo-close');
  const banner = document.querySelector('.top-promo-banner');
  if (closeBtn && banner) {
    closeBtn.addEventListener('click', () => {
      banner.style.display = 'none';
      document.body.classList.add('promo-closed');
    });
  }
}

// 2. Mobile Navigation Menu
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '64px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#ffffff';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        navLinks.style.zIndex = '999';
      }
    });
  }
}

// 3. Guide Page: Sticky Step Tracker & Scrollspy
function initGuideStepTracker() {
  const stepItems = document.querySelectorAll('.progress-step-item');
  const stepCards = document.querySelectorAll('.guide-step-card');

  if (!stepItems.length || !stepCards.length) return;

  // Click on sidebar step jumps to that step
  stepItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // IntersectionObserver to highlight active step as user scrolls
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        stepItems.forEach(item => {
          if (item.getAttribute('data-target') === id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-10% 0px -70% 0px'
  });

  stepCards.forEach(card => observer.observe(card));
}

// 4. Guide Step Checklist Completion Tracking
function initGuideCheckboxes() {
  const checkboxes = document.querySelectorAll('.step-checklist-item input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      const card = e.target.closest('.guide-step-card');
      if (!card) return;
      const allChecked = Array.from(card.querySelectorAll('input[type="checkbox"]')).every(c => c.checked);
      const stepId = card.id;
      const progressItem = document.querySelector(`.progress-step-item[data-target="${stepId}"]`);
      if (progressItem) {
        if (allChecked) {
          progressItem.classList.add('completed');
        } else {
          progressItem.classList.remove('completed');
        }
      }
    });
  });
}

