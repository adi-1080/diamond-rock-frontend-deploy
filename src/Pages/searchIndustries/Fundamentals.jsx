import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";
import StockHeader from "../../components/StockHeader";

const Fundamentals = () => {
  const navigate = useNavigate();
  const { ticker } = useParams();
  const [symbol, setSymbol] = useState(ticker.toString());
  const [activeSubTab, setActiveSubTab] = useState("Overview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [earningsData, setEarningsData] = useState(null);

  const subTabs = ["Overview", "Results", "Ratios", "Growth Pattern"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const profileResponse = await axios.get(
          `https://diamond-rock-django-backend1.onrender.com/api/get_profile/${symbol}/`
        );
        setProfileData(profileResponse.data);
        
        try {
          const earningsResponse = await axios.get(
            `https://diamond-rock-django-backend1.onrender.com/api/get_earnings/${symbol}/`
          );
          if (!earningsResponse.data) {
            throw new Error("Empty earnings data response");
          }
          setEarningsData(earningsResponse.data);
        } catch (earningsError) {
          console.error("Earnings API error:", earningsError);
          setEarningsData(null);
          setError("Could not load earnings data. Showing profile data only.");
        }
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol]);

  const formatCurrency = (value) => {
    if (!value) return "N/A";
    return `${(value / 10000000).toFixed(2)} Cr.`;
  };

  const renderOverview = () => {
    if (!profileData) return <div className="p-4">Loading overview data...</div>;

    return (
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div>
              <div className="text-gray-600 mb-1">Company</div>
              <div className="font-medium">{profileData?.longName || profileData?.shortName || "N/A"}</div>
            </div>
            <div>
              <div className="text-gray-600 mb-1">Market Cap</div>
              <div className="font-medium">{formatCurrency(profileData?.marketCap)}</div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-gray-600 mb-1">Sector</div>
              <div className="font-medium">{profileData?.sector || "N/A"}</div>
            </div>
            <div>
              <div className="text-gray-600 mb-1">Industry</div>
              <div className="font-medium">{profileData?.industry || "N/A"}</div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-gray-600 mb-1">Current Price</div>
              <div className="font-medium">{profileData?.currentPrice?.toFixed(2) || "N/A"} INR</div>
            </div>
            <div>
              <div className="text-gray-600 mb-1">P/E Ratio</div>
              <div className="font-medium">{profileData?.trailingPE?.toFixed(2) || "N/A"}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!earningsData) {
      return (
        <div className="p-4 text-yellow-600">
          Earnings data not available. Please try again later.
        </div>
      );
    }
    const earningsHistory = earningsData?.earningsHistory?.history || [];
    const yearlyData = earningsData?.nameLastDateT?.yearBy || [];
    
    // Create quarters data
    const quarters = earningsHistory.length > 0
      ? earningsHistory.slice(0, 4).map((item, index) => ({
          key: `Q${index + 1}`,
          label: item.period ? new Date(item.period).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : `Q${index + 1}`,
          value: `Q${index + 1}`
        }))
      : Array(4).fill().map((_, index) => ({
          key: `Q${index + 1}`,
          label: `Q${index + 1}`,
          value: `Q${index + 1}`
        }));

    return (
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Metric</th>
                {quarters.map((q) => (
                  <th key={q.key} className="p-2 text-center font-medium">
                    {q.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Revenue</td>
                {quarters.map((_, i) => (
                  <td key={`rev-${i}`} className="p-2 text-right">
                    {yearlyData[i]?.revenue ? formatCurrency(yearlyData[i].revenue) : "N/A"}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-2">Net Income</td>
                {quarters.map((_, i) => (
                  <td key={`net-${i}`} className="p-2 text-right">
                    {yearlyData[i]?.earnings ? formatCurrency(yearlyData[i].earnings) : "N/A"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderLockedTab = () => {
    return (
      <div className="p-4 text-center text-gray-500">
        This section is currently locked
      </div>
    );
  };

  const renderContent = () => {
    if (loading) return <div className="p-4">Loading data...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    switch (activeSubTab) {
      case "Overview":
        return renderOverview();
      case "Results":
        return renderResults();
      case "Ratios":
      case "Growth Pattern":
        return renderLockedTab();
      default:
        return null;
    }
  };

  return (
    <SidebarAndNavbar>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white min-h-screen">
          <StockHeader defaultActiveTab={"fundamental"} ticker={ticker} />

          <div className="flex justify-center items-center py-3 border-b">
            <div className="inline-flex bg-gray-100 rounded-lg px-1">
              {subTabs.map((subTab) => (
                <button
                  key={subTab}
                  onClick={() => setActiveSubTab(subTab)}
                  className={`px-4 py-1 my-1 text-sm rounded ${
                    activeSubTab === subTab ? "bg-white shadow-sm" : "text-gray-600"
                  }`}
                >
                  {subTab}
                </button>
              ))}
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </SidebarAndNavbar>
  );
};

export default Fundamentals;