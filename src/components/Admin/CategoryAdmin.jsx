import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts } from "../../store/ProductSlice";
import adminImg from "../../assets/Admin/adminImage.jpg";
import logoImg from "../../assets/Admin/logo.png";
import {changeActive} from "../../store/AdminStore/ActiveSideBarData"


function CategoryAdmin() {
  const category = useSelector((state) => state.sideBar);
  const active = useSelector((state) => state.activeSideBar);
  const dispatch=useDispatch()
const handleClick=(data)=>{
  
      dispatch(changeActive(data))
}

  return (
    <>
      <div className="  w-full">
        <div className="h-screen border bg-[#7a6fbe] ">
          <div className="flex  items-center mt-4">
            <div className="w-20">
              <img
                src={logoImg}
                className="w-full h-auto object-cover rounded-full"
                alt=""
              />
            </div>
            <p className="text-[#faf9ff] ml-2 ">AVSR Saravana</p>
          </div>

          <div className=" mt-10 ">
            {category.map(({ data, icon }, index) => {
              return (
                <div className={`${active == data ? "text-gray-900 bg-black/20" : "text-[#faf9ff]" } flex flex-wrap  items-center py-4 pl-4`} onClick={(e)=>handleClick(data)}>
                  <p className=" pr-2 text-lg" key={index}>
                    {icon}
                  </p>
                  <p key={data} className=" text-lg" >
                  
                    {data}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryAdmin;
