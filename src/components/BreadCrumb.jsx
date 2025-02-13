import { useSelector } from "react-redux";
import { selectBreadcrumb } from "../store/filterProductSlice";

const BreadCrumb = ()=>{
    const breadcrumb = useSelector(selectBreadcrumb);
    return <h2 className="font-mainFont1 text-lg font-[550] text-gray-800">{breadcrumb}</h2>
}

export default BreadCrumb;