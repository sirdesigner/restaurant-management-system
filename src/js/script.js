//------------------------------------ داشبودر اصلی ------------------------------

if (window.location.pathname.includes("index.html")) {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      console.log("دکمه خروج در صفحه داشبورد کلیک شد!"); // پیام مناسب برای دکمه خروج

      // هدایت کاربر به صفحه login.html
      window.location.href = "login.html";
    });
  } else {
    console.error("دکمه خروج در صفحه داشبورد پیدا نشد!"); // خطا اگر دکمه وجود نداشته باشد
  }
}
//-------------------------------مدیریت مشتریان ------------------------
function initializeLogout() {
  // بررسی وضعیت ورود
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "login.html"; // اگر کاربر وارد نشده باشد، به صفحه ورود هدایت شود
  }

  // انتخاب دکمه خروج
  const logoutBtn = document.getElementById("logoutBtn");

  // اضافه کردن رویداد کلیک به دکمه خروج
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn"); // حذف وضعیت ورود
      window.location.href = "login.html"; // هدایت به صفحه ورود
    });
  }
}
function initializeCustomerPage() {
    // انتخاب عناصر
    const modalCustomer = document.getElementById("modalCustomer");
    const addCustomerBtn = document.getElementById("addCustomerBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const customerForm = document.getElementById("customerForm");
    const customerTableBody = document.querySelector("table tbody");
  
    // متغیر برای ذخیره حالت ویرایش
    let isEditing = false;
    let editingRow = null;
  
    // نمایش پنجره پاپ‌آپ برای افزودن مشتری
    addCustomerBtn.addEventListener("click", () => {
      isEditing = false;
      clearCustomerForm();
      modalCustomer.classList.remove("hidden");
    });
  
    // بستن پنجره پاپ‌آپ
    closeModalBtn.addEventListener("click", () => {
      modalCustomer.classList.add("hidden");
    });
  
    // ارسال فرم مشتری
    customerForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // دریافت مقادیر فرم
      const name = customerForm.querySelector("input[placeholder='نام مشتری']").value;
      const address = customerForm.querySelector("input[placeholder='آدرس مشتری']").value;
      const phone = customerForm.querySelector("input[placeholder='شماره تلفن مشتری']").value;
  
      if (isEditing) {
        // ویرایش ردیف موجود
        editingRow.cells[0].textContent = name;
        editingRow.cells[1].textContent = address;
        editingRow.cells[2].textContent = phone;
      } else {
        // افزودن ردیف جدید
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td class="border border-gray-300 px-4 py-2">${name}</td>
          <td class="border border-gray-300 px-4 py-2">${address}</td>
          <td class="border border-gray-300 px-4 py-2">${phone}</td>
          <td class="border border-gray-300 px-4 py-2 flex justify-center">
            <button class="edit text-blue-500 hover:underline" data-name="${name}" data-address="${address}" data-phone="${phone}">ویرایش</button>
            <button class="deletecustomerBtn text-red-500 hover:underline mr-6">حذف</button>
          </td>
        `;
        customerTableBody.appendChild(newRow);
      }
  
      // پاک کردن فرم و بستن پنجره پاپ‌آپ
      clearCustomerForm();
      modalCustomer.classList.add("hidden");
    });
  
    // مدیریت ویرایش مشتری
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit")) {
        isEditing = true;
        editingRow = e.target.closest("tr");
  
        // پر کردن فرم با اطلاعات مشتری
        const name = e.target.getAttribute("data-name");
        const address = e.target.getAttribute("data-address");
        const phone = e.target.getAttribute("data-phone");
  
        customerForm.querySelector("input[placeholder='نام مشتری']").value = name;
        customerForm.querySelector("input[placeholder='آدرس مشتری']").value = address;
        customerForm.querySelector("input[placeholder='شماره تلفن مشتری']").value = phone;
  
        // نمایش پنجره پاپ‌آپ
        modalCustomer.classList.remove("hidden");
      }
    });
  
    // مدیریت حذف مشتری
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("deletecustomerBtn")) {
        const row = e.target.closest("tr");
        row.remove();
      }
    });
  
    // تابع برای پاک کردن فرم
    function clearCustomerForm() {
      customerForm.querySelector("input[placeholder='نام مشتری']").value = "";
      customerForm.querySelector("input[placeholder='آدرس مشتری']").value = "";
      customerForm.querySelector("input[placeholder='شماره تلفن مشتری']").value = "";
    }
  }
  
  // فراخوانی تابع برای صفحه مشتریان
  if (window.location.pathname.includes("customer.html")) {
    initializeCustomerPage();
    // فراخوانی تابع مدیریت خروج در تمام صفحات
    initializeLogout();
  }
  //----------------------------- مدیریت پرسنل -------------------------
  function initializePersonnelPage() {
    // انتخاب عناصر
    const modalPersonnel = document.getElementById("modalPersonnel");
    const addPersonnelBtn = document.getElementById("addPersonnelBtn");
    const closeModalPersonnel = document.getElementById("closeModalPersonnel");
    const personnelForm = document.getElementById("personnelForm");
    const personnelTableBody = document.querySelector("table tbody");
  
    // متغیر برای ذخیره حالت ویرایش
    let isEditing = false;
    let editingRow = null;
  
    // نمایش پنجره پاپ‌آپ برای افزودن پرسنل
    addPersonnelBtn.addEventListener("click", () => {
      isEditing = false;
      clearPersonnelForm();
      modalPersonnel.classList.remove("hidden");
    });
  
    // بستن پنجره پاپ‌آپ
    closeModalPersonnel.addEventListener("click", () => {
      modalPersonnel.classList.add("hidden");
    });
  
    // ارسال فرم پرسنل
    personnelForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // دریافت مقادیر فرم
      const name = personnelForm.querySelector("input[placeholder='نام پرسنل']").value;
      const id = personnelForm.querySelector("input[placeholder='شماره کارمندی']").value;
      const role = personnelForm.querySelector("input[placeholder='سمت پرسنل']").value;
      const tasks = personnelForm.querySelector("textarea").value;
  
      if (isEditing) {
        // ویرایش ردیف موجود
        editingRow.cells[0].textContent = name;
        editingRow.cells[1].textContent = id;
        editingRow.cells[2].textContent = role;
        editingRow.cells[3].textContent = tasks;
      } else {
        // افزودن ردیف جدید
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td class="border border-gray-300 px-4 py-2">${name}</td>
          <td class="border border-gray-300 px-4 py-2">${id}</td>
          <td class="border border-gray-300 px-4 py-2">${role}</td>
          <td class="border border-gray-300 px-4 py-2">${tasks}</td>
          <td class="border border-gray-300 px-4 py-2 flex justify-center">
            <button class="edit text-blue-500 hover:underline" data-name="${name}" data-id="${id}" data-role="${role}" data-tasks="${tasks}">ویرایش</button>
            <button class="deletepesonelBtn text-red-500 hover:underline mr-6">حذف</button>
          </td>
        `;
        personnelTableBody.appendChild(newRow);
      }
  
      // پاک کردن فرم و بستن پنجره پاپ‌آپ
      clearPersonnelForm();
      modalPersonnel.classList.add("hidden");
    });
  
    // مدیریت ویرایش پرسنل
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit")) {
        isEditing = true;
        editingRow = e.target.closest("tr");
  
        // پر کردن فرم با اطلاعات پرسنل
        const name = e.target.getAttribute("data-name");
        const id = e.target.getAttribute("data-id");
        const role = e.target.getAttribute("data-role");
        const tasks = e.target.getAttribute("data-tasks");
  
        personnelForm.querySelector("input[placeholder='نام پرسنل']").value = name;
        personnelForm.querySelector("input[placeholder='شماره کارمندی']").value = id;
        personnelForm.querySelector("input[placeholder='سمت پرسنل']").value = role;
        personnelForm.querySelector("textarea").value = tasks;
  
        // نمایش پنجره پاپ‌آپ
        modalPersonnel.classList.remove("hidden");
      }
    });
  
    // مدیریت حذف پرسنل
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("deletepesonelBtn")) {
        const row = e.target.closest("tr");
        row.remove();
      }
    });
  
    // تابع برای پاک کردن فرم
    function clearPersonnelForm() {
      personnelForm.querySelector("input[placeholder='نام پرسنل']").value = "";
      personnelForm.querySelector("input[placeholder='شماره کارمندی']").value = "";
      personnelForm.querySelector("input[placeholder='سمت پرسنل']").value = "";
      personnelForm.querySelector("textarea").value = "";
    }
  }
  
  // فراخوانی تابع برای صفحه پرسنل
  if (window.location.pathname.includes("personel.html")) {
    initializePersonnelPage();
      // فراخوانی تابع مدیریت خروج در تمام صفحات
    initializeLogout();
  }
