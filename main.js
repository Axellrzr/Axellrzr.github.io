/**
 * LRZR PRODUCTION — main.js
 * Vanilla JS pur, zéro dépendance.
 *
 * ================================================================
 * ⚠️  DONNÉES À MODIFIER — TOUT EST ICI
 * ================================================================
 */

'use strict';

/* ================================================================
   IMAGES DU CAROUSEL HERO
   5 photos qui défilent en fond sur la page d'accueil.
   → Mettre vos meilleures photos, toutes catégories confondues.
   → Chemins : assets/images/hero-1.jpg à hero-5.jpg
   ================================================================ */
const HERO_IMAGES = [
  { src: 'assets/images/hero-1.jpg', alt: 'Photo hero 1 — LRZR Production' },
  { src: 'assets/images/hero-2.jpg', alt: 'Photo hero 2 — LRZR Production' },
  { src: 'assets/images/hero-3.jpg', alt: 'Photo hero 3 — LRZR Production' },
  { src: 'assets/images/hero-4.jpg', alt: 'Photo hero 4 — LRZR Production' },
  { src: 'assets/images/hero-5.jpg', alt: 'Photo hero 5 — LRZR Production' },
];

/* ================================================================
   CATÉGORIES + PHOTOS
   Chaque catégorie a :
   - id       : identifiant unique (pas d'espace, pas d'accent)
   - label    : nom affiché
   - cover    : photo de couverture (vignette sur la page galerie)
   - coverAlt : texte alternatif de la couverture
   - photos   : tableau de toutes les photos de cette catégorie

   Pour chaque photo :
   - src : chemin vers le fichier image
   - alt : description accessible (important pour le SEO)

   AJOUTER UNE PHOTO : copier un bloc { src, alt } et l'ajouter
   RETIRER UNE PHOTO : supprimer le bloc correspondant
   ================================================================ */
const CATEGORIES = [
  {
    id:       'portrait',
    label:    'Portraits',
    cover:    'assets/images/portrait-01.jpg',
    coverAlt: 'Portrait — LRZR Production',
    photos: [
      { src: 'assets/images/portrait-01.jpg', alt: 'Portrait en lumière naturelle' },
      { src: 'assets/images/portrait-02.jpg', alt: 'Portrait studio fond sombre' },
      { src: 'assets/images/portrait-03.jpg', alt: 'Portrait extérieur environnement urbain' },
      { src: 'assets/images/portrait-04.jpg', alt: 'Portrait en contre-jour' },
    ],
  },
  {
    id:       'wildlife',
    label:    'Wildlife',
    cover:    'assets/images/wildlife-01.jpg',
    coverAlt: 'Wildlife — LRZR Production',
    photos: [
      { src: 'assets/images/wildlife-01.jpg', alt: 'Oiseau en vol, longue focale' },
      { src: 'assets/images/wildlife-02.jpg', alt: 'Mammifère dans son habitat naturel' },
      { src: 'assets/images/wildlife-03.jpg', alt: 'Insecte en macro, végétation' },
      { src: 'assets/images/wildlife-04.jpg', alt: 'Scène animalière au lever du soleil' },
    ],
  },
  {
    id:       'street',
    label:    'Street',
    cover:    'assets/images/street-01.jpg',
    coverAlt: 'Street photography — LRZR Production',
    photos: [
      { src: 'assets/images/street-01.jpg', alt: 'Scène de rue urbaine, lumière rasante' },
      { src: 'assets/images/street-02.jpg', alt: 'Silhouette sous la pluie, reflets pavés' },
      { src: 'assets/images/street-03.jpg', alt: 'Marché, foule et mouvement' },
      { src: 'assets/images/street-04.jpg', alt: 'Architecture et géométrie urbaine' },
    ],
  },
  {
    id:       'auto',
    label:    'Automobile',
    cover:    'assets/images/auto-01.jpg',
    coverAlt: 'Photographie automobile — LRZR Production',
    photos: [
      { src: 'assets/images/auto-01.jpg', alt: 'Voiture de sport, angle dynamique' },
      { src: 'assets/images/auto-02.jpg', alt: 'Détail carrosserie, reflets et lignes' },
      { src: 'assets/images/auto-03.jpg', alt: 'Véhicule en mouvement, filé' },
      { src: 'assets/images/auto-04.jpg', alt: 'Intérieur cockpit, ambiance' },
    ],
  },
  {
    id:       'produit',
    label:    'Produit',
    cover:    'assets/images/produit-01.jpg',
    coverAlt: 'Photographie produit — LRZR Production',
    photos: [
      { src: 'assets/images/produit-01.jpg', alt: 'Produit sur fond épuré, lumière studio' },
      { src: 'assets/images/produit-02.jpg', alt: 'Packshot cosmétique, rendu mat' },
      { src: 'assets/images/produit-03.jpg', alt: 'Bijou en macro, détail et brillance' },
      { src: 'assets/images/produit-04.jpg', alt: 'Mise en scène lifestyle produit' },
    ],
  },
];

