import { useSelector } from "react-redux";
import { getGoldRate, getSliverRate } from "../features/todayRateSlice";

const TodayRate = ()=>{
    const goldRate = useSelector(getGoldRate);
    const silverRate = useSelector(getSliverRate);
   
    return(
        <div className="flex items-center gap-2 font-mainFont1 text-lg font-semibold">
            <h2>TODAY'S RATE <span className="text-themeRed">:</span></h2>
            <p className="text-green-500">Gold 22K / Rs.{goldRate}/gram</p>
            <div className="w-[1px] h-4 bg-themeRed"></div>
            <p className="text-gray-700">Silver / Rs.{silverRate}/gram</p>
        </div>
    )
}

export default TodayRate;