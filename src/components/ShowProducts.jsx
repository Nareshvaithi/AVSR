import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchProducts,
    selectAllProducts,
    selectSelectedCategory,
    selectSelectedVarity,
    selectSelectedDivision,
    setSelectedCategory,
} from "../store/ProductSlice";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import SortBy from "./SortBy";

const ShowProducts = () => {
    const dispatch = useDispatch();
    const productsList = useSelector(selectAllProducts);
    const selectedCategory = useSelector(selectSelectedCategory);
    const selectedVarity = useSelector(selectSelectedVarity);
    const selectedDivision = useSelector(selectSelectedDivision);
    const navigate = useNavigate();

    // Fetch products on mount
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Auto-select the first category if none is selected
    useEffect(() => {
        if (productsList.length > 0 && !selectedCategory) {
            dispatch(setSelectedCategory(productsList[0]._id));
        }
    }, [productsList, selectedCategory, dispatch]);

    if (!productsList || productsList.length === 0) {
        return <div className="text-center text-gray-500 w-full h-full my-auto">No products available.</div>;
    }

    const categoryData = productsList.find((category) => category._id === selectedCategory);
    if (!categoryData) {
        return <div className="text-center text-gray-500 w-full h-full my-auto">No category selected.</div>;
    }

    const { collections } = categoryData;
    const findmetal = productsList.find((category)=>category._id === selectedCategory);
    const metal = findmetal.category_name;
    return (
        <div className="w-full pl-0 lg:pl-5">
            <div className="flex items-center justify-between">
                <BreadCrumb/>
                <SortBy/>
            </div>
            {collections.map(({ varity_name, division, _id: collectionId }) => {
                if (selectedVarity && selectedVarity !== collectionId) return null;

                return (
                    <div key={collectionId}>
                        <h2 className="font-mainFont1 text-2xl font-bold text-themeRed text-center">
                            {varity_name}
                        </h2>
                        {division.map(({ division_name, division_details, _id: divisionId }) => {
                            if (selectedDivision && selectedDivision !== divisionId) return null;

                            return (
                                <div key={divisionId}>
                                    <h1 className="font-mainFont1 text-xl py-2 font-[600] text-gray-800">
                                        {division_name}
                                    </h1>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                        {division_details.map(({ _id, images, product_name,product_code, purity, weight,offer,discount,mrp,createdAt }) => (
                                            <div
                                                key={_id}
                                                onClick={() => {navigate(`/products/${product_name}`,{state:{division_name,product_code,product_name,images,purity,weight,offer, discount,mrp,metal}});window.scrollTo(0,300)}}
                                                className="w-full h-full cursor-pointer"
                                            >
                                                <div className="w-full border border-themeRed/30 relative group overflow-hidden">
                                                    <img
                                                        src={images[1]}
                                                        className="w-full h-full object-cover"
                                                        alt=""
                                                    />
                                                    <div className="w-full h-full inset-0 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                                        <img
                                                            src={images[0]}
                                                            alt=""
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <h3 className="text-center font-mainFont1 text-lg py-2 font-[500]">
                                                    {product_name}
                                                </h3>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default ShowProducts;
