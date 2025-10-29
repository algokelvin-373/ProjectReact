import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import styles from "../components/animations/splash.module.css";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const isLogin = localStorage.getItem("isLogin");
      if (isLogin === "1") {
        navigate("/home", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white animate-spin" />
            </div>
          </div>
          <div className="absolute -inset-4 bg-blue-400/20 rounded-full blur-xl animate-ping"></div>
        </div>
        <h1
          className={`text-4xl md:text-6xl font-bold text-white mb-4 ${styles["fade-in"]}`}
        >
          Web AI Chat
        </h1>
        <p className={`text-xl text-blue-100 mb-8 ${styles["fade-in-delay"]}`}>
          Powered by Artificial Intelligence
        </p>
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
