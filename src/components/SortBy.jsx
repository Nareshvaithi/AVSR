import { useSelector } from "react-redux"
import { selectSortOptions } from "../store/sortBySlice"


const SortBy = ()=>{
    const sortByOptions = useSelector(selectSortOptions);
    const selectSortType = sortByOptions.map(({id,sortby})=>{
        return <option value={id}>{sortby}</option>
    })

    return(
        <div className="flex border-2 border-gray-300 w-fit justify-between px-1 py-1">
            <p className="font-mainFont1 text-lg font-[550] text-gray-700">Sort By : </p>
            <select name="sort" id="sort" className="outline-none font-mainFont1 text-lg font-[550] text-gray-700">
                <option value="">None</option>
                {selectSortType}    
            </select>
        </div>
    )
}

export default SortBy;