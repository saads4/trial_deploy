import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import api from "../utils/api";
import { LanguageContext } from "../App"; 
import { uiText } from "../utils/translations.js"; 

export default function Footer() {
  const { language } = useContext(LanguageContext);
  const t = uiText[language] || uiText.en; 
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories for footer:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <footer className="text-gray-700 mt-16 bg-gray-50 shadow-sm">
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 mb-6">
            <h1 className="text-3xl font-extrabold tracking-tight font-albert text-gradient">
              biosynvanta
            </h1>
          </div>
          <p className="text-sm leading-relaxed text-gray-600" style={{maxWidth: '280px'}}>
            {t.footerDesc}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="font-bold text-gray-900 mb-6 tracking-wide" style={{letterSpacing: '0.025em'}}>{t.quickLinks}</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="footer-link-light" onClick={() => window.scrollTo(0, 0)}>{t.home}</Link></li>
            <li><Link to="/about" className="footer-link-light" onClick={() => window.scrollTo(0, 0)}>{t.about}</Link></li>
            <li><Link to="/categories" className="footer-link-light" onClick={() => window.scrollTo(0, 0)}>{t.products}</Link></li>
            <li><Link to="/contact" className="footer-link-light" onClick={() => window.scrollTo(0, 0)}>{t.contact}</Link></li>
          </ul>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="font-bold text-gray-900 mb-6 tracking-wide" style={{letterSpacing: '0.025em'}}>Product Categories</h3>
          <ul className="space-y-3 text-sm">
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link to={`/products?category=${cat.slug}`} className="footer-link-light">
                  {cat.name}
                </Link>
              </li>
            ))}
            {categories.length === 0 && (
              <li className="text-gray-500">Loading categories...</li>
            )}
          </ul>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="font-bold text-gray-900 mb-6 tracking-wide" style={{letterSpacing: '0.025em'}}>{t.contactUs}</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3 group">
              <Mail size={18} className="text-blue-600 flex-shrink-0" />
              <span className="text-gray-600">{t.email} sales@biosynvanta.com</span>
            </li>
            <li className="flex items-center gap-3 group">
              <Phone size={18} className="text-blue-600 flex-shrink-0" />
              <span className="text-gray-600">{t.phone} +91 89765 04666</span>
            </li>
            <li className="flex items-start gap-3 group">
              <MapPin size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600">{t.address} {t.addressText}</span>
            </li>
            <li className="pt-2">
              <a 
                href="https://www.linkedin.com/company/biosynvanta" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-600/30 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Linkedin size={18} />
                <span className="font-medium">LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center py-6 text-sm border-t border-gray-200">
        <div className="container mx-auto px-6">
          <p className="mb-2 text-gray-600">{new Date().getFullYear()} Biosynvanta. All Rights Reserved.</p>
          <p className="text-xs text-gray-500">Your trusted partner in healthcare solutions worldwide</p>
        </div>
      </div>
    </footer>
  );
}