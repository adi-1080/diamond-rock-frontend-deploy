import React, { useState, useEffect } from "react";
import { ArrowLeft, Share2 } from "lucide-react";
import { useParams } from "react-router-dom";

const SectorsGainers = (props) => {
    const { sectorName } = useParams(); // Extract sectorName from URL
    const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
    const [selectedExchange, setSelectedExchange] = useState("NSE");
    const [gainersData, setGainersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gainers, setGainers] = useState("");

    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const timeframes = ["1D", "1W", "1M", "3M", "6M", "1Y", "2Y", "5Y"];
    const exchanges = ["NSE", "BSE"];

    // Fetch data from the API
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         setError(null);
    //         try {
    //             const apiUrl = `https://diamond-rock-django-backend1.onrender.com/api/screener/day_gainers_sectorwise`;
    //             const queryParams = new URLSearchParams({
    //                 sector: sectorName,
    //                 region: "in",
    //                 min_price: "1",
    //                 min_change_percent: "2",
    //                 sortAsc: "false",
    //             });
    //             const response = await fetch(`${apiUrl}?${queryParams}`);
    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch data");
    //             }
    //             const data = await response.json();
    //             setGainersData(data.quotes); // Assuming the API returns a 'quotes' array
    //         } catch (err) {
    //             setError("An error occurred while fetching data.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, [sectorName]);

    useEffect(() => {
        if (props.tabData && Array.isArray(props.tabData)) {
            const filteredGainers = props.tabData
            .filter(item => item["Chg%"] > 0) // Keep only positive gainers
            .sort((a, b) => b["Chg%"] - a["Chg%"]); // Sort in descending order
    
            setGainers(filteredGainers); // Update state with processed gainers
        }
        setLoading(false);
    }, [props.tabData]);

    return (
        <div
            className="max-w-full mx-auto bg-white"
            style={{ fontFamily: "Trebuchet MS" }}
        >
            

            {/* Date and Toggles */}
            <div className="p-2 flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600">{currentDate}</div>
                <div className="flex gap-4">
                    {/* Time Period Toggle */}
                    <div className="inline-flex justify-center items-center bg-gray-100 rounded-lg px-1">
                        {timeframes.map((time) => (
                            <button
                                key={time}
                                className={`flex justify-center items-center cursor-pointer text-xs px-4 py-1 my-1 rounded ${
                                    selectedTimeframe === time
                                        ? "bg-white shadow-sm"
                                        : "bg-gray-100"
                                }`}
                                onClick={() => setSelectedTimeframe(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                    {/* Exchange Toggle */}
                    <div className="inline-flex justify-center items-center bg-gray-100 rounded-lg px-1">
                        {exchanges.map((exchange) => (
                            <button
                                key={exchange}
                                className={`flex justify-center items-center cursor-pointer text-xs px-4 py-1 my-1 rounded ${
                                    selectedExchange === exchange
                                        ? "bg-white shadow-sm"
                                        : "bg-gray-100"
                                }`}
                                onClick={() => setSelectedExchange(exchange)}
                            >
                                {exchange}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading && <div className="text-center text-gray-500">Loading...</div>}

            {/* Error State */}
            {error && <div className="text-center text-red-500">{error}</div>}

            {/* Table */}
            {!loading && !error && gainers.length > 0 && (
                <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Stock Name
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                LTP
                            </th>
                            {/* <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                Chg
                            </th> */}
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                Chg%
                            </th>
                            {/* <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                Last Update
                            </th> */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {gainers.map((stock, index) => {
                            // const data = {
                            //     price: stock.regularMarketPrice,
                            //     change: stock.regularMarketChange,
                            //     changePercent: stock.regularMarketChangePercent,
                            // };
                            return (
                                <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex items-center gap-2">
                                            <span>📊</span> {/* Placeholder icon */}
                                            <div>
                                                <div className="text-sm text-gray-700 font-light text-black">
                                                    {stock["Stock Name"]}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right font-light">
                                        {stock["LTP"]}
                                    </td>
                                    {/* <td
                                        className={`px-6 py-4 text-right font-light ${
                                            data.change >= 0 ? "text-emerald-600" : "text-red-600"
                                        }`}
                                    >
                                        {data.change.toFixed(2)}
                                    </td> */}
                                    <td
                                        className={`px-6 py-4 text-right ${
                                            stock["Chg%"] && stock["Chg%"] >= 0
                                                ? "text-emerald-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {stock["Chg%"] && stock["Chg%"] >= 0 ? "▲" : "▼"}{" "}
                                        {stock["Chg%"] ? Math.abs(stock["Chg%"]).toFixed(1) : "NaN"}%
                                    </td>
                                    {/* <td className="px-6 py-4 text-right text-gray-500 text-sm">
                                        {new Date(stock.regularMarketTime * 1000).toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        })}
                                    </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {/* No Data State */}
            {!loading && !error && gainers.length === 0 && (
                <div className="text-center text-gray-500">No gainers found for this industry.</div>
            )}
        </div>
    );
};

export default SectorsGainers;