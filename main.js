/**
 * LRZR PRODUCTION — main.js
 * Vanilla JS pur, zéro dépendance externe.
 *
 * SOMMAIRE :
 * 1.  DONNÉES PORTFOLIO — ⚠️ MODIFIER ICI pour ajouter vos travaux
 * 2.  Initialisation
 * 3.  Navigation (sticky + burger)
 * 4.  Scroll reveal (Intersection Observer)
 * 5.  Portfolio — rendu grille
 * 6.  Portfolio — filtres
 * 7.  Lightbox photos
 * 8.  Vidéo facade (YouTube / Vimeo)
 * 9.  Formulaire de contact (Web3Forms)
 * 10. Footer — année dynamique
 */

'use strict';

/* ================================================================
   1. DONNÉES PORTFOLIO
   ⚠️  MODIFIER CES TABLEAUX pour ajouter/supprimer vos travaux.

   IMAGES (photo + drone) :
   - src      : chemin local (ex: "assets/images/photo-foret.jpg")
   - alt      : description accessible — IMPORTANT pour le SEO
   - title    : affiché au survol
   - category : "photo" | "drone"  (utilisé pour le filtre)
   - size     : "sm" | "md" | "lg" | "xl"  (largeur dans la grille)

   VIDÉOS (video + drone vidéo) :
   - thumb    : vignette locale (ex: "assets/images/thumb-clip.jpg")
   - thumbAlt : alt de la vignette
   - title    : affiché au survol
   - embed    : URL d'embed YouTube (https://www.youtube.com/embed/VIDEO_ID?autoplay=1)
                ou Vimeo (https://player.vimeo.com/video/VIDEO_ID?autoplay=1)
   - category : "video" | "drone"
   - size     : "sm" | "md" | "lg" | "xl"
   ================================================================ */

const PORTFOLIO_IMAGES = [
  {
    src:      'assets/images/photo-portrait-01.jpg',
    alt:      'Portrait en lumière naturelle, bokeh profond, sujet masculin regardant hors cadre',
    title:    'Portrait — Lumière naturelle',
    category: 'photo',
    size:     'md',
  },
  {
    src:      'assets/images/photo-wildlife-01.jpg',
    alt:      'Rouge-gorge posé sur une branche au bord d\'un ruisseau, bokeh végétal vert',
    title:    'Wildlife — Rouge-gorge',
    category: 'photo',
    size:     'lg',
  },
  {
    src:      'assets/images/photo-concert-01.jpg',
    alt:      'Concert en salle, lumières colorées, chanteur sur scène, foule en contrebas',
    title:    'Concert — Live',
    category: 'photo',
    size:     'md',
  },
  {
    src:      'assets/images/photo-street-01.jpg',
    alt:      'Photographie de rue urbaine, silhouette sous la pluie, reflets pavés mouillés',
    title:    'Street — Paris',
    category: 'photo',
    size:     'sm',
  },
  {
    src:      'assets/images/drone-aerial-01.jpg',
    alt:      'Vue aérienne FPV d\'un événement sportif, circuit de rallye vu du dessus',
    title:    'FPV — Événement sportif',
    category: 'drone',
    size:     'lg',
  },
  {
    src:      'assets/images/photo-event-01.jpg',
    alt:      'Photographie d\'événement corporate, ambiance feutrée, tables dressées',
    title:    'Événement — Corporate',
    category: 'photo',
    size:     'sm',
  },
];

const PORTFOLIO_VIDEOS = [
  {
    thumb:    'assets/images/thumb-clip-01.jpg',
    thumbAlt: 'Extrait de clip musical tourné en forêt, lumière tamisée, artiste de face',
    title:    'Clip musical — Artiste solo',
    /* Remplacer VIDEO_ID par l'ID YouTube de votre vidéo */
    embed:    'https://www.youtube.com/embed/VIDEO_ID?autoplay=1&rel=0',
    category: 'video',
    size:     'md',
  },
  {
    thumb:    'assets/images/thumb-fpv-01.jpg',
    thumbAlt: 'Vue FPV rasante au-dessus d\'un lac, reflets de coucher de soleil sur l\'eau',
    title:    'FPV Cinematic — Lac',
    embed:    'https://www.youtube.com/embed/VIDEO_ID_2?autoplay=1&rel=0',
    category: 'drone',
    size:     'md',
  },
  {
    thumb:    'assets/images/thumb-instit-01.jpg',
    thumbAlt: 'Film institutionnel, employés en situation de travail, bureau lumineux',
    title:    'Film institutionnel',
    embed:    'https://www.youtube.com/embed/VIDEO_ID_3?autoplay=1&rel=0',
    category: 'video',
    size:     'lg',
  },
];


/* ================================================================
   2. INITIALISATION
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initPortfolio();
  initLightbox();
  initContactForm();
  initFooterYear();
});


/* ================================================================
   3. NAVIGATION — sticky au scroll + burger mobile
   ================================================================ */

