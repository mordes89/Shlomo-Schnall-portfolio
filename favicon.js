(() => {
  const icon = document.getElementById('pianoFavicon');
  if (!icon) return;
  const still = icon.href;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let timer = null, frame = 0, frames = [];
  function stop() {
    clearInterval(timer);
    timer = null;
    icon.href = still;
  }
  function sync() {
    stop();
    if (motion.matches || document.hidden || !frames.length) return;
    timer = setInterval(() => {
      icon.href = frames[frame++ % frames.length];
    }, 700);
  }
  // Reuse the site's grand-piano mark; only the highlighted keys move.
  fetch(still).then(response => {
    if (!response.ok) throw new Error('Favicon unavailable');
    return response.text();
  }).then(svg => {
    frames = [16, 26, 36, 46, 36, 26].map(x => {
      const key = `<rect x="${x - 1.5}" y="34" width="3" height="6" rx="1" fill="#fff4cc"/>`;
      return 'data:image/svg+xml,' + encodeURIComponent(svg.replace('</svg>', key + '</svg>'));
    });
    sync();
  }).catch(stop);
  motion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', stop);
  window.addEventListener('pageshow', sync);
})();
