/* ============================================================
   EDIT THIS ARRAY to add your own projects.
   - title:  project name
   - year:   year completed
   - medium: e.g. "Brand Identity", "Poster Series", "Packaging"
   - image:  path to your image (put files in the /images folder)
     Recommended: web-res only, 1200-1600px on the long edge, 72-150dpi.
     Never upload your full-resolution source or print files here.
   ============================================================ */
const PROJECTS = [
  {
    title: "Nord Coffee — Brand Identity",
    year: "2025",
    medium: "Brand Identity",
    image: "https://picsum.photos/seed/nordcoffee/1200/900"
  },
  {
    title: "Kinetic Festival — Poster Series",
    year: "2025",
    medium: "Poster / Print",
    image: "https://picsum.photos/seed/kinetic/1200/900"
  },
  {
    title: "Hearth & Co. — Packaging",
    year: "2024",
    medium: "Packaging",
    image: "https://picsum.photos/seed/hearth/1200/900"
  },
  {
    title: "Studio Vantage — Web Redesign",
    year: "2024",
    medium: "Digital / UI",
    image: "https://picsum.photos/seed/vantage/1200/900"
  },
  {
    title: "Marrow Records — Album Art",
    year: "2023",
    medium: "Album Art",
    image: "https://picsum.photos/seed/marrow/1200/900"
  },
  {
    title: "Fieldnote — Editorial Layout",
    year: "2023",
    medium: "Editorial",
    image: "https://picsum.photos/seed/fieldnote/1200/900"
  }
];

/* Your watermark text — change to your name or initials */
const WATERMARK_TEXT = "YOUR NAME · SAMPLE ONLY";

/* Build a tiled diagonal watermark as an SVG data URI.
   This is baked over every preview image so any screenshot
   or saved file carries visible, hard-to-remove attribution. */
function buildWatermarkDataUri(text) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      <text x="0" y="100" font-family="IBM Plex Mono, monospace" font-size="16"
            fill="#16140F" transform="rotate(-28 150 100)"
            text-anchor="middle">${text}</text>
    </svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const watermarkStyle = buildWatermarkDataUri(WATERMARK_TEXT);

function renderGrid() {
  const grid = document.getElementById('workGrid');
  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="work-card" data-index="${i}" tabindex="0" role="button"
              aria-label="Open ${p.title}">
      <div class="work-thumb-wrap">
        <img src="${p.image}" alt="${p.title}" loading="lazy"
             oncontextmenu="return false;" draggable="false">
        <div class="watermark-tile" style="background-image: ${watermarkStyle};"></div>
      </div>
      <div class="work-meta">
        <h3>${p.title}</h3>
        <p class="mono">${p.medium}<br>${p.year}</p>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => openLightbox(Number(card.dataset.index)));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(Number(card.dataset.index));
    });
  });
}

/* ---------- Lightbox ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxMeta = document.getElementById('lightboxMeta');
const lightboxIndex = document.getElementById('lightboxIndex');

function openLightbox(index) {
  const p = PROJECTS[index];
  lightboxImg.src = p.image;
  lightboxImg.alt = p.title;
  lightboxTitle.textContent = p.title;
  lightboxMeta.textContent = `${p.medium} — ${p.year}`;
  lightboxIndex.textContent = `NO. ${String(index + 1).padStart(2, '0')} / ${String(PROJECTS.length).padStart(2, '0')}`;
  document.querySelector('.watermark-overlay').style.backgroundImage = watermarkStyle;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

/* ---------- Basic copy friction ----------
   Note: none of this stops a determined visitor — screenshots and
   devtools can always capture what the browser renders. This just
   removes the easy, casual ways to save a full-res-looking file. */
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

/* Footer year */
document.getElementById('year').textContent = new Date().getFullYear();

renderGrid();
