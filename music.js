// ===============================
// ELEMENT
// ===============================
const bgMusic = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

// ===============================
// PLAY 
// ===============================
function playMusic() {
  bgMusic.play();
  musicButton.classList.add("playing");
}

// ===============================
// PAUSE 
// ===============================
function pauseMusic() {
  bgMusic.pause();
  musicButton.classList.remove("playing");
}

// ===============================
// TOMBOL MUSIC 
// ===============================
musicButton.addEventListener("click", () => {
  if (bgMusic.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
});