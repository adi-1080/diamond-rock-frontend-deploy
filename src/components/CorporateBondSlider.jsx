import React from 'react';
import { ChevronRight } from 'lucide-react';

const BOND_DATA = [
  {
    id: 'USP989MJBE0',
    name: 'YPF 15/25 REGS',
    logo: '🔵', // Replace with actual logo image
    yield: 9.97,
    maturityDate: 'Jul 28, 2025'
  },
  {
    id: 'CTL5911195',
    name: 'Level 3 Financing, Inc. 10.0% 15-OCT-2032',
    logo: '⚪', // Replace with actual logo image
    yield: 9.94,
    maturityDate: 'Oct 15, 2032'
  },
  {
    id: 'XS242345924',
    name: 'CDBL FDG 2 22/25 MTN',
    logo: '⚪', // Replace with actual logo image
    yield: 9.93,
    maturityDate: 'Mar 2, 2025'
  },
  {
    id: 'TRUL5278855',
    name: 'Trulieve Cannabis Corp. 8.0% 06-OCT-2026',
    logo: '🟢', // Replace with actual logo image
    yield: 9.92,
    maturityDate: 'Oct 6, 2026'
  },
  {
    id: 'PEMX5386835',
    name: 'Petroleos Mexicanos 6.7% 16-FEB-2032',
    logo: '⚪', // Replace with actual logo image
    yield: 9.90,
    maturityDate: 'Feb 16, 2032'
  }
];

const BondCard = ({ bond }) => (
  <div className="min-w-[240px] p-4 border border-gray-200 rounded-lg mr-4">
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 mr-2">
        {bond.logo}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium truncate">{bond.id}</div>
        <div className="text-xs text-gray-500 truncate">{bond.name}</div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-xs text-gray-500">Yield to maturity</div>
        <div className="text-sm font-medium">{bond.yield}%</div>
      </div>
      <div>
        <div className="text-xs text-gray-500">Maturity date</div>
        <div className="text-sm font-medium">{bond.maturityDate}</div>
      </div>
    </div>
  </div>
);

const CorporateBondsSlider = () => {
  const sliderRef = React.useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-full mt-0"> {/* Add mt-0 to remove top margin */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          Corporate bonds
          <ChevronRight className="w-6 h-6 ml-1" />
        </h2>
      </div>
      
      <div className="relative">
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {BOND_DATA.map((bond) => (
            <div key={bond.id} className="snap-start">
              <BondCard bond={bond} />
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CorporateBondsSlider;

// Optional: Add this CSS to your stylesheet to hide scrollbar
/*
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
*/