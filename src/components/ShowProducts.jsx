import BreadCrumb from "./BreadCrumb";
import SortBy from "./SortBy";
import FilterIcon from "./FilterIcon";
import { useSelector } from "react-redux";
import { selectSelectedProducts } from "../store/ProductSlice";

const ShowProducts = () => {
    const selectedProducts = useSelector(selectSelectedProducts);

    // Ensure selectedProducts is valid and contains at least one item
    if (!selectedProducts || selectedProducts.length === 0) {
        return <div className="text-center text-gray-500">No products available.</div>;
    }

    // Extract data from the first object in selectedProducts
    const categoryData = selectedProducts?.[0].data;

    if (!categoryData || !categoryData.collections) {
        return <div className="text-center text-gray-500">No collections available.</div>;
    }

    return (
        <div className="w-full pl-0 lg:pl-5">
            <div className="flex justify-between flex-wrap gap-3 items-center lg:items-start">
                <BreadCrumb />
                <SortBy />
                <FilterIcon />
            </div>

            <div className="w-full h-full">
                {categoryData.collections.map(({ varity_name, division }, collectionIndex) => (
                    <div key={collectionIndex} className="pt-5">
                        <h2 className="text-2xl font-semibold font-mainFont1">{varity_name}</h2>

                        {division?.map(({ division_name, division_details }, divisionIndex) => (
                            <div key={divisionIndex} className="">
                                <h3 className="text-xl font-mainFont1 my-3">{division_name}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {division_details?.map(({ product_name, _id, images }) => (
                                        <div key={_id} className="text-center group">
                                            <div className="w-full h-full border border-themeRed/30 rounded-lg shadow-sm relative overflow-hidden">
                                                <img
                                                    src={images?.[1]}
                                                    alt={product_name}
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                                <img src={images?.[0]} alt="" className={`w-full h-full absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}/>
                                            </div>
                                                <h4 className="text-lg mt-2 font-mainFont1">{product_name}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default ShowProducts;