// =================================
// GALLERY LIGHTBOX - GRID PERTAMA
// =================================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

const galleryImages = document.querySelectorAll(
  ".gallery-grid .gallery-image"
);

const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentIndex = 0;

let touchStartX = 0;
let touchEndX = 0;

const swipeThreshold = 60;


// =================================
// OPEN LIGHTBOX
// =================================

galleryImages.forEach((image) => {

  image.addEventListener("click", () => {

    lightbox.classList.add("active");

    currentIndex = Number(
      image.parentElement.dataset.index
    );

    updateLightbox();

    document.body.style.overflow = "hidden";

  });

});


// =================================
// CLOSE LIGHTBOX
// =================================

lightboxClose.addEventListener(
  "click",
  closeLightbox
);

lightbox.addEventListener("click", (e) => {

  if (e.target === lightbox) {

    closeLightbox();

  }

});

function closeLightbox() {

  lightbox.classList.remove("active");

  document.body.style.overflow = "";

}


// =================================
// UPDATE LIGHTBOX IMAGE
// =================================

function preloadGalleryImage(index) {

  if (index < 0 || index >= galleryImages.length) {
    return;
  }

  const src = galleryImages[index].dataset.lightboxSrc;

  if (!src) {
    return;
  }

  const image = new Image();
  image.src = src;

}

function preloadAdjacentGalleryImages() {

  const nextIndex =
    (currentIndex + 1) % galleryImages.length;

  const prevIndex =
    (currentIndex - 1 + galleryImages.length) %
    galleryImages.length;

  preloadGalleryImage(nextIndex);
  preloadGalleryImage(prevIndex);

}

function updateLightbox() {

  const image = galleryImages[currentIndex];
  const src = image.dataset.lightboxSrc;

  if (!src) {
    return;
  }

  // Change the source immediately. The next/previous images are
  // preloaded in the background so normal swipes can display instantly.
  lightboxImage.src = src;
  lightboxImage.alt = image.alt;

  preloadAdjacentGalleryImages();

}


// =================================
// NEXT IMAGE
// =================================

function nextImage() {

  currentIndex++;

  if (currentIndex >= galleryImages.length) {

    currentIndex = 0;

  }

  updateLightbox();

}


// =================================
// PREVIOUS IMAGE
// =================================

function prevImage() {

  currentIndex--;

  if (currentIndex < 0) {

    currentIndex = galleryImages.length - 1;

  }

  updateLightbox();

}


// =================================
// LIGHTBOX BUTTON
// =================================

lightboxNext.addEventListener(
  "click",
  nextImage
);

lightboxPrev.addEventListener(
  "click",
  prevImage
);


// =================================
// LIGHTBOX KEYBOARD
// =================================

document.addEventListener("keydown", (e) => {

  if (!lightbox.classList.contains("active")) {
    return;
  }

  switch (e.key) {

    case "ArrowLeft":

      prevImage();

      break;

    case "ArrowRight":

      nextImage();

      break;

    case "Escape":

      closeLightbox();

      break;

  }

});


// =================================
// SWIPE
// =================================

lightbox.addEventListener(
  "touchstart",
  (e) => {

    touchStartX =
      e.changedTouches[0].clientX;

  },
  { passive: true }
);


lightbox.addEventListener(
  "touchend",
  (e) => {

    touchEndX =
      e.changedTouches[0].clientX;

    handleSwipe();

  },
  { passive: true }
);


function handleSwipe() {

  const distance =
    touchStartX - touchEndX;

  if (
    Math.abs(distance) <
    swipeThreshold
  ) {

    return;

  }

  if (distance > 0) {

    nextImage();

  } else {

    prevImage();

  }

}