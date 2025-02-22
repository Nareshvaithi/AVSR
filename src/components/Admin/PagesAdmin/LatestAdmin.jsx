import React, { useState } from "react";
import { useContext } from "react";
import { ContextProvide } from "../../../ContextApi";
import { useDispatch, useSelector } from "react-redux";
import LatestCollectionsForm from "../Forms/LatestCollectionsForm";
import { deleteLatest, deletestatus } from "../../../store/latestCollectionSlice";
import LatestCollectionsEditForm from "../EditForms/LatestCollectionsEditForm";


function LatestAdmin() {
  const dispatch=useDispatch()
  const buttonValue=useSelector(deletestatus)
  const [notify, setNotify] = useState(false);
  const [match, setMatch] = useState("");
  const {
    display, setDisplay, details, setDetails,displayDetails, setDisplayDetails,displayEdit, setDisplayEdit,editFormData,setEditFormData,rateDetails,setRateDetails,editLatest, setEditLatest,editLatestData, setEditLatestData
   } = useContext(ContextProvide);
  const latestData = useSelector((state) => state.latestCollections.latest|| []);

  const handleDelete =  (id) => {
    dispatch(deleteLatest(id))
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4 ">
        {latestData.map((value) => {
          return (
            <>
              <div className="border flex gap-4 shadow-lg  items-start py-4">
                <div className=" px-4 mb-6">
                  <div className="w-80 mb-6 border shadow-lg">
                    <img src={value.url?.[0]} alt="" className="w-full h-full" />
                  </div>
                  <div className="flex gap-2 flex-wrap ">
                    {value.url.map((image) => {
                      return (
                        <>
                          <div className="w-20 border p-2 shadow-md">
                            <img src={image} alt="" />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="px-1 relative ">
                <div className="absolute  bottom-20">
                                <div
                                  className={`${
                                    match == value._id && notify
                                      ? "block"
                                      : "hidden"
                                  } shadow-xl p-4  bg-white`}
                                >
                                  <p>
                                    Are you sure you want to delete this product
                                  </p>
                                  <div
                                    className={` flex justify-center items-center gap-4 mt-4 text-white`}
                                  >
                                    <p
                                      className="border px-3 bg-red-800 rounded-md py-1"
                                      onClick={() => {
                                        setNotify(false);
                                      }}
                                    >
                                      No
                                    </p>
                                    <p
                                      className="border px-3 bg-green-800 rounded-md py-1"
                                      onClick={() => {
                                        handleDelete(value._id);
                                        setNotify(false);
                                      }}
                                    >
                                      Yes
                                    </p>
                                  </div>
                                </div>
                              </div>

                  <p className="">Category name - <span className="text-xl font-semibold">{value.category_name}</span></p>
                  <p className="py-1">Varity name - <span className="text-xl font-semibold">{value.varity_name}</span></p>
                  <p className="py-1">Product name - <span className="text-xl font-semibold">{value.product_name}</span></p>
                  <p className="py-1">Product Code - <span className="text-xl font-semibold">{value.product_code}</span></p>
                  <p className="py-1">Purity - <span className="text-xl font-semibold">{value.purity}</span></p>
                  <p className="py-1">Weight - <span className="text-xl font-semibold">{value.weight}</span></p>
                  <p className="py-1">MRP - <span className="text-xl font-semibold">{value.mrp}</span></p>
                  <p className="py-1">Price - <span className="text-xl font-semibold">{value.price}</span></p>
                  <p className="py-1">Offer - <span className="text-xl font-semibold">{value.offer}</span></p>
                  <p className="py-1">discount - <span className="text-xl font-semibold">{value.discount}</span></p>
                  <div className="flex gap-4 items-center mt-4">
                  <p className="border px-2 py-1 text-white rounded-md bg-green-800" onClick={()=>{
                    setEditLatest(true)
                    setEditLatestData({
                      _id:value._id,
                      category_name:value.category_name,
                      varity_name:value.varity_name,
                      product_name:value.product_name,
                      product_code:value.product_code,
                      purity:value.purity,
                      weight:value.weight,
                      mrp:value.mrp,
                      Metal:value.Metal,
                      price:value.price,
                      offer:value.offer,
                      discount:value.discount,
                      images:value.images
                    })
                  }
                  }>Edit</p>
                  <div className="relative ">
                  <p className="border px-2 py-1 text-white rounded-md bg-red-800" 
                  onClick={()=>{
                    setNotify(true);
                    setMatch(value._id);
                  }}>Delete</p>
                              </div>

                </div>
                </div>
              </div>
            </>
          );
        })}
        <div className={`${display ? "block" : "hidden"} absolute top-28  text-nowrap w-full left-28 `}>
      <LatestCollectionsForm />
    </div>

    <div className={`${editLatest ? "block":"hidden"} absolute top-28  text-nowrap w-full left-28`}>
        <LatestCollectionsEditForm />
      </div>

      </div>
    </>
  );
}

export default LatestAdmin;