//-------------------------------مدیریت منو ----------------------------
const modalFood = document.getElementById("modalFood");
const addFoodBtn = document.getElementById("addFoodBtn");
const closeModalFood = document.getElementById("closeModalFood");
const foodForm = document.getElementById("foodForm");
const foodTableBody = document.querySelector("table tbody");

// متغیر برای ذخیره حالت ویرایش
let isEditing = false;
let editingRow = null;

// نمایش پنجره پاپ‌آپ برای افزودن غذا
addFoodBtn.addEventListener("click", () => {
  isEditing = false;
  clearFoodForm();
  modalFood.classList.remove("hidden");
});

// بستن پنجره پاپ‌آپ
closeModalFood.addEventListener("click", () => {
  modalFood.classList.add("hidden");
});

// ارسال فرم غذا
foodForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // دریافت مقادیر فرم
  const name = foodForm.querySelector("input[placeholder='نام غذا']").value;
  const price = foodForm.querySelector("input[placeholder='قیمت غذا']").value;
  const ingredients = foodForm.querySelector("textarea").value;

  if (isEditing) {
    // ویرایش ردیف موجود
    editingRow.cells[0].textContent = name;
    editingRow.cells[1].textContent = price;
    editingRow.cells[2].textContent = ingredients;
  } else {
    // افزودن ردیف جدید
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td class="border border-gray-300 px-4 py-2">${name}</td>
      <td class="border border-gray-300 px-4 py-2">${price}</td>
      <td class="border border-gray-300 px-4 py-2">${ingredients}</td>
      <td class="border border-gray-300 px-4 py-2 flex justify-center">
        <button class="editFoodBtn text-blue-500 hover:underline" data-name="${name}" data-price="${price}" data-ingredients="${ingredients}">ویرایش</button>
        <button class="deleteFoodBtn text-red-500 hover:underline mr-6">حذف</button>
      </td>
    `;
    foodTableBody.appendChild(newRow);
  }

  // پاک کردن فرم و بستن پنجره پاپ‌آپ
  clearFoodForm();
  modalFood.classList.add("hidden");
});

// مدیریت ویرایش غذا
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("editFoodBtn")) {
    isEditing = true;
    editingRow = e.target.closest("tr");

    // پر کردن فرم با اطلاعات غذا
    const name = e.target.getAttribute("data-name");
    const price = e.target.getAttribute("data-price");
    const ingredients = e.target.getAttribute("data-ingredients");

    foodForm.querySelector("input[placeholder='نام غذا']").value = name;
    foodForm.querySelector("input[placeholder='قیمت غذا']").value = price;
    foodForm.querySelector("textarea").value = ingredients;

    // نمایش پنجره پاپ‌آپ
    modalFood.classList.remove("hidden");
  }
});

// مدیریت حذف غذا
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteFoodBtn")) {
    const row = e.target.closest("tr");
    row.remove();
  }
});

// تابع برای پاک کردن فرم
function clearFoodForm() {
  foodForm.querySelector("input[placeholder='نام غذا']").value = "";
  foodForm.querySelector("input[placeholder='قیمت غذا']").value = "";
  foodForm.querySelector("textarea").value = "";
}
function initializeLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn"); // حذف وضعیت ورود
      window.location.href = "login.html"; // هدایت به صفحه ورود
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeLogout(); // فراخوانی تابع مدیریت خروج
});




//------------------------------------مدیریت سفارشات ------------------------------