function initNav() {
  const header  = document.querySelector('.site-header');
  const burger  = document.querySelector('.nav__burger');
  const navList = document.querySelector('.nav__links');
  const navLinks = document.querySelectorAll('.nav__links a');

  // Ajouter la classe scrolled après 80px de scroll
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Appel initial

  // Burger mobile — toggle menu
  if (burger && navList) {
    const toggleMenu = (open) => {
      burger.classList.toggle('open', open);
      navList.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };

    burger.addEventListener('click', () => {
      const isOpen = burger.classList.contains('open');
      toggleMenu(!isOpen);
    });

    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') toggleMenu(false);
    });
  }
}


/* ================================================================
   4. SCROLL REVEAL — Intersection Observer
   ================================================================ */

function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Animer une seule fois
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealEls.forEach(el => observer.observe(el));
}


/* ================================================================
   5. PORTFOLIO — rendu de la grille
   ================================================================ */

/**
 * Combine images et vidéos, génère le HTML de la grille.
 * Les items sont marqués avec data-category pour le filtrage.
 */
function initPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  // Combiner et mélanger images + vidéos
  const allItems = buildPortfolioItems();
  grid.innerHTML = allItems.map(renderItem).join('');

  // Attacher les événements lightbox aux images
  grid.querySelectorAll('[data-lightbox]').forEach((el, idx) => {
    el.addEventListener('click', () => openLightbox(idx));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  // Attacher les facades vidéo
  grid.querySelectorAll('.video-facade').forEach(facade => {
    facade.addEventListener('click', () => activateVideoFacade(facade));
  });

  // Scroll reveal sur les items générés
  grid.querySelectorAll('.portfolio-item').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
    el.classList.add('reveal');
    // Réobserver avec le scroll reveal
  });

  // Réobserver les nouveaux éléments .reveal dans la grille
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Initialiser le filtre
  initPortfolioFilters();
}

/**
 * Construit le tableau unifié des items portfolio avec index lightbox.
 * Seules les IMAGES ont un index lightbox (les vidéos n'utilisent pas la lightbox).
 */
let lightboxImages = []; // Tableau global pour la lightbox

function buildPortfolioItems() {
  lightboxImages = PORTFOLIO_IMAGES.map(img => img); // Référence pour la lightbox

  // Mélanger images et vidéos de façon déterministe
  const imgItems = PORTFOLIO_IMAGES.map((img, i) => ({ ...img, type: 'image', lightboxIndex: i }));
  const vidItems = PORTFOLIO_VIDEOS.map(vid => ({ ...vid, type: 'video' }));

  // Intercaler : image, image, vidéo, image, vidéo...
  const result = [];
  let ii = 0, vi = 0;
  while (ii < imgItems.length || vi < vidItems.length) {
    if (ii < imgItems.length) result.push(imgItems[ii++]);
    if (ii < imgItems.length) result.push(imgItems[ii++]);
    if (vi < vidItems.length) result.push(vidItems[vi++]);
  }
  return result;
}

function renderItem(item) {
  const sizeClass = `portfolio-item--${item.size || 'md'}`;

  if (item.type === 'image') {
    return `
      <div class="portfolio-item ${sizeClass}" data-category="${item.category}"
           data-lightbox="${item.lightboxIndex}" tabindex="0"
           role="button" aria-label="Agrandir : ${item.title}">
        <img
          class="portfolio-item__media"
          src="${escHtml(item.src)}"
          alt="${escHtml(item.alt)}"
          loading="lazy"
          width="800"
          height="600"
        />
        <div class="portfolio-item__overlay" aria-hidden="true">
          <div class="portfolio-item__info">
            <p class="portfolio-item__title">${escHtml(item.title)}</p>
            <p class="portfolio-item__cat">${labelForCategory(item.category)}</p>
          </div>
        </div>
        <span class="portfolio-item__badge" aria-hidden="true">${labelForCategory(item.category)}</span>
      </div>
    `;
  }

  // Vidéo — facade pattern (l'iframe ne se charge qu'au clic)
  return `
    <div class="portfolio-item ${sizeClass}" data-category="${item.category}">
      <div class="video-facade" data-embed="${escHtml(item.embed)}" role="button"
           tabindex="0" aria-label="Lire la vidéo : ${escHtml(item.title)}">
        <img
          class="video-facade__thumb"
          src="${escHtml(item.thumb)}"
          alt="${escHtml(item.thumbAlt)}"
          loading="lazy"
          width="800"
          height="450"
        />
        <div class="video-facade__play" aria-hidden="true">
          <!-- Icône play SVG -->
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="39" stroke="white" stroke-opacity="0.4" stroke-width="1.5"/>
            <path d="M33 28l22 12-22 12V28z" fill="white"/>
          </svg>
        </div>
        <iframe
          title="${escHtml(item.title)}"
          src=""
          allow="autoplay; encrypted-media; fullscreen"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
      <div class="portfolio-item__overlay" aria-hidden="true">
        <div class="portfolio-item__info">
          <p class="portfolio-item__title">${escHtml(item.title)}</p>
          <p class="portfolio-item__cat">${labelForCategory(item.category)}</p>
        </div>
      </div>
      <span class="portfolio-item__badge" aria-hidden="true">${labelForCategory(item.category)}</span>
    </div>
  `;
}

