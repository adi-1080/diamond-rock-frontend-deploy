import { ArrowLeft, Share2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

export default function App() {
  const [activeTab, setActiveTab] = useState("Ongoing");

  // Define table headers based on active tab
  const getTableHeaders = () => {
    switch (activeTab) {
      case "Ongoing":
        return [
          { key: "name", label: "Company", align: "left" },
          { key: "offerPrice", label: "Offer Price (Rs.)", align: "right" },
          { key: "lotSize", label: "Lot Size", align: "right" },
          { key: "subscription", label: "Subscription", align: "right" },
          { key: "issueSize", label: "Issue Size (Cr Rs.)", align: "right" },
          { key: "dates", label: "Issue Dates", align: "right" },
        ];
      case "Upcoming":
        return [
          { key: "name", label: "Company", align: "left" },
          { key: "offerPrice", label: "Offer Price (Rs.)", align: "right" },
          { key: "issueSize", label: "Issue Size (Cr Rs.)", align: "right" },
          { key: "dates", label: "Issue Dates", align: "right" },
        ];
      case "Listed":
        return [
          { key: "name", label: "Company", align: "left" },
          { key: "currentPrice", label: "Current Price (Rs.)", align: "right" },
          { key: "listingPrice", label: "Listing Price (Rs.)", align: "right" },
          { key: "listedOn", label: "Listed On", align: "right" },
          {
            key: "changeOverListedPrice",
            label: "Change Over Listed",
            align: "right",
          },
          {
            key: "changeOverIssuePrice",
            label: "Change Over Issue",
            align: "right",
          },
        ];
      default:
        return [];
    }
  };

  // Render cell content based on column and data
  const renderCell = (item, column) => {
    switch (column.key) {
      case "name":
        return <span className="font-medium">{item.name}</span>;

      case "offerPrice":
        return `${item.offerPrice.toLocaleString("en-IN", {
          maximumFractionDigits: 2,
        })}`;

      case "lotSize":
        return item.lotSize;

      case "subscription":
        return `${item.subscription.toFixed(2)}x`;

      case "issueSize":
        return item.issueSize.toLocaleString("en-IN");

      case "dates":
        return (
          <div className="flex flex-col">
            <span className="text-xs text-gray-800">
              Opens: {formatDate(item.openDate)}
            </span>
            <span className="text-xs text-gray-600">
              Closes: {formatDate(item.closeDate)}
            </span>
          </div>
        );

      case "currentPrice":
        return `${item.currentPrice.toLocaleString("en-IN", {
          maximumFractionDigits: 2,
        })}`;

      case "listingPrice":
        return `${item.listingPrice.toLocaleString("en-IN", {
          maximumFractionDigits: 2,
        })}`;

      case "listedOn":
        return formatDate(item.listedOn);

      case "changeOverListedPrice":
        const listedChangePercent = item.changeOverListedPricePercent;
        const isListedPositive = listedChangePercent > 0;
        return (
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <span
                className={isListedPositive ? "text-green-600" : "text-red-600"}
              >
                {isListedPositive ? "▲" : "▼"}
                {item.changeOverListedPrice.toFixed(2)}
              </span>
            </div>
            <span
              className={`text-sm ${
                isListedPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {listedChangePercent.toFixed(2)}%
            </span>
          </div>
        );

      case "changeOverIssuePrice":
        const issueChangePercent = item.changeOverIssuePricePercent;
        const isIssuePositive = issueChangePercent > 0;
        return (
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <span
                className={isIssuePositive ? "text-green-600" : "text-red-600"}
              >
                {isIssuePositive ? "▲" : "▼"}
                {item.changeOverIssuePrice.toFixed(2)}
              </span>
            </div>
            <span
              className={`text-sm ${
                isIssuePositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {issueChangePercent.toFixed(2)}%
            </span>
          </div>
        );

      default:
        return item[column.key];
    }
  };

  // Helper function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <SidebarAndNavbar>
      <div className="shadow-[0px_0px_15px_rgba(0,0,0,0.05),0px_-10px_25px_rgba(0,0,0,0.05)] h-auto p-5 pb-2 bg-gray-100 rounded-t-xl">
        <div className="flex items-center py-3 mb-2">
          <Link
            to="/marketHome"
            className="pl-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-blue-600" />
          </Link>
          <h1 className="text-2xl ml-2">IPOs</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full ml-auto">
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        <nav className="border-b mb-6">
          <div className="flex gap-8">
            {["Ongoing", "Upcoming", "Listed"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`pb-4 px-1 relative ${
                  activeTab === category
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {category}
                {activeTab === category && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="shadow-[0px_15px_15px_rgba(0,0,0,0.1),0px_-10px_25px_rgba(0,0,0,0)] h-auto p-6 pb-2 bg-white rounded-b-xl">
        <div className="overflow-x-auto bg-white rounded-lg px-0 py-0">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {getTableHeaders().map((header, index) => (
                  <th
                    key={index}
                    className={`px-6 py-3 text-${header.align} text-xs font-medium text-gray-500 uppercase`}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {getData(activeTab).map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {getTableHeaders().map((column, j) => (
                    <td key={j} className={`px-6 py-4 text-${column.align}`}>
                      {renderCell(item, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SidebarAndNavbar>
  );
}

const data = {
  Ongoing: [
    {
      name: "Reliance Industries",
      offerPrice: 2850.75,
      lotSize: 500,
      subscription: 1.2,
      issueSize: 2000,
      openDate: "2025-03-10",
      closeDate: "2025-03-15",
    },
    {
      name: "Tata Consultancy Services",
      offerPrice: 4150.5,
      lotSize: 300,
      subscription: 1.8,
      issueSize: 1500,
      openDate: "2025-03-12",
      closeDate: "2025-03-18",
    },
    {
      name: "Infosys",
      offerPrice: 1575.2,
      lotSize: 400,
      subscription: 2.3,
      issueSize: 1800,
      openDate: "2025-03-08",
      closeDate: "2025-03-14",
    },
    {
      name: "HDFC Bank",
      offerPrice: 1650.6,
      lotSize: 600,
      subscription: 1.5,
      issueSize: 2500,
      openDate: "2025-03-05",
      closeDate: "2025-03-10",
    },
    {
      name: "ICICI Bank",
      offerPrice: 955.75,
      lotSize: 550,
      subscription: 2.0,
      issueSize: 3000,
      openDate: "2025-03-15",
      closeDate: "2025-03-20",
    },
    {
      name: "Larsen & Toubro",
      offerPrice: 3250.4,
      lotSize: 350,
      subscription: 1.7,
      issueSize: 1700,
      openDate: "2025-03-17",
      closeDate: "2025-03-22",
    },
    {
      name: "Bharti Airtel",
      offerPrice: 960.25,
      lotSize: 450,
      subscription: 2.5,
      issueSize: 1200,
      openDate: "2025-03-20",
      closeDate: "2025-03-25",
    },
    {
      name: "State Bank of India",
      offerPrice: 665.3,
      lotSize: 700,
      subscription: 1.9,
      issueSize: 2800,
      openDate: "2025-03-10",
      closeDate: "2025-03-16",
    },
    {
      name: "Wipro",
      offerPrice: 725.8,
      lotSize: 380,
      subscription: 1.4,
      issueSize: 1300,
      openDate: "2025-03-13",
      closeDate: "2025-03-18",
    },
    {
      name: "Tata Motors",
      offerPrice: 680.9,
      lotSize: 500,
      subscription: 2.1,
      issueSize: 1600,
      openDate: "2025-03-07",
      closeDate: "2025-03-12",
    },
  ],

  Upcoming: [
    {
      name: "Hindustan Unilever",
      offerPrice: 2725.5,
      issueSize: 2400,
      openDate: "2025-04-01",
      closeDate: "2025-04-06",
    },
    {
      name: "ITC",
      offerPrice: 440.8,
      issueSize: 1100,
      openDate: "2025-04-05",
      closeDate: "2025-04-10",
    },
    {
      name: "Kotak Mahindra Bank",
      offerPrice: 1785.9,
      issueSize: 1900,
      openDate: "2025-04-03",
      closeDate: "2025-04-08",
    },
    {
      name: "Axis Bank",
      offerPrice: 1015.75,
      issueSize: 2100,
      openDate: "2025-04-07",
      closeDate: "2025-04-12",
    },
    {
      name: "Mahindra & Mahindra",
      offerPrice: 1820.4,
      issueSize: 1550,
      openDate: "2025-04-09",
      closeDate: "2025-04-14",
    },
    {
      name: "HCL Technologies",
      offerPrice: 1535.25,
      issueSize: 1750,
      openDate: "2025-04-02",
      closeDate: "2025-04-07",
    },
    {
      name: "Sun Pharmaceutical",
      offerPrice: 1060.6,
      issueSize: 1250,
      openDate: "2025-04-06",
      closeDate: "2025-04-11",
    },
    {
      name: "UltraTech Cement",
      offerPrice: 8800.9,
      issueSize: 1450,
      openDate: "2025-04-04",
      closeDate: "2025-04-09",
    },
    {
      name: "Maruti Suzuki",
      offerPrice: 10520.4,
      issueSize: 2200,
      openDate: "2025-04-08",
      closeDate: "2025-04-13",
    },
    {
      name: "Nestle India",
      offerPrice: 23550.3,
      issueSize: 2750,
      openDate: "2025-04-10",
      closeDate: "2025-04-15",
    },
  ],

  Listed: [
    {
      name: "Adani Enterprises",
      currentPrice: 2835.5,
      listingPrice: 2750.4,
      listedOn: "2025-02-25",
      changeOverListedPrice: 85.1,
      changeOverListedPricePercent: -3.1,
      issuePrice: 2600.0,
      changeOverIssuePrice: 235.5,
      changeOverIssuePricePercent: -9.06,
    },
    {
      name: "Bajaj Finance",
      currentPrice: 7425.8,
      listingPrice: 7350.2,
      listedOn: "2025-02-20",
      changeOverListedPrice: 75.6,
      changeOverListedPricePercent: 1.03,
      issuePrice: 7200.0,
      changeOverIssuePrice: 225.8,
      changeOverIssuePricePercent: 3.13,
    },
    {
      name: "Hindalco",
      currentPrice: 565.4,
      listingPrice: 550.0,
      listedOn: "2025-02-15",
      changeOverListedPrice: 15.4,
      changeOverListedPricePercent: -2.8,
      issuePrice: 520.0,
      changeOverIssuePrice: 45.4,
      changeOverIssuePricePercent: -8.73,
    },
    {
      name: "Tata Steel",
      currentPrice: 1360.2,
      listingPrice: 1300.0,
      listedOn: "2025-02-12",
      changeOverListedPrice: 60.2,
      changeOverListedPricePercent: 4.6,
      issuePrice: 1250.0,
      changeOverIssuePrice: 110.2,
      changeOverIssuePricePercent: 8.8,
    },
    {
      name: "Dr. Reddy's",
      currentPrice: 5450.9,
      listingPrice: 5300.0,
      listedOn: "2025-02-10",
      changeOverListedPrice: 150.9,
      changeOverListedPricePercent: 2.84,
      issuePrice: 5150.0,
      changeOverIssuePrice: 300.9,
      changeOverIssuePricePercent: 5.84,
    },
    {
      name: "Britannia Industries",
      currentPrice: 5260.7,
      listingPrice: 5200.0,
      listedOn: "2025-02-08",
      changeOverListedPrice: 60.7,
      changeOverListedPricePercent: 1.17,
      issuePrice: 5100.0,
      changeOverIssuePrice: 160.7,
      changeOverIssuePricePercent: 3.15,
    },
    {
      name: "Grasim Industries",
      currentPrice: 2045.6,
      listingPrice: 1980.0,
      listedOn: "2025-02-05",
      changeOverListedPrice: 65.6,
      changeOverListedPricePercent: 3.31,
      issuePrice: 1900.0,
      changeOverIssuePrice: 145.6,
      changeOverIssuePricePercent: 7.66,
    },
    {
      name: "Cipla",
      currentPrice: 1350.9,
      listingPrice: 1320.0,
      listedOn: "2025-02-02",
      changeOverListedPrice: 30.9,
      changeOverListedPricePercent: -2.34,
      issuePrice: 1280.0,
      changeOverIssuePrice: 70.9,
      changeOverIssuePricePercent: -5.54,
    },
    {
      name: "JSW Steel",
      currentPrice: 795.4,
      listingPrice: 780.0,
      listedOn: "2025-01-29",
      changeOverListedPrice: 15.4,
      changeOverListedPricePercent: 1.97,
      issuePrice: 750.0,
      changeOverIssuePrice: 45.4,
      changeOverIssuePricePercent: 6.05,
    },
    {
      name: "Divi's Laboratories",
      currentPrice: 3725.3,
      listingPrice: 3650.0,
      listedOn: "2025-01-25",
      changeOverListedPrice: 75.3,
      changeOverListedPricePercent: 2.06,
      issuePrice: 3500.0,
      changeOverIssuePrice: 225.3,
      changeOverIssuePricePercent: 6.44,
    },
  ],
};

const getData = (tab) => data[tab] || [];
