import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNavigations } from "../store/headerSlice";
import { NavLink } from "react-router-dom";
import TodayRate from "./TodayRate";
import { addBreadcrumb, setActiveItem } from "../store/filterProductSlice";
const Navbar = () => {
    const navigations = useSelector(selectAllNavigations);
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
    const handlenavigation = (id)=>{
        dispatch(addBreadcrumb(id));
        dispatch(setActiveItem(id));
    }
    return (
        <nav 
            className={`w-full py-3 flex flex-col lg:flex-row items-center justify-around transition-all duration-300 
                ${isSticky ? "fixed top-0 left-0 w-full bg-white shadow-md z-50" : "relative"}`}
        >
            <ul className="w-fit h-full flex items-center gap-5 font-mainFont1 text-sm lg:text-xl">
                {navigations.map(({ id, title, link }) => (
                    <li key={id} onClick={()=>handlenavigation(id)}>
                        <NavLink to={link}>{title}</NavLink>
                    </li>
                ))}
            </ul>
            <TodayRate />
        </nav>
    );
};

export default Navbar;
