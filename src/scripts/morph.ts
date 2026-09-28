/**
 * Page to page, a project's title carries over: the title you clicked becomes the title of the
 * case study it opens. The case study's title always has the shared name (work/[slug].astro);
 * just before this page is swapped out, it lends that name to the one title that leads there.
 */
const SHARED_NAME = 'case-title';
const LENDERS = '[data-title-for]';

/** Back to the names in the stylesheet, e.g. when this page comes back from the back/forward cache. */
function resetNames(): void {
  for (const element of document.querySelectorAll<HTMLElement>(`${LENDERS}, .case-title`)) {
    element.style.removeProperty('view-transition-name');
  }
}

function lendName({ viewTransition, activation }: PageSwapEvent): void {
  const url = activation?.entry?.url;
  if (!viewTransition || !url || document.documentElement.dataset.power === 'off') return;

  const path = new URL(url).pathname;
  const lender = document.querySelector<HTMLElement>(`[data-title-for="${CSS.escape(path)}"]`);
  if (!lender) return;

  // Names must be unique on a page, so this page's own title steps aside.
  resetNames();
  document.querySelector<HTMLElement>('.case-title')?.style.setProperty('view-transition-name', 'none');
  lender.style.setProperty('view-transition-name', SHARED_NAME);
}

window.addEventListener('pageswap', lendName);
window.addEventListener('pageshow', (event) => {
  if (event.persisted) resetNames();
});
