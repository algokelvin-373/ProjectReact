import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Wine,
  Beer,
  Utensils,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState("wines");

  // Mock data for menu items
  const menuItems = {
    wines: [
      {
        id: 1,
        name: "Cabernet Sauvignon",
        region: "Napa Valley",
        price: "$18",
        description: "Full-bodied with notes of blackcurrant and cedar",
      },
      {
        id: 2,
        name: "Chardonnay",
        region: "Burgundy",
        price: "$16",
        description: "Buttery texture with hints of vanilla and oak",
      },
      {
        id: 3,
        name: "Pinot Noir",
        region: "Willamette Valley",
        price: "$22",
        description: "Elegant with red fruit flavors and silky tannins",
      },
      {
        id: 4,
        name: "Sauvignon Blanc",
        region: "Marlborough",
        price: "$14",
        description: "Crisp and refreshing with citrus notes",
      },
    ],
    beers: [
      {
        id: 1,
        name: "Craft IPA",
        brewery: "Local Hops Co.",
        price: "$8",
        description: "Hoppy with citrus and pine notes, 6.5% ABV",
      },
      {
        id: 2,
        name: "Belgian Tripel",
        brewery: "Monastery Brews",
        price: "$10",
        description: "Complex with fruity esters and spicy phenols, 9% ABV",
      },
      {
        id: 3,
        name: "Stout",
        brewery: "Dark Moon Brewing",
        price: "$9",
        description:
          "Rich coffee and chocolate flavors, creamy texture, 7% ABV",
      },
      {
        id: 4,
        name: "Hefeweizen",
        brewery: "Bavarian House",
        price: "$7",
        description:
          "Unfiltered wheat beer with banana and clove notes, 5.2% ABV",
      },
    ],
    food: [
      {
        id: 1,
        name: "Filet Mignon",
        price: "$38",
        description:
          "8oz prime cut, truffle mashed potatoes, seasonal vegetables",
      },
      {
        id: 2,
        name: "Lobster Risotto",
        price: "$32",
        description:
          "Creamy arborio rice with fresh lobster, lemon zest, and herbs",
      },
      {
        id: 3,
        name: "Truffle Pasta",
        price: "$26",
        description:
          "Wild mushrooms, parmesan cream sauce, shaved black truffle",
      },
      {
        id: 4,
        name: "Smoked Salmon",
        price: "$28",
        description:
          "House-cured salmon, dill crème fraîche, pickled vegetables",
      },
    ],
  };

  const menuCategories = [
    { id: "wines", label: "Wines", icon: <Wine className="w-5 h-5" /> },
    { id: "beers", label: "Craft Beers", icon: <Beer className="w-5 h-5" /> },
    {
      id: "food",
      label: "Western Cuisine",
      icon: <Utensils className="w-5 h-5" />,
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-950 to-stone-900 text-amber-50 font-sans">
      {/* Navigation Bar */}
      <nav className="fixed w-full z-50 bg-amber-950/90 backdrop-blur-sm border-b border-amber-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Wine className="w-8 h-8 text-amber-400" />
              <span className="text-2xl font-serif font-bold text-amber-50">
                VINE & STEAK
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              <a
                href="#hero"
                className="text-amber-100 hover:text-amber-300 font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#menu"
                className="text-amber-100 hover:text-amber-300 font-medium transition-colors"
              >
                Menu
              </a>
              <a
                href="#gallery"
                className="text-amber-100 hover:text-amber-300 font-medium transition-colors"
              >
                Gallery
              </a>
              <a
                href="#contact"
                className="text-amber-100 hover:text-amber-300 font-medium transition-colors"
              >
                Contact
              </a>
              <button className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                Reserve Table
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-amber-100"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-amber-950 border-t border-amber-900/50 py-4">
            <div className="flex flex-col space-y-4 px-4">
              <a
                href="#hero"
                className="text-amber-100 hover:text-amber-300 py-2"
              >
                Home
              </a>
              <a
                href="#menu"
                className="text-amber-100 hover:text-amber-300 py-2"
              >
                Menu
              </a>
              <a
                href="#gallery"
                className="text-amber-100 hover:text-amber-300 py-2"
              >
                Gallery
              </a>
              <a
                href="#contact"
                className="text-amber-100 hover:text-amber-300 py-2"
              >
                Contact
              </a>
              <button className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold py-3 rounded-full transition-all">
                Reserve Table
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/2a1b0c/8c6d46?text=Restaurant+Ambiance')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/90 to-stone-900/90"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-100">
              Savor the Moment
            </h1>
            <p className="text-xl md:text-2xl text-amber-200 mb-10 max-w-3xl mx-auto">
              An elegant sanctuary where exceptional wines, craft beers, and
              gourmet Western cuisine create unforgettable dining experiences
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#menu"
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Explore Menu
              </a>
              <a
                href="#contact"
                className="bg-transparent border-2 border-amber-500 hover:bg-amber-500/10 text-amber-300 font-bold py-4 px-8 rounded-full text-lg transition-all"
              >
                Make Reservation
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section
        id="menu"
        className="py-20 bg-stone-900/50 border-t border-b border-amber-900/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-50 mb-4">
              Our Culinary Offerings
            </h2>
            <p className="text-amber-200 max-w-3xl mx-auto">
              Meticulously curated selections that pair perfectly with our
              premium beverages
            </p>
          </motion.div>

          {/* Menu Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveMenuTab(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                  activeMenuTab === category.id
                    ? "bg-amber-600 text-amber-950 shadow-lg"
                    : "bg-stone-800 text-amber-200 hover:bg-stone-700"
                }`}
              >
                {category.icon}
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems[activeMenuTab].map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="bg-stone-800/50 backdrop-blur-sm border border-amber-900/30 rounded-xl p-6 hover:border-amber-600/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-amber-50 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-amber-200 italic mb-3">
                      {activeMenuTab === "wines" ? item.region : item.brewery}
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-amber-400">
                    {item.price}
                  </span>
                </div>
                <p className="text-amber-300 mb-4">{item.description}</p>
                <div className="h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-50 mb-4">
              Ambiance & Artistry
            </h2>
            <p className="text-amber-200 max-w-3xl mx-auto">
              Experience our elegant atmosphere and culinary craftsmanship
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                variants={fadeInUp}
                className="relative group overflow-hidden rounded-xl shadow-2xl"
              >
                <div
                  className="aspect-w-16 aspect-h-9 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://placehold.co/600x400/2a1b0c/8c6d46?text=Gallery+${item}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-amber-50 font-serif font-bold text-xl">
                    {item === 1 && "Private Dining"}
                    {item === 2 && "Wine Cellar"}
                    {item === 3 && "Chef's Table"}
                    {item === 4 && "Bar Lounge"}
                    {item === 5 && "Garden Terrace"}
                    {item === 6 && "Plating Artistry"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-stone-900/50 border-t border-amber-900/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-serif font-bold text-amber-50 mb-6">
                Reserve Your Experience
              </h2>
              <p className="text-amber-200 mb-8">
                Our dedicated team is ready to craft a memorable dining
                experience for you. Contact us for reservations, private events,
                or special requests.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-amber-50 mb-1">
                      Location
                    </h3>
                    <p className="text-amber-200">
                      123 Gourmet Avenue, Wine Country, CA 94558
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-amber-50 mb-1">
                      Reservations
                    </h3>
                    <p className="text-amber-200">(707) 555-1882</p>
                    <p className="text-amber-300">Open Tue-Sun: 5PM - 11PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-amber-50 mb-1">
                      Inquiries
                    </h3>
                    <p className="text-amber-200">
                      reservations@vineandsteak.com
                    </p>
                    <p className="text-amber-200">events@vineandsteak.com</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-amber-950 border border-amber-800 text-amber-300 flex items-center justify-center transition-all hover:bg-amber-900 hover:text-amber-100"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="bg-stone-800/50 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-8 shadow-xl"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-amber-200 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-stone-900 border border-amber-900/30 rounded-lg text-amber-50 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-amber-200 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-stone-900 border border-amber-900/30 rounded-lg text-amber-50 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="date" className="block text-amber-200 mb-2">
                    Preferred Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    id="date"
                    className="w-full px-4 py-3 bg-stone-900 border border-amber-900/30 rounded-lg text-amber-50 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="guests" className="block text-amber-200 mb-2">
                    Number of Guests
                  </label>
                  <select
                    id="guests"
                    className="w-full px-4 py-3 bg-stone-900 border border-amber-900/30 rounded-lg text-amber-50 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option>1-2 Guests</option>
                    <option>3-4 Guests</option>
                    <option>5-6 Guests</option>
                    <option>7+ Guests</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-amber-200 mb-2"
                  >
                    Special Requests
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 bg-stone-900 border border-amber-900/30 rounded-lg text-amber-50 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Celebration details, dietary restrictions, etc."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-500 text-amber-950 font-bold py-4 px-6 rounded-xl text-lg transition-all shadow-lg"
                >
                  Request Reservation
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 border-t border-amber-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Wine className="w-8 h-8 text-amber-400" />
                <span className="text-2xl font-serif font-bold text-amber-50">
                  VINE & STEAK
                </span>
              </div>
              <p className="text-amber-200 mb-4 max-w-md">
                An intimate sanctuary where exceptional beverages meet gourmet
                Western cuisine in an atmosphere of refined elegance.
              </p>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-amber-900 border border-amber-800 text-amber-300 flex items-center justify-center transition-all hover:bg-amber-800 hover:text-amber-100"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-amber-50 mb-6">Hours</h3>
              <ul className="space-y-2 text-amber-200">
                <li>Tuesday-Thursday: 5PM - 11PM</li>
                <li>Friday-Saturday: 5PM - 12AM</li>
                <li>Sunday: 4PM - 10PM</li>
                <li>Monday: Closed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-amber-50 mb-6">
                Experience
              </h3>
              <ul className="space-y-2 text-amber-200">
                <li>Daily Wine Tastings</li>
                <li>Private Dining Rooms</li>
                <li>Chef's Table Experience</li>
                <li>Seasonal Tasting Menus</li>
                <li>Craft Beer Pairings</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-amber-900/30 mt-12 pt-8 text-center text-amber-300">
            <p>
              &copy; {new Date().getFullYear()} Vine & Steak. All rights
              reserved. Crafted with passion in California.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
