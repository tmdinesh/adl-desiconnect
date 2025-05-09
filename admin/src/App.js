import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin";
import LoginSignup from "./Pages/LoginSignup"; // ✅ import your seller login page

export const backend_url = process.env.REACT_APP_API_URL || "http://localhost:4000";
export const currency = "₹";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<LoginSignup />} /> {/* ✅ seller login page */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
