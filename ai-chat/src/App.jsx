import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Menu, X, Plus, Clock, Save } from "lucide-react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [savedChats, setSavedChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState("chat-1");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");

    // Update current chat in saved chats
    updateCurrentChat(newMessages);

    // Simulate AI response with typing delay
    setTimeout(() => {
      const aiResponses = [
        "That's an interesting question! Let me think about that...",
        "I understand what you're asking. Here's my perspective on this topic.",
        "Great question! Based on my knowledge, I can provide you with some insights.",
        "I'm here to help! Let me give you a comprehensive answer to your query.",
        "That's a thoughtful inquiry. I'll do my best to provide you with accurate information.",
        "I appreciate your question! Here's what I know about this subject.",
        "Excellent point! Let me elaborate on that for you.",
        "I'm glad you asked! This is actually a fascinating topic to explore.",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);
      updateCurrentChat(finalMessages);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const getCurrentChatTitle = () => {
    const currentChat = savedChats.find((chat) => chat.id === currentChatId);
    return currentChat ? currentChat.title : "Current Chat";
  };

  const updateCurrentChat = (newMessages) => {
    setSavedChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: newMessages,
              lastUpdated: new Date().toISOString(),
            }
          : chat
      )
    );
  };

  const createNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat = {
      id: newChatId,
      title: `New Chat ${savedChats.length + 1}`,
      messages: [
        {
          id: 1,
          text: "Hello! I'm your AI assistant. How can I help you today?",
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
      lastUpdated: new Date().toISOString(),
    };

    setSavedChats((prev) => [...prev, newChat]);
    setCurrentChatId(newChatId);
    setMessages(newChat.messages);
    setIsSidebarOpen(false);
  };

  const loadChat = (chatId) => {
    const chat = savedChats.find((c) => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
      setIsSidebarOpen(false);
    }
  };

  const saveCurrentChat = () => {
    // Chat is automatically saved on every message, but this function can be used for manual save
    const chatIndex = savedChats.findIndex((chat) => chat.id === currentChatId);
    if (chatIndex !== -1) {
      const updatedChats = [...savedChats];
      updatedChats[chatIndex] = {
        ...updatedChats[chatIndex],
        lastUpdated: new Date().toISOString(),
      };
      setSavedChats(updatedChats);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI assistant. How can I help you today?",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load saved chats from mock storage on component mount
  useEffect(() => {
    const mockSavedChats = [
      {
        id: "chat-1",
        title: "Getting Started",
        messages: [
          {
            id: 1,
            text: "Hello! I'm your AI assistant. How can I help you today?",
            sender: "ai",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
        lastUpdated: new Date().toISOString(),
      },
    ];
    setSavedChats(mockSavedChats);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">AI Assistant</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <button
            onClick={createNewChat}
            className="w-full mb-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Saved Chats</span>
            </h3>
            {savedChats.length === 0 ? (
              <div className="text-sm text-gray-500">No saved chats</div>
            ) : (
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {savedChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => loadChat(chat.id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      currentChatId === chat.id
                        ? "bg-blue-100 text-blue-800 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="truncate">{chat.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(chat.lastUpdated).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-blue-600" />
            <h1 className="text-lg font-semibold text-gray-800 truncate max-w-xs">
              {getCurrentChatTitle()}
            </h1>
          </div>
          <button
            onClick={saveCurrentChat}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            title="Save Chat"
          >
            <Save className="w-5 h-5" />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-3xl ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                } items-end space-x-2`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user" ? "bg-blue-600" : "bg-green-600"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t bg-white p-4">
          <form onSubmit={handleSendMessage} className="relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message AI Assistant..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
              rows="1"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-3 bottom-3 p-1.5 text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            AI Assistant can make mistakes. Consider checking important
            information.
          </p>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
