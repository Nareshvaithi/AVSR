import React, { useEffect, useState,useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { FaRegCircleXmark } from "react-icons/fa6";
import { ContextProvide } from "../../../ContextApi";
import { useDispatch, useSelector } from "react-redux";
import {  editData, editStatus, fetchLatestCollections } from "../../../store/latestCollectionSlice";

function LatestCollectionsEditForm() {
      const dispatch=useDispatch()
          const [display, setDisplay, details, setDetails,displayDetails, setDisplayDetails,displayEdit, setDisplayEdit,editFormData,setEditFormData,rateDetails,setRateDetails,editLatest, setEditLatest,editLatestData, setEditLatestData]=useContext(ContextProvide)
      const buttonValue=useSelector(editStatus)
  const feilds = [
    { label: "varity_name", value: "" },
    { label: "product_name", value: "" },
    { label: "product_code", value: "" },
    { label: "purity", value: "" },
    { label: "Metal", value: "" },
    { label: "weight", value: "" },
    { label: "price", value: "" },
    { label: "offer", value: "" },
    { label: "discount", value: "" },
    { label: "mrp", value: "" },
  ];
  const [intialValue, setIntialValue] = useState({});

  const newValues = feilds.reduce((acc, { label, value }) => {
    acc[label] = "";
    return acc;
  }, {});

  useEffect(() => {
    setIntialValue({ ...newValues, category_name: "", image: [] });
  }, []);
  console.log("editLatestData",editLatestData)
  const formik = useFormik({
    initialValues: {
      category_name: editLatestData.category_name || "",
      varity_name: editLatestData.varity_name || "",
      division_name: editLatestData.division_name || "",
      product_name: editLatestData.product_name || "",
      product_code: editLatestData.product_code || "",
      purity: editLatestData.purity || "",
      Metal: editLatestData.Metal || "",
      weight: editLatestData.weight || "",
      price: editLatestData.price || "",
      offer: editLatestData.offer || "",
      discount: editLatestData.discount || "",
      mrp: editLatestData.mrp || ""
    },
    enableReinitialize: true,
    validate: (values) => {
      let error = {};
      if (!values.category_name) {
        error.category_name = "*Required*";
      }
      feilds.forEach(({ label, value }) => {
        if (!values[label]) {
          error[label] = "*Required*";
        }
      });
      return error;
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          if (key !== "image") {
            formData.append(key, values[key]);
          }
        });

      //   if (values.image && values.image.length > 0) {
      //     values.image.forEach((file, index) => {
      //       formData.append(`image`, file);
      //     });
      //   }
       
        formik.resetForm();
        setEditLatest(false)
      await dispatch(editData({ id: editLatestData._id, formData })).unwrap();
        dispatch(fetchLatestCollections())
     
      } catch (error) {
        alert(`Failed: ${error.message}`);
        console.log({ error: error.message });
      }
    },
  });
//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     formik.setFieldValue("image", Array.from(files));
//   };
  return (
    <>
      <div className={`flex justify-center items-center`}>
        <div className="w-1/2 flex justify-center items-center p-4  ">
          <div className="w-7/12 border shadow-lg  rounded-md">
            <div className="flex justify-center  text-2xl text-[#c39e41] font-semibold mb-4 bg-green-800 py-2">
              <p className="w-11/12 text-center">Latest Collections Edit Form</p>
              <p className="text-[#c39e41] text-xl" onClick={()=>{
                  setEditLatest(false)}}><FaRegCircleXmark /></p>
        </div>
            <form
              className="px-4 py-2 bg-[#f7f7f7] "
              onSubmit={formik.handleSubmit}
              method="POST"
            >
              <div className="flex justify-between items-center ">
                <p className="text-lg">Category Type : </p>
                <select
                  className="border px-3 py-1 text-lg"
                  name="category_name"
                  onChange={formik.handleChange}
                  value={formik.values.category}
                >
                  <option value="Gold">Gold</option>
                  <option value="Diamond">Diamond</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold Coins">Gold Coins</option>
                  <option value="Gifts">Gifts</option>
                  <option value="Gifts">+ Add Category</option>
                </select>
                <span style={{ color: "red" }}>
                  {formik.errors.category_name}
                </span>
              </div>
              <div className="">
                {feilds.map((value, index) => {
                  return (
                    <>
                      <div
                        className="flex justify-between items-center py-4"
                        key={index}
                      >
                        <label
                          htmlFor={value.label}
                          className="text-lg capitalize"
                        >
                          {value.label}{" "}
                        </label>
                        <input
                          type="text"
                          id={value.label}
                          name={value.label}
                          onChange={formik.handleChange}
                          value={formik.values[value.label]}
                          className="border shadow-sm w-8/12"
                        />
                      </div>
                      <p style={{ color: "red" }}>
                        {formik.errors[value.label]}
                      </p>
                    </>
                  );
                })}
              </div>
              <div>
                {/* <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                /> */}
              </div>
              <button
                type="submit"
                className="border flex justify-center w-full items-center mt-6 py-2 text-xl font-semibold bg-green-800 text-white rounded-md"
              >
                {buttonValue}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


export default LatestCollectionsEditForm