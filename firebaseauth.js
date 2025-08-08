// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js"
import { getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoZj4ObEj9p5UxXAsyZAZTbEURbdG6fyQ",
  authDomain: "synaiman-dc66a.firebaseapp.com",
  projectId: "synaiman-dc66a",
  storageBucket: "synaiman-dc66a.firebasestorage.app",
  messagingSenderId: "748144153270",
  appId: "1:748144153270:web:8fa284715dd3c2f7654c17",
  measurementId: "G-EMNTD4F7W2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// Hiển thị thông báo
function showMessage(message) {
  alert(message);
}
 // ---- ĐĂNG KÝ TÀI KHOẢN BẰNG EMAIL----
document.getElementById("submitSignUp").addEventListener("click", async (event) => {
  event.preventDefault();
   const fullName = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
   try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
     const userData = {
      fullName: fullName,
      email: email,
      createdAt: new Date().toISOString()
    };
     await setDoc(doc(db, "users", user.uid), userData);
     showMessage("Tạo tài khoản thành công!");
    window.location.href = "homepage.html"; // hoặc redirect sang nơi bạn muốn
  } catch (error) {
    console.error("Error:", error);
    if (error.code === "auth/email-already-in-use") {
      showMessage("Email đã được sử dụng!");
    } else {
      showMessage("Lỗi khi tạo tài khoản!");
    }
  }
});
 // ---- ĐĂNG NHẬP ----
document.getElementById("submitSignIn").addEventListener("click", async (event) => {
  event.preventDefault();
   const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
   try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    localStorage.setItem("loggedInUserId", user.uid);
     showMessage("Đăng nhập thành công!");
    window.location.href = "homepage.html";
  } catch (error) {
    console.error("Login Error:", error);
    if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found") {
      showMessage("Email hoặc mật khẩu không chính xác!");
    } else {
      showMessage("Đăng nhập thất bại!");
    }
  }
});
// ---- ĐĂNG KÝ, ĐĂNG NHẬP BẰNG GOOGLE----
document.getElementById("googleSignIn").addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      showMessage("Đăng nhập bằng Google thành công!");
      window.location.href = "homepage.html";
    })
}); 


// ----Lưu mật khẩu----
document.getElementById("submitSignIn").addEventListener("click", async (event) => {
  event.preventDefault();
   const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const remember = document.getElementById("rememberMe").checked;
   try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
     // Lưu nếu đã tick
    if (remember) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
     showMessage("Đăng nhập thành công!");
    window.location.href = "homepage.html";
  } catch (error) {
    console.error("Login Error:", error);
    if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found") {
      showMessage("Email hoặc mật khẩu không chính xác!");
    } else {
      showMessage("Đăng nhập thất bại!");
    }
  }
});


// ----Tự động điền khi đã lưu---- 
window.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("rememberedEmail");
  const password = localStorage.getItem("rememberedPassword");
   if (email && password) {
    document.getElementById("loginEmail").value = email;
    document.getElementById("loginPassword").value = password;
    document.getElementById("rememberMe").checked = true;
  }
});
 // ----Quên mật khẩu---
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


document.getElementById("forgotPassword").addEventListener("click", async (e) => {
e.preventDefault();


const email = document.getElementById("loginEmail").value;
if (!email) {
  showMessage("Vui lòng nhập email để khôi phục mật khẩu!");
  return;
}


try {
  await sendPasswordResetEmail(auth, email);
  showMessage("Đã gửi email khôi phục mật khẩu. Kiểm tra hộp thư đến!");
} catch (error) {
  console.error("Reset Error:", error);
  if (error.code === "auth/user-not-found") {
    showMessage("Email không tồn tại!");
  } else {
    showMessage("Lỗi khi gửi email khôi phục!");
  }
}
});


