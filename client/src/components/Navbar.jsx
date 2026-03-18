import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, Globe } from "lucide-react";
import { LanguageContext } from "../App";
import api from "../utils/api";
import axios from "axios";

export default function Navbar() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const supportedLanguages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية (Arabic)' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'ru', label: 'Русский' }
  ];

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

  const handleCategoryClick = (slug) => {
    navigate(`/products?category=${slug}`);
    setDropdownOpen(false);
    setIsOpen(false);
  };

  const handleLanguageChange = (code) => {
    setLanguage(code);
    setLangDropdownOpen(false);
    window.location.reload();
  };

  return (
    <nav className="bg-gray-50 shadow-sm relative z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between relative">
        <div className="flex items-center gap-2 z-10">
          <h1 className="text-3xl font-extrabold tracking-tight font-albert text-gradient">
            biosynvanta
          </h1>
        </div>
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 font-medium" style={{color: 'var(--text-primary)'}}>
          <Link to="/" className="link-primary" style={{color: 'var(--deep-blue)'}}>
            Home
          </Link>
          <Link to="/about" className="link-primary" style={{color: 'var(--deep-blue)'}}>
            About
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer link-primary" style={{color: 'var(--deep-blue)'}}>
              <Link to="/categories">Products</Link>
              <ChevronDown size={16} />
            </div>
            <div
              className={`absolute left-0 mt-3 w-56 bg-white shadow-lg rounded-lg py-3 transition-all duration-300 ease-in-out ${
                dropdownOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/products?category=${cat.slug}`}
                  className="block px-4 py-2 hover:bg-blue-50"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/contact" className="link-primary" style={{color: 'var(--deep-blue)'}}>
            Contact
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6 z-10">
          <div
            className="relative"
            onMouseEnter={() => setLangDropdownOpen(true)}
            onMouseLeave={() => setLangDropdownOpen(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer link-primary font-medium" style={{color: 'var(--deep-blue)'}}>
              <Globe size={18} />
              <span className="uppercase">{language}</span>
              <ChevronDown size={16} />
            </div>
            <div
              className={`absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg py-2 transition-all duration-300 ease-in-out ${
                langDropdownOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`block w-full text-left px-4 py-2 hover:bg-blue-50 ${language === lang.code ? 'text-teal font-bold' : ''}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
          <Link
            to="/contact"
            className="btn-primary"
          >
            Enquire Now
          </Link>
        </div>
        <div className="md:hidden z-10">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6" style={{color: 'var(--text-primary)'}}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link to="/categories" onClick={() => setIsOpen(false)}>
            Products
          </Link>
          <div>
            <p className="font-semibold text-sm" style={{color: 'var(--text-secondary)'}}>Categories</p>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryClick(cat.slug)}
                className="block text-left py-1"
                style={{color: 'var(--text-secondary)'}}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="border-t pt-4 mt-2">
            <p className="font-semibold text-sm mb-3" style={{color: 'var(--text-secondary)'}}>Language</p>
            <div className="flex flex-wrap gap-2">
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    language === lang.code
                      ? 'bg-gradient-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link
            to="/contact"
            className="bg-gradient-primary text-white text-center py-2 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </nav>
  );
}