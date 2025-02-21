import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductData, fetchProducts, selectAllProducts } from "../../../store/ProductSlice";
import { CiEdit } from "react-icons/ci";
import { FaTrash } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import ProductsForm from "../Forms/ProductsForm";
import { ContextProvide } from "../../../ContextApi";
import ProductDetails from "../DetailsPages/ProductDetails";
import axios from "axios";
import ProductEditForm from "../EditForms/ProductEditForm";

function ProductsAdmin() {
  const dispatch=useDispatch()
  const [notify, setNotify] = useState(false);
  const [match, setMatch] = useState("");
  const category = useSelector(selectAllProducts);
  console.log("category",category)
  const [
    displayForm,
    setDisplayForm,
    details,
    setDetails,
    displayDetails,
    setDisplayDetails,
    displayEdit,
    setDisplayEdit,
    editFormData,
    setEditFormData,
  ] = useContext(ContextProvide);

  const handleDelete = async (id) => {
    await dispatch(deleteProductData((id))).unwrap();
    dispatch(fetchProducts())
  };

  return (
    <div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead className="sticky top-16">
          <tr className="bg-[#f7f7f7] p-6 text-left text-gray-800">
            <th className="border-t-2 border-b-2 p-6">Product Name</th>
            <th className="border-t-2 border-b-2 p-6">Category</th>
            <th className="border-t-2 border-b-2 p-6">Varity</th>
            <th className="border-t-2 border-b-2 p-6">Varity_Type</th>
            <th className="border-t-2 border-b-2 p-6">Product Code</th>
            <th className="border-t-2 border-b-2 p-6 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {category.map((product) => {
            console.log(product)
            return product.collections.map((varity) => {
              console.log("work1")
              return varity.division.map((divition) => {
                return divition.division_details.slice().reverse().map((items) => {
                  return (
                    <>
                      <tr
                        key={product.product_code}
                        className="p-6 text-left text-gray-600 hover:bg-[#f7f7f7]"
                      >
                        <td className="border-t-2 border-b-2 px-6 py-2">
                          <div className="flex  items-center">
                            <div className="w-14 h-14 border p-1 rounded-md bg-[#4f4b4b]">
                              <img src={items.images[1]} alt="" />
                            </div>

                            <p className="pl-2">{items.product_name}</p>
                          </div>
                        </td>
                        <td className="border-t-2 border-b-2 p-6">
                          {product.category_name}
                        </td>
                        <td className="border-t-2 border-b-2 p-6">
                          {varity.varity_name}
                        </td>
                        <td className="border-t-2 border-b-2 p-6">
                          {divition.division_name}
                        </td>
                        <td className="border-t-2 border-b-2 p-6">
                          {items.product_code}
                        </td>
                        <td className="border-t-2 border-b-2 p-6 ">
                          <div className="flex items-center justify-around text-gray-700 text-md">
                            <p
                              className=""
                              onClick={() => {
                                setDetails({
                                  items,
                                  category_name: product.category_name,
                                  varity_name: varity.varity_name,
                                  division_name: divition.division_name,
                                });
                                setDisplayDetails(true);
                              }}
                            >
                              <IoEye />
                            </p>
                            <p
                              className=""
                              onClick={() => {
                                setEditFormData({
                                  _id:items._id,
                                  category_name: product.category_name,
                                  varity_name: varity.varity_name,
                                  division_name: divition.division_name,
                                  product_name: items.product_name,
                                  product_code: items.product_code,
                                  purity: items.purity,
                                  Metal: items.Metal,
                                  weight: items.weight,
                                  price: items.price,
                                  offer: items.offer,
                                  discount: items.discount,
                                  mrp: items.mrp,
                                  images:items.images
                                });
                                setDisplayEdit(true);
                              }}
                            >
                              <CiEdit />
                            </p>
                            <p className="">
                              <FaTrash
                                onClick={() => {
                                  setNotify(true);
                                  setMatch(items._id);
                                }}
                              />
                              <div className="absolute  top-1/2 left-1/2">
                                <div
                                  className={`${
                                    match == items._id && notify
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
                                        handleDelete(items._id);
                                        setNotify(false);
                                      }}
                                    >
                                      Yes
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </p>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                });
              });
            });
          })}
        </tbody>
      </table>
      <div
        className={`${
          displayForm ? "block" : "hidden"
        } absolute top-0 text-nowrap w-full left-0`}
      >
        <div>
          <ProductsForm />
        </div>
      </div>
      <div
        className={`${
          displayDetails ? "block" : "hidden"
        } absolute top-28  text-nowrap w-full left-28 `}
      >
        <ProductDetails />
      </div>

      <div
        className={`${
          displayEdit ? "block" : "hidden"
        } absolute top-28  text-nowrap w-full left-28 `}
      >
        <ProductEditForm />
      </div>
    </div>
  );
}

export default ProductsAdmin;
