const PROJECTS = [
  {
    title: "Ruth's Bakery — Cakes & Treats Flyer",
    year: "2026",
    medium: "Business Flyer",
    image: "images/file_00000000077071f481b411dbb2f672e6.png"
  },
  {
    title: "Church Program Flyer",
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
    title: "Angela's Honey — Business Flyer",
    year: "2026",
    medium: "Business Flyer",
    image: "images/file_000000002f1871f48a7580e82efe2613.png"
  },
  {
    title: "Watchman — Sunday Service Flyer",
    year: "2026",
    medium: "Church Flyer",
    image: "images/file_00000000c3dc71f4b3ddc40d731ed504.png"
  },
  {
    title: "Favvy's Clothing & Accessories — Business Flyer",
    year: "2026",
    medium: "Business Flyer",
    image: "images/file_00000000159071f48e7036cfa792d116.png"
  }
];

const WATERMARK_TEXT = "LASTBORN CREATIVE - SAMPLE ONLY";

function buildWatermarkDataUri(text) {
  const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"200\"><text x=\"0\" y=\"100\" font-family=\"IBM Plex Mono, monospace\" font-size=\"16\" fill=\"#16140F\" transform=\"rotate(-28 150 100)\" text-anchor=\"middle\">" + text + "</text></svg>";
  return "url(\"data:image/svg+xml," + encodeURIComponent(svg) + "\")";
}

const watermarkStyle = buildWatermarkDataUri(WATERMARK_TEXT);

function renderGrid() {
  const grid = document.getElementById('workGrid');
  if (!grid) return;
  let html = '';
  for (let i = 0; i < PROJECTS.length; i++) {
    const p = PROJECTS[i];
    html += '<article class="work-card" data-index="' + i + '" tabindex="0" role="button" aria-label="Open ' + p.title + '">';
    html += '<div class="work-thumb-wrap">';
    html += '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy" oncontextmenu="return false;" draggable="false">';
    html += '<div class="watermark-tile" style="background-image: ' + watermarkStyle + ';"></div>';
    html += '</div>';
    html += '<div class="work-meta"><h3>' + p.title + '</h3><p class="mono">' + p.medium + '<br>' + p.year + '</p></div>';
    html += '</article>';
  }
  grid.innerHTML = html;

  const cards = grid.querySelectorAll('.work-card');
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      const idx = Number(card.dataset.index);
      trackImageClick(idx);
      openLightbox(idx);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        const idx = Number(card.dataset.index);
        trackImageClick(idx);
        openLightbox(idx);
      }
    });
  });
}

function trackImageClick(index) {
  const p = PROJECTS[index];
  if (!p) return;
  if (window.goatcounter && window.goatcounter.count) {
    window.goatcounter.count({
      path: "flyer-click-" + p.title,
      title: p.title,
      event: true
    });
  }
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxMeta = document.getElementById('lightboxMeta');
const lightboxIndex = document.getElementById('lightboxIndex');
const lightboxCloseBtn = document.getElementById('lightboxClose');

function openLightbox(index) {
  const p = PROJECTS[index];
  if (!p) return;
  lightboxImg.src = p.image;
  lightboxImg.alt = p.title;
  lightboxTitle.textContent = p.title;
  lightboxMeta.textContent = p.medium + " - " + p.year;
  lightboxIndex.textContent = "NO. " + String(index + 1).padStart(2, '0') + " / " + String(PROJECTS.length).padStart(2, '0');
  const overlay = document.querySelector('.watermark-overlay');
  if (overlay) overlay.style.backgroundImage = watermarkStyle;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

if (lightboxCloseBtn) {
  lightboxCloseBtn.addEventListener('click', closeLightbox);
}
if (lightbox) {
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});

document.addEventListener('dragstart', function (e) {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('contextmenu', function (e) {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

renderGrid();
