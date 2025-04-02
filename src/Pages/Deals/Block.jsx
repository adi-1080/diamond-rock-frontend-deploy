import React from "react";

export default function Block() {
  const blockDeals = [
    {
      stock: "ADANIENT",
      name: "Adani Enterprises",
      sector: "Conglomerate",
      client: "SBI Mutual Fund",
      type: "Buy",
      quantity: "500,000",
      price: "3,120.70",
      value: "1,560.35 Cr",
    },
    {
      stock: "HINDUNILVR",
      name: "Hindustan Unilever",
      sector: "FMCG",
      client: "Nomura Holdings",
      type: "Sell",
      quantity: "320,000",
      price: "2,350.10",
      value: "752.03 Cr",
    },
    {
      stock: "MARUTI",
      name: "Maruti Suzuki",
      sector: "Automobile",
      client: "Fidelity Investments",
      type: "Buy",
      quantity: "75,000",
      price: "9,450.80",
      value: "708.81 Cr",
    },
    {
      stock: "ULTRACEMCO",
      name: "UltraTech Cement",
      sector: "Cement",
      client: "Aditya Birla Sun Life",
      type: "Buy",
      quantity: "80,000",
      price: "8,120.90",
      value: "649.67 Cr",
    },
    {
      stock: "LTI",
      name: "L&T Infotech",
      sector: "Technology",
      client: "Capital Group",
      type: "Sell",
      quantity: "150,000",
      price: "4,010.30",
      value: "601.55 Cr",
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
              Client
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Type
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Quantity
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Price (₹)
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Value
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {blockDeals.map((deal, index) => (
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
              <td className="px-6 py-4">{deal.client}</td>
              <td
                className={`px-6 py-4 ${
                  deal.type === "Buy" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {deal.type}
              </td>
              <td className="px-6 py-4 text-right">{deal.quantity}</td>
              <td className="px-6 py-4 text-right">{deal.price}</td>
              <td className="px-6 py-4 text-right">{deal.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
