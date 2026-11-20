let db = loadDB();
let currentUser = null;
let authMode = "login";
let selectedCategory = "Todos";
let cart = [];
let activePanelTab = "Dashboard";

// =========================================================
// 1. AUTENTICACIÓN Y SELECCIÓN DE ROL
// =========================================================
function quickLogin(roleKey) {
  const map = {
    admin: "admin@nexomarket.mx",
    logistica: "logistica@nexomarket.mx",
    usuario: "maria.garcia@email.com"
  };
  const user = db.users.find(u => u.email === map[roleKey]);
  if (user) {
    document.getElementById("input-email").value = user.email;
    document.getElementById("input-password").value = user.password;
    loginSuccess(user);
  }
}

function switchAuthTab(mode) {
  authMode = mode;
  document.getElementById("tab-login").classList.toggle("active", mode === "login");
  document.getElementById("tab-register").classList.toggle("active", mode === "register");
  document.getElementById("register-name-group").classList.toggle("hidden", mode === "login");
  document.getElementById("auth-submit-btn").textContent = mode === "login" ? "Entrar al sistema" : "Registrar cuenta";
  document.getElementById("auth-error").classList.add("hidden");
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("input-email").value.trim().toLowerCase();
  const password = document.getElementById("input-password").value.trim();
  const errorEl = document.getElementById("auth-error");

  if (authMode === "login") {
    const user = db.users.find(u => u.email.toLowerCase() === email && u.password === password);
    if (!user) {
      errorEl.textContent = "Credenciales incorrectas. Usa una cuenta de demo o verifica tus datos.";
      errorEl.classList.remove("hidden");
      return;
    }
    errorEl.classList.add("hidden");
    loginSuccess(user);
  } else {
    const name = document.getElementById("input-name").value.trim() || "Nuevo Cliente";
    if (db.users.some(u => u.email.toLowerCase() === email)) {
      errorEl.textContent = "Este correo ya está registrado.";
      errorEl.classList.remove("hidden");
      return;
    }
    const newUser = { id: Date.now(), name, email, password, role: "usuario" };
    db.users.push(newUser);
    saveDB(db);
    loginSuccess(newUser);
    showToast("Cuenta creada con éxito");
  }
}

function loginSuccess(user) {
  currentUser = user;
  document.getElementById("login-view").classList.add("hidden");

  if (user.role === "usuario") {
    document.getElementById("panel-view").classList.add("hidden");
    document.getElementById("user-view").classList.remove("hidden");
    document.getElementById("user-display-name").textContent = user.name.split(" ")[0];
    renderCategories();
    renderCatalog();
    renderUserOrders();
  } else {
    document.getElementById("user-view").classList.add("hidden");
    document.getElementById("panel-view").classList.remove("hidden");
    setupManagementPanel(user.role);
  }
}

function logout() {
  currentUser = null;
  cart = [];
  updateCartUI();
  document.getElementById("user-view").classList.add("hidden");
  document.getElementById("panel-view").classList.add("hidden");
  document.getElementById("login-view").classList.remove("hidden");
}

// =========================================================
// 2. VISTA DE USUARIO (CATÁLOGO, CARRITO Y PEDIDOS)
// =========================================================
function switchUserSection(sec) {
  document.getElementById("btn-nav-tienda").classList.toggle("active", sec === "tienda");
  document.getElementById("btn-nav-pedidos").classList.toggle("active", sec === "pedidos");
  document.getElementById("user-section-tienda").classList.toggle("hidden", sec !== "tienda");
  document.getElementById("user-section-pedidos").classList.toggle("hidden", sec !== "pedidos");
  if (sec === "pedidos") renderUserOrders();
}

function renderCategories() {
  const categories = [
    { name: "Todos", icon: "" },
    { name: "Electrónica", icon: "💻" },
    { name: "Ropa y Moda", icon: "👕" },
    { name: "Hogar y Jardín", icon: "🏡" },
    { name: "Deportes", icon: "⚽" },
    { name: "Libros", icon: "📚" }
  ];

  const container = document.getElementById("category-filters");
  container.innerHTML = categories.map(c => `
    <button class="filter-chip ${selectedCategory === c.name ? "active" : ""}"
            onclick="filterCategory('${c.name}')">
      ${c.icon ? c.icon + " " : ""}${c.name}
    </button>
  `).join("");
}

