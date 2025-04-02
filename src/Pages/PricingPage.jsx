import React, { useState } from "react";
import NavMain from "../components/NavMain";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const plans = [
  {
    name: "Premium",
    priceMonthly: "₹250",
    priceYearly: "₹2999",
    description: "Essential Analytics for everyone. Discover the right Stocks and Mutual Funds.",
    features: [
      "400+ Advanced Scans and Combination Scans",
      "One Day, Swing & Positional Trading Strategies",
      "Investment Ideas, Investment Themes & Investor Portfolios",
      "Research Reports (Edge Reports) by StockEdge Analysts",
      "Market Breadth",
      "F&O Zone",
      "Advanced Filters & CSV Downloads",
      "Access to Peer Learning Club in StockEdge Social",
    ],
    contact: "+91 9230977260",
  },
  {
    name: "Pro",
    priceMonthly: "₹999",
    priceYearly: "₹11989",
    description: "Advanced Analytics Simplified. Get Deeper Insights and Analytics without losing hours in research.",
    features: [
      "All Premium Features +",
      "15+ Auto recognized Chart Patterns",
      "Sector Rotation & Industry Rotation",
      "Sector Analytics - Results, Shareholding",
      "Technical Peer Comparison",
      "Manage Portfolio via Account Aggregator (Single PAN)",
    ],
    contact: "+91 9230977260",
    popular: true,
  },
  {
    name: "Club",
    priceMonthly: "₹1999",
    priceYearly: "₹23989",
    description: "Analysts support, Expert recommendations. Accelerate your market learning through ideas and discussions",
    features: [
      "All Pro Features +",
      "Experts and analysts to help with your inquiries",
      "Trading and Investment ideas",
      "Access to Non-Exclusive unlimited Webinars and 999 Courses for free",
      "SE Social",
      "Access to 7 Different inhouse clubs",
    ],
    contact: "+91 9230968233",
  },
];

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div>
        <NavMain/>
        <div className="flex flex-col items-center pt-32 px-10">
            <h2 className="text-5xl font-bold mb-20">Choose The Plan That Is Right For You</h2>
            <div className="flex gap-2 mb-6">
                <button 
                className={`px-4 py-2 border rounded ${!isYearly ? "bg-blue-500 text-white" : "bg-white"}`}
                onClick={() => setIsYearly(false)}
                >
                Monthly
                </button>
                <button 
                className={`px-4 py-2 border rounded ${isYearly ? "bg-blue-500 text-white" : "bg-white"}`}
                onClick={() => setIsYearly(true)}
                >
                Yearly
                </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6 pb-20">
                {plans.map((plan) => (
                <div 
                    key={plan.name} 
                    className={`bg-gray-100 relative border rounded-lg shadow-md ${plan.popular ? "border-orange-500" : ""}`}
                >
                    {plan.popular && <span className="bg-orange-500 text-white absolute top-0 right-0 rounded-lg px-3 py-1">Popular</span>}
                    <div className="p-6">
                        <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                        <p>{plan.description}</p>
                    </div>
                    <div className="rounded-lg bg-white p-6">
                        <p className="text-3xl font-bold mt-5 mb-10">{isYearly ? plan.priceYearly : plan.priceMonthly} / {isYearly ? "Year" : "Month"}</p>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded w-full">Subscribe Now</button>
                        <p className="mt-2 text-sm">Use code <strong>DEAL</strong> at checkout and get <strong>45% off</strong>.</p>
                        <h4 className="font-bold mt-6 mb-4">Key Features</h4>
                        <ul className="list-disc ml-4">
                        {plan.features.map((feature, index) => (
                            <li key={index} className="text-green-500 p-2">✔ {feature}</li>
                        ))}
                        </ul>
                    </div>
                    <p className="mt-4 font-bold text-gray-500 text-center">For any query Contact: 📞 {plan.contact}</p>
                </div>
                ))}
            </div>
            </div>
            <FAQ/>
            <Footer/>
    </div>
  );
};

export default PricingPage;
