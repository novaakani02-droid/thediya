/**
 * ====================================================================
 * THE DIYA EDIT — ISSUE NO. 21
 * ANIMATION ENGINE & ENVELOPE CONTROLLER
 * ====================================================================
 */

export function initAnimations() {
  setupEnvelopeOpening();
  setupScrollReveals();
  setupReplayButton();
  setupConfettiButtons();
}

function setupEnvelopeOpening() {
  const envelopeScreen = document.getElementById('invitation-screen');
  const envelopeBox = document.getElementById('envelope-box') || document.getElementById('envelope-wrapper');
  const waxSeal = document.getElementById('wax-seal-button') || document.getElementById('wax-seal');
  const openSurpriseBtn = document.getElementById('open-surprise-btn');
  const closeEnvelopeBtn = document.getElementById('close-envelope-btn');

  if (!envelopeBox) return;

  // Step 1: Open the envelope flap and slide the letter out
  const triggerOpenEnvelope = (e) => {
    if (e) e.stopPropagation();
    if (!envelopeBox.classList.contains('opened')) {
      envelopeBox.classList.add('opened');
      triggerMiniConfetti();
    }
  };

  // Re-close / fold back the envelope
  const triggerCloseEnvelope = (e) => {
    if (e) e.stopPropagation();
    envelopeBox.classList.remove('opened');
  };

  envelopeBox.addEventListener('click', (e) => {
    // Only open if clicked on envelope and not inside the opened letter card
    if (!envelopeBox.classList.contains('opened')) {
      triggerOpenEnvelope(e);
    }
  });

  if (waxSeal) waxSeal.addEventListener('click', triggerOpenEnvelope);
  if (closeEnvelopeBtn) closeEnvelopeBtn.addEventListener('click', triggerCloseEnvelope);

  // Step 2: Open your surprise into the full website
  if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerGrandBirthdayConfetti();

      if (envelopeScreen) {
        envelopeScreen.classList.add('unlocked');
        document.body.style.overflow = 'auto';

        // Scroll smoothly to cover
        const coverSection = document.getElementById('the-diya-edit');
        if (coverSection) {
          setTimeout(() => {
            coverSection.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      }
    });
  }
}

function setupReplayButton() {
  const replayBtn = document.getElementById('replay-journey-btn');
  const envelopeScreen = document.getElementById('invitation-screen');
  const envelopeBox = document.getElementById('envelope-box') || document.getElementById('envelope-wrapper');

  if (!replayBtn || !envelopeScreen || !envelopeBox) return;

  replayBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    envelopeBox.classList.remove('opened');
    
    setTimeout(() => {
      envelopeScreen.classList.remove('unlocked');
      document.body.style.overflow = 'hidden';
      triggerMiniConfetti();
    }, 400);
  });
}

function setupConfettiButtons() {
  const celebrateBtns = document.querySelectorAll('.celebrate-btn');
  celebrateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      triggerGrandBirthdayConfetti();
    });
  });
}

function setupScrollReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Confetti effects using canvas-confetti
export function triggerGrandBirthdayConfetti() {
  if (typeof window.confetti !== 'function') return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#6B1F2D', '#FA9EBC', '#E6D8C7', '#C5A059', '#FFFFFF', '#D87B9A']
  };

  function fire(particleRatio, opts) {
    window.confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

function triggerMiniConfetti() {
  if (typeof window.confetti !== 'function') return;
  window.confetti({
    particleCount: 40,
    spread: 50,
    origin: { y: 0.6 },
    colors: ['#FA9EBC', '#6B1F2D', '#C5A059']
  });
}