function filterCategory(cat) {
  selectedCategory = cat;
  renderCategories();
  renderCatalog();
}

function renderCatalog() {
  const grid = document.getElementById("products-grid");
  const filtered = selectedCategory === "Todos"
    ? db.products
    : db.products.filter(p => p.category === selectedCategory);

  grid.innerHTML = filtered.map(p => {
    let stockBadge = `<span class="stock-pill stock-ok">${p.stock} disp.</span>`;
    if (p.stock === 0) stockBadge = `<span class="stock-pill stock-out">Agotado</span>`;
    else if (p.stock <= 10) stockBadge = `<span class="stock-pill stock-low">Solo ${p.stock}</span>`;

    return `
      <article class="product-card">
        <div class="product-banner banner-${p.catKey}">${p.icon}</div>
        <div class="product-body">
          <span class="product-cat-label">${p.category}</span>
          <h3 class="product-title">${p.name}</h3>
          <div class="product-price-row">
            <span class="product-price">$${p.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            ${stockBadge}
          </div>
          <button class="btn-add-cart" ${p.stock === 0 ? "disabled" : ""} onclick="addToCart(${p.id})">
            ${p.stock === 0 ? "Sin stock" : "Agregar al carrito"}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function addToCart(productId) {
  const product = db.products.find(p => p.id === productId);
  if (!product || product.stock <= 0) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    if (existing.qty >= product.stock) {
      showToast("Alcanzaste el límite de stock disponible");
      return;
    }
    existing.qty++;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  updateCartUI();
  showToast(`Agregado: ${product.name}`);
}

function updateCartUI() {
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const badge = document.getElementById("cart-badge");
  badge.textContent = totalItems;
  badge.classList.toggle("hidden", totalItems === 0);

  const list = document.getElementById("cart-items-list");
  if (cart.length === 0) {
    list.innerHTML = `<p style="color:#64748B;text-align:center;margin-top:2rem;">Tu carrito está vacío.</p>`;
  } else {
    list.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <div style="font-size:0.8rem;color:#64748B;">$${item.price.toFixed(2)} c/u · Cant: ${item.qty}</div>
        </div>
        <button class="btn-sm" onclick="removeFromCart(${item.id})">Quitar</button>
      </div>
    `).join("");
  }

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  document.getElementById("cart-total-amount").textContent = `$${totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function toggleCartDrawer(open) {
  document.getElementById("cart-overlay").classList.toggle("hidden", !open);
  document.getElementById("cart-drawer").classList.toggle("open", open);
}

function checkoutCart() {
  if (cart.length === 0) return;

  let total = 0;
  const summaryParts = [];

  cart.forEach(item => {
    const prod = db.products.find(p => p.id === item.id);
    if (prod) prod.stock = Math.max(0, prod.stock - item.qty);
    total += item.price * item.qty;
    summaryParts.push(`${item.qty}x ${item.name}`);
  });

  const newOrder = {
    id: String(db.orders.length + 1).padStart(4, "0"),
    client: currentUser.name,
    email: currentUser.email,
    date: "20 nov 2026",
    items: summaryParts.join(", "),
    total: Number(total.toFixed(2)),
    status: "Pagado"
  };

  db.orders.unshift(newOrder);
  saveDB(db);

  cart = [];
  updateCartUI();
  toggleCartDrawer(false);
  renderCatalog();
  renderUserOrders();
  showToast(`¡Pedido #${newOrder.id} registrado correctamente!`);
}

function renderUserOrders() {
  const tbody = document.getElementById("user-orders-tbody");
  const myOrders = db.orders.filter(o => o.email === currentUser.email);

  tbody.innerHTML = myOrders.map(o => `
    <tr>
      <td class="order-id">#${o.id}</td>
      <td>${o.date}</td>
      <td>${o.items}</td>
      <td><strong>$${o.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></td>
      <td>${getStatusBadge(o.status)}</td>
    </tr>
  `).join("");
}

