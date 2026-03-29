const MENU_ITEMS = [
  // Tiffins
  { id: 1, name: "Upma", price: 20, category: "Breakfast" },
  { id: 2, name: "Idly", price: 20, category: "Breakfast" },  
  { id: 3, name: "Gari", price: 25, category: "Breakfast" },
  { id: 4, name: "Bajji", price: 25, category: "Breakfast" },
  { id: 5, name: "Punugu", price: 25, category: "Breakfast" },
  { id: 6, name: "Puri", price: 30, category: "Breakfast" },
  { id: 7, name: "Plain dosa", price: 30, category: "Breakfast" },
  { id: 8, name: "Onion Dosa", price: 35, category: "Breakfast" },
  { id: 9, name: "Pesarattu", price: 35, category: "Breakfast" },
  { id: 10, name: "Rava Dosa", price: 35, category: "Breakfast" },
  { id: 11, name: "Egg Dosa", price: 40, category: "Breakfast" },
  { id: 12, name: "Masala Dosa", price: 40, category: "Breakfast" },
  { id: 13, name: "Sambar idly", price: 40, category: "Breakfast" },
  { id: 14, name: "Sambar Gari", price:40, category: "Breakfast" },
  { id: 15, name: "Upma Pesarattu", price: 45, category: "Breakfast" },
  { id:16, name: "Chapati", price: 35, category: "Breakfast" },
  { id:17, name: "Parotta", price: 35, category: "Breakfast" },
  { id:18, name: "Egg chapati", price: 45, category: "Breakfast" },
  { id:19, name: "Egg parotta", price: 45, category: "Breakfast" },
  { id:20, name: "Omelette", price: 20, category: "Breakfast" },
  // Meals & curries
  { id: 21, name: "Meals", price: 70, category: "Meals" },
  { id: 22, name: "Chicken Biryani", price: 150, category: "Biryani" },
  { id: 23, name: "Veg Curry", price: 25, category: "Meals" },
  { id: 24, name: "Chicken Curry", price: 70, category: "Meals" },
  // Fast food
  { id: 25, name: "Veg fried rice", price: 60, category: "Fast Food" },
  { id: 26, name: "Egg Fried Rice", price: 70, category: "Fast Food" },
  { id: 27, name: "Chicken fried rice", price: 80, category: "Fast Food" },
  { id: 28, name: "Roast Fried Rice", price: 120, category: "Fast Food" },
  { id: 29, name: "Veg Noodles", price: 60, category: "Noodles" },
  { id: 30, name: "Egg Noodles", price: 70, category: "Noodles" },
  { id: 31, name: "Chicken Noodles", price: 80, category: "Noodles" },
  // Tea & coffee
  { id: 32, name: "Tea (Parcel)", price: 15, category: "Beverage" },
  { id: 33, name: "Coffee (Parcel)", price: 20, category: "Beverage" },
  { id: 34, name: "Horlicks (Parcel)", price: 25, category: "Beverage" },
  { id: 35, name: "Boost (Parcel)", price: 25, category: "Beverage" }
];

const STORAGE_KEYS = {
  student: "student",
  cart: "cart",
  order: "order",
  orders: "orders"
};

const SESSION_KEYS = {
  selectedOrderId: "selectedOrderId"
};

const DEFAULT_PROFILE = {
  name: "",
  reg: "",
  phone: "",
  email: ""
};

const REGISTRATION_PATTERN = /^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{10}$/;

function getJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_error) {
    return fallback;
  }
}

function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeStudent(input) {
  return {
    name: (input.name || "").trim(),
    reg: (input.reg || "").trim().toUpperCase(),
    phone: (input.phone || "").trim(),
    email: (input.email || "").trim().toLowerCase()
  };
}

function validateStudent(student) {
  const validReg = REGISTRATION_PATTERN.test(student.reg);
  const validPhone = /^\d{10}$/.test(student.phone);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email);
  const valid = Boolean(student.name && validReg && validPhone && validEmail);

  return {
    valid,
    message: valid ? "" : "Enter all fields correctly. Registration number must be exactly 10 alphanumeric characters and include both letters and numbers. Phone must be 10 digits."
  };
}

