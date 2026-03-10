import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
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
    <footer className="bg-gray-100 text-gray-700 mt-16">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-3xl font-extrabold tracking-tight font-albert bg-gradient-to-r from-blue-700 via-blue-500 to-teal-400 bg-clip-text text-transparent">
              biosynvanta
            </h1>
          </div>
          <p className="text-sm text-gray-600">
            {t.footerDesc}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-gray-800">{t.quickLinks}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-600">{t.home}</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">{t.about}</Link></li>
            <li><Link to="/products" className="hover:text-blue-600">{t.products}</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">{t.contact}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-gray-800">Product Categories</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link to={`/products?category=${cat.slug}`} className="hover:text-blue-600">
                  {cat.name}
                </Link>
              </li>
            ))}
            {categories.length === 0 && (
              <li className="text-gray-400">Loading categories...</li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-gray-800">{t.contactUs}</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>{t.email} sales@biosynvanta.com</li>
            <li>{t.phone} +91 89765 04666</li>
            <li>{t.address} {t.addressText}</li>
            <li className="flex items-center gap-2">
              <a 
                href="https://www.linkedin.com/company/biosynvanta" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center py-4 text-sm text-gray-500 border-t">
        {new Date().getFullYear()} Biosynvanta. All Rights Reserved.
      </div>
    </footer>
  );
}