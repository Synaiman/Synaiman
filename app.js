document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const formContainer = document.getElementById("formContainer");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const showRegister = document.getElementById("showRegister");
  const showLogin = document.getElementById("showLogin");
 
 
  // Hiện form đăng nhập
  loginBtn.addEventListener("click", () => {
    formContainer.style.display = "flex";
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  });
 
 
  // Hiện form đăng ký
  registerBtn.addEventListener("click", () => {
    formContainer.style.display = "flex";
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });
 
 
  // Chuyển từ đăng nhập → đăng ký
  showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });
 
 
  // Chuyển từ đăng ký → đăng nhập
  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });
 
 
  // chuyển từ đăng ký sang khảo sát
 document.addEventListener("userRegistered", () => {
  const registerForm = document.getElementById("registerForm");
  const surveyForm = document.getElementById("surveyForm");
 
 
  if (registerForm && surveyForm) {
    registerForm.style.display = "none";
    surveyForm.style.display = "block";
  }
 });
 
 
 
 
 
 
 
 
  // Click ra ngoài để ẩn popup
  window.addEventListener("click", (e) => {
    if (e.target === formContainer) {
      formContainer.style.display = "none";
      loginForm.style.display = "none";
      registerForm.style.display = "none";
    }
  });
 
 
  // Xử lý gửi form qua EmailJS
  emailjs.init("WL1XqOiBGHvwLw6W3");
 
 
  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
 
 
    emailjs.sendForm("service_81m9jxu", "template_4uht0eg", this)
      .then(function () {
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById("contactForm").reset();
 
 
        setTimeout(function () {
          document.getElementById('successMessage').style.display = 'none';
        }, 3000);
      }, function (error) {
        alert("Gửi không thành công. Lỗi: " + JSON.stringify(error));
      });
  });
 });
 
 
 
 
       // form handling
     // Xử lý gửi form và gửi email qua EmailJS
     document.addEventListener("DOMContentLoaded", function () {
      emailjs.init("WL1XqOiBGHvwLw6W3");
   
      document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();
   
        emailjs.sendForm("service_81m9jxu", "template_4uht0eg", this)
          .then(function () {
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById("contactForm").reset();
   
            setTimeout(function () {
              document.getElementById('successMessage').style.display = 'none';
            }, 3000);
          }, function (error) {
            alert("Gửi không thành công. Lỗi: " + JSON.stringify(error));
          });
      });
    });
   
     