/** Libellés lisibles par catégorie */
function labelForCategory(cat) {
  const labels = { photo: 'Photo', video: 'Vidéo', drone: 'Drone FPV' };
  return labels[cat] || cat;
}

/** Échapper les caractères HTML — sécurité basique */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


/* ================================================================
   6. PORTFOLIO — FILTRES
   ================================================================ */

function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('portfolio-grid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Mise à jour des boutons
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filtrage des items
      const items = grid.querySelectorAll('.portfolio-item');
      items.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.style.display = match ? '' : 'none';
        // Ré-animer les items qui redeviennent visibles
        if (match) {
          item.classList.remove('visible');
          requestAnimationFrame(() => item.classList.add('visible'));
        }
      });
    });
  });
}


/* ================================================================
   7. LIGHTBOX PHOTOS
   ================================================================ */

let currentLightboxIndex = 0;

function initLightbox() {
  const lightbox  = document.getElementById('lightbox');
  const closeBtn  = lightbox?.querySelector('.lightbox__close');
  const prevBtn   = lightbox?.querySelector('.lightbox__prev');
  const nextBtn   = lightbox?.querySelector('.lightbox__next');
  const imgEl     = lightbox?.querySelector('.lightbox__img');
  const captionEl = lightbox?.querySelector('.lightbox__caption');

  if (!lightbox || !imgEl) return;

  // Fermer
  closeBtn?.addEventListener('click', closeLightbox);

  // Overlay clic pour fermer
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Navigation
  prevBtn?.addEventListener('click', () => navigateLightbox(-1));
  nextBtn?.addEventListener('click', () => navigateLightbox(1));

  // Clavier
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigateLightbox(-1);
    if (e.key === 'ArrowRight')  navigateLightbox(1);
  });

  /** Ouvre la lightbox à l'index donné */
  window.openLightbox = function(index) {
    if (!lightboxImages.length) return;
    currentLightboxIndex = Math.max(0, Math.min(index, lightboxImages.length - 1));
    const item = lightboxImages[currentLightboxIndex];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    if (captionEl) captionEl.textContent = item.title || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    // Remettre le focus sur l'item qui a ouvert la lightbox
    const trigger = document.querySelector(`[data-lightbox="${currentLightboxIndex}"]`);
    trigger?.focus();
  }

  function navigateLightbox(direction) {
    const next = (currentLightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
    openLightbox(next);
  }
}


/* ================================================================
   8. VIDÉO FACADE — charger l'iframe au clic seulement
   ================================================================ */

function activateVideoFacade(facade) {
  const embedUrl = facade.dataset.embed;
  const iframe   = facade.querySelector('iframe');

  if (!embedUrl || !iframe) return;

  iframe.src = embedUrl;
  facade.classList.add('playing');
}


/* ================================================================
   9. FORMULAIRE DE CONTACT — Web3Forms
   ================================================================ */

function initContactForm() {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const feedback   = document.getElementById('form-feedback');
  const btnText    = submitBtn?.querySelector('.btn-text');
  const btnLoading = submitBtn?.querySelector('.btn-loading');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Vérification HTML5 native
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // UI — état chargement
    submitBtn.disabled = true;
    btnText?.setAttribute('hidden', '');
    btnLoading?.removeAttribute('hidden');
    if (feedback) {
      feedback.textContent = '';
      feedback.className = 'form-feedback';
    }

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      const data = await response.json();

      if (data.success) {
        // Succès
        form.reset();
        showFeedback('✓ Message envoyé ! Je vous réponds dans les plus brefs délais.', 'success');
      } else {
        // Erreur API
        const msg = data.message || 'Une erreur est survenue. Réessayez ou écrivez-moi directement par email.';
        showFeedback('✕ ' + msg, 'error');
      }
    } catch (err) {
      // Erreur réseau
      showFeedback('✕ Erreur réseau. Vérifiez votre connexion ou écrivez-moi par email.', 'error');
    } finally {
      // Restaurer le bouton
      submitBtn.disabled = false;
      btnText?.removeAttribute('hidden');
      btnLoading?.setAttribute('hidden', '');
    }
  });

  function showFeedback(message, type) {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = `form-feedback ${type}`;
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}


/* ================================================================
   10. FOOTER — ANNÉE DYNAMIQUE
   ================================================================ */

function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
