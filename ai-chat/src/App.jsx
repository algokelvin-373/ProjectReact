import React, { useState } from "react";
import { Send, FileText, SpellCheck, RotateCcw, Copy } from "lucide-react";

const App = () => {
  const [activeService, setActiveService] = useState("summarize");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock AI processing functions
  const summarizeText = (text) => {
    // Simple mock summarization - in real app, this would call an AI API
    const sentences = text.split(". ").filter((s) => s.length > 0);
    if (sentences.length <= 3) return text;

    const summary =
      sentences.slice(0, Math.ceil(sentences.length / 3)).join(". ") + ".";
    return summary;
  };

  const checkGrammar = (text) => {
    // Simple mock grammar/spelling correction
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

    // Add some basic capitalization
    correctedText = correctedText.replace(
      /(^|[.!?]\s+)([a-z])/g,
      (match, p1, p2) => p1 + p2.toUpperCase()
    );

    return correctedText;
  };

  const handleProcess = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setOutputText("");

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let result;
    if (activeService === "summarize") {
      result = summarizeText(inputText);
    } else {
      result = checkGrammar(inputText);
    }

    setOutputText(result);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Web AI Chat
                </h1>
                <p className="text-sm text-gray-600">
                  AI-powered text processing
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online</span>
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
            AI-Powered Features
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
            <p>Web AI Chat - Powered by React, Tailwind CSS, and Vite</p>
            <p className="mt-1">
              Note: This is a demo application with mock AI processing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
