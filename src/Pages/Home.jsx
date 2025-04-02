import React, { useState, useEffect } from "react";
import searchIcon from "../assets/icons/search.png";
import coverImg from "../assets/images/cover.png";
import upIcon from "../assets/icons/upmark.png";
import graphIcon from "../assets/icons/graph.png";
import NavMain from "../components/NavMain";
import Footer from "../components/Footer";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";

const Home = () => {
  const [position, setPosition] = useState(0); // Track slide position
  const [isPaused, setIsPaused] = useState(false);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [data, setData] = useState([]);
  const visibleCountSlides = 4;

  const indices = [
    { name: "Nifty 50", ticker: "^NSEI" },
    { name: "Nifty Bank", ticker: "^NSEBANK" },
    { name: "Sensex", ticker: "^BSESN" },
    { name: "Nifty IT", ticker: "^CNXIT" },
    { name: "Nifty Financial Services", ticker: "NIFTY_FIN_SERVICE.NS" },
    { name: "Nifty 500", ticker: "^CRSLDX" },
    { name: "Nifty 100", ticker: "^CNX100" },
  ];
  // List of sliding buttons (total 9 buttons)
  const buttons = [
    "Trending Stocks",
    "FII/DII Activity",
    "Portfolio Analytics",
    "Market Insights",
    "Sector Trends",
    "Top Gainers",
    "Top Losers",
    "Mutual Funds",
    "IPO Updates",
  ];

  const visibleCount = 3; // Number of buttons visible at a time

  // Handle Next Slide
  const totalSlides = Math.ceil(data.length / visibleCountSlides);

  // Handle Next Slide
  const nextSlide = () => {
    setPosition((prev) => (prev + 1 < totalSlides ? prev + 1 : 0));
  };

  // Handle Previous Slide
  const prevSlide = () => {
    setPosition((prev) => (prev - 1 >= 0 ? prev - 1 : totalSlides - 1));
  };
  useEffect(() => {
    const fetchTopGainers = async () => {
      try {
        const response = await fetch(
          "https://diamond-rock-django-backend1.onrender.com/api/get_top_gainers"
        );
        const data = await response.json();
        // Assuming API returns an array of objects like { name, price, change }
        const formattedData = data.map((item) => ({
          Name: item.Name,
          Price: item.Price != null ? item.Price.toFixed(2) : "N/A",
          Change: `${item["Change %"]}%`,
          changeClass:
            item["Change %"] >= 0 ? "text-green-600" : "text-red-600",
        }));
        setTopGainers(formattedData);
      } catch (error) {
        console.error("Error fetching top gainers:", error);
      }
    };

    fetchTopGainers();
  }, []);

  useEffect(() => {
    const fetchTopLosers = async () => {
      try {
        const response = await fetch(
          "https://diamond-rock-django-backend1.onrender.com/api/get_top_losers"
        );
        const data = await response.json();

        // Assuming API returns an array of objects like { name, price, change }
        const formattedData = data.map((item) => ({
          name: item.Name,
          price: item.Price !== null ? item.Price.toFixed(2) : "N/A", // Handle null price
          change: `${item["Change %"]}%`, // Use the actual percentage change
          changeClass:
            item["Change %"] >= 0 ? "text-green-600" : "text-red-600",
        }));
        setTopLosers(formattedData);
      } catch (error) {
        console.error("Error fetching top gainers:", error);
      }
    };

    fetchTopLosers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://diamond-rock-django-backend1.onrender.com/api/get_multiple_historical_data/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tickers: indices.map((index) => index.ticker),
              period: "1m",
              interval: "1d",
            }),
          }
        );
        const historicalData = await response.json();

        const prevCloseData = await Promise.all(
          indices.map(async (index) => {
            try {
              const prevRes = await fetch(
                `https://diamond-rock-django-backend1.onrender.com/api/get_historical_data/${index.ticker}/?interval=1d&period=5d`
              );
              const prevData = await prevRes.json();
              // console.log(index.ticker, prevData);
              let lastClose = null;
              if (Array.isArray(prevData) && prevData.length > 0) {
                for (let i = prevData.length - 1; i >= 0; i--) {
                  if (prevData[i]?.Close != null) {
                    lastClose = prevData[i].Close;
                    break;
                  }
                }
              }
              let lastlastClose = null;
              if (Array.isArray(prevData) && prevData.length > 0) {
                for (let i = prevData.length - 2; i >= 0; i--) {
                  if (prevData[i]?.Close != null) {
                    lastlastClose = prevData[i].Close;
                    break;
                  }
                }
              }
              return { ticker: index.ticker, lastClose, lastlastClose };
            } catch (error) {
              console.error(
                `❌ Error fetching prevClose for ${index.ticker}:`,
                error
              );
              return { ticker: index.ticker, lastClose: null };
            }
          })
        );

        // Merge data
        const updatedData = indices.map((index) => {
          const tickerKey = `Close_${index.ticker}`;
          const close =
            historicalData.length > 0
              ? historicalData[0][tickerKey] || null
              : null;
          let prevClose = null;
          let prevprevClose = null;
          for (let i = 0; i < prevCloseData.length; i++) {
            if (prevCloseData[i].ticker === index.ticker) {
              prevClose = prevCloseData[i].lastClose;
              prevprevClose = prevCloseData[i].lastlastClose;
              break; // Stop loop once found
            }
          }
          const change =
            close === null
              ? (prevClose - prevprevClose).toFixed(2)
              : (close - prevClose).toFixed(2);

          const percentChange =
            close === null
              ? ((change / prevprevClose) * 100).toFixed(2)
              : ((change / prevClose) * 100).toFixed(2);
          const changeClass = change >= 0 ? "text-green-600" : "text-red-600";

          return {
            name: index.name,
            price: close === null ? prevClose.toFixed(2) : close.toFixed(2),
            change,
            percentChange,
            changeClass,
          };
        });

        setData([...updatedData]); // Ensure React recognizes the update
      } catch (error) {
        console.error("❌ Error fetching stock data:", error);
        setData(
          indices.map((index) => ({
            name: index.name,
            price: "Data Unavailable",
            change: "N/A",
            percentChange: "N/A",
            changeClass: "text-gray-600",
          }))
        );
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setPosition((prev) => (prev + 1) % indices.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [position, isPaused]);

  return (
    <div className="flex flex-col bg-slate-100">
      <NavMain />

      <div className="flex justify-between items-center h-[100vh] px-28">
        <div className="flex flex-col gap-8 w-[50%]">
          <div className="flex flex-col">
            <p className="font-bold text-blue-700 text-4xl">Become a Sharper</p>
            <p className="font-bold text-5xl">Investor and Trader</p>
            <p className="mt-5 w-[80%]">
              Discover investing & trading opportunities with India's trusted
              Stock market Research and Analytics App
            </p>
          </div>
          <div className="bg-white flex justify-between items-center w-[75%] p-1 rounded-[40px] border-2 border-solid border-gray-300">
            <input
              placeholder="Search for Stocks, MFs, Scans and more"
              type="text"
              className="w-[80%] p-4 rounded-3xl outline-none"
            />
            <button className="w-[50px] h-[50px] rounded-full bg-blue-600 flex justify-center items-center mx-2">
              <img
                src={searchIcon}
                className="w-[35px] h-[35px]"
                alt="Search"
              />
            </button>
          </div>

          <div className="p-2 font-semibold text-gray-600">
            Popular at StockEdge
          </div>

          {/* Sliding Button Carousel */}
          <div className="relative w-[80%]">
            {/* Carousel Container */}
            <div className="flex overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${position * (100 / visibleCount)}%)`,
                  width: `${(100 * buttons.length) / visibleCount}%`,
                }}
              >
                {buttons.map((button, index) => (
                  <div
                    key={index}
                    className="flex"
                    style={{
                      width: `200px`,
                      display: "flex",
                      justifyContent: "flex-start", // Align buttons to the left
                      paddingRight: "10px", // Gap between buttons
                    }}
                  >
                    <button className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg border border-blue-300">
                      {button}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-start mt-4 gap-4">
              <button
                onClick={prevSlide}
                disabled={position === 0}
                className={`text-blue-400 bg-white px-4 text-2xl py-1 border-2 boder-solid border-blue-400 rounded-2xl ${
                  position === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                &#8592;
              </button>
              <button
                onClick={nextSlide}
                disabled={position === buttons.length - visibleCount}
                className={`text-blue-500 bg-white px-4 text-2xl py-1 border-2 boder-solid border-blue-400 rounded-2xl ${
                  position === buttons.length - visibleCount
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
        <div className="w-[50%] rounded-3xl">
          <img src={coverImg} className="rounded-3xl" />
        </div>
      </div>

      <div className="bg-white flex flex-col w-full py-20 gap-20 px-28">
        <div className="flex flex-col gap-2 ">
          <p className="text-center text-4xl font-bold">
            Explore Diamondrock Analytics
          </p>
          <p className="text-gray-700 text-center">
            Get Advanced data, analysis and tools to discover most profitable
            opportunities in Stocks and Mutual Funds
          </p>
        </div>
        {/*Indices*/}
        <div className="flex flex-col gap-4 relative w-full">
          <div className="relative w-full">

            {/* Carousel Container */}
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${position * (100 / totalSlides)}%)`,
                  width: `${totalSlides * 100}%`,
                }}
              >
                {data.map((item, i) => (
                  <div key={i} className="w-1/3 p-2">
                    <div className="border shadow h-[160px] p-3 flex flex-col justify-between rounded-3xl hover:bg-slate-100 transition-all">
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-sm">{new Date().toLocaleString()}</p>
                      <div className="flex justify-between border-t-[1px] border-gray-700 pt-2">
                        <p className="text-base font-semibold">{item.price}</p>
                        <p className={`font-semibold ${item.changeClass}`}>
                          {item.change} ({item.percentChange}%)
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-0">
            <h2 className="text-2xl font-bold mb-4">Trending Stocks</h2>
            <div className="grid grid-cols-2 gap-8">
              {/* Top Gainers */}
              <div className="border rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Top Gainers</h3>
                  <a href="#" className="text-blue-600 text-sm font-semibold">
                    View all
                  </a>
                </div>
                <div>
                  <div className="flex justify-between text-gray-500 text-sm mb-2">
                    <span>Company</span>
                    <div className="flex gap-8">
                      <span>Price</span>
                      <span>% Chg</span>
                    </div>
                  </div>
                  {topGainers.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-t py-5 hover:bg-slate-100"
                    >
                      <span className="text-md font-semibold">{item.Name}</span>
                      <div className="flex gap-8 items-center">
                        <span className="text-sm font-semibold">
                          {item.Price}
                        </span>
                        <span
                          className={`text-sm font-semibold ${item.changeClass}`}
                        >
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Losers */}
              <div className="border rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Top Losers</h3>
                  <a href="#" className="text-blue-600 text-sm font-semibold">
                    View all
                  </a>
                </div>
                <div>
                  <div className="flex justify-between text-gray-500 text-sm mb-2">
                    <span>Company</span>
                    <div className="flex gap-8">
                      <span>Price</span>
                      <span>% Chg</span>
                    </div>
                  </div>
                  {topLosers.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-t py-5 hover:bg-slate-100"
                    >
                      <span className="text-md font-semibold">{item.Name}</span>
                      <div className="flex gap-8 items-center">
                        <span className="text-sm font-semibold">
                          {item.Price}
                        </span>
                        <span
                          className={`text-sm font-semibold ${item.changeClass}`}
                        >
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10">
            {/* Popular Scans Section */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4">Popular Scans</h2>
              <div className="flex gap-6">
                <div className="w-1/4 p-3 flex flex-col justify-between h-[100px] border rounded-lg shadow-md bg-white relative hover:bg-slate-100">
                  <div className="font-medium text-lg mb-2">
                    Closing Above Previous High
                  </div>
                  <div className="text-sm text-gray-600 border-t-[1px] border-gray-400">
                    Total Stocks: 115
                  </div>
                  <img
                    src={graphIcon}
                    className="absolute top-3 right-3 h-[30px] w-[30px]"
                  />
                </div>
                <div className="w-1/4 p-3 flex flex-col justify-between h-[100px] border rounded-lg shadow-md bg-white relative hover:bg-slate-100">
                  <div className="font-medium text-lg mb-2">
                    Higher Delivery Quantity
                  </div>
                  <div className="text-sm text-gray-600 border-t-[1px] border-gray-400">
                    Total Stocks: 38
                  </div>
                  <img
                    src={graphIcon}
                    className="absolute top-3 right-3 h-[30px] w-[30px]"
                  />
                </div>
                <div className="w-1/4 p-3 flex flex-col justify-between h-[100px] border rounded-lg shadow-md bg-white relative hover:bg-slate-100">
                  <div className="font-medium text-lg mb-2">
                    High Delivery Percentage
                  </div>
                  <div className="text-sm text-gray-600 border-t-[1px] border-gray-400">
                    Total Stocks: 7
                  </div>
                  <img
                    src={graphIcon}
                    className="absolute top-3 right-3 h-[30px] w-[30px]"
                  />
                </div>
                <div className="w-1/4 p-3 flex flex-col justify-between h-[100px] border rounded-lg shadow-md bg-white relative hover:bg-slate-100">
                  <div className="font-medium text-lg mb-2">
                    Increase in FII Shareholding
                  </div>
                  <div className="text-sm text-gray-600 border-t-[1px] border-gray-400">
                    Total Stocks: 260
                  </div>
                  <img
                    src={graphIcon}
                    className="absolute top-3 right-3 h-[30px] w-[30px]"
                  />
                </div>
              </div>
            </div>

            {/* Edge Insights Section */}
            <div className="pt-10">
              <h2 className="text-xl font-bold mb-4">Edge Insights</h2>
              <div className="flex gap-6">
                <div className="w-1/3 p-4 border rounded-lg shadow-md bg-white hover:bg-slate-100">
                  <div className="flex justify-between border-b-[1px] border-gray-400 pb-3 mb-4">
                    <div className="flex flex-col">
                      <div className="text-lg font-semibold">
                        HDFC Bank Ltd.
                      </div>
                      <div className="text-sm text-gray-600">
                        M-Cap: 1251799.81 Cr.
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">29873.20</p>
                      <p className="text-sm font-semibold text-green-600">
                        0.5%
                      </p>
                    </div>
                  </div>
                  <div className="text-base font-semibold mb-2">
                    RSI entering Oversold zone
                  </div>
                  <div className="text-sm text-gray-500">
                    Stock's Relative Strength Index (RSI) crossed below 30,
                    entering the oversold zone.
                  </div>
                  <div className="border-t-[1px] border-blue-400 flex mt-10">
                    <button className="text-blue-400 hover:font-semibold w-1/2 border-r-[1px] border-blue-400">
                      All Scans in Stock
                    </button>
                    <button className="text-blue-400 hover:font-semibold w-1/2">
                      RSI Scans
                    </button>
                  </div>
                </div>
                <div className="w-1/3 p-4 border rounded-lg shadow-md bg-white hover:bg-slate-100">
                  <div className="flex justify-between border-b-[1px] border-gray-400 pb-3 mb-4">
                    <div className="flex flex-col">
                      <div className="text-lg font-semibold">
                        Axis Bank Ltd.
                      </div>
                      <div className="text-sm text-gray-600">
                        M-Cap: 1251799.81 Cr.
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">29873.20</p>
                      <p className="text-sm font-semibold text-green-600">
                        0.5%
                      </p>
                    </div>
                  </div>
                  <div className="text-base font-semibold mb-2">
                    RSI entering Oversold zone
                  </div>
                  <div className="text-sm text-gray-500">
                    Stock's Relative Strength Index (RSI) crossed below 30,
                    entering the oversold zone.
                  </div>
                  <div className="border-t-[1px] border-blue-400 flex mt-10">
                    <button className="text-blue-400 hover:font-semibold w-1/2 border-r-[1px] border-blue-400">
                      All Scans in Stock
                    </button>
                    <button className="text-blue-400 hover:font-semibold w-1/2">
                      RSI Scans
                    </button>
                  </div>
                </div>
                <div className="w-1/3 p-4 border rounded-lg shadow-md bg-white hover:bg-slate-100">
                  <div className="flex justify-between border-b-[1px] border-gray-400 pb-3 mb-4">
                    <div className="flex flex-col">
                      <div className="text-lg font-semibold">Infosys Ltd.</div>
                      <div className="text-sm text-gray-600">
                        M-Cap: 1251799.81 Cr.
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">29873.20</p>
                      <p className="text-sm font-semibold text-green-600">
                        0.5%
                      </p>
                    </div>
                  </div>
                  <div className="text-base font-semibold mb-2">
                    Crossing Last Week Low
                  </div>
                  <div className="text-sm text-gray-500">
                    Stock closed at Rs. 1815.45 crossing its previous Week Low
                    of Rs. 1888.75 by -3.88%
                  </div>
                  <div className="border-t-[1px] border-blue-400 flex mt-10">
                    <button className="text-blue-400 hover:font-semibold w-1/2 border-r-[1px] border-blue-400">
                      All Scans in Stock
                    </button>
                    <button className="text-blue-400 hover:font-semibold w-1/2">
                      RSI Scans
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
    
  );
};

export default Home;
