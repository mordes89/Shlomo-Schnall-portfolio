document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.photo-carousel');
  if (!gallery) return;
  const stage = gallery.querySelector('.photo-stage');
  const originals = [...stage.querySelectorAll('.photo-slide')];
  const count = originals.length;
  if (!count) return;
  // Identical neighboring rounds keep both ends visually connected.
  const before = document.createDocumentFragment();
  const after = document.createDocumentFragment();
  originals.forEach(slide => {
    for (const fragment of [before, after]) {
      const copy = slide.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      fragment.appendChild(copy);
    }
  });
  stage.prepend(before);
  stage.append(after);
  const slides = [...stage.querySelectorAll('.photo-slide')];
  const position = gallery.querySelector('.photo-position');
  const rtl = () => document.documentElement.dir === 'rtl';
  const modulo = n => (n % count + count) % count;
  let active = count, drag = null, frame, settleTimer;
  const center = el => { const r = el.getBoundingClientRect(); return r.left + r.width / 2; };
  function nearest() {
    const middle = center(stage);
    let result = active, distance = Infinity;
    slides.forEach((slide, i) => {
      const d = Math.abs(center(slide) - middle);
      if (d < distance) { result = i; distance = d; }
    });
    return result;
  }
  function select(index) {
    active = index;
    slides.forEach((slide, i) => slide.classList.toggle('is-current', i === active));
    const text = `${modulo(active) + 1} / ${count}`;
    if (position.textContent !== text) position.textContent = text;
  }
  function rebase() {
    const index = nearest();
    const equivalent = count + modulo(index);
    if (index !== equivalent) {
      const shift = center(slides[equivalent]) - center(slides[index]);
      stage.classList.add('is-rebasing');
      stage.scrollBy({left: shift, behavior: 'instant'});
      if (drag) drag.scroll += shift;
      stage.classList.remove('is-rebasing');
    }
    select(equivalent);
  }
  function show(index, instant = false) {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    select(target);
    stage.scrollBy({left: center(slides[target]) - center(stage), behavior: instant || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }
  function step(delta) {
    rebase();
    show(active + delta);
  }
  stage.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => select(nearest()));
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => { if (!drag) rebase(); }, 180);
  }, {passive: true});
  stage.addEventListener('scrollend', () => { if (!drag) rebase(); });
  gallery.querySelector('.photo-prev').addEventListener('click', () => step(-1));
  gallery.querySelector('.photo-next').addEventListener('click', () => step(1));
  gallery.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') show(count);
    else if (event.key === 'End') show(count * 2 - 1);
    else step((event.key === 'ArrowRight') !== rtl() ? 1 : -1);
  });
  stage.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    rebase();
    drag = {x: event.clientX, scroll: stage.scrollLeft};
    stage.setPointerCapture(event.pointerId);
    stage.classList.add('is-dragging');
    event.preventDefault();
  });
  stage.addEventListener('pointermove', event => {
    if (!drag) return;
    stage.scrollLeft = drag.scroll - (event.clientX - drag.x);
    const index = nearest();
    if (index < count || index >= count * 2) rebase();
  });
  function endDrag() {
    if (!drag) return;
    drag = null;
    stage.classList.remove('is-dragging');
    rebase();
    show(active);
  }
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);
  stage.addEventListener('lostpointercapture', endDrag);
  // Recenter the same photo after viewport or language-direction changes.
  new ResizeObserver(() => show(count + modulo(active), true)).observe(stage);
  new MutationObserver(() => show(count + modulo(active), true)).observe(document.documentElement, {attributes: true, attributeFilter: ['dir']});
  show(count, true);
});
