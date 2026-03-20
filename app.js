// =============================================
// PowerPoint Interface – Sorting of Assets
// =============================================

// --- Viewport offset for external testing tools ---
// Use ?offset=300 (pixels) in the URL to shrink the viewport from the right,
// preventing an external tool's panel from covering the task pane.
(function applyTestingOffset() {
  const offset = parseInt(new URLSearchParams(window.location.search).get('offset'), 10);
  if (offset > 0) {
    document.documentElement.style.width = `calc(100vw - ${offset}px)`;
    document.documentElement.style.overflow = 'hidden';
  }
})();

// --- Mock Data ---
const MOCK_DATA = {
  folders: [
    { id: 'f1', name: 'Global', type: 'folder', modified: '2026-03-13T14:30:00' },
    { id: 'f2', name: 'Product', type: 'folder', modified: '2026-03-10T09:15:00' },
    { id: 'f3', name: 'Commercial (NEW)', type: 'folder', modified: '2026-03-08T16:45:00' },
  ],
  slides: [
    { id: 'a1', name: 'Introduction to academy', type: 'slide', modified: '2026-03-14T10:30:00', color: 1 },
    { id: 'a2', name: 'Our market analysis', type: 'slide', modified: '2026-03-14T08:00:00', color: 2 },
    { id: 'a3', name: 'Competitive edge', type: 'slide', modified: '2026-03-13T14:20:00', color: 3 },
    { id: 'a4', name: 'Personalized engagement', type: 'slide', modified: '2026-03-12T09:45:00', color: 4 },
    { id: 'a5', name: 'Competitive landscape', type: 'slide', modified: '2026-03-10T15:10:00', color: 5 },
    { id: 'a6', name: 'Diverse range of solutions', type: 'slide', modified: '2026-03-08T08:00:00', color: 1 },
    { id: 'a7', name: 'Building long-term relationships', type: 'slide', modified: '2026-03-05T11:30:00', color: 3 },
    { id: 'a8', name: 'Market demands', type: 'slide', modified: '2026-03-01T09:00:00', color: 2 },
    { id: 'a9', name: 'Industry overview', type: 'slide', modified: '2026-02-20T14:00:00', color: 4 },
    { id: 'a10', name: 'Product roadmap', type: 'slide', modified: '2026-03-14T11:45:00', color: 2 },
    { id: 'a11', name: 'Feature highlights', type: 'slide', modified: '2026-03-11T11:30:00', color: 1 },
    { id: 'a12', name: 'Technical architecture', type: 'slide', modified: '2026-03-07T14:00:00', color: 3 },
  ],
  folderContents: {
    f1: {
      folders: [
        { id: 'f1_1', name: 'Brand guidelines', type: 'folder', modified: '2026-03-11T10:00:00' },
        { id: 'f1_2', name: 'Corporate templates', type: 'folder', modified: '2026-03-09T14:00:00' },
      ],
      slides: [
        { id: 'g1', name: 'Company overview', type: 'slide', modified: '2026-03-12T10:00:00', color: 1 },
        { id: 'g2', name: 'Mission and values', type: 'slide', modified: '2026-03-10T14:00:00', color: 2 },
        { id: 'g3', name: 'Leadership team', type: 'slide', modified: '2026-03-08T09:00:00', color: 4 },
      ],
    },
    f1_1: {
      folders: [
        { id: 'f1_1_1', name: 'Logo assets', type: 'folder', modified: '2026-03-10T09:00:00' },
      ],
      slides: [
        { id: 'b1', name: 'Brand colors overview', type: 'slide', modified: '2026-03-10T11:00:00', color: 2 },
        { id: 'b2', name: 'Typography standards', type: 'slide', modified: '2026-03-09T15:00:00', color: 3 },
        { id: 'b3', name: 'Visual identity guide', type: 'slide', modified: '2026-03-08T10:00:00', color: 1 },
      ],
    },
    f1_1_1: {
      folders: [],
      slides: [
        { id: 'l1', name: 'Primary logo usage', type: 'slide', modified: '2026-03-09T12:00:00', color: 4 },
        { id: 'l2', name: 'Logo clearspace rules', type: 'slide', modified: '2026-03-08T14:00:00', color: 5 },
        { id: 'l3', name: 'Co-branding guidelines', type: 'slide', modified: '2026-03-07T09:30:00', color: 2 },
      ],
    },
    f1_2: {
      folders: [],
      slides: [
        { id: 't1', name: 'Executive presentation', type: 'slide', modified: '2026-03-09T10:00:00', color: 1 },
        { id: 't2', name: 'All-hands meeting', type: 'slide', modified: '2026-03-08T08:00:00', color: 3 },
      ],
    },
    f2: {
      folders: [
        { id: 'f2_1', name: 'Engineering', type: 'folder', modified: '2026-03-13T10:00:00' },
        { id: 'f2_2', name: 'Design', type: 'folder', modified: '2026-03-12T09:00:00' },
      ],
      slides: [
        { id: 'p1', name: 'Product roadmap', type: 'slide', modified: '2026-03-14T12:00:00', color: 2 },
        { id: 'p2', name: 'Feature prioritization', type: 'slide', modified: '2026-03-13T16:30:00', color: 1 },
        { id: 'p3', name: 'Sprint velocity', type: 'slide', modified: '2026-03-13T11:00:00', color: 5 },
        { id: 'p4', name: 'User research findings', type: 'slide', modified: '2026-03-12T15:45:00', color: 3 },
        { id: 'p5', name: 'Platform architecture', type: 'slide', modified: '2026-03-12T09:30:00', color: 4 },
        { id: 'p6', name: 'API integration plan', type: 'slide', modified: '2026-03-11T14:00:00', color: 2 },
        { id: 'p7', name: 'Mobile app strategy', type: 'slide', modified: '2026-03-11T08:15:00', color: 1 },
        { id: 'p8', name: 'Performance benchmarks', type: 'slide', modified: '2026-03-10T16:00:00', color: 5 },
        { id: 'p9', name: 'Security compliance', type: 'slide', modified: '2026-03-10T10:30:00', color: 3 },
        { id: 'p10', name: 'Data pipeline overview', type: 'slide', modified: '2026-03-09T13:00:00', color: 4 },
        { id: 'p11', name: 'Release schedule Q2', type: 'slide', modified: '2026-03-08T11:00:00', color: 2 },
        { id: 'p12', name: 'Customer feedback summary', type: 'slide', modified: '2026-03-07T15:30:00', color: 1 },
        { id: 'p13', name: 'Onboarding flow redesign', type: 'slide', modified: '2026-03-06T09:00:00', color: 3 },
        { id: 'p14', name: 'Analytics dashboard', type: 'slide', modified: '2026-03-05T14:00:00', color: 5 },
        { id: 'p15', name: 'Accessibility audit results', type: 'slide', modified: '2026-03-04T10:00:00', color: 4 },
        { id: 'p16', name: 'Localization roadmap', type: 'slide', modified: '2026-03-03T08:30:00', color: 2 },
        { id: 'p17', name: 'Design system updates', type: 'slide', modified: '2026-03-02T12:00:00', color: 1 },
        { id: 'p18', name: 'Infrastructure cost analysis', type: 'slide', modified: '2026-02-28T16:00:00', color: 3 },
      ],
    },
    f2_1: {
      folders: [
        { id: 'f2_1_1', name: 'Backend', type: 'folder', modified: '2026-03-12T11:00:00' },
      ],
      slides: [
        { id: 'e1', name: 'System architecture', type: 'slide', modified: '2026-03-13T09:00:00', color: 4 },
        { id: 'e2', name: 'Tech stack overview', type: 'slide', modified: '2026-03-12T14:00:00', color: 2 },
      ],
    },
    f2_1_1: {
      folders: [],
      slides: [
        { id: 'be1', name: 'API documentation', type: 'slide', modified: '2026-03-12T10:00:00', color: 3 },
        { id: 'be2', name: 'Database schema', type: 'slide', modified: '2026-03-11T16:00:00', color: 5 },
        { id: 'be3', name: 'Microservices overview', type: 'slide', modified: '2026-03-10T12:00:00', color: 1 },
      ],
    },
    f2_2: {
      folders: [],
      slides: [
        { id: 'd1', name: 'Design system components', type: 'slide', modified: '2026-03-12T08:00:00', color: 1 },
        { id: 'd2', name: 'User flow diagrams', type: 'slide', modified: '2026-03-11T10:00:00', color: 4 },
      ],
    },
    f3: {
      folders: [
        { id: 'f3_1', name: 'Case studies', type: 'folder', modified: '2026-03-10T09:00:00' },
      ],
      slides: [
        { id: 'c1', name: 'Sales enablement deck', type: 'slide', modified: '2026-03-11T10:00:00', color: 1 },
        { id: 'c2', name: 'Pricing strategy', type: 'slide', modified: '2026-03-09T14:30:00', color: 5 },
        { id: 'c3', name: 'Partner program overview', type: 'slide', modified: '2026-03-07T09:00:00', color: 2 },
      ],
    },
    f3_1: {
      folders: [],
      slides: [
        { id: 'cs1', name: 'Enterprise client win', type: 'slide', modified: '2026-03-10T08:00:00', color: 3 },
        { id: 'cs2', name: 'SMB success story', type: 'slide', modified: '2026-03-09T11:00:00', color: 2 },
      ],
    },
  },
};

// Slide thumbnails data
const SLIDES = [
  { num: 1, title: 'Product Initiatives', sub: 'Strategic roadmap and priorities for Q2 2026', body: 'Aligning product vision with market opportunities', tags: ['Strategy', 'Roadmap'], hasLogo: true },
  { num: 2, title: 'Product roadmap', sub: 'Key milestones and timeline', body: 'Delivery targets across engineering and design', tags: ['Planning'], hasChart: false },
  { num: 3, title: 'Feature highlights', sub: 'What we are building', body: 'Core capabilities launching this quarter', tags: ['Features', 'Q2'], hasChart: false },
  { num: 4, title: 'Market demands', sub: 'Customer needs and trends', body: 'Data-driven insights from user research', tags: ['Research'], hasChart: true },
  { num: 5, title: 'Competitive landscape', sub: 'Positioning and differentiation', body: 'How we compare across key dimensions', tags: ['Analysis'], hasChart: true },
  { num: 6, title: 'Industry overview', sub: 'Market context and opportunity', body: 'Sector trends and growth forecasts', tags: ['Market'], hasChart: true },
];

// --- State ---
let currentSort = 'date-desc';
let currentFolder = null;
let folderStack = []; // breadcrumb trail: [{id, name}, ...]
let searchQuery = '';
let viewMode = 'grid'; // 'grid' or 'list'
let showFavorites = false;
const favoritedIds = new Set();

// --- DOM ---
const sortBtn = document.getElementById('sortBtn');
const sortDropdown = document.getElementById('sortDropdown');
const assetList = document.getElementById('assetList');
const searchInput = document.getElementById('searchInput');
const breadcrumbBar = document.getElementById('breadcrumbBar');
const breadcrumbBack = document.getElementById('breadcrumbBack');
const breadcrumbPath = document.getElementById('breadcrumbPath');

const BREADCRUMB_ROOT_ICON = `<svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 0C15.1046 0 16 0.895431 16 2V10C16 11.1046 15.1046 12 14 12H2C0.895431 12 0 11.1046 0 10V2C0 0.895431 0.895431 0 2 0H14ZM5 5C5 5.55228 4.55228 6 4 6H2C2 7.65685 3.34315 9 5 9C6.65685 9 8 7.65685 8 6C8 4.34315 6.65685 3 5 3V5ZM10 7C9.44771 7 9 7.44772 9 8C9 8.55229 9.44771 9 10 9H13C13.5523 9 14 8.55229 14 8C14 7.44772 13.5523 7 13 7H10ZM10 3C9.44771 3 9 3.44772 9 4C9 4.55228 9.44771 5 10 5H13C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H10Z" fill="#4A61ED"/></svg>`;

