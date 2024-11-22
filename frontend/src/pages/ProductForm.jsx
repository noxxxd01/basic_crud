import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (productId) {
      // Fetch product details from localhost backend
      axios
        .get(`http://localhost:5000/api/products/${productId}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.error("Error fetching product", error));
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("price", product.price);
    formData.append("description", product.description);
    if (product.image) {
      formData.append("image", product.image);
    }

    const apiCall = productId
      ? axios.put(`http://localhost:5000/api/products/${productId}`, formData) // Update request
      : axios.post("http://localhost:5000/api/products", formData); // Create request

    apiCall
      .then(() => navigate("/")) // Navigate back to product list
      .catch((error) => console.error("Error saving product", error));
  };

  return (
    <form onSubmit={handleSubmit} className="px-[10rem] py-[5rem]">
      <input
        type="text"
        name="productName"
        value={product.productName}
        onChange={handleChange}
        placeholder="Product Name"
        required
        className="border p-2 rounded mb-4"
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="border p-2 rounded mb-4"
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="border p-2 rounded mb-4"
      />
      <input
        type="file"
        onChange={handleImageChange}
        className="border p-2 rounded mb-4"
      />
      <button
        type="submit"
        className="bg-purple-600 py-3 px-4 rounded-md hover:bg-purple-700 text-white"
      >
        {productId ? "Update" : "Create"} Product
      </button>
    </form>
  );
};

export default ProductForm;
