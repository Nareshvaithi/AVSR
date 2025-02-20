import ProductFilterBar from "../components/ProductFilterBar";
import ShowProductDetails from "../components/ShowProductDetails";
import productBanner from "../assets/Images/products/product-banner.jpg";

const ProductDetails = () =>{
    return(
        <div>
            <div className="w-full h-full">
                <div>
                    <img src={productBanner} alt="" />
                </div>
                <div className="container flex items-start gap-5 py-5">
                    <ProductFilterBar/>
                    <ShowProductDetails/>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;