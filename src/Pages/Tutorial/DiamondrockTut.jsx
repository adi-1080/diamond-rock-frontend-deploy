import { ArrowLeft, Share2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import thumbnail0 from "./images/thumbnail0.png";
import thumbnail1 from "./images/thumbnail1.png";
import thumbnail2 from "./images/thumbnail2.png";
import thumbnail3 from "./images/thumbnail3.png";
import thumbnail4 from "./images/thumbnail4.png";
import thumbnail5 from "./images/thumbnail5.png";
import thumbnail6 from "./images/thumbnail6.png";
import thumbnail7 from "./images/thumbnail7.png";
import thumbnail8 from "./images/thumbnail8.png";
import thumbnail9 from "./images/thumbnail9.png";
import thumbnail10 from "./images/thumbnail10.png";
import thumbnail11 from "./images/thumbnail11.png";
import thumbnail12 from "./images/thumbnail12.png";
import thumbnail13 from "./images/thumbnail13.png";
import thumbnail14 from "./images/thumbnail14.png";
import thumbnail15 from "./images/thumbnail15.png";
import thumbnail16 from "./images/thumbnail16.png";
import thumbnail17 from "./images/thumbnail17.png";
import thumbnail18 from "./images/thumbnail18.png";
import thumbnail19 from "./images/thumbnail19.png";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

export default function DiamondrockTut() {
  return (
    <SidebarAndNavbar>
      <div className="min-h-screen">
        <div className="shadow-[0px_0px_15px_rgba(0,0,0,0.05),0px_-10px_25px_rgba(0,0,0,0.05)] h-auto p-4 bg-gray-100 rounded-t-xl">
          <div className="sticky top-0 z-50 bg-gray-100 ">
            <div className="flex items-center py-3">
              <Link
                to="/marketHome"
                className="pl-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="h-5 w-5 text-blue-600" />
              </Link>
              <h1 className="text-2xl ml-2">Diamondrock Tutorials</h1>
              <button className="p-2 hover:bg-gray-100 rounded-full ml-auto">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white shadow-[0px_15px_15px_rgba(0,0,0,0.1),0px_-10px_25px_rgba(0,0,0,0)] rounded-b-xl">
          {playlistsData.map((playlist, index) => (
            <div key={index} className="w-full mb-8 relative">
              <h1 className="text-xl font-semibold text-gray-900 mb-2">
                {playlist.title}
              </h1>
              {/* Videos Grid */}
              <div className="w-full overflow-x-auto pb-2">
                <div className="flex space-x-4 min-w-max">
                  {playlist.videos.map((video, index) => (
                    <div
                      key={video.title}
                      className="bg-white p-3 rounded-xl border border-2 cursor-pointer w-[250px] group"
                    >
                      <div className="relative w-full overflow-hidden rounded-lg">
                        <div className="transition-transform duration-300 group-hover:scale-110">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full object-cover rounded-lg"
                          />
                        </div>
                        {/* Video Duration in Bottom Right Corner */}
                        <span className="absolute bottom-2 right-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded-md opacity-70">
                          {video.duration}
                        </span>
                      </div>
                      <h2 className="text-lg mt-2 leading-tight">
                        {video.title}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarAndNavbar>
  );
}

let playlistsData = [
  {
    title: "Stock Market Basics",
    videos: [
      {
        thumbnail: thumbnail0,
        title: "What is the Stock Market?",
        duration: "5:10",
      },
      {
        thumbnail: thumbnail1,
        title: "How to Buy Your First Stock?",
        duration: "6:20",
      },
      {
        thumbnail: thumbnail2,
        title: "Understanding Market Indices",
        duration: "7:00",
      },
      {
        thumbnail: thumbnail3,
        title: "Types of Stocks Explained",
        duration: "4:45",
      },
      {
        thumbnail: thumbnail4,
        title: "Bull vs Bear Market: Key Differences",
        duration: "6:05",
      },
      {
        thumbnail: thumbnail5,
        title: "Stock Market Myths & Facts",
        duration: "5:30",
      }, // New video added
    ],
  },
  {
    title: "Technical Analysis for Traders",
    videos: [
      {
        thumbnail: thumbnail6,
        title: "Introduction to Chart Patterns",
        duration: "8:30",
      },
      {
        thumbnail: thumbnail7,
        title: "Support & Resistance Levels",
        duration: "7:45",
      },
      {
        thumbnail: thumbnail8,
        title: "How to Read Candlestick Charts?",
        duration: "6:50",
      },
      {
        thumbnail: thumbnail9,
        title: "Moving Averages Explained",
        duration: "5:35",
      },
    ],
  },
  {
    title: "Investment Strategies",
    videos: [
      {
        thumbnail: thumbnail10,
        title: "How to Build a Diversified Portfolio",
        duration: "9:15",
      },
      {
        thumbnail: thumbnail11,
        title: "Best Long-Term Investment Strategies",
        duration: "7:40",
      },
      {
        thumbnail: thumbnail12,
        title: "Value vs Growth Investing",
        duration: "8:20",
      },
      {
        thumbnail: thumbnail13,
        title: "How to Pick Stocks Like a Pro",
        duration: "7:10",
      },
    ],
  },
  {
    title: "Trading Psychology & Risk Management",
    videos: [
      {
        thumbnail: thumbnail14,
        title: "Mastering Your Trading Mindset",
        duration: "6:40",
      },
      {
        thumbnail: thumbnail15,
        title: "How to Manage Risk in Trading",
        duration: "7:20",
      },
      {
        thumbnail: thumbnail16,
        title: "Common Trading Mistakes & How to Avoid Them",
        duration: "5:50",
      },
      {
        thumbnail: thumbnail17,
        title: "Position Sizing & Risk-Reward Ratio",
        duration: "6:15",
      },
    ],
  },
  {
    title: "Cryptocurrency & Blockchain",
    videos: [
      {
        thumbnail: thumbnail18,
        title: "What is Bitcoin & How Does It Work?",
        duration: "8:00",
      },
      {
        thumbnail: thumbnail19,
        title: "Blockchain Explained for Beginners",
        duration: "7:30",
      },
    ],
  },
];
