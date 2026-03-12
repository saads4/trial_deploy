import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

export const LanguageContext = createContext();

function App() {
  const [language, setLanguage] = useState(localStorage.getItem('appLanguage') || 'en');

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Router>
        {/* Header Bar */}
        import { FaLinkedin } from "react-icons/fa";

<div className="bg-[#1fa3b9] text-white text-xs sm:text-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">

    {/* Phone */}
    <span className="font-medium whitespace-nowrap flex-shrink-0">
      +91 89765 04666
    </span>

    {/* Email + LinkedIn */}
    <div className="flex items-center gap-4 sm:gap-6">
      <span className="font-medium truncate">
        sales@biosynvanta.com
      </span>

      <a
        href="https://www.linkedin.com/company/biosynvanta"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
        <FaLinkedin className="text-lg" />
      </a>
    </div>

  </div>
</div>
        {/* Main Content */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
          
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919619327387?text=Hello"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 z-50"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-14 h-14"
            />
          </a>
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;