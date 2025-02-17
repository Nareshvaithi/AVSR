import { useSelector } from "react-redux";
import { selectBreadcrumb } from "../store/ProductSlice";

const BreadCrumb = ()=>{
    const breadcrumb = useSelector(selectBreadcrumb);
    return <h2 className="w-full md:w-fit font-mainFont1 text-sm lg:text-lg font-[550] text-gray-800">{breadcrumb}</h2>
}

export default BreadCrumb;