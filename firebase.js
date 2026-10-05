// =================================
// FIREBASE CONFIG
// =================================
const firebaseConfig = {
  apiKey: "AIzaSyC_eYK1LShlD6oCSSUDwL0tVSIGTIv-tL8",
  authDomain: "data-ucapan-wedding-invitation.firebaseapp.com",
  projectId: "data-ucapan-wedding-invitation",
  storageBucket: "data-ucapan-wedding-invitation.firebasestorage.app",
  messagingSenderId: "554124582790",
  appId: "1:554124582790:web:b25184cc9b72c16f211607"
};

// =================================
// INITIALIZE FIREBASE
// =================================
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// =================================
// SEND RSVP TO FIRESTORE
// =================================
async function sendWish(data) {
  try {
    await db.collection("wishes").add({
      nama: data.nama,
      status: data.status,
      jumlahTamu: data.jumlahTamu,
      ucapan: data.ucapan,
      
      waktuKirim: new Date(). toLocaleString("id-ID"),
      
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    return {
      success: true
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message
    };
  }
}