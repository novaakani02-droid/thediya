/**
 * ====================================================================
 * THE DIYA EDIT — ISSUE NO. 21
 * FOUR HEARTS: LETTERS & VOICE NOTE CONTROLLER
 * ====================================================================
 */

import { friendsLetters } from './data/letters.js';

let activeAudioFriendId = null;
let simulatedAudioInterval = null;
let currentProgress = 0;

export function initLetters() {
  renderLetterCards();
  renderPostcards();
  setupLetterModal();
}

function renderLetterCards() {
  const container = document.getElementById('letters-grid-container');
  if (!container) return;

  container.innerHTML = friendsLetters.map(friend => `
    <div class="letter-card reveal-on-scroll" id="card-${friend.id}">
      <div>
        <div class="letter-card-top">
          <div class="letter-author-info">
            <div class="author-avatar">
              <img src="${friend.image}" alt="${friend.name}" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='block';" />
              <div class="author-avatar-initial" style="display:none;">${friend.placeholderInitial}</div>
            </div>
            <div>
              <h3 class="author-name">${friend.name}</h3>
              <span class="author-role">${friend.role}</span>
            </div>
          </div>
          <div class="wax-seal-badge" title="Wax Sealed With Love">
            ${friend.placeholderInitial}
          </div>
        </div>

        <h4 class="letter-card-title">${friend.title}</h4>
        <p class="letter-excerpt">${friend.letterText.substring(0, 190)}...</p>
      </div>

      <div class="letter-card-actions">
        <button class="btn btn-primary" onclick="window.openLetterModal('${friend.id}')">
          Read Her Letter
        </button>

        ${friend.hasAudio ? `
          <div class="audio-mini-player" id="audio-player-${friend.id}">
            <button class="audio-play-btn" onclick="window.toggleAudioPlayback('${friend.id}')" aria-label="Play voice note from ${friend.name}">
              <svg id="icon-play-${friend.id}" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <svg id="icon-pause-${friend.id}" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="display:none;">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            </button>
            <div class="audio-meta">
              <span class="audio-label">Voice Note</span>
              <span class="audio-duration" id="audio-time-${friend.id}">${friend.audioDuration}</span>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function renderPostcards() {
  const container = document.getElementById('postcards-grid-container');
  if (!container) return;

  container.innerHTML = friendsLetters.map(friend => `
    <div class="vintage-postcard reveal-on-scroll">
      <div class="postcard-left">
        <div class="meta-row" style="margin-bottom: 0.75rem;">
          <span>AIRMAIL</span>
          <span class="meta-separator">·</span>
          <span>SPECIAL DELIVERY</span>
        </div>
        <p class="postcard-message-quote">"${friend.postcardExcerpt}"</p>
        <div>
          <span class="postcard-sender">— Love, ${friend.name}</span>
          <div style="margin-top: 0.5rem;">
            <button class="btn btn-soft" style="padding: 0.4rem 1rem; font-size: 0.75rem;" onclick="window.openLetterModal('${friend.id}')">
              Read Complete Letter
            </button>
          </div>
        </div>
      </div>

      <div class="postcard-right">
        <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
          <div class="postmark-circle">
            <span>GHANA</span>
            <span style="font-weight: 700;">NOV 06</span>
            <span>2026</span>
          </div>
          <div class="postage-stamp-box">
            <span class="stamp-country">GHANA</span>
            <span class="stamp-inner-text">21</span>
            <span style="font-size: 0.55rem; color: var(--color-burgundy);">DIYA</span>
          </div>
        </div>

        <div class="postcard-recipient-address">
          <strong>TO:</strong> Mardiya (Diya)<br/>
          Wherever Your Heart Finds Home<br/>
          <em>Across All The Miles ♡</em>
        </div>
      </div>
    </div>
  `).join('');
}

function setupLetterModal() {
  const overlay = document.getElementById('letter-modal');
  if (!overlay) return;

  const closeBtn = document.getElementById('modal-close-button');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  });
}

// Global modal opener
window.openLetterModal = function(id) {
  const friend = friendsLetters.find(f => f.id === id);
  if (!friend) return;

  const overlay = document.getElementById('letter-modal');
  const titleEl = document.getElementById('modal-title');
  const authorEl = document.getElementById('modal-author-name');
  const roleEl = document.getElementById('modal-author-role');
  const avatarEl = document.getElementById('modal-author-avatar');
  const contentEl = document.getElementById('modal-letter-content');
  const audioTrigger = document.getElementById('modal-audio-btn');

  if (titleEl) titleEl.textContent = friend.title;
  if (authorEl) authorEl.textContent = friend.name;
  if (roleEl) roleEl.textContent = friend.role;
  if (avatarEl) {
    avatarEl.src = friend.image;
    avatarEl.onerror = () => {
      avatarEl.style.display = 'none';
      avatarEl.nextElementSibling.style.display = 'block';
    };
  }
  if (contentEl) contentEl.textContent = friend.letterText;

  if (audioTrigger) {
    audioTrigger.onclick = () => window.toggleAudioPlayback(friend.id);
  }

  if (overlay) overlay.classList.add('active');
};

// Audio Playback simulation or real audio toggle
window.toggleAudioPlayback = function(id) {
  const friend = friendsLetters.find(f => f.id === id);
  if (!friend) return;

  const playIcon = document.getElementById(`icon-play-${id}`);
  const pauseIcon = document.getElementById(`icon-pause-${id}`);
  const timeEl = document.getElementById(`audio-time-${id}`);

  // If another is playing, stop it first
  if (activeAudioFriendId && activeAudioFriendId !== id) {
    const prevPlay = document.getElementById(`icon-play-${activeAudioFriendId}`);
    const prevPause = document.getElementById(`icon-pause-${activeAudioFriendId}`);
    if (prevPlay) prevPlay.style.display = 'block';
    if (prevPause) prevPause.style.display = 'none';
    clearInterval(simulatedAudioInterval);
  }

  // Toggle current
  if (activeAudioFriendId === id) {
    // Pause
    activeAudioFriendId = null;
    if (playIcon) playIcon.style.display = 'block';
    if (pauseIcon) pauseIcon.style.display = 'none';
    clearInterval(simulatedAudioInterval);
    if (timeEl) timeEl.textContent = friend.audioDuration;
  } else {
    // Play
    activeAudioFriendId = id;
    if (playIcon) playIcon.style.display = 'none';
    if (pauseIcon) pauseIcon.style.display = 'block';

    let elapsed = 0;
    const totalSecs = 120; // 2 minutes representation
    if (timeEl) timeEl.textContent = `0:01 / ${friend.audioDuration}`;

    clearInterval(simulatedAudioInterval);
    simulatedAudioInterval = setInterval(() => {
      elapsed++;
      const mins = Math.floor(elapsed / 60);
      const secs = (elapsed % 60).toString().padStart(2, '0');
      if (timeEl) timeEl.textContent = `${mins}:${secs} / ${friend.audioDuration}`;

      if (elapsed >= totalSecs) {
        clearInterval(simulatedAudioInterval);
        activeAudioFriendId = null;
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (timeEl) timeEl.textContent = friend.audioDuration;
      }
    }, 1000);
  }
};
