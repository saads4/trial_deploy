// Import React hooks and routing
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, Globe } from "lucide-react";
import { LanguageContext } from "../App";
import api from "../utils/api";

export default function Navbar() {
  // Context and state variables
  const { language, setLanguage } = useContext(LanguageContext);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const navigate = useNavigate();

  // Supported languages for internationalization
  const supportedLanguages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية (Arabic)' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'ru', label: 'Русский' }
  ];

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryClick = (slug) => {
    navigate(`/products?category=${slug}`);
    setDropdownOpen(false);
    setIsOpen(false);
  };

  // Handle language change
  const handleLanguageChange = (code) => {
    setLanguage(code);
    setLangDropdownOpen(false);
    window.location.reload();
  };

  // Dropdown hover handlers with timeout
  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 150); // 150ms delay
    setDropdownTimeout(timeout);
  };

  return (
    <nav className="bg-gray-50 shadow-sm relative z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center gap-2 z-10">
          <Link to="/" className="text-4xl font-extrabold tracking-tight font-albert text-gradient">
            biosynvanta
          </Link>
        </div>
        {/* Desktop navigation */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 font-medium" style={{color: 'var(--text-primary)'}}>
          <Link to="/" className="link-primary" style={{color: 'var(--deep-blue)'}}>Home</Link>
          <Link to="/about" className="link-primary" style={{color: 'var(--deep-blue)'}}>About Us</Link>
          {/* Products dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <div 
              className="flex items-center gap-1 cursor-pointer link-primary" 
              style={{color: 'var(--deep-blue)'}}
            >
              <Link to="/categories">Products</Link>
              <ChevronDown size={16} />
            </div>
            <div 
              className={`absolute left-0 mt-3 w-56 bg-white shadow-lg rounded-lg py-3 transition-all duration-300 ease-in-out ${
                dropdownOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              {categories.map((cat) => (
                <Link key={cat._id} to={`/products?category=${cat.slug}`} className="block px-4 py-2 hover:bg-blue-50">
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/contact" className="link-primary" style={{color: 'var(--deep-blue)'}}>Contact Us</Link>
        </div>
        {/* Language selector and CTA */}
        <div className="hidden md:flex items-center gap-6 z-10">
          <div className="relative" onMouseEnter={() => setLangDropdownOpen(true)} onMouseLeave={() => setLangDropdownOpen(false)}>
            <div className="flex items-center gap-1 cursor-pointer link-primary font-medium" style={{color: 'var(--deep-blue)'}}>
              <Globe size={18} />
              <span className="uppercase">{language}</span>
              <ChevronDown size={16} />
            </div>
            <div className={`absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg py-2 transition-all duration-300 ease-in-out ${
              langDropdownOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
            }`}>
              {supportedLanguages.map((lang) => (
                <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} 
                  className={`block w-full text-left px-4 py-2 hover:bg-blue-50 ${language === lang.code ? 'text-teal font-bold' : ''}`}>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
          <Link to="/contact" className="btn-primary">Enquire Now</Link>
        </div>
        {/* Mobile menu toggle */}
        <div className="md:hidden z-10">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile navigation */}
      <div className={`md:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${
        isOpen ? "max-h-screen py-4" : "max-h-0"
      }`}>
        <div className="flex flex-col gap-2 px-6" style={{color: 'var(--text-primary)'}}>
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsOpen(false)}
            className="py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            About Us
          </Link>
          
          {/* Mobile Products with collapsible categories */}
          <div>
            <button 
              onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
              className="w-full py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center justify-between"
            >
              <span>Products</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${mobileCategoriesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${
              mobileCategoriesOpen ? 'max-h-96 mt-2' : 'max-h-0'
            }`}>
              <div className="bg-gray-50 rounded-lg p-2">
                {categories.map((cat) => (
                  <button 
                    key={cat.slug} 
                    onClick={() => handleCategoryClick(cat.slug)} 
                    className="block w-full text-left py-2 px-3 rounded-md hover:bg-gray-200 transition-colors text-sm"
                    style={{color: 'var(--text-secondary)'}}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile language selector */}
          <div className="border-t pt-4 mt-2">
            <p className="font-semibold text-sm mb-3 px-4" style={{color: 'var(--text-secondary)'}}>Language</p>
            <div className="flex flex-wrap gap-2 px-4">
              {supportedLanguages.map((lang) => (
                <button 
                  key={lang.code} 
                  onClick={() => handleLanguageChange(lang.code)} 
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    language === lang.code ? 'bg-gradient-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className="py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Contact Us
          </Link>
          
          <Link 
            to="/contact" 
            className="bg-gradient-primary text-white text-center py-3 rounded-full font-medium mx-4 mt-2" 
            onClick={() => setIsOpen(false)}
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </nav>
  );
}