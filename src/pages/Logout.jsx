import { useEffect,useContext } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/AdminStore/auth";
import { useNavigate } from "react-router-dom";
import { ContextProvide } from "../ContextApi";
import RateAdmin from "../components/Admin/PagesAdmin/RateAdmin";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [display, setDisplay, details, setDetails,displayDetails, setDisplayDetails,displayEdit, setDisplayEdit,editFormData,setEditFormData,rateDetails,setRateDetails,editLatest, setEditLatest,editRate, setEditRate,editLatestData, setEditLatestData,displayRender, setDisplayRender]=useContext(ContextProvide)

  const handleLogout=()=>{
    dispatch(logout()); 
    setTimeout(() => {
      navigate("/login"); 
    }, 500);
  }
 
  const handleNavigate=()=>{
   setDisplayRender(<RateAdmin />)
  }

  return (
    <div className="flex justify-center items-center ">
      <div className="border p-4 shadow-xl">
    <p>Are you sure you want to Logout</p>
    <div className="flex justify-center gap-6 mt-5">
      <p className=" px-4 py-1 text-white rounded-md bg-red-800" onClick={handleNavigate}>No</p>
      <p className=" px-4 py-1 text-white rounded-md bg-green-800" onClick={handleLogout}>Yes</p>
    </div>

      </div>
    </div>
  );
};




export default Logout