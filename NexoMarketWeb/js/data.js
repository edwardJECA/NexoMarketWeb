const INITIAL_DATA = {
  users: [
    { id: 1, name: "Administrador Nexo", email: "admin@nexomarket.mx", password: "admin123", role: "admin" },
    { id: 2, name: "Coordinador Logística", email: "logistica@nexomarket.mx", password: "log123", role: "logistica" },
    { id: 3, name: "María García López", email: "maria.garcia@email.com", password: "user123", role: "usuario" },
    { id: 4, name: "Ana Sofía Herrera", email: "ana.herrera@email.com", password: "user123", role: "usuario" },
    { id: 5, name: "Lucía Ramírez Torres", email: "lucia.ramirez@email.com", password: "user123", role: "usuario" },
    { id: 6, name: "Roberto Jiménez", email: "roberto.j@email.com", password: "user123", role: "usuario" },
    { id: 7, name: "Carlos Mendoza Ríos", email: "carlos.mendoza@email.com", password: "user123", role: "usuario" }
  ],

  products: [
    { id: 1, name: "Laptop Dell XPS 15", category: "Electrónica", catKey: "electronica", icon: "💻", price: 1499.99, stock: 12 },
    { id: 2, name: "iPhone 15 Pro Max", category: "Electrónica", catKey: "electronica", icon: "📱", price: 1199.00, stock: 8 },
    { id: 3, name: 'Monitor LG 27" 4K', category: "Electrónica", catKey: "electronica", icon: "🖥️", price: 449.00, stock: 25 },
    { id: 4, name: "Zapatillas Nike Air Max", category: "Ropa y Moda", catKey: "ropa", icon: "👕", price: 129.99, stock: 54 },
    { id: 5, name: "Chaqueta Columbia Térmica", category: "Ropa y Moda", catKey: "ropa", icon: "🧥", price: 189.00, stock: 31 },
    { id: 6, name: "Cafetera Nespresso Vertuo", category: "Hogar y Jardín", catKey: "hogar", icon: "🏠", price: 219.00, stock: 17 },
    { id: 7, name: "Bicicleta de Montaña Trek", category: "Deportes", catKey: "deportes", icon: "⚽", price: 899.00, stock: 6 },
    { id: 8, name: "Clean Code – R. Martin", category: "Libros", catKey: "libros", icon: "📚", price: 34.99, stock: 88 }
  ],

  orders: [
    { id: "0004", client: "María García López", email: "maria.garcia@email.com", date: "28 ago 2026", items: "1x iPhone 15 Pro Max", total: 1199.00, status: "Pagado" },
    { id: "0003", client: "Ana Sofía Herrera", email: "ana.herrera@email.com", date: "27 ago 2026", items: "1x Cafetera Nespresso Vertuo", total: 219.00, status: "Procesando" },
    { id: "0006", client: "Lucía Ramírez Torres", email: "lucia.ramirez@email.com", date: "25 ago 2026", items: "1x Bicicleta de Montaña Trek", total: 899.00, status: "En camino" },
    { id: "0005", client: "Roberto Jiménez", email: "roberto.j@email.com", date: "20 ago 2026", items: "1x Chaqueta Columbia, 1x Nike Air Max", total: 318.99, status: "Cancelado" },
    { id: "0002", client: "Carlos Mendoza Ríos", email: "carlos.mendoza@email.com", date: "15 ago 2026", items: '1x Monitor LG 27" 4K', total: 449.00, status: "En camino" },
    { id: "0001", client: "María García López", email: "maria.garcia@email.com", date: "10 ago 2026", items: "1x Laptop Dell XPS 15, 1x Cafetera Nespresso", total: 1649.99, status: "Entregado" }
  ]
};

// Cargar o inicializar base de datos en localStorage
function loadDB() {
  const saved = localStorage.getItem("nexo_market_db");
  if (saved) return JSON.parse(saved);
  localStorage.setItem("nexo_market_db", JSON.stringify(INITIAL_DATA));
  return JSON.parse(JSON.stringify(INITIAL_DATA));
}

function saveDB(db) {
  localStorage.setItem("nexo_market_db", JSON.stringify(db));
}