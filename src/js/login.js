document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // دریافت مقادیر فرم
      const username = loginForm.querySelector("input[placeholder='نام کاربری']").value;
      const password = loginForm.querySelector("input[placeholder='رمز عبور']").value;
  
      // بررسی اعتبار نام کاربری و رمز عبور
      if (username === "admin" && password === "1234") {
        // ذخیره وضعیت ورود در localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin"); // ذخیره نقش کاربر
        // انتقال به صفحه index.html
        window.location.href = "index.html";
      } else if (username === "karmand" && password === "1234") {
        // ذخیره وضعیت ورود در localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "staff"); // ذخیره نقش کاربر
        // انتقال به صفحه staff.html
        window.location.href = "sabtsefaresh.html";
      } else {
        alert("نام کاربری یا رمز عبور اشتباه است!");
      }
    });
  });