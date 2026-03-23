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
        // Fetch category details
        if (category) {
          try {
            const { data } = await api.get(`/categories/${category}`);
            setCategoryDetails(data);
          } catch {
            const { data } = await api.get("/categories");
            const found = data.find(
              (cat) => cat.slug === category || cat._id === category
            );
            setCategoryDetails(found || null);
          }
        }

        // Fetch products
        const { data } = await api.get(
          category ? `/products?category=${category}` : "/products"
        );

        setProducts(data || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    fetchData();
  }, [category]);

  // Filter out empty products
  const validProducts = products.filter(
    (p) => p?.name?.trim() || p?.imageUrl || p?.image
  );

  // Product card component
  const ProductCard = ({ product }) => {
    const imageSrc =
      product.imageUrl ||
      (product.image && `http://localhost:5051${product.image}`) ||
      "https://images.unsplash.com/photo-1579684451722-219f54b73314";

    return (
      <div className="card hover:shadow-lg transition-all duration-300">
        <div className="h-48 flex items-center justify-center bg-[var(--bg-light)]">
          <img
            src={imageSrc}
            alt={product.name || "product"}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1579684451722-219f54b73314";
            }}
          />
        </div>

        <div className="p-6">
          {product.name && (
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">
              {product.name}
            </h3>
          )}
        </div>
      </div>
    );
  };

  // Group products by subcategory
  const groupedProducts = validProducts.reduce((acc, product) => {
    const subcategorySlug = product.subcategory || "general";

    // Find subcategory name from category details
    let displayName = subcategorySlug;

    if (categoryDetails && categoryDetails.subcategories) {
      const subcategory = categoryDetails.subcategories.find(
        (sub) => sub.slug === subcategorySlug
      );
      if (subcategory) {
        displayName = subcategory.name;
      }
    } else {
      // Fallback formatting for non-categorized products
      displayName = subcategorySlug.length > 2
        ? subcategorySlug.charAt(0).toUpperCase() + subcategorySlug.slice(1)
        : subcategorySlug.toUpperCase();
    }

    const key = displayName;
    if (!acc[key]) acc[key] = [];
    acc[key].push(product);
    return acc;
  }, {});

  // Display loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8">
          {category ? "Loading Category Products..." : "Our Products"}
        </h1>
        <p>Loading...</p>
      </div>
    );
  }

  // Display empty state for main products page
  if (!category && validProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 min-h-screen bg-[var(--bg-light)]">
      {/* Category header */}
      {category && categoryDetails && (
        <div className="mb-12">
          <Link to="/categories" className="link-primary mb-6 flex items-center">
            ← Back to Categories
          </Link>

          <div className="card p-8 shadow-lg">
            <h1 className="text-4xl font-bold text-gradient mb-4">
              {categoryDetails.name}
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              {categoryDetails.description ||
                "No description available for this category."}
            </p>
          </div>
        </div>
      )}

      {/* Products section */}
      <h2 className="text-3xl font-bold text-gradient mb-8">
        {category && categoryDetails
          ? `Products in ${categoryDetails.name}`
          : "Our Products"}
      </h2>

      {validProducts.length > 0 ? (
        category === "wcdp" ? (
          Object.entries(groupedProducts).map(([sub, items]) => (
            <div key={sub} className="mb-12">
              <h3 className="text-2xl font-bold text-gradient mb-6">{sub}</h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {validProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">
            {category
              ? "No Products Found in This Category"
              : "No Products Found"}
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            There are currently no products available.
          </p>

          <Link to="/categories" className="btn-primary">
            Browse Categories
          </Link>
        </div>
      )}
    </div>
  );
}