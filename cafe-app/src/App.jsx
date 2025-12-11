import React, { useState, useEffect } from "react";

// Import locally stored coffee images for some products. These files reside
// in the `src/assets` directory. We fall back to coloured placeholder
// images for menu items that don't have a corresponding photo.
import latteImg from "./assets/latte.jpg";
import cappuccinoImg from "./assets/cappuccino.jpg";
import espressoImg from "./assets/espresso.jpg";

/**
 * The product catalogue for the café. Each entry includes an id, name,
 * price and image URL. The first three drinks are mapped to locally
 * downloaded images while the remainder use placeholder graphics.
 */
const coffeeProducts = [
  { id: 1, name: "Espresso", price: 25000, image: espressoImg },
  { id: 2, name: "Cappuccino", price: 30000, image: cappuccinoImg },
  { id: 3, name: "Latte", price: 32000, image: latteImg },
  {
    id: 4,
    name: "Mocha",
    price: 35000,
    image: "https://placehold.co/300x200/654321/FFFFFF?text=Mocha",
  },
  {
    id: 5,
    name: "Americano",
    price: 28000,
    image: "https://placehold.co/300x200/8B4513/FFFFFF?text=Americano",
  },
  {
    id: 6,
    name: "Flat White",
    price: 33000,
    image: "https://placehold.co/300x200/D2691E/FFFFFF?text=Flat+White",
  },
];

/**
 * Main application component. It maintains the current navigation tab,
 * shopping cart, transaction history, dark mode, responsive mobile menu and
 * various modals for order confirmation, success feedback and viewing past
 * transactions. The UI is split into three primary views: home, menu and
 * cart, with a mobile‑friendly navigation bar.
 */
