import { useEffect, useState } from "react";
import { Eye, PlusIcon, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductList() {
  // State to store products
  const [products, setProducts] = useState([]);

  // Function to delete product
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        setProducts((prev) =>
          prev.filter((product) => product._id !== productId)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products"); // Adjust the URL based on your API endpoint
        setProducts(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <div className="px-[10rem] py-[5rem]">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl">Product List</h2>
          <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>
        </div>
        <Link to="/create">
          <button className="bg-purple-600 py-3 px-4 rounded-md hover:bg-purple-700 text-white flex items-center">
            <PlusIcon className="w-4 h-4 mr-2" />
            Create New Product
          </button>
        </Link>
      </div>

      {/* Product Table */}
      <table className="w-full mt-10">
        <thead className="text-left bg-neutral-200 ">
          <tr>
            <th className="px-4 py-5 font-medium">Product name</th>
            <th className="font-medium">Price</th>
            <th className="font-medium">Description</th>
            <th className="font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through products and render rows */}
          {products.map((product) => (
            <tr key={product._id}>
              <td className="flex items-center gap-2 py-4">
                {/* Display the product image */}
                {product.image && (
                  <img
                    src={`http://localhost:5000/${product.image}`} // Assuming your backend serves the image at this path
                    alt={product.productName}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                )}
                {product.productName}
              </td>

              <td>{product.price}</td>
              <td>{product.description}</td>
              <td className="flex items-center gap-5">
                <Link to={`/product/${product._id}`}>
                  <button className="text-neutral-500 hover:underline">
                    <Eye className="w-5 h-5" />
                  </button>
                </Link>
                <Link to={`/update/${product._id}`}>
                  <button className="text-blue-500 hover:underline">
                    <SquarePen className="w-5 h-5" />
                  </button>
                </Link>
                <Link to="/">
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
