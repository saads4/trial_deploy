import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../utils/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (category) {
          try {
            const categoryRes = await api.get(`/categories/${category}`);
            setCategoryDetails(categoryRes.data);
          } catch (err) {
            try {
              const allCategoriesRes = await api.get('/categories');
              const foundCategory = allCategoriesRes.data.find(cat => 
                cat.slug === category || cat._id === category
              );
              if (foundCategory) {
                setCategoryDetails(foundCategory);
              }
            } catch (slugErr) {
              console.error('Error finding category by slug:', slugErr);
            }
          }
        }

        if (category) {
          try {
            const res = await api.get(`/products?category=${category}`);
            setProducts(res.data || []);
          } catch (error) {
            console.error('Error fetching category products:', error);
            setProducts([]);
          }
        } else {
          const res = await api.get("/products");
          setProducts(res.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8">
          {category ? 'Loading Category Products...' : 'Our Products'}
        </h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (products.length === 0 && !category) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <p style={{color: 'var(--text-secondary)'}} className="text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 min-h-screen" style={{backgroundColor: 'var(--bg-light)'}}>
      {category && categoryDetails && (
        <div className="mb-12">
          <Link
            to="/categories"
            className="link-primary mb-6 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Categories
          </Link>
          
          <div className="card p-8 shadow-lg">
            <h1 className="text-4xl font-bold text-gradient mb-4">{categoryDetails.name}</h1>
            <p className="text-lg leading-relaxed" style={{color: 'var(--text-secondary)'}}>
              {categoryDetails.description || "No description available for this category."}
            </p>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-3xl font-bold text-gradient mb-8">
          {category && categoryDetails ? `Products in ${categoryDetails.name}` : 'Our Products'}
        </h2>
        
        {products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product._id} className="card card-accent hover:shadow-lg transition-all duration-300">
                <div className="h-48" style={{backgroundColor: 'var(--bg-light)'}}>
                  <img
                    src={product.imageUrl || product.image || "https://images.unsplash.com/photo-1579684451722-219f54b73314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (product.image && !product.image.startsWith('http')) {
                        e.target.src = `http://localhost:5051${product.image}`;
                      }
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--text-primary)'}}>{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-xl" style={{backgroundColor: 'var(--bg-light)'}}>
            <div style={{color: 'var(--text-secondary)'}} className="mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {category ? 'No Products Found in This Category' : 'No Products Found'}
            </h3>
            <p style={{color: 'var(--text-secondary)'}} className="mb-6">
              {category ? 'There are currently no products available in this category.' : 'There are currently no products available.'}
            </p>
            <Link
              to="/categories"
              className="btn-primary"
            >
              Browse Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}