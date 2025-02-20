import { useSelector } from "react-redux";
import { selectFrontBanner, selectFrontBannerStatus } from "../store/frontBannerSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const FrontBanner = () => {
    const frontBanners = useSelector(selectFrontBanner) || []; // Ensure it's an array
    const status = useSelector(selectFrontBannerStatus);

    const fallback = <div className="text-center text-2xl text-themeRed py-5">Loading...</div>;

    return (
        <>
            {status === "loading" && fallback}
            {status === "succeeded" && (
                <section className="w-full h-full relative overflow-hidden group">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        className="w-full h-full"
                        slidesPerView={1}
                        loop={true}
                        speed={1500}
                        autoplay={{
                            delay: 3000,
                        }}
                        navigation={{
                            nextEl: ".front-next",
                            prevEl: ".front-prev",
                        }}
                        pagination={{
                            clickable: true,
                            el: ".front-pagination",
                            bulletClass: "front-bullets",
                            bulletActiveClass: "front-active-bullets",
                        }}
                    >
                        {frontBanners.map(({ _id, filename, url }) => (
                            <SwiperSlide key={_id} className="w-full h-full">
                                <img src={url} alt={filename} title={filename} className="w-full h-full object-contain" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="w-full h-full front-pagination flex items-center justify-center gap-2 py-3"></div>
                    <div className="cursor-pointer h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 absolute z-10 right-5 top-1/2 front-next text-white text-3xl">
                        <RiArrowRightWideLine />
                    </div>
                    <div className="cursor-pointer h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 absolute z-10 left-5 top-1/2 front-prev text-white text-3xl">
                        <RiArrowLeftWideLine />
                    </div>
                </section>
            )}
        </>
    );
};

export default FrontBanner;
