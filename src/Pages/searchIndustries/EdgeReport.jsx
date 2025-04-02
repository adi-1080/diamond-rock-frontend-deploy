import React from "react";
import { FaLock, FaFilePdf } from "react-icons/fa";

const reports = [
  { date: "16 Jan 2025", title: "Earnings Call Q3 FY25" },
  { date: "14 Oct 2024", title: "Earnings Call Q2 FY25" },
  { date: "19 Jul 2024", title: "Earnings Call Q1 FY25" },
  { date: "22 Apr 2024", title: "Earnings Call Q4 FY24" },
  { date: "19 Jan 2024", title: "Earnings Call Q3 FY24" },
  { date: "27 Oct 2023", title: "Earnings Call Q2 FY24" },
];

const EdgeReport = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Edge Report</h2>
      <div className="border-b mb-4">
        <nav className="flex space-x-6 text-gray-600">
          <a className="py-2 px-4 border-b-2 border-black font-semibold">Edge Report</a>
          <a className="py-2 px-4">Updates</a>
          <a className="py-2 px-4">Technical</a>
        </nav>
      </div>
      <div className="space-y-4">
        {reports.map((report, index) => (
          <div key={index} className="flex items-center p-4 border rounded-lg hover:bg-gray-100">
            <div className="w-12 h-12 bg-red-500 text-white flex items-center justify-center rounded-full">
              <FaFilePdf size={20} />
            </div>
            <div className="ml-4 flex-grow">
              <p className="text-gray-500 text-sm">{report.date}</p>
              <h3 className="text-lg font-semibold text-blue-600">Reliance Industries Limited - {report.title}</h3>
              <p className="text-gray-500 text-sm">Concall Analysis</p>
            </div>
            <FaLock className="text-gray-400" size={18} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EdgeReport;
