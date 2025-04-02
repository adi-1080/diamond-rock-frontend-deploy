import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";
import StockHeader from "../../components/StockHeader";

const OuterDiv = ({ children }) => {
  const { ticker } = useParams();

  return (
    <SidebarAndNavbar>
      <div className="min-h-screen bg-gray-50">
        <StockHeader defaultActiveTab={"financials"} ticker={ticker} />
        <div className="p-0 bg-white">{children}</div>
      </div>
    </SidebarAndNavbar>
  );
};

export default function Financials() {
  let apiLink = "https://diamond-rock-django-backend1.onrender.com/api/";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlightedBar, setHighlightedBar] = useState(null);
  const [showChart, setShowChart] = useState(null);
  let { ticker } = useParams();

  const subTabs1 = ["B/S", "P/L", "C/F"];
  const [subTab1, setSubTab1] = useState("B/S");
  const subTabs2 = ["Consolidated", "Standalone"];
  const [subTab2, setSubTab2] = useState("Consolidated");

  const [financialsData, setFinancialsData] = useState({
    statements: {
      "B/S": [],
      "C/F": [],
      "P/L": [],
    },
  });

  const toggleChart = (rowIndex) => {
    setShowChart(showChart === rowIndex ? null : rowIndex);
  };

  // Add this function to prepare chart data
  const getChartData = (row) => {
    if (!row || !row.Years) return [];

    return Object.entries(row.Years)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([year, value]) => ({
        name: year.substring(0, 10),
        value: value / 10000000, // Convert to crores
      }));
  };

  // Format value for chart
  const formatValue = (value) => {
    if (typeof value === "string") {
      return parseFloat(value.replace(/,/g, ""));
    }
    return value;
  };

  // Format the y-axis labels
  const formatYAxis = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value;
  };

  // fetching data here 👇
  const getFinancialsData = async () => {
    try {
      setLoading(true);
      setError(null);

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

  const renderStatementsTable = () => {
    const currentStatement = financialsData?.statements[subTab1] || [];

    if (currentStatement.length === 0) {
      return <div className="p-4">No data available for this statement</div>;
    }

    const firstRow = currentStatement[0];
    const years = Object.keys(firstRow?.Years || {})
      .sort()
      .reverse();
    const colCount = 2 + years.length; // Particulars + mini chart + years columns

    return (
      <table className="table-auto w-full mt-3">
        {/* Header remains the same */}
        <thead>
          <tr className={`border-b`}>
            <th className="px-4 align-top text-left font-semibold">
              Particulars
            </th>
            <th className="px-4 align-top text-left font-semibold">
              {Object.keys(currentStatement[0]?.Years).length} Years
            </th>
            {Object.keys(currentStatement[0]?.Years)
              .reverse()
              .map((year, index, arr) => (
                <th
                  key={year}
                  className={`text-right font-medium ${
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
            <>
              {/* Main data row */}
              <tr
                key={`row-${rowIndex}`}
                className="border-b bg-white hover:bg-gray-50"
              >
                <td className="px-4 py-2 font-light text-gray-900">
                  {row.Particulars}
                </td>
                <td className="px-4 py-2 font-light text-gray-900">
                  {/* Small Graph */}
                  <button
                    onClick={() => toggleChart(rowIndex)}
                    className="h-4 w-16 flex items-center cursor-pointer"
                  >
                    {years.slice(0, 10).map((year, idx) => {
                      const yearValues = Object.entries(row.Years || {})
                        .sort()
                        .map(([y, v]) => v / 10000000);

                      const maxValue = Math.max(...yearValues);
                      const value = row.Years[year] / 10000000;
                      const height =
                        maxValue > 0 ? `${(value / maxValue) * 16}px` : "0px";

                      return (
                        <div
                          key={idx}
                          className="w-1 mx-px bg-blue-400"
                          style={{
                            height,
                            opacity:
                              highlightedBar === idx
                                ? 1
                                : idx < 3
                                ? 0.3
                                : idx < 6
                                ? 0.6
                                : 1,
                            backgroundColor:
                              highlightedBar === idx ? "#2563EB" : "#60A5FA",
                          }}
                          onMouseEnter={() => setHighlightedBar(idx)}
                          onMouseLeave={() => setHighlightedBar(null)}
                        ></div>
                      );
                    })}
                  </button>
                </td>
                {Object.values(row.Years || {})
                  .reverse()
                  .map((value, index, arr) => (
                    <td
                      key={index}
                      className={`px-0 py-1 text-right w-fit whitespace-nowrap font-light ${
                        index === arr.length - 1
                          ? "text-blue-600 pr-5"
                          : "text-gray-800"
                      }`}
                    >
                      {(value / 10000000).toFixed(2)} {/* Crores */}
                    </td>
                  ))}
              </tr>

              {/* Chart row (appears when the row is toggled) */}
              {showChart === rowIndex && (
                <tr key={`chart-${rowIndex}`}>
                  <td colSpan={colCount} className="p-0">
                    <div className="px-4 py-6 border-t border-gray-200">
                      <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={getChartData(row)}
                            margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                            />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={formatYAxis} />
                            <Tooltip
                              formatter={(value) => value.toLocaleString()}
                            />
                            <Bar
                              dataKey="value"
                              fill="#72A0C1"
                              onMouseOver={(data, index) =>
                                setHighlightedBar(index)
                              }
                              onMouseOut={() => setHighlightedBar(null)}
                            >
                              {getChartData(row).map((entry, index) => (
                                <rect
                                  key={`bar-${index}`}
                                  fill={
                                    highlightedBar === index
                                      ? "#2563EB"
                                      : "#60A5FA"
                                  }
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center mt-2 font-semibold text-sm">
                        {row.Particulars} - Trend (Rs. Cr.)
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    );
  };

  const renderCharts = () => {
    <div className="chart-container px-7">
      <div className="flex items-center mb-2">
        <span className="font-medium">Rs.Crores</span>
        <button className="ml-auto px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
          All Yrs.
        </button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 100 }}>
          <XAxis type="number" domain={[0, 2000000]} />
          <YAxis dataKey="year" type="category" />
          <Tooltip formatter={(value) => formatValue(value) + " Cr"} />
          <Bar dataKey="value" fill="#5B9BD5" />
        </BarChart>
      </ResponsiveContainer>
    </div>;
  };

  useEffect(() => {
    getFinancialsData();
  }, []);

  if (loading) {
    return (
      <OuterDiv>
        <div className="min-h-[30vh] flex items-center justify-center">
          <div className="text-xl">Loading financial data...</div>
        </div>
      </OuterDiv>
    );
  }

  if (error) {
    return (
      <OuterDiv>
        <div className="min-h-[30vh] flex items-center justify-center">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </OuterDiv>
    );
  }

  return (
    <OuterDiv
      children={
        <div>
          {/* Subtabs */}
          <div className="flex justify-start space-x-4 p-4 pb-0">
            {/* subTabs1 (Chart, B/S, P/L, C/F) */}
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

            {/* subTabs2 (Consolidated, Standalone) */}
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

          {/* main tabular stuff */}
          <div className="mt-0 h-96">{renderStatementsTable()}</div>
        </div>
      }
    />
  );
}
