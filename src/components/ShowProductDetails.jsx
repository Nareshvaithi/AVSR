import { useState } from "react";
import BreadCrumb from "./BreadCrumb";
import { useLocation } from "react-router-dom";
import { meta } from "@eslint/js";
import { useSelector } from "react-redux";
import { selectSocialMedia } from "../store/footerSlice";
const ShowProductDetails = ()=>{
    const [imgViewIndex,setImgViewIndex] = useState(0);
    const location = useLocation();
    const {
        division_name,
        product_code,
        product_name,
        images,purity,
        weight,
        offer,
        discount,
        mrp,
        _id,
        createdAt,
        metal
    } = location.state;
    const socialMedia = useSelector(selectSocialMedia);
    const whatsapp = socialMedia.find(({name})=> name === "WhatsApp");
    return <div className="w-full pl-0 lg:pl-5 bg-gray-200 mx-2 py-5">
                <div className="flex justify-between flex-wrap gap-3 items-center lg:items-start">
                    <BreadCrumb />
                </div>
                <div className="pt-2">
                    <h1 className="text-2xl font-semibold text-gray-800 font-mainFont1">{division_name}</h1>
                    <div className="pt-10 flex items-start gap-5">
                        <div className="w-[500px] h-full">
                            <img src={images[imgViewIndex]} alt="" className="w-full h-full object-contain bg-white"/>
                            <div className="flex mt-2 gap-2">
                                {
                                    images.map((item,index)=>{
                                        return <div key={index} onClick={()=>{setImgViewIndex(index)}} className={`w-20 h-20 border ${index === imgViewIndex && "border-themeRed"}`}>
                                            <img src={item} alt="" className="w-full h-full object-cover"/>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="w-full h-full">
                            <h3 className="text-2xl font-mainFont1 font-semibold">{product_name}</h3>
                            <h4 className="text-sm font-mainFont1 font-semibold">Product Code {product_code}</h4>
                            <div className="flex gap-3 items-center py-3">
                                <span className="text-xl font-bold text-gray-800">₹ {mrp}</span>
                                <span className="text-xl text-gray-500 font-semibold font-mainFont1">₹ {discount}</span>
                                <span className="text-themeRed text-2xl">({offer}%off)</span>
                            </div>
                            <div className="w-fit text-nowrap">
                                <table className="w-5/6 border border-gray-400">
                                    <thead className="">
                                        <tr className="text-white bg-green-800 font-mainFont1">
                                            <td colSpan={4} className="py-2 px-5">Product info</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="font-mainFont1 text-lg text-gray-800">
                                            <td className="py-3 px-5">Product code</td>
                                            <td className="py-3 px-5">Purity</td>
                                            <td className="py-3 px-5">Metal</td>
                                            <td className="py-3 px-5">Weight</td>
                                        </tr>
                                        <tr className="border-t border-gray-400 font-semibold text-gray-800 font-mainFont1">
                                            <td className="py-3 px-5">{product_code}</td>
                                            <td className="py-3 px-5">{purity}</td>
                                            <td className="py-3 px-5">{metal}</td>
                                            <td className="py-3 px-5">{weight}</td>
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
                                    <div>
                                        <img src="" alt="" />
                                        <span>BSI Hallmark Jewellery</span>
                                    </div>
                                    <div>
                                        <img src="" alt="" />
                                        <span>IGI Certified</span>
                                    </div>
                                </div>
                                <div className="flex items-center font-sans gap-2">
                                    <span>share</span>
                                    <div className="flex items-center gap-2">
                                        {
                                            socialMedia.map(({id,icon,name,link})=>{
                                                return <div key={id} title={name} className="w-7">
                                                    <img src={icon} alt="" className="w-full h-full"/>
                                                </div> 
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
}

export default ShowProductDetails;