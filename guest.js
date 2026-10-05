document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("to");
  const guestElement = document.getElementById("nama-tamu");
  
  if (!guestElement) return;
  
  if (guestName && guestName.trim()) {
    guestElement.textContent = guestName.trim();
  } else {
    guestElement.textContent = "Tamu Undangan";
  }
});