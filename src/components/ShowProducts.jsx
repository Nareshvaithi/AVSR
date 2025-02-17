import BreadCrumb from "./BreadCrumb";
import SortBy from "./SortBy";
import FilterIcon from "./FilterIcon";
import { useSelector } from "react-redux";
import { selectSelectedProducts } from "../store/ProductSlice";
import { useNavigate } from "react-router-dom";

const ShowProducts = () => {
    const selectedProducts = useSelector(selectSelectedProducts);
    const navigate = useNavigate();
    // Ensure selectedProducts is valid and contains at least one item
    if (!selectedProducts || selectedProducts.length === 0) {
        return <div className="text-center text-gray-500 w-full h-full my-auto">No products available.</div>;
    }

    // Extract data from the first object in selectedProducts
    const categoryData = selectedProducts[0]?.data;

    if (!categoryData || !categoryData.collections) {
        return <div className="text-center text-gray-500 w-full h-full my-auto">No collections available.</div>;
    }
    const metal = categoryData.category_name;
    return (
        <div className="w-full pl-0 lg:pl-5">
            <div className="flex justify-between flex-wrap gap-3 items-center lg:items-start">
                <BreadCrumb />
                <SortBy />
                <FilterIcon />
            </div>

            <div className="w-full h-full">
                {categoryData.collections.map(({ varity_name, division }, collectionIndex) => {
                    return <div key={collectionIndex} className="w-full h-full">
                        <h2 className="font-mainFont1 text-2xl font-bold text-themeRed text-center">{varity_name}</h2>
                        <div className="py-2">
                            {
                                division.map(({division_name,division_details},divisionIndex)=>{
                                    return <div key={divisionIndex}>
                                        <h1 className="font-mainFont1 text-xl py-2 font-[600] text-gray-800">{division_name}</h1>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                        {
                                            division_details.map(({product_name,images,product_code,purity,weight,offer,discount,mrp,_id,createdAt})=>{
                                                return <div key={_id} onClick={()=>{
                                                    navigate(`/products/${product_name}`,{state:{division_name,product_code,product_name,images,purity,weight,offer,discount,mrp,_id,createdAt,metal}})
                                                }} className="w-full h-full cursor-pointer">
                                                    <div className="w-full border border-themeRed/30 relative group overflow-hidden">
                                                        {
                                                            <img src={images[1]} className="w-full h-full object-cover" alt="" />
                                                        }
                                                        <div className="w-full h-full inset-0 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                                            <img src={images[0]} alt="" className="w-full h-full object-cover"/>
                                                        </div>
                                                    </div>
                                                    <h3 className="text-center font-mainFont1 text-lg py-2 font-[500]">{product_name}</h3>
                                                </div>
                                            })
                                        }
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};


export default ShowProducts;