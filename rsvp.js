// ===============================
// ELEMENT
// ===============================
let latestWishId = null;
let shouldScrollToLatest = false;
let isFirstLoad = true;
let allWishes = [];
let showAllWishes = false;
const rsvpForm = document.getElementById("rsvpForm");
const submitButton = rsvpForm.querySelector('button[type="submit"]');
const spinner = submitButton.querySelector(".spinner");
const successIcon = submitButton.querySelector(".success-icon");
const buttonText = submitButton.querySelector(".button-text");
const guestName = document.getElementById("guestName");
const guestWish = document.getElementById("guestWish");
const guestNameError = document.getElementById("guestNameError");
const attendanceError = document.getElementById("attendanceError");
const guestCountError = document.getElementById("guestCountError");
const guestWishError = document.getElementById("guestWishError");
const wishList = document.getElementById("wishList");

const totalWishCount = document.getElementById("totalWishCount");
const totalAttend = document.getElementById("totalAttend");
const totalAbsent = document.getElementById("totalAbsent");

const wishSkeleton = document.getElementById("wishSkeleton");

const attendance = document.getElementById("attendance");
const guestCountWrapper = document.getElementById("guestCountWrapper");
const guestCount = document.getElementById("guestCount");
const toggleWishes = document.getElementById("toggleWishes");

wishList.style.display = "none";

// ===============================
// CUSTOM SELECT
// ===============================
const attendanceSelect = document.getElementById("attendance-select");
const selectDisplay = attendanceSelect.querySelector(".select-display");
const selectText = attendanceSelect.querySelector(".select-text");
const selectOption = attendanceSelect.querySelectorAll(".select-option");

const attendanceGroup = attendanceSelect.closest(".form-group");

selectDisplay.addEventListener("click", () => {
  attendanceSelect.classList.toggle("open");
  attendanceGroup.classList.toggle(
    "active",
    attendanceSelect.classList.contains("open")
  );
});

selectOption.forEach(option => {
  option.addEventListener("click", () => {
    attendance.value = option.dataset.value;
    selectText.textContent = option.dataset.value;
    attendanceSelect.classList.remove("open");
    attendanceGroup.classList.remove("active");
    selectOption.forEach(o=>o.classList.remove("selected"));
    option.classList.add("selected");
    attendance.dispatchEvent(
      new Event("change")
    );
  });
});

document.addEventListener("click", (e) => {
  if (!attendanceSelect.contains(e.target)) {
    attendanceSelect.classList.remove("open");
    attendanceGroup.classList.remove("active");
  }
});

