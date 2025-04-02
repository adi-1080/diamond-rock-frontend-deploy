import React, { useState } from "react";
import breadthDateWise from "../../assets/images/breadthDateWise.png";
import breadthIndustryWise from "../../assets/images/breadthIndustryWise.png";
import deliveriesDateWise from "../../assets/images/deliveriesDateWise.png";
import deliveriesIndustryWise from "../../assets/images/deliveriesIndustryWise.png";
import deliveriesStockWise from "../../assets/images/deliveriesStockWise.png";
import vwapDateWise from "../../assets/images/vwapDateWise.png";
import vwapIndustryWise from "../../assets/images/vwapIndustryWise.png";

const SectorsBreadth = ({ data }) => {
  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const [option, setOption] = useState("date");

  const imageMap = {
    "breadthDateWise.png": breadthDateWise,
    "breadthIndustryWise.png": breadthIndustryWise,
    "deliveriesDateWise.png": deliveriesDateWise,
    "deliveriesIndustryWise.png": deliveriesIndustryWise,
    "deliveriesStockWise.png": deliveriesStockWise,
    "vwapDateWise.png": vwapDateWise,
    "vwapIndustryWise.png": vwapIndustryWise,
  };

  return (
    <>
      <div className="options flex justify-center items-center p-2 w-full">
        <div className="flex bg-gray-100 rounded-lg px-1">
          {Object.entries(data).map(([key, _]) => {
            return (
              <div
                key={key}
                className={`flex justify-center items-center cursor-pointer text-m px-4 py-1 my-1 rounded ${
                  option === key ? "bg-white shadow-sm" : "bg-gray-100"
                }`}
                onClick={() => {
                  setOption(key);
                }}
              >
                {capitalizeFirstLetter(key)} Wise
              </div>
            );
          })}
        </div>
      </div>

      <div className="option-content flex flex-col justify-center items-center p-12">
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="font-bold text-xl">{data[option]["question"]}</h1>
          <h1 className="text-xl">{data[option]["answer"]}</h1>
        </div>
        <img src={imageMap[data[option]["image"]]} alt="" />
        <button className="bg-blue-700 text-white px-5 py-3 hover:bg-blue-600 rounded-md text-xl">
          Subscribe
        </button>
      </div>
    </>
  );
};

export default SectorsBreadth;
