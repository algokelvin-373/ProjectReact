import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Upload,
  FileText,
  Menu,
  X as XIcon,
  Loader,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock API Service - Simulates real API calls
const apiService = {
  // Simulate API delay
  delay: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  // Get all sentences (simulated API call)
  async getSentences() {
    await this.delay(500); // Simulate network delay
    return [
      {
        id: 1,
        hanzi: "你好吗？",
        pinyin: "Nǐ hǎo ma?",
        indonesian: "Apa kabar?",
      },
      {
        id: 2,
        hanzi: "我很好，谢谢。",
        pinyin: "Wǒ hěn hǎo, xièxie.",
        indonesian: "Saya baik, terima kasih.",
      },
      {
        id: 3,
        hanzi: "今天天气怎么样？",
        pinyin: "Jīntiān tiānqì zěnmeyàng?",
        indonesian: "Bagaimana cuaca hari ini?",
      },
      {
        id: 4,
        hanzi: "我想喝咖啡。",
        pinyin: "Wǒ xiǎng hē kāfēi.",
        indonesian: "Saya ingin minum kopi.",
      },
      {
        id: 5,
        hanzi: "请问，厕所在哪里？",
        pinyin: "Qǐngwèn, cèsuǒ zài nǎlǐ?",
        indonesian: "Permisi, di mana toilet?",
      },
      {
        id: 6,
        hanzi: "这个多少钱？",
        pinyin: "Zhège duōshǎo qián?",
        indonesian: "Berapa harganya?",
      },
      {
        id: 7,
        hanzi: "我喜欢学习中文。",
        pinyin: "Wǒ xǐhuān xuéxí Zhōngwén.",
        indonesian: "Saya suka belajar bahasa Mandarin.",
      },
      {
        id: 8,
        hanzi: "你叫什么名字？",
        pinyin: "Nǐ jiào shénme míngzi?",
        indonesian: "Siapa nama Anda?",
      },
      {
        id: 9,
        hanzi: "我明白了。",
        pinyin: "Wǒ míngbáile.",
        indonesian: "Saya mengerti.",
      },
      { id: 10, hanzi: "对不起。", pinyin: "Duìbùqǐ.", indonesian: "Maaf." },
      {
        id: 11,
        hanzi: "没关系。",
        pinyin: "Méi guānxi.",
        indonesian: "Tidak masalah.",
      },
      {
        id: 12,
        hanzi: "再见！",
        pinyin: "Zàijiàn!",
        indonesian: "Sampai jumpa!",
      },
      {
        id: 13,
        hanzi: "谢谢你！",
        pinyin: "Xièxie nǐ!",
        indonesian: "Terima kasih!",
      },
      {
        id: 14,
        hanzi: "不客气。",
        pinyin: "Bú kèqì.",
        indonesian: "Sama-sama.",
      },
      {
        id: 15,
        hanzi: "多少钱？",
        pinyin: "Duōshǎo qián?",
        indonesian: "Berapa harganya?",
      },
      {
        id: 16,
        hanzi: "太贵了！",
        pinyin: "Tài guìle!",
        indonesian: "Terlalu mahal!",
      },
      {
        id: 17,
        hanzi: "便宜点吧。",
        pinyin: "Piányi diǎn ba.",
        indonesian: "Turunkan harganya sedikit.",
      },
      { id: 18, hanzi: "好吃！", pinyin: "Hǎo chī!", indonesian: "Enak!" },
      {
        id: 19,
        hanzi: "难吃。",
        pinyin: "Nán chī.",
        indonesian: "Tidak enak.",
      },
      {
        id: 20,
        hanzi: "我饿了。",
        pinyin: "Wǒ èle.",
        indonesian: "Saya lapar.",
      },
      {
        id: 21,
        hanzi: "我渴了。",
        pinyin: "Wǒ kěle.",
        indonesian: "Saya haus.",
      },
    ];
  },

  // Add new sentence (simulated API call)
  async addSentence(sentence) {
    await this.delay(800); // Simulate longer delay for POST

    // Simulate server validation
    if (
      !sentence.hanzi.trim() ||
      !sentence.pinyin.trim() ||
      !sentence.indonesian.trim()
    ) {
      throw new Error("All fields are required");
    }

    // Simulate server-generated ID
    return {
      ...sentence,
      id: Date.now(),
    };
  },

  // Update existing sentence (simulated API call)
  async updateSentence(id, sentence) {
    await this.delay(600);

    if (
      !sentence.hanzi.trim() ||
      !sentence.pinyin.trim() ||
      !sentence.indonesian.trim()
    ) {
      throw new Error("All fields are required");
    }

    return {
      id,
      ...sentence,
    };
  },

  // Delete sentence (simulated API call)
  async deleteSentence(id) {
    await this.delay(400);

    // Simulate server error for specific IDs (for demo purposes)
    if (id === 1) {
      throw new Error("Cannot delete the first phrase - it is protected");
    }

    return { success: true };
  },

  // Import CSV data (simulated API call)
  async importCSV(data) {
    await this.delay(1200); // Simulate longer delay for bulk operations

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No valid data to import");
    }

    // Simulate server processing
    const importedWithIds = data.map((item, index) => ({
      ...item,
      id: Date.now() + index,
    }));

    return importedWithIds;
  },
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sentences, setSentences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    hanzi: "",
    pinyin: "",
    indonesian: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState(null);
  const [importLoading, setImportLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const fileInputRef = useRef(null);
  const itemsPerPage = 10;

  // Load initial data from mock API
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setApiError(null);
        const data = await apiService.getSentences();
        setSentences(data);
      } catch (error) {
        console.error("Failed to load sentences:", error);
        setApiError("Failed to load phrase data. Please try again later.");
        setToast({
          message: "Failed to load data",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(systemTheme);
    setMounted(true);

    loadInitialData();
  }, []);

  // Handle toast messages
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Reset copied state after delay
  useEffect(() => {
    if (copiedId) {
      const timer = setTimeout(() => setCopiedId(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedId]);

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

  // Handle adding new sentence with API simulation
  const handleAddSentence = useCallback(async () => {
    if (
      !formData.hanzi.trim() ||
      !formData.pinyin.trim() ||
      !formData.indonesian.trim()
    ) {
      setToast({
        message: "Please fill in all fields",
        type: "error",
      });
      return;
    }

    setFormLoading(true);
    setApiError(null);

    try {
      // Optimistic update - add to UI immediately
      const tempId = `temp_${Date.now()}`;
      const newSentence = {
        id: tempId,
        ...formData,
        optimistic: true,
      };

      setSentences((prev) => [...prev, newSentence]);
      setIsAdding(false);
      setFormData({ hanzi: "", pinyin: "", indonesian: "" });

      // Actual API call
      const savedSentence = await apiService.addSentence(formData);

      // Replace optimistic update with actual data
      setSentences((prev) =>
        prev.map((sentence) =>
          sentence.id === tempId ? savedSentence : sentence
        )
      );

      setToast({
        message: "Phrase added successfully!",
        type: "success",
      });

      // If adding to the last page that was full, go to new page
      if (currentPage === totalPages && sentences.length % itemsPerPage === 0) {
        setCurrentPage(totalPages + 1);
      }
    } catch (error) {
      console.error("Failed to add sentence:", error);

      // Revert optimistic update on error
      setSentences((prev) => prev.filter((sentence) => sentence.id !== tempId));

      setApiError(error.message || "Failed to add phrase");
      setToast({
        message: error.message || "Failed to add phrase",
        type: "error",
      });
    } finally {
      setFormLoading(false);
    }
  }, [formData, currentPage, totalPages, sentences.length]);

  // Handle editing sentence
  const handleEditSentence = (sentence) => {
    setFormData({
      hanzi: sentence.hanzi,
      pinyin: sentence.pinyin,
      indonesian: sentence.indonesian,
    });
    setEditingId(sentence.id);
  };

  // Handle saving edited sentence with API simulation
  const handleSaveEdit = useCallback(async () => {
    if (
      !formData.hanzi.trim() ||
      !formData.pinyin.trim() ||
      !formData.indonesian.trim()
    ) {
      setToast({
        message: "Please fill in all fields",
        type: "error",
      });
      return;
    }

    setFormLoading(true);
    setApiError(null);

    try {
      // Find the sentence being edited
      const sentenceToEdit = sentences.find((s) => s.id === editingId);
      if (!sentenceToEdit) throw new Error("Sentence not found");

      // Optimistic update
      const updatedSentence = {
        id: editingId,
        ...formData,
        optimistic: true,
      };

      setSentences((prev) =>
        prev.map((sentence) =>
          sentence.id === editingId ? updatedSentence : sentence
        )
      );

      // Actual API call
      const savedSentence = await apiService.updateSentence(
        editingId,
        formData
      );

      // Replace optimistic update with actual data
      setSentences((prev) =>
        prev.map((sentence) =>
          sentence.id === editingId ? savedSentence : sentence
        )
      );

      setEditingId(null);
      setFormData({ hanzi: "", pinyin: "", indonesian: "" });

      setToast({
        message: "Phrase updated successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to update sentence:", error);

      // Revert optimistic update on error
      setSentences((prev) =>
        prev.map((sentence) =>
          sentence.id === editingId ? sentenceToEdit : sentence
        )
      );

      setApiError(error.message || "Failed to update phrase");
      setToast({
        message: error.message || "Failed to update phrase",
        type: "error",
      });
    } finally {
      setFormLoading(false);
    }
  }, [formData, editingId, sentences]);

  // Handle deleting sentence with API simulation
  const handleDeleteSentence = async (id) => {
    setApiError(null);

    try {
      // Optimistic update - remove from UI immediately
      const sentenceToDelete = sentences.find((s) => s.id === id);
      setSentences((prev) => prev.filter((sentence) => sentence.id !== id));

      // Reset confirmation modal
      setShowDeleteConfirm(null);

      // Actual API call
      await apiService.deleteSentence(id);

      setToast({
        message: "Phrase deleted successfully!",
        type: "success",
      });

      // Adjust page if needed after deletion
      const newTotalPages = Math.ceil((sentences.length - 1) / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      } else if (newTotalPages === 0) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Failed to delete sentence:", error);

      // Revert optimistic update on error
      if (sentenceToDelete) {
        setSentences((prev) => [...prev, sentenceToDelete]);
      }

      setApiError(error.message || "Failed to delete phrase");
      setToast({
        message: error.message || "Failed to delete phrase",
        type: "error",
      });
    }
  };

  // Handle copying sentence to clipboard
  const handleCopySentence = async (sentence) => {
    try {
      // Format the text to copy
      const formattedText = `${sentence.hanzi}\n${sentence.pinyin}\n${sentence.indonesian}\n\nHanzi: ${sentence.hanzi}\nPinyin: ${sentence.pinyin}\nIndonesian: ${sentence.indonesian}`;

      await navigator.clipboard.writeText(formattedText);

      setCopiedId(sentence.id);
      setToast({
        message: "Copied to clipboard!",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to copy text:", error);
      setToast({
        message: "Failed to copy. Please try again.",
        type: "error",
      });
    }
  };

  // Handle CSV file import with API simulation
  const handleFileImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.name.split(".").pop().toLowerCase() !== "csv") {
      setToast({
        message: "Please upload a CSV file only",
        type: "error",
      });
      return;
    }

    setImportLoading(true);
    setApiError(null);

    try {
      const content = await readFileAsText(file);
      const importedData = parseCSV(content);

      if (importedData.length === 0) {
        throw new Error("No valid data found in CSV");
      }

      // Validate data structure
      const invalidRows = importedData.filter(
        (row) => !row.hanzi || !row.pinyin || !row.indonesian
      );

      if (invalidRows.length > 0) {
        throw new Error(
          `CSV contains ${invalidRows.length} invalid rows with missing data`
        );
      }

      // Optimistic update - show loading state
      setToast({
        message: `Importing ${importedData.length} phrases...`,
        type: "info",
      });

      // Actual API call
      const importedWithIds = await apiService.importCSV(importedData);

      // Update state
      setSentences((prev) => [...prev, ...importedWithIds]);

      // Reset to first page if new data spans multiple pages
      if (
        importedWithIds.length > 0 &&
        sentences.length + importedWithIds.length > itemsPerPage
      ) {
        setCurrentPage(1);
      }

      setToast({
        message: `Successfully imported ${importedWithIds.length} phrases!`,
        type: "success",
      });
    } catch (error) {
      console.error("Import failed:", error);
      setApiError(error.message || "Import failed");
      setToast({
        message: `Import failed: ${error.message || "Unknown error"}`,
        type: "error",
      });
    } finally {
      setImportLoading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Helper function to read file as text
  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  // Parse CSV content with semicolon delimiter
  const parseCSV = (content) => {
    const lines = content.split("\n").filter((line) => line.trim() !== "");
    if (lines.length < 2) {
      throw new Error("CSV must contain headers and at least one row of data");
    }

    // Parse headers using semicolon delimiter
    const headers = lines[0]
      .split(";")
      .map((header) => header.trim().toLowerCase());
    const requiredHeaders = ["hanzi", "pinyin", "indonesian"];

    // Validate headers
    const missingHeaders = requiredHeaders.filter(
      (header) => !headers.includes(header)
    );
    if (missingHeaders.length > 0) {
      throw new Error(`Missing required headers: ${missingHeaders.join(", ")}`);
    }

    // Get header indices
    const hanziIndex = headers.findIndex((h) => h === "hanzi");
    const pinyinIndex = headers.findIndex((h) => h === "pinyin");
    const indonesianIndex = headers.findIndex((h) => h === "indonesian");

    // Parse data rows using semicolon delimiter
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(";");
      if (row.length < 3) continue; // Skip invalid rows

      data.push({
        hanzi: row[hanziIndex]?.trim() || "",
        pinyin: row[pinyinIndex]?.trim() || "",
        indonesian: row[indonesianIndex]?.trim() || "",
      });
    }

    return data;
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
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

  const toastVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 150,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.2,
      },
    },
  };

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-indigo-900"
          : "bg-gradient-to-br from-indigo-50 to-purple-100"
      } py-4 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-7xl mx-auto">
        {/* API Error Banner */}
        <AnimatePresence>
          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-4 p-3 rounded-lg flex items-center ${
                darkMode
                  ? "bg-red-900/30 border border-red-800 text-red-200"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{apiError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header with theme toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
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
            <div className="flex-1">
              <h1
                className={`text-2xl md:text-3xl font-bold ${
                  darkMode
                    ? "text-white"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700"
                }`}
              >
                Chinese-Indonesian Phrasebook
              </h1>
              <p
                className={`mt-1 text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Master essential phrases with Hanzi, Pinyin & translations
              </p>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center w-full justify-end">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 rounded-full ${
                darkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="hidden sm:flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="flex space-x-3 w-full sm:w-auto">
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileImport}
                className="hidden"
              />
              <motion.button
                onClick={triggerFileInput}
                disabled={importLoading}
                className={`flex-1 sm:flex-initial flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-medium text-sm sm:text-base shadow-md transition-all duration-300 ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                } ${importLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {importLoading ? (
                  <div className="flex items-center">
                    <Loader className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-spin text-white" />
                    <span className="hidden xs:inline">Importing...</span>
                    <span className="xs:hidden">...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline">Import CSV</span>
                    <span className="xs:hidden">Import</span>
                  </>
                )}
              </motion.button>

              <motion.button
                onClick={() => setIsAdding(true)}
                className={`flex-1 sm:flex-initial flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-medium text-sm sm:text-base shadow-md transition-all duration-300 ${
                  darkMode
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Add Phrase</span>
                <span className="xs:hidden">Add</span>
              </motion.button>
            </div>

            <motion.button
              onClick={toggleTheme}
              variants={toggleVariants}
              initial="initial"
              animate={darkMode ? "animate" : "initial"}
              className={`p-2.5 sm:p-3 rounded-full shadow-md transition-all duration-300 ${
                darkMode
                  ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                  : "bg-gray-800 text-yellow-300 hover:bg-gray-700"
              }`}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu (Slide-in panel) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed inset-0 z-40 sm:hidden ${
                darkMode ? "bg-gray-900/95" : "bg-white/95"
              }`}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h2
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Menu
                </h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <input
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={handleFileImport}
                  className="hidden"
                />
                <motion.button
                  onClick={() => {
                    triggerFileInput();
                    setMobileMenuOpen(false);
                  }}
                  disabled={importLoading}
                  className={`w-full flex items-center justify-center px-4 py-3 rounded-xl font-medium shadow-md transition-all duration-300 ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  } ${importLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {importLoading ? (
                    <div className="flex items-center">
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      <span>Importing...</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Import CSV
                    </>
                  )}
                </motion.button>

                <motion.button
                  onClick={() => {
                    setIsAdding(true);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-center px-4 py-3 rounded-xl font-medium shadow-md transition-all duration-300 ${
                    darkMode
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Phrase
                </motion.button>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <motion.button
                    onClick={() => {
                      toggleTheme();
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-center px-4 py-3 rounded-xl font-medium shadow-md transition-all duration-300 ${
                      darkMode
                        ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                        : "bg-gray-800 text-yellow-300 hover:bg-gray-700"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {darkMode ? (
                      <>
                        <Sun className="w-4 h-4 mr-2" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 mr-2" />
                        Dark Mode
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CSV Format Guide - Mobile optimized */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-4 sm:mb-6 rounded-xl p-3 sm:p-4 text-xs sm:text-sm ${
                darkMode
                  ? "bg-blue-900/30 border border-blue-800"
                  : "bg-blue-50 border border-blue-200"
              }`}
            >
              <div className="flex items-start">
                <FileText
                  className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-2 flex-shrink-0 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <div>
                  <p
                    className={`font-medium ${
                      darkMode ? "text-blue-200" : "text-blue-800"
                    }`}
                  >
                    CSV Format Requirements:
                  </p>
                  <ul
                    className={`mt-1 list-disc pl-4 space-y-0.5 ${
                      darkMode ? "text-blue-100" : "text-blue-700"
                    }`}
                  >
                    <li>
                      Headers:{" "}
                      <span className="font-mono">hanzi;pinyin;indonesian</span>
                    </li>
                    <li>Delimiter: semicolon (;) between columns</li>
                    <li>
                      Example:{" "}
                      <span className="font-mono break-all">
                        你好;Nǐ hǎo;Halo
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add/Edit Form - Mobile optimized */}
        <AnimatePresence>
          {(isAdding || editingId !== null) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 sm:mb-8 rounded-2xl p-4 sm:p-6 shadow-lg ${
                darkMode
                  ? "bg-gray-800 border border-indigo-700"
                  : "bg-white border border-indigo-200"
              }`}
            >
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h2
                  className={`text-lg sm:text-xl font-bold ${
                    darkMode ? "text-white" : "text-indigo-700"
                  }`}
                >
                  {isAdding ? "Add New Phrase" : "Edit Phrase"}
                </h2>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({ hanzi: "", pinyin: "", indonesian: "" });
                  }}
                  className={`p-2 rounded-full ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                  aria-label="Close form"
                >
                  <X
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <label
                    className={`block text-xs sm:text-sm font-medium mb-1 ${
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
                    className={`w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg border text-sm ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-indigo-400"
                        : "bg-white border-gray-300 text-gray-900 focus:border-indigo-500"
                    } focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                    placeholder="你好吗？"
                    autoFocus
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs sm:text-sm font-medium mb-1 ${
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
                    className={`w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg border text-sm ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-indigo-400"
                        : "bg-white border-gray-300 text-gray-900 focus:border-indigo-500"
                    } focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                    placeholder="Nǐ hǎo ma?"
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs sm:text-sm font-medium mb-1 ${
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
                    className={`w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg border text-sm ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-indigo-400"
                        : "bg-white border-gray-300 text-gray-900 focus:border-indigo-500"
                    } focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                    placeholder="Apa kabar?"
                  />
                </div>
              </div>

              <div className="flex flex-col xs:flex-row xs:justify-end gap-2">
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({ hanzi: "", pinyin: "", indonesian: "" });
                  }}
                  className={`w-full xs:w-auto px-4 py-2 rounded-lg font-medium text-sm transition-all ${
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
                    formLoading ||
                    !formData.hanzi.trim() ||
                    !formData.pinyin.trim() ||
                    !formData.indonesian.trim()
                  }
                  className={`w-full xs:w-auto px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center transition-all ${
                    formLoading ||
                    !formData.hanzi.trim() ||
                    !formData.pinyin.trim() ||
                    !formData.indonesian.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : darkMode
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  {formLoading ? (
                    <Loader className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-spin" />
                  ) : (
                    <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  )}
                  {isAdding ? "Add Phrase" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading ? (
          <div
            className={`flex flex-col items-center justify-center py-16 rounded-2xl ${
              darkMode
                ? "bg-gray-800 border border-indigo-900"
                : "bg-white border border-indigo-100"
            }`}
          >
            <Loader
              className={`w-8 h-8 animate-spin ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            />
            <p
              className={`mt-4 text-lg font-medium ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Loading phrases...
            </p>
          </div>
        ) : (
          <>
            {/* Phrase table - Mobile responsive version */}
            <div
              className={`overflow-x-auto rounded-2xl sm:rounded-3xl shadow-lg ${
                darkMode
                  ? "bg-gray-800 border border-indigo-900"
                  : "bg-white border border-indigo-100"
              }`}
            >
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead
                  className={`${
                    darkMode ? "bg-indigo-900/70" : "bg-indigo-600"
                  }`}
                >
                  <tr>
                    <th className="px-3 py-3 xs:px-4 xs:py-4 text-left text-xs xs:text-sm font-medium text-white uppercase tracking-wider">
                      <span className="hidden sm:inline">Hanzi (汉字)</span>
                      <span className="sm:hidden">Hanzi</span>
                    </th>
                    <th className="px-3 py-3 xs:px-4 xs:py-4 text-left text-xs xs:text-sm font-medium text-white uppercase tracking-wider hidden xs:table-cell">
                      <span className="hidden sm:inline">Pinyin</span>
                      <span className="sm:hidden">Pinyin</span>
                    </th>
                    <th className="px-3 py-3 xs:px-4 xs:py-4 text-left text-xs xs:text-sm font-medium text-white uppercase tracking-wider hidden md:table-cell">
                      Indonesian
                    </th>
                    <th className="px-3 py-3 xs:px-4 xs:py-4 text-left text-xs xs:text-sm font-medium text-white uppercase tracking-wider text-center w-28 sm:w-32">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <AnimatePresence mode="popLayout">
                    {currentSentences.map((sentence) => (
                      <motion.tr
                        key={sentence.id}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, height: 0 }}
                        variants={itemVariants}
                        transition={{ duration: 0.3 }}
                        className={`${
                          sentence.id % 2 === 0
                            ? darkMode
                              ? "bg-gray-800"
                              : "bg-white"
                            : darkMode
                            ? "bg-gray-900/70"
                            : "bg-indigo-50"
                        } ${sentence.optimistic ? "opacity-70" : ""}`}
                      >
                        <td
                          className={`px-3 py-3 xs:px-4 xs:py-4 whitespace-nowrap font-serif text-base ${
                            darkMode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          <div className="font-medium">{sentence.hanzi}</div>
                          <div
                            className="mt-1 flex xs:hidden text-xs ${
                            darkMode ? 'text-indigo-300' : 'text-indigo-600'
                          }"
                          >
                            {sentence.pinyin}
                          </div>
                          <div
                            className="mt-1 flex xs:hidden text-xs ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }"
                          >
                            {sentence.indonesian}
                          </div>
                        </td>
                        <td
                          className={`px-3 py-3 xs:px-4 xs:py-4 whitespace-nowrap hidden xs:table-cell ${
                            darkMode ? "text-indigo-200" : "text-indigo-700"
                          }`}
                        >
                          {sentence.pinyin}
                        </td>
                        <td
                          className={`px-3 py-3 xs:px-4 xs:py-4 whitespace-nowrap hidden md:table-cell ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {sentence.indonesian}
                        </td>
                        <td className="px-3 py-3 xs:px-4 xs:py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center space-x-1 sm:space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleCopySentence(sentence)}
                              className={`p-1.5 rounded-lg transition-all ${
                                copiedId === sentence.id
                                  ? darkMode
                                    ? "bg-green-900/50 text-green-300"
                                    : "bg-green-50 text-green-600"
                                  : darkMode
                                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              }`}
                              aria-label="Copy sentence"
                            >
                              {copiedId === sentence.id ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEditSentence(sentence)}
                              className={`p-1.5 rounded-lg transition-all ${
                                darkMode
                                  ? "bg-blue-900/50 hover:bg-blue-800 text-blue-300"
                                  : "bg-blue-50 hover:bg-blue-100 text-blue-600"
                              }`}
                              aria-label="Edit sentence"
                            >
                              <Edit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setShowDeleteConfirm(sentence.id)}
                              className={`p-1.5 rounded-lg transition-all ${
                                darkMode
                                  ? "bg-red-900/50 hover:bg-red-800 text-red-300"
                                  : "bg-red-50 hover:bg-red-100 text-red-600"
                              }`}
                              aria-label="Delete sentence"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              {currentSentences.length === 0 && (
                <div
                  className={`py-12 sm:py-16 text-center ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <p className="text-base sm:text-lg font-medium">
                    No phrases available on this page
                  </p>
                  <p className="mt-1 text-xs sm:text-sm">
                    Try adding new phrases or checking other pages
                  </p>
                </div>
              )}
            </div>

            {/* Mobile Stats */}
            <div
              className={`mt-3 sm:mt-6 text-center text-xs sm:text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <p>
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, sentences.length)} of{" "}
                {sentences.length} phrases
              </p>
            </div>

            {/* Pagination Controls - Mobile optimized */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 sm:mt-8 flex flex-wrap justify-center items-center gap-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg flex items-center justify-center text-xs sm:text-sm transition-all ${
                    currentPage === 1
                      ? darkMode
                        ? "text-gray-600 cursor-not-allowed"
                        : "text-gray-400 cursor-not-allowed"
                      : darkMode
                      ? "text-indigo-300 hover:bg-indigo-900/50"
                      : "text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden xs:inline">Prev</span>
                </button>

                <div className="flex flex-wrap justify-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNumber) => (
                      <motion.button
                        key={pageNumber}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={paginationItemVariants}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-medium text-xs sm:text-sm transition-all ${
                          currentPage === pageNumber
                            ? darkMode
                              ? "bg-indigo-600 text-white shadow-md"
                              : "bg-indigo-600 text-white shadow-md"
                            : darkMode
                            ? "hover:bg-gray-700"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        {pageNumber}
                      </motion.button>
                    )
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg flex items-center justify-center text-xs sm:text-sm transition-all ${
                    currentPage === totalPages
                      ? darkMode
                        ? "text-gray-600 cursor-not-allowed"
                        : "text-gray-400 cursor-not-allowed"
                      : darkMode
                      ? "text-indigo-300 hover:bg-indigo-900/50"
                      : "text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  <span className="hidden xs:inline">Next</span>
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </button>
              </motion.div>
            )}
          </>
        )}

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
                className={`max-w-md w-full rounded-2xl p-4 sm:p-6 ${
                  darkMode
                    ? "bg-gray-800 border border-red-800"
                    : "bg-white border border-red-200"
                } shadow-2xl`}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div
                    className={`p-2.5 sm:p-4 rounded-full ${
                      darkMode ? "bg-red-900/50" : "bg-red-50"
                    }`}
                  >
                    <Trash2
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        darkMode ? "text-red-400" : "text-red-600"
                      }`}
                    />
                  </div>
                  <h3
                    className={`ml-3 text-lg sm:text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Delete Phrase
                  </h3>
                </div>
                <p
                  className={`mb-4 text-sm sm:text-base ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Are you sure you want to delete this phrase? This action
                  cannot be undone.
                </p>
                <div className="flex flex-col xs:flex-row xs:justify-end gap-2">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className={`w-full xs:w-auto px-4 py-2 rounded-lg font-medium text-sm ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteSentence(showDeleteConfirm)}
                    className={`w-full xs:w-auto px-4 py-2 rounded-lg font-medium text-sm ${
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

        {/* Toast Notification - Mobile optimized */}
        <AnimatePresence>
          {toast && (
            <motion.div
              variants={toastVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-lg z-40 text-sm ${
                toast.type === "success"
                  ? darkMode
                    ? "bg-green-900/70 border border-green-700"
                    : "bg-green-500 text-white"
                  : toast.type === "error"
                  ? darkMode
                    ? "bg-red-900/70 border border-red-700"
                    : "bg-red-500 text-white"
                  : darkMode
                  ? "bg-blue-900/70 border border-blue-700"
                  : "bg-blue-500 text-white"
              }`}
            >
              <div className="flex items-center justify-center">
                {toast.type === "success" ? (
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mr-2"></div>
                ) : toast.type === "error" ? (
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                ) : (
                  <Loader className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                )}
                <span className="font-medium text-center">{toast.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to action - Mobile optimized */}
        <div className="mt-6 sm:mt-10 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-block px-4 py-2.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-md ${
              darkMode
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400"
            }`}
          >
            Practice Daily for Fluency!
          </motion.div>
        </div>

        {/* Footer - Mobile optimized */}
        <footer
          className={`mt-8 sm:mt-12 text-center py-4 text-xs sm:text-sm ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <p>
            Chinese Language Learning Resource • Designed with ❤️ for Language
            Learners
          </p>
          <p className="mt-1">
            Toggle theme for optimal reading comfort • {totalPages} pages of
            phrases
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
