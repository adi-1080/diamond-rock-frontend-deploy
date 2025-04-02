import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Star } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"; // Imports for potential future chart rendering
import FinancialDataTable from "./FinancialDataTable";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

export default function Financials2() {
  // API endpoint configuration
  let apiLink = "https://diamond-rock-django-backend1.onrender.com/api/";

  // State management for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Subtabs configuration for financial view
  const subTabs1 = ["Chart", "B/S", "P/L", "C/F"]; // Main subtabs
  const [subTab1, setSubTab1] = useState("B/S"); // Default selected subtab
  const subTabs2 = ["Consolidated", "Standalone"]; // View type subtabs
  const [subTab2, setSubTab2] = useState("Consolidated"); // Default selected view type

  // State to store financial statements data
  const [financialsData, setFinancialsData] = useState({
    statements: {
      "B/S": [], // Balance Sheet
      "C/F": [], // Cash Flow
      "P/L": [], // Profit & Loss
    },
  });

  // Sample chart data (commented out but kept for future reference)
  const chartData = [
    { year: "2024-09*", value: 1814469.0 },
    { year: "2024-03", value: 1755048.0 },
    { year: "2023-03", value: 1605882.0 },
    { year: "2022-03", value: 1498622.0 },
    { year: "2021-03", value: 1320065.0 },
  ];

  // Async function to fetch financial data from API
  const getFinancialsData = async () => {
    try {
      // Reset loading and error states
      setLoading(true);
      setError(null);

      // Fixed ticker for this example
      let ticker = "RELIANCE.NS";

      // Parallel API calls for different financial statements
      const [bsResponse, cfResponse, plResponse] = await Promise.all([
        fetch(`${apiLink}get_balance_sheet/${ticker}/`),
        fetch(`${apiLink}get_cash_flow/${ticker}/`),
        fetch(`${apiLink}get_income_statement/${ticker}/`),
      ]);

      // Parse JSON responses
      const [bsData, cfData, plData] = await Promise.all([
        bsResponse.json(),
        cfResponse.json(),
        plResponse.json(),
      ]);

      // Helper function to transform raw statement data into a consistent format
      const transformStatementData = (yearlyData) => {
        if (!yearlyData) return [];

        // Extract parameters from the first year's data
        const firstYearData = Object.values(yearlyData)[0];
        const parameters = Object.keys(firstYearData);

        // Create an array of objects with yearly data for each parameter
        return parameters.map((param) => ({
          Particulars: param,
          Years: Object.entries(yearlyData).reduce((acc, [date, data]) => {
            acc[date] = data[param] || 0;
            return acc;
          }, {}),
        }));
      };

      // Transform and set financial data
      const transformedFinancials = {
        statements: {
          "B/S": transformStatementData(bsData?.yearly),
          "C/F": transformStatementData(cfData?.yearly),
          "P/L": transformStatementData(plData?.yearly),
        },
      };

      // Log and update state
      console.log("Transformed Financials:", transformedFinancials);
      setFinancialsData(transformedFinancials);
    } catch (err) {
      // Error handling
      console.error("Error fetching financials:", err);
      setError("Failed to fetch financial data");
    } finally {
      // Ensure loading state is set to false
      setLoading(false);
    }
  };

  // Fetch financial data on component mount
  useEffect(() => {
    getFinancialsData();
  }, []);

  // Loading state rendering
  if (loading) {
    return (
      <OuterDiv
        childDiv={
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-xl">Loading financial data...</div>
          </div>
        }
      />
    );
  }

  // Error state rendering
  if (error) {
    return (
      <OuterDiv
        childDiv={
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-xl text-red-600">{error}</div>
          </div>
        }
      />
    );
  }

  // Render statements table for selected statement type
  const renderStatementsTable = () => {
    // Get current statement based on selected subtab
    const currentStatement = financialsData?.statements[subTab1] || [];

    // Handle empty data scenario
    if (currentStatement.length === 0) {
      return <div className="p-4">No data available for this statement</div>;
    }

    // Render table with financial data
    return (
      <OuterDiv
        childDiv={
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-white text-black">
                <th className="pl-10 py-2 text-left font-light text-black">
                  Particulars
                </th>
                {Object.keys(currentStatement[0]?.Years || {})
                  .slice(0, -1)
                  .reverse()
                  .map((year, index, arr) => (
                    <th
                      key={year}
                      className={`px-0 py-2 text-right w-fit font-medium whitespace-nowrap ${
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
                <tr key={rowIndex} className="bg-gray-50 text-gray-800">
                  <td className="pl-10 py-1 whitespace-normal font-light text-gray-800">
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
        }
      />
    );
  };

  // Main component render
  return (
    <OuterDiv
      childDiv={
        <div>
          {/* Subtabs for financial view */}
          <div className="flex justify-start space-x-4 p-4 pb-0">
            {/* Main subtabs (Chart, B/S, P/L, C/F) */}
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

            {/* View type subtabs (Consolidated, Standalone) */}
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

          {/* Financial Data Table Component */}
          <FinancialDataTable />
        </div>
      }
    />
  );
}

// Outer layout component
const OuterDiv = ({ childDiv }) => {
  // Define subtabs locally in OuterDiv
  const subTabs1 = ["Chart", "B/S", "P/L", "C/F"];
  const subTabs2 = ["Consolidated", "Standalone"];
  const [subTab1, setSubTab1] = useState("B/S");
  const [subTab2, setSubTab2] = useState("Consolidated");

  // Sidebar and navigation state
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("financials");
  const navigate = useNavigate();

  // Navigation tabs configuration (same as in main component)
  const tabs = [
    { id: "prices", label: "Prices", url: "/stock/prices" },
    { id: "fundamental", label: "Fundamental", url: "/stock/fundamentals" },
    { id: "financials", label: "Financials", url: "/stock/financials" },
    { id: "diamond-report", label: "Diamond Report", url: "/stock/diamond-report", },
    { id: "updates", label: "Updates", url: "/stock/updates" },
    { id: "shareholding", label: "Shareholding", url: "/stock/shareholding" },
    { id: "deliveries", label: "Deliveries", url: "/stock/deliveries" },
    { id: "technicals", label: "Technicals", url: "/stock/technicals" },
  ];

  // Render outer layout with navbar, sidebar, and main content
  return (
    <SidebarAndNavbar>
      {/* Main content layout */}
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-medium">
                    Reliance Industries Ltd.
                  </h1>
                  <span className="text-gray-500 text-sm">NSE: RELIANCE</span>
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

          {/* Tabs Section */}
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

        {/* main div */}
        <div className="p-0 bg-white">
          <div className="flex justify-start space-x-4 p-4 pb-0">
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

          <FinancialDataTable />
        </div>
      </div>
    </SidebarAndNavbar>
  );
};