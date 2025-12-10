import { useState, useEffect } from "react";

// Import images for each menu item. These photos come from
// Wikimedia Commons and are saved locally in the assets folder. If
// additional menu items are added in the future you can drop more
// pictures into `src/assets` and import them here.
import latteImg from "./assets/latte.jpg";
import cappuccinoImg from "./assets/cappuccino.jpg";
import espressoImg from "./assets/espresso.jpg";

// Define a list of menu items for the café. Each item has an id, name,
// description, and price. In a real application this data might come
// from a database or API, but for this demo it's defined inline.
const menuItems = [
  {
    id: 1,
    name: "Latte",
    description: "Kopi espresso dengan susu steam dan sedikit busa.",
    price: 35000,
    image: latteImg,
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Perpaduan espresso, susu panas, dan busa tebal.",
    price: 33000,
    image: cappuccinoImg,
  },
  {
    id: 3,
    name: "Espresso",
    description: "Shot kopi pekat yang diseduh dengan tekanan tinggi.",
    price: 28000,
    image: espressoImg,
  },
  {
    id: 4,
    name: "Americano",
    description: "Espresso yang diencerkan dengan air panas.",
    price: 30000,
    // Reuse the espresso image for Americano because both drinks share a similar look.
    image: espressoImg,
  },
  {
    id: 5,
    name: "Mocha",
    description: "Kombinasi espresso, cokelat, dan susu steamed.",
    price: 38000,
    // Use the latte image as a placeholder for Mocha.
    image: latteImg,
  },
  {
    id: 6,
    name: "Macchiato",
    description: "Espresso dengan sedikit busa susu di atasnya.",
    price: 32000,
    // Use the cappuccino image as a placeholder for Macchiato.
    image: cappuccinoImg,
  },
];

/**
 * The main application component. It renders a list of menu items and allows
 * users to add them to an order. A summary of the current order is shown
 * below the menu. State is kept locally in the component using React hooks.
 */
