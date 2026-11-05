/**
 * ====================================================================
 * THE DIYA EDIT — ISSUE NO. 21
 * SOUL MOMENTS: GALLERY & LIGHTBOX CONTROLLER
 * ====================================================================
 */

import { memoriesArchive, memoryCategories } from './data/memories.js';

let currentFilter = 'all';
let currentLightboxIndex = 0;

export function initGallery() {
  renderFilterTabs();
  renderFeaturedKenkey();
  renderMemoriesGrid();
  setupLightbox();
}

function renderFilterTabs() {
  const container = document.getElementById('memory-filter-tabs');
  if (!container) return;

  container.innerHTML = memoryCategories.map(cat => `
    <button class="filter-btn ${cat.id === currentFilter ? 'active' : ''}" data-category="${cat.id}">
      ${cat.label}
    </button>
  `).join('');

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    const cat = btn.dataset.category;
    currentFilter = cat;
    
    // Update active class
    container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    renderMemoriesGrid();
  });
}

function renderFeaturedKenkey() {
  const container = document.getElementById('featured-kenkey-container');
  if (!container) return;

  const kenkey = memoriesArchive.find(m => m.id === 'kenkey-chronicles');
  if (!kenkey) return;

  container.innerHTML = `
    <div class="featured-memory-card" data-id="${kenkey.id}">
      <div class="featured-photo-frame" onclick="window.openLightboxById('${kenkey.id}')">
        <img src="${kenkey.image}" alt="${kenkey.title}" onerror="this.onerror=null; this.src='src/assets/images/ghanaian_kenkey_dish_1793902710052.jpg';" />
        <span class="featured-badge">${kenkey.categoryLabel}</span>
      </div>
      <div class="featured-content">
        <div class="meta-row">
          <span>${kenkey.date}</span>
          <span class="meta-separator">·</span>
          <span>${kenkey.stamp}</span>
        </div>
        <h3 class="featured-heading">${kenkey.title}</h3>
        <p class="featured-copy">${kenkey.caption}</p>
        <div class="featured-handwritten">
          "${kenkey.note}"
        </div>
        <div style="margin-top: 0.5rem;">
          <button class="btn btn-secondary" onclick="window.openLightboxById('${kenkey.id}')">
            View Memory Frame
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderMemoriesGrid() {
  const grid = document.getElementById('memories-grid');
  if (!grid) return;

  // Filter memories, excluding the featured one from the sub-grid if it has its own spotlight
  const filtered = memoriesArchive.filter(m => {
    if (m.id === 'kenkey-chronicles') return false; // shown in spotlight
    if (currentFilter === 'all') return true;
    return m.category === currentFilter;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--color-ink-muted);">
        <p class="font-serif" style="font-size: 1.25rem;">No memories in this collection yet.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((item, index) => {
    const rotation = item.rotation || 0;
    return `
      <div class="scrapbook-card reveal-on-scroll" style="transform: rotate(${rotation}deg);" onclick="window.openLightboxById('${item.id}')">
        <!-- Washi tape at random top corner -->
        <div class="washi-tape ${index % 2 === 0 ? 'pink' : ''}" style="top: -12px; left: ${20 + (index % 3) * 20}%;"></div>
        
        <div class="scrapbook-photo-wrap">
          <img src="${item.image}" alt="${item.title}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';" />
        </div>
        
        <div class="scrapbook-caption-title">${item.title}</div>
        <div class="scrapbook-handwritten-note">"${item.note}"</div>
        
        <div class="scrapbook-meta-footer">
          <span>${item.categoryLabel}</span>
          <span>${item.date}</span>
        </div>
      </div>
    `;
  }).join('');
}

function setupLightbox() {
  const overlay = document.getElementById('lightbox-modal');
  if (!overlay) return;

  const closeBtn = document.getElementById('lightbox-close');
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

// Global hook to open lightbox
window.openLightboxById = function(id) {
  const item = memoriesArchive.find(m => m.id === id);
  if (!item) return;

  const overlay = document.getElementById('lightbox-modal');
  const imgEl = document.getElementById('lightbox-image');
  const titleEl = document.getElementById('lightbox-title');
  const captionEl = document.getElementById('lightbox-caption');
  const noteEl = document.getElementById('lightbox-note');
  const metaEl = document.getElementById('lightbox-meta');

  if (imgEl) {
    imgEl.src = item.image;
    imgEl.onerror = () => {
      imgEl.src = item.id === 'kenkey-chronicles' 
        ? 'src/assets/images/ghanaian_kenkey_dish_1793902710052.jpg'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
    };
  }
  if (titleEl) titleEl.textContent = item.title;
  if (captionEl) captionEl.textContent = item.caption;
  if (noteEl) noteEl.textContent = `"${item.note}"`;
  if (metaEl) metaEl.textContent = `${item.categoryLabel} · ${item.date}`;

  if (overlay) overlay.classList.add('active');
};
