const PROJECTS = [
  {
    title: "Ruth's Bakery — Cakes & Treats Flyer",
    year: "2026",
    medium: "Business Flyer",
    image: "images/file_00000000077071f481b411dbb2f672e6.png"
  },
  {
    title: "Favvy's Clothing & Accessories — Business Flyer",
    year: "2026",
    medium: "Business Flyer",
    image: "images/file_00000000159071f48e7036cfa792d116.png"
  },
  {
    title: "Angela's Honey — Business Flyer",
    year: "2026",
    medium: "Business Flyer",
    image: "images/file_000000002f1871f48a7580e82efe2613.png"
  },
  {
    title: "The Lord's Chosen — Youth Programme Flyer",
    year: "2026",
    medium: "Church Event Flyer",
    image: "images/file_0000000043c4724385770f2a5da737f2.png"
  },
  {
    title: "Redeemers Baptist — Sunday Service Flyer",
    year: "2026",
    medium: "Church Flyer",
    image: "images/file_000000004ad471f4a62c98086a3710a0.png"
  },
  {
    title: "Watchman — Sunday Service Flyer",
    year: "2026",
    medium: "Church Flyer",
    image: "images/file_00000000c3dc71f4b3ddc40d731ed504.png"
  }
];

const WATERMARK_TEXT = "LASTBORN CREATIVE · SAMPLE ONLY";

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
      if (e.key === 'Enter' || e.key === ' ') {
        openLightbox(Number(card.dataset.index));
      }
    });
  });
}

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
  lightboxIndex.textContent =
    `NO. ${String(index + 1).padStart(2, '0')} / ${String(PROJECTS.length).padStart(2, '0')}`;

  document.querySelector('.watermark-overlay').style.backgroundImage = watermarkStyle;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

document.getElementById('year').textContent = new Date().getFullYear();

renderGrid();
