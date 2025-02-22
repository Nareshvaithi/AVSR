import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import { selectAuth } from "../store/AdminStore/auth";

const ProtectedRoute = ({children})=>{
    const location = useLocation();
    const isLogin = useSelector(selectAuth) || localStorage.getItem("token"); 
    return isLogin ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

export default ProtectedRoute;