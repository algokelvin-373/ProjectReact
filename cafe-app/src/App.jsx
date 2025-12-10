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
  const placeOrder = () => {
    if (Object.keys(cart).length === 0) {
      alert("Keranjang masih kosong. Silakan pilih menu terlebih dahulu.");
      return;
    }
    const orderSummary = Object.entries(cart)
      .map(([id, qty]) => {
        const item = menuItems.find((i) => i.id === parseInt(id));
        return `${item?.name} x${qty}`;
      })
      .join(", ");
    // Build a structured order object to store in history. Each item in the
    // order contains its id, name, quantity and price. A timestamp is
    // included for reference.
    const itemsInOrder = Object.entries(cart).map(([id, qty]) => {
      const item = menuItems.find((i) => i.id === parseInt(id));
      return {
        id: item?.id,
        name: item?.name,
        qty,
        price: item?.price,
      };
    });
    const newHistoryEntry = {
      id: Date.now(),
      items: itemsInOrder,
      total: computeTotal(),
      timestamp: new Date().toLocaleString("id-ID"),
    };
    // Append to history and persist via useEffect.
    setHistory((prev) => [...prev, newHistoryEntry]);
    // Provide a simple confirmation to the user using an alert. In a real
    // application this could be replaced with a nicer toast or modal.
    alert(
      `Pesanan Anda: ${orderSummary}\nTotal: Rp ${computeTotal().toLocaleString(
        "id-ID"
      )}`
    );
    // Reset the cart after placing the order.
    setCart({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 via-green-500 to-green-700 text-white shadow sticky top-0 z-10">
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
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 py-8 px-4 max-w-5xl mx-auto w-full">
        {/* Menu grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow bg-white flex flex-col"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-lg font-semibold mb-1 text-gray-800">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600 mb-2 flex-1">
                  {item.description}
                </p>
                <p className="text-base font-medium text-green-700 mb-4">
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
            <div className="space-y-3 bg-white p-4 rounded-lg shadow">
              {Object.entries(cart).map(([id, qty]) => {
                const item = menuItems.find((i) => i.id === parseInt(id));
                if (!item) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {qty} x Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => decrementItem(item.id)}
                      >
                        -
                      </button>
                      <span className="min-w-[24px] text-center font-medium">
                        {qty}
                      </span>
                      <button
                        className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => addToCart(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between font-semibold border-t pt-3">
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
                <div key={order.id} className="bg-white p-4 rounded-lg shadow">
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
      <footer className="bg-gray-100 py-4 mt-auto text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Kafe Kopi. Dibuat dengan React & Tailwind
        CSS.
      </footer>
    </div>
  );
}