// Navigate back one level
breadcrumbBack.addEventListener('click', () => {
  if (folderStack.length > 1) {
    folderStack.pop();
    currentFolder = folderStack[folderStack.length - 1].id;
  } else {
    folderStack = [];
    currentFolder = null;
  }
  render();
});

function navigateToRoot() {
  folderStack = [];
  currentFolder = null;
  showFavorites = false;
  updateFavoritesNavBtn();
  render();
}

// --- Favorites view ---
document.getElementById('favoritesNavBtn').addEventListener('click', () => {
  showFavorites = !showFavorites;
  if (showFavorites) {
    currentFolder = null;
    folderStack = [];
  }
  updateFavoritesNavBtn();
  render();
});

function updateFavoritesNavBtn() {
  const btn = document.getElementById('favoritesNavBtn');
  const title = document.getElementById('browseTitle');
  if (showFavorites) {
    btn.classList.add('active');
    title.textContent = 'Favorites';
  } else {
    btn.classList.remove('active');
    title.textContent = 'Slides & assets';
  }
}

// Descriptions for favorites cards
const SLIDE_DESCRIPTIONS = {
  a1: 'Introduction slides for academy sessions',
  a2: 'Updated external facing analysis',
  a3: 'Commercial slides for competitive edge',
  a4: 'Personalized engagement strategies',
  a5: 'Competitive landscape overview',
  a6: 'Diverse range of solutions overview',
  a7: 'Building long-term client relationships',
  a8: 'Market demands and industry trends',
  a9: 'Industry overview and key metrics',
  a10: 'Product roadmap and timeline',
  a11: 'Feature highlights and updates',
  a12: 'Technical architecture deep dive',
};

// Folder origin lookup for favorites cards
const SLIDE_FOLDER_ORIGIN = {
  a1: 'Global', a2: 'Global', a3: 'Product',
  a4: 'Product', a5: 'Commercial (NEW)', a6: 'Commercial (NEW)',
  a7: 'Global', a8: 'Product', a9: 'Global',
  a10: 'Product', a11: 'Product', a12: 'Product',
};

function getAllSlides() {
  const all = [...MOCK_DATA.slides];
  // Also gather slides from folder contents
  Object.values(MOCK_DATA.folderContents).forEach(fc => {
    if (fc.slides) all.push(...fc.slides);
  });
  return all;
}

