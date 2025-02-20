import { React, useContext } from "react";
import { ContextProvide } from "../../../ContextApi";
import { FaRegCircleXmark } from "react-icons/fa6";


function ProductDetails() {
  const [displayForm, setDisplayForm, details, setDetails,displayDetails, setDisplayDetails] =
    useContext(ContextProvide);
  console.log("details", details);
  return (
    <>
      <div className="w-full">
        <div className="flex justify-center  ">
          <div className=" p-4 my-4 shadow-xl border relative bg-white">
            <div className="flex justify-center">
              <p className="text-center text-2xl border px-4 py-2 bg-green-800 rounded-md text-white">Product Details</p>
            </div>
            <p className="text-2xl absolute right-0 top-0" ><FaRegCircleXmark onClick={()=>setDisplayDetails(false)} /></p>
            <div className="flex justify-center gap-3">
              <div>
                <div className="">
                  <div className="w-60">
                    <img
                      src={details.items.images[1]}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex mt-2 justify-start gap-3  ">
                    {details.items.images.map((image) => {
                      return (
                        <>
                          <div className="w-16 h-16 border p-1">
                            <img
                              src={image}
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold">
                  {details.items.product_name}
                </p>
                <p className="text-md">{details.items.product_code}</p>
                <div>
                  <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead className="sticky top-16">
                      <tr className="bg-[#f7f7f7] p-6 text-left text-gray-800">
                        <th className="border-t-2 border-b-2 border-l-2 p-4">
                          Category
                        </th>
                        <th className="border-t-2 border-b-2 p-4">Varity</th>
                        <th className="border-t-2 border-b-2 p-4">
                          Varity_Type
                        </th>
                        <th className="border-t-2 border-b-2 p-4">MRP</th>
                        <th className="border-t-2 border-b-2 p-4">Offer</th>
                        <th className="border-t-2 border-b-2 border-r-2 p-4">
                          Discount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        key={details.items.product_code}
                        className="p-6 text-left text-gray-600 hover:bg-[#f7f7f7]"
                      >
                        <td className="border-t-2 border-l-2 border-b-2 px-6 py-2">
                          <div className="flex  items-center">
                            <p className="pl-2">{details.category_name}</p>
                          </div>
                        </td>
                        <td className="border-t-2 border-b-2 p-6">
                          {details.varity_name}
                        </td>
                        <td className="border-t-2 border-b-2 p-6">
                          {details.division_name}
                        </td>
                        <td className="border-t-2 border-b-2 p-6">
                          {details.items.mrp}
                        </td>
                        <td className="border-t-2 border-b-2 p-6">
                          {details.items.offer}
                        </td>
                        <td className="border-t-2 border-b-2 border-r-2 p-6">
                          {details.items.discount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
