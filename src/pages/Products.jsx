import ProductFilterBar from "../components/ProductFilterBar";
import ShowProducts from "../components/ShowProducts";

const Products = ()=>{
    return <div>
        <div className="flex items-start px-5 py-5">
            <ProductFilterBar/>
            <ShowProducts/>
        </div>
    </div>
}

export default Products;