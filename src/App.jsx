import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
function App() {
 
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:title" element={<ProductDetails/>} replace/>
      </Route>
    </Routes>
  )
}

export default App
