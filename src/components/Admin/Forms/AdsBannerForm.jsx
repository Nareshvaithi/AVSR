import { useFormik } from "formik";
import { FaRegCircleXmark } from "react-icons/fa6";
import React, { useContext, useState } from "react";
import { ContextProvide } from "../../../ContextApi";
import { IoCloudUploadOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addHomeAds,fetchAddsBanners,deleteHomeAds, addstatus} from "../../../store/bannerSlice";


function AdsBannerForm() {
  const dispatch = useDispatch();
  const buttonValue=useSelector(addstatus)
  const validationSchema = Yup.object({
    image: Yup.mixed()
      .required("Image is required")
      .test("fileSize", "File size must be less than 2MB", (value) => {
        return value && value.size <= 2 * 1024 * 1024;
      })
      .test("fileType", "Only image files are allowed", (value) => {
        return (
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        );
      }),
  });
  const [
    display,
    setDisplay,
    details,
    setDetails,
    displayDetails,
    setDisplayDetails,
    displayEdit,
    setDisplayEdit,
    editFormData,
    setEditFormData,
    rateDetails,
    setRateDetails,
  ] = useContext(ContextProvide);

  const formik = useFormik({
    initialValues: {
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Uploaded File:", values.image);
      const formData = new FormData();
      formData.append("image", values.image);
      await dispatch(addHomeAds(formData)).unwrap();
      await dispatch(fetchAddsBanners());
          if (document.getElementById("image")) {
            document.getElementById("image").value = "";
          }
    },
  });

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="border  w-1/2 shadow-xl rounded-lg">
          
          <form onSubmit={formik.handleSubmit} className="py-0 relative " >
          <span
              className="absolute right-1 text-2xl top-1 "
              onClick={() => setDisplay(false)}
            >
              <FaRegCircleXmark />
            </span>

            <label htmlFor="image" className="capitalize flex justify-center items-center py-4">
              <div className="flex flex-col justify-center items-center text-gray-700">
              <IoCloudUploadOutline size={96} />
              <p className="text-2xl">Upload Files</p>
              </div>
            </label>
            <div className="flex justify-center items-center">
              <input
                type="file"
                name="image"
                id="image"
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
                className="hidden"
                
              />
              {formik.errors.image && (
                <p className="text-red-500 text-sm px-4">
                  {formik.errors.image}
                </p>
              )}
            </div>
            <div className="flex justify-center  mt-6 text-white text-xl pb-6">
              <div className="flex justify-center bg-green-800 py-3 px-4 text-white text-xl rounded-lg"><button type="submit">{buttonValue}</button></div>
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


export default AdsBannerForm