import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNavigations } from "../store/headerSlice";
import { NavLink } from "react-router-dom";
import TodayRate from "./TodayRate";
import { fetchProducts, selectAllProducts, setSelectedCategory } from "../store/ProductSlice";

// import { setActiveItem } from "../store/ProductSlice";
// import { addBreadcrumb, setActiveItem } from "../store/ProductSlice";
const Navbar = () => {
    const navigations = [];
    const productList = useSelector(selectAllProducts);
    const productnav = productList.map(({_id,category_name})=>{
        navigations.push({id:_id,category:category_name,to:"/products"})
    })
    console.log(navigations);
    const [isSticky, setIsSticky] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    // const handlenavigation = (id)=>{
    //     // dispatch(addBreadcrumb(id));
    //     // dispatch(setActiveItem(id));
    // }
    // onClick={()=>handlenavigation(id)}
    return (
        <nav 
            className={`w-full py-3 transition-all duration-300 ${isSticky ? "fixed top-0 left-0 right-0 w-full bg-white shadow-md z-50" : "relative"}`}>
            <div className="container flex flex-col lg:flex-row items-center justify-between">
            <ul className="w-fit h-full flex items-center gap-5 font-mainFont1 text-sm lg:text-xl">
                <li onClick={()=>{window.scrollTo(0,0)}}><NavLink to={"/"}>Home</NavLink></li>
                {navigations.map(({ id, category, to }) => (
                    <li key={id} onClick={()=>{window.scrollTo(0,0)}}>
                        <NavLink onClick={()=>{dispatch(setSelectedCategory(id))}} to={to}>{category}</NavLink>
                    </li>
                ))}
            </ul>
            <TodayRate />
            </div>
        </nav>
    );
};

export default Navbar;
