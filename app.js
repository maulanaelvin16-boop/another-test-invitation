// ===============================
// GENERAL REVEAL OBSERVER
// ===============================
// Gallery has its own one-time observer below.
// This observer keeps the existing reveal behaviour for
// the other sections without repeatedly touching gallery cards.
const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }

  });

}, {
  threshold: 0.15,
  rootMargin: "0px 0px -60px 0px"
});

document.querySelectorAll(
  ".reveal:not(.gallery-section):not(.gallery-grid):not(.gallery-item):not(.gallery-extra-item)"
).forEach(el => observer.observe(el));


// ===============================
// GALLERY ONE-TIME REVEAL
// ===============================
// Gallery elements reveal once and stay visible.
// This prevents re-triggering animations whenever the user
// scrolls back over the gallery.
const galleryRevealObserver = new IntersectionObserver((entries, obs) => {

  entries.forEach(entry => {

    if (!entry.isIntersecting) return;

    entry.target.classList.add("show");
    obs.unobserve(entry.target);

  });

}, {
  threshold: 0.12,
  rootMargin: "0px 0px -40px 0px"
});

document.querySelectorAll(
  ".gallery-section.reveal, .gallery-grid.reveal, .gallery-item.reveal, .gallery-extra-section.reveal, .gallery-extra-grid.reveal, .gallery-extra-item.reveal"
).forEach(el => galleryRevealObserver.observe(el));


const wishObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    
    entry.target.classList.add("show");
    wishObserver.unobserve(entry.target);
  });
}, {
  threshold: 0.15
});