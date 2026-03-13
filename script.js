// Example: Change background color on button click
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
    document.body.style.backgroundColor = 'darkgrey';
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Smooth scroll for in-page links (modern browsers)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      // move focus for accessibility
      target.setAttribute('tabindex','-1');
      target.focus({preventScroll:true});
    }
  });
});