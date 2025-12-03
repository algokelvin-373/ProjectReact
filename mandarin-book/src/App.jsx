import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Languages,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sentences, setSentences] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    hanzi: "",
    pinyin: "",
    indonesian: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Initialize theme based on system preference
  useEffect(() => {
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(systemTheme);
    setMounted(true);

    // Initialize with default sentences
    const initialSentences = [
      { hanzi: "你好吗？", pinyin: "Nǐ hǎo ma?", indonesian: "Apa kabar?" },
      {
        hanzi: "我很好，谢谢。",
        pinyin: "Wǒ hěn hǎo, xièxie.",
        indonesian: "Saya baik, terima kasih.",
      },
      {
        hanzi: "今天天气怎么样？",
        pinyin: "Jīntiān tiānqì zěnmeyàng?",
        indonesian: "Bagaimana cuaca hari ini?",
      },
      {
        hanzi: "我想喝咖啡。",
        pinyin: "Wǒ xiǎng hē kāfēi.",
        indonesian: "Saya ingin minum kopi.",
      },
      {
        hanzi: "请问，厕所在哪里？",
        pinyin: "Qǐngwèn, cèsuǒ zài nǎlǐ?",
        indonesian: "Permisi, di mana toilet?",
      },
      {
        hanzi: "这个多少钱？",
        pinyin: "Zhège duōshǎo qián?",
        indonesian: "Berapa harganya?",
      },
      {
        hanzi: "我喜欢学习中文。",
        pinyin: "Wǒ xǐhuān xuéxí Zhōngwén.",
        indonesian: "Saya suka belajar bahasa Mandarin.",
      },
      {
        hanzi: "你叫什么名字？",
        pinyin: "Nǐ jiào shénme míngzi?",
        indonesian: "Siapa nama Anda?",
      },
      {
        hanzi: "我明白了。",
        pinyin: "Wǒ míngbáile.",
        indonesian: "Saya mengerti.",
      },
      { hanzi: "对不起。", pinyin: "Duìbùqǐ.", indonesian: "Maaf." },
      {
        hanzi: "没关系。",
        pinyin: "Méi guānxi.",
        indonesian: "Tidak masalah.",
      },
      { hanzi: "再见！", pinyin: "Zàijiàn!", indonesian: "Sampai jumpa!" },
      { hanzi: "谢谢你！", pinyin: "Xièxie nǐ!", indonesian: "Terima kasih!" },
      { hanzi: "不客气。", pinyin: "Bú kèqì.", indonesian: "Sama-sama." },
      {
        hanzi: "多少钱？",
        pinyin: "Duōshǎo qián?",
        indonesian: "Berapa harganya?",
      },
      { hanzi: "太贵了！", pinyin: "Tài guìle!", indonesian: "Terlalu mahal!" },
      {
        hanzi: "便宜点吧。",
        pinyin: "Piányi diǎn ba.",
        indonesian: "Turunkan harganya sedikit.",
      },
      { hanzi: "好吃！", pinyin: "Hǎo chī!", indonesian: "Enak!" },
      { hanzi: "难吃。", pinyin: "Nán chī.", indonesian: "Tidak enak." },
      { hanzi: "我饿了。", pinyin: "Wǒ èle.", indonesian: "Saya lapar." },
      { hanzi: "我渴了。", pinyin: "Wǒ kěle.", indonesian: "Saya haus." },
    ];

    setSentences(initialSentences);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Calculate pagination data
  const totalPages = Math.ceil(sentences.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSentences = sentences.slice(indexOfFirstItem, indexOfLastItem);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle adding new sentence
  const handleAddSentence = () => {
    if (
      formData.hanzi.trim() &&
      formData.pinyin.trim() &&
      formData.indonesian.trim()
    ) {
      const newSentences = [...sentences, formData];
      setSentences(newSentences);

      // If adding to the last page that was full, go to new page
      if (currentPage === totalPages && sentences.length % itemsPerPage === 0) {
        setCurrentPage(totalPages + 1);
      }

      setFormData({ hanzi: "", pinyin: "", indonesian: "" });
      setIsAdding(false);
    }
  };

  // Handle editing sentence
  const handleEditSentence = (globalIndex) => {
    setFormData(sentences[globalIndex]);
    setEditingIndex(globalIndex);
  };

  // Handle saving edited sentence
  const handleSaveEdit = () => {
    if (
      formData.hanzi.trim() &&
      formData.pinyin.trim() &&
      formData.indonesian.trim()
    ) {
      const updatedSentences = [...sentences];
      updatedSentences[editingIndex] = formData;
      setSentences(updatedSentences);
      setEditingIndex(null);
      setFormData({ hanzi: "", pinyin: "", indonesian: "" });
    }
  };

  // Handle deleting sentence
  const handleDeleteSentence = (globalIndex) => {
    const updatedSentences = sentences.filter((_, i) => i !== globalIndex);
    setSentences(updatedSentences);

    // Adjust page if needed after deletion
    const newTotalPages = Math.ceil(updatedSentences.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    } else if (newTotalPages === 0) {
      setCurrentPage(1);
    }

    setShowDeleteConfirm(null);
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  // Animation variants
  const toggleVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 360, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const paginationItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-indigo-900"
          : "bg-gradient-to-br from-indigo-50 to-purple-100"
      } py-6 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header with theme toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
          <div className="flex items-center space-x-4">
            <div
              className={`p-3 rounded-2xl ${
                darkMode
                  ? "bg-indigo-900/50 border border-indigo-700"
                  : "bg-indigo-50"
              }`}
            >
              <Languages
                className={`w-8 h-8 ${
                  darkMode ? "text-indigo-300" : "text-indigo-600"
                }`}
              />
            </div>
            <div>
              <h1
                className={`text-3xl md:text-4xl font-bold ${
                  darkMode
                    ? "text-white"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700"
                }`}
              >
                Chinese-Indonesian Phrasebook
              </h1>
              <p
                className={`mt-2 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Master essential phrases with Hanzi, Pinyin & translations
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setIsAdding(true)}
              className={`flex items-center px-4 py-2 rounded-xl font-medium shadow-md transition-all duration-300 ${
                darkMode
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Phrase
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              variants={toggleVariants}
              initial="initial"
              animate={darkMode ? "animate" : "initial"}
              className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
                darkMode
                  ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                  : "bg-gray-800 text-yellow-300 hover:bg-gray-700"
              }`}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {(isAdding || editingIndex !== null) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-8 rounded-2xl p-6 shadow-lg ${
                darkMode
                  ? "bg-gray-800 border border-indigo-700"
                  : "bg-white border border-indigo-200"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-indigo-700"
                  }`}
                >
                  {isAdding ? "Add New Phrase" : "Edit Phrase"}
                </h2>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setEditingIndex(null);
                    setFormData({ hanzi: "", pinyin: "", indonesian: "" });
                  }}
                  className={`p-2 rounded-full ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <X
                    className={`w-5 h-5 ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Hanzi (汉字)
                  </label>
                  <input
                    type="text"
                    name="hanzi"
                    value={formData.hanzi}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-indigo-400"
                        : "bg-white border-gray-300 text-gray-900 focus:border-indigo-500"
                    } focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                    placeholder="你好吗？"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Pinyin
                  </label>
                  <input
                    type="text"
                    name="pinyin"
                    value={formData.pinyin}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-indigo-400"
                        : "bg-white border-gray-300 text-gray-900 focus:border-indigo-500"
                    } focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                    placeholder="Nǐ hǎo ma?"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Indonesian
                  </label>
                  <input
                    type="text"
                    name="indonesian"
                    value={formData.indonesian}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-indigo-400"
                        : "bg-white border-gray-300 text-gray-900 focus:border-indigo-500"
                    } focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                    placeholder="Apa kabar?"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setEditingIndex(null);
                    setFormData({ hanzi: "", pinyin: "", indonesian: "" });
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={isAdding ? handleAddSentence : handleSaveEdit}
                  disabled={
                    !formData.hanzi.trim() ||
                    !formData.pinyin.trim() ||
                    !formData.indonesian.trim()
                  }
                  className={`px-4 py-2 rounded-lg font-medium flex items-center transition-all ${
                    !formData.hanzi.trim() ||
                    !formData.pinyin.trim() ||
                    !formData.indonesian.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : darkMode
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isAdding ? "Add Phrase" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phrase table */}
        <div
          className={`rounded-3xl shadow-2xl overflow-hidden ${
            darkMode
              ? "bg-gray-800 border border-indigo-900"
              : "bg-white border border-indigo-100"
          }`}
        >
          <div
            className={`grid grid-cols-4 ${
              darkMode ? "bg-indigo-900/70" : "bg-indigo-600"
            } text-white font-bold`}
          >
            <div className="p-4 border-r border-indigo-400/50 flex items-center justify-center">
              <span className="hidden sm:inline">Hanzi (汉字)</span>
              <span className="sm:hidden">Hanzi</span>
            </div>
            <div className="p-4 border-r border-indigo-400/50 flex items-center justify-center">
              <span className="hidden sm:inline">Pinyin</span>
              <span className="sm:hidden">Pinyin</span>
            </div>
            <div className="p-4 border-r border-indigo-400/50 flex items-center justify-center">
              <span className="hidden sm:inline">Indonesian</span>
              <span className="sm:hidden">Indonesian</span>
            </div>
            <div className="p-4 flex items-center justify-center">Actions</div>
          </div>

          <AnimatePresence mode="popLayout">
            {currentSentences.map((sentence, localIndex) => {
              const globalIndex = indexOfFirstItem + localIndex;
              return (
                <motion.div
                  key={globalIndex}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, height: 0 }}
                  variants={itemVariants}
                  transition={{ duration: 0.3 }}
                  className={`grid grid-cols-4 ${
                    localIndex % 2 === 0
                      ? darkMode
                        ? "bg-gray-800"
                        : "bg-white"
                      : darkMode
                      ? "bg-gray-900/70"
                      : "bg-indigo-50"
                  } border-b border-gray-200 dark:border-gray-700`}
                >
                  <div
                    className={`p-4 font-serif text-lg ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    } flex items-center justify-center sm:justify-start`}
                  >
                    {sentence.hanzi}
                  </div>
                  <div
                    className={`p-4 font-medium ${
                      darkMode ? "text-indigo-200" : "text-indigo-700"
                    } flex items-center justify-center sm:justify-start`}
                  >
                    {sentence.pinyin}
                  </div>
                  <div
                    className={`p-4 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } flex items-center justify-center sm:justify-start`}
                  >
                    {sentence.indonesian}
                  </div>
                  <div className="p-4 flex items-center justify-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditSentence(globalIndex)}
                      className={`p-2 rounded-lg transition-all ${
                        darkMode
                          ? "bg-blue-900/50 hover:bg-blue-800 text-blue-300"
                          : "bg-blue-50 hover:bg-blue-100 text-blue-600"
                      }`}
                      aria-label="Edit sentence"
                    >
                      <Edit className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowDeleteConfirm(globalIndex)}
                      className={`p-2 rounded-lg transition-all ${
                        darkMode
                          ? "bg-red-900/50 hover:bg-red-800 text-red-300"
                          : "bg-red-50 hover:bg-red-100 text-red-600"
                      }`}
                      aria-label="Delete sentence"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {currentSentences.length === 0 && (
            <div
              className={`py-16 text-center ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <p className="text-xl font-medium">
                No phrases available on this page
              </p>
              <p className="mt-2">
                Try adding new phrases or checking other pages
              </p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 flex justify-center items-center space-x-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-3 rounded-lg flex items-center justify-center transition-all ${
                currentPage === 1
                  ? darkMode
                    ? "text-gray-600 cursor-not-allowed"
                    : "text-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "text-indigo-300 hover:bg-indigo-900/50"
                  : "text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <AnimatePresence mode="wait">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <motion.button
                    key={pageNumber}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={paginationItemVariants}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                      currentPage === pageNumber
                        ? darkMode
                          ? "bg-indigo-600 text-white shadow-lg"
                          : "bg-indigo-600 text-white shadow-lg"
                        : darkMode
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {pageNumber}
                  </motion.button>
                )
              )}
            </AnimatePresence>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`p-3 rounded-lg flex items-center justify-center transition-all ${
                currentPage === totalPages
                  ? darkMode
                    ? "text-gray-600 cursor-not-allowed"
                    : "text-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "text-indigo-300 hover:bg-indigo-900/50"
                  : "text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </motion.div>
        )}

        {/* Stats */}
        <div
          className={`mt-6 text-center text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, sentences.length)} of {sentences.length}{" "}
          phrases
        </div>

        {/* Delete confirmation modal */}
        <AnimatePresence>
          {showDeleteConfirm !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowDeleteConfirm(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`max-w-md w-full rounded-2xl p-6 ${
                  darkMode
                    ? "bg-gray-800 border border-red-800"
                    : "bg-white border border-red-200"
                } shadow-2xl`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      darkMode ? "bg-red-900/50" : "bg-red-50"
                    }`}
                  >
                    <Trash2
                      className={`w-6 h-6 ${
                        darkMode ? "text-red-400" : "text-red-600"
                      }`}
                    />
                  </div>
                  <h3
                    className={`ml-4 text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Delete Phrase
                  </h3>
                </div>
                <p
                  className={`mb-6 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Are you sure you want to delete this phrase? This action
                  cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteSentence(showDeleteConfirm)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      darkMode
                        ? "bg-red-700 hover:bg-red-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to action */}
        <div className="mt-10 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-block px-8 py-4 rounded-2xl font-bold text-lg shadow-lg ${
              darkMode
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400"
            }`}
          >
            Practice Daily for Fluency!
          </motion.div>
        </div>

        {/* Footer */}
        <footer
          className={`mt-12 text-center py-6 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <p>
            Chinese Language Learning Resource • Designed with ❤️ for Language
            Learners
          </p>
          <p className="mt-1 text-sm">
            Toggle theme for optimal reading comfort • {totalPages} pages of
            phrases
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
