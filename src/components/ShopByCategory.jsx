import { useSelector } from "react-redux"
import { selectAllCategory, selectStoreImg } from "../features/shopByCategorySlice"

const ShopByCategory = ()=>{
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
            <div className="w-full h-full container absolute top-1/2">
                <div className="bg-white px-10 py-5 rounded-xl font-mainFont1 shadow-sm shadow-black/40">
                    <div className="pb-2">
                        <h2 className="text-xl text-themeRed font-semibold">Shop by Category</h2>
                    </div>
                    <div className="w-full h-fit flex justify-between gap-5">
                    {
                        categorys.map(({id,category,img})=>{
                            return <div className="w-full h-full">
                                    <div key={id} className="cursor-pointer w-full h-full rounded-xl shadow-sm shadow-black/30 border border-black/10">
                                        <img src={img} alt={category} className="w-full h-full object-cover rounded-xl"/>
                                    </div>
                                    <div className="text-center pt-2 text-[16px] text-gray-800 font-semibold font-sans">
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

export default ShopByCategory