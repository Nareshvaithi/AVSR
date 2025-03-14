import React, { useState, useEffect } from "react";
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
import ReactPlayer from 'react-player';

const ShowProducts = () => {
    const dispatch = useDispatch();
    const productsList = useSelector(selectAllProducts);
    const selectedCategory = useSelector(selectSelectedCategory);
    const selectedVarity = useSelector(selectSelectedVarity);
    const selectedDivision = useSelector(selectSelectedDivision);
    const navigate = useNavigate();
    const [hoveredProductId, setHoveredProductId] = useState(null);

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
    const findmetal = productsList.find((category) => category._id === selectedCategory);
    const metal = findmetal.category_name;

    // Function to check if a file is a video
    const isVideo = (url) => {
        return url.endsWith('.mp4');
    };

    return (
        <div className="w-full pl-0 lg:pl-5">
            <div className="flex items-center justify-between">
                <BreadCrumb />
                <SortBy />
            </div>
            {collections.map(({ varity_name, division, _id: collectionId }) => {
                if (selectedVarity && selectedVarity !== collectionId) return null;

                return (
                    <div key={collectionId}>
                         <hr className={`${varity_name=="Necklace"||varity_name=="Gifts"||varity_name=="Gold coins" ? "hidden" : ""} mt-10  h-3`}></hr>
                        <div className="flex justify-center ">
                       
                        <h2 className=" border font-mainFont1 text-2xl font-bold bg-[#641a1b] text-center text-white px-6 my-10 py-1">
                            {varity_name}
                        </h2>
                        </div>
                        {division.map(({ division_name, division_details, _id: divisionId }) => {
                            if (selectedDivision && selectedDivision !== divisionId) return null;

                            return (
                                <div key={divisionId}>
                                    <h1 className="font-mainFont1 text-xl py-2 font-[600] text-gray-800">
                                      
                                    </h1>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                        {division_details.map(({ _id, images, product_name, product_code, purity, weight, offer, discount, mrp, createdAt }) => {
                                            const imageUrl = images.find((url) => url.endsWith('.jpg'));
                                            const videoUrl = images.find((url) => url.endsWith('.mp4'));

                                            return (
                                                <div
                                                    key={_id}
                                                    onClick={() => { navigate(`/products/${product_name}`, { state: { division_name, product_code, product_name, images, purity, weight, offer, discount, mrp, metal } }); window.scrollTo(0, 300) }}
                                                    className="w-full h-full cursor-pointer"
                                                    onMouseEnter={() => setHoveredProductId(_id)}
                                                    onMouseLeave={() => setHoveredProductId(null)}
                                                >
                                                    <div className="relative">
                                                    <div className="w-full border border-themeRed/30 relative group overflow-hidden" style={{ aspectRatio: '1/1' }}>
                                                        <img
                                                            src={imageUrl}
                                                            className="w-full h-full object-cover transition-opacity duration-500"
                                                            alt={product_name}
                                                            style={{ opacity: hoveredProductId === _id ? 0 : 1 }}
                                                        />
                                                                                                                                                                {videoUrl && (
                                                            <div
                                                                className=" obsolute inset-0 transition-opacity duration-500 w-full"
                                                                style={{ opacity: hoveredProductId === _id ? 1 : 0 }}
                                                            >
                                                                <ReactPlayer
                                                                    className="w-full h-full object-cover"
                                                                    url={videoUrl}
                                                                    playing={hoveredProductId === _id}
                                                                    loop={true}
                                                                    muted={true}
                                                                    controls={false}
                                                                    width="100%"
                                                                    height="100%"
                                                                    style={{ position: 'absolute', top: 0, left: 0,width:"500px" }}
                                                                    
                                                                />
                                                            </div>
                                                        )}


                                                    </div>


                                                    <h3 className="text-center font-mainFont1 text-lg py-2 font-[500]">
                                                        {product_name}
                                                    </h3>
                                                    </div>
                                                </div>
                                                
                                            );
                                        })}
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