// =========================================================
// 3. PANEL DE ADMINISTRADOR Y LOGÍSTICA
// =========================================================
function setupManagementPanel(role) {
  const isAdmin = role === "admin";
  document.getElementById("sidebar-role-subtitle").textContent = isAdmin ? "Panel de gestión" : "Centro de logística";
  document.getElementById("panel-active-role-badge").textContent = isAdmin ? "Administrador" : "Logística";

  const menuItems = isAdmin
    ? [
        { id: "Dashboard", icon: "⊞", label: "Dashboard" },
        { id: "Productos", icon: "📦", label: "Productos" },
        { id: "Pedidos", icon: "📋", label: "Pedidos" },
        { id: "Clientes", icon: "👥", label: "Clientes" },
        { id: "Pagos", icon: "💳", label: "Pagos" },
        { id: "Envios", icon: "🚚", label: "Envíos" },
        { id: "Carritos", icon: "🛒", label: "Carritos" }
      ]
    : [
        { id: "LogisticaDashboard", icon: "⊞", label: "Resumen Operativo" },
        { id: "Envios", icon: "🚚", label: "Despacho y Envíos" },
        { id: "Productos", icon: "📦", label: "Control de Stock" }
      ];

  activePanelTab = menuItems[0].id;
  renderSidebarMenu(menuItems);
  renderPanelContent();
}

function renderSidebarMenu(items) {
  const nav = document.getElementById("sidebar-menu");
  nav.innerHTML = items.map(item => `
    <button class="sidebar-item ${activePanelTab === item.id ? "active" : ""}"
            onclick="selectPanelTab('${item.id}', '${item.label}')">
      <span>${item.icon}</span> ${item.label}
    </button>
  `).join("");
}

function selectPanelTab(tabId, label) {
  activePanelTab = tabId;
  document.getElementById("panel-page-title").textContent = label;
  document.querySelectorAll(".sidebar-item").forEach(btn => {
    btn.classList.toggle("active", btn.textContent.trim().includes(label));
  });
  renderPanelContent();
}