function renderFavoritesView() {
  assetList.innerHTML = '';
  breadcrumbBar.style.display = 'none';

  const allSlides = getAllSlides();
  const favSlides = allSlides.filter(s => favoritedIds.has(s.id));

  if (favSlides.length === 0) {
    assetList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <svg viewBox="0 0 12 12" width="32" height="32" fill="none">
            <path d="M5.99997 0.25C6.30737 0.25 6.58382 0.437921 6.69724 0.723633L7.91989 3.80273L11.0644 4.07227C11.3617 4.0979 11.6156 4.29736 11.7109 4.58008C11.8061 4.863 11.7243 5.17582 11.5029 5.37598L9.08298 7.56055L9.82224 10.835C9.88912 11.1316 9.7695 11.4396 9.52048 11.6143C9.27146 11.7887 8.94158 11.7958 8.68552 11.6318L5.99997 9.91113L3.31442 11.6318C3.05836 11.7958 2.72848 11.7887 2.47946 11.6143C2.23044 11.4396 2.11082 11.1316 2.1777 10.835L2.91696 7.56055L0.49704 5.37598C0.27563 5.17582 0.193853 4.863 0.289032 4.58008C0.384305 4.29736 0.638284 4.0979 0.935516 4.07227L4.08005 3.80273L5.3027 0.723633C5.41612 0.437921 5.69257 0.25 5.99997 0.25ZM5.13278 5.21875L2.78317 5.41992L4.57321 7.03516L4.04294 9.38379L5.99997 8.12988L7.957 9.38379L7.42673 7.03516L9.21677 5.41992L6.86716 5.21875L5.99997 3.0332L5.13278 5.21875Z" fill="#ccc"/>
          </svg>
        </div>
        <div class="empty-state-text">No favorites yet</div>
        <div class="empty-state-sub">Star slides to save them here for quick access</div>
      </div>`;
    onRenderComplete();
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'asset-card-grid';
  favSlides.forEach(slide => grid.appendChild(renderFavoriteCard(slide)));
  assetList.appendChild(grid);
  onRenderComplete();
}

function renderFavoriteCard(asset) {
  const card = document.createElement('div');
  card.className = 'asset-card favorite-card';
  card.draggable = true;

  const folder = SLIDE_FOLDER_ORIGIN[asset.id] || '';

  const favVariants = {
    1: `<rect width="158" height="89" rx="2" fill="#fdf6f0"/><rect width="158" height="3" fill="#E07A3A"/><circle cx="130" cy="15" r="20" fill="#E07A3A" opacity=".06"/><rect x="10" y="10" width="6" height="6" rx="1.5" fill="#E07A3A"/><rect x="19" y="11" width="22" height="3.5" rx="1" fill="#E07A3A" opacity=".25"/><rect x="10" y="24" width="70" height="5" rx="1" fill="#c45a20" opacity=".6"/><rect x="10" y="33" width="50" height="3" rx="1" fill="#d4956a" opacity=".35"/><rect x="10" y="42" width="14" height="5" rx="2.5" fill="#E07A3A" opacity=".12"/><rect x="27" y="42" width="16" height="5" rx="2.5" fill="#E07A3A" opacity=".12"/><rect x="10" y="53" width="90" height="2.5" rx="1" fill="#ddd" opacity=".4"/><rect x="10" y="58" width="75" height="2.5" rx="1" fill="#ddd" opacity=".3"/><rect x="10" y="72" width="40" height="2" rx="1" fill="#ccc" opacity=".3"/>`,
    2: `<rect width="158" height="89" rx="2" fill="#fdf6f0"/><rect width="158" height="3" fill="#E07A3A"/><rect x="10" y="10" width="6" height="6" rx="1.5" fill="#E07A3A"/><rect x="19" y="11" width="22" height="3.5" rx="1" fill="#E07A3A" opacity=".25"/><rect x="10" y="24" width="55" height="4.5" rx="1" fill="#c45a20" opacity=".55"/><rect x="10" y="32" width="40" height="3" rx="1" fill="#d4956a" opacity=".3"/><rect x="10" y="44" width="90" height="2.5" rx="1" fill="#ddd" opacity=".35"/><rect x="10" y="49" width="80" height="2.5" rx="1" fill="#ddd" opacity=".25"/><rect x="110" y="60" width="6" height="16" rx="1" fill="#E07A3A" opacity=".5"/><rect x="120" y="55" width="6" height="21" rx="1" fill="#E07A3A" opacity=".35"/><rect x="130" y="50" width="6" height="26" rx="1" fill="#E07A3A" opacity=".6"/><rect x="140" y="58" width="6" height="18" rx="1" fill="#E07A3A" opacity=".25"/><rect x="10" y="78" width="40" height="2" rx="1" fill="#ccc" opacity=".3"/>`,
    3: `<rect width="158" height="89" rx="2" fill="#fdf6f0"/><rect width="158" height="3" fill="#E07A3A"/><circle cx="140" cy="70" r="15" fill="#E07A3A" opacity=".05"/><rect x="10" y="10" width="6" height="6" rx="1.5" fill="#E07A3A"/><rect x="19" y="11" width="22" height="3.5" rx="1" fill="#E07A3A" opacity=".25"/><rect x="10" y="24" width="60" height="4.5" rx="1" fill="#c45a20" opacity=".55"/><rect x="10" y="36" width="62" height="2.5" rx="1" fill="#ddd" opacity=".4"/><rect x="10" y="41" width="62" height="2.5" rx="1" fill="#ddd" opacity=".3"/><rect x="84" y="36" width="62" height="2.5" rx="1" fill="#ddd" opacity=".4"/><rect x="84" y="41" width="62" height="2.5" rx="1" fill="#ddd" opacity=".3"/><rect x="10" y="78" width="40" height="2" rx="1" fill="#ccc" opacity=".3"/>`,
    4: `<rect width="158" height="89" rx="2" fill="#fdf6f0"/><rect width="158" height="3" fill="#E07A3A"/><rect x="10" y="10" width="6" height="6" rx="1.5" fill="#E07A3A"/><rect x="19" y="11" width="22" height="3.5" rx="1" fill="#E07A3A" opacity=".25"/><rect x="10" y="24" width="50" height="4.5" rx="1" fill="#c45a20" opacity=".55"/><rect x="85" y="20" width="62" height="40" rx="3" fill="#E07A3A" opacity=".08"/><circle cx="100" cy="34" r="6" fill="#E07A3A" opacity=".12"/><path d="M90 52l10-8 8 5 10-6v9H90z" fill="#E07A3A" opacity=".1"/><rect x="10" y="36" width="65" height="2.5" rx="1" fill="#ddd" opacity=".4"/><rect x="10" y="41" width="65" height="2.5" rx="1" fill="#ddd" opacity=".3"/><rect x="10" y="78" width="40" height="2" rx="1" fill="#ccc" opacity=".3"/>`,
    5: `<rect width="158" height="89" rx="2" fill="#fdf6f0"/><rect width="158" height="3" fill="#E07A3A"/><rect x="10" y="10" width="6" height="6" rx="1.5" fill="#E07A3A"/><rect x="19" y="11" width="22" height="3.5" rx="1" fill="#E07A3A" opacity=".25"/><rect x="10" y="24" width="55" height="4.5" rx="1" fill="#c45a20" opacity=".55"/><circle cx="40" cy="58" r="18" fill="none" stroke="#E07A3A" stroke-width="5" opacity=".15" stroke-dasharray="28 85"/><circle cx="40" cy="58" r="18" fill="none" stroke="#E07A3A" stroke-width="5" opacity=".3" stroke-dasharray="45 68" stroke-dashoffset="-28"/><rect x="75" y="44" width="8" height="3" rx="1.5" fill="#E07A3A" opacity=".3"/><rect x="86" y="44" width="30" height="2.5" rx="1" fill="#ddd" opacity=".35"/><rect x="75" y="52" width="8" height="3" rx="1.5" fill="#E07A3A" opacity=".15"/><rect x="86" y="52" width="25" height="2.5" rx="1" fill="#ddd" opacity=".35"/><rect x="10" y="78" width="40" height="2" rx="1" fill="#ccc" opacity=".3"/>`
  };
  const fv = favVariants[asset.color] || favVariants[1];
  card.innerHTML = `
    <div class="asset-card-thumb branded-card-thumb">
      <svg viewBox="0 0 158 89" width="100%" height="100%" fill="none" preserveAspectRatio="xMidYMid meet">
        ${fv}
      </svg>
      <div class="fav-star-badge">
        <svg viewBox="0 0 12 12" width="14" height="14" fill="none"><path d="M5.99997 0.25C6.30737 0.25 6.58382 0.437921 6.69724 0.723633L7.91989 3.80273L11.0644 4.07227C11.3617 4.0979 11.6156 4.29736 11.7109 4.58008C11.8061 4.863 11.7243 5.17582 11.5029 5.37598L9.08298 7.56055L9.82224 10.835C9.88912 11.1316 9.7695 11.4396 9.52048 11.6143C9.27146 11.7887 8.94158 11.7958 8.68552 11.6318L5.99997 9.91113L3.31442 11.6318C3.05836 11.7958 2.72848 11.7887 2.47946 11.6143C2.23044 11.4396 2.11082 11.1316 2.1777 10.835L2.91696 7.56055L0.49704 5.37598C0.27563 5.17582 0.193853 4.863 0.289032 4.58008C0.384305 4.29736 0.638284 4.0979 0.935516 4.07227L4.08005 3.80273L5.3027 0.723633C5.41612 0.437921 5.69257 0.25 5.99997 0.25Z" fill="#daa520"/></svg>
      </div>
    </div>
    <div class="asset-card-actions">
      <button class="asset-card-action-btn favorited" title="Remove from favorites" data-action="favorite">
        <svg viewBox="0 0 12 12" fill="none"><path d="M5.99997 0.25C6.30737 0.25 6.58382 0.437921 6.69724 0.723633L7.91989 3.80273L11.0644 4.07227C11.3617 4.0979 11.6156 4.29736 11.7109 4.58008C11.8061 4.863 11.7243 5.17582 11.5029 5.37598L9.08298 7.56055L9.82224 10.835C9.88912 11.1316 9.7695 11.4396 9.52048 11.6143C9.27146 11.7887 8.94158 11.7958 8.68552 11.6318L5.99997 9.91113L3.31442 11.6318C3.05836 11.7958 2.72848 11.7887 2.47946 11.6143C2.23044 11.4396 2.11082 11.1316 2.1777 10.835L2.91696 7.56055L0.49704 5.37598C0.27563 5.17582 0.193853 4.863 0.289032 4.58008C0.384305 4.29736 0.638284 4.0979 0.935516 4.07227L4.08005 3.80273L5.3027 0.723633C5.41612 0.437921 5.69257 0.25 5.99997 0.25Z" fill="currentColor"/></svg>
      </button>
      <button class="asset-card-action-btn" title="Comment" data-action="flag">
        <svg viewBox="0 0 16 16" fill="none"><path d="M2 3a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6l-3 3V11a2 2 0 01-1-1.7V3z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
      </button>
    </div>
    <div class="asset-card-name">${asset.name}</div>
    <a class="fav-card-folder-link" href="#" data-folder="${folder}">
      <svg viewBox="0 0 16 16" width="12" height="12" fill="none"><path d="M1.5 3A1.5 1.5 0 013 1.5h3.17a1.5 1.5 0 011.21.62L8.5 3.5H13A1.5 1.5 0 0114.5 5v7a1.5 1.5 0 01-1.5 1.5H3A1.5 1.5 0 011.5 12V3z" stroke="#999" stroke-width="1.1"/></svg>
      <span>${folder}</span>
    </a>
  `;

  // Unfavorite
  const favBtn = card.querySelector('[data-action="favorite"]');
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    favoritedIds.delete(asset.id);
    render();
  });

  // Flag button
  const flagBtn = card.querySelector('[data-action="flag"]');
  flagBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    alert(`Asset "${asset.name}" has been flagged to admin.`);
  });

  // Folder link — navigate to the folder containing this asset
  const folderLink = card.querySelector('.fav-card-folder-link');
  if (folderLink) {
    folderLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showFavorites = false;
      updateFavoritesNavBtn();
      // Find and navigate to the folder
      const folderName = folderLink.dataset.folder;
      const targetFolder = allSlides.find(s => s.type === 'folder' && s.name === folderName);
      if (targetFolder) {
        folderStack = [{ id: targetFolder.id, name: targetFolder.name }];
        currentFolder = targetFolder.id;
      } else {
        folderStack = [];
        currentFolder = null;
      }
      render();
    });
  }

  card.addEventListener('dragstart', (e) => {
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/json', JSON.stringify({ name: asset.name, color: asset.color }));
  });
  card.addEventListener('dragend', () => card.classList.remove('dragging'));

  return card;
}

function navigateToStackLevel(level) {
  // level is the index in folderStack to navigate to
  folderStack = folderStack.slice(0, level + 1);
  currentFolder = folderStack[folderStack.length - 1].id;
  render();
}

function updateBreadcrumbs() {
  breadcrumbPath.innerHTML = '';

  // Root icon (always clickable)
  const rootBtn = document.createElement('button');
  rootBtn.className = 'breadcrumb-icon-link';
  rootBtn.innerHTML = BREADCRUMB_ROOT_ICON;
  rootBtn.title = 'Slides & assets';
  rootBtn.addEventListener('click', navigateToRoot);
  breadcrumbPath.appendChild(rootBtn);

  if (folderStack.length === 0) return;

  // Separator after root
  breadcrumbPath.appendChild(createBreadcrumbSep());

  if (folderStack.length === 1) {
    // 1 level: icon / Folder name
    const current = document.createElement('span');
    current.className = 'breadcrumb-current';
    current.textContent = folderStack[0].name;
    breadcrumbPath.appendChild(current);
  } else {
    // 2+ levels: icon / ... / Folder name
    const ellipsis = document.createElement('span');
    ellipsis.className = 'breadcrumb-ellipsis';
    ellipsis.textContent = '...';
    breadcrumbPath.appendChild(ellipsis);
    breadcrumbPath.appendChild(createBreadcrumbSep());

    const current = document.createElement('span');
    current.className = 'breadcrumb-current';
    current.textContent = folderStack[folderStack.length - 1].name;
    breadcrumbPath.appendChild(current);
  }
}

function createBreadcrumbSep() {
  const sep = document.createElement('span');
  sep.className = 'breadcrumb-sep';
  sep.textContent = '/';
  return sep;
}

// --- Generate slide thumbnails ---
function renderSlideThumbnails() {
  const container = document.getElementById('slideThumbnails');
  container.innerHTML = '';

  const chartColors = ['#c45a20', '#E07A3A', '#f0a76e', '#f5c4a0', '#e0cfc0'];

  SLIDES.forEach((slide, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = `slide-thumb-wrapper${i === 0 ? ' active' : ''}`;

    const tagsHtml = (slide.tags || []).map(t => `<span class="mini-tag">${t}</span>`).join('');
    const chartHtml = slide.hasChart ? `<div class="mini-chart">${
      [10, 14, 8, 16, 12].map((h, ci) => `<div class="mini-chart-bar" style="height:${h}px;background:${chartColors[ci]}"></div>`).join('')
    }</div>` : '';

    wrapper.innerHTML = `
      <span class="slide-num">${slide.num}</span>
      <div class="slide-thumb">
        <div class="slide-thumb-content branded-thumb">
          <div class="thumb-shape-circle"></div>
          <div class="thumb-shape-rect"></div>
          <div class="mini-logo"><div class="mini-logo-icon"></div><span class="mini-logo-text">Company</span></div>
          <div class="mini-title">${slide.title}</div>
          <div class="mini-sub">${slide.sub}</div>
          <div class="mini-body">${slide.body || ''}</div>
          <div class="mini-tags">${tagsHtml}</div>
          ${chartHtml}
        </div>
      </div>
    `;
    wrapper.addEventListener('click', () => {
      document.querySelectorAll('.slide-thumb-wrapper').forEach(w => w.classList.remove('active'));
      wrapper.classList.add('active');
    });
    container.appendChild(wrapper);
  });
}

// --- Sort Icon SVGs ---
const SORT_ICONS = {
  'relevant': `<svg viewBox="0 0 12 12" width="14" height="13"><g clip-path="url(#clip_btn_rel)"><path d="M2.65 0H4.05V8.85L5.75 7.15L6.7 8.1L3.35 11.45L0 8.1L0.95 7.15L2.65 8.85V0ZM6.7 0H8.3V0.7H7.8V8H7.2V0.7H6.7V0ZM8.55 0H10.15V8H8.55V0ZM9.05 0.6V7.4H9.65V0.6H9.05ZM10.4 0H12V4H10.9V8H10.4V0ZM10.9 0.6V3.4H11.5V0.6H10.9Z" fill="#464646"/></g><defs><clipPath id="clip_btn_rel"><rect width="12" height="12" fill="white"/></clipPath></defs></svg>`,
  'name-asc': `<svg viewBox="0 0 13 12" width="14" height="13"><path d="M1.5 1v10M1.5 11L0 9.5M1.5 11L3 9.5" stroke="#464646" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><text x="6" y="5" font-size="5.5" font-weight="700" fill="#464646" font-family="Segoe UI, sans-serif">A</text><text x="6" y="11" font-size="5.5" font-weight="700" fill="#464646" font-family="Segoe UI, sans-serif">Z</text></svg>`,
  'name-desc': `<svg viewBox="0 0 13 12" width="14" height="13"><path d="M1.5 11V1M1.5 1L0 2.5M1.5 1L3 2.5" stroke="#464646" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><text x="6" y="5" font-size="5.5" font-weight="700" fill="#464646" font-family="Segoe UI, sans-serif">Z</text><text x="6" y="11" font-size="5.5" font-weight="700" fill="#464646" font-family="Segoe UI, sans-serif">A</text></svg>`,
  'date-desc': `<svg viewBox="0 0 12 12" width="14" height="13"><path d="M1.5 1v10M1.5 11L0 9.5M1.5 11L3 9.5" stroke="#464646" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M5.5 3h6M5.5 6h4.5M5.5 9h3" stroke="#464646" stroke-width="1.2" stroke-linecap="round" fill="none"/></svg>`,
  'date-asc': `<svg viewBox="0 0 12 12" width="14" height="13"><path d="M1.5 11V1M1.5 1L0 2.5M1.5 1L3 2.5" stroke="#464646" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M5.5 3h3M5.5 6h4.5M5.5 9h6" stroke="#464646" stroke-width="1.2" stroke-linecap="round" fill="none"/></svg>`,
};

function updateSortIcon() {
  sortBtn.innerHTML = SORT_ICONS[currentSort] || SORT_ICONS['name-asc'];
}

// --- Sort Dropdown ---
sortBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = sortDropdown.classList.toggle('open');
  sortBtn.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', () => {
  sortDropdown.classList.remove('open');
  sortBtn.setAttribute('aria-expanded', 'false');
});

sortDropdown.addEventListener('click', (e) => {
  e.stopPropagation();
});

document.querySelectorAll('.sort-option').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sort-option').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSort = btn.dataset.sort;
    sortDropdown.classList.remove('open');
    sortBtn.setAttribute('aria-expanded', 'false');
    updateSortIcon();
    render();
  });
});

// --- Search ---
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase();
  render();
});

// --- Tab switching ---
document.querySelectorAll('.pane-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pane-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    render();
  });
});

