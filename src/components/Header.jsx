import { useDispatch, useSelector } from "react-redux";
import { selectHeaderLogo } from "../store/headerSlice";
import Navbar from "./Navbar";
import { useState } from "react";
import { selectAllProducts, setSelectedCategory } from "../store/ProductSlice";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logo = useSelector(selectHeaderLogo);
    const productList = useSelector(selectAllProducts) || [];

    const [showSuggestion, setShowSuggestion] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter products based on search input
    const filteredProducts = productList.filter(({ category_name }) =>
        category_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (categoryId, categoryName) => {
        dispatch(setSelectedCategory(categoryId));
        navigate("/products");
        setShowSuggestion(false);
        setSearchTerm(categoryName);
    };

    const handleSearchButtonClick = () => {
        if (searchTerm.trim() === "") {
            alert("Please enter a search term.");
            return;
        }

        const matchedCategory = productList.find(({ category_name }) =>
            category_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (matchedCategory) {
            handleSearch(matchedCategory._id, matchedCategory.category_name);
        } else {
            alert("No matching category found.");
        }
    };

    return (
        <header className="w-full h-full">
            <div className="relative w-full h-full">
                <img src={logo} alt="AVSR Saravana Jewellery" className="w-full h-full object-cover" />
                
                {/* Search Bar */}
                <div className="static mt-2 lg:absolute bottom-7 z-10 w-full sm:w-3/5 lg:w-2/6 bg-white px-3 py-2 sm:p-1 rounded-full font-mainFont1 shadow-md mx-auto right-32">
                    <div className="flex items-center justify-between">
                        <input
                            type="search"
                            placeholder="What are you looking for?"
                            className="w-full px-2 md:px-3 py-1 md:py-2 outline-none text-sm sm:text-lg placeholder:text-gray-500 rounded-l-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setShowSuggestion(true)}
                            onBlur={() => setTimeout(() => setShowSuggestion(false), 200)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearchButtonClick()}
                        />
                        <button 
                            onClick={handleSearchButtonClick}
                            className="px-4 sm:px-6 py-1 sm:py-2 bg-themeRed text-white rounded-full"
                        >
                            Search
                        </button>
                    </div>
                    
                    {/* Suggestions Dropdown */}
                    {showSuggestion && filteredProducts.length > 0 && (
                        <div 
                            className="z-10 w-full py-2 px-5 bg-white mt-2 rounded-3xl absolute shadow-md"
                            onMouseDown={(e) => e.preventDefault()} // Prevents closing on click
                        >
                            {filteredProducts.map(({ _id: category_id, category_name,collections}) => (
                                <div
                                    key={category_id}
                                    onClick={() => handleSearch(category_id, category_name)}
                                    className="flex items-center gap-2 cursor-pointer py-1 hover:bg-themeRed/20 px-2 rounded-3xl"
                                >
                                    <div className="text-themeRed"><BsSearch /></div>
                                    <div>{category_name}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Navbar */}
            <Navbar />
        </header>
    );
};

export default Header;
