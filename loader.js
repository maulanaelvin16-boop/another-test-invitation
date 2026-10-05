// ===================================
// ELEMENT
// ===================================
const loader = document.getElementById("loader-wrapper");
const cover = document.getElementById("coverPage");


// ===================================
// LOADER TIMELINE
// ===================================
const LOADER = {
  MONOGRAM_REVEAL: 1200,
  MONOGRAM_HOLD: 1800,
  NAME_REVEAL: 800,
  FINAL_HOLD: 1800,
  FADE_OUT: 800
};


// ===================================
// LOADER STATE
// ===================================
let pageLoaded = false;
let timelineFinished = false;


// ===================================
// START LOADER IMMEDIATELY
// ===================================
startLoaderTimeline();


// ===================================
// PAGE FINISHED LOADING
// ===================================
window.addEventListener("load", () => {
  
  pageLoaded = true;
  
  tryFinishLoader();
  
});


// ===================================
// LOADER TIMELINE
// ===================================
function startLoaderTimeline() {
  
  const totalDuration =
    LOADER.MONOGRAM_REVEAL +
    LOADER.MONOGRAM_HOLD +
    LOADER.NAME_REVEAL +
    LOADER.FINAL_HOLD;
  
  
  setTimeout(() => {
    
    timelineFinished = true;
    
    tryFinishLoader();
    
  }, totalDuration);
  
}


// ===================================
// WAIT FOR BOTH
// ===================================
function tryFinishLoader() {
  
  if (!pageLoaded || !timelineFinished) {
    return;
  }
  
  
  loader.classList.add("hide");
  
  
  setTimeout(() => {
    
    cover.classList.remove("hidden");
    
    requestAnimationFrame(() => {
      
      setTimeout(() => {
        
        cover.classList.add("show");
        
      }, 120);
      
    });
    
  }, LOADER.FADE_OUT);
  
}