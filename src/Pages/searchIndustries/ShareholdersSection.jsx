import React, { useState } from 'react';

const ShareholdersSection = () => {
  // Available quarters with 3-month intervals (only for the quarter dropdown)
  const availableQuarters = [
    '2024-12', '2024-09', '2024-06', '2024-03', 
    '2023-12', '2023-09', '2023-06', '2023-03',
    '2022-12'
  ];
  
  // State for selected quarter and dropdown visibility
  const [selectedQuarter, setSelectedQuarter] = useState('2024-12');
  const [isOpen, setIsOpen] = useState(false);
  
  // Sample data for promoter shareholders
  const promoterData = [
    {
      name: 'Srichakra Commercials LLP',
      shares: '1,47,91,99,658',
      percentage: '11.16%'
    },
    {
      name: 'Tattvam Enterprises LLP',
      shares: '1,09,11,38,920',
      percentage: '8.23%'
    },
    {
      name: 'Karuna Commercials LLP',
      shares: '1,09,11,38,920',
      percentage: '8.23%'
    },
    {
      name: 'Devarshi Commercials LLP',
      shares: '1,09,11,38,920',
      percentage: '8.23%'
    }
  ];
  
  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Select quarter and close dropdown
  const handleQuarterSelect = (quarter) => {
    setSelectedQuarter(quarter);
    setIsOpen(false);
  };
  
  return (
    <div className="container mx-auto">
      {/* Quarter Dropdown - keeping original button appearance but custom dropdown */}
      <div className="mb-4">
        <div className="inline-block relative">
          <button 
            onClick={toggleDropdown}
            className="block appearance-none bg-white border border-blue-500 text-blue-500 hover:border-blue-600 px-4 py-2 pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            Qtr {selectedQuarter}
          </button>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
          
          {/* Custom dropdown menu styled as in the image */}
          {isOpen && (
            <div className="absolute mt-1 w-64 z-10 bg-white shadow-lg border border-gray-300 rounded">
              {availableQuarters.map((quarter) => (
                <div 
                  key={quarter}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 border-b border-gray-200 cursor-pointer"
                  onClick={() => handleQuarterSelect(quarter)}
                >
                  <span className="text-gray-700">Qtr {quarter}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedQuarter === quarter ? 'border-blue-600 bg-blue-600' : 'border-gray-400'
                  }`}>
                    {selectedQuarter === quarter && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Table headers */}
      <div className="w-full">
        <div className="grid grid-cols-12 border-b pb-2">
          <div className="col-span-6 text-sm font-medium text-gray-700">
            Shareholder
          </div>
          <div className="col-span-3 text-right text-sm font-medium text-gray-700">
            No. of shares
          </div>
          <div className="col-span-3 text-right text-sm font-medium text-gray-700">
            Percentage
          </div>
        </div>
        
        {/* Promoter Group Header */}
        <div className="grid grid-cols-12 bg-gray-100 py-3 px-2 my-2 items-center">
          <div className="col-span-11 font-medium">
            Promoter Group Shareholding
          </div>
          <div className="col-span-1 text-right">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* Promoter Group Entries */}
        {promoterData.map((shareholder, index) => (
          <div key={index} className="grid grid-cols-12 py-4 border-b">
            <div className="col-span-6 font-medium text-gray-800">
              {shareholder.name}
            </div>
            <div className="col-span-3 text-right text-gray-700">
              {shareholder.shares}
            </div>
            <div className="col-span-3 text-right text-gray-700">
              {shareholder.percentage}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShareholdersSection;