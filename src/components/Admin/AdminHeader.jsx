import React, { useContext, useEffect, useState } from "react";
import adminImg from "../../assets/Admin/adminImage.jpg";
import logoImg from "../../assets/Admin/logo.png";
import { useSelector } from "react-redux";
import RateAdmin from "../Admin/PagesAdmin/RateAdmin";
import BannerHome from "../Admin/PagesAdmin/BannerHome";
import LatestAdmin from "../Admin/PagesAdmin/LatestAdmin";
import AdsAdmin from "../Admin/PagesAdmin/AdsAdmin";
import ProductsAdmin from "../Admin/PagesAdmin/ProductsAdmin";
import { GoPlusCircle } from "react-icons/go";
import { ContextProvide } from "../../ContextApi";
import Logout from "../../pages/Logout";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logout } from "../../store/AdminStore/auth";
import { changeActive } from "../../store/AdminStore/ActiveSideBarData";


function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = useSelector((state) => state.sideBar);
  const active = useSelector((state) => state.activeSideBar);
  const {display, setDisplay,details, setDetails,displayDetails, setDisplayDetails,displayEdit, setDisplayEdit,editFormData,setEditFormData,rateDetails,setRateDetails,editLatest, setEditLatest,editRate, setEditRate,editLatestData, setEditLatestData,displayRender, setDisplayRender}=useContext(ContextProvide)

  let display1
  switch (active) {
    case "Rate":
      display1 = <RateAdmin />;
      break;
    case "Home Banner":
      display1 = <BannerHome />;
      break;

    case "Latest Collections":
      display1 = <LatestAdmin />;
      break;

    case "Ads Banner":
      display1 = <AdsAdmin />;
      break;
    case "Products":
      display1 = <ProductsAdmin />;
      break;
      case "Logout":
      display1 = "Logout";
      break;
    default:
      display1 = <RateAdmin />;
  }

   const handleLogout=()=>{
      dispatch(logout());
      dispatch(changeActive("Rate"))
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
    const handleNavigate=()=>{
      setDisplayRender(false)
      dispatch(changeActive("Rate"))
     }

  return (
    <>
      <div className=" w-full h-16 flex flex-wrap justify-end  items-center pr-4">
        <div className="w-16">
          <img src={adminImg} alt="" className="w-full h-full" />
        </div>
        <p>AVSR - Admin</p>
      </div>
      <div className="flex justify-between px-4 bg-[#f7f7f7] h-16 items-center text-lg text-gray-700">
        <p>{active}</p>
        <div>Home/{active}</div>
      </div>
      <div className="sticky top-0 bg-white flex justify-between px-4 z-50 shadow-lg">
        <div className="h-20 flex items-center ">
          <div className="flex justify-between  items-center border px-4 py-2 rounded-md bg-[#c39e41] text-[#faf9ff]" onClick={()=>setDisplay(true)}>
          <GoPlusCircle />
          <p className="pl-2">Add Products</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
        <div className="flex justify-center w-full items-center   rounded-md">
          <p className="px-1">Sort By : </p>
          <div className="pl-4 ">
            <select className="border px-3 py-1" style={{ backgroundColor: '#f0f0f0' }}>
              <option value="All">All</option>
              <option value="Gold">Gold</option>
              <option value="Diamond">Diamond</option>
              <option value="Silver">Silver</option>
              <option value="Gold Coins">Gold Coins</option>
              <option value="Gifts">Gifts</option>
            </select>
          </div>
        </div>
        </div>
       
      </div>
      {<div>{display1=="Logout" ? <>
     <div className={`${displayRender ? "block" : "hidden"} flex justify-center items-center`} >
      <div className="border p-4 shadow-xl">
    <p>Are you sure you want to Logout</p>
    <div className="flex justify-center gap-6 mt-5">
      <p className=" px-4 py-1 text-white rounded-md bg-red-800" onClick={handleNavigate}>No</p>
      <p className=" px-4 py-1 text-white rounded-md bg-green-800" onClick={handleLogout}>Yes</p>
    </div>

      </div>
    </div> </>: display1  } </div>}
    </>
  );
}

export default AdminHeader;
