import React, { useState } from "react";
import {
  Coffee,
  Utensils,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const menuItems = [
    {
      id: 1,
      name: "Artisan Coffee",
      description: "Premium single-origin coffee beans, expertly roasted",
      price: "$4.50",
      category: "coffee",
      image: "https://placehold.co/300x200/8B4513/FFFFFF?text=Artisan+Coffee",
    },
    {
      id: 2,
      name: "Cold Brew",
      description: "Smooth cold brew infused with vanilla and citrus",
      price: "$4.75",
      category: "coffee",
      image: "https://placehold.co/300x200/654321/FFFFFF?text=Cold+Brew",
    },
    {
      id: 3,
      name: "Avocado Toast",
      description: "Sourdough bread with smashed avocado and cherry tomatoes",
      price: "$8.95",
      category: "food",
      image: "https://placehold.co/300x200/228B22/FFFFFF?text=Avocado+Toast",
    },
    {
      id: 4,
      name: "Quinoa Bowl",
      description: "Nutritious quinoa bowl with roasted vegetables and tahini",
      price: "$12.50",
      category: "food",
      image: "https://placehold.co/300x200/FF6B35/FFFFFF?text=Quinoa+Bowl",
    },
    {
      id: 5,
      name: "Matcha Latte",
      description: "Ceremonial grade matcha with steamed oat milk",
      price: "$5.25",
      category: "tea",
      image: "https://placehold.co/300x200/32CD32/FFFFFF?text=Matcha+Latte",
    },
    {
      id: 6,
      name: "Seasonal Pastry",
      description: "Freshly baked daily with local seasonal ingredients",
      price: "$3.95",
      category: "pastry",
      image: "https://placehold.co/300x200/FFB6C1/FFFFFF?text=Seasonal+Pastry",
    },
  ];

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coffee className="w-8 h-8 text-amber-700" />
              <h1 className="text-2xl font-bold text-amber-900">
                Café Artisan
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-amber-800 hover:text-amber-600 font-medium"
              >
                Home
              </a>
              <a
                href="#menu"
                className="text-amber-800 hover:text-amber-600 font-medium"
              >
                Menu
              </a>
              <a
                href="#about"
                className="text-amber-800 hover:text-amber-600 font-medium"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-amber-800 hover:text-amber-600 font-medium"
              >
                Contact
              </a>
              <button className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Cart ({cartItems.length})</span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-amber-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-3">
                <a
                  href="#home"
                  className="text-amber-800 hover:text-amber-600 font-medium"
                >
                  Home
                </a>
                <a
                  href="#menu"
                  className="text-amber-800 hover:text-amber-600 font-medium"
                >
                  Menu
                </a>
                <a
                  href="#about"
                  className="text-amber-800 hover:text-amber-600 font-medium"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-amber-800 hover:text-amber-600 font-medium"
                >
                  Contact
                </a>
                <button className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart ({cartItems.length})</span>
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-gradient-to-r from-amber-700 to-amber-900 text-white"
      >
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Craft Your Perfect Moment
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Experience exceptional coffee, artisanal food, and warm
              hospitality in our carefully designed space.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-amber-800 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors">
                Order Online
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-amber-800 transition-colors">
                View Menu
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-50 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-amber-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Coffee className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-amber-800">15+</div>
              <div className="text-amber-600">Coffee Varieties</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Utensils className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-amber-800">50+</div>
              <div className="text-amber-600">Menu Items</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Users className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-amber-800">10K+</div>
              <div className="text-amber-600">Happy Customers</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Clock className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-amber-800">8AM-9PM</div>
              <div className="text-amber-600">Daily Hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Our Menu</h2>
            <p className="text-xl text-amber-700 max-w-2xl mx-auto">
              Carefully crafted with locally sourced ingredients and premium
              coffee beans
            </p>
          </div>

          {/* Menu Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition-colors capitalize"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-amber-900">
                      {item.name}
                    </h3>
                    <span className="text-amber-700 font-bold text-lg">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-amber-600 mb-4">{item.description}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="https://placehold.co/600x400/F4A261/FFFFFF?text=Our+Space"
                alt="Café Interior"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">
                Our Story
              </h2>
              <p className="text-amber-700 mb-6 text-lg leading-relaxed">
                Founded in 2015, Café Artisan began as a small neighborhood
                coffee shop with a simple mission: to create exceptional coffee
                experiences while fostering community connections.
              </p>
              <p className="text-amber-700 mb-8 text-lg leading-relaxed">
                Today, we continue to uphold our commitment to quality,
                sustainability, and warmth. Every cup we serve represents our
                dedication to craftsmanship and our love for bringing people
                together.
              </p>
              <div className="flex items-center space-x-2 text-amber-600">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <span className="ml-2 font-semibold">
                  4.9/5 from 2,500+ reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-amber-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Visit Us</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              We'd love to welcome you to our café. Come enjoy a perfect cup in
              our cozy atmosphere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-amber-400" />
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="opacity-90">
                123 Artisan Street
                <br />
                Downtown, City 12345
              </p>
            </div>
            <div className="text-center p-6">
              <Clock className="w-12 h-12 mx-auto mb-4 text-amber-400" />
              <h3 className="text-xl font-bold mb-2">Hours</h3>
              <p className="opacity-90">
                Monday-Friday: 7AM-9PM
                <br />
                Saturday-Sunday: 8AM-10PM
              </p>
            </div>
            <div className="text-center p-6">
              <Phone className="w-12 h-12 mx-auto mb-4 text-amber-400" />
              <h3 className="text-xl font-bold mb-2">Contact</h3>
              <p className="opacity-90">
                Phone: (555) 123-4567
                <br />
                Email: hello@cafeartisan.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Coffee className="w-6 h-6 text-amber-400" />
              <span className="text-xl font-bold text-white">Café Artisan</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-amber-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Careers
              </a>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center">
            <p>&copy; 2025 Café Artisan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
