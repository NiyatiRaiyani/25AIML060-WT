document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('[data-confirm]').forEach(el => el.addEventListener('click', e => {
    if (!confirm(el.dataset.confirm || 'Are you sure?')) e.preventDefault();
  }));
  const search = document.querySelector('[data-table-search]');
  if (search) search.addEventListener('input', () => {
    const q = search.value.toLowerCase();
    document.querySelectorAll('[data-search-row]').forEach(row => {
      row.hidden = !row.textContent.toLowerCase().includes(q);
    });
  });
  const eventSearch = document.querySelector('#eventSearch');
  if (eventSearch) eventSearch.addEventListener('input', () => {
    const q = eventSearch.value.toLowerCase();
    document.querySelectorAll('[data-event-card]').forEach(card => card.hidden = !card.textContent.toLowerCase().includes(q));
  });
});