function saveStudentProfile(student, options) {
  const settings = options || {};
  setJSON(STORAGE_KEYS.student, student);

  if (settings.syncOrders) {
    const orders = getOrders().map(function (order) {
      return Object.assign({}, order, { student: Object.assign({}, student) });
    });
    saveOrders(orders);

    const latestOrder = getJSON(STORAGE_KEYS.order, null);
    if (latestOrder && latestOrder.id) {
      setJSON(STORAGE_KEYS.order, Object.assign({}, latestOrder, { student: Object.assign({}, student) }));
    }
  }
}

function setMessage(id, text, isError) {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }
  target.textContent = text || "";
  target.classList.remove("ok", "bad");
  if (!text) {
    return;
  }
  target.classList.add(isError ? "bad" : "ok");
}

function formatCurrency(value) {
  return `₹${value}`;
}

function getCart() {
  return getJSON(STORAGE_KEYS.cart, []);
}

function saveCart(cart) {
  setJSON(STORAGE_KEYS.cart, cart);
}

function getOrders() {
  const orders = getJSON(STORAGE_KEYS.orders, []);
  if (Array.isArray(orders) && orders.length) {
    return orders;
  }

  const singleOrder = getJSON(STORAGE_KEYS.order, null);
  if (singleOrder && singleOrder.id) {
    const migrated = [singleOrder];
    saveOrders(migrated);
    return migrated;
  }

  return [];
}

function saveOrders(orders) {
  setJSON(STORAGE_KEYS.orders, orders);
}

function upsertOrderHistory(order) {
  const orders = getOrders();
  const existingIndex = orders.findIndex(function (item) {
    return item.id === order.id;
  });

  if (existingIndex >= 0) {
    orders[existingIndex] = order;
  } else {
    orders.unshift(order);
  }

  saveOrders(orders);
}

function buildTicketText(order) {
  const lines = order.cart.map(function (item) {
    return `${item.name} x ${item.qty} = ${formatCurrency(item.price * item.qty)}`;
  });

  return [
    "Canteen Pre-order Ticket",
    "------------------------",
    `Order ID: ${order.id}`,
    `Date/Time: ${order.ticketDateTime || "-"}`,
    `Student: ${order.student.name}`,
    `Registration: ${order.student.reg}`,
    `Pickup Slot: ${order.time}`,
    `Payment: ${order.pay}`,
    "",
    "Items:",
    lines.join("\n"),
    "",
    `Total: ${formatCurrency(order.total)}`
  ].join("\n");
}

function buildTicketScanPayload(order) {
  const itemLines = order.cart.map(function (item) {
    return `${item.name} x ${item.qty} = ${formatCurrency(item.price * item.qty)}`;
  });

  return [
    "Canteen Pre-order Ticket",
    `Order ID: ${order.id}`,
    `Date/Time: ${order.ticketDateTime || "-"}`,
    `Student: ${order.student.name}`,
    `Registration: ${order.student.reg}`,
    `Phone: ${order.student.phone || "-"}`,
    `Email: ${order.student.email || "-"}`,
    `Pickup Slot: ${order.time}`,
    `Payment: ${order.pay}`,
    "Items:",
    itemLines.join("\n"),
    `Total: ${formatCurrency(order.total)}`
  ].join("\n");
}

function buildTicketQRUrl(order) {
  const payload = encodeURIComponent(buildTicketScanPayload(order));
  return `https://api.qrserver.com/v1/create-qr-code/?size=420x420&margin=12&data=${payload}`;
}

