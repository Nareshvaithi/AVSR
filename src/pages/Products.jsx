import ProductFilterBar from "../components/ProductFilterBar";
import ShowProducts from "../components/ShowProducts";
import productBanner from "../assets/Images/products/product-banner.jpg";
const Products = ()=>{
    return <div>
            <div className="w-full h-full">
                <img src={productBanner} alt="" className="w-full h-full object-contain"/>
            </div>
            <div className="flex items-start container py-5">
                <ProductFilterBar/>
                <ShowProducts/>
            </div>
        </div>
}

export default Products;