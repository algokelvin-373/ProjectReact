import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Home from "./pages/home/Home";
import History from "./pages/home/History";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;
