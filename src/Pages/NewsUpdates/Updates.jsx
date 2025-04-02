import { Calendar } from "lucide-react";
import React from "react";

const Updates = () => {
  const newsData = [
    {
      date: "Tue, 28 Jan 2025",
      items: [
        {
          title:
            "Autoline Industries Secures Prestigious Order Worth Rs 30 Crores from Mahindra & Mahindra for Scorpio and XUV 3XO Components",
          category: "Auto Ancillary",
        },
        {
          title:
            "Bosch Limited reported total income of Rs 4654.7 crores, up by 6.7% (YoY) & net profit of Rs 458.1 crores, down by 11.5% (YoY) in Q3 FY 2025",
          category: "Auto Ancillary",
        },
        {
          title:
            "Colgate-Palmolive (India) Limited reported total income of Rs 1482.24 crores, up by 4.8% (YoY) & net profit of Rs 322.78 crores, down by 2.21% (YoY) in Q3 FY 2025",
          category: "Household & Personal Products",
        },
      ],
    },
    {
      date: "Wed, 29 Jan 2025",
      items: [
        {
          title:
            "Tata Motors Unveils Next-Gen Electric SUV Concept at Auto Expo 2025",
          category: "Automobile",
        },
        {
          title:
            "Reliance Industries Reports 12% Growth in Net Profit for Q3 FY 2025",
          category: "Energy",
        },
        {
          title:
            "Infosys Signs $500 Million Deal with Global Banking Giant for Cloud Transformation",
          category: "Information Technology",
        },
      ],
    },
    {
      date: "Thu, 30 Jan 2025",
      items: [
        {
          title:
            "Adani Ports Acquires 49% Stake in Sri Lanka’s Largest Container Terminal",
          category: "Logistics",
        },
        {
          title: "HDFC Bank’s Net Interest Income Rises 8.4% in Q3 FY 2025",
          category: "Banking",
        },
        {
          title:
            "Hindustan Unilever Reports Decline in Rural Sales Amid Inflation Woes",
          category: "Fast Moving Consumer Goods",
        },
      ],
    },
  ];

  return (
    <div className="px-4 py-3">
      {newsData.map((day, index) => (
        <div key={index} className="relative mb-4 flex">
          {/* Vertical Line */}
          {index !== newsData.length && (
            <div className="absolute left-2 top-7 bottom-0 w-[1.5px] rounded-2xl bg-[rgb(150,150,150)]"></div>
          )}

          <div className="flex flex-col  w-full">
            {/* calendar icon and date */}
            <div className="flex items-center mb-3 relative z-10">
              <Calendar className="w-4 h-4 mr-2 opacity-60" />
              <span className="text-sm text-gray-600">{day.date}</span>
            </div>

            {/* news container */}
            <div className="space-y-3  w-full">
              {/* news div */}
              {day.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start bg-white p-3 rounded-lg shadow-[0px_0px_4px_rgba(0,0,0,0.2)] hover:shadow-[0px_0px_12px_rgba(0,0,0,0.2)] transition-shadow ml-8 mr-2"
                >
                  <div className="flex-1">
                    <h3 className="text-sm font-normal text-gray-900 mb-1.5 leading-tight">
                      {item.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Updates;
