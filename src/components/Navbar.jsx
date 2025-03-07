import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts, setSelectedCategory } from "../store/ProductSlice";
import { NavLink } from "react-router-dom";
import TodayRate from "./TodayRate";

const Navbar = () => {
    const dispatch = useDispatch();
    const productList = useSelector(selectAllProducts);

    // Get active index from sessionStorage (default to 0 if not set)
    const getActiveIndex = Number(sessionStorage.getItem('activeIndex')) || 0;
    const [activeNav, setActiveNav] = useState(getActiveIndex);

    useEffect(() => {
        sessionStorage.setItem("activeIndex", activeNav);
    }, [activeNav]);

    // Create navigation list
    const navigations = [
        { id: 1, category: "Home", to: "/" },
        ...productList.map(({ _id, category_name }) => ({
            id: _id,
            category: category_name,
            to: "/products",
        })),
    ];

    // Sticky Navbar Logic
    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`w-full py-3 transition-all duration-300 ${isSticky ? "fixed top-0 left-0 right-0 bg-white shadow-md z-50" : "relative"}`}>
            <div className="container flex flex-col lg:flex-row items-center justify-between">
                <ul className="w-fit h-full flex items-center gap-5 font-mainFont1 text-sm lg:text-xl">
                    {navigations.map(({ id, category, to }, index) => (
                        <li key={id} 
                            onClick={() => {
                                window.scrollTo(0, 0);
                                setActiveNav(index);
                            }} 
                            className={`${index === activeNav ? "text-themeRed" : ""}`}>
                            <NavLink onClick={() => dispatch(setSelectedCategory(id))} to={to}>
                                {category}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <TodayRate />
            </div>
        </nav>
    );
};

export default Navbar;
