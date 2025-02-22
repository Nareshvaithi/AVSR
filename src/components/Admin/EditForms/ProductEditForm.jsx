import React, {  useContext } from "react";
import { useFormik } from "formik";

import { FaRegCircleXmark } from "react-icons/fa6";
import { ContextProvide } from "../../../ContextApi";
import { useDispatch, useSelector } from "react-redux";
import { editProductData, editStatus, fetchProducts } from "../../../store/ProductSlice";

function ProductEditForm() {
  const buttonValue=useSelector(editStatus)
  const dispatch=useDispatch()
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
  ] = useContext(ContextProvide);
  console.log("editFormData",editFormData)
  const feilds = [
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


  const formik = useFormik({
    initialValues: {
      product_name: editFormData.product_name || "",
      product_code: editFormData.product_code || "",
      purity: editFormData.purity || "",
      Metal: editFormData.Metal || "",
      weight: editFormData.weight || "",
      price: editFormData.price || "",
      offer: editFormData.offer || "",
      discount: editFormData.discount || "",
      mrp: editFormData.mrp || "",
    },
    enableReinitialize: true,
    validate: (values) => {
      let error = {};
      feilds.forEach(({ label}) => {
        if (!values[label]) {
          error[label] = "*Required*";
        }
      });
      return error;
    },
    onSubmit: async (values) => {
      const id=editFormData._id
      console.log("editFormData._id",editFormData._id)
      try {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          if (key !== "image") {
            formData.append(key, values[key]);
          }
        });
          
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
          }
        
        
      
        await dispatch(editProductData({ id, values })).unwrap();
        
        await dispatch(fetchProducts())
        setDisplayEdit(false)
        alert("Product Edit SuccessFully");
      } catch (error) {
        alert(`Failed: ${error.message}`);
        console.log({ error: error.message });
      }
    },
  });
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-1/2 flex justify-center items-center p-4  ">
          <div className="w-7/12 border shadow-lg  rounded-md">
            <div className="flex justify-center  text-2xl text-[#c39e41] font-semibold mb-4 bg-green-800 py-2">
              <p className="w-11/12 text-center">Products Form</p>
              <p
                className="text-[#c39e41] text-xl"
                onClick={() => setDisplayEdit(false)}
              >
                <FaRegCircleXmark />
              </p>
            </div>
            <form
              className="px-4 py-2 bg-[#f7f7f7] overflow-scroll h-[500px] "
              onSubmit={formik.handleSubmit}
              method="POST"
            >
              <div className="">
                {feilds.map((value, index) => {
                  return (
                    <>
                      <div
                        className="flex justify-between items-center py-4"
                        key={value.label}
                      >
                        <div>
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
                         <p style={{ color: "red" }}>
                        {formik.errors[value.label]}
                      </p>
                      </div>
                      </div>
                     
                    </>
                  );
                })}
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

export default ProductEditForm;
