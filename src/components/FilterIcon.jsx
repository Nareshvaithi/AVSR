import { useLocation } from "react-router-dom"
import { BsFilterCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
    selectActiveItem,
    setActiveItem,
    addBreadcrumb,
    selectAllProducts
} from "../store/ProductSlice";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
const FilterIcon = ()=>{
    const location = useLocation();
    const dispatch = useDispatch();
    const activeItem = useSelector(selectActiveItem);
    const productsList = useSelector(selectAllProducts);
    const [isCheck,setIsCheck] = useState({}); 
    const isChecked = (e,item)=>{
        const { checked, name } = e.target;
        setIsCheck((prev) => ({
            ...prev,
            [name]: checked
        }));
        console.log(`${item} is ${checked ? "checked" : "unchecked"}`);
    }
    const [isOpenFilter,setIsOpenFilter] = useState(false);
    console.log(productsList)
    return (
        <div className="block md:hidden">
            {location.pathname !== '/' && 
            <div  onClick={()=>setIsOpenFilter(true)} className="text-gray-800 flex items-center gap-1 font-[600] font-mainFont1 text-sm">
                   <BsFilterCircle size={20}/>
                   <p>Filter</p>
            </div>}
            <div className={`overflow-y-auto z-50 fixed text-black top-0 left-0 w-screen h-screen bg-white transform transition-transform duration-700 ${isOpenFilter ? "translate-x-[0%]" : "translate-x-[100%]"} ease-in-out`}>
                <div onClick={()=>{setIsOpenFilter(false);window.scrollTo(0,0)}} className="flex items-center justify-between bg-green-800 text-white px-5 py-3 font-mainFont1 text-[22px] font-[500]">
                    <h2>Shop by category</h2>
                    <IoClose/>
                </div>
                <div>
                {productsList.map(({ _id, category_name, collections }) => (
                    <div key={_id}>
                        {/* Category Title */}
                        <div
                            className="flex items-center justify-between gap-5 cursor-pointer p-2 text-gray-900 pl-5 uppercase"
                            onClick={() => {
                                dispatch(setActiveItem(_id));
                                dispatch(addBreadcrumb(_id));
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
                            {collections.map(({ _id, varity_name, division }) => (
                                <div key={_id} className="pl-6 py-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            onChange={(e) => isChecked(e, varity_name)}
                                            checked={isCheck[varity_name] || false}
                                            type="checkbox"
                                            name={varity_name}
                                            id={`item-${_id}`}
                                            className="size-3"
                                        />
                                        <label
                                            htmlFor={`item-${_id}`}
                                            className="font-[500] text-gray-800 font-mainFont1 text-[18px]"
                                        >
                                            {varity_name}
                                        </label>
                                    </div>

                                    {/* Subitems List */}
                                    {division && (
                                        <ul className="pl-8 text-gray-700 text-sm">
                                            {division.map(({ _id, division_name }) => (
                                                <li key={_id} className="flex items-center gap-2 py-2">
                                                    <input
                                                        type="checkbox"
                                                        name={division_name}
                                                        id={`subitem-${_id}`}
                                                        className="size-3"
                                                    />
                                                    <label
                                                        htmlFor={`subitem-${_id}`}
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
        </div>
    )
}

export default FilterIcon;
