// =================================
// ELEMENT
// =================================
const coverPage = document.getElementById("coverPage");
const openInvitation = document.getElementById("openInvitation");
const hero = document.querySelector(".hero");
const heroOpening = document.getElementById("heroOpening");

// =================================
// COVER ACTIVE 
// =================================
document.body.classList.add("cover-active");

// =================================
// OPEN INVITATION
// =================================
function bukaUndanganDigital() {
  playMusic();
  coverPage.classList.add("hide");
  document.body.classList.add("invitation-open");
  document.body.classList.remove("cover-active");
    
    setTimeout(() => {
      heroOpening.classList.add("opened");
      musicButton.classList.add("opened");
    }, 800);
}

// =================================
// EVENT
// =================================
openInvitation.addEventListener("click", bukaUndanganDigital);