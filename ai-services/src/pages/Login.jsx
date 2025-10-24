import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { icLogo } from "../assets";
import { useNavigate } from "react-router-dom";

const USERS_KEY = "web_ai_chat_users";

export default function Login() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  // ✅ State untuk dialog status
  const [dialog, setDialog] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem(USERS_KEY);
    if (saved) return JSON.parse(saved);
    return [
      { email: "user@example.com", password: "password123", id: "user1" },
    ];
  });

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  // ✅ Auto-hide dialog setelah 1500ms
  useEffect(() => {
    if (dialog.show) {
      const timer = setTimeout(() => {
        setDialog({ show: false, type: "success", message: "" });
        // Jika dari register sukses, pindah ke login & reset form
        if (dialog.type === "success" && currentView === "register") {
          setCurrentView("login");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [dialog, currentView]);

  // Reset error/success saat ganti view
  useEffect(() => {
    setLoginError("");
    setRegisterError("");
    setLoginSuccess("");
  }, [currentView]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");

    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem("web_ai_chat_current_user", JSON.stringify(user));
      const timer = setTimeout(() => {
        setDialog({
          show: true,
          type: "success",
          message: "Login successful!",
        });
        if (dialog.type === "success") {
          navigate("/home", { replace: true });
        }
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setDialog({
        show: true,
        type: "error",
        message: "Invalid email or password",
      });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError("");

    if (password !== confirmPassword) {
      setDialog({
        show: true,
        type: "error",
        message: "Passwords do not match",
      });
      return;
    }

    if (password.length < 6) {
      setDialog({
        show: true,
        type: "error",
        message: "Password must be at least 6 characters",
      });
      return;
    }

    if (users.find((u) => u.email === email)) {
      setDialog({
        show: true,
        type: "error",
        message: "Email already registered",
      });
      return;
    }

    const newUser = {
      email,
      password,
      id: `user_${Date.now()}`,
    };

    setUsers((prev) => [...prev, newUser]);
    setDialog({
      show: true,
      type: "success",
      message: "Account created successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/5"></div>

      {/* ✅ Dialog Status Overlay */}
      {dialog.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div
            className={`text-center p-6 rounded-2xl shadow-xl max-w-xs w-full mx-4 animate-fade-in ${
              dialog.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              {dialog.type === "success" ? (
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-pop-in">
                  ✅
                </div>
              ) : (
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center animate-pop-in">
                  ❌
                </div>
              )}
            </div>
            <p
              className={`text-lg font-medium ${
                dialog.type === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {dialog.message}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md p-8 relative z-10">
        {/* ... bagian header logo & judul tetap sama ... */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <img src={icLogo} className="w-8 h-8 rounded-xl" alt="Logo" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentView === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-600">
            {currentView === "login"
              ? "Sign in to access AI text processing"
              : "Join to unlock powerful AI features"}
          </p>
        </div>

        {/* ❌ Hapus blok loginSuccess, loginError, registerError karena diganti dialog */}

        <form
          onSubmit={currentView === "login" ? handleLogin : handleRegister}
          className="space-y-6"
        >
          {/* ... input email, password, confirmPassword tetap sama ... */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {currentView === "register" && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {currentView === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {currentView === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={() =>
                setCurrentView(currentView === "login" ? "register" : "login")
              }
              className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              {currentView === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>

      {/* ✅ Animasi CSS untuk dialog */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes pop-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          70% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }
        .animate-pop-in {
          animation: pop-in 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }
      `}</style>
    </div>
  );
}
