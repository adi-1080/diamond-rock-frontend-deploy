import React from 'react';
import { ChevronRight } from 'lucide-react';

const COMMUNITY_TRENDS_DATA = [
  {
    id: 'BERZ',
    name: 'MicroSectors FANG & Innov...',
    logo: '🟢',
    price: '10.40 usd',
    change: '-1.38%'
  },
  {
    id: 'BITO',
    name: 'ProShares Bitcoin ETF',
    logo: '🔵',
    price: '22.62 usd',
    change: '+1.07%'
  },
  {
    id: 'BOIL',
    name: 'ProShares Ultra Bloomber...',
    logo: '🔵',
    price: '74.05 usd',
    change: '+4.86%'
  },
  {
    id: 'DIA',
    name: 'SPDR Dow Jones Industrial...',
    logo: '⚪',
    price: '465.79 usd',
    change: '-0.33%'
  },
  {
    id: 'DJP',
    name: 'iPath Bloomberg Commodit...',
    logo: '🔵',
    price: '34.91 usd',
    change: '-0.23%'
  },
  {
    id: 'FXI',
    name: 'iShares China Large-Cap E...',
    logo: '🔵',
    price: '35.04 usd',
    change: '-2.58%'
  },
  {
    id: 'GDX',
    name: 'VanEck Gold Miners ETF',
    logo: '🔵',
    price: '41.08 usd',
    change: '-3.36%'
  },
  {
    id: 'GLD',
    name: 'SPDR Gold Trust',
    logo: '⚪',
    price: '266.29 usd',
    change: '-1.49%'
  }
];

const TrendCard = ({ trend }) => (
  <div className="min-w-[240px] p-4 border border-gray-200 rounded-lg mr-4">
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 mr-2">
        {trend.logo}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium truncate">{trend.id}</div>
        <div className="text-xs text-gray-500 truncate">{trend.name}</div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-xs text-gray-500">Price</div>
        <div className="text-sm font-medium">{trend.price}</div>
      </div>
      <div>
        <div className="text-xs text-gray-500">Change</div>
        <div className={`text-sm font-medium ${trend.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{trend.change}</div>
      </div>
    </div>
  </div>
);

const CommunityTrendsSlider = () => {
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
    <div className="max-w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          Community Trends
          <ChevronRight className="w-6 h-6 ml-1" />
        </h2>
      </div>
      
      <div className="relative">
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {COMMUNITY_TRENDS_DATA.map((trend) => (
            <div key={trend.id} className="snap-start">
              <TrendCard trend={trend} />
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

export default CommunityTrendsSlider;
