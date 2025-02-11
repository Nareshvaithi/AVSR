import {BsArrowRight} from "react-icons/bs";
const SubscribeInput = ()=>{
    return(
        <div>
            <label htmlFor="subscribe" className="text-[12px] font-bold">Subscribe & be the First to Shine with Our Sparking Offers!</label>
            <div className="flex items-center border justify-between border-black w-full h-full mt-2">
                <input type="text" name="subscribe" id="subscribe"  className="w-full h-full outline-none px-2 font-sans"/>
                <button className="px-3 bg-themeRed w-fit py-2 text-white text-2xl"><BsArrowRight/></button>
            </div>
        </div>
    )
}

export default SubscribeInput;