export default function App() {
  // Which section is currently active: 'home', 'menu' or 'cart'.
  const [activeTab, setActiveTab] = useState("home");

  // Items currently in the cart. Each entry has id, name, price, image and quantity.
  const [cart, setCart] = useState([]);

  // Flag to control visibility of the mobile navigation menu.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Persisted transaction history. Each entry includes id, timestamp, items and total.
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("history");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Failed to parse history from localStorage", err);
      return [];
    }
  });

  // Flag controlling whether dark mode is enabled. When true a 'dark'
  // class is applied to the <html> element via the effect below.
  const [isDark, setIsDark] = useState(false);

  // Order confirmation modal state. When open this holds the items being ordered.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOrder, setModalOrder] = useState(null);

  // Success modal state for displaying a receipt after an order is placed.
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);

  // History detail modal state. Stores the transaction selected for inspection.
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyOrder, setHistoryOrder] = useState(null);

  // Close the mobile menu on large screens.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Persist the transaction history to localStorage whenever it changes.
  useEffect(() => {
    try {
      localStorage.setItem("history", JSON.stringify(history));
    } catch (err) {
      console.error("Failed to save history to localStorage", err);
    }
  }, [history]);

  // Apply the dark mode class to <html> whenever the isDark flag changes.
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  /**
   * Add a product to the cart. If it already exists increment its quantity,
   * otherwise push a new item with quantity 1.
   *
   * @param {object} product - The product to add to the cart.
   */
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  /**
   * Increment the quantity of a cart item by id.
   *
   * @param {number} id - The identifier of the cart item to increment.
   */
  const incrementItem = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  /**
   * Decrement the quantity of a cart item by id. If quantity reaches zero
   * the item is removed entirely.
   *
   * @param {number} id - The identifier of the cart item to decrement.
   */
  const decrementItem = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /**
   * Remove an item from the cart entirely.
   *
   * @param {number} id - The identifier of the item to remove.
   */
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  /**
   * Compute the total price of the current cart.
   *
   * @returns {number} The sum of price × quantity for each cart item.
   */
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  /** Toggle the mobile navigation menu. */
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  /** Toggle dark mode. */
  const toggleTheme = () => setIsDark((prev) => !prev);

  /**
   * Assemble an order from the cart and open the confirmation modal.
   * If the cart is empty a warning alert is shown instead.
   */
  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Keranjang masih kosong. Silakan pilih produk terlebih dahulu.");
      return;
    }
    setModalOrder({
      items: cart.map(({ id, name, price, quantity }) => ({
        id,
        name,
        price,
        qty: quantity,
      })),
      total: getTotalPrice(),
    });
    setIsModalOpen(true);
  };

  /** Confirm the order, append it to history, clear the cart and show success. */
  const confirmOrder = () => {
    if (!modalOrder) return;
    const newEntry = {
      id: Date.now(),
      items: modalOrder.items,
      total: modalOrder.total,
      timestamp: new Date().toLocaleString("id-ID"),
    };
    setHistory((prev) => [...prev, newEntry]);
    setCart([]);
    setIsModalOpen(false);
    setModalOrder(null);
    setSuccessOrder(newEntry);
    setIsSuccessOpen(true);
    setActiveTab("cart");
  };

  /** Close the confirmation modal without placing an order. */
  const closeModal = () => {
    setIsModalOpen(false);
    setModalOrder(null);
  };

  /** Close the success modal. */
  const closeSuccess = () => {
    setIsSuccessOpen(false);
    setSuccessOrder(null);
  };

  /** Open a modal displaying details of a past transaction. */
  const openHistoryModal = (order) => {
    setHistoryOrder(order);
    setIsHistoryModalOpen(true);
  };

  /** Close the history detail modal. */
  const closeHistoryModal = () => {
    setHistoryOrder(null);
    setIsHistoryModalOpen(false);
  };

  /**
   * Render the home tab, which includes a hero section, featured products and
   * an about section. Dark mode classes are applied where appropriate.
   */
  const renderHome = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 dark:from-[#2e1c0f] dark:via-[#4f3422] dark:to-[#2e1c0f] rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 px-6 py-16 md:px-12 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Crafted with Passion, Brewed to Perfection
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-8 leading-relaxed">
              Experience the rich aroma and bold flavors of our premium coffee
              selection
            </p>
            <button
              onClick={() => setActiveTab("menu")}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Our Menu
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-200 mb-8 text-center">
          Our Signature Blends
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coffeeProducts.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-[#2b2119] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-200 mb-2">
                  {product.name}
                </h3>
                <p className="text-amber-700 dark:text-amber-300 mb-4">
                  Rp {product.price.toLocaleString()}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-amber-50 dark:bg-[#3b2a1d] rounded-3xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-200 mb-6 text-center">
            Our Coffee Journey
          </h2>
          <p className="text-amber-800 dark:text-amber-300 text-lg leading-relaxed text-center">
            Since 2010, we've been dedicated to sourcing the finest coffee beans
            from around the world. Our master roasters craft each batch with
            precision and care, ensuring every cup delivers an exceptional
            experience that awakens your senses and warms your soul.
          </p>
        </div>
      </section>
    </div>
  );

  /**
   * Render the menu tab. Displays all available products in a grid.
   */
  const renderMenu = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-200 mb-6 text-center">
        Our Coffee Menu
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coffeeProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-[#2b2119] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-200">
                  {product.name}
                </h3>
                <span className="text-amber-700 dark:text-amber-300 font-semibold">
                  Rp {product.price.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /**
   * Render the cart tab. Displays the contents of the cart and a checkout button.
   * Also includes the transaction history below the cart for convenience.
   */
  const renderCart = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-200 mb-6 text-center">
        Your Order
      </h2>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-amber-400 dark:text-amber-300 text-6xl mb-4">
            ☕
          </div>
          <p className="text-amber-700 dark:text-amber-300 text-xl">
            Your cart is empty
          </p>
          <button
            onClick={() => setActiveTab("menu")}
            className="mt-4 bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#2b2119] rounded-xl p-4 shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-200">
                  {item.name}
                </h3>
                <p className="text-amber-700 dark:text-amber-300">
                  Rp {item.price.toLocaleString()} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-amber-900 dark:text-amber-200 font-bold">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decrementItem(item.id)}
                    className="border border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300 rounded px-2"
                  >
                    -
                  </button>
                  <span className="min-w-[24px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => incrementItem(item.id)}
                    className="border border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300 rounded px-2"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-500 transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="bg-amber-50 dark:bg-[#3b2a1d] rounded-xl p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-amber-900 dark:text-amber-200">
                Total:
              </span>
              <span className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                Rp {getTotalPrice().toLocaleString()}
              </span>
            </div>
            <button
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-300"
              onClick={placeOrder}
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Transaction History Section */}
      <section className="mt-12">
        <h3 className="text-2xl font-semibold text-amber-900 dark:text-amber-200 mb-4 text-center">
          Riwayat Transaksi
        </h3>
        {history.length === 0 ? (
          <p className="text-center text-amber-700 dark:text-amber-300">
            Belum ada transaksi.
          </p>
        ) : (
          <div className="space-y-4">
            {history.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-[#2b2119] p-4 rounded-lg shadow"
              >
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  {order.timestamp}
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  {order.items.map((itm) => (
                    <li key={itm.id} className="flex justify-between">
                      <span>
                        {itm.name} x{itm.qty}
                      </span>
                      <span>
                        Rp {(itm.price * itm.qty).toLocaleString("id-ID")}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-semibold border-t border-amber-200 dark:border-amber-600 pt-2 mt-2 text-sm">
                  <span>Total</span>
                  <span>Rp {order.total.toLocaleString("id-ID")}</span>
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    className="text-sm text-blue-600 dark:text-blue-400 underline hover:opacity-80"
                    onClick={() => openHistoryModal(order)}
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 dark:from-[#1c1a18] dark:to-[#2e1c0f]">
      {/* Header */}
      <header className="bg-white dark:bg-[#2b2119] shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-600 dark:bg-amber-700 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">☕</span>
              </div>
              <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-200">
                Brew Haven
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {["home", "menu", "cart"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 capitalize ${
                    activeTab === tab
                      ? "bg-amber-600 dark:bg-amber-700 text-white"
                      : "text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-400 hover:bg-amber-100 dark:hover:bg-[#3b2a1d]"
                  }`}
                >
                  {tab}
                </button>
              ))}
              {/* Theme toggle button for desktop */}
              <button
                onClick={toggleTheme}
                className="px-4 py-2 ml-4 rounded-lg font-medium text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-[#3b2a1d] transition-colors duration-200"
              >
                {isDark ? "Tema Terang" : "Tema Gelap"}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="text-amber-700 dark:text-amber-300 text-xl"
                title="Toggle Tema"
              >
                {isDark ? "☀️" : "🌙"}
              </button>
              <button
                onClick={toggleMenu}
                className="text-amber-700 dark:text-amber-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4">
              {["home", "menu", "cart"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 capitalize mb-2 ${
                    activeTab === tab
                      ? "bg-amber-600 dark:bg-amber-700 text-white"
                      : "text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-400 hover:bg-amber-100 dark:hover:bg-[#3b2a1d]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Cart Notification */}
      {cart.length > 0 && activeTab !== "cart" && (
        <div className="fixed top-20 right-4 bg-amber-600 dark:bg-amber-700 text-white px-4 py-2 rounded-full shadow-lg z-50 animate-bounce">
          <span>
            🛒 {cart.reduce((total, item) => total + item.quantity, 0)} items in
            cart
          </span>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "home" && renderHome()}
        {activeTab === "menu" && renderMenu()}
        {activeTab === "cart" && renderCart()}
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 dark:bg-[#2e1c0f] text-amber-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-amber-600 dark:bg-amber-700 rounded-full flex items-center justify-center">
              <span className="text-white">☕</span>
            </div>
            <h3 className="text-xl font-bold">Brew Haven</h3>
          </div>
          <p className="mb-4">
            Crafting exceptional coffee experiences since 2010
          </p>
          <p className="text-amber-300">
            © {new Date().getFullYear()} Brew Haven. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Order Confirmation Modal */}
      {isModalOpen && modalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70">
          <div className="bg-white dark:bg-[#2b2119] rounded-lg p-6 w-11/12 max-w-md mx-auto shadow-lg text-gray-800 dark:text-gray-200">
            <h3 className="text-lg font-semibold mb-2">Konfirmasi Pesanan</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
              Anda memesan:
            </p>
            <ul className="space-y-1 text-sm mb-3">
              {modalOrder.items.map((itm) => (
                <li key={itm.id} className="flex justify-between">
                  <span>
                    {itm.name} x{itm.qty}
                  </span>
                  <span>
                    Rp {(itm.price * itm.qty).toLocaleString("id-ID")}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-semibold border-t border-amber-200 dark:border-amber-600 pt-2 mb-4 text-sm">
              <span>Total</span>
              <span>Rp {modalOrder.total.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded border border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-[#3b2a1d]"
                onClick={closeModal}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                onClick={confirmOrder}
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Confirmation Modal */}
      {isSuccessOpen && successOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70">
          <div className="bg-white dark:bg-[#2b2119] rounded-lg p-6 w-11/12 max-w-md mx-auto shadow-lg text-gray-800 dark:text-gray-200">
            <h3 className="text-lg font-semibold mb-2">Pesanan Berhasil</h3>
            <p className="text-sm mb-3">
              Pesanan Anda telah diterima pada {successOrder.timestamp}.
            </p>
            <ul className="space-y-1 text-sm mb-3">
              {successOrder.items.map((itm) => (
                <li key={itm.id} className="flex justify-between">
                  <span>
                    {itm.name} x{itm.qty}
                  </span>
                  <span>
                    Rp {(itm.price * itm.qty).toLocaleString("id-ID")}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-semibold border-t border-amber-200 dark:border-amber-600 pt-2 mb-4 text-sm">
              <span>Total</span>
              <span>Rp {successOrder.total.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
                onClick={closeSuccess}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Detail Modal */}
      {isHistoryModalOpen && historyOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70">
          <div className="bg-white dark:bg-[#2b2119] rounded-lg p-6 w-11/12 max-w-md mx-auto shadow-lg text-gray-800 dark:text-gray-200">
            <h3 className="text-lg font-semibold mb-2">Detail Transaksi</h3>
            <p className="text-sm mb-3">Waktu: {historyOrder.timestamp}</p>
            <ul className="space-y-1 text-sm mb-3">
              {historyOrder.items.map((itm) => (
                <li key={itm.id} className="flex justify-between">
                  <span>
                    {itm.name} x{itm.qty}
                  </span>
                  <span>
                    Rp {(itm.price * itm.qty).toLocaleString("id-ID")}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-semibold border-t border-amber-200 dark:border-amber-600 pt-2 mb-4 text-sm">
              <span>Total</span>
              <span>Rp {historyOrder.total.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                onClick={closeHistoryModal}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
