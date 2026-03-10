import { useState, useEffect } from "react";
import api from "../utils/api";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImageFile, setProductImageFile] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState("");

  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImageFile, setCategoryImageFile] = useState(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState("");

  const [certificateTitle, setCertificateTitle] = useState("");
  const [certificateDescription, setCertificateDescription] = useState("");
  const [certificateIssuedBy, setCertificateIssuedBy] = useState("");
  const [certificateIssueDate, setCertificateIssueDate] = useState("");
  const [certificateExpiryDate, setCertificateExpiryDate] = useState("");
  const [certificateImageFile, setCertificateImageFile] = useState(null);
  const [certificateImagePreview, setCertificateImagePreview] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchInquiries();
    fetchCertificates();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString();
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await api.get("/inquiry");
      setInquiries(res.data.data || []);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const res = await api.get("/certificates/admin/all");
      setCertificates(res.data.data || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!productImageFile) {
      alert('Please select an image file');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', productImageFile);
      formData.append('name', productName);
      formData.append('category', productCategory);
      const response = await api.post("/products", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Product Added Successfully");
      setProductName("");
      setProductCategory("");
      setProductImageFile(null);
      setProductImagePreview("");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryImageFile) {
      alert('Please select an image file');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', categoryImageFile);
      formData.append('name', categoryName);
      formData.append('slug', categorySlug);
      formData.append('description', categoryDescription);
      const response = await api.post("/categories", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Category Added Successfully");
      setCategoryName("");
      setCategorySlug("");
      setCategoryDescription("");
      setCategoryImageFile(null);
      setCategoryImagePreview("");
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await api.delete(`/inquiry/${id}`);
      fetchInquiries();
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  const handleAddCertificate = async (e) => {
    e.preventDefault();
    if (!certificateImageFile) {
      alert('Please select an image file');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', certificateImageFile);
      formData.append('title', certificateTitle);
      formData.append('description', certificateDescription);
      formData.append('issuedBy', certificateIssuedBy);
      formData.append('issueDate', certificateIssueDate);
      formData.append('expiryDate', certificateExpiryDate);
      const response = await api.post("/certificates", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Certificate Added Successfully");
      setCertificateTitle("");
      setCertificateDescription("");
      setCertificateIssuedBy("");
      setCertificateIssueDate("");
      setCertificateExpiryDate("");
      setCertificateImageFile(null);
      setCertificateImagePreview("");
      fetchCertificates();
    } catch (error) {
      console.error("Error adding certificate:", error);
      alert("Error adding certificate.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCertificate = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;
    try {
      await api.delete(`/certificates/${id}`);
      fetchCertificates();
    } catch (error) {
      console.error("Error deleting certificate:", error);
      alert("Error deleting certificate. Please try again.");
    }
  };

  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
        setProductImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setProductImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file (JPEG, JPG, or PNG)');
        e.target.value = '';
      }
    }
  };

  const handleCategoryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
        setCategoryImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setCategoryImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file (JPEG, JPG, or PNG)');
        e.target.value = '';
      }
    }
  };

  const handleCertificateImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
        setCertificateImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setCertificateImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file (JPEG, JPG, or PNG)');
        e.target.value = '';
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>
          <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
            <input type="text" placeholder="Product Name" value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border p-2 rounded" required />
            <select value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="border p-2 rounded" required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Product Image</label>
              <input type="file" accept="image/jpeg,image/jpg,image/png"
                onChange={handleProductImageChange}
                className="border p-2 rounded w-full" required={true} />
              {productImagePreview && (
                <img src={productImagePreview} alt="Product preview" className="h-20 w-20 object-cover rounded mt-2" />
              )}
            </div>
            <button type="submit" disabled={loading}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Category</h2>
          <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
            <input type="text" placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border p-2 rounded" required />
            <input type="text" placeholder="Category Slug"
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              className="border p-2 rounded" required />
            <textarea placeholder="Description"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className="border p-2 rounded" rows="3" />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category Image</label>
              <input type="file" accept="image/jpeg,image/jpg,image/png"
                onChange={handleCategoryImageChange}
                className="border p-2 rounded w-full" />
              {categoryImagePreview && (
                <img src={categoryImagePreview} alt="Category preview" className="h-20 w-20 object-cover rounded mt-2" />
              )}
            </div>
            <button type="submit" disabled={loading}
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50">
              {loading ? "Adding..." : "Add Category"}
            </button>
          </form>
        </div>
      </div>
      <div className="mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Certificate</h2>
          <form onSubmit={handleAddCertificate} className="flex flex-col gap-4">
            <input type="text" placeholder="Certificate Title"
              value={certificateTitle}
              onChange={(e) => setCertificateTitle(e.target.value)}
              className="border p-2 rounded" required />
            <textarea placeholder="Certificate Description"
              value={certificateDescription}
              onChange={(e) => setCertificateDescription(e.target.value)}
              className="border p-2 rounded" rows="3" />
            <input type="text" placeholder="Issued By (Optional)"
              value={certificateIssuedBy}
              onChange={(e) => setCertificateIssuedBy(e.target.value)}
              className="border p-2 rounded" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                <input type="date" value={certificateIssueDate}
                  onChange={(e) => setCertificateIssueDate(e.target.value)}
                  className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (Optional)</label>
                <input type="date" value={certificateExpiryDate}
                  onChange={(e) => setCertificateExpiryDate(e.target.value)}
                  className="border p-2 rounded w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Certificate Image</label>
              <input type="file" accept="image/jpeg,image/jpg,image/png"
                onChange={handleCertificateImageChange}
                className="border p-2 rounded w-full" required />
              {certificateImagePreview && (
                <img src={certificateImagePreview} alt="Certificate preview" className="h-20 w-20 object-cover rounded mt-2" />
              )}
            </div>
            <button type="submit" disabled={loading}
              className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-50">
              {loading ? "Adding..." : "Add Certificate"}
            </button>
          </form>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Products ({products.length})</h2>
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.imageUrl || ''} alt={product.name}
                        className="h-10 w-10 object-cover rounded"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }} />
                      <div>
                        <div className="font-medium">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDeleteProduct(product._id)}
                      className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Categories ({categories.length})</h2>
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Slug</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="border-t">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {category.imageURL && (
                        <img src={category.imageURL} alt={category.name}
                          className="h-10 w-10 object-cover rounded"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }} />
                      )}
                      <div className="font-medium">{category.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{category.slug}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDeleteCategory(category._id)}
                      className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Inquiries ({inquiries.length})</h2>
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Subject</th>
                <th className="px-6 py-3 text-left">Message</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq._id} className="border-t">
                  <td className="px-6 py-4">{inq.name}</td>
                  <td className="px-6 py-4">{inq.phone}</td>
                  <td className="px-6 py-4">{inq.subject}</td>
                  <td className="px-6 py-4">{inq.message?.substring(0, 80)}...</td>
                  <td className="px-6 py-4">{formatDate(inq.createdAt)}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDeleteInquiry(inq._id)}
                      className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Certificates ({certificates.length})</h2>
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Certificate</th>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Issued By</th>
                <th className="px-6 py-3 text-left">Issue Date</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert._id} className="border-t">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={cert.imageUrl || ''} alt={cert.title}
                        className="h-10 w-10 object-cover rounded"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{cert.title}</div>
                      <div className="text-sm text-gray-500">
                        {cert.description?.substring(0, 50)}...
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{cert.issuedBy || '-'}</td>
                  <td className="px-6 py-4">{formatDate(cert.issueDate)}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDeleteCertificate(cert._id)}
                      className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}