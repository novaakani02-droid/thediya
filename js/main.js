/**
 * ====================================================================
 * THE DIYA EDIT — ISSUE NO. 21
 * MAIN APP CONTROLLER & PHOTO CUSTOMIZER STUDIO
 * ====================================================================
 */

import { initGallery } from './gallery.js';
import { initLetters } from './letters.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  // Lock scroll initially for envelope invitation screen
  const envelopeScreen = document.getElementById('invitation-screen');
  if (envelopeScreen && !envelopeScreen.classList.contains('unlocked')) {
    document.body.style.overflow = 'hidden';
  }

  // Initialize core subsystems
  initGallery();
  initLetters();
  initAnimations();
  setupNavigation();
  setupCuratorStudio();
  applyCustomUploadedPhotos();
});

function setupNavigation() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navList = document.querySelector('.nav-links');

  // Mobile menu toggle
  if (mobileToggle && navList) {
    mobileToggle.addEventListener('click', () => {
      navList.classList.toggle('mobile-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('mobile-open');
      });
    });
  }

  // Scrollspy for active nav link
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Curator's Studio
 * Gives Diya's friends an instant UI in the browser to drop their real photos
 * without having to touch code! Saved in browser local memory.
 */
function setupCuratorStudio() {
  const toggleBtn = document.getElementById('curator-toggle-btn');
  const panel = document.getElementById('curator-panel');
  const closeBtn = document.getElementById('curator-close-btn');
  const resetBtn = document.getElementById('curator-reset-btn');

  if (!toggleBtn || !panel) return;

  toggleBtn.addEventListener('click', () => {
    panel.classList.toggle('open');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('open');
    });
  }

  // Handle local file uploads for slots
  const uploadInputs = document.querySelectorAll('.curator-file-input');
  uploadInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const slot = input.dataset.slot;
      if (!file || !slot) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        try {
          localStorage.setItem(`diya_photo_${slot}`, base64);
          applyCustomUploadedPhotos();
          // Update thumbnail in drawer
          const thumb = document.getElementById(`curator-thumb-${slot}`);
          if (thumb) thumb.src = base64;
        } catch (err) {
          console.warn('Storage limit reached for local photos', err);
        }
      };
      reader.readAsDataURL(file);
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset custom photos back to default assets?')) {
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('diya_photo_')) {
            localStorage.removeItem(key);
          }
        });
        location.reload();
      }
    });
  }
}

function applyCustomUploadedPhotos() {
  // Check slots: 'cover', 'diya_profile', 'matilda', 'phyllis', 'franca', 'vanessa'
  const slots = ['cover', 'diya_profile', 'matilda', 'phyllis', 'franca', 'vanessa'];
  slots.forEach(slot => {
    const customImg = localStorage.getItem(`diya_photo_${slot}`);
    if (!customImg) return;

    if (slot === 'cover') {
      const coverImg = document.getElementById('cover-portrait-img');
      if (coverImg) coverImg.src = customImg;
    } else if (slot === 'diya_profile') {
      const profileImg = document.getElementById('profile-portrait-img');
      if (profileImg) profileImg.src = customImg;
    } else {
      // Friend avatars
      const friendAvatars = document.querySelectorAll(`[data-friend="${slot}"] img, #card-${slot} .author-avatar img`);
      friendAvatars.forEach(img => {
        img.src = customImg;
        img.style.display = 'block';
        if (img.nextElementSibling) img.nextElementSibling.style.display = 'none';
      });
    }

    // Update thumbnail in drawer if open
    const thumb = document.getElementById(`curator-thumb-${slot}`);
    if (thumb) thumb.src = customImg;
  });
}
