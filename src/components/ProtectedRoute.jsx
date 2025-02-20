import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import { selectLogin } from "../store/AdminStore/auth";

const ProtectedRoute = ({children})=>{
    const location = useLocation();
    const isLogin = useSelector(selectLogin);
    return isLogin ? children : <Navigate to={'/login'} state={{from:location}} replace />
}

export default ProtectedRoute;