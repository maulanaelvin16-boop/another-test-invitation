// ============================
// ELEMENTS
// ============================
const giftToggle = document.getElementById("giftToggle");
const giftWrapper = document.getElementById("giftWrapper");
const copyButtons = document.querySelectorAll(".copy-button");
const giftClose = document.getElementById("giftClose");

// ============================
// TOGGLE GIFT
// ============================
function toggleGift() {
  giftWrapper.classList.toggle("active");
  if (giftWrapper.classList.contains("active")) {
    giftToggle.style.display = "none";
    giftClose.style.display = "inline-flex";
  } else {
    giftToggle.style.display = "inline-flex";
    giftClose.style.display = "none";
  
  }
  
}

// ============================
// COPY REKENING
// ============================
async function copyRekening(button) {
  const nomor = button.dataset.copy;
  try {
    await navigator.clipboard.writeText(nomor);
    const textAwal = button.textContent;
    button.classList.add("success");
    button.textContent = "✓ Tersalin";
    button.disabled = true;
    setTimeout(() => {
      button.classList.remove("success");
      button.textContent = textAwal;
      button.disabled = false;
    }, 2000);
  } catch (error) {
    alert("Nomor rekening gagal disalin!");
  }
}

// ======================
// EVENT
// ======================
giftToggle.addEventListener("click", toggleGift);
giftClose.addEventListener("click",closeGift);
copyButtons.forEach(button => {
  button.addEventListener("click", () => {
    copyRekening(button);
  });
});

// ======================
// CLOSE BUTTON
// ======================
function closeGift() {
  giftWrapper.classList.remove("active");
  giftClose.style.display = "none";
  giftToggle.style.display = "inline-flex";
  giftToggle.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}