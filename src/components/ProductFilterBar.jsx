import { useDispatch, useSelector } from "react-redux";
import {
    selectAllProducts,
    selectSelectedCategory,
    selectSelectedVarity,
    setSelectedCategory,
    setSelectedVarity,
    setSelectedDivision,
} from "../store/ProductSlice";
import { IoIosArrowDown } from "react-icons/io";


const ProductFilterBar = () => {
    const dispatch = useDispatch();
    const productsList = useSelector(selectAllProducts);
    const selectedCategory = useSelector(selectSelectedCategory);
    const selectedVarity = useSelector(selectSelectedVarity);

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
                            onClick={() => dispatch(setSelectedCategory(_id))}
                        >
                            <h2 className="text-sm font-semibold font-mainFont1">{category_name}</h2>
                            <IoIosArrowDown
                                className={`transition-transform duration-500 text-2xl text-gray-500 ${selectedCategory === _id ? "rotate-180" : ""}`}
                            />
                        </div>

                        {/* Show collections if category is selected */}
                        {selectedCategory === _id && (
                            <div className="pl-8 py-2">
                                {collections.map(({ _id: collectionId, varity_name, division }) => (
                                    <div key={collectionId}>
                                        <div
                                            className="flex items-center gap-2 cursor-pointer py-1"
                                            onClick={() => dispatch(setSelectedVarity(collectionId))}
                                        >
                                            <h3 className="font-[500] text-gray-800 font-mainFont1 text-[18px]">
                                                {varity_name}
                                            </h3>
                                        </div>

                                        {/* Show divisions if varity is selected */}
                                        {collectionId && (
                                            <ul className="pl-5 text-gray-700 text-sm">
                                                {division.map(({ _id: divisionId, division_name }) => (
                                                    <li
                                                        key={divisionId}
                                                        className="flex items-center gap-2 py-1 cursor-pointer"
                                                        onClick={() => dispatch(setSelectedDivision(divisionId))}
                                                    >
                                                        <h4 className="font-[500] text-gray-800 font-mainFont1 text-[18px]">
                                                            {division_name}
                                                        </h4>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductFilterBar;