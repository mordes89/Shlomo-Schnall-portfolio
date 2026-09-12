function setupVideoCarousel(section, track) {
  const originals = [...track.children];
  const count = originals.length;
  if (!count) return;
  const before = document.createDocumentFragment();
  const after = document.createDocumentFragment();
  originals.forEach(card => {
    for (const fragment of [before, after]) {
      const copy = card.cloneNode(true);
      copy.tabIndex = -1;
      copy.setAttribute('aria-hidden', 'true');
      fragment.appendChild(copy);
    }
  });
  track.prepend(before);
  track.append(after);
  const cards = [...track.children];
  const controls = document.createElement('div');
  controls.className = 'photo-controls';
  const previous = document.createElement('button');
  const next = document.createElement('button');
  const counter = document.createElement('span');
  counter.className = 'photo-position';
  counter.dir = 'ltr';
  counter.setAttribute('aria-live', 'polite');
  [previous, next].forEach((button, i) => {
    button.type = 'button';
    button.className = 'photo-arrow';
    button.textContent = i ? '→' : '←';
    button.setAttribute('aria-label', i ? 'Next video' : 'Previous video');
  });
  controls.append(previous, counter, next);
  section.append(controls);
  let current = count, drag = null, suppressClick = false, settleTimer;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rtl = () => document.documentElement.dir === 'rtl';
  const modulo = n => (n % count + count) % count;
  const edge = el => {
    const rect = el.getBoundingClientRect();
    const inset = el === track ? parseFloat(getComputedStyle(track).paddingInlineStart) || 0 : 0;
    return rtl() ? rect.right - inset : rect.left + inset;
  };
  function nearest() {
    let index = current, distance = Infinity;
    cards.forEach((card, i) => {
      const d = Math.abs(edge(card) - edge(track));
      if (d < distance) { distance = d; index = i; }
    });
    return index;
  }
  function update() {
    current = nearest();
    const text = `${modulo(current) + 1} / ${count}`;
    if (counter.textContent !== text) counter.textContent = text;
  }
  function rebase() {
    const index = nearest();
    const equivalent = count + modulo(index);
    if (index !== equivalent) {
      const shift = edge(cards[equivalent]) - edge(cards[index]);
      track.classList.add('is-rebasing');
      track.scrollBy({left: shift, behavior: 'instant'});
      if (drag) drag.scroll += shift;
      if (document.activeElement === cards[index]) cards[equivalent].focus({preventScroll: true});
      track.classList.remove('is-rebasing');
    }
    update();
  }
  function show(index, instant = false) {
    current = Math.max(0, Math.min(cards.length - 1, index));
    track.scrollBy({left: edge(cards[current]) - edge(track), behavior: instant || reduced() ? 'instant' : 'smooth'});
    update();
  }
  function step(delta) {
    rebase();
    const index = current + delta;
    show(index);
    return index;
  }
  previous.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  track.addEventListener('scroll', () => {
    update();
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => { if (!drag) rebase(); }, 180);
  }, {passive: true});
  track.addEventListener('scrollend', () => { if (!drag) rebase(); });
  track.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const index = step((event.key === 'ArrowRight') !== rtl() ? 1 : -1);
    cards[index].focus({preventScroll: true});
  });
  track.addEventListener('pointerdown', event => {
    suppressClick = false;
    if (event.pointerType === 'mouse' && event.button === 0) {
      rebase();
      drag = {x: event.clientX, scroll: track.scrollLeft};
    }
  });
  track.addEventListener('pointermove', event => {
    if (!drag) return;
    if (Math.abs(event.clientX - drag.x) > 6) {
      suppressClick = true;
      track.setPointerCapture(event.pointerId);
      track.classList.add('is-dragging');
      track.scrollLeft = drag.scroll - (event.clientX - drag.x);
      const index = nearest();
      if (index < count || index >= count * 2) rebase();
    }
  });
  const stop = () => {
    if (!drag) return;
    const moved = suppressClick;
    drag = null;
    track.classList.remove('is-dragging');
    if (moved) { rebase(); show(current); }
  };
  track.addEventListener('pointerup', stop);
  track.addEventListener('pointercancel', stop);
  track.addEventListener('lostpointercapture', stop);
  track.addEventListener('click', event => {
    if (suppressClick) { event.preventDefault(); suppressClick = false; }
  }, true);
  track.addEventListener('dragstart', event => event.preventDefault());
  new ResizeObserver(() => show(count + modulo(current), true)).observe(track);
  new MutationObserver(() => show(count + modulo(current), true)).observe(document.documentElement, {attributes: true, attributeFilter: ['dir']});
  show(count, true);
}
