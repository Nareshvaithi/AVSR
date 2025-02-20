import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AdminPanel from "./pages/AdminPanel";
import AdminLayout from "./pages/AdminLayout";
import ContextApi from "./ContextApi";

function App() {
 
  return (
    <ContextApi>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="products" element={<Products/>}/>
        <Route path="/products/:title" element={<ProductDetails/>}/>
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminPanel/>}/>
      </Route>
    </Routes>
    </ContextApi>
  )
}

export default App
