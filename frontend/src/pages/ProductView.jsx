import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductView() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="px-[10rem] py-[5rem]">
      <h2 className="text-3xl">{product.productName}</h2>
      <img
        src={`http://localhost:5000/${product.image}`}
        alt={product.productName}
        className="w-64 h-64 object-cover mt-4"
      />
      <p>{product.description}</p>
      <p className="font-bold">Price: ${product.price}</p>
    </div>
  );
}

export default ProductView;
