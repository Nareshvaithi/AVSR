import { useDispatch, useSelector } from "react-redux";
import {
    selectActiveItem,
    selectAllProducts,
    setActiveItem,
    addBreadcrumb,
    fetchproductsById
} from "../store/ProductSlice";

import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";

const ProductFilterBar = () => {
    const dispatch = useDispatch();
    const activeItem = useSelector(selectActiveItem);
    const productsList = useSelector(selectAllProducts);
    const [productId, setProductId] = useState(null);
    
    useEffect(() => {
        if (productsList.length > 0 && productId === null) {
            const firstProductId = productsList[0]._id;
            setProductId(firstProductId);
            dispatch(fetchproductsById(firstProductId));
        }
    }, [productsList, dispatch]);

    if (!productsList || productsList.length === 0) return null; 
    return (
        <div className="w-fit h-auto sticky top-16 text-nowrap hidden md:block">
            <div className="bg-green-800 text-white px-5 py-3 font-mainFont1 text-[22px] font-[500]">
                Shop by category
            </div>
            <div>
                {productsList.map(({ _id, category_name, collections }) => (
                    <div key={_id}>
                        <div
                            className="flex items-center justify-between gap-5 cursor-pointer p-2 text-gray-900 pl-5 uppercase"
                            onClick={() => {
                                dispatch(setActiveItem(_id));
                                dispatch(addBreadcrumb(_id));
                                setProductId(_id);
                                dispatch(fetchproductsById(_id));
                            }}
                        >
                            <h2 className="text-sm font-semibold font-mainFont1">{category_name}</h2>
                            <IoIosArrowDown
                                className={`transition-transform duration-500 text-2xl text-gray-500 ${
                                    activeItem === _id ? "rotate-180" : ""
                                }`}
                            />
                        </div>

                        {/* Items List */}
                        <div
                            className={`overflow-hidden transition-all duration-700 ${
                                activeItem === _id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                            {collections.map(({ _id:collectionId, varity_name, division }) => (
                                <div key={collectionId} className="pl-6 py-2">
                                    <div className="flex items-center gap-2">
                                        <input type="radio" name={category_name} id={collectionId} />
                                        <label
                                            htmlFor={`item-${collectionId}`}
                                            className="font-[500] text-gray-800 font-mainFont1 text-[18px]"
                                        >
                                            {varity_name}
                                        </label>
                                    </div>

                                    {/* Subitems List */}
                                    {division && (
                                        <ul className="pl-8 text-gray-700 text-sm">
                                            {division.map(({ _id: divisionId, division_name }) => (
                                                <li key={divisionId} className="flex items-center gap-2 py-2">
                                                   <input type="radio" name={category_name} id={collectionId} />
                                                    <label
                                                        htmlFor={`subitem-${divisionId}`}
                                                        className="font-[500] text-gray-800 font-mainFont1 text-[18px]"
                                                    >
                                                        {division_name}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductFilterBar;
