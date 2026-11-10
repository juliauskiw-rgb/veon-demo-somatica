// Small page behaviour. Everything works without it: anchors scroll, <details> open natively.
const root = document.documentElement;

// 1. Hero index and other anchors to a situation open its <details> in #problems.
function openFromHash(hash: string) {
  if (!hash || hash.length < 2) return;
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (el instanceof HTMLDetailsElement) el.open = true;
}
document.addEventListener("click", (e) => {
  const a = (e.target as Element | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
  if (!a) return;
  openFromHash(a.getAttribute("href") || "");
  // close the phone menu after choosing a section
  const menu = a.closest("details[data-menu]") as HTMLDetailsElement | null;
  if (menu) menu.open = false;
});
openFromHash(location.hash);

// 2. Header shadow once the page moves.
const header = document.querySelector<HTMLElement>("[data-header]");
const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// 3. Phone call bar: visible after the hero, hidden while the contacts block is on screen.
const bar = document.querySelector<HTMLElement>("[data-callbar]");
const hero = document.getElementById("hero");
const contacts = document.getElementById("contacts");
if (bar && hero && "IntersectionObserver" in window) {
  root.classList.add("has-callbar-js");
  let heroVisible = true;
  let contactsVisible = false;
  const sync = () => bar.classList.toggle("is-shown", !heroVisible && !contactsVisible);
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (en.target === hero) heroVisible = en.isIntersecting;
      if (en.target === contacts) contactsVisible = en.isIntersecting;
    }
    sync();
  }, { threshold: 0 });
  io.observe(hero);
  if (contacts) io.observe(contacts);
}

// 4. Escape closes the phone menu.
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const menu = document.querySelector<HTMLDetailsElement>("details[data-menu][open]");
  if (menu) { menu.open = false; menu.querySelector("summary")?.focus(); }
});
