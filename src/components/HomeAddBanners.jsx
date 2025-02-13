import { useSelector } from "react-redux"
import { selectAddsBanners } from "../store/bannerSlice"
import Banners from "./Banner";

const HomeAddBanners = ()=>{
    const addsBanners = useSelector(selectAddsBanners);
    return (
        <section className="py-5">
            <div className="container grid grid-cols-2 gap-5">
                {
                    addsBanners.map(({id,name,img})=>{
                        return <Banners key={id} name={name} img={img} rounded={true}/>
                    })
                }
            </div>
        </section>
    )
}

export default HomeAddBanners;