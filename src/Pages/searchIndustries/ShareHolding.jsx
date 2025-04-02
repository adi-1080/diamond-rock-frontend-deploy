import { useParams } from "react-router-dom";
import ShareholdersDashboard from "./ShareholdersDashboard";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";
import StockHeader from "../../components/StockHeader";

export default function Shareholding() {
  const { ticker } = useParams();

  return (
    <SidebarAndNavbar>
      <div className="w-full bg-white">
        <div className="bg-white border-b">
          <StockHeader defaultActiveTab="shareholding" ticker={ticker} />
        </div>

        <div className="bg-white p-4">
          {/* main div */}
          <ShareholdersDashboard />
        </div>
      </div>
    </SidebarAndNavbar>
  );
}
