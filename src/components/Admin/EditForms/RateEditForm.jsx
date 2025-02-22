import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ContextProvide } from "../../../ContextApi";
import { FaRegCircleXmark } from "react-icons/fa6";
import {
  addRate,
  editRateData,
  editstatus,
  fetchTodayRate,
} from "../../../store/todayRateSlice";
import { useDispatch, useSelector } from "react-redux";

function RateEditForm() {
  const [load,setLoad]=useState("Submit")
  const dispatch = useDispatch();
  const editButtonValue=useSelector(editstatus)
  const {
    display, setDisplay, details, setDetails,displayDetails, setDisplayDetails,displayEdit, setDisplayEdit,editFormData,setEditFormData,rateDetails,setRateDetails,editLatest, setEditLatest,editRate, setEditRate
  } = useContext(ContextProvide);
  console.log("editFormData",editFormData)
  const [intialValue, setIntialValue] = useState({});
  const feilds = [
    { id: 1, label: "category_name" },
    { id: 2, label: "rate" },
    { id: 3, label: "gram" },
  ];

  const formik = useFormik({
    initialValues: {
      _id: editFormData?._id || "",
      category_name: editFormData.category_name,
      rate: editFormData.rate,
      gram: editFormData.gram,
    },
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
    onSubmit: async (values,{ resetForm }) => {
      setLoad("Proccessing...")
      setDisplayEdit(false)
      try {
        if (!values._id || typeof values._id !== "string") {
          alert("Error: Missing rate ID");
          return;
        }
     
            
          
              const updatedValues = {
                ...values,
                _id: String(editFormData._id), 
              };
        
        
        await dispatch(editRateData(updatedValues)).unwrap();
         dispatch(fetchTodayRate());
         setEditRate(false)
          
      } catch (error) {
        alert(`Failed: ${error.message}`);
        console.log({ error: error.message });
      }
    },
  });

  return (
    <div className="absolute left-1/2">
      <div className="">
        <div className="flex justify-center items-center bg-green-800 p-4 text-xl text-white relative">
          <p>Rate Edit Form</p>
          <span
            className="absolute right-1 text-2xl top-1 "
            onClick={() => setEditRate(false)}
          >
            <FaRegCircleXmark />
          </span>
        </div>
        <form onSubmit={formik.handleSubmit} className="bg-slate-50">
          <div>
            {feilds.map((value) => {
              return (
                <>
                  <div className="flex justify-between gap-4 p-4">
                    <label htmlFor={value.label} className="capitalize">
                      {value.label} :{" "}
                    </label>
                    <input
                      type="text"
                      name={value.label}
                      id={value.label}
                      value={formik.values[value.label]}
                      onChange={formik.handleChange}
                      className="border"
                    />
                    {formik.errors[value.label] && (
                      <span className="text-red-500 text-sm">
                        {formik.errors[value.label]}
                      </span>
                    )}
                  </div>
                </>
              );
            })}
          </div>
          <div className="flex justify-center bg-green-800 py-2 text-white text-xl">
            <button type="submit">{editButtonValue}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RateEditForm;
