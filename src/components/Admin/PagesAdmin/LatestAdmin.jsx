import React, { useState } from "react";
import { useContext } from "react";
import { ContextProvide } from "../../../ContextApi";
import { useSelector } from "react-redux";

function LatestAdmin() {
  const [notify, setNotify] = useState(false);
  const [match, setMatch] = useState("");
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
  const latestData = useSelector((state) => state.latestCollections.latest);
  console.log("latestData", latestData);

  return (
    <>
      <div className="p-4 shadow-lg">
        {latestData.map((value) => {
          return (
            <>
              <div className="border p-4 mb-6">
                <div className="w-80 mb-6 border shadow-lg">
                  <img src={value.url[0]} alt="" className="w-full h-full" />
                </div>
                <div className="flex gap-2 ">
                  {value.url.map((image) => {
                    return (
                      <>
                        <div className="w-20 border p-2 shadow-md">
                          <img src={image} alt="" />
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default LatestAdmin;
