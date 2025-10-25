import {
  Send,
  FileText,
  SpellCheck,
  RotateCcw,
  Copy,
  User,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { icLogo } from "../../assets";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("main");
  const [activeService, setActiveService] = useState("summarize");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // History state
  const [history, setHistory] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("aiChatHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("aiChatHistory", JSON.stringify(history));
  }, [history]);

  // Splash screen effect
  useEffect(() => {
    if (currentView === "splash") {
      const timer = setTimeout(() => {
        setCurrentView("login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  // Mock AI processing functions
  const summarizeText = (text) => {
    const sentences = text.split(". ").filter((s) => s.length > 0);
    if (sentences.length <= 3) return text;
    const summary =
      sentences.slice(0, Math.ceil(sentences.length / 3)).join(". ") + ".";
    return summary;
  };

  const checkGrammar = (text) => {
    const commonErrors = {
      teh: "the",
      adn: "and",
      recieve: "receive",
      seperate: "separate",
      occured: "occurred",
      definately: "definitely",
      goverment: "government",
      tommorow: "tomorrow",
      wich: "which",
      thier: "their",
    };

    let correctedText = text;
    Object.entries(commonErrors).forEach(([error, correction]) => {
      const regex = new RegExp(`\\b${error}\\b`, "gi");
      correctedText = correctedText.replace(regex, correction);
    });

    correctedText = correctedText.replace(
      /(^|[.!?]\s+)([a-z])/g,
      (match, p1, p2) => p1 + p2.toUpperCase()
    );
    return correctedText;
  };

  const addToHistory = (input, output, serviceType) => {
    const newEntry = {
      id: Date.now().toString(),
      input,
      output,
      serviceType,
      timestamp: new Date().toISOString(),
      userEmail: currentUser?.email || "guest@example.com",
    };
    setHistory((prev) => [newEntry, ...prev]);
  };

  const handleProcess = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setOutputText("");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    let result;
    if (activeService === "summarize") {
      result = summarizeText(inputText);
    } else {
      result = checkGrammar(inputText);
    }

    setOutputText(result);
    addToHistory(inputText, result, activeService);
    setIsLoading(false);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    setCurrentView("login");
    setInputText("");
    setOutputText("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setCurrentUser(null);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const deleteHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get service icon
  const getServiceIcon = (serviceType) => {
    if (serviceType === "summarize") {
      return <FileText className="w-4 h-4 text-blue-600" />;
    }
    return <SpellCheck className="w-4 h-4 text-purple-600" />;
  };

  // Get service name
  const getServiceName = (serviceType) => {
    return serviceType === "summarize"
      ? "Text Summarize"
      : "Grammar & Spelling";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src={icLogo} className="rounded-lg" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  AI Services
                </h1>
                <p className="text-sm text-gray-600">AI powered for services</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/history")}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  History
                </span>
              </button>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Service Selection */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveService("summarize")}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                  activeService === "summarize"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="font-medium">Text Summarize</span>
              </button>
              <button
                onClick={() => setActiveService("grammar")}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                  activeService === "grammar"
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <SpellCheck className="w-4 h-4" />
                <span className="font-medium">Grammar & Spelling</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Input Text
              </h2>
              <button
                onClick={handleClear}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>
            <div className="space-y-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  activeService === "summarize"
                    ? "Enter the text you want to summarize..."
                    : "Enter the text you want to check for grammar and spelling errors..."
                }
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleProcess}
                disabled={!inputText.trim() || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Process Text</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {activeService === "summarize" ? "Summary" : "Corrected Text"}
              </h2>
              {outputText && (
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              )}
            </div>
            <div className="space-y-4">
              {outputText ? (
                <div className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-lg overflow-y-auto">
                  <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                    {outputText}
                  </p>
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      {activeService === "summarize" ? (
                        <FileText className="w-6 h-6 text-gray-400" />
                      ) : (
                        <SpellCheck className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm">
                      {isLoading
                        ? "Processing your text..."
                        : "Your processed text will appear here"}
                    </p>
                  </div>
                </div>
              )}

              {outputText && (
                <div className="text-sm text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p>
                    {activeService === "summarize"
                      ? "AI has summarized your text while preserving the key points."
                      : "AI has corrected grammar and spelling errors in your text."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            AI Powered for Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Text Summarization
              </h3>
              <p className="text-gray-600">
                Automatically condense long articles, documents, or paragraphs
                into concise summaries while preserving the essential
                information and key points.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <SpellCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Grammar & Spelling
              </h3>
              <p className="text-gray-600">
                Detect and correct grammar mistakes, spelling errors,
                punctuation issues, and improve overall writing quality with
                advanced AI algorithms.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>AI Services</p>
            <p className="mt-1">
              Copyright by @AlgoKelvinTech <br></br>Version 1.0.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
