import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AdminPanel from "./pages/AdminPanel";
import AdminLayout from "./pages/AdminLayout";
function App() {
 
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="products" element={<Products/>}/>
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminPanel/>}/>

      </Route>

    </Routes>
  )
}

export default App
