import { useState } from "react";

// Define a list of menu items for the café. Each item has an id, name,
// description, and price. In a real application this data might come
// from a database or API, but for this demo it's defined inline.
const menuItems = [
  {
    id: 1,
    name: "Latte",
    description: "Kopi espresso dengan susu steam dan sedikit busa.",
    price: 35000,
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Perpaduan espresso, susu panas, dan busa tebal.",
    price: 33000,
  },
  {
    id: 3,
    name: "Espresso",
    description: "Shot kopi pekat yang diseduh dengan tekanan tinggi.",
    price: 28000,
  },
  {
    id: 4,
    name: "Americano",
    description: "Espresso yang diencerkan dengan air panas.",
    price: 30000,
  },
  {
    id: 5,
    name: "Mocha",
    description: "Kombinasi espresso, cokelat, dan susu steamed.",
    price: 38000,
  },
  {
    id: 6,
    name: "Macchiato",
    description: "Espresso dengan sedikit busa susu di atasnya.",
    price: 32000,
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
    alert(
      `Pesanan Anda: ${orderSummary}\nTotal: Rp ${computeTotal().toLocaleString(
        "id-ID"
      )}`
    );
    setCart({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Menu Kafe</h1>
          <p className="text-sm text-gray-500">
            Pilih kopi favoritmu dan pesan sekarang!
          </p>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 py-8 px-4 max-w-4xl mx-auto w-full">
        {/* Menu grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-sm p-5 flex flex-col justify-between bg-white hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="text-lg font-medium text-green-700">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>
              <button
                className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={() => addToCart(item.id)}
              >
                Tambah
              </button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
          {Object.keys(cart).length === 0 ? (
            <p className="text-gray-600">Belum ada item yang ditambahkan.</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(cart).map(([id, qty]) => {
                const item = menuItems.find((i) => i.id === parseInt(id));
                if (!item) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {qty} x Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                        onClick={() => decrementItem(item.id)}
                      >
                        -
                      </button>
                      <span className="min-w-[24px] text-center">{qty}</span>
                      <button
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                        onClick={() => addToCart(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between font-semibold border-t pt-2">
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
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 mt-auto text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Kafe Kopi. Dibuat dengan React & Tailwind
        CSS.
      </footer>
    </div>
  );
}
