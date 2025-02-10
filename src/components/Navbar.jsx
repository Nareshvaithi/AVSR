import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllNavigations } from "../features/headerSlice";
import { NavLink } from "react-router-dom";
import TodayRate from "./TodayRate";

const Navbar = () => {
    const navigations = useSelector(selectAllNavigations);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`w-full py-3 flex items-center justify-around transition-all duration-300 ${
            isSticky ? "fixed top-0 left-0 bg-white shadow-md" : "relative"
        }`}>
            <ul className="w-fit h-full flex items-center gap-5 font-mainFont1 text-xl">
                {navigations.map(({ id, title }) => (
                    <li key={id}>
                        <NavLink>{title}</NavLink>
                    </li>
                ))}
            </ul>
            <TodayRate />
        </nav>
    );
};

export default Navbar;