export default function App() {
  // cart stores a mapping of menu item IDs to quantities. An empty object means
  // nothing has been ordered yet.
  const [cart, setCart] = useState({});

  // history stores an array of past orders. Each entry contains a unique
  // identifier, a timestamp, the items ordered, and the total price. It is
  // initialised from localStorage so that transaction history persists
  // across page reloads. The optional initialiser function passed to
  // useState reads from localStorage once on mount.
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("history");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Failed to parse history from localStorage", err);
      return [];
    }
  });

  // Persist history to localStorage whenever it changes. Without this
  // effect the history would be lost if the page were refreshed. Wrap in
  // try/catch to avoid breaking the UI if storage is unavailable.
  useEffect(() => {
    try {
      localStorage.setItem("history", JSON.stringify(history));
    } catch (err) {
      console.error("Failed to save history to localStorage", err);
    }
  }, [history]);

  // Flag indicating whether dark mode is active. When `isDark` is true
  // a `dark` class will be applied to the <html> element via the
  // useEffect hook below. Toggling this state allows switching themes.
  const [isDark, setIsDark] = useState(false);

  // Order modal state. When the user clicks "Pesan Sekarang" we
  // assemble the current cart into a temporary object (`modalOrder`) and
  // show a confirmation dialog. On confirmation the order is saved to
  // history; on cancellation the cart remains untouched.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOrder, setModalOrder] = useState(null);

  // Apply or remove the `dark` class on the <html> element whenever
  // `isDark` changes. This works in tandem with Tailwind's `darkMode:
  // 'class'` configuration to enable dark variants of styles.
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  /**
   * Handle adding an item to the cart. When the user clicks the "Tambah"
   * button, we update the cart state by incrementing the quantity for
   * the given id. If the item is not yet in the cart we add it with quantity 1.
   *
   * @param {number} id - The identifier of the menu item to add.
   */
  const addToCart = (id) => {
    setCart((prev) => {
      const quantity = prev[id] || 0;
      return {
        ...prev,
        [id]: quantity + 1,
      };
    });
  };

  /**
   * Decrement the quantity for a given item in the cart. If the quantity
   * reaches zero, the item is removed from the cart entirely. This handler
   * is used for the "-" button in the order summary.
   *
   * @param {number} id - The identifier of the item whose quantity should be decremented.
   */
  const decrementItem = (id) => {
    setCart((prev) => {
      const quantity = prev[id] || 0;
      if (quantity <= 1) {
        // Remove item from cart when quantity hits zero
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [id]: quantity - 1,
      };
    });
  };

  /**
   * Compute the total cost of the items in the cart by summing
   * (quantity * price) for each item. If the cart is empty,
   * the total will be zero.
   *
   * @returns {number} the total price of all items in the cart
   */
  const computeTotal = () => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const item = menuItems.find((i) => i.id === parseInt(id));
      return sum + (item?.price || 0) * qty;
    }, 0);
  };

  /**
   * Handler for placing an order. In a real application this would send
   * the order to a backend server. Here we simply display an alert and
   * reset the cart.
   */
  /**
   * Open the order confirmation modal. This function assembles the current
   * cart into a temporary order structure and prepares a human‑readable
   * summary. If the cart is empty a warning alert is shown instead.
   */
  const placeOrder = () => {
    if (Object.keys(cart).length === 0) {
      alert("Keranjang masih kosong. Silakan pilih menu terlebih dahulu.");
      return;
    }
    const itemsInOrder = Object.entries(cart).map(([id, qty]) => {
      const item = menuItems.find((i) => i.id === parseInt(id));
      return {
        id: item?.id,
        name: item?.name,
        qty,
        price: item?.price,
      };
    });
    const summaryString = itemsInOrder
      .map((it) => `${it.name} x${it.qty}`)
      .join(", ");
    setModalOrder({
      items: itemsInOrder,
      total: computeTotal(),
      summary: summaryString,
    });
    setIsModalOpen(true);
  };

  /**
   * Confirm the order in the modal. A new history entry is created with
   * the contents of `modalOrder`, the cart is cleared and the modal
   * dismissed. This function is called when the user clicks the
   * "Konfirmasi" button on the pop‑up.
   */
  const confirmOrder = () => {
    if (!modalOrder) return;
    const newHistoryEntry = {
      id: Date.now(),
      items: modalOrder.items,
      total: modalOrder.total,
      timestamp: new Date().toLocaleString("id-ID"),
    };
    setHistory((prev) => [...prev, newHistoryEntry]);
    setCart({});
    setIsModalOpen(false);
    setModalOrder(null);
  };

  /**
   * Close the order modal without placing the order. This leaves the cart
   * unchanged.
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setModalOrder(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f1e5] dark:bg-[#1c1a18] text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#603813] via-[#b29f7e] to-[#603813] dark:from-[#2e1c0f] dark:via-[#4f3422] dark:to-[#2e1c0f] text-white shadow sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kafe Kopi</h1>
            <p className="text-sm opacity-90">
              Pilih kopi favoritmu dan pesan sekarang!
            </p>
          </div>
          <span className="mt-4 sm:mt-0 text-xs">
            {new Date().toLocaleDateString("id-ID")}
          </span>
          {/* Theme toggle button */}
          <button
            className="ml-0 sm:ml-4 mt-4 sm:mt-0 border border-white/40 text-white rounded px-3 py-1 text-sm hover:bg-white/20 transition"
            onClick={() => setIsDark((prev) => !prev)}
            title="Toggle Tema"
          >
            {isDark ? "Tema Terang" : "Tema Gelap"}
          </button>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 py-8 px-4 max-w-5xl mx-auto w-full">
        {/* Menu grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow bg-white dark:bg-[#2b2119] flex flex-col"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-200">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex-1">
                  {item.description}
                </p>
                <p className="text-base font-medium text-green-700 dark:text-green-400 mb-4">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
                <button
                  className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  onClick={() => addToCart(item.id)}
                >
                  Tambah
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Ringkasan Pesanan</h2>
          {Object.keys(cart).length === 0 ? (
            <p className="text-gray-600">Belum ada item yang ditambahkan.</p>
          ) : (
            <div className="space-y-3 bg-white dark:bg-[#2b2119] p-4 rounded-lg shadow">
              {Object.entries(cart).map(([id, qty]) => {
                const item = menuItems.find((i) => i.id === parseInt(id));
                if (!item) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0 border-gray-200 dark:border-gray-700"
                  >
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {qty} x Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => decrementItem(item.id)}
                      >
                        -
                      </button>
                      <span className="min-w-[24px] text-center font-medium">
                        {qty}
                      </span>
                      <button
                        className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => addToCart(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between font-semibold border-t pt-3 border-gray-200 dark:border-gray-700">
                <span>Total</span>
                <span>Rp {computeTotal().toLocaleString("id-ID")}</span>
              </div>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={placeOrder}
              >
                Pesan Sekarang
              </button>
            </div>
          )}
        </section>

        {/* Transaction history */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Riwayat Transaksi</h2>
          {history.length === 0 ? (
            <p className="text-gray-600">Belum ada transaksi.</p>
          ) : (
            <div className="space-y-4">
              {history.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-[#2b2119] p-4 rounded-lg shadow"
                >
                  <p className="text-sm text-gray-500">{order.timestamp}</p>
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
                  <div className="flex justify-between font-semibold border-t pt-2 mt-2 text-sm">
                    <span>Total</span>
                    <span>Rp {order.total.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-[#2e1c0f] py-4 mt-auto text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Kafe Kopi. Dibuat dengan React & Tailwind
        CSS.
      </footer>

      {/* Order Confirmation Modal */}
      {isModalOpen && modalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70">
          <div className="bg-white dark:bg-[#2b2119] rounded-lg p-6 w-11/12 max-w-md mx-auto shadow-lg text-gray-800 dark:text-gray-200">
            <h3 className="text-lg font-semibold mb-2">Konfirmasi Pesanan</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
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
            <div className="flex justify-between font-semibold border-t border-gray-200 dark:border-gray-700 pt-2 mb-4 text-sm">
              <span>Total</span>
              <span>Rp {modalOrder.total.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
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
    </div>
  );
}