function renderPanelContent() {
  const container = document.getElementById("panel-content");

  // Cálculos dinámicos
  const validOrders = db.orders.filter(o => o.status !== "Cancelado");
  const totalSales = validOrders.reduce((acc, o) => acc + o.total, 0);
  const activeOrdersCount = db.orders.filter(o => ["Pagado", "Procesando", "En camino"].includes(o.status)).length;
  const totalClients = db.users.filter(u => u.role === "usuario").length;
  const totalStock = db.products.reduce((acc, p) => acc + p.stock, 0);

  if (activePanelTab === "Dashboard" || activePanelTab === "LogisticaDashboard") {
    const sortedStock = [...db.products].sort((a, b) => a.stock - b.stock);

    container.innerHTML = `
      <div class="kpi-grid">
        <div class="kpi-card kpi-blue">
          <div class="kpi-label">VENTAS TOTALES</div>
          <div class="kpi-value">$${totalSales.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
          <div class="kpi-sub">Pedidos completados</div>
        </div>
        <div class="kpi-card kpi-purple">
          <div class="kpi-label">PEDIDOS ACTIVOS</div>
          <div class="kpi-value">${activeOrdersCount}</div>
          <div class="kpi-sub">de ${db.orders.length} totales</div>
        </div>
        <div class="kpi-card kpi-green">
          <div class="kpi-label">CLIENTES</div>
          <div class="kpi-value">${totalClients}</div>
          <div class="kpi-sub">Registrados</div>
        </div>
        <div class="kpi-card kpi-amber">
          <div class="kpi-label">STOCK TOTAL</div>
          <div class="kpi-value">${totalStock}</div>
          <div class="kpi-sub">${db.products.length} productos</div>
        </div>
      </div>

      <div class="dashboard-split">
        <div class="table-card">
          <h3 class="card-title">Pedidos recientes</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${db.orders.slice(0, 6).map(o => `
                <tr>
                  <td class="order-id">#${o.id}</td>
                  <td><strong>${o.client}</strong></td>
                  <td>${o.date}</td>
                  <td><strong>$${o.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></td>
                  <td>${getStatusBadge(o.status)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div class="stock-card">
          <h3 class="card-title">Stock por producto</h3>
          ${sortedStock.map(p => {
            const pct = Math.min(100, Math.round((p.stock / 90) * 100));
            const colorClass = p.stock <= 10 ? "fill-red" : p.stock <= 20 ? "fill-amber" : "fill-green";
            const textColor = p.stock <= 10 ? "color:#EF4444;font-weight:700;" : "";
            return `
              <div class="stock-item">
                <div class="stock-item-header">
                  <span>${p.name}</span>
                  <span style="${textColor}">${p.stock}</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill ${colorClass}" style="width:${pct}%"></div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
    return;
  }

  if (activePanelTab === "Productos") {
    container.innerHTML = `
      <div class="table-card">
        <h3 class="card-title">Inventario y Productos</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock Actual</th>
              <th>Acción Rápida</th>
            </tr>
          </thead>
          <tbody>
            ${db.products.map(p => `
              <tr>
                <td>${p.icon} <strong>${p.name}</strong></td>
                <td>${p.category}</td>
                <td>$${p.price.toFixed(2)}</td>
                <td><strong>${p.stock} uds.</strong></td>
                <td>
                  <div style="display:flex; gap:6px; align-items:center;">
                    <input type="number" id="stock-input-${p.id}" min="0" step="1" placeholder="Cantidad"
                      style="width:90px; padding:6px 8px; border-radius:6px; border:1px solid #CBD5E1; font-size:13px;">
                    <button class="btn-sm btn-sm-primary" onclick="restockProduct(${p.id}, 'sumar')">Sumar</button>
                    <button class="btn-sm btn-sm-primary" onclick="restockProduct(${p.id}, 'fijar')">Fijar</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
    return;
  }

  if (activePanelTab === "Pedidos" || activePanelTab === "Envios") {
    container.innerHTML = `
      <div class="table-card">
        <h3 class="card-title">Gestión de Pedidos y Despachos</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Artículos</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Actualizar Estado</th>
            </tr>
          </thead>
          <tbody>
            ${db.orders.map(o => `
              <tr>
                <td class="order-id">#${o.id}</td>
                <td><strong>${o.client}</strong></td>
                <td>${o.items}</td>
                <td>$${o.total.toFixed(2)}</td>
                <td>${getStatusBadge(o.status)}</td>
                <td>
                  <select class="btn-sm" onchange="changeOrderStatus('${o.id}', this.value)">
                    ${["Pagado", "Procesando", "En camino", "Entregado", "Cancelado"].map(st =>
                      `<option value="${st}" ${o.status === st ? "selected" : ""}>${st}</option>`
                    ).join("")}
                  </select>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
    return;
  }

  if (activePanelTab === "Clientes") {
    const clients = db.users.filter(u => u.role === "usuario");
    container.innerHTML = `
      <div class="table-card">
        <h3 class="card-title">Clientes Registrados</h3>
        <table class="data-table">
          <thead><tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Rol</th></tr></thead>
          <tbody>
            ${clients.map(c => `<tr><td>#${c.id}</td><td><strong>${c.name}</strong></td><td>${c.email}</td><td>Cliente</td></tr>`).join("")}
          </tbody>
        </table>
      </div>
    `;
    return;
  }

  // Pagos o Carritos
  container.innerHTML = `
    <div class="table-card">
      <h3 class="card-title">Módulo de ${activePanelTab}</h3>
      <p style="color:#64748B;">Transacciones procesadas: <strong>${validOrders.length}</strong> · Monto conciliado: <strong>$${totalSales.toFixed(2)}</strong></p>
    </div>
  `;
}

function restockProduct(id, modo) {
  const prod = db.products.find(p => p.id === id);
  if (!prod) return;

  const input = document.getElementById(`stock-input-${id}`);
  const cantidad = Number(input.value);

  if (input.value === "" || !Number.isInteger(cantidad) || cantidad < 0) {
    showToast("Ingresa una cantidad entera válida (0 o mayor)");
    return;
  }

  if (modo === "sumar") {
    if (cantidad === 0) {
      showToast("Para sumar, ingresa una cantidad mayor a 0");
      return;
    }
    prod.stock += cantidad;
  } else {
    prod.stock = cantidad;
  }

  saveDB(db);
  renderPanelContent();
  showToast(`Stock actualizado: ${prod.name} (${prod.stock} uds.)`);
}

function changeOrderStatus(orderId, newStatus) {
  const order = db.orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    saveDB(db);
    renderPanelContent();
    showToast(`Pedido #${orderId} cambiado a "${newStatus}"`);
  }
}

function getStatusBadge(status) {
  const map = {
    "Pagado": "st-pagado",
    "Procesando": "st-procesando",
    "En camino": "st-camino",
    "Entregado": "st-entregado",
    "Cancelado": "st-cancelado"
  };
  return `<span class="badge-status ${map[status] || "st-pagado"}">${status}</span>`;
}

function showToast(msg) {
  const container = document.getElementById("toast-container");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}