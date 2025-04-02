import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

const stockData = [
  {
    name: "NVIDIA",
    logo: "https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/2048px-Nvidia_logo.svg.png",
    price: "126.63",
    change: "-2.80%",
  },
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    price: "247.04",
    change: "-0.02%",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    price: "212.80",
    change: "+0.04%",
  },
];

const StockCard = ({ name, logo, price, change }) => {
  const isPositive = change.includes("+");

  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4 shadow-md w-[260px] h-[100px]">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt={name} className="w-6 h-6 rounded-full object-contain" />
        <span className="text-sm font-semibold">{name}</span>
      </div>

      {/* Right Section */}
      <div className="text-right">
        <p className="text-lg font-bold">{price} <span className="text-xs text-gray-500">USD</span></p>
        <p className={`text-sm flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />} {change}
        </p>
      </div>
    </div>
  );
};

const StockCards = () => {
  return (
    <div className="flex gap-5 ">
      {stockData.map((stock, index) => (
        <StockCard key={index} {...stock} />
      ))}
    </div>
  );
};

export default StockCards;
