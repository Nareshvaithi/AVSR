import { useSelector } from "react-redux";
import { getGoldRate, getSliverRate } from "../store/todayRateSlice";

const TodayRate = ()=>{
    const goldRate = useSelector(getGoldRate);
    const silverRate = useSelector(getSliverRate);
   
    return(
        <div className="flex items-center gap-2 font-mainFont1 text-[10px] lg:text-lg font-semibold">
            <h2>TODAY'S RATE <span className="text-themeRed">:</span></h2>
            <p className="text-green-500 text-nowrap">Gold 22K / Rs.{goldRate}/gram</p>
            <div className="w-[1px] h-2 lg:h-4 bg-themeRed"></div>
            <p className="text-gray-700 text-nowrap">Silver / Rs.{silverRate}/gram</p>
        </div>
    )
}

export default TodayRate;