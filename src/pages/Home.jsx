import FrontBanner from "../components/FrontBanner";
import HomeAddBanners from "../components/HomeAddBanners";
import LatestCollections from "../components/LatestCollections";
import StoreImgs from "../components/ShopByCategory";

const Home = ()=>{
    return(
        <section>
            <FrontBanner/>
            <StoreImgs/>
            <LatestCollections/>
            <HomeAddBanners/>
        </section>
    )
}

export default Home;