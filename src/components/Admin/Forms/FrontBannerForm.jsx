import { useFormik } from "formik";
import { FaRegCircleXmark } from "react-icons/fa6";
import React, { useContext, useState } from "react";
import { ContextProvide } from "../../../ContextApi";
import { IoCloudUploadOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addBanner } from "../../../store/frontBannerSlice";

function FrontBannerForm() {
  const dispatch = useDispatch();
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
    onSubmit: (values) => {
      console.log("Uploaded File:", values.image);
      const formData = new FormData();
      formData.append("image", values.image);
      dispatch(addBanner(formData)).then(() => {
            
          });
          if (document.getElementById("image")) {
            document.getElementById("image").value = "";
          }
    },
  });

  return (
    <>
      <div className="absolute left-1/2">
        <div className="">
          <div className="flex justify-center items-center bg-green-800 p-4 text-xl text-white relative">
            <p>Banner Upload</p>
            <span
              className="absolute right-1 text-2xl top-1 "
              onClick={() => setDisplay(false)}
            >
              <FaRegCircleXmark />
            </span>
          </div>
          <form onSubmit={formik.handleSubmit} className="bg-slate-50">
            <label htmlFor="image" className="capitalize"></label>
            <div className="">
              <input
                type="file"
                name="image"
                id="image"
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
                className="px-4 py-2"
                accept="image/*"
              />
              {formik.errors.image && (
                <p className="text-red-500 text-sm px-4">
                  {formik.errors.image}
                </p>
              )}
            </div>
            <div className="flex justify-center bg-green-800 py-2 text-white text-xl">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FrontBannerForm;