// ===============================
// ERROR FUNCTION 
// ===============================
function showError(input, errorElement, message) {
  if (input.id === "attendance") {
    attendanceSelect.classList.add("error");
  } else {
    input.classList.add("error");
  }
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

function clearError(input, errorElement) {
  if (input.id === "attendance") {
    attendanceSelect.classList.remove("error");
  } else {
    input.classList.remove("error");
  }
  errorElement.textContent = "";
  errorElement.classList.remove("show");
}

function clearAllErrors() {
  clearError(guestName, guestNameError);
  clearError(attendance, attendanceError);
  clearError(guestCount, guestCountError);
  clearError(guestWish, guestWishError);
}

// ===================================================
// TOAST 
// ===================================================
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function validateForm() {
  clearAllErrors();
  let isValid = true;
  
  // Nama
  if (!guestName.value.trim()) {
    showError(
      guestName,
      guestNameError,
      "Nama wajib diisi."
    );
    
    isValid = false;
  }
  
  // Kehadiran
  if (!attendance.value) {
    showError(
      attendance,
      attendanceError,
      "Silakan pilih konfirmasi kehadiran."
    );
    
    isValid = false;
  }
  
  // Jumlah tamu
  if (
    attendance.value === "Hadir" &&
    (!guestCount.value || Number(guestCount.value) < 1)
  ) {
    showError(
      guestCount,
      guestCountError,
      "Jumlah tamu minimal 1."
    );
    isValid = false;
  }
  
  if (!guestWish.value.trim()) {
    showError(
      guestWish,
      guestWishError,
      "Mohon tuliskan doa atau ucapan untuk kedua mempelai."
    );
    isValid = false;
  }
  return isValid;
}

// ===============================
// CHANGE STATUS
// ===============================
guestName.addEventListener("input", () => {
  clearError(guestName, guestNameError);
});

guestCount.addEventListener("input", () => {
  clearError(guestCount, guestCountError);
});

guestWish.addEventListener("input", () => {
  clearError(guestWish, guestWishError);
});
attendance.addEventListener("change", () => {
  clearError(attendance, attendanceError);
  if (attendance.value === "Hadir") {
    
    guestCountWrapper.classList.add("show");
    
  } else {
    
    guestCountWrapper.classList.remove("show");
    guestCount.value = "";
    clearError(guestCount, guestCountError);
    
  }
  
});

// ===================================
// SUBMIT RSVP
// ===================================
rsvpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  
  // Loading
  submitButton.disabled = true;
  successIcon.classList.add("hidden");
  spinner.classList.remove("hidden");
  buttonText.textContent = "Mengirim...";

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const docRef = await db.collection("wishes").add({
      
      name: guestName.value.trim(),

      attendance: attendance.value,

      guestCount:
        attendance.value === "Hadir"
          ? Number(guestCount.value || 1)
          : 0,

      wish: guestWish.value.trim(),

      createdAt: firebase.firestore.FieldValue.serverTimestamp()

    });
    
    latestWishId = docRef.id;
    shouldScrollToLatest = true;
    
    // RESET FORM
    rsvpForm.reset();
    
    attendance.value = "";
    selectText.textContent = "Konfirmasi Kehadiran";
    attendanceSelect.classList.remove("open");
    attendanceGroup.classList.remove("active");
    selectOption.forEach(option=>{
      option.classList.remove("selected");
    });
    
    // SEBUNYIKAN INPUT JUMLAH TAMU
    guestCountWrapper.classList.remove("show");
    
    // HAPUS SEMUA PESAN ERROR
    clearAllErrors();
    
    // Kembalikan Tombol
    submitButton.disabled = false;
    spinner.classList.add("hidden");
    successIcon.classList.remove("hidden");
    buttonText.textContent = "Terimakasih!";
    setTimeout(() => {
      successIcon.classList.add("hidden");
      buttonText.textContent = "Kirim Ucapan";
      submitButton.disabled = false
    }, 1200);

    showToast("Ucapan berhasil dikirim ❤️");

  } catch (error) {

    console.error(error);
    
    // Kembalikan tombol
    spinner.classList.add("hidden");
    successIcon.classList.add("hidden");
    buttonText.textContent = "Kirim Ucapan";
    submitButton.disabled = false;
    
    showToast("❌ Terjadi kesalahan, silakan coba lagi.");

  }

});

// ===================================
// FORMAT WAKTU UCAPAN
// ===================================
function formatWishTime(timestamp) {
  
  if (!timestamp) return "Baru saja";
  
  const date = timestamp.toDate();
  const now = new Date();
  
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  // Jam
  const time = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });
  
  // < 1 menit
  if (diffMinutes < 1) {
    return "Baru saja";
  }
  
  // < 1 jam
  if (diffMinutes < 60) {
    return `${diffMinutes} menit lalu`;
  }
  
  // < 24 jam
  if (diffHours < 24) {
    return `${diffHours} jam lalu`;
  }
  
  // Kemarin
  if (diffDays === 1) {
    return `Kemarin • ${time}`;
  }
  
  // 2–6 hari
  if (diffDays < 7) {
    
    const weekday = date.toLocaleDateString("id-ID", {
      weekday: "long"
    });
    
    return `${weekday} • ${time}`;
    
  }
  
  // Masih tahun yang sama
  if (date.getFullYear() === now.getFullYear()) {
    
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short"
    }) + ` • ${time}`;
    
  }
  
  // Tahun berbeda
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }) + ` • ${time}`;
  
}

// ===================================
// UPDATE WAKTU REALTIME
// ===================================
function refreshWishTimes() {
  document.querySelectorAll(".wish-card").forEach(card => {
    const timestamp = card.dataset.time;
    if (!timestamp) return;
    const wishTime = card.querySelector(".wish-time");
    if (!wishTime) return;
    const firestoreTimestamp = firebase.firestore.Timestamp.fromMillis(
      Number(timestamp)
    );
    wishTime.textContent = formatWishTime(firestoreTimestamp);
  });
}