// --- Ribbon tab switching ---
document.querySelectorAll('.ribbon-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ribbon-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// --- Sorting ---
function sortItems(items, sortKey) {
  const sorted = [...items];
  switch (sortKey) {
    case 'relevant':
      // Keep original order
      break;
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'date-desc':
      sorted.sort((a, b) => new Date(b.modified) - new Date(a.modified));
      break;
    case 'date-asc':
      sorted.sort((a, b) => new Date(a.modified) - new Date(b.modified));
      break;
  }
  return sorted;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now - d;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// --- SVG Helpers ---
function folderThumbSvg() {
  return `<svg viewBox="0 0 48 48" width="32" height="32" fill="none">
    <rect x="8" y="12" width="32" height="24" rx="3" fill="#d8d8d8" stroke="#c0c0c0" stroke-width="1"/>
    <path d="M8 15a3 3 0 013-3h8l3 3h15a3 3 0 013 3v1H8v-4z" fill="#c8c8c8"/>
  </svg>`;
}

function folderSvg() {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 3C15.1046 3 16 3.89543 16 5L16 12C16 13.1046 15.1046 14 14 14L2 14C0.895431 14 0 13.1046 0 12V3L14 3Z" fill="#898989"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.92702 1C6.40448 1 6.86619 1.17081 7.22869 1.48156L9 3L1.44391e-08 3C1.44391e-08 1.89543 0.89543 1 2 1L5.92702 1Z" fill="#464646"/>
  </svg>`;
}

function backArrowSvg() {
  return `<svg viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

// --- Date Grouping ---
function getDateGroup(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function getDateGroupOrder(items) {
  const seen = new Set();
  const order = [];
  items.forEach(item => {
    const group = getDateGroup(item.modified);
    if (!seen.has(group)) {
      seen.add(group);
      order.push(group);
    }
  });
  return order;
}

function groupByDate(items) {
  const groups = {};
  items.forEach(item => {
    const group = getDateGroup(item.modified);
    if (!groups[group]) groups[group] = [];
    groups[group].push(item);
  });
  return groups;
}

function isDateSort() {
  return currentSort === 'date-desc' || currentSort === 'date-asc';
}

function renderAssetCard(asset) {
  const card = document.createElement('div');
  card.className = 'asset-card';
  card.draggable = true;
  // Branded card thumb variations
  const cardVariants = {
    1: { // Title slide style
      bg: '#fdf6f0',
      svg: `<rect width="158" height="89" rx="2" fill="#fdf6f0"/>
        <rect width="158" height="3" fill="#E07A3A"/>
        <circle cx="130" cy="15" r="20" fill="#E07A3A" opacity=".06"/>
        <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#E07A3A"/>
        <rect x="19" y="11" width="22" height="3.5" rx="1" fill="#E07A3A" opacity=".25"/>
        <rect x="10" y="24" width="70" height="5" rx="1" fill="#c45a20" opacity=".6"/>
        <rect x="10" y="33" width="50" height="3" rx="1" fill="#d4956a" opacity=".35"/>
        <rect x="10" y="42" width="14" height="5" rx="2.5" fill="#E07A3A" opacity=".12"/><rect x="27" y="42" width="16" height="5" rx="2.5" fill="#E07A3A" opacity=".12"/>
        <rect x="10" y="53" width="90" height="2.5" rx="1" fill="#ddd" opacity=".4"/>
        <rect x="10" y="58" width="75" height="2.5" rx="1" fill="#ddd" opacity=".3"/>
        <rect x="10" y="72" width="40" height="2" rx="1" fill="#ccc" opacity=".3"/>`
    },
    2: { // Content with chart
      bg: '#fdf6f0',
      svg: `<rect width="158" height="89" rx="2" fill="#fdf6f0"/>
        <rect width="158" height="3" fill="#E07A3A"/>
        <rect x="125" y="-5" width="25" height="18" rx="3" fill="#E07A3A" opacity=".04" transform="rotate(12 137 4)"/>
        <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#E07A3A"/>
        <rect x="19" y="11" width="22" height="3.5" rx="1" fill="#E07A3A" opacity=".25"/>
        <rect x="10" y="24" width="55" height="4.5" rx="1" fill="#c45a20" opacity=".55"/>
        <rect x="10" y="32" width="40" height="3" rx="1" fill="#d4956a" opacity=".3"/>
        <rect x="10" y="44" width="90" height="2.5" rx="1" fill="#ddd" opacity=".35"/>
        <rect x="10" y="49" width="80" height="2.5" rx="1" fill="#ddd" opacity=".25"/>
        <rect x="10" y="54" width="70" height="2.5" rx="1" fill="#ddd" opacity=".2"/>
        <rect x="110" y="60" width="6" height="16" rx="1" fill="#E07A3A" opacity=".5"/>
        <rect x="120" y="55" width="6" height="21" rx="1" fill="#E07A3A" opacity=".35"/>
        <rect x="130" y="50" width="6" height="26" rx="1" fill="#E07A3A" opacity=".6"/>
        <rect x="140" y="58" width="6" height="18" rx="1" fill="#E07A3A" opacity=".25"/>
        <rect x="10" y="78" width="40" height="2" rx="1" fill="#ccc" opacity=".3"/>`
    },
    3: { // Two-column layout
      bg: '#fdf6f0',
      svg: `<rect width="158" height="89" rx="2" fill="#fdf6f0"/>
        <rect width="158" height="3" fill="#E07A3A"/>
        <circle cx="140" cy="70" r="15" fill="#E07A3A" opacity=".05"/>
        <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#E07A3A"/>
        <rect x="19" y="11" width="22" height="3.5" rx="1" fill="#E07A3A" opacity=".25"/>
        <rect x="10" y="24" width="60" height="4.5" rx="1" fill="#c45a20" opacity=".55"/>
        <rect x="10" y="36" width="62" height="2.5" rx="1" fill="#ddd" opacity=".4"/>
        <rect x="10" y="41" width="62" height="2.5" rx="1" fill="#ddd" opacity=".3"/>
        <rect x="10" y="46" width="50" height="2.5" rx="1" fill="#ddd" opacity=".25"/>
        <rect x="10" y="55" width="62" height="2.5" rx="1" fill="#ddd" opacity=".35"/>
        <rect x="10" y="60" width="55" height="2.5" rx="1" fill="#ddd" opacity=".25"/>
        <rect x="84" y="36" width="62" height="2.5" rx="1" fill="#ddd" opacity=".4"/>
        <rect x="84" y="41" width="62" height="2.5" rx="1" fill="#ddd" opacity=".3"/>
        <rect x="84" y="46" width="50" height="2.5" rx="1" fill="#ddd" opacity=".25"/>
        <rect x="84" y="55" width="62" height="2.5" rx="1" fill="#ddd" opacity=".35"/>
        <rect x="84" y="60" width="55" height="2.5" rx="1" fill="#ddd" opacity=".25"/>
        <rect x="10" y="78" width="40" height="2" rx="1" fill="#ccc" opacity=".3"/>`
    },
    4: { // Image + text layout
      bg: '#fdf6f0',
      svg: `<rect width="158" height="89" rx="2" fill="#fdf6f0"/>
        <rect width="158" height="3" fill="#E07A3A"/>
        <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#E07A3A"/>
        <rect x="19" y="11" width="22" height="3.5" rx="1" fill="#E07A3A" opacity=".25"/>
        <rect x="10" y="24" width="50" height="4.5" rx="1" fill="#c45a20" opacity=".55"/>
        <rect x="85" y="20" width="62" height="40" rx="3" fill="#E07A3A" opacity=".08"/>
        <circle cx="100" cy="34" r="6" fill="#E07A3A" opacity=".12"/>
        <path d="M90 52l10-8 8 5 10-6v9H90z" fill="#E07A3A" opacity=".1"/>
        <rect x="10" y="36" width="65" height="2.5" rx="1" fill="#ddd" opacity=".4"/>
        <rect x="10" y="41" width="65" height="2.5" rx="1" fill="#ddd" opacity=".3"/>
        <rect x="10" y="46" width="50" height="2.5" rx="1" fill="#ddd" opacity=".25"/>
        <rect x="10" y="55" width="14" height="5" rx="2.5" fill="#E07A3A" opacity=".15"/>
        <rect x="10" y="78" width="40" height="2" rx="1" fill="#ccc" opacity=".3"/>`
    },
    5: { // Pie chart layout
      bg: '#fdf6f0',
      svg: `<rect width="158" height="89" rx="2" fill="#fdf6f0"/>
        <rect width="158" height="3" fill="#E07A3A"/>
        <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#E07A3A"/>
        <rect x="19" y="11" width="22" height="3.5" rx="1" fill="#E07A3A" opacity=".25"/>
        <rect x="10" y="24" width="55" height="4.5" rx="1" fill="#c45a20" opacity=".55"/>
        <circle cx="40" cy="58" r="18" fill="none" stroke="#E07A3A" stroke-width="5" opacity=".15" stroke-dasharray="28 85"/>
        <circle cx="40" cy="58" r="18" fill="none" stroke="#E07A3A" stroke-width="5" opacity=".3" stroke-dasharray="45 68" stroke-dashoffset="-28"/>
        <circle cx="40" cy="58" r="18" fill="none" stroke="#E07A3A" stroke-width="5" opacity=".1" stroke-dasharray="20 93" stroke-dashoffset="-73"/>
        <rect x="75" y="44" width="8" height="3" rx="1.5" fill="#E07A3A" opacity=".3"/><rect x="86" y="44" width="30" height="2.5" rx="1" fill="#ddd" opacity=".35"/>
        <rect x="75" y="52" width="8" height="3" rx="1.5" fill="#E07A3A" opacity=".15"/><rect x="86" y="52" width="25" height="2.5" rx="1" fill="#ddd" opacity=".35"/>
        <rect x="75" y="60" width="8" height="3" rx="1.5" fill="#E07A3A" opacity=".1"/><rect x="86" y="60" width="20" height="2.5" rx="1" fill="#ddd" opacity=".35"/>
        <rect x="10" y="78" width="40" height="2" rx="1" fill="#ccc" opacity=".3"/>`
    }
  };
  const v = cardVariants[asset.color] || cardVariants[1];
  card.innerHTML = `
    <div class="asset-card-thumb branded-card-thumb">
      <svg viewBox="0 0 158 89" width="100%" height="100%" fill="none" preserveAspectRatio="xMidYMid meet">
        ${v.svg}
      </svg>
    </div>
    <div class="asset-card-actions">
      <button class="asset-card-action-btn" title="Add to favorites" data-action="favorite">
        <svg viewBox="0 0 12 12" fill="none"><path d="M5.99997 0.25C6.30737 0.25 6.58382 0.437921 6.69724 0.723633L7.91989 3.80273L11.0644 4.07227C11.3617 4.0979 11.6156 4.29736 11.7109 4.58008C11.8061 4.863 11.7243 5.17582 11.5029 5.37598L9.08298 7.56055L9.82224 10.835C9.88912 11.1316 9.7695 11.4396 9.52048 11.6143C9.27146 11.7887 8.94158 11.7958 8.68552 11.6318L5.99997 9.91113L3.31442 11.6318C3.05836 11.7958 2.72848 11.7887 2.47946 11.6143C2.23044 11.4396 2.11082 11.1316 2.1777 10.835L2.91696 7.56055L0.49704 5.37598C0.27563 5.17582 0.193853 4.863 0.289032 4.58008C0.384305 4.29736 0.638284 4.0979 0.935516 4.07227L4.08005 3.80273L5.3027 0.723633C5.41612 0.437921 5.69257 0.25 5.99997 0.25ZM5.13278 5.21875L2.78317 5.41992L4.57321 7.03516L4.04294 9.38379L5.99997 8.12988L7.957 9.38379L7.42673 7.03516L9.21677 5.41992L6.86716 5.21875L5.99997 3.0332L5.13278 5.21875Z" fill="#464646"/></svg>
      </button>
      <button class="asset-card-action-btn" title="Comment" data-action="flag">
        <svg viewBox="0 0 16 16" fill="none"><path d="M2 3a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6l-3 3V11a2 2 0 01-1-1.7V3z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
      </button>
    </div>
    <div class="asset-card-name">${asset.name}</div>
  `;

  // Favorite button toggle
  const favBtn = card.querySelector('[data-action="favorite"]');
  const actionsContainer = card.querySelector('.asset-card-actions');
  // Pre-fill if already favorited
  if (favoritedIds.has(asset.id)) {
    favBtn.classList.add('favorited');
    const star = favBtn.querySelector('path');
    star.setAttribute('d', 'M5.99997 0.25C6.30737 0.25 6.58382 0.437921 6.69724 0.723633L7.91989 3.80273L11.0644 4.07227C11.3617 4.0979 11.6156 4.29736 11.7109 4.58008C11.8061 4.863 11.7243 5.17582 11.5029 5.37598L9.08298 7.56055L9.82224 10.835C9.88912 11.1316 9.7695 11.4396 9.52048 11.6143C9.27146 11.7887 8.94158 11.7958 8.68552 11.6318L5.99997 9.91113L3.31442 11.6318C3.05836 11.7958 2.72848 11.7887 2.47946 11.6143C2.23044 11.4396 2.11082 11.1316 2.1777 10.835L2.91696 7.56055L0.49704 5.37598C0.27563 5.17582 0.193853 4.863 0.289032 4.58008C0.384305 4.29736 0.638284 4.0979 0.935516 4.07227L4.08005 3.80273L5.3027 0.723633C5.41612 0.437921 5.69257 0.25 5.99997 0.25Z');
    star.setAttribute('fill', 'currentColor');
    actionsContainer.classList.add('has-favorited');
  }
  const FAV_STAR_FILLED = 'M5.99997 0.25C6.30737 0.25 6.58382 0.437921 6.69724 0.723633L7.91989 3.80273L11.0644 4.07227C11.3617 4.0979 11.6156 4.29736 11.7109 4.58008C11.8061 4.863 11.7243 5.17582 11.5029 5.37598L9.08298 7.56055L9.82224 10.835C9.88912 11.1316 9.7695 11.4396 9.52048 11.6143C9.27146 11.7887 8.94158 11.7958 8.68552 11.6318L5.99997 9.91113L3.31442 11.6318C3.05836 11.7958 2.72848 11.7887 2.47946 11.6143C2.23044 11.4396 2.11082 11.1316 2.1777 10.835L2.91696 7.56055L0.49704 5.37598C0.27563 5.17582 0.193853 4.863 0.289032 4.58008C0.384305 4.29736 0.638284 4.0979 0.935516 4.07227L4.08005 3.80273L5.3027 0.723633C5.41612 0.437921 5.69257 0.25 5.99997 0.25Z';
  const FAV_STAR_OUTLINE = FAV_STAR_FILLED + 'M5.13278 5.21875L2.78317 5.41992L4.57321 7.03516L4.04294 9.38379L5.99997 8.12988L7.957 9.38379L7.42673 7.03516L9.21677 5.41992L6.86716 5.21875L5.99997 3.0332L5.13278 5.21875Z';
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    favBtn.classList.toggle('favorited');
    const star = favBtn.querySelector('path');
    if (favBtn.classList.contains('favorited')) {
      star.setAttribute('d', FAV_STAR_FILLED);
      star.setAttribute('fill', 'currentColor');
      actionsContainer.classList.add('has-favorited');
      favoritedIds.add(asset.id);
    } else {
      star.setAttribute('d', FAV_STAR_OUTLINE);
      star.setAttribute('fill', '#464646');
      actionsContainer.classList.remove('has-favorited');
      favoritedIds.delete(asset.id);
    }
    // Re-render if on favorites page (card was unfavorited)
    if (showFavorites && !favoritedIds.has(asset.id)) {
      render();
    }
  });

  // Flag button
  const flagBtn = card.querySelector('[data-action="flag"]');
  flagBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    alert(`Asset "${asset.name}" has been flagged to admin.`);
  });

  card.addEventListener('dragstart', (e) => {
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/json', JSON.stringify({ name: asset.name, color: asset.color }));
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });

  return card;
}