/* ================================================================
   FIN DES DONNÉES — ne pas modifier en dessous sauf si vous
   savez ce que vous faites.
   ================================================================ */


/* ----------------------------------------------------------------
   INIT
   ---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initFooterYear();

  // Page d'accueil
  if (document.getElementById('hero-slides')) {
    initHeroCarousel();
    initCatCarouselPreview();
  }

  // Page galerie
  if (document.getElementById('cats-grid')) {
    initGalerie();
    initLightbox();
  }

  // Formulaire (page d'accueil)
  if (document.getElementById('contact-form')) {
    initContactForm();
  }
});


/* ----------------------------------------------------------------
   NAVIGATION — sticky + burger
   ---------------------------------------------------------------- */
function initNav() {
  const header  = document.querySelector('.site-header');
  const burger  = document.querySelector('.nav__burger');
  const navList = document.querySelector('.nav__links');
  const links   = document.querySelectorAll('.nav__links a');

  if (header && !header.classList.contains('scrolled')) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (burger && navList) {
    const toggle = (open) => {
      burger.classList.toggle('open', open);
      navList.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => toggle(!burger.classList.contains('open')));
    links.forEach(l => l.addEventListener('click', () => toggle(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
  }
}


/* ----------------------------------------------------------------
   SCROLL REVEAL
   ---------------------------------------------------------------- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach(el => obs.observe(el));
}

function observeNew(container) {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    }),
    { threshold: 0.08 }
  );
  container.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}


/* ----------------------------------------------------------------
   HERO CAROUSEL — défilement automatique toutes les 4 secondes
   ---------------------------------------------------------------- */
function initHeroCarousel() {
  const slidesEl = document.getElementById('hero-slides');
  const dotsEl   = document.getElementById('hero-dots');
  if (!slidesEl || !HERO_IMAGES.length) return;

  let current  = 0;
  let timer    = null;
  const total  = HERO_IMAGES.length;

  // Créer les slides
  HERO_IMAGES.forEach((img, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero__slide' + (i === 0 ? ' active' : '');
    slide.setAttribute('aria-hidden', i !== 0);
    slide.style.backgroundImage = `url('${escHtml(img.src)}')`;
    // Précharger les images
    const preload = new Image();
    preload.src = img.src;
    slidesEl.appendChild(slide);
  });

  // Créer les dots
  HERO_IMAGES.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    const slides = slidesEl.querySelectorAll('.hero__slide');
    const dots   = dotsEl.querySelectorAll('.hero__dot');

    slides[current].classList.remove('active');
    slides[current].setAttribute('aria-hidden', 'true');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    current = (index + total) % total;

    slides[current].classList.add('active');
    slides[current].setAttribute('aria-hidden', 'false');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function next() { goTo(current + 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 4000);
  }

  startTimer();

  // Pause au survol
  slidesEl.addEventListener('mouseenter', () => clearInterval(timer));
  slidesEl.addEventListener('mouseleave', startTimer);
}


/* ----------------------------------------------------------------
   CAROUSEL CATÉGORIES — aperçu page d'accueil
   ---------------------------------------------------------------- */
function initCatCarouselPreview() {
  const track   = document.getElementById('cat-track');
  const prevBtn = document.querySelector('.cat-carousel__btn--prev');
  const nextBtn = document.querySelector('.cat-carousel__btn--next');
  if (!track) return;

  // Injecter les cartes catégories
  CATEGORIES.forEach(cat => {
    const card = document.createElement('a');
    card.className = 'cat-card';
    card.href = `galerie.html#${cat.id}`;
    card.setAttribute('aria-label', `Voir la catégorie ${cat.label}`);
    card.innerHTML = `
      <img src="${escHtml(cat.cover)}" alt="${escHtml(cat.coverAlt)}" loading="lazy" width="400" height="500" />
      <div class="cat-card__overlay" aria-hidden="true">
        <span class="cat-card__label">${escHtml(cat.label)}</span>
        <span class="cat-card__count">${cat.photos.length} photos</span>
      </div>
    `;
    track.appendChild(card);
  });

  // Scroll buttons
  const scrollAmt = 340;
  prevBtn?.addEventListener('click', () => { track.scrollBy({ left: -scrollAmt, behavior: 'smooth' }); });
  nextBtn?.addEventListener('click', () => { track.scrollBy({ left:  scrollAmt, behavior: 'smooth' }); });
}


/* ----------------------------------------------------------------
   PAGE GALERIE — vue catégories + vue photos
   ---------------------------------------------------------------- */
function initGalerie() {
  const catsGrid   = document.getElementById('cats-grid');
  const catsSection  = document.getElementById('galerie-cats');
  const photosSection = document.getElementById('galerie-photos');
  const photosGrid = document.getElementById('photos-grid');
  const photosTitle = document.getElementById('galerie-photos-title');
  const backBtn    = document.getElementById('back-btn');

  if (!catsGrid) return;

  // Construire la grille des catégories
  CATEGORIES.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'cat-grid-card reveal';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Ouvrir la catégorie ${cat.label}`);
    card.dataset.catId = cat.id;
    card.innerHTML = `
      <img src="${escHtml(cat.cover)}" alt="${escHtml(cat.coverAlt)}" loading="lazy" width="600" height="750" />
      <div class="cat-grid-card__overlay" aria-hidden="true">
        <span class="cat-grid-card__label">${escHtml(cat.label)}</span>
        <span class="cat-grid-card__count">${cat.photos.length} photos</span>
      </div>
    `;
    card.addEventListener('click', () => openCategory(cat));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCategory(cat); } });
    catsGrid.appendChild(card);
  });

  observeNew(catsGrid);

  // Vérifier si une catégorie est demandée via l'ancre (#portrait, etc.)
  const hash = window.location.hash.slice(1);
  if (hash) {
    const cat = CATEGORIES.find(c => c.id === hash);
    if (cat) openCategory(cat);
  }

  // Retour aux catégories
  backBtn?.addEventListener('click', showCats);

  function openCategory(cat) {
    // Mettre à jour l'URL sans recharger
    history.pushState(null, '', `#${cat.id}`);

    // Vider et remplir la grille photos
    photosGrid.innerHTML = '';
    photosTitle.textContent = cat.label;

    // Stocker les photos pour la lightbox
    window._currentPhotos = cat.photos;

    cat.photos.forEach((photo, i) => {
      const item = document.createElement('div');
      item.className = 'photo-item reveal';
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', `Agrandir : ${photo.alt}`);
      item.dataset.index = i;
      item.innerHTML = `
        <img src="${escHtml(photo.src)}" alt="${escHtml(photo.alt)}" loading="lazy" width="800" height="600" />
        <div class="photo-item__overlay" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </div>
      `;
      item.addEventListener('click', () => openLightbox(i));
      item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); } });
      photosGrid.appendChild(item);
    });

    observeNew(photosGrid);

    // Afficher la section photos, masquer catégories
    catsSection.hidden = true;
    photosSection.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showCats() {
    photosSection.hidden = true;
    catsSection.hidden = false;
    history.pushState(null, '', 'galerie.html');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Bouton retour du navigateur
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const cat = CATEGORIES.find(c => c.id === hash);
      if (cat) openCategory(cat);
    } else {
      showCats();
    }
  });
}


