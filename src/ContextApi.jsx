import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const ContextProvide = createContext();

function ContextApi(props) {
  const [display, setDisplay] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [editLatest, setEditLatest] = useState(false);
  const [editRate, setEditRate] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [editLatestData, setEditLatestData] = useState({});
  const [editFormData,setEditFormData]=useState({})
  const [rateDetails,setRateDetails]=useState([])
  const [details, setDetails] = useState({
    category_name: "Gold",
    varity_name: "Necklace",
    division_name: "Short Necklace",
    items: {
      product_name: "Necklace_01",
      product_code: "xxxxxxxxxx",
      purity: "xxxxxxxxxxxx",
      weight: "xxxxxxxxxxxx",
      offer: "xxxxxxxxxxxx",
      discount: "xxxxxxxxxxxx",
      mrp: "xxxxxxxxxxxx",
      images: [
        "http://api-avsr.konceptsdandd.com/ASSETS/PRODUCT_IMAGES/image_1739680311277.webp",
        "http://api-avsr.konceptsdandd.com/ASSETS/PRODUCT_IMAGES/image_1739680311277.png",
      ],
      _id: "67b16a3793a0665c4810031d",
      createdAt: "2025-02-16T04:31:51.315Z",
    },
  });

  useEffect(() => {
    const rateFetch = async () => {
      try {
        const response = await axios.get("https://api-avsr.konceptsdandd.com/rate");
       setRateDetails(response.data)
      } catch (error) {
        console.error("Error fetching rate:", error); 
      }
    };
  
    rateFetch();
  }, []);

  return (
    <ContextProvide.Provider value={[display, setDisplay, details, setDetails,displayDetails, setDisplayDetails,displayEdit, setDisplayEdit,editFormData,setEditFormData,rateDetails,setRateDetails,editLatest, setEditLatest,editRate, setEditRate,editLatestData, setEditLatestData]}>
      {props.children}
    </ContextProvide.Provider>
  );
}

export default ContextApi;
