document.addEventListener("DOMContentLoaded", () => {

  const eventSection = document.querySelector(".event-section");
  const eventBackground = document.querySelector(".event-background");

  if (!eventSection || !eventBackground) {
    console.warn("Parallax Event: element tidak ditemukan.");
    return;
  }

  console.log("Parallax Event aktif.");

  let ticking = false;

  function updateEventParallax() {

    const rect = eventSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    /*
     * Section belum masuk viewport
     */
    if (rect.bottom < 0 || rect.top > windowHeight) {
      ticking = false;
      return;
    }

    /*
     * Posisi section terhadap viewport.
     *
     * Saat section bergerak melewati viewport,
     * nilai progress berubah.
     */
    const progress =
      (windowHeight - rect.top) /
      (windowHeight + rect.height);

    /*
     * Batasi agar tidak terlalu ekstrem.
     */
    const clampedProgress = Math.max(
      0,
      Math.min(1, progress)
    );

    /*
     * Rentang gerakan background.
     *
     * -10% sampai +10%
     */
    const positionY =
      40 + (clampedProgress * 20);

    eventBackground.style.backgroundPosition =
      `center ${positionY}%`;

    console.log(
      "Event parallax:",
      positionY.toFixed(2) + "%"
    );

    ticking = false;
  }

  function requestParallaxUpdate() {

    if (!ticking) {
      requestAnimationFrame(updateEventParallax);
      ticking = true;
    }

  }

  window.addEventListener(
    "scroll",
    requestParallaxUpdate,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    requestParallaxUpdate
  );

  /*
   * Posisi awal
   */
  updateEventParallax();

});