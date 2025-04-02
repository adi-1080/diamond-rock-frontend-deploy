import { useState } from "react";

const tabs = ["News", "Announcements", "Corp. Actions", "Feeds"];
const updates = [
  {
    date: "Thu, 13 Feb 2025",
    content:
      "Reliance Industries Limited has incorporated a wholly owned subsidiary, named REC Sustainable Energy Solutions Pte. Ltd in Singapore to set up a global capability centre",
  },
  {
    date: "Fri, 17 Jan 2025",
    content:
      "Reliance Industries Limited reported total income of Rs 248,079 crores, up by 7% (YoY) & profit after tax of Rs 21,804 crores, up by 11.88% (YoY) in Q3 FY 2025.",
  },
  {
    date: "Tue, 31 Dec 2024",
    content:
      "Reliance Digital Health Limited, a wholly owned subsidiary of Reliance Industries Limited, has acquired 45% equity stake in Health Alliance Group Inc for USD 10 million.",
  },
  {
    date: "Thu, 28 Nov 2024",
    content:
      "Reliance Finance and Investments USA LLC, a step-down wholly owned subsidiary of the company entered into a Stock Purchase Agreement with Wavetech Helium, Inc. acquiring its 21% of share capital for USD 12 million",
  },
  {
    date: "Tue, 15 Oct 2024",
    content:
      "Reliance Industries Revenue stands at Rs 2,58,027 crores, up by .8% growth & Net Profit stands at Rs 19,323 crores, down about 2.8%.",
  },
  {
    date: "Thu, 13 Feb 2025",
    content:
      "Reliance Industries Limited has incorporated a wholly owned subsidiary, named REC Sustainable Energy Solutions Pte. Ltd in Singapore to set up a global capability centre",
  },
  {
    date: "Fri, 17 Jan 2025",
    content:
      "Reliance Industries Limited reported total income of Rs 248,079 crores, up by 7% (YoY) & profit after tax of Rs 21,804 crores, up by 11.88% (YoY) in Q3 FY 2025.",
  },
  {
    date: "Tue, 31 Dec 2024",
    content:
      "Reliance Digital Health Limited, a wholly owned subsidiary of Reliance Industries Limited, has acquired 45% equity stake in Health Alliance Group Inc for USD 10 million.",
  },
  {
    date: "Thu, 28 Nov 2024",
    content:
      "Reliance Finance and Investments USA LLC, a step-down wholly owned subsidiary of the company entered into a Stock Purchase Agreement with Wavetech Helium, Inc. acquiring its 21% of share capital for USD 12 million",
  },
  {
    date: "Tue, 15 Oct 2024",
    content:
      "Reliance Industries Revenue stands at Rs 2,58,027 crores, up by .8% growth & Net Profit stands at Rs 19,323 crores, down about 2.8%.",
  },
];

export default function UpdatesSection() {
  const [activeTab, setActiveTab] = useState("News");

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Reliance Industries Ltd.</h2>
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-4">
        {updates.map((update, index) => (
          <div key={index} className="border-b pb-2">
            <p className="text-xs text-gray-400">{update.date}</p>
            <p className="text-sm text-gray-700">{update.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
