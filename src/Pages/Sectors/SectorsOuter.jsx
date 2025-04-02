import React, { useState, useEffect } from "react";
import { Search, ArrowLeft, Share2 } from "lucide-react";
import axios from "axios";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";

const SectorsOuter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSector, setExpandedSector] = useState(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [sectorsData, setSectorsData] = useState([]);
  const [industriesData, setIndustriesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [realSectsAndIndusts, setRealSectsAndIndusts] = useState(null);
  const [sectsIndustsStocks, setSectsIndustsStocks] = useState(null);
  const navigate = useNavigate();

  // Format numbers for display
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  // Fetch data for all sectors dynamically
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       // List of sectors to fetch data for
  //       const sectors = [
  //         "technology",
  //         "financial-services",
  //         "consumer-cyclical",
  //         "healthcare",
  //         "communication-services",
  //         "industrials",
  //         "consumer-defensive",
  //         "energy",
  //         "real-estate",
  //         "basic-materials",
  //         "utilities",
  //       ];

  //       // Fetch data for each sector
  //       const responses = await Promise.allSettled(
  //         sectors.map((sector) =>
  //           axios.get(
  //             `https://diamond-rock-django-backend1.onrender.com/api/sector/${sector}/overview/`
  //           )
  //         )
  //       );

  //       // Process the responses
  //       const data = responses
  //         .map((response, index) => {
  //           if (response.status === "fulfilled") {
  //             const { key, name, overview, symbol } = response.value.data.data;
  //             return {
  //               name,
  //               icon: getIconForSector(name), // Helper function to map icons
  //               industries: overview.industries_count,
  //               stocks: overview.companies_count,
  //               mcap: overview.market_cap,
  //               change: -Math.random() * 2, // Placeholder for change percentage
  //               subsectors: [], // Placeholder for subsectors
  //               symbol, // Include the symbol field
  //             };
  //           }
  //           return null; // Handle failed requests gracefully
  //         })
  //         .filter(Boolean); // Remove null values

  //       setSectorsData(data);
  //     } catch (err) {
  //       setError("An error occurred while fetching data.");
  //     }
  //   };
  //   fetchData();
  // }, []);

  // Fetch industries data for a specific sector
  // useEffect(() => {
  //   if (expandedSector) {
  //     const fetchIndustries = async () => {
  //       try {
  //         // Convert sector name to URL-friendly format
  //         const urlFriendlySectorName = expandedSector
  //           .toLowerCase()
  //           .replace(/\s+/g, "-");
  //         const response = await axios.get(
  //           `https://diamond-rock-django-backend1.onrender.com/api/sector/${urlFriendlySectorName}/industries/`
  //         );
  //         const industries = response.data.data.map((industry) => ({
  //           name: industry.name,
  //           symbol: industry.symbol,
  //           marketWeight: industry["market weight"],
  //         }));
  //         setIndustriesData((prev) => ({
  //           ...prev,
  //           [expandedSector]: industries,
  //         }));
  //       } catch (err) {
  //         console.error("Error fetching industries:", err);
  //       }
  //     };
  //     fetchIndustries();
  //   }
  // }, [expandedSector]);

  // Helper function to map sector names to icons
  const getIconForSector = (sectorName) => {
    const iconMap = {
      Technology: "💻",
      "Financial Services": "💰",
      "Consumer Cyclical": "🛍️",
      Healthcare: "🏥",
      "Communication Services": "📡",
      Industrials: "🏗️",
      "Consumer Defensive": "🛒",
      Energy: "🛢️",
      "Real Estate": "🏠",
      "Basic Materials": "⛏️",
      Utilities: "⚡",
    };
    return iconMap[sectorName] || "❓"; // Default icon if not found
  };

  // Filter sectors based on search term
  const filteredSectors = sectorsData.filter((sector) =>
    sector.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(()=> {
    const getOriginalSectsAndIndusts = async () => {
      const response = await axios.post(
        "https://diamond-rock-node-backend.onrender.com/stock/dbtype",
        {dbInstance: "sectorIndustryDB"},
        {headers: {"Content-Type": "application/json"}}
      );
      let mainData = Object.entries(response.data.databases);
      let sectorEmos = ["🛠️", "🌾", "🍾", "🚗", "✈️", "🏦", "🏗️", "🧪", "🏠", "📺", "🛢️", "💎", "🔄", "💡", "🛒", "⚙️", "💰", "🔥", "⚕️", "🍽️", "🔩", "💻", "🚧", "🔨", "🚚", "🎥", "⛏️", "❓", "🥇", "📚", "📜", "📷", "🛍️", "⚡", "⭐", "🏢", "🛍️", "🚢", "📡", "👕", "🔄", "🎬", "🏢", "📍"];
      for(let i=0; i<mainData.length; i++) {
        mainData[i][2] = sectorEmos[i];
      }
      console.log(mainData);
      setRealSectsAndIndusts(mainData);
      setLoading(false);
    }
    
    getOriginalSectsAndIndusts();
  }, []);

  // useEffect(() => {
  //   const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  //   const getNumberOfStocks = async () => {

  //   }
  // });

  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />
        <main
          className={`flex-1 p-4 transition-all duration-300 ${
            isSidebarExpanded ? "ml-[calc(3rem+16rem)]" : "ml-[4.5rem]"
          } max-w-[calc(100vw-${
            isSidebarExpanded ? "calc(3rem+16rem)" : "4.5rem"
          })] overflow-x-hidden`}
        >
          <div className="shadow-[0px_0px_15px_rgba(0,0,0,0.05),0px_-10px_25px_rgba(0,0,0,0.05)] h-auto p-5 pb-2 bg-gray-100 rounded-t-xl">
            <div className="flex items-center py-3 mb-2">
              <Link
                to="/sector-overview"
                className="pl-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="h-5 w-5 text-blue-600" />
              </Link>
              <h1 className="text-2xl ml-2">Sectors</h1>
              <button className="p-2 hover:bg-gray-100 rounded-full ml-auto">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* in here */}
          <div className="shadow-[0px_15px_15px_rgba(0,0,0,0.1),0px_-10px_25px_rgba(0,0,0,0)] h-auto p-6 pb-2 bg-white rounded-b-xl">
            {/* Search Bar */}
            <div className="mb-4">
              <Search className="absolute ml-3 text-gray-500 flex mt-2" />
              <input
                type="text"
                placeholder="Search sectors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border p-2 w-full rounded-md"
              />
            </div>

            {/* Sectors List */}

            {/* Loading State */}
            {loading && (
              <div className="text-center text-gray-500">Loading...</div>
            )}

            {/* Error State */}
            {error && <div className="text-center text-red-500">{error}</div>}

            {!loading && !error && (
              <div className="border rounded-xl mb-3">
                {/* Headers */}
                <table className="table-auto w-full">
                  <thead>
                    <tr className="text-black bg-gray-50 border-b rounded-lg">
                      <th className="pl-10 py-2 text-left font-light text-black rounded-tl-xl">
                        Sector
                      </th>
                      {/* <th className="px-0 py-2 text-right w-fit font-medium whitespace-nowrap">
                        Market Cap (Cr.)
                      </th>
                      <th className="px-0 py-2 text-right w-fit font-medium whitespace-nowrap pr-5 rounded-tr-xl">
                        Change %
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                  {realSectsAndIndusts && realSectsAndIndusts.map(([key, value, emoji], index) => {
                    console.log("key = ", key);
                    console.log("value = ", value);
                    console.log("emoji = ", emoji);
                    return (
                      <>
                        <tr key={index}
                        className={`text-gray-800 hover:bg-gray-50 ${
                          index !== realSectsAndIndusts.length - 1
                            ? "border-b"
                            : ""
                        }`}
                      >
                        <td
                          className="pl-10 py-1 whitespace-normal font-light text-gray-800 cursor-pointer"
                          onClick={() =>
                            setExpandedSector(
                              expandedSector === key
                                ? null
                                : key
                            )
                          }
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{emoji}</span>{" "}
                            <div>
                              <p className="text-md text-black">
                                {capitalize(key.split("_").join(" "))}
                              </p>
                              <p className="text-sm text-gray-500">
                                Industries: {value.length}
                                 {/* | Stocks:{" "}
                                {value.length} */}
                              </p>
                            </div>
                          </div>
                        </td>
                        {/* <td className="px-0 py-1 text-right w-fit whitespace-nowrap text-gray-600 font-light">
                          {formatNumber(6969.69)}
                        </td>
                        <td className="px-0 py-1 text-right w-fit whitespace-nowrap text-red-500 font-light pr-5">
                          ▼ {Math.abs(69.69).toFixed(2)}%
                        </td> */}
                        </tr>
                        {
                          expandedSector === key && (
                            <tr>
                            <td colSpan="3" className="py-0">
                              <div className="mt-0 ml-10 mr-5 mb-2 shadow-md rounded-b-lg px-4 bg-white">
                                {value?.length > 0 ? (
                                  <table className="w-full">
                                    <tbody>
                                      {value.map(
                                        (industry) => (
                                          <tr
                                            key={industry}
                                            className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                                            onClick={() =>
                                              navigate(
                                                `/sector/${key}/industry/${industry}`
                                              )
                                            }
                                          >
                                            <td className="py-2">
                                              <div className="flex items-center">
                                                <span className="text-lg text-blue-500 mr-2">
                                                  ●
                                                </span>
                                                <span className="font-medium">
                                                  {capitalize(industry.split("_")[0])}
                                                </span>
                                              </div>
                                            </td>
                                            {/* <td className="py-2 text-right text-gray-600">
                                              Market Weight:{" "}
                                              {(
                                                industry.marketWeight * 100
                                              ).toFixed(2)}
                                              %
                                            </td> */}
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                ) : (
                                  <div className="text-center m-3 pb-3 text-gray-500">
                                    No industries available
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                          )
                        }
                      </>
                    
                )
                  })}
                    {/* {filteredSectors.map((sector, index) => (
                      <React.Fragment key={sector.name}>
                        <tr
                          className={`text-gray-800 hover:bg-gray-50 ${
                            index !== filteredSectors.length - 1
                              ? "border-b"
                              : ""
                          }`}
                        >
                          <td
                            className="pl-10 py-1 whitespace-normal font-light text-gray-800 cursor-pointer"
                            onClick={() =>
                              setExpandedSector(
                                expandedSector === sector.name
                                  ? null
                                  : sector.name
                              )
                            }
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{sector.icon}</span>{" "}
                              <div>
                                <p className="text-md text-black">
                                  {sector.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Industries: {sector.industries} | Stocks:{" "}
                                  {sector.stocks}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-0 py-1 text-right w-fit whitespace-nowrap text-gray-600 font-light">
                            {formatNumber(sector.mcap)}
                          </td>
                          <td className="px-0 py-1 text-right w-fit whitespace-nowrap text-red-500 font-light pr-5">
                            ▼ {Math.abs(sector.change).toFixed(2)}%
                          </td>
                        </tr>

                        {expandedSector === sector.name && (
                          <tr>
                            <td colSpan="3" className="py-0">
                              <div className="mt-0 ml-10 mr-5 mb-2 shadow-md rounded-b-lg px-4 bg-white">
                                {industriesData[sector.name]?.length > 0 ? (
                                  <table className="w-full">
                                    <tbody>
                                      {industriesData[sector.name].map(
                                        (industry) => (
                                          <tr
                                            key={industry.name}
                                            className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                                            onClick={() =>
                                              navigate(
                                                `/sector/${sector.name}/industry/${industry.name}`
                                              )
                                            }
                                          >
                                            <td className="py-2">
                                              <div className="flex items-center">
                                                <span className="text-lg text-blue-500 mr-2">
                                                  ●
                                                </span>
                                                <span className="font-medium">
                                                  {industry.name}
                                                </span>
                                              </div>
                                            </td>
                                            <td className="py-2 text-right text-gray-600">
                                              Market Weight:{" "}
                                              {(
                                                industry.marketWeight * 100
                                              ).toFixed(2)}
                                              %
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                ) : (
                                  <div className="text-center m-3 pb-3 text-gray-500">
                                    No industries available
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))} */}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SectorsOuter;
