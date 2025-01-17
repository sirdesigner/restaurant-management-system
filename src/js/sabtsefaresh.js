

document.addEventListener("DOMContentLoaded", () => {
  // بررسی وضعیت ورود
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "login.html"; // اگر کاربر وارد نشده باشد، به صفحه ورود هدایت شود
  }

  // انتخاب عناصر
  const logoutBtn = document.getElementById("logoutBtn");
  const orderForm = document.getElementById("orderForm");
  const foodItemSelect = document.getElementById("foodItem");
  const orderDateInput = document.getElementById("orderDate");
  const orderTable = document.getElementById("orderTable").getElementsByTagName('tbody')[0];
  const finalizeBtn = document.getElementById("finalizeBtn");

  // لیست سفارش‌ها
  let orders = [];

  // خروج از سیستم
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  });

  // لیست غذاها (می‌توانید این لیست را از دیتابیس دریافت کنید)
  const foodItems = [
    { id: 1, name: "پیتزا" },
    { id: 2, name: "برگر" },
    { id: 3, name: "سوشی" },
    { id: 4, name: "پاستا" },
  ];

  // بارگذاری آیتم‌های غذا در Dropdown
  foodItems.forEach((food) => {
    const option = document.createElement("option");
    option.value = food.id;
    option.textContent = food.name;
    foodItemSelect.appendChild(option);
  });

  // پر کردن خودکار تاریخ و زمان فعلی
  const updateOrderDate = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('fa-IR');
    const formattedTime = now.toLocaleTimeString('fa-IR');
    orderDateInput.value = `${formattedDate} - ${formattedTime}`;
  };
  updateOrderDate();

  // نمایش سفارش‌ها در جدول
  const renderOrders = () => {
    orderTable.innerHTML = ""; // پاک کردن جدول قبل از به‌روزرسانی
    orders.forEach((order, index) => {
      const row = orderTable.insertRow();
      row.innerHTML = `
        <td class="border border-gray-300 px-4 py-2">${order.customerName}</td>
        <td class="border border-gray-300 px-4 py-2">${order.customerPhone}</td>
        <td class="border border-gray-300 px-4 py-2">${order.foodItemName}</td>
        <td class="border border-gray-300 px-4 py-2">${order.orderDate}</td>
        <td class="border border-gray-300 px-4 py-2">${order.orderStatus}</td>
        <td class="border border-gray-300 px-4 py-2">
          <button onclick="deleteOrder(${index})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">حذف</button>
        </td>
      `;
    });
  };

  // ثبت سفارش
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // دریافت مقادیر فرم
    const customerName = orderForm.querySelector("input[placeholder='نام مشتری']").value;
    const customerPhone = orderForm.querySelector("input[placeholder='شماره تلفن']").value;
    const customerAddress = orderForm.querySelector("input[placeholder='آدرس']").value;
    const foodItemId = foodItemSelect.value;
    const foodItemName = foodItemSelect.options[foodItemSelect.selectedIndex].text;
    const orderDate = orderDateInput.value;

    // وضعیت سفارش به‌صورت خودکار
    const orderStatus = "در حال آماده‌سازی";

    // ایجاد شیء سفارش
    const order = {
      customerName,
      customerPhone,
      customerAddress,
      foodItemId,
      foodItemName,
      orderDate,
      orderStatus,
    };

    // اضافه کردن سفارش به لیست
    orders.push(order);
    renderOrders();

    // پاک کردن فرم
    orderForm.reset();
    updateOrderDate();
  });

  // حذف سفارش
  window.deleteOrder = (index) => {
    orders.splice(index, 1); // حذف سفارش از لیست
    renderOrders(); // به‌روزرسانی جدول
  };

  // ثبت نهایی سفارشات
  finalizeBtn.addEventListener("click", () => {
    if (orders.length === 0) {
      alert("هیچ سفارشی برای ثبت وجود ندارد!");
      return;
    }

    // ارسال سفارشات به سرور (این بخش باید با سرور ارتباط برقرار کند)
    fetch('/api/submit-orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orders),
    })
    .then(response => response.json())
    .then(data => {
      alert("سفارشات با موفقیت ثبت شدند!");
      orders = []; // پاک کردن لیست سفارشات
      renderOrders(); // به‌روزرسانی جدول
    })
    .catch(error => {
      console.error("خطا در ارسال سفارشات:", error);
      alert("خطا در ارسال سفارشات!");
    });
  });
});