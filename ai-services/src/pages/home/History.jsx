import { useEffect, useState } from "react";
import { FileText, SpellCheck, Clock, Trash2, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const userHistory = history.filter((item) =>
    currentUser ? item.userEmail === currentUser.email : true
  );

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

  const clearHistory = () => {
    setHistory([]);
  };

  const deleteHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("aiChatHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">Back to Main</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Processing History
          </h1>
          {userHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {userHistory.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No History Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Process some text to see your history here
            </p>
            <button
              onClick={() => navigate(-1)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Go to Main
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {userHistory.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getServiceIcon(item.serviceType)}
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {getServiceName(item.serviceType)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatTimestamp(item.timestamp)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteHistoryItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Original Text
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-32 overflow-y-auto">
                      <p className="text-gray-900 text-sm whitespace-pre-wrap">
                        {item.input}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Processed Result
                    </h4>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 max-h-32 overflow-y-auto">
                      <p className="text-gray-900 text-sm whitespace-pre-wrap">
                        {item.output}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>Web AI Chat - Your AI processing history</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
