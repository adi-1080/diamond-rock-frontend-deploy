import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ShareholdersSection from "./ShareholdersSection";
import BoardOfDirectors from "./BoardOfDirectores";

const ShareholdersDashboard = () => {
  const [activeTab, setActiveTab] = useState("Pattern");
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedBar, setSelectedBar] = useState(null);
  const [visibleGraph, setVisibleGraph] = useState(null);

  // Sample data for the shareholders table
  const quarters = [
    "2022-12",
    "2023-03",
    "2023-06",
    "2023-09",
    "2023-12",
    "2024-03",
    "2024-06",
    "2024-09",
    "2024-12",
  ];

  const shareholdingData = [
    {
      id: "promoter",
      category: "Promoter",
      hasChart: true,
      children: ["indianPromoter", "foreignPromoter"],
      shareholding: [
        { quarter: "2022-12", value: 50.49 },
        { quarter: "2023-03", value: 50.41 },
        { quarter: "2023-06", value: 50.39 },
        { quarter: "2023-09", value: 50.27 },
        { quarter: "2023-12", value: 50.3 },
        { quarter: "2024-03", value: 50.31 },
        { quarter: "2024-06", value: 50.33 },
        { quarter: "2024-09", value: 50.24 },
        { quarter: "2024-12", value: 50.13 },
      ],
    },
    {
      id: "indianPromoter",
      category: "Indian Promoter",
      parent: "promoter",
      shareholding: [
        { quarter: "2022-12", value: 50.49 },
        { quarter: "2023-03", value: 50.41 },
        { quarter: "2023-06", value: 50.39 },
        { quarter: "2023-09", value: 50.27 },
        { quarter: "2023-12", value: 50.3 },
        { quarter: "2024-03", value: 50.31 },
        { quarter: "2024-06", value: 50.33 },
        { quarter: "2024-09", value: 50.24 },
        { quarter: "2024-12", value: 50.13 },
      ],
    },
    {
      id: "foreignPromoter",
      category: "Foreign Promoter",
      parent: "promoter",
      shareholding: [
        { quarter: "2022-12", value: 0.0 },
        { quarter: "2023-03", value: 0.0 },
        { quarter: "2023-06", value: 0.0 },
        { quarter: "2023-09", value: 0.0 },
        { quarter: "2023-12", value: 0.0 },
        { quarter: "2024-03", value: 0.0 },
        { quarter: "2024-06", value: 0.0 },
        { quarter: "2024-09", value: 0.0 },
        { quarter: "2024-12", value: 0.0 },
      ],
    },
    {
      id: "public",
      category: "Public",
      hasChart: true,
      children: [],
      shareholding: [
        { quarter: "2022-12", value: 49.51 },
        { quarter: "2023-03", value: 49.59 },
        { quarter: "2023-06", value: 49.61 },
        { quarter: "2023-09", value: 49.73 },
        { quarter: "2023-12", value: 49.7 },
        { quarter: "2024-03", value: 49.69 },
        { quarter: "2024-06", value: 49.67 },
        { quarter: "2024-09", value: 49.76 },
        { quarter: "2024-12", value: 49.87 },
      ],
    },
    {
      id: "depositoryReceipts",
      category: "Depository Receipts",
      hasChart: true,
      children: [],
      shareholding: [
        { quarter: "2022-12", value: 0.0 },
        { quarter: "2023-03", value: 0.0 },
        { quarter: "2023-06", value: 0.0 },
        { quarter: "2023-09", value: 0.0 },
        { quarter: "2023-12", value: 0.0 },
        { quarter: "2024-03", value: 0.0 },
        { quarter: "2024-06", value: 0.0 },
        { quarter: "2024-09", value: 0.0 },
        { quarter: "2024-12", value: 0.0 },
      ],
    },
  ];

  // Toggle expandable rows
  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Show graph when clicking the chart icon
  const toggleGraph = (id) => {
    if (visibleGraph === id) {
      setVisibleGraph(null);
    } else {
      setVisibleGraph(id);
      // Reset selected bar when showing a new graph
      setSelectedBar(null);
    }
  };

  // Handle bar click
  const handleBarClick = (data, index) => {
    setSelectedBar(index);
  };

  // Format chart data for a specific category
  const formatChartData = (category) => {
    const row = shareholdingData.find((item) => item.id === category);
    if (!row) return [];

    return row.shareholding.map((item, index) => ({
      name: item.quarter,
      value: item.value,
      index: index, // Store the index for selection tracking
    }));
  };

  // Custom bar component to handle click and color change
  const CustomBar = (props) => {
    const { index, x, y, width, height } = props;
    const fill = selectedBar === index ? "#2563eb" : "#bfdbfe";

    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        onClick={() => handleBarClick(props.payload, index)}
        style={{ cursor: "pointer" }}
      />
    );
  };

  // Check if an item is a top-level item (not a child)
  const isTopLevel = (item) => !item.parent;

  // Check if an item is a child of a given parent
  const isChildOf = (item, parentId) => item.parent === parentId;

  // Graph icon component
  const GraphIcon = ({ id, hasChart }) => {
    if (!hasChart) return null;

    return (
      <button
        className="ml-2 text-blue-500"
        onClick={(e) => {
          e.stopPropagation();
          toggleGraph(id);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      </button>
    );
  };

  const renderPattern = () => (
    <div className="flex flex-col space-y-2">
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left w-40"></th>
              <th className="py-2 px-4 text-center">9 Qtrs</th>
              {quarters.map((quarter) => (
                <th key={quarter} className="py-2 px-4 text-center">
                  {quarter}
                  <br />
                  <span className="text-xs">(%)</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shareholdingData.filter(isTopLevel).map((row) => (
              <React.Fragment key={row.id}>
                <tr className="bg-white hover:bg-gray-50 border-b">
                  <td className="py-2 px-4 border-r flex items-center">
                    {row.children && row.children.length > 0 ? (
                      <button
                        className="mr-2 text-blue-500 font-bold w-6 h-6 flex items-center justify-center"
                        onClick={() => toggleExpand(row.id)}
                      >
                        {expandedRows[row.id] ? "-" : "+"}
                      </button>
                    ) : (
                      <span className="w-6 h-6"></span>
                    )}
                    {row.category}
                    <GraphIcon id={row.id} hasChart={row.hasChart} />
                  </td>
                  <td className="py-2 px-4 text-center border-r">
                    <div className="bg-blue-200 h-6 w-full"></div>
                  </td>
                  {row.shareholding.map((item, i) => (
                    <td key={i} className="py-2 px-4 text-center border-r">
                      {item.value.toFixed(2)}
                    </td>
                  ))}
                </tr>

                {/* Child rows that appear when expanded */}
                {expandedRows[row.id] &&
                  shareholdingData
                    .filter((item) => isChildOf(item, row.id))
                    .map((childRow) => (
                      <tr
                        key={childRow.id}
                        className="bg-gray-50 hover:bg-gray-100 border-b"
                      >
                        <td className="py-2 px-4 border-r pl-10">
                          {childRow.category}
                        </td>
                        <td className="py-2 px-4 text-center border-r">
                          <div className="bg-blue-200 h-6 w-full"></div>
                        </td>
                        {childRow.shareholding.map((item, i) => (
                          <td
                            key={i}
                            className="py-2 px-4 text-center border-r"
                          >
                            {item.value.toFixed(2)}
                          </td>
                        ))}
                      </tr>
                    ))}

                {/* Graph row */}
                {visibleGraph === row.id && (
                  <tr>
                    <td colSpan={11} className="p-4 bg-gray-50">
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={formatChartData(row.id)}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 60,
                            }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                            />
                            <XAxis
                              dataKey="name"
                              angle={0}
                              tick={{ fontSize: 12 }}
                              interval={0}
                            />
                            <YAxis domain={[0, 60]} />
                            <Tooltip
                              formatter={(value) => [
                                value.toFixed(2),
                                "Value (%)",
                              ]}
                            />
                            <Bar dataKey="value" shape={<CustomBar />} />

                            {/* Add value labels on top of each bar */}
                            {formatChartData(row.id).map((entry, index) => (
                              <text
                                key={`label-${index}`}
                                x={40 + index * 111} // Approximate positioning
                                y={240 - entry.value * 4} // Position above bar
                                fill="#000"
                                textAnchor="middle"
                                fontSize={12}
                              >
                                {entry.value.toFixed(2)}
                              </text>
                            ))}
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderShareholders = () => <ShareholdersSection />;

  const renderBOD = () => <BoardOfDirectors />;

  return (
    <div className="container mx-auto">
      <div className="options inline-flex justify-center items-center bg-gray-100 rounded-lg px-1 mb-5">
        {["Pattern", "Shareholders", "BOD"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex justify-center items-center cursor-pointer text-sm px-4 py-1 my-1 rounded ${
              activeTab === tab ? "bg-white shadow-sm" : "bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Pattern" && renderPattern()}
      {activeTab === "Shareholders" && renderShareholders()}
      {activeTab === "BOD" && renderBOD()}
    </div>
  );
};

export default ShareholdersDashboard;
