import ProductFilterBar from "../components/ProductFilterBar";
import ShowProductDetails from "../components/ShowProductDetails";


const ProductDetails = () =>{
    return(
        <div>
            <div className="flex items-start px-2 lg:px-5 py-2 lg:py-5">
                <ProductFilterBar/>
                <ShowProductDetails/>
            </div>
        </div>
    )
}

export default ProductDetails;