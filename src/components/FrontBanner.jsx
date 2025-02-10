import { useSelector } from "react-redux";
import { selectFrontBanner } from "../features/frontBannerSlice";

const FrontBanner = () => {
    const BannerImg = useSelector(selectFrontBanner);
  return (
    <section className="w-full h-full">
        <img src={BannerImg} alt="" className="w-full h-full object-contain"/>
    </section>
  )
}

export default FrontBanner;
