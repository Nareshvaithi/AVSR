import { useDispatch, useSelector } from "react-redux";
import {
    selectActiveItem,
    selectFilterProduct,
    setActiveItem,
    addBreadcrumb
} from "../store/filterProductSlice";
import { IoIosArrowDown } from "react-icons/io";


const ProductFilterBar = () => {
    const dispatch = useDispatch();
    const activeItem = useSelector(selectActiveItem);
    const productsList = useSelector(selectFilterProduct);

    return (
        <div className="w-fit h-auto sticky top-16 text-nowrap">
            <div className="bg-green-800 text-white px-5 py-3 font-mainFont1 text-[22px] font-[500]">
                Shop by category
            </div>
            <div>
                {productsList.map(({ id, category, items }) => (
                    <div key={id}>
                        {/* Category Title */}
                        <div
                            className="flex items-center justify-between gap-5 cursor-pointer p-2 text-gray-900 pl-5 uppercase"
                            onClick={() => {
                                dispatch(setActiveItem(id));
                                dispatch(addBreadcrumb(id));
                            }}
                        >
                            <h2 className="text-sm font-semibold font-mainFont1">{category}</h2>
                            <IoIosArrowDown
                                className={`transition-transform duration-500 text-2xl text-gray-500 ${
                                    activeItem === id ? "rotate-180" : ""
                                }`}
                            />
                        </div>

                        {/* Items List */}
                        <div
                            className={`overflow-hidden transition-all duration-700 ${
                                activeItem === id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                            {items.map(({ idx, item, subitems }) => (
                                <div key={idx} className="pl-6 py-2">
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" name={item} id={`item-${idx}`} className="size-3" />
                                        <label
                                            htmlFor={`item-${idx}`}
                                            className="font-[500] text-gray-800 font-mainFont1 text-[18px]"
                                        >
                                            {item}
                                        </label>
                                    </div>

                                    {/* Subitems List */}
                                    {subitems && (
                                        <ul className="pl-8 text-gray-700 text-sm">
                                            {subitems.map(({ id, item }) => (
                                                <li key={id} className="flex items-center gap-2 py-2">
                                                    <input type="checkbox" name={item} id={`subitem-${id}`} className="size-3" />
                                                    <label
                                                        htmlFor={`subitem-${id}`}
                                                        className="font-[500] text-gray-800 font-mainFont1 text-[18px]"
                                                    >
                                                        {item}
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
