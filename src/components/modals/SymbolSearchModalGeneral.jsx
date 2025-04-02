import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import symbols from "../../js-data/symbols";

const SymbolSearchModal = ({searchTerm, setShowSearchModal}) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    {'all' : "All"},
    {'stock': "Stocks"},
    {'index': "Indices"},
    {'crypto': "Cryptos"},
    {'futures': "Futures"},
    {'forex': "Forex"},
    {'etf': "ETFs"},
  ];

  const filteredSymbols = symbols.filter(
    (symbol) =>
      (activeFilter === "all" || symbol.type.toLowerCase() === activeFilter.toLowerCase()) &&
      symbol.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]" style={{ margin: 0, marginTop: "3.5rem" }}>
      <div className="bg-white rounded-lg h-[87vh] w-[55vw] shadow-lg">

        {/* Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto px-5 ">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(Object.keys(filter)[0])}
              className={`px-3 py-1 rounded-2xl ${
                activeFilter === Object.keys(filter)[0]
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {Object.values(filter)[0]}
            </button>
          ))}
        </div>

        {/* Symbol List */}
        <div className="mt-4 px-2 max-h-[77vh] overflow-y-auto scroll-custom">
          {filteredSymbols.map((symbol, index) => (
            <div
              key={index}
              onClick={() => {
                if(pathname.includes('charthome')){
                  navigate(`/innerChart/${symbol.name}`);
                } else {
                  navigate(`/stock/${symbol.name}/prices`);
                }
                setShowSearchModal(false);
              }}
              className="flex items-center justify-between p-3 hover:bg-gray-100 border-b cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{symbol.icon}</span>
                <div className="flex">
                  <p className="font-semibold" style={{width: "10rem"}}>{symbol.name.replace('^', '')}</p>
                  <p className="text-sm">{symbol.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs text-gray-500">{symbol.type}</div>
                <div className="text-sm">{symbol.market}</div>
              </div>
            </div>
          ))}
          {filteredSymbols.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymbolSearchModal;
