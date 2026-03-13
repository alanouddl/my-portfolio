// Menu toggle (mobile)
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');
if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Theme toggle (persist in localStorage)
const themeToggle = document.getElementById('theme-toggle');
function applyTheme(dark) {
  document.body.classList.toggle('dark', !!dark);
  if (themeToggle) themeToggle.setAttribute('aria-pressed', String(!!dark));
}
const savedTheme = localStorage.getItem('theme') === 'dark';
applyTheme(savedTheme);
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Smooth scroll for same-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // set focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});

/* Project details modal */
const projectDetailsButtons = document.querySelectorAll('.project-details');
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');
let lastFocused = null;

const PROJECT_DATA = {
  p1: {
    title: 'Recipe Finder',
    html: '<p>This small app lets you search recipes by ingredient. It demonstrates accessible forms, result lists, and keyboard support.</p><p><strong>Features:</strong> search, filter, responsive layout.</p>'
  },
  p2: {
    title: 'Minimal Blog Template',
    html: '<p>A mobile-first blog template focused on readable typography and accessible navigation.</p><p><strong>Features:</strong> responsive grid, semantic HTML.</p>'
  },
  p3: {
    title: 'Accessible To‑Do',
    html: '<p>A to‑do app showing task CRUD, keyboard interactions, and localStorage persistence.</p><p><strong>Features:</strong> add/edit/delete, keyboard shortcuts, persistent storage.</p>'
  }
};

function openModal(id) {
  const data = PROJECT_DATA[id];
  if (!data) return;
  lastFocused = document.activeElement;
  if (modalBody) modalBody.innerHTML = `<h4>${data.title}</h4>${data.html}`;
  modal?.setAttribute('aria-hidden', 'false');
  // focus modal for screen readers
  const title = modal.querySelector('#modal-title');
  if (title) title.focus();
}

function closeModal() {
  modal?.setAttribute('aria-hidden', 'true');
  if (lastFocused) lastFocused.focus();
}

projectDetailsButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const id = btn.getAttribute('data-project');
    openModal(id);
  });
});

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(); // click on overlay
  });
}

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  }
});

// Simple accessibility: ensure nav closes when focus moves away on small screens
document.addEventListener('click', (e) => {
  if (!primaryNav) return;
  if (primaryNav.classList.contains('open') && !primaryNav.contains(e.target) && e.target !== menuToggle) {
    primaryNav.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }
});
