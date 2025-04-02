import React from "react";

export default function Insider() {
  const insiderDeals = [
    {
      stock: "TATAPOWER",
      name: "Tata Power",
      sector: "Energy",
      insider: "Ratan Tata (Chairman)",
      type: "Buy",
      quantity: "200,000",
      price: "260.70",
      value: "52.14 Cr",
    },
    {
      stock: "HDFCBANK",
      name: "HDFC Bank",
      sector: "Banking",
      insider: "Sashidhar Jagdishan (CEO)",
      type: "Sell",
      quantity: "40,000",
      price: "1,485.10",
      value: "59.40 Cr",
    },
    {
      stock: "WIPRO",
      name: "Wipro Ltd.",
      sector: "Technology",
      insider: "Azim Premji (Founder)",
      type: "Buy",
      quantity: "150,000",
      price: "520.30",
      value: "78.05 Cr",
    },
    {
      stock: "JSWSTEEL",
      name: "JSW Steel",
      sector: "Steel",
      insider: "Sajjan Jindal (Chairman)",
      type: "Buy",
      quantity: "100,000",
      price: "840.75",
      value: "84.08 Cr",
    },
    {
      stock: "DRREDDY",
      name: "Dr. Reddy's Labs",
      sector: "Pharmaceuticals",
      insider: "G V Prasad (Co-Chairman)",
      type: "Sell",
      quantity: "18,000",
      price: "5,360.10",
      value: "96.48 Cr",
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
              Insider
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
          {insiderDeals.map((deal, index) => (
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
              <td className="px-6 py-4">{deal.insider}</td>
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