// ===================================
// AVATAR COLOR
// ===================================
const avatarColors = [
  "linear-gradient(135deg,#C89B7B,#E5C7B0)", // Brown
  "linear-gradient(135deg,#7AA6C2,#BFD8EA)", // Blue
  "linear-gradient(135deg,#8F9D74,#C6D4B3)", // Sage
  "linear-gradient(135deg,#C28AA5,#E7C6D7)", // Dusty Pink
  "linear-gradient(135deg,#8C7BB8,#C9BCE8)", // Purple
  "linear-gradient(135deg,#C89E63,#E6C999)", // Gold
  "linear-gradient(135deg,#6F9D91,#B6D9D0)", // Teal
  "linear-gradient(135deg,#B98474,#E5C1B8)", // Terracotta
  "linear-gradient(135deg,#6E8E7A,#B8D0C0)", // Olive
  "linear-gradient(135deg,#8A6E63,#D8C2B8)", // Coffee
  
  // --- Soft Pink Collection ---
  "linear-gradient(135deg,#B97886,#E4BFC6)", // Rose
  "linear-gradient(135deg,#A96F7B,#DDB4BC)", // Muted Rose
  "linear-gradient(135deg,#C48A91,#E8C5C9)", // Blush
  "linear-gradient(135deg,#9E7180,#D5B2BD)", // Mauve
  "linear-gradient(135deg,#C08B83,#E3C0B9)", // Rose Beige
  "linear-gradient(135deg,#A97887,#D9B4C0)", // Dusty Mauve
  "linear-gradient(135deg,#B88996,#E1C1CB)", // Soft Berry
  "linear-gradient(135deg,#C39A9F,#E7CDD0)", // Pale Rose
  "linear-gradient(135deg,#A77D86,#D8B7BD)", // Vintage Rose
  "linear-gradient(135deg,#B58A82,#DFC1BA)" // Warm Blush
];

function getAvatarColor(name) {
  let hash = 0;
  
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }
  
  return avatarColors[hash % avatarColors.length];
}

// ===================================
// BUAT CARD
// ===================================
function createWishCard(doc) {
  const data = doc.data();
  const card = document.createElement("div");
  card.className = "wish-card";
  card.dataset.id = doc.id;
  if (data.createdAt) {
    card.dataset.time = data.createdAt.toMillis();
  }
    card.innerHTML = `
        <div class="wish-header">
          <div class="wish-user">
            <div
            class="wish-avatar"
            style="background:${getAvatarColor(data.name)}">
              ${data.name.charAt(0).toUpperCase()}
            </div>
            
            <div class="wish-info">
              <div class="wish-top">
                <h3 class="wish-name">
                  ${data.name}
                </h3>
                
                <span class="attendance-badge ${
                  data.attendance === "Hadir" ? "hadir" : "tidak-hadir"
                }">
                
                  ${
                    data.attendance === "Hadir" ? "Hadir" : "Tidak Hadir"
                  }
                </span>
                
                ${
                  data.attendance === "Hadir" ? `
                  <span class="guest-total">
                    <svg class="guest-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    ${data.guestCount} Orang
                  </span>
                  `
                  : ""
                }
              </div>
            </div>
          </div>
        </div>
        
        <p class="wish-message">
          ${data.wish}
        </p>
        
        <div class="wish-time">
          ${
            formatWishTime(data.createdAt)
          }
        </div>
        `;
  return card; 
}

// ===================================
// TAMPILKAN UCAPAN BARU
// ===================================
async function showLatestWish(card) {
  
  wishObserver.unobserve(card);
  
  // scroll ke card
  card.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
  
  await new Promise(resolve => setTimeout(resolve, 650));
  
  // Tunggu browser selesai render beberapa frame
  await new Promise(resolve => {
    let frames = 0;
    
    function waitFrame() {
      frames++;
      
      if (frames >= 8) {
        resolve();
      } else {
        requestAnimationFrame(waitFrame);
      }
    }
    
    requestAnimationFrame(waitFrame);
  });
  
  // Animasi masuk
  requestAnimationFrame(() => {
    card.classList.add("show");
    card.classList.add("highlight");
  });
  
  setTimeout(() => {
    card.classList.remove("highlight");
  }, 1400);
}

