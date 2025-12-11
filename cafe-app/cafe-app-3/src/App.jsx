import React, { useState } from "react";
import {
  Menu,
  Utensils,
  Coffee,
  Cake,
  ArrowRight,
  Star,
  Clock,
  MapPin,
} from "lucide-react";

const App = () => {
  const [activeSection, setActiveSection] = useState("appetizers");

  const menuItems = {
    appetizers: [
      {
        name: "Truffle Arancini",
        description:
          "Crispy risotto balls with black truffle and parmesan cheese",
        price: "$18",
        image:
          "https://placehold.co/300x200/8B4513/FFFFFF?text=Truffle+Arancini",
      },
      {
        name: "Seared Scallops",
        description:
          "Pan-seared scallops with cauliflower purée and citrus beurre blanc",
        price: "$24",
        image:
          "https://placehold.co/300x200/4682B4/FFFFFF?text=Seared+Scallops",
      },
      {
        name: "Burrata Caprese",
        description:
          "Fresh burrata with heirloom tomatoes, basil oil, and aged balsamic",
        price: "$22",
        image:
          "https://placehold.co/300x200/228B22/FFFFFF?text=Burrata+Caprese",
      },
    ],
    mains: [
      {
        name: "Wagyu Beef Tenderloin",
        description:
          "8oz A5 Wagyu with truffle mashed potatoes and seasonal vegetables",
        price: "$85",
        image:
          "https://placehold.co/300x200/8B0000/FFFFFF?text=Wagyu+Tenderloin",
      },
      {
        name: "Pan-Seared Duck Breast",
        description:
          "Medium-rare duck breast with cherry reduction and wild rice pilaf",
        price: "$42",
        image: "https://placehold.co/300x200/8B4513/FFFFFF?text=Duck+Breast",
      },
      {
        name: "Lobster Risotto",
        description: "Creamy arborio rice with Maine lobster tail and saffron",
        price: "$48",
        image:
          "https://placehold.co/300x200/FF6347/FFFFFF?text=Lobster+Risotto",
      },
    ],
    desserts: [
      {
        name: "Chocolate Soufflé",
        description: "Warm dark chocolate soufflé with vanilla bean ice cream",
        price: "$16",
        image:
          "https://placehold.co/300x200/654321/FFFFFF?text=Chocolate+Souffle",
      },
      {
        name: "Crème Brûlée",
        description:
          "Classic vanilla bean crème brûlée with caramelized sugar crust",
        price: "$14",
        image: "https://placehold.co/300x200/FFD700/000000?text=Creme+Brulee",
      },
      {
        name: "Tiramisu",
        description:
          "House-made tiramisu with espresso-soaked ladyfingers and mascarpone",
        price: "$15",
        image: "https://placehold.co/300x200/D2691E/FFFFFF?text=Tiramisu",
      },
    ],
  };

  const sections = [
    { id: "appetizers", label: "Appetizers", icon: Utensils },
    { id: "mains", label: "Main Course", icon: Menu },
    { id: "desserts", label: "Desserts", icon: Cake },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 via-stone-800 to-amber-900 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 tracking-wide">
              ÉLÉGANCE
            </h1>
            <p className="text-xl md:text-2xl text-amber-200 font-light mb-8">
              Fine Dining & Artisanal Coffee
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-amber-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Open: 5:00 PM - 11:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>123 Gourmet Avenue, Culinary District</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-6 py-4">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-amber-600 text-white shadow-lg"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Menu Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
            {sections.find((s) => s.id === activeSection)?.label}
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems[activeSection].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {item.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">
                  {item.name}
                </h3>
                <p className="text-stone-600 leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-amber-600 font-medium hover:text-amber-700 transition-colors">
                    Order Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-amber-100 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-white">
                ÉLÉGANCE
              </h3>
              <p className="mb-4">
                Where culinary artistry meets refined dining experience in the
                heart of the city.
              </p>
              <div className="flex gap-4">
                <Coffee className="w-6 h-6 text-amber-400" />
                <Utensils className="w-6 h-6 text-amber-400" />
                <Cake className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Hours</h4>
              <p className="mb-2">Monday - Thursday: 5:00 PM - 11:00 PM</p>
              <p className="mb-2">Friday - Saturday: 5:00 PM - 12:00 AM</p>
              <p>Sunday: 4:00 PM - 10:00 PM</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <p className="mb-2">123 Gourmet Avenue</p>
              <p className="mb-2">Culinary District, CA 90210</p>
              <p>(555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-stone-700 mt-8 pt-8 text-center">
            <p>&copy; 2025 ÉLÉGANCE Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
