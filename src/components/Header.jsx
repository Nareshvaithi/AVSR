import { useSelector } from "react-redux";
import { selectHeaderLogo } from "../features/headerSlice";
import Navbar from "./Navbar";

const Header = () => {
    const logo = useSelector(selectHeaderLogo);
    
    return (
        <header className="w-full h-full">
            <div className="w-full h-full relative">
                <img src={logo} alt="AVSR Saravana Jewellery" className="w-full h-full object-cover" />
            <div className="w-2/6 h-fit absolute z-10 bg-white bottom-0 p-1 right-40 mb-8 rounded-full font-mainFont1"> 
                <div className="w-full h-full flex items-center justify-between">
                    <input type="search" placeholder="What are you looking for?" className="w-full h-full rounded-full px-5 py-2 outline-none text-xl placeholder:text-xl" />
                    <button className="px-10 py-2 bg-themeRed rounded-full text-white">Search</button>
                </div>
            </div>
            </div>
            <Navbar/>
        </header>
    );
};

export default Header;
