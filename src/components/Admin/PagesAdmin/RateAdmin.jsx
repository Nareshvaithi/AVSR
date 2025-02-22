import React, { useContext, useState } from 'react'
import { ContextProvide } from '../../../ContextApi';
import RateForm from '../Forms/RateForm';
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRate } from '../../../store/todayRateSlice';
import RateEditForm from '../EditForms/RateEditForm';

function RateAdmin() {
  const {display, setDisplay, details, setDetails,displayDetails, setDisplayDetails,displayEdit, setDisplayEdit,editFormData,setEditFormData,rateDetails,setRateDetails,editLatest, setEditLatest,editRate, setEditRate }= useContext(ContextProvide);

  const dispatch=useDispatch()
  const fetchRate=useSelector((state)=>state.todayRate.todayAllRates)
  console.log("fetchRate",fetchRate) 
    const [notify, setNotify] = useState(false);
    const [match, setMatch] = useState("");
    const handleDelete = async (id) => {
      try {
    
        await dispatch(deleteRate(id)).unwrap()
       
      } catch (error) {
        console.error("Failed to delete:", error);
       
      }
    };
  return (
    <>
    <div className='flex gap-10 items-center p-4'>
      {
        fetchRate.map((value)=>{
          
          return <>
          <div className='border p-4 bg-[#7a6fbe] text-white'>
            <p className='text-xl'>* category_name : {value.category_name}</p>
            <p className='text-xl'>* Rate : {value.rate}</p>
            <p className='text-xl'>* Grams : {value.gram}gm</p>
            <div className='text-[#c39e41] text-2xl flex items-center gap-4 py-4 '>
          
            <MdEdit  className=' ' onClick={()=>{
              setEditFormData({
                category_name:value.category_name,
                rate:value.rate,
                gram:value.gram,
                _id:value._id,
              })
              setEditRate(true)}}/>
            <FaTrash className=' ' onClick={()=>{
              setNotify(true);
              setMatch(value._id);
            }} />
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
                                      className="border px-2 bg-red-800 rounded-md py-1"
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

          </div>
          </>
        })
      }
      <div className={`${display ? "block":"hidden"}`}>
        <RateForm />
      </div>

      <div className={`${editRate ? "block":"hidden"}`}>
        <RateEditForm />
      </div>
    </div>
    </>
  )
}

export default RateAdmin