// Progress follows the article body, not elapsed time or the document footer.
export function readingProgress(top, bottom, viewportHeight, inset = 0) {
  const height = bottom - top;
  const visibleHeight = viewportHeight - inset;
  if (height <= 0 || visibleHeight <= 0) return 0;
  if (height <= visibleHeight) return bottom <= viewportHeight ? 1 : 0;
  return Math.min(1, Math.max(0, (inset - top) / (height - visibleHeight)));
}

function initReadingCoffee() {
  const widget = document.getElementById('reading-coffee');
  const content = document.querySelector('.post-single .post-content');
  if (!widget || !content || !content.textContent.trim()) return;

  const liquid = widget.querySelector('.reading-coffee-liquid');
  const value = widget.querySelector('.reading-coffee-value');
  const mobile = window.matchMedia('(max-width: 959px)');
  let scheduled = false;

  function update() {
    scheduled = false;
    const bounds = content.getBoundingClientRect();
    const inset = mobile.matches ? 44 : 0;
    const progress = readingProgress(bounds.top, bounds.bottom, window.innerHeight, inset);
    const percent = Math.floor(progress * 100);
    liquid.style.transform = `translateY(${7 * progress}px)`;
    value.textContent = `${percent}%`;
    widget.setAttribute('aria-valuenow', String(percent));
    widget.setAttribute('aria-valuetext', percent === 100 ? '已到达文末，这杯读完了' : `正文阅读进度 ${percent}%`);
    widget.toggleAttribute('data-mobile-active', bounds.top <= inset);
    widget.hidden = false;
  }

  function schedule() {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(update);
    }
  }

  // Set the restored scroll position before enabling liquid transitions.
  update();
  window.requestAnimationFrame(() => widget.classList.add('is-ready'));
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  window.addEventListener('load', schedule);
  document.fonts?.ready.then(schedule);
  if ('ResizeObserver' in window) {
    new ResizeObserver(schedule).observe(content.closest('.post-single'));
  }
}

if (typeof document !== 'undefined') initReadingCoffee();
