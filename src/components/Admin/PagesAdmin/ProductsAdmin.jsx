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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const {
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
   } = useContext(ContextProvide);

  const allProducts = category.flatMap(product => 
    product.collections.flatMap(varity => 
      varity.division.flatMap(divition => 
        divition.division_details.map(items => ({
          ...items,
          category_name: product.category_name,
          varity_name: varity.varity_name,
          division_name: divition.division_name,
        }))
      )
    )
  );

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const paginatedProducts = allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


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
        {paginatedProducts.map(items => (
            <tr key={items._id} className="p-6 text-left text-gray-600 hover:bg-[#f7f7f7]">
              <td className="border-t-2 border-b-2 px-6 py-2">
                <div className="flex items-center">
                  <div className="w-14 h-14 border p-1 rounded-md bg-[#4f4b4b]">
                    <img src={items.images?.[1]} alt="" />
                  </div>
                  <p className="pl-2">{items.product_name}</p>
                </div>
              </td>
              <td className="border-t-2 border-b-2 p-6">{items.category_name}</td>
              <td className="border-t-2 border-b-2 p-6">{items.varity_name}</td>
              <td className="border-t-2 border-b-2 p-6">{items.division_name}</td>
              <td className="border-t-2 border-b-2 p-6 relative">{items.product_code}</td>
              <td className="border-t-2 border-b-2 p-6">
                <div className="flex items-center justify-around text-gray-700 text-md">
                  <p onClick={() => {
                    setDetails(items);
                    setDisplayDetails(true);
                  }}>
                    <IoEye />
                  </p>
                  <p onClick={() => {
                    setEditFormData(items);
                    setDisplayEdit(true);
                  }}>
                    <CiEdit />
                  </p>
                  <p>
                    <FaTrash onClick={() => { setNotify(true); setMatch(items._id); }} />
                    {match === items._id && notify && (
                      <div className="absolute left-1/2 shadow-xl p-4 bg-white">
                        <p>Are you sure you want to delete this product?</p>
                        <div className="flex justify-center items-center gap-4 mt-4 text-white">
                          <p className="border px-3 bg-red-800 rounded-md py-1" onClick={() => setNotify(false)}>No</p>
                          <p className="border px-3 bg-green-800 rounded-md py-1" onClick={() => { handleDelete(items._id); setNotify(false); }}>Yes</p>
                        </div>
                      </div>
                    )}
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>      </table>
        <div className="flex justify-center items-center mt-4">
        <button
          className={`px-4 py-2 mx-2 border rounded-md ${currentPage === 1 ? "bg-gray-300" : "bg-[#c39e41] text-white"}`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span className="text-gray-800">Page {currentPage} of {totalPages}</span>
        <button
          className={`px-4 py-2 mx-2 border rounded-md ${currentPage === totalPages ? "bg-gray-300" : "bg-[#c39e41] text-white"}`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>

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
