import { FileText, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { icLogo } from "../assets";

const USERS_KEY = "web_ai_chat_users"; // key untuk localStorage

export default function Login() {
  const [currentView, setCurrentView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  // 🔁 Baca users dari localStorage atau gunakan default
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem(USERS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    // Data awal (fallback)
    return [
      { email: "user@example.com", password: "password123", id: "user1" },
    ];
  });

  // 🔁 Simpan users ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");

    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      // Opsional: simpan user yang sedang login
      localStorage.setItem("web_ai_chat_current_user", JSON.stringify(user));
      setLoginSuccess("Login successful!");
      setTimeout(() => {
        setCurrentView("main");
        setLoginSuccess("");
      }, 1500);
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError("");

    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return;
    }

    if (users.find((u) => u.email === email)) {
      setRegisterError("Email already registered");
      return;
    }

    const newUser = {
      email,
      password, // ⚠️ Di aplikasi nyata, jangan simpan password mentah!
      id: `user${Date.now()}`, // ID unik
    };

    setUsers((prev) => [...prev, newUser]);
    setRegisterError("");
    setCurrentView("login"); // Alihkan ke login setelah register
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/5"></div>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md p-8 relative z-10">
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

        {loginSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
            {loginSuccess}
          </div>
        )}

        {loginError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {loginError}
          </div>
        )}

        {registerError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {registerError}
          </div>
        )}

        <form
          onSubmit={currentView === "login" ? handleLogin : handleRegister}
          className="space-y-6"
        >
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
    </div>
  );
}
