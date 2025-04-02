import React from "react";

export default function SAST() {
  const sastDeals = [
    {
      stock: "IOC",
      name: "Indian Oil Corporation",
      sector: "Energy",
      acquirer: "Government of India",
      type: "Increase",
      prevStake: "51.50%",
      changeStake: "+2.30%",
      newStake: "53.80%",
    },
    {
      stock: "COALINDIA",
      name: "Coal India",
      sector: "Mining",
      acquirer: "LIC of India",
      type: "Decrease",
      prevStake: "10.75%",
      changeStake: "-1.20%",
      newStake: "9.55%",
    },
    {
      stock: "HAVELLS",
      name: "Havells India",
      sector: "Electronics",
      acquirer: "QRG Enterprises",
      type: "Increase",
      prevStake: "38.15%",
      changeStake: "+3.50%",
      newStake: "41.65%",
    },
    {
      stock: "GAIL",
      name: "GAIL India",
      sector: "Energy",
      acquirer: "Oil and Natural Gas Corp",
      type: "Decrease",
      prevStake: "4.90%",
      changeStake: "-0.75%",
      newStake: "4.15%",
    },
    {
      stock: "TITAN",
      name: "Titan Company",
      sector: "Consumer Goods",
      acquirer: "Tata Sons",
      type: "Increase",
      prevStake: "25.10%",
      changeStake: "+1.80%",
      newStake: "26.90%",
    },
  ];

  return (
    <div className="overflow-y-auto bg-white rounded-lg p-0">
      <table className="w-full text-s">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Stock Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Acquirer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Type
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Previous Stake
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Change
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              New Stake
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {sastDeals.map((deal, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-20 h-8 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center text-[14px] font-medium">
                    {deal.stock}
                  </div>
                  <div>
                    <div className="text-sm text-gray-700 font-light text-black">
                      {deal.name}
                    </div>
                    <div className="text-xs text-gray-500">{deal.sector}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">{deal.acquirer}</td>
              <td
                className={`px-6 py-4 ${
                  deal.type === "Increase" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {deal.type}
              </td>
              <td className="px-6 py-4 text-right">{deal.prevStake}</td>
              <td
                className={`px-6 py-4 text-right ${
                  deal.type === "Increase" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {deal.changeStake}
              </td>
              <td className="px-6 py-4 text-right">{deal.newStake}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
