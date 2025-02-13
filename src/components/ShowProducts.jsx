import { useSelector } from "react-redux";
import BreadCrumb from "./BreadCrumb";
import SortBy from "./SortBy";
import { selectFilterProduct } from "../store/filterProductSlice";

const ShowProducts = ()=>{
    const products = useSelector(selectFilterProduct);
    const selectProduct = [];
    return (
        <div className="w-full pl-5">
            <div className="flex justify-between items-start">
                <BreadCrumb/>
                <SortBy/>
            </div>
            <div className="">
                
            </div>
        </div>
    )

}

export default ShowProducts;