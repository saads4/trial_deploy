import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 min-h-screen" style={{backgroundColor: 'var(--bg-light)'}}>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gradient mb-4">All Categories</h1>
        <p className="text-lg" style={{color: 'var(--text-secondary)'}}>Explore our comprehensive range of medical categories</p>
      </div>
      
      {categories.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category._id} className="card card-accent hover:shadow-lg transition-all duration-300">
              <div className="h-48" style={{backgroundColor: 'var(--bg-light)'}}>
                <img
                  src={category.imageURL || "https://images.unsplash.com/photo-1579684451722-219f54b73314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"}
                  alt={category.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    console.error('Failed to load category image:', e.target.src);
                    console.error('Category imageURL field:', category.imageURL);
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4" style={{color: 'var(--text-primary)'}}>{category.name}</h3>
                <Link
                  to={`/products?category=${category.slug || category._id}`}
                  className="btn-primary text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p style={{color: 'var(--text-secondary)'}} className="text-lg">No categories available at the moment.</p>
        </div>
      )}
    </div>
  );
}