function downloadTicket(order) {
  const ticketText = buildTicketText(order);
  const blob = new Blob([ticketText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${order.id}_ticket.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartCountBadge() {
  const badge = document.getElementById("cartCountBadge");
  if (badge) {
    badge.textContent = String(cartCount());
  }
}

function redirectWithMessage(page, message) {
  sessionStorage.setItem("flash", message);
  window.location.href = page;
}

function showFlash(targetId) {
  const flash = sessionStorage.getItem("flash");
  if (flash) {
    setMessage(targetId, flash, false);
    sessionStorage.removeItem("flash");
  }
}

function initDetailsPage() {
  const form = document.getElementById("studentForm");
  if (!form) {
    return;
  }

  const oldStudent = getJSON(STORAGE_KEYS.student, null);
  if (oldStudent) {
    document.getElementById("name").value = oldStudent.name || "";
    document.getElementById("reg").value = oldStudent.reg || "";
    document.getElementById("phone").value = oldStudent.phone || "";
    document.getElementById("email").value = oldStudent.email || "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const student = normalizeStudent({
      name: document.getElementById("name").value.trim(),
      reg: document.getElementById("reg").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value
    });

    const validation = validateStudent(student);
    if (!validation.valid) {
      setMessage("detailsMessage", validation.message, true);
      return;
    }

    saveStudentProfile(student, { syncOrders: false });
    redirectWithMessage("menu.html", "Profile saved. Start adding your favorites.");
  });
}

function getInitials(name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) {
    return "S";
  }
  return parts.slice(0, 2).map(function (part) {
    return part.charAt(0).toUpperCase();
  }).join("");
}

function updateProfilePreview(student) {
  const safeStudent = Object.assign({}, DEFAULT_PROFILE, student || {});
  const avatar = document.getElementById("profileAvatar");
  const name = document.getElementById("profileNameCard");
  const reg = document.getElementById("profileRegCard");
  const phone = document.getElementById("profilePhoneCard");
  const email = document.getElementById("profileEmailCard");

  if (avatar) {
    avatar.textContent = getInitials(safeStudent.name);
  }
  if (name) {
    name.textContent = safeStudent.name || "Student Name";
  }
  if (reg) {
    reg.textContent = safeStudent.reg || "Registration number will appear here.";
  }
  if (phone) {
    phone.textContent = safeStudent.phone || "Add your phone";
  }
  if (email) {
    email.textContent = safeStudent.email || "Add your email";
  }
}

function fillProfileForm(student) {
  const safeStudent = Object.assign({}, DEFAULT_PROFILE, student || {});
  const nameInput = document.getElementById("profileName");
  const regInput = document.getElementById("profileReg");
  const phoneInput = document.getElementById("profilePhone");
  const emailInput = document.getElementById("profileEmail");

  if (nameInput) {
    nameInput.value = safeStudent.name;
  }
  if (regInput) {
    regInput.value = safeStudent.reg;
  }
  if (phoneInput) {
    phoneInput.value = safeStudent.phone;
  }
  if (emailInput) {
    emailInput.value = safeStudent.email;
  }
}

function readProfileForm() {
  return normalizeStudent({
    name: document.getElementById("profileName").value,
    reg: document.getElementById("profileReg").value,
    phone: document.getElementById("profilePhone").value,
    email: document.getElementById("profileEmail").value
  });
}

function initProfileSection() {
  const form = document.getElementById("profileForm");
  if (!form) {
    return;
  }

  const student = getJSON(STORAGE_KEYS.student, null) || DEFAULT_PROFILE;
  fillProfileForm(student);
  updateProfilePreview(student);

  form.addEventListener("input", function () {
    updateProfilePreview(readProfileForm());
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nextStudent = readProfileForm();
    const validation = validateStudent(nextStudent);
    if (!validation.valid) {
      setMessage("profileMessage", validation.message, true);
      return;
    }

    saveStudentProfile(nextStudent, { syncOrders: true });
    updateProfilePreview(nextStudent);
    renderOrdersPage();
    setMessage("profileMessage", "Profile updated successfully.", false);
  });

  const resetBtn = document.getElementById("profileResetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      const currentStudent = getJSON(STORAGE_KEYS.student, null) || DEFAULT_PROFILE;
      fillProfileForm(currentStudent);
      updateProfilePreview(currentStudent);
      setMessage("profileMessage", "Profile form reset to saved details.", false);
    });
  }
}