// ===================================
// ANIMATE STATISTIK
// ===================================
function animateCounter(element, target) {
  
  const current = Number(element.dataset.value ?? 0);
  
  // Kalau angkanya sama, jangan animasi lagi
  if (current === target) {
    element.textContent = target;
    return;
  }
  
  const duration = 700;
  const startTime = performance.now();
  
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    
    const eased = 1 - Math.pow(1 - progress, 3);
    
    const value = Math.round(current + (target - current) * eased);
    
    element.textContent = value;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
      element.dataset.value = target;
    }

    const card = element.closest(".wish-stats-item");

    if (card) {
      card.classList.remove("pulse");
  
      void card.offsetWidth;
  
      card.classList.add("pulse");
    }
  }
  
  requestAnimationFrame(update);
} 
// ===================================
// WISH STATISTIK
// ===================================
function updateWishStats() {
  
  let hadir = 0;
  let tidak = 0;
  
  allWishes.forEach(doc => {
    
    const data = doc.data();
    
    if (data.attendance === "Hadir") {
      hadir++;
    } else {
      tidak++;
    }
    
  });
  
  animateCounter(totalWishCount, allWishes.length);
  animateCounter(totalAttend, hadir);
  animateCounter(totalAbsent, tidak);
  
}

// ===================================
// RENDERING WISHES
// ===================================
function renderWishes(animateNewOnly = false) {
  wishList.innerHTML = "";
  if (allWishes.length === 0) {
    wishList.innerHTML = `
    <p class="wish-empty">
      Belum ada ucapan, jadilah yang pertama mengucapkan doa dan restu untuk kedua mempelai!
    </p>
    `;
    return
  }
  
  const wishesToShow = showAllWishes ? allWishes : allWishes.slice(0, 3);
  
  wishesToShow.forEach((doc, index) => {
  const card = createWishCard(doc);
  
  // Hanya animasikan card baru saat klik "Lihat Semua"
  if (!animateNewOnly || index < 3) {
  card.classList.add("show");
}
  
  wishList.appendChild(card);
  
  if (!card.classList.contains("show")){
    wishObserver.observe(card);
  }
});
  
  if (allWishes.length <= 3) {
    toggleWishes.classList.add("hidden");
  } else {
    toggleWishes.classList.remove("hidden");
    toggleWishes.textContent = showAllWishes ? "Sembunyikan Ucapan" : "Lihat Semua Ucapan";
  }
}

// ===================================
// TOGGLE SEMUA UCAPAN
// ===================================
toggleWishes.addEventListener("click", () => {
  if (showAllWishes) {
    showAllWishes = false;
    
    renderWishes();
    
    document.querySelector("#rsvp").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  } else {
    showAllWishes = true;
    
    renderWishes(true);
  }
});

// ===================================
// LOAD WEDDING WISHES
// ===================================
function loadWishes() {
  
  db.collection("wishes")
    .orderBy("createdAt", "desc")
    .onSnapshot(async (snapshot) => {
      
      // ===============================
      // UPDATE DATA
      // ===============================
      allWishes = snapshot.docs;
      
      // ===============================
      // SET NILAI AWAL STATISTIK
      // ===============================
      if (isFirstLoad) {
        
        totalWishCount.dataset.value = allWishes.length;
        
        totalAttend.dataset.value = allWishes.filter(
          doc => doc.data().attendance === "Hadir"
        ).length;
        
        totalAbsent.dataset.value = allWishes.filter(
          doc => doc.data().attendance !== "Hadir"
        ).length;
        
      }
      
      // ===============================
      // UPDATE STATISTIK
      // ===============================
      updateWishStats();
      
      // ===============================
      // RENDER WISHES
      // ===============================
      renderWishes(false);
      
      isFirstLoad = false;
      
      // ===============================
      // GANTI SKELETON
      // ===============================
      wishSkeleton.classList.add("hidden");
      wishList.style.display = "block";
      
      // =================================
      // AUTO SCROLL KE UCAPAN TERBARU
      // =================================
      if (shouldScrollToLatest && latestWishId) {
        
        const latestCard = wishList.querySelector(
          `[data-id="${latestWishId}"]`
        );
        
        if (latestCard) {
          
          await showLatestWish(latestCard);
          
          shouldScrollToLatest = false;
          latestWishId = null;
          
        }
        
      }
      
    });
}

loadWishes();

// UPDATE WAKTU SETIAP 1 MENIT
setInterval(refreshWishTimes, 60000);