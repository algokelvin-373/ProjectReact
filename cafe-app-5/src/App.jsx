import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Utensils,
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
} from "lucide-react";

const App = () => {
  const [language, setLanguage] = useState("en");
  const [reservation, setReservation] = useState({
    date: "",
    time: "",
    guests: 1,
    name: "",
    contact: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");

  // Language toggle handler
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "zh" : "en"));
  };

  // Handle reservation form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setReservation({
        date: "",
        time: "",
        guests: 1,
        name: "",
        contact: "",
      });
    }, 5000);
  };

  // Navigation section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "menu", "reservation", "contact"];
      let current = "hero";

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            current = section;
          }
        }
      });

      setCurrentSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Content dictionary for bilingual support
  const content = {
    en: {
      nav: {
        about: "About",
        menu: "Menu",
        reservation: "Reservation",
        contact: "Contact",
      },
      hero: {
        title: "Imperial Garden",
        subtitle: "Authentic Chinese Cuisine & Culture",
        cta: "Make a Reservation",
      },
      about: {
        title: "Our Heritage",
        description:
          "For over 30 years, Imperial Garden has served authentic Chinese cuisine using traditional recipes passed down through generations. Our chefs source the finest ingredients to create an unforgettable dining experience in an elegant setting inspired by classical Chinese gardens.",
      },
      menu: {
        title: "Signature Dishes",
        items: [
          {
            name: "Peking Duck",
            description:
              "Classic roasted duck served with pancakes, scallions, and hoisin sauce",
            price: "$38",
          },
          {
            name: "Kung Pao Chicken",
            description:
              "Sautéed chicken with peanuts, vegetables, and chili peppers",
            price: "$24",
          },
          {
            name: "Xiaolongbao",
            description: "Shanghai soup dumplings with pork filling",
            price: "$18",
          },
          {
            name: "Mapo Tofu",
            description: "Spicy Sichuan tofu with minced pork in chili sauce",
            price: "$22",
          },
        ],
      },
      reservation: {
        title: "Book Your Table",
        date: "Date",
        time: "Time",
        guests: "Guests",
        name: "Full Name",
        contact: "Phone/Email",
        submit: "Reserve Now",
        success:
          "Reservation confirmed! We'll contact you shortly to finalize details.",
      },
      contact: {
        title: "Visit Us",
        address: "123 Prosperity Avenue, Chinatown",
        phone: "(212) 555-8888",
        email: "reservations@imperialgarden.com",
        hours: "Daily: 11:30 AM - 10:30 PM",
      },
      footer: {
        copyright: "© 2025 Imperial Garden. All rights reserved.",
      },
    },
    zh: {
      nav: {
        about: "关于我们",
        menu: "菜单",
        reservation: "预订",
        contact: "联系",
      },
      hero: {
        title: "御花园",
        subtitle: "正宗中华美食与文化",
        cta: "预订餐桌",
      },
      about: {
        title: "我们的传承",
        description:
          "三十多年来，御花园一直提供正宗的中华美食，采用代代相传的传统食谱。我们的厨师选用最优质的食材，在灵感源自古典中式园林的优雅环境中，为您打造难忘的用餐体验。",
      },
      menu: {
        title: "招牌菜",
        items: [
          {
            name: "北京烤鸭",
            description: "经典烤鸭配薄饼、葱丝和海鲜酱",
            price: "¥268",
          },
          {
            name: "宫保鸡丁",
            description: "花生、蔬菜和辣椒炒鸡丁",
            price: "¥168",
          },
          {
            name: "小笼包",
            description: "上海汤包配猪肉馅",
            price: "¥128",
          },
          {
            name: "麻婆豆腐",
            description: "四川辣味豆腐配猪肉末和辣椒酱",
            price: "¥158",
          },
        ],
      },
      reservation: {
        title: "预订餐桌",
        date: "日期",
        time: "时间",
        guests: "人数",
        name: "全名",
        contact: "电话/邮箱",
        submit: "立即预订",
        success: "预订成功！我们将尽快联系您确认详情。",
      },
      contact: {
        title: "光临本店",
        address: "唐人街繁荣大道123号",
        phone: "(212) 555-8888",
        email: "reservations@imperialgarden.com",
        hours: "每日营业：上午11:30 - 晚上10:30",
      },
      footer: {
        copyright: "© 2025 御花园。保留所有权利。",
      },
    },
  };

  const c = content[language];
  const times = [
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
  ];

  return (
    <div className="min-h-screen bg-[#f8f4e9] font-sans">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-[#1a0d05]/90 backdrop-blur-sm z-50 border-b border-[#d4af37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="bg-[#c32f27] p-2 rounded-full">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#d4af37] tracking-wider">
                {language === "en" ? "Imperial Garden" : "御花园"}
              </span>
            </motion.div>

            <div className="hidden md:flex space-x-10">
              {["about", "menu", "reservation", "contact"].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`text-lg font-medium transition-all duration-300 ${
                    currentSection === section
                      ? "text-[#d4af37] border-b-2 border-[#d4af37]"
                      : "text-[#f8f4e9] hover:text-[#d4af37]"
                  }`}
                >
                  {c.nav[section]}
                </a>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="bg-[#c32f27] hover:bg-[#a52822] text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-colors duration-300"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">
                {language === "en" ? "中文" : "EN"}
              </span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0d05] to-[#5d4037] opacity-80 z-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'50\' r=\'2\' fill=\'%23d4af37\'/></svg>')]"></div>
        <div className="max-w-4xl mx-auto text-center px-4 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            {c.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-[#f8f4e9] mb-10 max-w-2xl mx-auto"
          >
            {c.hero.subtitle}
          </motion.p>
          <motion.a
            href="#reservation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[#d4af37] hover:bg-[#c6a029] text-[#1a0d05] font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300"
          >
            {c.hero.cta}
          </motion.a>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="absolute bottom-10 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-[#fffdf8]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1a0d05] mb-4">
              {c.about.title}
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto"></div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#1a0d05] text-[#f8f4e9] rounded-2xl p-8 md:p-12 shadow-xl"
          >
            <p className="text-xl leading-relaxed max-w-3xl mx-auto">
              {c.about.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4 bg-[#1a0d05]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#d4af37] mb-4">
              {c.menu.title}
            </h2>
            <div className="w-24 h-1 bg-[#c32f27] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {c.menu.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#2a1a0f] rounded-xl p-6 border border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-[#d4af37]">
                    {item.name}
                  </h3>
                  <span className="text-xl font-bold text-[#c32f27]">
                    {item.price}
                  </span>
                </div>
                <p className="text-[#f8f4e9]/80">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="py-20 px-4 bg-[#f8f4e9]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#1a0d05] mb-4">
              {c.reservation.title}
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto"></div>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#d4af37] text-[#1a0d05] text-center p-6 rounded-xl shadow-lg mb-8"
            >
              {c.reservation.success}
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[#1a0d05] font-medium mb-2">
                    {c.reservation.date}
                  </label>
                  <input
                    type="date"
                    value={reservation.date}
                    onChange={(e) =>
                      setReservation({ ...reservation, date: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-[#d4af37] focus:ring-2 focus:ring-[#c32f27] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#1a0d05] font-medium mb-2">
                    {c.reservation.time}
                  </label>
                  <select
                    value={reservation.time}
                    onChange={(e) =>
                      setReservation({ ...reservation, time: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-[#d4af37] focus:ring-2 focus:ring-[#c32f27] focus:border-transparent appearance-none bg-white"
                    required
                  >
                    <option value="">
                      {language === "en" ? "Select time" : "选择时间"}
                    </option>
                    {times.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#1a0d05] font-medium mb-2">
                    {c.reservation.guests}
                  </label>
                  <select
                    value={reservation.guests}
                    onChange={(e) =>
                      setReservation({
                        ...reservation,
                        guests: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-[#d4af37] focus:ring-2 focus:ring-[#c32f27] focus:border-transparent"
                    required
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#1a0d05] font-medium mb-2">
                    {c.reservation.name}
                  </label>
                  <input
                    type="text"
                    value={reservation.name}
                    onChange={(e) =>
                      setReservation({ ...reservation, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-[#d4af37] focus:ring-2 focus:ring-[#c32f27] focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#1a0d05] font-medium mb-2">
                    {c.reservation.contact}
                  </label>
                  <input
                    type="text"
                    value={reservation.contact}
                    onChange={(e) =>
                      setReservation({
                        ...reservation,
                        contact: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-[#d4af37] focus:ring-2 focus:ring-[#c32f27] focus:border-transparent"
                    placeholder={
                      language === "en"
                        ? "Phone number or email address"
                        : "电话号码或电子邮箱"
                    }
                    required
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#c32f27] hover:bg-[#a52822] text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-md"
              >
                {c.reservation.submit}
              </motion.button>
            </motion.form>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-[#2a1a0f]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#d4af37] mb-4">
              {c.contact.title}
            </h2>
            <div className="w-24 h-1 bg-[#c32f27] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#1a0d05] p-8 rounded-2xl text-center"
            >
              <MapPin className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#d4af37] mb-2">
                {language === "en" ? "Location" : "位置"}
              </h3>
              <p className="text-[#f8f4e9]">{c.contact.address}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#1a0d05] p-8 rounded-2xl text-center"
            >
              <Phone className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#d4af37] mb-2">
                {language === "en" ? "Phone" : "电话"}
              </h3>
              <p className="text-[#f8f4e9]">{c.contact.phone}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#1a0d05] p-8 rounded-2xl text-center"
            >
              <Clock className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#d4af37] mb-2">
                {language === "en" ? "Hours" : "营业时间"}
              </h3>
              <p className="text-[#f8f4e9]">{c.contact.hours}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a0d05] py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-[#f8f4e9]/70">
          <p className="text-lg">{c.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
