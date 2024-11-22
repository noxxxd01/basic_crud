import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import ProductView from "./pages/ProductView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductList />,
  },
  {
    path: "/create",
    element: <ProductForm />,
  },
  {
    path: "/update/:productId", // Route for editing a product
    element: <ProductForm />,
  },
  {
    path: "/product/:productId",
    element: <ProductView />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
