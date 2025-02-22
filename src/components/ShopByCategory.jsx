import { useSelector } from "react-redux"
import { selectAllCategory, selectStoreImg } from "../store/shopByCategorySlice"
import { useNavigate } from "react-router-dom";

const ShopByCategory = ()=>{
    const navigate = useNavigate();
    const storeImgs = useSelector(selectStoreImg);
    const categorys = useSelector(selectAllCategory);
    return(
        <section className="w-full h-full py-3 relative">
            <div className="w-full h-full grid grid-cols-4">
            {
                storeImgs.map(({id,img})=>{
                    return <img key={id} src={img} alt={id}  className="w-full h-full object-cover"/>
                })
            }
            </div>
            <div className="lg:px-[7.5rem] absolute top-14 sm:top-16 lg:top-36">
                <div className=" bg-white px-2 lg:px-10 py-2 lg:py-5 rounded-none lg:rounded-xl font-mainFont1 shadow-sm shadow-black/40 ">
                    <div className="pb-2">
                        <h2 className="text-sm md:text-lg lg:text-xl text-themeRed font-semibold">Shop by Category</h2>
                    </div>
                    <div className="w-full h-fit grid grid-cols-7 gap-1 lg:gap-5">
                    {
                        categorys.map(({id,category,img})=>{
                            return <div onClick={()=>{navigate('/products');window.scrollTo(0,0)}} key={id} className="w-full h-full">
                                    <div className="cursor-pointer w-full h-fit rounded-xl shadow-sm shadow-black/30 border border-black/10">
                                        <img src={img} alt={category} className="w-full h-full object-cover rounded-xl hover:scale-105 transition-all duration-500"/>
                                    </div>
                                    <div className="text-center pt-2 text-[8px] lg:text-[16px] text-gray-800 font-semibold font-sans">
                                        <h2>{category}</h2>
                                    </div>
                                </div>
                        })
                    }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShopByCategory;