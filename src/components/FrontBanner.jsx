import { useSelector } from "react-redux";
import { selectFrontBanner } from "../store/frontBannerSlice";
import { Swiper ,SwiperSlide } from "swiper/react";
import {Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const FrontBanner = () => {
    const frontBanners = useSelector(selectFrontBanner);
  return (
    <section className="w-full h-full">
        <Swiper
        modules={[Autoplay,Pagination]}
        className="w-full h-full"
        slidesPerView={1}
        loop={true}
        speed={1500}
        autoplay={{
          delay:3000,
        }}
        navigation={{
          enabled:true,
          nextEl:".front-next",
          prevEl:".front-prev",
        }}
        pagination={{
          clickable:true,
          el:'.front-pagination',
          bulletClass:"front-bullets",
          bulletActiveClass:"front-active-bullets"
          
        }}

        >
          {
            frontBanners.map(({id,name,img})=>{
              return <SwiperSlide key={id} className="w-full h-full">
                        <img src={img} alt={name} title={name} className="w-full h-full object-contain"/>
                    </SwiperSlide>
            })
          }
        </Swiper>
        <div className="w-full h-full front-pagination flex items-center justify-center gap-2 py-3"></div>
    </section>
  )
}

export default FrontBanner;
