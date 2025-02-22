import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts } from "../../store/ProductSlice";
import adminImg from "../../assets/Admin/adminImage.jpg";
import logoImg from "../../assets/Admin/logo.png";
import {changeActive} from "../../store/AdminStore/ActiveSideBarData"
import { ContextProvide } from "../../ContextApi";

function CategoryAdmin() {
  const { setDisplayRender } = useContext(ContextProvide)
  const category = useSelector((state) => state.sideBar);
  const active = useSelector((state) => state.activeSideBar);
  const dispatch=useDispatch();

const handleClick=(data)=>{
  
      dispatch(changeActive(data))
}

  return (
    <>
      <div className="sticky top-0 w-full">
        <div className="h-screen border bg-[#380200] ">
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
                <div className={`${active == data ? "text-[#c39e41] bg-themeRed/50" : "text-[#faf9ff]" } flex flex-wrap  items-center py-4 pl-4`} onClick={(e)=>{
                  setDisplayRender(true);
                  handleClick(data);}}>
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
