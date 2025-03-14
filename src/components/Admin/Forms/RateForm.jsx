import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext ,useState} from 'react'
import { ContextProvide } from '../../../ContextApi';
import { FaRegCircleXmark } from "react-icons/fa6";
import { addRate,addstatus,fetchTodayRate} from '../../../store/todayRateSlice';
import { useDispatch, useSelector } from 'react-redux';

function RateForm() {
  const dispatch=useDispatch()
  const addButtonValue=useSelector(addstatus)
      const {
          display, setDisplay, details, setDetails,displayDetails, setDisplayDetails,displayEdit, setDisplayEdit,editFormData,setEditFormData,rateDetails,setRateDetails
        } = useContext(ContextProvide);
      const [intialValue, setIntialValue] = useState({});
const feilds=[
      {id:1,label:"category_name"},
      {id:2,label:"rate"},
      {id:3,label:"gram"},
]


const formik=useFormik({
      initialValues:feilds.reduce((acc, { label, value }) => {
            acc[label] = "";
            return acc;
          }, {}),
      enableReinitialize: true,
      validate: (values) => {
            let error = {};
            feilds.forEach(({ label, value }) => {
              if (!values[label]) {
                error[label] = "*Required*";
              }
            });
            return error;
          },
          onSubmit: async (values) => {
            
            try {
              formik.resetForm();
              
              await dispatch(addRate(values)).unwrap();
              await dispatch(fetchTodayRate())
            
            } catch (error) {
             
              console.log({ error: error.message });
            }
          },
})

  return (
    <div className='absolute left-1/2'>

      <div className=''>
            <div className='flex justify-center items-center bg-green-800 p-4 text-xl text-white relative'>
                  <p>Rate Updation Form</p>
                  <span className='absolute right-1 text-2xl top-1 ' onClick={()=>{
                    
                    setDisplay(!display)}}><FaRegCircleXmark />
                  </span>
            </div>
            <form onSubmit={formik.handleSubmit} className='bg-slate-50'>
            <div>
                {feilds.map((value)=>{
                  return <>
                  <div className='flex justify-between gap-4 p-4'>
                  <label htmlFor={value.label} className='capitalize'>{value.label} : </label>
                  <input type="text" name={value.label} id={value.label} value={formik.values[value.label]} onChange={formik.handleChange} className='border'/>
                  {formik.errors[value.label] && (
              <span className="text-red-500 text-sm">
                {formik.errors[value.label]}
              </span>
            )}
                  </div>
                  </>
                })}
            </div>
            <div className='flex justify-center bg-green-800 py-2 text-white text-xl'>
                  <button type='submit'>{addButtonValue}</button>
            </div>
            </form>
      </div>
    </div>
  )
}

export default RateForm