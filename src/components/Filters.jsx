import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { FilterModal } from './FilterModal';

export function Filters() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview'); // Default selected tab
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controls dropdown visibility

  const mainButtons = ['Overview','Dividends', 'Valuation'];
  const dropdownOptions = [
    'Margins',
    'Income Statement',
    'Balance Sheet',
  ];

  return (
    <>
      <div className="mb-2 pt-1 flex justify-center">
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 flex items-center gap-5 text-xs">

           {/* Dropdown to Display Selected Tab */}
           <select
              className="bg-white-800 text-gray-500 p-2 border border-gray-150 rounded"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              {mainButtons.concat(dropdownOptions).map((button) => (
                <option key={button} value={button}>
                  {button}
                </option>
              ))}
            </select>


            {/* Main Buttons */}
            {mainButtons.map((button) => (
              <button
                key={button}
                className={`px-4 py-2 ${
                  activeTab === button ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-500'
                } hover:bg-gray-300`}
                onClick={() => setActiveTab(button)}
              >
                {button}
              </button>
            ))}

            {/* Dropdown for Additional Options */}
            <div className="relative">
              <button
                className="px-3 py-2 bg-gray-100 text-black hover:bg-gray-300 flex items-center gap-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                  {dropdownOptions.map((option) => (
                    <button
                      key={option}
                      className="w-full px-4 py-2 text-left bg-white text-black hover:bg-gray-300"
                      onClick={() => {
                        setActiveTab(option);
                        setDropdownOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

           

            {/* Other Select Inputs */}
            <select className="bg-white-800 text-gray-500 p-1 border border-gray-150 focus:outline-none">
              <option value="all">All Markets</option>
              <option value="nasdaq">NASDAQ</option>
              <option value="nyse">NYSE</option>
              <option value="bse">BSE</option>
            </select>
            <select className="bg-white-800 text-gray-500 px-2 py-2 rounded border border-gray-150">
              <option>1W</option>
              <option>1M</option>
              <option>3M</option>
              <option>1Y</option>
            </select>
            <div className="flex items-center space-x-2">
              <select className="bg-white-800 text-gray-500 px-2 py-1 rounded border border-gray-150">
                <option>Financials in: USD</option>
                <option>INR</option>
              </select>
            </div>
            <div className="flex gap-0">
              <select className="bg-white-800 text-gray-500 px-2 py-1 border border-gray-150">
                <option>All-time high</option>
                <option>52-week high</option>
                <option>Monthly high</option>
              </select>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-500 hover:bg-blue-700 text-white px-4 py-2 flex items-center gap-2"
              >
                Filters
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
