import { ArrowLeft, Share2, Star } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const StockHeader = ({ ticker, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCompanyDataForHeader = async () => {
      try {
        setLoading(true);
        let response = await fetch(
          `https://diamond-rock-django-backend1.onrender.com/api/get_price/${ticker}/`
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        let data = await response.json();
        console.log("data", data);

        setCompanyData({
          ticker,
          name: data[ticker].longName,
          currency: data[ticker].currency,
          currentPrice: data[ticker].regularMarketPrice,
          change: data[ticker].regularMarketChange,
          changePercent: data[ticker].regularMarketChangePercent,
          lastUpdateTime: data[ticker].regularMarketTime,
        });
      } catch (e) {
        console.error("Error fetching company data:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    getCompanyDataForHeader();
  }, [ticker]);

  const tabs = [
    { id: "prices", label: "Prices", url: `/stock/${ticker}/prices` },
    { id: "fundamental", label: "Fundamental", url: `/stock/${ticker}/fundamentals` },
    { id: "financials", label: "Financials", url: `/stock/${ticker}/financials` },
    { id: "diamond-report", label: "Diamond Report", url: `/stock/${ticker}/diamond-report` },
    { id: "updates", label: "Updates", url: `/stock/${ticker}/updates` },
    { id: "shareholding", label: "Shareholding", url: `/stock/${ticker}/shareholding` },
    { id: "deliveries", label: "Deliveries", url: `/stock/${ticker}/deliveries` },
    { id: "technicals", label: "Technicals", url: `/stock/${ticker}/technicals` },
  ];

  return (
    <div className="bg-white border-b">
      <DataDiv companyData={companyData} loading={loading} error={error} />
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
  );
};

const DataDiv = ({ companyData, loading, error }) => {
  if (loading) return <StatusMessage message="Loading..." />;
  if (error)
    return <StatusMessage message="Something went wrong" error={error} />;

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <ArrowBackLink />
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-medium">{companyData.name}</h1>
            <span className="text-gray-500 text-sm">{companyData.ticker}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">{companyData.currency} {companyData.currentPrice}</span>
            <span className="text-red-500 ml-2">
              {companyData.change.toFixed(2)} (
              {companyData.changePercent.toFixed(2)}%)
            </span>
            <span className="text-gray-500 ml-2">
              {companyData.lastUpdateTime}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Star className="w-5 h-5 text-gray-400" />
        <Share2 className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

const ArrowBackLink = () => (
  <Link to="/trending-stocks" className="pl-2 rounded-full">
    <ArrowLeft className="h-5 w-5 text-blue-600" />
  </Link>
);

const StatusMessage = ({ message, error }) => (
  <div className="py-7 p-4 flex items-center">
    <ArrowBackLink />
    <h1 className="pl-3">{message}</h1>
    {error && <p className="text-red-500 pl-2">{error}</p>}
  </div>
);

export default StockHeader;
