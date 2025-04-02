import React, { useState } from "react";
import { 
  BarChart2, 
  LineChart, 
  TrendingUp, 
  PieChart, 
  Lightbulb,
  Repeat, 
  Layers, 
  Activity, 
  Users, 
  Globe, 
  Brain, 
  FileText, 
  Building, 
  Zap, 
  Newspaper,
  Building2,
  GraduationCap,
  Briefcase,
  Menu,
  ScanText,
  ChartLine,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const marketMenuItems = [
  {
    id: "market-home",
    icon: Home,
    label: "Home",
    path: "/marketHome",
  },
  { id: "indices", icon: TrendingUp, label: "Indices", path: "/indices" },
  {
    id: "trending-stocks",
    icon: LineChart,
    label: "Trending Stocks",
    path: "/trending-stocks",
  },
  {
    id: "news-updates",
    icon: Newspaper,
    label: "News & Updates",
    path: "/news",
  },
  { id: "deals", icon: Briefcase, label: "Deals", path: "/deals" },
  {
    id: "fii-dii",
    icon: PieChart,
    label: "FII / DII Activity",
    path: "/fii-dii",
  },
  {
    id: "sectors",
    icon: Building2,
    label: "Sectors",
    path: "/sector-overview",
  },
  { id: "ipos", icon: Users, label: "IPOs", path: "/ipos" },
  { id: "investors", icon: Users, label: "Investors", path: "/investors" },
  { id: "sme", icon: Building2, label: "SME Zone", path: "/sme" },
  {
    id: "tutorial",
    icon: GraduationCap,
    label: "Diamondrock Tutorial",
    path: "/diamondrock-tutorial",
  },
];
const globalMenuItems = [
  {
    id: "chart-home",
    icon: Home,
    label: "Home",
    path: "/chartHome",
  },
  {
    id: "global-indices",
    icon: TrendingUp,
    label: "Indices",
    path: "/global-indices",
  },
  {
    id: "global-trending-stocks",
    icon: LineChart,
    label: "Trending Stocks",
    path: "/global-trending-stocks",
  },
];
const analyticsMenuItems = [
  {
    id: "analytics/home",
    icon: BarChart2,
    label: "Home",
    path: "/analytics/home",
  },
  {
    id: "analytics/scans",
    icon: ScanText,
    label: "Scans",
    path: "/analytics/scans",
  },
  {
    id: "analytics/chart-patterns",
    icon: LineChart,
    label: "Chart Patterns",
    path: "/analytics/chart-patterns",
  },
  {
    id: "analytics/trading-strategies",
    icon: TrendingUp,
    label: "Trading Strategies",
    path: "/analytics/trading-strategies",
  },
  {
    id: "analytics/investment-ideas",
    icon: Lightbulb,
    label: "Investment Ideas",
    path: "/analytics/investment-ideas",
  },
  {
    id: "analytics/analytics-diamond-reports",
    icon: FileText,
    label: "Diamond Reports",
    path: "/analytics/analytics-diamond-reports",
  },
  {
    id: "analytics/sector-rotation",
    icon: Repeat,
    label: "Sector Rotation",
    path: "/analytics/sector-rotation",
  },
  {
    id: "analytics/sector-analytics",
    icon: Layers,
    label: "Sector Analytics",
    path: "/analytics/sector-analytics",
  },
  {
    id: "analytics/market-breadth",
    icon: Activity,
    label: "Market Breadth",
    path: "/analytics/market-breadth",
  },
  {
    id: "analytics/investor-portfolios",
    icon: Users,
    label: "Investor Portfolios",
    path: "/analytics/investor-portfolios",
  },
  {
    id: "analytics/investment-themes",
    icon: Globe,
    label: "Investment Themes",
    path: "/analytics/investment-themes",
  },
  {
    id: "analytics/diamond-insights",
    icon: Brain,
    label: "Diamond Insights",
    path: "/analytics/diamond-insights",
  },
  {
    id: "analytics/company-filings",
    icon: FileText,
    label: "Company Filings",
    path: "/analytics/company-filings",
  },
  {
    id: "analytics/business-houses",
    icon: Building,
    label: "Business Houses",
    path: "/analytics/business-houses",
  },
  {
    id: "analytics/fo-zone",
    icon: Zap,
    label: "F&O Zone",
    path: "/analytics/fo-zone",
  },
];

const mainMenus = [
  { id: "menu", icon: Menu, label: "" },
  { id: "market", icon: LineChart, label: "Market", path: "/marketHome", items: marketMenuItems },
  { id: "globalMarket", icon: Globe, label: "Global Market", path: "/chartHome", items: globalMenuItems },
  { id: "superCharts", icon: ChartLine, label: "Super Charts", path: "/innerChart/RELIANCE.NS", items: globalMenuItems },
  { id: "analytics", icon: BarChart2, label: "Analytics", path: "/analytics/home", items: analyticsMenuItems },
  { id: "mySE", icon: PieChart, label: "My SE", path: "/my-se" },
];

export function Sidebar({ isExpanded, onToggle, defaultActiveMainMenu="market" }) {
  let smthing = mainMenus.find(menu => menu.id === defaultActiveMainMenu) || mainMenus[1];
  const [activeMainMenu, setActiveMainMenu] = useState(smthing); // Default to Market menu
  const [activeMenuItem, setActiveMenuItem] = useState(smthing.items[0].id);
  const [activeAnalyticItem, setActiveAnalyticItem] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (itemId, path) => {
    setActiveMenuItem(itemId);
    setActiveAnalyticItem(null);
    navigate(path);
  };

  const handleAnalyticClick = (item, path) => {
    if (item.id === "menu") {
      onToggle();
      return;
    }
    
    // If the clicked menu has sub-items, set it as active
    if (item.items) {
      setActiveMainMenu(item);
      setActiveMenuItem(null);
      setActiveAnalyticItem(null);
    }
    
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="fixed top-14 bottom-0 flex">
      <div className="flex flex-col items-center py-4 bg-gray ">
        {mainMenus.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center mb-4 p-2 w-full hover:bg-gray-200 text-gray-600 transition-colors
              ${activeMainMenu?.id === item.id ? "bg-gray-200" : ""}
            `}
            onClick={() => handleAnalyticClick(item, item.path)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[12px]">{item.label}</span>
          </button>
        ))}
      </div>
      <div
        className={`bg-gray-50 border-r flex rounded-lg my-2 flex-col transition-all duration-300 ${
          isExpanded ? "w-60" : "w-0 overflow-hidden"
        }`}
      >
        <div className="overflow-auto scrollbar-none">
          <div className="px-4 py-3 border-b">
            <h2 className="font-medium text-center">{activeMainMenu?.label}</h2>
          </div>
          <div className="px-2 py-2">
            {activeMainMenu?.items && activeMainMenu.items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id, item.path)}
                className={`flex mb-1 items-center gap-2 px-2 py-3 text-sm rounded-lg text-gray-700 hover:bg-gray-200 w-full transition-colors
                  ${
                    activeMenuItem === item.id
                      ? "bg-gray-200 text-blue-600"
                      : ""
                  }
                `}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm">Dark Mode</span>
            <div className="w-10 h-5 bg-gray-200 rounded-full relative">
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

