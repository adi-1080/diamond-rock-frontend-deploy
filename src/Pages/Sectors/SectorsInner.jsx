// SectorsInner.js
import React, { act, useEffect, useState } from "react";
import { ArrowLeft, Share2 } from "lucide-react";
import SectorNews from "./SectorsNews";
import SectorsGainers from "./SectorsGainers";
import SectorsLosers from "./SectorsLosers";
import AllStocksSection from "./AllStocksSection";
import SectorsBreadth from "./SectorsBreadth";
import sectorsSubscribedData from "../../../content/SectorsSubscribedContent.json";
import SectorsIndustries from "./SectorsIndustries";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import axios from "axios";

export default function SectorsInner() {
    const { sectorName, industryName } = useParams(); // Extract parameters from URL
    const [activeMainTab, setActiveMainTab] = useState("all-stocks");
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [tabData, setTabData] = useState([]);
    console.log(sectorName, industryName);
    
    useEffect(() => {
        const getData = async () => {
            let apiLink = "";
            let apiObj = "";
            if(activeMainTab === "all-stocks" || activeMainTab === "industries") {
                apiLink = "https://diamond-rock-node-backend.onrender.com/stock/getcollectiondata",
                apiObj = {
                    dbType: "sectorIndustryDB",
                    dbName: sectorName,
                    collectionName: industryName,
                }
            }
            const response = await axios.post(
                "https://diamond-rock-node-backend.onrender.com/stock/getcollectiondata",
                {
                    dbType: "sectorIndustryDB",
                    dbName: sectorName,
                    collectionName: industryName,
                },
                {
                    headers: {"Content-Type": "application/json"}
                },
            );
            console.log("tabData in inner sector page: ", response.data.data);
            setTabData(response.data.data);
        }
        getData();
    }, []);


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
                    <div className="min-h-screen">
                        <div className="shadow-[0px_0px_15px_rgba(0,0,0,0.05),0px_-10px_25px_rgba(0,0,0,0.05)] h-auto p-4 pb-2 bg-gray-100 rounded-t-xl">
                            <div className="sticky top-0 bg-gray-100 ">
                                <div className="flex items-center py-3">
                                    <Link
                                        to="/sector-overview"
                                        className="pl-2 hover:bg-gray-100 rounded-full"
                                    >
                                        <ArrowLeft className="h-5 w-5 text-blue-600" />
                                    </Link>
                                    <h1 className="text-2xl ml-2">{sectorName}</h1>
                                    <button className="p-2 hover:bg-gray-100 rounded-full ml-auto">
                                        <Share2 className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="flex overflow-x-auto ">
                                    {[
                                        "All Stocks",
                                        "Industries",
                                        "Gainers",
                                        "Losers",
                                        "Technicals",
                                        "Results",
                                        "Shareholding",
                                        "Breadth",
                                        "Deliveries",
                                        "VWAP",
                                        "News",
                                        "Events",
                                    ].map((tab) => (
                                        <button
                                            key={tab}
                                            className={`px-4 py-3 text-m whitespace-nowrap ${
                                                activeMainTab === tab.toLowerCase().replace(" ", "-")
                                                    ? "text-blue-600 border-b-2 border-blue-600"
                                                    : "text-gray-600 border-b-2 border-gray-200"
                                            }`}
                                            onClick={() =>
                                                setActiveMainTab(tab.toLowerCase().replace(" ", "-"))
                                            }
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-white shadow-[0px_15px_15px_rgba(0,0,0,0.1),0px_-10px_25px_rgba(0,0,0,0)] min-h-screen rounded-b-xl">
                            {activeMainTab === "all-stocks" && (
                                <AllStocksSection sectorName={sectorName} industryName={industryName} tabData={tabData} />
                            )}
                            {activeMainTab === "industries" && (
                                <SectorsIndustries sectorName={sectorName} industryName={industryName} tabData={tabData} />
                            )}
                            {activeMainTab === "gainers" && (
                                <SectorsGainers sectorName={sectorName} industryName={industryName} tabData={tabData} />
                            )}
                            {activeMainTab === "losers" && (
                                <SectorsLosers sectorName={sectorName} industryName={industryName} tabData={tabData} />
                            )}
                            {activeMainTab === "technicals" && (
                                <SectorsBreadth data={sectorsSubscribedData["breadth"]} />
                            )}
                            {activeMainTab === "results" && (
                                <SectorsBreadth data={sectorsSubscribedData["deliveries"]} />
                            )}
                            {activeMainTab === "shareholding" && (
                                <SectorsBreadth data={sectorsSubscribedData["vwap"]} />
                            )}
                            {activeMainTab === "breadth" && (
                                <SectorsBreadth data={sectorsSubscribedData["breadth"]} />
                            )}
                            {activeMainTab === "deliveries" && (
                                <SectorsBreadth data={sectorsSubscribedData["deliveries"]} />
                            )}
                            {activeMainTab === "vwap" && (
                                <SectorsBreadth data={sectorsSubscribedData["vwap"]} />
                            )}
                            {activeMainTab === "news" && <SectorNews />}
                            {activeMainTab === "events" && (
                                <div className="flex justify-center items-center text-xl">No Events Found</div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}