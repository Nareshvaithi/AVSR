import React, { useContext, useState } from 'react'
import { ContextProvide } from '../../../ContextApi';
import RateForm from '../Forms/RateForm';
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import axios from 'axios';


function RateAdmin() {
    const [notify, setNotify] = useState(false);
    const [match, setMatch] = useState("");
  
  const [
    display, setDisplay, details, setDetails,displayDetails, setDisplayDetails,displayEdit, setDisplayEdit,editFormData,setEditFormData,rateDetails,setRateDetails
    ] = useContext(ContextProvide);

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/rate/${id}`);
        alert("deleted");
      } catch (error) {
        console.log(error.message);
      }
    };
  return (
    <>
    <div className='flex gap-10 items-center p-4'>
      {
        rateDetails.map((value)=>{
          return <>
          <div className='border p-4 bg-[#7a6fbe] text-white'>
            <p className='text-xl'>* category_name : {value.category_name}</p>
            <p className='text-xl'>* Rate : {value.rate}</p>
            <p className='text-xl'>* Grams : {value.gram}gm</p>
            <div className='text-[#c39e41] text-2xl flex items-center gap-4 py-4 '>
           
            <MdEdit  className=' '/>
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

          </div>
          </>
        })
      }
      <div className={`${display ? "block":"hidden"}`}>
        <RateForm />
      </div>
    </div>
    </>
  )
}

export default RateAdmin