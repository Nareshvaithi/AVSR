import { useSelector } from "react-redux";
import { latestCollections, latestCollectionTitle } from "../store/latestCollectionSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const LatestCollections = () => {
    const title = useSelector(latestCollectionTitle);
    const latest = useSelector(latestCollections);
    const navigate = useNavigate();
    return (
        <div className="w-full h-full pt-28 lg:pt-40 pb-5">
            <div className="w-full h-full relative">
                <div className="container w-full h-full">
                    <div>
                        <h1 className="headingText text-center">{title}</h1>
                    </div>
                    <div className="w-full h-full py-5 rounded-xl">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]} 
                            speed={600}
                            spaceBetween={40}
                            loop={true}
                            navigation={{
                                nextEl:".latest_right",
                                prevEl:".latest_left"
                            }}
                            pagination={{
                                el:".latest-pagination",
                                clickable:true,
                                bulletClass:"latest-bullets",
                                bulletActiveClass:"latest-active-bullets"
                            }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }} 
                            breakpoints={{
                                320: { slidesPerView: 1 },  // Mobile view: 1 slide
                                640: { slidesPerView: 2 },  // Tablets: 2 slides
                                1024: { slidesPerView: 3 }, // Small desktops: 3 slides
                                1280: { slidesPerView: 4 }  // Large desktops: 4 slides
                            }}
                            className="w-full h-full rounded-xl"
                        >
                            {latest.map(({ _id, product_name, url, varity_name,purity,weight,offer,discount,mrp,category_name,product_code}) => (
                                <SwiperSlide
                                title={product_name} 
                                key={_id}
                                className="cursor-pointer w-full h-full border border-themeRed rounded-xl"
                                onClick={()=>{navigate(`/products/${product_name}`,{state:{product_name,images:url,division_name:varity_name,purity,weight,offer,discount,mrp,_id,metal:category_name,product_code}});window.scrollTo(0,0)}}
                                >
                                    <img src={url && url[0]} alt={product_name} className="w-full h-auto rounded-xl" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="absolute w-full top-1/2 flex items-center justify-between px-10">
                    <div className="text-3xl latest_left text-gray-700 active:text-gray-950 cursor-pointer"><BsArrowLeft/></div>
                    <div className="text-3xl latest_right text-gray-700 active:text-gray-950 cursor-pointer"><BsArrowRight/></div>
                </div>
            </div>
            <div className="latest-pagination flex items-center justify-center gap-2"></div>
        </div>
    );
};

export default LatestCollections;
