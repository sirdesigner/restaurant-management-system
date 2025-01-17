// انتخاب عناصر
const modalOrder = document.getElementById("modalOrder");
const addOrderBtn = document.getElementById("addOrderBtn");
const closeModalOrder = document.getElementById("closeModalOrder");
const orderForm = document.getElementById("orderForm");
const orderTableBody = document.getElementById("orderTableBody");
const logOutBtn = document.getElementById("logoutBtn");

// بررسی وجود دکمه و اضافه کردن رویداد کلیک
if (logOutBtn) {
  logOutBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
} else {
  console.error("دکمه خروج پیدا نشد!"); // خطا اگر دکمه وجود نداشته باشد
}
// متغیر برای ذخیره حالت ویرایش
let isEditing = false;
let editingRow = null;

// نمایش پنجره پاپ‌آپ برای افزودن سفارش
addOrderBtn.addEventListener("click", () => {
  console.log("دکمه افزودن سفارش کلیک شد!");
  isEditing = false;
  clearOrderForm();
  modalOrder.classList.remove("hidden");
});

// بستن پنجره پاپ‌آپ
closeModalOrder.addEventListener("click", () => {
  console.log("دکمه بستن پاپ‌آپ کلیک شد!");
  modalOrder.classList.add("hidden");
});

// ارسال فرم سفارش
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("فرم ارسال شد!");

  // دریافت مقادیر فرم
  const name = orderForm.querySelector("input[placeholder='نام مشتری']").value;
  const phone = orderForm.querySelector("input[placeholder='شماره تلفن']").value;
  const item = orderForm.querySelector("input[placeholder='آیتم']").value;
  const status = orderForm.querySelector("input[placeholder='وضعیت']").value;
  const date = orderForm.querySelector("input[placeholder='تاریخ']").value;

  console.log({ name, phone, item, status, date });

  if (isEditing) {
    // ویرایش ردیف موجود
    editingRow.cells[0].textContent = name;
    editingRow.cells[1].textContent = phone;
    editingRow.cells[2].textContent = item;
    editingRow.cells[3].textContent = status;
    editingRow.cells[4].textContent = date;
  } else {
    // افزودن ردیف جدید
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td class="border border-gray-300 px-4 py-2">${name}</td>
      <td class="border border-gray-300 px-4 py-2">${phone}</td>
      <td class="border border-gray-300 px-4 py-2">${item}</td>
      <td class="border border-gray-300 px-4 py-2">${status}</td>
      <td class="border border-gray-300 px-4 py-2">${date}</td>
      <td class="border border-gray-300 px-4 py-2 flex justify-center">
        <button class="editOrderBtn text-blue-500 hover:underline">ویرایش</button>
        <button class="deleteOrderBtn text-red-500 hover:underline mr-6">حذف</button>
      </td>
    `;
    orderTableBody.appendChild(newRow);
  }

  // پاک کردن فرم و بستن پنجره پاپ‌آپ
  clearOrderForm();
  modalOrder.classList.add("hidden");
});

// مدیریت ویرایش سفارش
orderTableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("editOrderBtn")) {
    console.log("دکمه ویرایش کلیک شد!");
    isEditing = true;
    editingRow = e.target.closest("tr");

    // پر کردن فرم با اطلاعات سفارش
    const name = editingRow.cells[0].textContent;
    const phone = editingRow.cells[1].textContent;
    const item = editingRow.cells[2].textContent;
    const status = editingRow.cells[3].textContent;
    const date = editingRow.cells[4].textContent;

    orderForm.querySelector("input[placeholder='نام مشتری']").value = name;
    orderForm.querySelector("input[placeholder='شماره تلفن']").value = phone;
    orderForm.querySelector("input[placeholder='آیتم']").value = item;
    orderForm.querySelector("input[placeholder='وضعیت']").value = status;
    orderForm.querySelector("input[placeholder='تاریخ']").value = date;

    // نمایش پنجره پاپ‌آپ
    modalOrder.classList.remove("hidden");
  }
});

// مدیریت حذف سفارش
orderTableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteOrderBtn")) {
    console.log("دکمه حذف کلیک شد!");
    const row = e.target.closest("tr");
    row.remove();
  }
});

// تابع برای پاک کردن فرم
function clearOrderForm() {
  orderForm.querySelector("input[placeholder='نام مشتری']").value = "";
  orderForm.querySelector("input[placeholder='شماره تلفن']").value = "";
  orderForm.querySelector("input[placeholder='آیتم']").value = "";
  orderForm.querySelector("input[placeholder='وضعیت']").value = "";
  orderForm.querySelector("input[placeholder='تاریخ']").value = "";
}