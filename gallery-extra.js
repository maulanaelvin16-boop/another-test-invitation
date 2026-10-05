// =================================
// EXTRA GALLERY LIGHTBOX
// =================================

const extraLightbox =
  document.getElementById("extraLightbox");

const extraLightboxImage =
  document.getElementById("extraLightboxImage");

const extraLightboxClose =
  document.getElementById("extraLightboxClose");

const extraLightboxPrev =
  document.getElementById("extraLightboxPrev");

const extraLightboxNext =
  document.getElementById("extraLightboxNext");

const extraGalleryImages =
  document.querySelectorAll(".gallery-extra-image");


// =================================
// STATE
// =================================

let extraCurrentIndex = 0;

let extraTouchStartX = 0;
let extraTouchEndX = 0;

const extraSwipeThreshold = 60;


// =================================
// OPEN LIGHTBOX
// =================================

extraGalleryImages.forEach((image) => {

  image.addEventListener("click", () => {

    extraLightbox.classList.add("active");

    extraCurrentIndex = Number(
      image.parentElement.dataset.index
    );

    updateExtraLightbox();

    document.body.style.overflow = "hidden";

  });

});


// =================================
// CLOSE LIGHTBOX
// =================================

extraLightboxClose.addEventListener(
  "click",
  closeExtraLightbox
);

extraLightbox.addEventListener("click", (e) => {

  if (e.target === extraLightbox) {

    closeExtraLightbox();

  }

});


function closeExtraLightbox() {

  extraLightbox.classList.remove("active");

  document.body.style.overflow = "";

}


// =================================
// UPDATE IMAGE
// =================================

function preloadExtraGalleryImage(index) {

  if (index < 0 || index >= extraGalleryImages.length) {
    return;
  }

  const src = extraGalleryImages[index].dataset.lightboxSrc;

  if (!src) {
    return;
  }

  const image = new Image();
  image.src = src;

}

function preloadAdjacentExtraGalleryImages() {

  const nextIndex =
    (extraCurrentIndex + 1) % extraGalleryImages.length;

  const prevIndex =
    (extraCurrentIndex - 1 + extraGalleryImages.length) %
    extraGalleryImages.length;

  preloadExtraGalleryImage(nextIndex);
  preloadExtraGalleryImage(prevIndex);

}

function updateExtraLightbox() {

  const image = extraGalleryImages[extraCurrentIndex];
  const src = image.dataset.lightboxSrc;

  if (!src) {
    return;
  }

  // Change the source immediately. The next/previous images are
  // preloaded in the background so normal swipes can display instantly.
  extraLightboxImage.src = src;
  extraLightboxImage.alt = image.alt;

  preloadAdjacentExtraGalleryImages();

}


// =================================
// NEXT IMAGE
// =================================

function nextExtraImage() {

  extraCurrentIndex++;

  if (
    extraCurrentIndex >=
    extraGalleryImages.length
  ) {

    extraCurrentIndex = 0;

  }

  updateExtraLightbox();

}


// =================================
// PREVIOUS IMAGE
// =================================

function prevExtraImage() {

  extraCurrentIndex--;

  if (extraCurrentIndex < 0) {

    extraCurrentIndex =
      extraGalleryImages.length - 1;

  }

  updateExtraLightbox();

}


// =================================
// BUTTON
// =================================

extraLightboxNext.addEventListener(
  "click",
  nextExtraImage
);

extraLightboxPrev.addEventListener(
  "click",
  prevExtraImage
);


// =================================
// KEYBOARD
// =================================

document.addEventListener("keydown", (e) => {

  if (
    !extraLightbox.classList.contains("active")
  ) {

    return;

  }

  switch (e.key) {

    case "ArrowLeft":

      prevExtraImage();

      break;

    case "ArrowRight":

      nextExtraImage();

      break;

    case "Escape":

      closeExtraLightbox();

      break;

  }

});


// =================================
// SWIPE
// =================================

extraLightbox.addEventListener(
  "touchstart",
  (e) => {

    extraTouchStartX =
      e.changedTouches[0].clientX;

  },
  { passive: true }
);


extraLightbox.addEventListener(
  "touchend",
  (e) => {

    extraTouchEndX =
      e.changedTouches[0].clientX;

    handleExtraSwipe();

  },
  { passive: true }
);


function handleExtraSwipe() {

  const distance =
    extraTouchStartX -
    extraTouchEndX;

  if (
    Math.abs(distance) <
    extraSwipeThreshold
  ) {

    return;

  }

  if (distance > 0) {

    nextExtraImage();

  } else {

    prevExtraImage();

  }

}