// --- Render ---
function render() {
  assetList.innerHTML = '';

  // Favorites view
  if (showFavorites) {
    renderFavoritesView();
    return;
  }

  // Update breadcrumb bar visibility
  if (currentFolder) {
    const folderData = MOCK_DATA.folderContents[currentFolder];
    if (!folderData) { currentFolder = null; folderStack = []; render(); return; }

    breadcrumbBar.style.display = 'flex';
    updateBreadcrumbs();

    let folders = folderData.folders || [];
    let slides = folderData.slides || [];

    if (searchQuery) {
      folders = folders.filter(f => f.name.toLowerCase().includes(searchQuery));
      slides = slides.filter(s => s.name.toLowerCase().includes(searchQuery));
    }

    if (folders.length === 0 && slides.length === 0) {
      assetList.insertAdjacentHTML('beforeend', renderEmptyState());
      onRenderComplete();
      return;
    }

    const sortedFolders = sortItems(folders, currentSort);
    const sortedSlides = sortItems(slides, currentSort);

    renderFlatFolders(sortedFolders);
    if (isDateSort()) {
      renderGroupedSlides(sortedSlides);
    } else if (sortedSlides.length > 0) {
      const grid = document.createElement('div');
      grid.className = 'asset-card-grid';
      sortedSlides.forEach(slide => grid.appendChild(renderAssetCard(slide)));
      assetList.appendChild(grid);
    }
    onRenderComplete();
    return;
  }

  // Hide breadcrumb at root
  breadcrumbBar.style.display = 'none';
  folderStack = [];

  // Root level
  let folders = MOCK_DATA.folders;
  let slides = MOCK_DATA.slides;

  if (searchQuery) {
    folders = folders.filter(f => f.name.toLowerCase().includes(searchQuery));
    slides = slides.filter(s => s.name.toLowerCase().includes(searchQuery));
  }

  if (folders.length === 0 && slides.length === 0) {
    assetList.innerHTML = renderEmptyState();
    onRenderComplete();
    return;
  }

  const sortedFolders = sortItems(folders, currentSort);
  const sortedSlides = sortItems(slides, currentSort);
  renderFlatFolders(sortedFolders);
  if (isDateSort()) {
    renderGroupedSlides(sortedSlides);
  } else if (sortedSlides.length > 0) {
    const grid = document.createElement('div');
    grid.className = 'asset-card-grid';
    sortedSlides.forEach(slide => grid.appendChild(renderAssetCard(slide)));
    assetList.appendChild(grid);
  }
  onRenderComplete();
}

function renderGroupedSlides(slides) {
  if (slides.length === 0) return;
  const groups = groupByDate(slides);
  const order = getDateGroupOrder(slides);

  order.forEach(groupName => {
    const items = groups[groupName];
    if (!items || items.length === 0) return;

    const header = document.createElement('div');
    header.className = 'date-group-header';
    header.textContent = groupName;
    assetList.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'asset-card-grid';
    items.forEach(slide => grid.appendChild(renderAssetCard(slide)));
    assetList.appendChild(grid);
  });
}

function renderGroupedItems(sorted) {
  const groups = groupByDate(sorted);
  const order = getDateGroupOrder(sorted);

  order.forEach(groupName => {
    const items = groups[groupName];
    if (!items || items.length === 0) return;

    const header = document.createElement('div');
    header.className = 'date-group-header';
    header.textContent = groupName;
    assetList.appendChild(header);

    const groupFolders = items.filter(i => i.type === 'folder');
    const groupSlides = items.filter(i => i.type === 'slide');

    if (groupFolders.length > 0) {
      const folderContainer = document.createElement('div');
      folderContainer.className = 'folder-list';
      groupFolders.forEach(folder => {
        folderContainer.appendChild(renderFolderRow(folder));
      });
      assetList.appendChild(folderContainer);
    }

    if (groupSlides.length > 0) {
      const grid = document.createElement('div');
      grid.className = 'asset-card-grid';
      groupSlides.forEach(slide => grid.appendChild(renderAssetCard(slide)));
      assetList.appendChild(grid);
    }
  });
}

function renderFolderRow(folder) {
  const row = document.createElement('div');
  row.className = 'folder-row';
  row.innerHTML = `
    <div class="folder-icon">${folderSvg()}</div>
    <div class="folder-name">${folder.name}</div>
  `;
  row.addEventListener('click', () => {
    folderStack.push({ id: folder.id, name: folder.name });
    currentFolder = folder.id;
    render();
  });
  return row;
}

function renderGroupedFolders(sorted) {
  const groups = groupByDate(sorted);
  const order = getDateGroupOrder(sorted);

  order.forEach(groupName => {
    const items = groups[groupName];
    if (!items || items.length === 0) return;

    const header = document.createElement('div');
    header.className = 'date-group-header';
    header.textContent = groupName;
    assetList.appendChild(header);

    const folderContainer = document.createElement('div');
    folderContainer.className = 'folder-list';
    items.forEach(folder => {
      folderContainer.appendChild(renderFolderRow(folder));
    });
    assetList.appendChild(folderContainer);
  });
}

function renderFlatFolders(sorted) {
  if (sorted.length === 0) return;
  const container = document.createElement('div');
  container.className = 'folder-list';
  sorted.forEach(folder => {
    container.appendChild(renderFolderRow(folder));
  });
  assetList.appendChild(container);
}

function onRenderComplete() {
  if (typeof onboarding !== 'undefined' && onboarding.init && !onboarding.isComplete) {
    onboarding.onRender();
  }
}

function renderEmptyState() {
  return `<div class="empty-state">
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5"/>
      <path d="M16 16l4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
    <div>No results found</div>
  </div>`;
}

// --- Resize handle ---
const resizeHandle = document.getElementById('resizeHandle');
const taskPane = document.getElementById('taskPane');
let isResizing = false;

resizeHandle.addEventListener('mousedown', (e) => {
  isResizing = true;
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
  e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;
  const railWidth = 36;
  const newWidth = window.innerWidth - e.clientX - railWidth;
  const clamped = Math.max(240, Math.min(420, newWidth));
  taskPane.style.width = clamped + 'px';
});

document.addEventListener('mouseup', () => {
  if (isResizing) {
    isResizing = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }
});


// --- Drag & Drop: Right pane → Left slide panel & center canvas ---
function getActiveSlideIndex() {
  const wrappers = document.querySelectorAll('.slide-thumb-wrapper');
  for (let i = 0; i < wrappers.length; i++) {
    if (wrappers[i].classList.contains('active')) return i;
  }
  return 0;
}

function insertSlideAt(data, insertIdx) {
  const newSlide = {
    num: 0,
    title: data.name,
    sub: '',
    hasChart: false,
  };

  SLIDES.splice(insertIdx, 0, newSlide);
  SLIDES.forEach((s, i) => { s.num = i + 1; });

  renderSlideThumbnails();
  const wrappers = document.querySelectorAll('.slide-thumb-wrapper');
  wrappers.forEach(w => w.classList.remove('active'));
  if (wrappers[insertIdx]) wrappers[insertIdx].classList.add('active');

  updateStatusBar(insertIdx + 1);
}

function setupSlideDropTarget() {
  const slidePanel = document.querySelector('.slide-panel');
  const container = document.getElementById('slideThumbnails');
  let dropIndicator = null;

  function getDropIndicator() {
    if (!dropIndicator) {
      dropIndicator = document.createElement('div');
      dropIndicator.className = 'drop-indicator';
    }
    return dropIndicator;
  }

  function removeDropIndicator() {
    if (dropIndicator && dropIndicator.parentNode) {
      dropIndicator.parentNode.removeChild(dropIndicator);
    }
  }

  function getInsertIndex(y) {
    const wrappers = Array.from(container.querySelectorAll('.slide-thumb-wrapper'));
    for (let i = 0; i < wrappers.length; i++) {
      const rect = wrappers[i].getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      if (y < midY) return i;
    }
    return wrappers.length;
  }

  // Left slide panel drop target
  slidePanel.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    slidePanel.classList.add('drag-over');

    const indicator = getDropIndicator();
    const wrappers = Array.from(container.querySelectorAll('.slide-thumb-wrapper'));
    const insertIdx = getInsertIndex(e.clientY);

    if (insertIdx >= wrappers.length) {
      container.appendChild(indicator);
    } else {
      container.insertBefore(indicator, wrappers[insertIdx]);
    }
  });

  slidePanel.addEventListener('dragleave', (e) => {
    if (!slidePanel.contains(e.relatedTarget)) {
      slidePanel.classList.remove('drag-over');
      removeDropIndicator();
    }
  });

  slidePanel.addEventListener('drop', (e) => {
    e.preventDefault();
    slidePanel.classList.remove('drag-over');
    removeDropIndicator();

    let data;
    try {
      data = JSON.parse(e.dataTransfer.getData('application/json'));
    } catch { return; }

    insertSlideAt(data, getInsertIndex(e.clientY));
  });

  // Center canvas drop target — inserts after selected slide
  const slideCanvas = document.getElementById('slideCanvas');

  slideCanvas.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    slideCanvas.classList.add('drag-over');
  });

  slideCanvas.addEventListener('dragleave', (e) => {
    if (!slideCanvas.contains(e.relatedTarget)) {
      slideCanvas.classList.remove('drag-over');
    }
  });

  slideCanvas.addEventListener('drop', (e) => {
    e.preventDefault();
    slideCanvas.classList.remove('drag-over');

    let data;
    try {
      data = JSON.parse(e.dataTransfer.getData('application/json'));
    } catch { return; }

    const insertIdx = getActiveSlideIndex() + 1;
    insertSlideAt(data, insertIdx);
  });
}

