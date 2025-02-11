import { useSelector } from "react-redux";
import { selectHeaderLogo } from "../features/headerSlice";
import Navbar from "./Navbar";

const Header = () => {
    const logo = useSelector(selectHeaderLogo);
    
    return (
        <header className="w-full h-full">
            <div className="relative w-full h-full">
                <img src={logo} alt="AVSR Saravana Jewellery" className="w-full h-full object-cover" />
                
                {/* Search Bar */}
                <div className="static mt-2 lg:absolute bottom-7 z-10 w-full sm:w-3/5 lg:w-2/6 bg-white px-3 py-2 sm:p-1 rounded-full font-mainFont1 shadow-md mx-auto right-10">
                    <div className="flex items-center justify-between">
                        <input 
                            type="search" 
                            placeholder="What are you looking for?" 
                            className="w-full px-2 md:px-3 py-1 md:py-2 outline-none text-sm sm:text-lg placeholder:text-gray-500 rounded-l-full"
                        />
                        <button className="px-4 sm:px-6 py-1 sm:py-2 bg-themeRed text-white rounded-full">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Navbar */}
            <Navbar />
        </header>
    );
};

export default Header;
