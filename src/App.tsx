import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Client from "./pages/clientLayout/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "pages/products/products";
import ProductDetails from "pages/productDetails/productDetails";
import Favorites from "pages/favorites/favorites";
import Basket from "pages/basket/basket";
import Checkout from "pages/checkout/checkout";
import ProtectedClient from "pages/clientLayout/protectedClient";
import ProtectedAdmin from "pages/adminLayout/protectedAdmin";
import Admin from "pages/adminLayout/admin";
import ProductsMangament from "pages/productsMangament/productsMangament";
import NotFound from "pages/404/notFound";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedClient />}>
            <Route path="/home" element={<Client />}>
              <Route path="/home/products" element={<Products />} />
              <Route path="/home/checkout" element={<Checkout />} />
              <Route path="/home/products/:id" element={<ProductDetails />} />
              <Route path="/home/products/favorites" element={<Favorites />} />
              <Route path="/home/products/basket" element={<Basket />} />
            </Route>
          </Route>
          <Route element={<ProtectedAdmin />}>
            <Route path="/dashboard" element={<Admin />}>
              <Route
                path="/dashboard/products"
                element={<ProductsMangament />}
              ></Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