function updateStatusBar(activeSlideNum) {
  const statusLeft = document.querySelector('.status-left');
  if (statusLeft) {
    const span = statusLeft.querySelector('span');
    if (span) span.textContent = `Slide ${activeSlideNum} of ${SLIDES.length}`;
  }
}

// --- Collapse / Expand Task Pane ---
const expandPaneBtn = document.getElementById('expandPaneBtn');
const expandPaneChevron = document.getElementById('expandPaneChevron');

function toggleTaskPane() {
  const isVisible = taskPane.style.display !== 'none';
  taskPane.style.display = isVisible ? 'none' : 'flex';
}

expandPaneBtn.addEventListener('click', toggleTaskPane);
expandPaneChevron.addEventListener('click', toggleTaskPane);

// =============================================
// Onboarding: Sequential Pulsating Dot System
// =============================================

const ONBOARDING_STEPS = [
  {
    id: 'library',
    version: 1,
    targetSelector: '#collapsedFilterBtn',
    popoverTitle: 'Content Library',
    popoverIcon: '<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="6" height="5" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M9 4h2M9 6h1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><rect x="1" y="9" width="6" height="5" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M9 11h2M9 13h1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
    popoverText: 'Open the content library to browse slides and assets',
    popoverTextB: 'Start here — open the library to explore your slides and assets',
    popoverTextD: 'Let\'s go! Open the content library to get started',
    highlightTarget: true,
    noPopover: true,
    requiresCollapsed: true,
    completionEvent: 'library-opened',
    stepIcon: '<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="6" height="5" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="1" y="9" width="6" height="5" rx="1" stroke="currentColor" stroke-width="1.2"/></svg>',
  },
  {
    id: 'sort',
    version: 1,
    targetSelector: '#sortBtn',
    popoverTitle: 'Sort',
    popoverIcon: '<svg viewBox="0 0 16 16" fill="none"><path d="M4 2v12M4 14l-3-3M4 14l3-3M12 14V2M12 2l-3 3M12 2l3 3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    popoverText: 'Sort your assets by name, date, or relevance',
    popoverTextB: 'Try sorting your assets — tap to organize by name, date, or relevance',
    popoverTextD: 'First up! Tap here to sort your assets by name, date, or relevance',
    highlightTarget: true,
    completionEvent: 'sort-used',
    stepIcon: '<svg viewBox="0 0 16 16" fill="none"><path d="M4 2v12M4 14l-3-3M4 14l3-3M12 14V2M12 2l-3 3M12 2l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    id: 'favorite',
    version: 1,
    targetSelector: '.asset-card-thumb',
    dotOffset: { top: 4, right: 4 },
    popoverTitle: 'Favorites',
    popoverIcon: '<svg viewBox="0 0 12 12" fill="none"><path d="M5.99997 0.25C6.30737 0.25 6.58382 0.437921 6.69724 0.723633L7.91989 3.80273L11.0644 4.07227C11.3617 4.0979 11.6156 4.29736 11.7109 4.58008C11.8061 4.863 11.7243 5.17582 11.5029 5.37598L9.08298 7.56055L9.82224 10.835C9.88912 11.1316 9.7695 11.4396 9.52048 11.6143C9.27146 11.7887 8.94158 11.7958 8.68552 11.6318L5.99997 9.91113L3.31442 11.6318C3.05836 11.7958 2.72848 11.7887 2.47946 11.6143C2.23044 11.4396 2.11082 11.1316 2.1777 10.835L2.91696 7.56055L0.49704 5.37598C0.27563 5.17582 0.193853 4.863 0.289032 4.58008C0.384305 4.29736 0.638284 4.0979 0.935516 4.07227L4.08005 3.80273L5.3027 0.723633C5.41612 0.437921 5.69257 0.25 5.99997 0.25ZM5.13278 5.21875L2.78317 5.41992L4.57321 7.03516L4.04294 9.38379L5.99997 8.12988L7.957 9.38379L7.42673 7.03516L9.21677 5.41992L6.86716 5.21875L5.99997 3.0332L5.13278 5.21875Z" fill="currentColor"/></svg>',
    popoverText: 'Add slides to your favorites for quick access',
    popoverTextB: 'Tap the star to save this slide to your favorites',
    popoverTextD: 'Love this slide? Star it to keep it close!',
    popoverPosition: 'above',
    completionEvent: 'favorite-used',
    stepIcon: '<svg viewBox="0 0 12 12" fill="none"><path d="M5.99997 0.25C6.30737 0.25 6.58382 0.437921 6.69724 0.723633L7.91989 3.80273L11.0644 4.07227C11.3617 4.0979 11.6156 4.29736 11.7109 4.58008C11.8061 4.863 11.7243 5.17582 11.5029 5.37598L9.08298 7.56055L9.82224 10.835C9.88912 11.1316 9.7695 11.4396 9.52048 11.6143C9.27146 11.7887 8.94158 11.7958 8.68552 11.6318L5.99997 9.91113L3.31442 11.6318C3.05836 11.7958 2.72848 11.7887 2.47946 11.6143C2.23044 11.4396 2.11082 11.1316 2.1777 10.835L2.91696 7.56055L0.49704 5.37598C0.27563 5.17582 0.193853 4.863 0.289032 4.58008C0.384305 4.29736 0.638284 4.0979 0.935516 4.07227L4.08005 3.80273L5.3027 0.723633C5.41612 0.437921 5.69257 0.25 5.99997 0.25ZM5.13278 5.21875L2.78317 5.41992L4.57321 7.03516L4.04294 9.38379L5.99997 8.12988L7.957 9.38379L7.42673 7.03516L9.21677 5.41992L6.86716 5.21875L5.99997 3.0332L5.13278 5.21875Z" fill="currentColor"/></svg>',
  },
  {
    id: 'favorites-nav',
    version: 1,
    targetSelector: '#favoritesNavBtn',
    popoverTitle: 'Favorites',
    popoverIcon: '<svg viewBox="0 0 12 12" fill="none"><path d="M5.99997 0.25C6.30737 0.25 6.58382 0.437921 6.69724 0.723633L7.91989 3.80273L11.0644 4.07227C11.3617 4.0979 11.6156 4.29736 11.7109 4.58008C11.8061 4.863 11.7243 5.17582 11.5029 5.37598L9.08298 7.56055L9.82224 10.835C9.88912 11.1316 9.7695 11.4396 9.52048 11.6143C9.27146 11.7887 8.94158 11.7958 8.68552 11.6318L5.99997 9.91113L3.31442 11.6318C3.05836 11.7958 2.72848 11.7887 2.47946 11.6143C2.23044 11.4396 2.11082 11.1316 2.1777 10.835L2.91696 7.56055L0.49704 5.37598C0.27563 5.17582 0.193853 4.863 0.289032 4.58008C0.384305 4.29736 0.638284 4.0979 0.935516 4.07227L4.08005 3.80273L5.3027 0.723633C5.41612 0.437921 5.69257 0.25 5.99997 0.25ZM5.13278 5.21875L2.78317 5.41992L4.57321 7.03516L4.04294 9.38379L5.99997 8.12988L7.957 9.38379L7.42673 7.03516L9.21677 5.41992L6.86716 5.21875L5.99997 3.0332L5.13278 5.21875Z" fill="currentColor"/></svg>',
    popoverText: 'Your favorites are saved here for quick access',
    popoverTextB: 'Find all your saved favorites here',
    popoverTextD: 'All your starred slides live right here — tap to see them!',
    highlightTarget: true,
    completionEvent: 'favorites-nav-used',
    stepIcon: '<svg viewBox="0 0 12 12" fill="none"><path d="M5.99997 0.25C6.30737 0.25 6.58382 0.437921 6.69724 0.723633L7.91989 3.80273L11.0644 4.07227C11.3617 4.0979 11.6156 4.29736 11.7109 4.58008C11.8061 4.863 11.7243 5.17582 11.5029 5.37598L9.08298 7.56055L9.82224 10.835C9.88912 11.1316 9.7695 11.4396 9.52048 11.6143C9.27146 11.7887 8.94158 11.7958 8.68552 11.6318L5.99997 9.91113L3.31442 11.6318C3.05836 11.7958 2.72848 11.7887 2.47946 11.6143C2.23044 11.4396 2.11082 11.1316 2.1777 10.835L2.91696 7.56055L0.49704 5.37598C0.27563 5.17582 0.193853 4.863 0.289032 4.58008C0.384305 4.29736 0.638284 4.0979 0.935516 4.07227L4.08005 3.80273L5.3027 0.723633C5.41612 0.437921 5.69257 0.25 5.99997 0.25ZM5.13278 5.21875L2.78317 5.41992L4.57321 7.03516L4.04294 9.38379L5.99997 8.12988L7.957 9.38379L7.42673 7.03516L9.21677 5.41992L6.86716 5.21875L5.99997 3.0332L5.13278 5.21875Z" fill="currentColor"/></svg>',
  },
  {
    id: 'flag',
    version: 1,
    targetSelector: '.asset-card-thumb',
    dotOffset: { top: 36, right: 4 },
    popoverTitle: 'Flag content',
    popoverIcon: '<svg viewBox="0 0 16 16" fill="none"><path d="M2 3a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6l-3 3V11a2 2 0 01-1-1.7V3z" stroke="currentColor" stroke-width="1.2"/></svg>',
    popoverText: 'Flag outdated content for your admin to review',
    popoverTextB: 'See something outdated? Tap to flag it for your admin',
    popoverTextD: 'Last one! Spot something outdated? Flag it and your admin will know',
    popoverPosition: 'above',
    completionEvent: 'flag-used',
    stepIcon: '<svg viewBox="0 0 16 16" fill="none"><path d="M2 3a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6l-3 3V11a2 2 0 01-1-1.7V3z" stroke="currentColor" stroke-width="1.3"/></svg>',
  },
];

const ONBOARDING_STORAGE_KEY = 'templafy_onboarding';
const ONBOARDING_VERSION = 1;

