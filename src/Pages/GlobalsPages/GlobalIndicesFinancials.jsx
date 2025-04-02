import React, { useEffect, useState } from "react";
import { ArrowLeft, Star, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

const GlobalStocksFinancials = () => {
  let apiLink = "https://diamond-rock-django-backend1.onrender.com/api/";
  const [activeTab, setActiveTab] = useState("financials");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [financialsData, setFinancialsData] = useState({
    statements: {
      "B/S": [],
      "C/F": [],
      "P/L": [],
    },
  });

  let navigate = useNavigate();

  const tabs = [
    { id: "prices", label: "Prices", url: "/global-stock/prices" },
    {
      id: "fundamentals",
      label: "Fundamentals",
      url: "/global-stock/fundamentals",
    },
    { id: "financials", label: "Financials", url: "/global-stock/financials" },
  ];
  const subTabs1 = ["Chart", "B/S", "P/L", "C/F"];
  const [subTab1, setSubTab1] = useState("B/S");
  const subTabs2 = ["Consolidated", "Standalone"];
  const [subTab2, setSubTab2] = useState("Consolidated");

  const data = {
    name: "Apple Inc.",
    ticker: "AAPL",
  };

  // fetching main data here 👇
  const getFinancialsData = async () => {
    try {
      setLoading(true);
      setError(null);
      let ticker = data.ticker;

      const [bsResponse, cfResponse, plResponse] = await Promise.all([
        fetch(`${apiLink}get_balance_sheet/${ticker}/`),
        fetch(`${apiLink}get_cash_flow/${ticker}/`),
        fetch(`${apiLink}get_income_statement/${ticker}/`),
      ]);

      const [bsData, cfData, plData] = await Promise.all([
        bsResponse.json(),
        cfResponse.json(),
        plResponse.json(),
      ]);

      // Helper function to transform statement data
      const transformStatementData = (yearlyData) => {
        if (!yearlyData) return [];

        // Get all parameters from the first year's data
        const firstYearData = Object.values(yearlyData)[0];
        const parameters = Object.keys(firstYearData);

        // Create an array of objects, one for each parameter
        return parameters.map((param) => ({
          Particulars: param,
          Years: Object.entries(yearlyData).reduce((acc, [date, data]) => {
            acc[date] = data[param] || 0;
            return acc;
          }, {}),
        }));
      };

      const transformedFinancials = {
        statements: {
          "B/S": transformStatementData(bsData?.yearly),
          "C/F": transformStatementData(cfData?.yearly),
          "P/L": transformStatementData(plData?.yearly),
        },
      };

      console.log("Transformed Financials:", transformedFinancials);
      setFinancialsData(transformedFinancials);
    } catch (err) {
      console.error("Error fetching financials:", err);
      setError("Failed to fetch financial data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFinancialsData();
  }, []);

  const renderStatementsTable = () => {
    const currentStatement = financialsData?.statements[subTab1] || [];

    if (loading) {
      return (
        <div className="bg-white flex items-center justify-center">
          <div className="text-xl">Loading financial data...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-white flex items-center justify-center">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      );
    }

    if (currentStatement.length === 0) {
      return <div className="p-4">No data available for this statement</div>;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-black bg-gray-50 border-t">
            <th className="pl-4 text-left font-bold text-black">Particulars</th>
            {Object.keys(currentStatement[0]?.Years || {})
              .slice(0, -1)
              .reverse()
              .map((year, index, arr) => (
                <th
                  key={year}
                  className={`px-0 text-right w-fit font-medium whitespace-nowrap ${
                    index === arr.length - 1 ? "text-blue-600 pr-5" : ""
                  }`}
                >
                  <p>
                    {year.substring(0, 10)}
                    {index === arr.length - 1 ? "*" : ""}
                  </p>
                  <span className="text-xs text-gray-600">Rs. Cr.</span>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {currentStatement.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 text-gray-800 border-t"
            >
              <td className="pl-4 py-1 whitespace-normal font-light text-gray-800">
                {row.Particulars}
              </td>
              {Object.values(row.Years || {})
                .slice(0, -1)
                .reverse()
                .map((value, index, arr) => (
                  <td
                    key={index}
                    className={`px-0 py-1 text-right w-fit whitespace-nowrap text-gray-600 font-light ${
                      index === arr.length - 1 ? "text-blue-600 pr-5" : ""
                    }`}
                  >
                    {value / 10000000}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <SidebarAndNavbar defaultActiveMainMenu="globalMarket">
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-medium">{data.name}</h1>
                  <span className="text-gray-500 text-sm">{data.ticker}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">1,278.20</span>
                  <span className="text-red-500 ml-2">-7.00 (-0.5%)</span>
                  <span className="text-gray-500 ml-2">
                    05 Feb 2025, 03:49 PM IST
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-gray-400" />
              <Share2 className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="flex space-x-6 px-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  navigate(tab.url);
                }}
                className={`py-3 text-sm whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 pb-0 space-y-4">
          <div className="flex justify-start space-x-4 pb-0">
            <div className="options inline-flex justify-center items-center bg-gray-100 rounded-lg px-1 mb-5">
              {subTabs1.map((t) => (
                <button
                  key={t}
                  onClick={() => setSubTab1(t)}
                  className={`flex justify-center items-center cursor-pointer text-sm px-4 py-1 my-1 rounded ${
                    subTab1 === t ? "bg-white shadow-sm" : "bg-gray-100"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="options inline-flex justify-center items-center bg-gray-100 rounded-lg px-1 mb-5">
              {subTabs2.map((e) => (
                <button
                  key={e}
                  onClick={() => setSubTab2(e)}
                  className={`flex justify-center items-center cursor-pointer text-sm px-4 py-1 my-1 rounded ${
                    subTab2 === e ? "bg-white shadow-sm" : "bg-gray-100"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        </div>
        {renderStatementsTable()}
      </div>
    </SidebarAndNavbar>
  );
};

export default GlobalStocksFinancials;
