(() => {
  const root = document.documentElement;
  let saved;
  try { saved = localStorage.getItem('shlomo_theme'); } catch {}
  root.dataset.theme = saved === 'light' ? 'light' : 'dark';
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('themeToggle');
    if (!button) return;
    function render() {
      const light = root.dataset.theme === 'light';
      const he = root.lang === 'he';
      button.children[0].textContent = light ? '☀' : '☾';
      button.children[1].textContent = he ? (light ? 'בהיר' : 'כהה') : (light ? 'Light' : 'Dark');
      button.setAttribute('aria-label', he ? (light ? 'מעבר למצב כהה' : 'מעבר למצב בהיר') : (light ? 'Switch to dark mode' : 'Switch to light mode'));
      button.setAttribute('aria-pressed', String(light));
    }
    button.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('shlomo_theme', root.dataset.theme); } catch {}
      render();
    });
    new MutationObserver(render).observe(root, {attributes: true, attributeFilter: ['lang']});
    render();
  });
})();
