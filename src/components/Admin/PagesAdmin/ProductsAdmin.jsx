import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts } from "../../../store/ProductSlice";
import { CiEdit } from "react-icons/ci";
import { FaTrash } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";

function ProductsAdmin() {
  const category = useSelector(selectAllProducts);
  return (
    <div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>

        <thead>
          <tr className="bg-[#f7f7f7]">
            <th className="border-t-2 border-b-2 p-5">Product Name</th>
            <th className="border-t-2 border-b-2 p-5">Category</th>
            <th className="border-t-2 border-b-2 p-5">Product Code</th>
            <th className="border-t-2 border-b-2 p-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {category.map((product) => {
            console.log("product", product);

            return (
              <tr key={product.product_code} className="p-6">
                <td className="border-t-2 border-b-2 p-8">{product.product_name}</td>
                <td className="border-t-2 border-b-2 p-8">{product.category}</td>
                <td className="border-t-2 border-b-2 p-8">{product.product_code}</td>
                <td className="border-t-2 border-b-2 p-8 flex justify-center items-center text-gray-700">
                  <p className="pl-1">
                    <IoEye />
                  </p>
                  <p className="pl-1">
                    <CiEdit />
                  </p>
                  <p className="pl-1">
                    <FaTrash />
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsAdmin;
