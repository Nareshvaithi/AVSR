import ProductFilterBar from "../components/ProductFilterBar";
import ShowProducts from "../components/ShowProducts";

const Products = ()=>{
    return <div>
        <div className="flex items-start px-2 lg:px-5 py-2 lg:py-5">
            <ProductFilterBar/>
            <ShowProducts/>
        </div>
    </div>
}

export default Products;