/* ----------------------------------------------------------------
   LIGHTBOX
   ---------------------------------------------------------------- */
function initLightbox() {
  const lightbox  = document.getElementById('lightbox');
  const imgEl     = lightbox?.querySelector('.lightbox__img');
  const captionEl = lightbox?.querySelector('.lightbox__caption');
  const closeBtn  = lightbox?.querySelector('.lightbox__close');
  const prevBtn   = lightbox?.querySelector('.lightbox__prev');
  const nextBtn   = lightbox?.querySelector('.lightbox__next');

  if (!lightbox) return;

  let currentIndex = 0;

  window.openLightbox = function(index) {
    const photos = window._currentPhotos || [];
    if (!photos.length) return;
    currentIndex = Math.max(0, Math.min(index, photos.length - 1));
    imgEl.src = photos[currentIndex].src;
    imgEl.alt = photos[currentIndex].alt;
    if (captionEl) captionEl.textContent = photos[currentIndex].alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    const photos = window._currentPhotos || [];
    openLightbox((currentIndex + dir + photos.length) % photos.length);
  }

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => navigate(-1));
  nextBtn?.addEventListener('click', () => navigate(1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}


/* ----------------------------------------------------------------
   FORMULAIRE CONTACT
   ---------------------------------------------------------------- */
function initContactForm() {
  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const feedback  = document.getElementById('form-feedback');
  const btnText   = submitBtn?.querySelector('.btn-text');
  const btnLoad   = submitBtn?.querySelector('.btn-loading');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    submitBtn.disabled = true;
    btnText?.setAttribute('hidden', '');
    btnLoad?.removeAttribute('hidden');
    if (feedback) { feedback.textContent = ''; feedback.className = 'form-feedback'; }

    try {
      const res  = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const data = await res.json();
      if (data.success) {
        form.reset();
        showFeedback('✓ Message envoyé ! Je vous réponds rapidement.', 'success');
      } else {
        showFeedback('✕ ' + (data.message || 'Erreur. Réessayez ou écrivez-moi directement.'), 'error');
      }
    } catch {
      showFeedback('✕ Erreur réseau. Vérifiez votre connexion.', 'error');
    } finally {
      submitBtn.disabled = false;
      btnText?.removeAttribute('hidden');
      btnLoad?.setAttribute('hidden', '');
    }
  });

  function showFeedback(msg, type) {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = `form-feedback ${type}`;
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}


/* ----------------------------------------------------------------
   FOOTER ANNÉE
   ---------------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}


/* ----------------------------------------------------------------
   UTILITAIRE — échapper HTML
   ---------------------------------------------------------------- */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
