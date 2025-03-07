
import { useDispatch, useSelector,shallowEqual } from 'react-redux'
import { FaTrash } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import React, { useContext, useState } from 'react'
import { ContextProvide } from '../../../ContextApi';

import {deleteHomeAds} from "../../../store/bannerSlice";
import AdsBannerForm from '../Forms/AdsBannerForm';


function AdsAdmin() {
  const [notify, setNotify] = useState(false);
  const [match, setMatch] = useState("");
  const {
    display, setDisplay, details, setDetails,displayDetails, setDisplayDetails,displayEdit, setDisplayEdit,editFormData,setEditFormData,rateDetails,setRateDetails
  } = useContext(ContextProvide);

  

  const dispatch=useDispatch()
  const frontBanner = useSelector((state) => state.banners.addsBanners,shallowEqual);
  console.log(frontBanner)
const handleDelete =  (id) => {
  console.log(id)
  dispatch(deleteHomeAds(id))
};

  return (
    <>
    <div>
    <div className='flex justify-start gap-5 p-4 flex-wrap'>
    {
      frontBanner.map((value)=>{
        
        return <>
        <div className='relative p-4 w-96'>

          <img src={value.url} alt="" className='w-full h-full'/>
          <p className='absolute top-1 right-1 text-2xl text-gray-700'onClick={()=>{
              setNotify(true);
              setMatch(value._id);
            }} ><FaRegCircleXmark />

          </p>

          <div className="absolute  top-1/2 left-1/2">
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

        </div>
        </>
      })
    }

    </div>
    <div className={`${display ? "block" : "hidden"}`}>
      <AdsBannerForm />
    </div>
    </div>
    </>
  )
}

export default AdsAdmin