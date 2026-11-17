/* Apply the saved theme before paint; storage may be unavailable in embedded pages. */
(() => {
 'use strict';
 const root = document.documentElement;
 let theme = 'light';
 try { if (localStorage.getItem('southview-theme') === 'dark') theme = 'dark'; } catch {}
 const apply = value => {
  theme = value;
  root.dataset.theme = theme;
  document.querySelectorAll('[data-theme-toggle]').forEach(button => {
   button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
   button.setAttribute('aria-pressed', String(theme === 'dark'));
   button.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  });
 };
 apply(theme);
 document.addEventListener('DOMContentLoaded', () => {
  apply(theme);
  document.querySelectorAll('[data-theme-toggle]').forEach(button => {
   button.addEventListener('click', () => {
    apply(theme === 'dark' ? 'light' : 'dark');
    try { localStorage.setItem('southview-theme', theme); } catch {}
   });
  });
 });
 window.addEventListener('storage', event => {
  if (event.key === 'southview-theme' || event.key === null) apply(event.newValue === 'dark' ? 'dark' : 'light');
 });
})();
