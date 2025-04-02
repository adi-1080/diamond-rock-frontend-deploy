import React, { useState } from "react";
import { Search, ArrowLeft, Share2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

const InvestorsOuter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <SidebarAndNavbar>
      <div className="shadow-[0px_0px_15px_rgba(0,0,0,0.05),0px_-10px_25px_rgba(0,0,0,0.05)] h-auto p-5 pb-2 bg-gray-100 rounded-t-xl">
        <div className="flex items-center py-3 mb-2">
          <Link
            to="/marketHome"
            className="pl-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-blue-600" />
          </Link>
          <h1 className="text-2xl ml-2">Investors</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full ml-auto">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="shadow-[0px_15px_15px_rgba(0,0,0,0.1),0px_-10px_25px_rgba(0,0,0,0)] h-auto p-6 pb-2 bg-white rounded-b-xl">
        {/* Search Bar */}
        <div className="mb-4">
          <Search className="absolute ml-3 text-gray-500 flex mt-2" />
          <input
            type="text"
            placeholder="Search investors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border p-2 w-full rounded-md"
          />
        </div>

        {/* Table */}
        <div className="overflow-y-auto bg-white rounded-lg px-0 py-0">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Recently Active Investors
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {investorsData.map((investor) => (
                <tr
                  key={investor.name}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/investors/${investor.name}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {investor.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SidebarAndNavbar>
  );
};

export default InvestorsOuter;

const investorsData = [
  { name: "Keshav Bhardwaj" },
  { name: "Ananya Sharma" },
  { name: "Rohan Mehta" },
  { name: "Priya Verma" },
  { name: "Amit Patel" },
  { name: "Neha Kapoor" },
  { name: "Vikram Singh" },
  { name: "Sneha Choudhury" },
  { name: "Arjun Malhotra" },
  { name: "Divya Agrawal" },
  { name: "Rahul Nair" },
  { name: "Ishita Bansal" },
  { name: "Sandeep Yadav" },
  { name: "Meera Iyer" },
  { name: "Varun Saxena" },
  { name: "Pooja Deshmukh" },
  { name: "Nitin Joshi" },
  { name: "Shreya Gupta" },
  { name: "Akash Chauhan" },
  { name: "Tanya Arora" },
];
