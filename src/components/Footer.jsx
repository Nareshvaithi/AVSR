import { useSelector } from "react-redux";
import { selectContactNo, selectfooterlinks1, selectfooterlinks2, selectFooterStoreImg, selectFooterSubTitle, selectFooterTitle, selectPaymentCards, selectSocialMedia, selectStoreSpecials } from "../store/footerSlice";
import { NavLink } from "react-router-dom";
import SubscribeInput from "./SubscribeInput";

const Footer = ()=>{
    const title = useSelector(selectFooterTitle);
    const subtitle = useSelector(selectFooterSubTitle);
    const storeImg = useSelector(selectFooterStoreImg);
    const contactNo = useSelector(selectContactNo);
    const storeSpecials = useSelector(selectStoreSpecials);
    const footerlinks1 = useSelector(selectfooterlinks1);
    const footerlinks2 = useSelector(selectfooterlinks2);
    const paymentCards = useSelector(selectPaymentCards);
    const socialMedia = useSelector(selectSocialMedia);
    return(
        <footer className="py-5">
            <div className="container">
                <div className="text-center">
                    <h2 className="headingText">{title}</h2>
                    <p className="font-mainFont1 text-lg font-[600]">{subtitle}</p>
                </div>
                <div className="w-full h-full grid grid-cols-2 gap-5 pt-10 pb-20">
                    <div className="col-span-2 md:col-span-1 w-full h-full">
                        <img src={storeImg} alt={"store image"} className="w-full h-full object-contain"/>
                    </div>
                    <div className="col-span-2 md:col-span-1 grid grid-rows-2 gap-5">
                        <div className="bg-themeRed/10 flex justify-center items-center">
                            <div className="text-center">
                                <h2 className="text-3xl font-mainFont1 font-semibold">{contactNo}</h2>
                                <p className="text-sm md:text-xl font-mainFont1">For store queries and schemes</p>
                            </div>
                        </div>
                        <div className="bg-themeRed/10 grid grid-cols-3 gap-3 px-10 py-5 items-center text-center">
                            {
                                storeSpecials.map(({id,name,img})=>{
                                    return <div key={id} title={name}>
                                        <img src={img} alt={name} />
                                        <p className="text-[10px] md:text-[14px] font-semibold">{name}</p>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="px-2 md:px-5 py-2 md:py-5 shadow-sm shadow-black/30 mb-10">
                    <div className="flex flex-col md:flex-row flex-wrap justify-between items-start md:items-center">
                        <div className="w-full lg:w-1/2 flex flex-wrap gap-5">
                            <div className="">
                                {
                                    footerlinks1.map(({id,title,link})=>{
                                        return <NavLink className={"hover:text-themeRed block py-2 font-sans text-sm font-semibold"} key={id}>{title}</NavLink>
                                    })
                                }
                            </div>
                            <div className="">
                                {
                                    footerlinks2.map(({id,title,link})=>{
                                        return <NavLink className={"hover:text-themeRed block py-2 font-sans text-sm font-semibold"} key={id}>{title}</NavLink>
                                    })
                                }
                            </div>
                        </div>
                        <div className="w-fit">
                            <SubscribeInput/>
                        </div>
                    </div>
                    <div className="w-full flex flex-wrap gap-3 md:gap-0 justify-center md:justify-between items-center pt-5">
                        <div className="w-fit flex items-center gap-3">
                            {
                                paymentCards.map(({id,name,img})=>{
                                    return <div key={id} className="w-14">
                                        <img src={img} alt={name} title={name} className="w-full h-full"/>
                                    </div>
                                })
                            }
                        </div>
                        <div className="w-fit text-sm font-semibold font-sans text-center">
                            <p>&copy; {new Date().getFullYear()} Saravana Jewellery Private Limited. All rights reserved.</p>
                        </div>
                        <div className="w-fit flex gap-3 items-center">
                            {
                                socialMedia.map(({id,name,icon})=>{
                                    return <div key={id} className="w-7">
                                        <img src={icon} alt={name} title={name} className="w-full h-full"/>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;