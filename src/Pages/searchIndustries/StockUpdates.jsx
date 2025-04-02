import React, { useState } from "react";
import { Newspaper } from "lucide-react";
import { useParams } from "react-router-dom";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";
import StockHeader from "../../components/StockHeader";

export default function StockUpdates() {
  const [subTab, setSubTab] = useState("News");
  const { ticker } = useParams();

  return (
    <SidebarAndNavbar>
      <div className="min-h-screen bg-white">
        <StockHeader defaultActiveTab="updates" ticker={ticker} />

        <div className="bg-white p-4">
          <div className="rounded-lg p-4 shadow-[0_0_5px_rgba(0,0,0,0.15)]">
            <div className="options inline-flex justify-center items-center bg-gray-100 rounded-lg px-1 mb-5">
              {["News", "Announcements"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSubTab(t)}
                  className={`flex justify-center items-center cursor-pointer text-sm px-4 py-1 my-1 rounded ${
                    subTab === t ? "bg-white shadow-sm" : "bg-gray-100"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="space-y-6">
              {newsUpdates.map((news, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-[0_0_5px_rgba(0,0,0,0.15)] hover:shadow-[0_0_8px_rgba(0,0,0,0.3)] transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">{news.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {news.sector}
                      </p>
                      <div className="flex items-center text-xs text-gray-400">
                        <Newspaper className="w-4 h-4 mr-1" />
                        <span>{news.time}</span>
                      </div>
                    </div>
                    {news.image && (
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarAndNavbar>
  );
}

const newsUpdates = [
  {
    title:
      "Wipro Limited secured Multi-Million-Dollar Deal by Etihad Airways for IT Transformation and Cost Optimization",
    sector: "IT - Software",
    time: "2 hours ago",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title:
      "Praj Industries reported total income of Rs 866.79 crores, up by 3.47% (YoY) & profit of Rs 41.10 crores, up by 41.62% (YoY) in Q3 FY 2025",
    sector: "Engineering - Industrial Equipments",
    time: "3 hours ago",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title:
      "Navin Fluorine International Limited reported total revenue of Rs 616.68 crores, up by 20.43% (YoY) & net profit of Rs 83.60 crores, up by 7.15% (YoY) in Q3 FY 2025",
    sector: "Chemicals",
    time: "4 hours ago",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
];
