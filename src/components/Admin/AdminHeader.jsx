import React, { useContext, useState } from "react";
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


function AdminHeader() {
  const category = useSelector((state) => state.sideBar);
  const active = useSelector((state) => state.activeSideBar);
  const [displayForm,setDisplayForm]=useContext(ContextProvide)
  console.log(displayForm)
  let display;
  switch (active) {
    case "Rate":
      display = <RateAdmin />;
      break;
    case "Home Banner":
      display = <BannerHome />;
      break;

    case "Latest Collections":
      display = <LatestAdmin />;
      break;

    case "Ads Banner":
      display = <AdsAdmin />;
      break;
    case "Products":
      display = <ProductsAdmin />;
      break;
    default:
      display = <RateAdmin />;
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
      <div className="sticky top-0 bg-white flex justify-between px-4">
        <div className="h-20 flex items-center ">
          <div className="flex justify-between  items-center border px-4 py-2 rounded-md bg-[#c39e41] text-[#faf9ff]" onClick={()=>setDisplayForm(true)}>
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
      {<div>{display}</div>}
    </>
  );
}

export default AdminHeader;
