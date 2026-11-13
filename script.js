// Mobile menu
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  menu.classList.toggle('is-open', !open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', 'false');
  menu.classList.remove('is-open');
}));

// Border under nav once scrolled
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Spice filter
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('#spice-grid .card');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-selected', 'false'); });
  chip.classList.add('is-active');
  chip.setAttribute('aria-selected', 'true');
  const f = chip.dataset.filter;
  cards.forEach(card => {
    const tags = card.dataset.tags.split(' ');
    card.classList.toggle('is-hidden', f !== 'all' && !tags.includes(f));
  });
}));

// Fade sections in as they scroll into view
const revealTargets = document.querySelectorAll('.section__head, .card, .blend, .gift, .promise, .recipe, .story__art, .story__copy, .contact__inner > *');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => { el.classList.add('reveal'); io.observe(el); });
}

// Repeat the marquee items so the strip loops smoothly
const track = document.querySelector('.marquee__track');
if (track) track.innerHTML += track.innerHTML;

document.getElementById('year').textContent = new Date().getFullYear();
