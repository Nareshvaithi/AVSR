import { useState } from "react";
import ReactPlayer from "react-player";
import BreadCrumb from "./BreadCrumb";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSocialMedia } from "../store/footerSlice";
import IGI_Logo from "../assets/Images/products/IGI-logo.jpg";
import BIS_Logo from "../assets/Images/products/BIS-logo.jpg";

const ShowProductDetails = () => {
    const [imgViewIndex, setImgViewIndex] = useState(0);
    const location = useLocation();
    const socialMedia = useSelector(selectSocialMedia);
    const whatsapp = socialMedia.find(({ name }) => name === "WhatsApp");

    // Debugging: Log location state
    console.log("Location state:", location.state);

    // Fallback if state is missing
    if (!location.state) {
        return <div className="text-center text-gray-500 w-full h-full my-auto">No product details found.</div>;
    }

    const {
        division_name,
        product_code,
        product_name,
        images,
        purity,
        weight,
        offer,
        discount,
        mrp,
        _id,
        metal,
    } = location.state;

    // Function to check if a file is a video
    const isVideo = (url) => {
        return url.endsWith(".mp4");
    };

    return (
        <div className="w-full h-full">
            <div className="py-5 bg-gray-200 px-5">
                <div>
                    <BreadCrumb />
                </div>
                <div className="pt-2">
                    <h1 className="text-2xl font-semibold text-gray-800 font-mainFont1">{division_name}</h1>
                    <div className="pt-10 flex flex-col lg:flex-row items-start gap-5">
                        {/* Main Image/Video Display */}
                        <div className="w-full lg:w-[300px] h-full">
                            {isVideo(images[imgViewIndex]) ? (
                                <ReactPlayer
                                    url={images[imgViewIndex]}
                                    playing={true}
                                    loop={true}
                                    muted={true}
                                    controls={false}
                                    width="100%"
                                    height="100%"
                                    className="w-full h-full object-contain bg-white"
                                />
                            ) : (
                                <img src={images[imgViewIndex]} alt="" className="w-full h-full object-contain bg-white" />
                            )}
                            {/* Thumbnail Gallery */}
                            <div className="flex mt-2 gap-2">
                                {images.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setImgViewIndex(index)}
                                        className={`w-20 h-20 border ${index === imgViewIndex && "border-themeRed"}`}
                                    >
                                        {isVideo(item) ? (
                                            <ReactPlayer
                                                url={item}
                                                playing={false}
                                                loop={false}
                                                muted={true}
                                                controls={false}
                                                width="100%"
                                                height="100%"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <img src={item} alt="" className="w-full h-full object-cover" />
                                        )}
                                    
                                    </div>
                                    
                                ))}
                               
                            </div>
                        </div>
                        {/* Product Details */}
                        <div className="w-fit h-full">
                            <h3 className="text-2xl font-mainFont1 font-semibold">{product_name}</h3>
                            <h4 className="text-sm font-mainFont1 font-semibold">Product Code {product_code}</h4>
                            <div className="flex gap-3 items-center py-3 flex-wrap">
                                <span className="text-xl font-bold text-gray-800">₹ {mrp}</span>
                                <span className="text-xl text-gray-500 font-semibold font-mainFont1">₹ {discount}</span>
                                <span className="text-themeRed text-2xl">({offer}% off)</span>
                            </div>
                            <div className="min-w-full text-nowrap">
                                <table className="min-w-full border border-gray-400">
                                    <thead>
                                        <tr className="text-white bg-green-800 font-mainFont1 text-sm md:text-base">
                                            <td colSpan={4} className="py-2 px-2 md:px-5">Product info</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="font-mainFont1 text-gray-800 text-xs md:text-lg">
                                            <td className="py-3 px-2 md:px-5">Product code</td>
                                            <td className="py-3 px-2 md:px-5">Purity</td>
                                            <td className="py-3 px-2 md:px-5">Metal</td>
                                            <td className="py-3 px-2 md:px-5">Weight</td>
                                        </tr>
                                        <tr className="border-t border-gray-400 font-semibold text-gray-800 font-mainFont1 text-xs md:text-base">
                                            <td className="py-3 px-2 md:px-5">{product_code}</td>
                                            <td className="py-3 px-2 md:px-5">{purity}</td>
                                            <td className="py-3 px-2 md:px-5">{metal}</td>
                                            <td className="py-3 px-2 md:px-5">{weight}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-fit px-5 py-3 border border-gray-400 mt-5 text-sm font-semibold">
                                <div className="flex items-center gap-3 font-mainFont1">
                                    <p>Have Questions? Whatsapp</p>
                                    <div className="flex items-center gap-2">
                                        <img src={whatsapp.icon} className="w-7 inline-block" alt="" /> <span>+91 7358510137</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 font-sans py-5">
                                    <div className="flex items-center gap-2">
                                        <img className="w-10" src={BIS_Logo} alt="" />
                                        <span>BSI Hallmark Jewellery</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <img className="w-10" src={IGI_Logo} alt="" />
                                        <span>IGI Certified</span>
                                    </div>
                                </div>
                                <div className="flex items-center font-sans gap-2">
                                    <span>share</span>
                                    <div className="flex items-center gap-2">
                                        {socialMedia.map(({ id, icon, name, link }) => (
                                            <div key={id} title={name} className="w-7">
                                                <img src={icon} alt="" className="w-full h-full" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 
                </div>
            </div>
        </div>
    );
};

export default ShowProductDetails;