const onboarding = {
  currentStepIndex: 0,
  dotEl: null,
  ringEl: null,
  popoverEl: null,
  popoverTextEl: null,
  isComplete: false,
  positionRAF: null,
  currentVersion: 'A',

  init() {
    // Allow version pages to force a specific version
    if (window.ONBOARDING_VERSION) {
      this.currentVersion = window.ONBOARDING_VERSION;
    }
    // Allow skipping first step (start with pane open)
    if (window.ONBOARDING_SKIP_FIRST_STEP && this.currentStepIndex === 0) {
      this.currentStepIndex = 1;
    }

    this.popoverEl = document.getElementById('onboardingPopover');
    this.popoverTextEl = document.getElementById('onboardingPopoverText');

    // Close button
    const closeBtn = document.getElementById('onboardingPopoverClose');
    if (closeBtn) closeBtn.addEventListener('click', () => this.hidePopover());

    // Pause auto-hide while hovering the popover
    this.popoverEl.addEventListener('mouseenter', () => {
      clearTimeout(this._popoverAutoHide);
      clearTimeout(this._popoverLeaveTimer);
    });
    this.popoverEl.addEventListener('mouseleave', () => {
      this._popoverAutoHide = setTimeout(() => this.hidePopover(), 2000);
    });

    // Check localStorage
    const saved = this.loadState();
    if (saved && saved.version >= ONBOARDING_VERSION && saved.completed) {
      this.isComplete = true;
      this.currentStepIndex = ONBOARDING_STEPS.length;
      this.initToolbar();
      return;
    }
    if (saved && saved.stepIndex !== undefined) {
      this.currentStepIndex = saved.stepIndex;
    }

    // Create dot + ring elements
    this.dotEl = document.createElement('div');
    this.dotEl.className = 'onboarding-dot';
    this.ringEl = document.createElement('div');
    this.ringEl.className = 'onboarding-ring';

    // Dot hover shows popover
    this.dotEl.addEventListener('mouseenter', () => this.showPopoverHold());
    this.dotEl.addEventListener('mouseleave', () => this.hidePopoverDelayed());

    // Listen for completion events
    this.listenForCompletions();

    // Init toolbar
    this.initToolbar();

    // Apply version class
    this.applyVersion();

    // Show first active step
    this.activateStep();

    // Auto-show popover after delay if configured
    if (window.ONBOARDING_AUTO_POPOVER_DELAY) {
      setTimeout(() => {
        if (!this.isComplete) {
          this.showPopover();
          if (window.ONBOARDING_AUTO_POPOVER_HIDE) {
            setTimeout(() => this.hidePopover(), window.ONBOARDING_AUTO_POPOVER_HIDE);
          }
        }
      }, window.ONBOARDING_AUTO_POPOVER_DELAY);
    }
  },

  loadState() {
    try {
      return JSON.parse(localStorage.getItem(ONBOARDING_STORAGE_KEY));
    } catch { return null; }
  },

  saveState() {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify({
      version: ONBOARDING_VERSION,
      stepIndex: this.currentStepIndex,
      completed: this.isComplete,
    }));
  },

  activateStep() {
    if (this.currentStepIndex >= ONBOARDING_STEPS.length) {
      this.completeAll();
      return;
    }

    const step = ONBOARDING_STEPS[this.currentStepIndex];

    // Collapse/expand task pane based on step requirement
    const taskPane = document.getElementById('taskPane');
    if (step.requiresCollapsed) {
      taskPane.style.display = 'none';
    } else if (taskPane.style.display === 'none') {
      taskPane.style.display = 'flex';
    }

    this.hidePopover();
    this.removeDot();

    // Wait a tick for DOM to settle (cards may need to render)
    requestAnimationFrame(() => this.placeDot());
  },

  placeDot() {
    const step = ONBOARDING_STEPS[this.currentStepIndex];
    const target = document.querySelector(step.targetSelector);

    if (!target) {
      this._retryTimeout = setTimeout(() => this.placeDot(), 500);
      return;
    }

    document.body.appendChild(this.ringEl);
    // Entrance animation: scale from 0 with bounce
    this.dotEl.classList.add('dot-entering');
    this.ringEl.classList.add('dot-entering');
    const onEntranceDone = () => {
      this.dotEl.classList.remove('dot-entering');
      this.ringEl.classList.remove('dot-entering');
      this.dotEl.removeEventListener('animationend', onEntranceDone);
    };
    this.dotEl.addEventListener('animationend', onEntranceDone);

    document.body.appendChild(this.dotEl);
    if (this.currentVersion === 'C' && this.ring2El) {
      document.body.appendChild(this.ring2El);
    }
    // Version D: append gradient ring
    if (this.currentVersion === 'D' && this.dRingEl) {
      document.body.appendChild(this.dRingEl);
      this.positionDRing(target);
    }
    // Version E: append halo glow
    if (this.currentVersion === 'E' && this.eHaloEl) {
      document.body.appendChild(this.eHaloEl);
      this.positionEHalo(target);
    }

    this._positionDotOnTarget(target, step.dotOffset);

    // Show popover when hovering the dot's area or the target
    this._targetHoverIn = () => this.showPopoverHold();
    this._targetHoverOut = () => this.hidePopoverDelayed();
    target.addEventListener('mouseenter', this._targetHoverIn);
    target.addEventListener('mouseleave', this._targetHoverOut);
    this._currentTarget = target;

    // For card-based steps, also show card actions on dot hover
    const parentCard = target.closest('.asset-card');
    if (parentCard) {
      this._hoverCard = parentCard;
      this._dotCardHoverIn = () => parentCard.classList.add('onboarding-hover');
      this._dotCardHoverOut = () => parentCard.classList.remove('onboarding-hover');
      this.dotEl.addEventListener('mouseenter', this._dotCardHoverIn);
      this.dotEl.addEventListener('mouseleave', this._dotCardHoverOut);
      target.addEventListener('mouseenter', this._dotCardHoverIn);
      target.addEventListener('mouseleave', this._dotCardHoverOut);
    }

    // Version B: subtle highlight on navigation targets
    if (this.currentVersion === 'B' && step.highlightTarget) {
      target.classList.add('onboarding-highlight');
      this._highlightedTarget = target;
    }

    this._startPositionLoop(target);
  },

  _positionDotOnTarget(target, offset) {
    const rect = target.getBoundingClientRect();
    const dotSize = 8;
    let top, left;

    if (offset) {
      // Custom offset: position relative to the target's top-right area
      top = rect.top + offset.top;
      left = rect.right - offset.right - dotSize;
    } else {
      // Default: top-right corner of target
      top = rect.top - dotSize / 2 + 2;
      left = rect.right - dotSize / 2 - 2;
    }

    this.dotEl.style.position = 'fixed';
    this.dotEl.style.top = top + 'px';
    this.dotEl.style.left = left + 'px';

    this.ringEl.style.position = 'fixed';
    this.ringEl.style.top = top + 'px';
    this.ringEl.style.left = left + 'px';

    if (this.ring2El && this.ring2El.parentNode) {
      this.ring2El.style.position = 'fixed';
      this.ring2El.style.top = top + 'px';
      this.ring2El.style.left = left + 'px';
    }

    // Hide dot/rings when card-targeting steps scroll outside the asset list
    const step = ONBOARDING_STEPS[this.currentStepIndex];
    const isCardStep = step && (step.id === 'favorite' || step.id === 'flag');
    if (isCardStep) {
      const assetList = document.getElementById('assetList');
      if (assetList) {
        const listRect = assetList.getBoundingClientRect();
        const isOutside = top < listRect.top || top > listRect.bottom;
        const vis = isOutside ? 'hidden' : 'visible';
        this.dotEl.style.visibility = vis;
        this.ringEl.style.visibility = vis;
        if (this.ring2El && this.ring2El.parentNode) this.ring2El.style.visibility = vis;
      }
    } else {
      this.dotEl.style.visibility = 'visible';
      this.ringEl.style.visibility = 'visible';
      if (this.ring2El && this.ring2El.parentNode) this.ring2El.style.visibility = 'visible';
    }
  },

  _startPositionLoop(target) {
    this._stopPositionLoop();
    const step = ONBOARDING_STEPS[this.currentStepIndex];
    const loop = () => {
      if (!this.dotEl || !this.dotEl.parentNode) return;
      const el = document.querySelector(step?.targetSelector);
      if (el) {
        this._positionDotOnTarget(el, step?.dotOffset);
        // Version D: also reposition gradient ring
        if (this.currentVersion === 'D') {
          this.positionDRing(el);
        }
        // Version E: also reposition halo glow
        if (this.currentVersion === 'E') {
          this.positionEHalo(el);
        }
      }
      this.positionRAF = requestAnimationFrame(loop);
    };
    this.positionRAF = requestAnimationFrame(loop);
  },

  _stopPositionLoop() {
    if (this.positionRAF) {
      cancelAnimationFrame(this.positionRAF);
      this.positionRAF = null;
    }
  },

  removeDot() {
    this._stopPositionLoop();
    if (this._retryTimeout) clearTimeout(this._retryTimeout);
    if (this.dotEl && this.dotEl.parentNode) this.dotEl.parentNode.removeChild(this.dotEl);
    if (this.ringEl && this.ringEl.parentNode) this.ringEl.parentNode.removeChild(this.ringEl);
    if (this.ring2El && this.ring2El.parentNode) this.ring2El.parentNode.removeChild(this.ring2El);
    if (this.dRingEl && this.dRingEl.parentNode) this.dRingEl.parentNode.removeChild(this.dRingEl);
    if (this.eHaloEl && this.eHaloEl.parentNode) this.eHaloEl.parentNode.removeChild(this.eHaloEl);

    // Remove hover listeners from previous target
    if (this._currentTarget) {
      this._currentTarget.removeEventListener('mouseenter', this._targetHoverIn);
      this._currentTarget.removeEventListener('mouseleave', this._targetHoverOut);
      if (this._dotCardHoverIn) {
        this._currentTarget.removeEventListener('mouseenter', this._dotCardHoverIn);
        this._currentTarget.removeEventListener('mouseleave', this._dotCardHoverOut);
      }
      this._currentTarget = null;
    }
    if (this._hoverCard) {
      this._hoverCard.classList.remove('onboarding-hover');
      this._hoverCard = null;
    }
    if (this._highlightedTarget) {
      this._highlightedTarget.classList.remove('onboarding-highlight');
      this._highlightedTarget = null;
    }
    if (this.dotEl && this._dotCardHoverIn) {
      this.dotEl.removeEventListener('mouseenter', this._dotCardHoverIn);
      this.dotEl.removeEventListener('mouseleave', this._dotCardHoverOut);
      this._dotCardHoverIn = null;
      this._dotCardHoverOut = null;
    }
  },

  showPopover() {
    const step = ONBOARDING_STEPS[this.currentStepIndex];
    if (!step || step.noPopover) return;

    document.getElementById('onboardingPopoverIcon').innerHTML = step.popoverIcon;
    document.getElementById('onboardingPopoverTitle').textContent = step.popoverTitle;

    // Use version-specific text if available
    const textKey = 'popoverText' + this.currentVersion;
    this.popoverTextEl.textContent = step[textKey] || step.popoverText;

    // Render step counter (visible only in Version B via CSS)
    const counterEl = document.getElementById('onboardingPopoverStepCounter');
    const dotsEl = document.getElementById('onboardingPopoverStepDots');
    if (counterEl && dotsEl) {
      const total = ONBOARDING_STEPS.length;
      const current = this.currentStepIndex + 1;
      counterEl.textContent = current + ' of ' + total;
      {
        dotsEl.innerHTML = ONBOARDING_STEPS.map((_, i) => {
          const cls = i < this.currentStepIndex ? 'done' : i === this.currentStepIndex ? 'active' : '';
          return '<div class="onboarding-popover-step-dot ' + cls + '"></div>';
        }).join('');
      }
    }

    // Render round dots row for versions that use it
    const dotsRowEl = document.getElementById('onboardingPopoverDotsRow');
    if (dotsRowEl) {
      dotsRowEl.innerHTML = ONBOARDING_STEPS.map((_, i) => {
        const cls = i === this.currentStepIndex ? 'active' : '';
        return '<div class="dot ' + cls + '"></div>';
      }).join('');
    }

    this.popoverEl.style.position = 'fixed';

    // Always position popover below the target element so it doesn't cover the action button
    const refEl = ((this.currentVersion === 'D' || this.currentVersion === 'E') && this._currentTarget) ? this._currentTarget : this.dotEl;
    const refRect = refEl.getBoundingClientRect();
    const gap = this.currentVersion === 'D' ? 12 : this.currentVersion === 'E' ? 8 : this.currentVersion === 'A' ? 8 : 6;
    // Use the actual target element rect to find the bottom edge
    const targetEl = this._currentTarget || this.dotEl;
    const targetRect = targetEl.getBoundingClientRect();
    this.popoverEl.style.left = (refRect.left + refRect.width / 2 - 120) + 'px';
    this.popoverEl.style.top = (targetRect.bottom + gap) + 'px';
    this.popoverEl.style.transform = 'scale(1)';

    // Clamp popover within task pane edges (8px padding)
    const pane = document.getElementById('taskPane');
    if (pane) {
      const paneRect = pane.getBoundingClientRect();
      const popRect = this.popoverEl.getBoundingClientRect();
      const pad = 24;
      let left = parseFloat(this.popoverEl.style.left);
      if (left < paneRect.left + pad) left = paneRect.left + pad;
      if (left + popRect.width > paneRect.right - pad) left = paneRect.right - pad - popRect.width;
      this.popoverEl.style.left = left + 'px';
    }

    this.popoverEl.classList.add('visible');
  },

  showPopoverHold() {
    clearTimeout(this._popoverLeaveTimer);
    clearTimeout(this._popoverAutoHide);
    this.showPopover();
  },

  showPopoverTimed() {
    clearTimeout(this._popoverLeaveTimer);
    this.showPopover();
    clearTimeout(this._popoverAutoHide);
    this._popoverAutoHide = setTimeout(() => this.hidePopover(), 2000);
  },

  hidePopoverDelayed() {
    this._popoverLeaveTimer = setTimeout(() => this.hidePopover(), 150);
  },

  hidePopover() {
    clearTimeout(this._popoverAutoHide);
    clearTimeout(this._popoverLeaveTimer);
    if (this.popoverEl) this.popoverEl.classList.remove('visible');
  },

  applyVersion() {
    if (!this.popoverEl) return;
    this.popoverEl.classList.remove('version-A', 'version-B', 'version-C', 'version-D', 'version-E');
    this.popoverEl.classList.add('version-' + this.currentVersion);
    // Version C beacon dot style
    document.body.classList.toggle('version-C-dot', this.currentVersion === 'C');
    document.body.classList.toggle('version-D-dot', this.currentVersion === 'D');
    document.body.classList.toggle('version-E-dot', this.currentVersion === 'E');
    // Manage extra ripple ring for version C
    if (this.currentVersion === 'C') {
      if (!this.ring2El) {
        this.ring2El = document.createElement('div');
        this.ring2El.className = 'onboarding-ring-2';
      }
    }
    // Version D: gradient ring element
    if (this.currentVersion === 'D') {
      if (!this.dRingEl) {
        this.dRingEl = document.createElement('div');
        this.dRingEl.className = 'onboarding-d-ring';
        this.dRingEl.innerHTML = '<div class="onboarding-d-ring-inner"></div>';
      }
    }
    if (this.currentVersion !== 'D') {
      if (this.dRingEl && this.dRingEl.parentNode) this.dRingEl.remove();
    }
    // Version E: halo glow element
    if (this.currentVersion === 'E') {
      if (!this.eHaloEl) {
        this.eHaloEl = document.createElement('div');
        this.eHaloEl.className = 'onboarding-e-halo';
      }
    }
    if (this.currentVersion !== 'E') {
      if (this.eHaloEl && this.eHaloEl.parentNode) this.eHaloEl.remove();
    }
  },

  // --- Version D helpers ---
  positionDRing(target) {
    if (!this.dRingEl || this.currentVersion !== 'D') return;
    // For card steps, wrap the whole card (thumb + title)
    const card = target.closest('.asset-card');
    const ringTarget = card || target;
    const rect = ringTarget.getBoundingClientRect();
    const pad = 4;
    this.dRingEl.style.position = 'fixed';
    this.dRingEl.style.left = (rect.left - pad) + 'px';
    this.dRingEl.style.top = (rect.top - pad) + 'px';
    this.dRingEl.style.width = (rect.width + pad * 2) + 'px';
    this.dRingEl.style.height = (rect.height + pad * 2) + 'px';

    // Clip ring so it doesn't overlap navigation/toolbar (only for card-targeting steps)
    const step = ONBOARDING_STEPS[this.currentStepIndex];
    const isCardStep = step && (step.id === 'favorite' || step.id === 'flag');
    if (isCardStep) {
      const assetList = document.getElementById('assetList');
      if (assetList) {
        const listRect = assetList.getBoundingClientRect();
        const ringTop = rect.top - pad;
        const ringHeight = rect.height + pad * 2;
        if (ringTop < listRect.top) {
          const clipTop = listRect.top - ringTop;
          this.dRingEl.style.clipPath = `inset(${clipTop}px 0 0 0)`;
        } else if (ringTop + ringHeight > listRect.bottom) {
          const clipBottom = (ringTop + ringHeight) - listRect.bottom;
          this.dRingEl.style.clipPath = `inset(0 0 ${clipBottom}px 0)`;
        } else {
          this.dRingEl.style.clipPath = '';
        }
      }
    } else {
      this.dRingEl.style.clipPath = '';
    }
  },

  // --- Version E helpers ---
  positionEHalo(target) {
    if (!this.eHaloEl || this.currentVersion !== 'E') return;
    // For card steps, wrap the whole card
    const card = target.closest('.asset-card');
    const haloTarget = card || target;
    const rect = haloTarget.getBoundingClientRect();
    const pad = 4;
    this.eHaloEl.style.left = (rect.left - pad) + 'px';
    this.eHaloEl.style.top = (rect.top - pad) + 'px';
    this.eHaloEl.style.width = (rect.width + pad * 2) + 'px';
    this.eHaloEl.style.height = (rect.height + pad * 2) + 'px';
    // Match border-radius to target (buttons get 4px, cards get 6px)
    this.eHaloEl.style.borderRadius = card ? '6px' : '4px';

    // Clip halo so it doesn't overlap navigation/toolbar (only for card-targeting steps)
    const step = ONBOARDING_STEPS[this.currentStepIndex];
    const isCardStep = step && (step.id === 'favorite' || step.id === 'flag');
    if (isCardStep) {
      const assetList = document.getElementById('assetList');
      if (assetList) {
        const listRect = assetList.getBoundingClientRect();
        const haloTop = rect.top - pad;
        const haloHeight = rect.height + pad * 2;
        if (haloTop < listRect.top) {
          const clipTop = listRect.top - haloTop;
          this.eHaloEl.style.clipPath = `inset(${clipTop}px 0 0 0)`;
        } else if (haloTop + haloHeight > listRect.bottom) {
          const clipBottom = (haloTop + haloHeight) - listRect.bottom;
          this.eHaloEl.style.clipPath = `inset(0 0 ${clipBottom}px 0)`;
        } else {
          this.eHaloEl.style.clipPath = '';
        }
      }
    } else {
      this.eHaloEl.style.clipPath = '';
    }
  },



  completeStep(eventName) {
    if (this.isComplete) return;
    const step = ONBOARDING_STEPS[this.currentStepIndex];
    if (!step || step.completionEvent !== eventName) return;

    this.removeDot();
    this.hidePopover();
    this.currentStepIndex++;
    this.saveState();

    this.updateToolbar();

    if (this.currentStepIndex >= ONBOARDING_STEPS.length) {
      this.completeAll();
    } else {
      // 1 second delay before showing next step
      setTimeout(() => this.activateStep(), 1000);
    }
  },

  completeAll() {
    this.isComplete = true;
    this.removeDot();
    this.hidePopover();
    this.saveState();
    this.updateToolbar();
    // Version D: set progress to 100% then hide
    const progressEl = document.getElementById('onboardingDProgress');
    const fill = document.getElementById('onboardingDProgressFill');
    if (fill) fill.style.width = '100%';
    setTimeout(() => {
      if (progressEl) progressEl.style.display = 'none';
    }, 1500);
  },

  listenForCompletions() {
    // Library — complete when user clicks the collapsed library button
    document.getElementById('collapsedFilterBtn').addEventListener('click', () => {
      // Expand the task pane
      document.getElementById('taskPane').style.display = 'flex';
      this.completeStep('library-opened');
    });

    // Sort — complete when user clicks the sort button (opens dropdown)
    document.getElementById('sortBtn').addEventListener('click', () => {
      this.completeStep('sort-used');
    });

    // Favorites nav button — complete when user clicks it
    document.getElementById('favoritesNavBtn').addEventListener('click', () => {
      this.completeStep('favorites-nav-used');
    });

    // Favorite & flag on cards: use capture phase since card handlers call stopPropagation
    document.getElementById('assetList').addEventListener('click', (e) => {
      const favBtn = e.target.closest('[data-action="favorite"]');
      if (favBtn) {
        this.completeStep('favorite-used');
        return;
      }
      const flagBtn = e.target.closest('[data-action="flag"]');
      if (flagBtn) {
        this.completeStep('flag-used');
      }
    }, true);
  },

  // --- Prototype toolbar ---
  initToolbar() {
    this.toolbarStepsEl = document.getElementById('protoToolbarSteps');
    if (!this.toolbarStepsEl) return;

    this.toolbarStepsEl.innerHTML = '';
    ONBOARDING_STEPS.forEach((step) => {
      const dot = document.createElement('div');
      dot.className = 'proto-step-dot';
      dot.title = step.id;
      this.toolbarStepsEl.appendChild(dot);
    });

    this.updateToolbar();

    document.getElementById('protoResetBtn').addEventListener('click', () => {
      this.removeDot();
      this.hidePopover();
      this.currentStepIndex = 0;
      this.isComplete = false;
      this.saveState();
      this.updateToolbar();
      // Reset favorites state
      favoritedIds.clear();
      showFavorites = false;
      updateFavoritesNavBtn();
      // Also reset any favorited stars
      document.querySelectorAll('.asset-card-action-btn.favorited').forEach(btn => {
        btn.classList.remove('favorited');
        btn.querySelector('path')?.setAttribute('fill', 'none');
        btn.closest('.asset-card-actions')?.classList.remove('has-favorited');
      });
      this.applyVersion();
      render();
      this.activateStep();
    });

    // Version switcher
    document.querySelectorAll('.proto-version-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.proto-version-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentVersion = btn.dataset.version;
        this.applyVersion();
        // Reset onboarding to show changes
        this.removeDot();
        this.hidePopover();
        this.currentStepIndex = 0;
        this.isComplete = false;
        this.saveState();
        this.updateToolbar();
        favoritedIds.clear();
        showFavorites = false;
        updateFavoritesNavBtn();
        document.querySelectorAll('.asset-card-action-btn.favorited').forEach(b => {
          b.classList.remove('favorited');
          b.querySelector('path')?.setAttribute('fill', 'none');
          b.closest('.asset-card-actions')?.classList.remove('has-favorited');
        });
        render();
        this.activateStep();
      });
    });

    document.getElementById('protoSkipBtn').addEventListener('click', () => {
      if (this.isComplete) return;
      this.removeDot();
      this.hidePopover();
      this.currentStepIndex++;
      this.saveState();
      if (this.currentStepIndex >= ONBOARDING_STEPS.length) {
        this.completeAll();
      } else {
        this.activateStep();
      }
      this.updateToolbar();
    });
  },

  updateToolbar() {
    if (!this.toolbarStepsEl) return;
    const dots = this.toolbarStepsEl.querySelectorAll('.proto-step-dot');
    dots.forEach((dot, i) => {
      dot.classList.remove('active', 'completed');
      if (i < this.currentStepIndex || this.isComplete) {
        dot.classList.add('completed');
      } else if (i === this.currentStepIndex && !this.isComplete) {
        dot.classList.add('active');
      }
    });
  },

  // Called after render() to re-place dot if target changed
  onRender() {
    if (this.isComplete) return;
    if (this.currentStepIndex >= ONBOARDING_STEPS.length) return;
    this.removeDot();
    requestAnimationFrame(() => this.placeDot());
  },
};

// --- Init ---
updateSortIcon();
renderSlideThumbnails();
render();
setupSlideDropTarget();

// Initialize onboarding after initial render
onboarding.init();
