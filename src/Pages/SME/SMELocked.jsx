import React from "react";

const SMELocked = ({ tab }) => {
  return (
    <div className="option-content flex flex-col justify-center items-center p-12">
      <h1 className="font-bold text-xl">{messages[tab]["topText"]}</h1>
      <h1 className="text-xl mt-3 mb-8">{messages[tab]["bottomText"]}</h1>
      <button className="bg-blue-700 text-white px-5 py-3 hover:bg-blue-600 rounded-md text-xl">
        Subscribe
      </button>
    </div>
  );
};

const messages = {
  Gainers: {
    topText: "Curious about which stocks are surging today?",
    bottomText: "Subscribe now to see the top gainers and stay ahead of the market.",
  },
  Losers: {
    topText: "Want to track which stocks are dipping?",
    bottomText: "Subscribe to get real-time insights on market losers and potential buy opportunities.",
  },
  Results: {
    topText: "Looking for the latest company earnings and financial results?",
    bottomText: "Subscribe to access detailed quarterly and annual results of top companies.",
  },
  Deliveries: {
    topText: "Interested in tracking stock delivery volumes?",
    bottomText: "Subscribe to uncover delivery trends and understand market movements.",
  },
  Technicals: {
    topText: "Want expert-level technical analysis on stocks?",
    bottomText: "Subscribe to get access to key indicators, trends, and chart patterns for better trading decisions.",
  },
};

export default SMELocked;
