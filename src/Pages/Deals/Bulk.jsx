import React from "react";

export default function Bulk() {
  const bulkDeals = [
    {
      stock: "TCS",
      name: "Tata Consultancy Services",
      sector: "Technology",
      client: "BlackRock Inc.",
      type: "Buy",
      quantity: "120,000",
      price: "3,720.50",
      value: "446.46 Cr",
    },
    {
      stock: "HDFCBANK",
      name: "HDFC Bank",
      sector: "Banking",
      client: "Morgan Stanley",
      type: "Sell",
      quantity: "250,000",
      price: "1,485.10",
      value: "371.28 Cr",
    },
    {
      stock: "INFY",
      name: "Infosys Ltd.",
      sector: "Technology",
      client: "Vanguard Group",
      type: "Buy",
      quantity: "180,000",
      price: "1,510.25",
      value: "271.85 Cr",
    },
    {
      stock: "SBIN",
      name: "State Bank of India",
      sector: "Banking",
      client: "LIC of India",
      type: "Buy",
      quantity: "300,000",
      price: "645.30",
      value: "193.59 Cr",
    },
    {
      stock: "BHARTIARTL",
      name: "Bharti Airtel",
      sector: "Telecom",
      client: "Goldman Sachs",
      type: "Sell",
      quantity: "150,000",
      price: "920.50",
      value: "138.08 Cr",
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
          {bulkDeals.map((deal, index) => (
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