function buildCategoryFilters() {
  const wrap = document.getElementById("categoryFilters");
  if (!wrap) {
    return;
  }

  const categories = ["All"].concat(
    Array.from(new Set(MENU_ITEMS.map(function (item) {
      return item.category;
    })))
  );

  wrap.innerHTML = categories
    .map(function (cat, idx) {
      return `<button class="chip${idx === 0 ? " active" : ""}" data-category="${cat}">${cat}</button>`;
    })
    .join("");
}

function renderMenu(filterText, filterCategory) {
  const menuEl = document.getElementById("menu");
  if (!menuEl) {
    return;
  }

  const text = (filterText || "").trim().toLowerCase();
  const category = filterCategory || "All";

  const filtered = MENU_ITEMS.filter(function (item) {
    const textMatch = item.name.toLowerCase().includes(text);
    const categoryMatch = category === "All" || item.category === category;
    return textMatch && categoryMatch;
  });

  if (!filtered.length) {
    menuEl.innerHTML = "<div class='panel'>No dishes found for this filter.</div>";
    return;
  }

  menuEl.innerHTML = filtered
    .map(function (item) {
      return `
        <article class="card">
          <h3>${item.name}</h3>
          <p class="meta">${item.category}</p>
          <div class="price-row">
            <span class="price">${formatCurrency(item.price)}</span>
            <button type="button" data-add-id="${item.id}">Add</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function addToCart(itemId) {
  const cart = getCart();
  const item = MENU_ITEMS.find(function (x) {
    return x.id === itemId;
  });
  if (!item) {
    return;
  }

  const existing = cart.find(function (x) {
    return x.id === item.id;
  });

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
  }

  saveCart(cart);
  updateCartCountBadge();
  setMessage("menuMessage", `${item.name} added to cart.`, false);
}

function initMenuPage() {
  if (!document.getElementById("menu")) {
    return;
  }

  const student = getJSON(STORAGE_KEYS.student, null);
  if (!student) {
    redirectWithMessage("index.html", "Enter your details before ordering.");
    return;
  }

  const welcomeText = document.getElementById("welcomeText");
  if (welcomeText) {
    welcomeText.textContent = `Welcome, ${student.name}. Pick your meal and lock your pickup slot.`;
  }

  showFlash("menuMessage");
  buildCategoryFilters();
  renderMenu("", "All");
  updateCartCountBadge();

  const search = document.getElementById("searchMenu");
  let activeCategory = "All";

  if (search) {
    search.addEventListener("input", function () {
      renderMenu(search.value, activeCategory);
    });
  }

  const filterWrap = document.getElementById("categoryFilters");
  if (filterWrap) {
    filterWrap.addEventListener("click", function (event) {
      const button = event.target.closest("button[data-category]");
      if (!button) {
        return;
      }

      activeCategory = button.getAttribute("data-category") || "All";
      filterWrap.querySelectorAll(".chip").forEach(function (chip) {
        chip.classList.remove("active");
      });
      button.classList.add("active");
      renderMenu(search ? search.value : "", activeCategory);
    });
  }

  document.getElementById("menu").addEventListener("click", function (event) {
    const button = event.target.closest("button[data-add-id]");
    if (!button) {
      return;
    }

    const id = Number(button.getAttribute("data-add-id"));
    addToCart(id);
  });
}

function calculateCartTotals(cart) {
  const items = cart.reduce(function (sum, item) {
    return sum + item.qty;
  }, 0);
  const subtotal = cart.reduce(function (sum, item) {
    return sum + item.price * item.qty;
  }, 0);
  return { subtotal, total: subtotal, items };
}

function renderCartPage() {
  const holder = document.getElementById("cart");
  if (!holder) {
    return;
  }

  const cart = getCart();
  const totals = calculateCartTotals(cart);

  if (!cart.length) {
    holder.innerHTML = "<p>Your cart is empty. Add items from the menu.</p>";
    const placeButton = document.getElementById("placeOrderBtn");
    if (placeButton) {
      placeButton.disabled = true;
    }
    return;
  }

  holder.innerHTML = cart
    .map(function (item) {
      return `
        <div class="cart-item">
          <div>
            <h3>${item.name}</h3>
            <p class="meta">${formatCurrency(item.price)} each</p>
          </div>
          <div class="actions">
            <div class="qty-box">
              <button type="button" data-qty="-1" data-id="${item.id}">-</button>
              <span>${item.qty}</span>
              <button type="button" data-qty="1" data-id="${item.id}">+</button>
            </div>
            <button type="button" class="secondary" data-remove-id="${item.id}">Remove</button>
          </div>
        </div>
      `;
    })
    .join("") +
    `
      <div class="summary">
        <p>Items: ${totals.items}</p>
        <h3>Total: ${formatCurrency(totals.total)}</h3>
      </div>
    `;

  const placeButton = document.getElementById("placeOrderBtn");
  if (placeButton) {
    placeButton.disabled = false;
  }
}

function changeQuantity(itemId, delta) {
  const cart = getCart();
  const item = cart.find(function (x) {
    return x.id === itemId;
  });
  if (!item) {
    return;
  }

  item.qty += delta;
  const next = cart.filter(function (x) {
    return x.qty > 0;
  });
  saveCart(next);
  renderCartPage();
  updateCartCountBadge();
}

function removeItem(itemId) {
  const cart = getCart().filter(function (x) {
    return x.id !== itemId;
  });
  saveCart(cart);
  renderCartPage();
  updateCartCountBadge();
}

function placeOrder() {
  const student = getJSON(STORAGE_KEYS.student, null);
  const cart = getCart();
  const time = document.getElementById("time").value;
  const payChecked = document.querySelector('input[name="pay"]:checked');

  if (!student) {
    redirectWithMessage("index.html", "Please enter your details first.");
    return;
  }

  if (!cart.length) {
    setMessage("cartMessage", "Your cart is empty.", true);
    return;
  }

  if (!time) {
    setMessage("cartMessage", "Select a pickup time before placing order.", true);
    return;
  }

  if (!payChecked) {
    setMessage("cartMessage", "Select a payment method.", true);
    return;
  }

  const totals = calculateCartTotals(cart);
  const now = new Date();
  const order = {
    id: `ORD${now.getTime().toString().slice(-6)}`,
    ticketDateTime: now.toLocaleString(),
    student,
    cart,
    total: totals.total,
    time,
    pay: payChecked.value
  };

  setJSON(STORAGE_KEYS.order, order);
  upsertOrderHistory(order);
  sessionStorage.setItem(SESSION_KEYS.selectedOrderId, order.id);
  saveCart([]);
  window.location.href = "ticket.html";
}

function initCartPage() {
  if (!document.getElementById("cart")) {
    return;
  }

  const student = getJSON(STORAGE_KEYS.student, null);
  if (!student) {
    redirectWithMessage("index.html", "Enter your details first.");
    return;
  }

  updateCartCountBadge();
  renderCartPage();
  showFlash("cartMessage");

  const cartSection = document.getElementById("cart");
  if (cartSection) {
    cartSection.addEventListener("click", function (event) {
      const qtyButton = event.target.closest("button[data-qty]");
      if (qtyButton) {
        changeQuantity(Number(qtyButton.getAttribute("data-id")), Number(qtyButton.getAttribute("data-qty")));
        return;
      }

      const removeBtn = event.target.closest("button[data-remove-id]");
      if (removeBtn) {
        removeItem(Number(removeBtn.getAttribute("data-remove-id")));
      }
    });
  }

  const clearCartBtn = document.getElementById("clearCartBtn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", function () {
      saveCart([]);
      renderCartPage();
      updateCartCountBadge();
      setMessage("cartMessage", "Cart cleared.", false);
    });
  }

  const placeOrderBtn = document.getElementById("placeOrderBtn");
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", placeOrder);
  }
}

function initTicketPage() {
  const holder = document.getElementById("ticket");
  if (!holder) {
    return;
  }

  const selectedOrderId = sessionStorage.getItem(SESSION_KEYS.selectedOrderId);
  const matchingOrder = getOrders().find(function (item) {
    return item.id === selectedOrderId;
  });
  const order = matchingOrder || getJSON(STORAGE_KEYS.order, null);
  if (!order || !order.student || !order.cart) {
    holder.innerHTML = "<p>No recent order found. Please place an order first.</p>";
    return;
  }

  const itemsMarkup = order.cart
    .map(function (item) {
      return `<li>${item.name} x ${item.qty} = ${formatCurrency(item.price * item.qty)}</li>`;
    })
    .join("");

  holder.innerHTML = `
    <article class="ticket-card">
      <div class="ticket-head">
        <h3>Order ID: ${order.id}</h3>
        <div class="ticket-head-meta">
          <p class="ticket-stamp">${order.ticketDateTime || "-"}</p>
          <p>Pickup Slot: ${order.time}</p>
        </div>
      </div>

      <div class="ticket-body">
        <p><strong>Name:</strong> ${order.student.name}</p>
        <p><strong>Registration:</strong> ${order.student.reg}</p>
        <p><strong>Payment:</strong> ${order.pay}</p>

        <h4>Items</h4>
        <ul class="ticket-items">${itemsMarkup}</ul>

        <div class="ticket-total">
          <h3>Total Paid: ${formatCurrency(order.total)}</h3>
        </div>
      </div>

      <div class="ticket-scan">
        <img
          class="ticket-qr"
          src="${buildTicketQRUrl(order)}"
          alt="Scannable QR code with order details for ${order.id}"
          loading="eager"
        >
        <div class="ticket-scan-copy">
          <h4>Scan For Order Details</h4>
          <p>Scan this code to view the student details and items included in this order.</p>
        </div>
      </div>
    </article>
    <div class="ticket-note">Please collect your order during the selected slot.</div>
  `;

  const newOrderBtn = document.getElementById("newOrderBtn");
  if (newOrderBtn) {
    newOrderBtn.addEventListener("click", function () {
      sessionStorage.removeItem(SESSION_KEYS.selectedOrderId);
      window.location.href = "menu.html";
    });
  }

  const printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }
}

function renderOrdersPage() {
  const list = document.getElementById("ordersList");
  if (!list) {
    return;
  }

  const orders = getOrders();
  if (!orders.length) {
    list.innerHTML = "<p>No orders found yet. Place your first order from the menu.</p>";
    return;
  }

  list.innerHTML = orders
    .map(function (order) {
      const itemCount = order.cart.reduce(function (sum, item) {
        return sum + item.qty;
      }, 0);

      return `
        <article class="order-card">
          <div class="order-top">
            <h3>${order.id}</h3>
            <p class="meta">${order.ticketDateTime || "-"}</p>
          </div>
          <p><strong>Pickup:</strong> ${order.time}</p>
          <p><strong>Items:</strong> ${itemCount}</p>
          <p><strong>Total:</strong> ${formatCurrency(order.total)}</p>
          <div class="actions">
            <button type="button" data-view-order="${order.id}">View Ticket</button>
            <button type="button" class="secondary" data-download-order="${order.id}">Download Ticket</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function initOrdersPage() {
  const list = document.getElementById("ordersList");
  if (!list) {
    return;
  }

  const student = getJSON(STORAGE_KEYS.student, null);
  if (!student) {
    redirectWithMessage("index.html", "Enter your details first.");
    return;
  }

  renderOrdersPage();

  list.addEventListener("click", function (event) {
    const viewButton = event.target.closest("button[data-view-order]");
    if (viewButton) {
      const orderId = viewButton.getAttribute("data-view-order");
      sessionStorage.setItem(SESSION_KEYS.selectedOrderId, orderId);
      window.location.href = "ticket.html";
      return;
    }

    const downloadButton = event.target.closest("button[data-download-order]");
    if (downloadButton) {
      const orderId = downloadButton.getAttribute("data-download-order");
      const order = getOrders().find(function (item) {
        return item.id === orderId;
      });
      if (!order) {
        setMessage("ordersMessage", "Unable to find this order.", true);
        return;
      }
      downloadTicket(order);
      setMessage("ordersMessage", `Ticket downloaded for ${order.id}.`, false);
    }
  });
}

function initializeApp() {
  initDetailsPage();
  initProfileSection();
  initMenuPage();
  initCartPage();
  initTicketPage();
  initOrdersPage();
}

initializeApp();
