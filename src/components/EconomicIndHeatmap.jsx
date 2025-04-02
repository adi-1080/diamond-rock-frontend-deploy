import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const EconomicHeatmap = () => {
  const data = [
    {
      country: 'USA',
      flag: '🇺🇸',
      gdp: '27.72T USD',
      gdpGrowth: '2.5%',
      budgetToGDP: '-6.2% of GDP',
      debtToGDP: '122.3% of GDP',
      interestRate: '4.5%',
      inflationRate: '3%',
      unemploymentRate: '4%',
      currentAccountToGDP: '-3% of GDP',
      industrialProduction: '2%'
    },
    {
      country: 'China',
      flag: '🇨🇳',
      gdp: '17.79T USD',
      gdpGrowth: '5.4%',
      budgetToGDP: '-5.8% of GDP',
      debtToGDP: '83.4% of GDP',
      interestRate: '3.1%',
      inflationRate: '0.5%',
      unemploymentRate: '5.1%',
      currentAccountToGDP: '1.5% of GDP',
      industrialProduction: '6.2%'
    },
    {
      country: 'EU',
      flag: '🇪🇺',
      gdp: '15.78T USD',
      gdpGrowth: '0.9%',
      budgetToGDP: '-3.6% of GDP',
      debtToGDP: '87.4% of GDP',
      interestRate: '2.9%',
      inflationRate: '2.5%',
      unemploymentRate: '6.3%',
      currentAccountToGDP: '1.7% of GDP',
      industrialProduction: '-2%'
    },
    {
      country: 'Germany',
      flag: '🇩🇪',
      gdp: '4.53T USD',
      gdpGrowth: '-0.2%',
      budgetToGDP: '-2.5% of GDP',
      debtToGDP: '62.9% of GDP',
      interestRate: '3.65%',
      inflationRate: '2.3%',
      unemploymentRate: '6.2%',
      currentAccountToGDP: '5.8% of GDP',
      industrialProduction: '-3.1%'
    },
    {
      country: 'Japan',
      flag: '🇯🇵',
      gdp: '4.2T USD',
      gdpGrowth: '1.2%',
      budgetToGDP: '-5.5% of GDP',
      debtToGDP: '255.2% of GDP',
      interestRate: '0.5%',
      inflationRate: '4%',
      unemploymentRate: '2.4%',
      currentAccountToGDP: '4.7% of GDP',
      industrialProduction: '-1.6%'
    },
    {
      country: 'India',
      flag: '🇮🇳',
      gdp: '3.57T USD',
      gdpGrowth: '5.4%',
      budgetToGDP: '-5.63% of GDP',
      debtToGDP: '81.59% of GDP',
      interestRate: '6.25%',
      inflationRate: '4.31%',
      unemploymentRate: '8.3%',
      currentAccountToGDP: '-1.2% of GDP',
      industrialProduction: '3.2%'
    },
    {
      country: 'UK',
      flag: '🇬🇧',
      gdp: '3.38T USD',
      gdpGrowth: '1.4%',
      budgetToGDP: '-4.8% of GDP',
      debtToGDP: '95.3% of GDP',
      interestRate: '4.5%',
      inflationRate: '3%',
      unemploymentRate: '4.4%',
      currentAccountToGDP: '-2.2% of GDP',
      industrialProduction: '-1.9%'
    },
    {
      country: 'France',
      flag: '🇫🇷',
      gdp: '3.05T USD',
      gdpGrowth: '0.7%',
      budgetToGDP: '-5.5% of GDP',
      debtToGDP: '110.6% of GDP',
      interestRate: '3.65%',
      inflationRate: '1.7%',
      unemploymentRate: '7.3%',
      currentAccountToGDP: '-1% of GDP',
      industrialProduction: '-1.74%'
    },
    {
      country: 'Canada',
      flag: '🇨🇦',
      gdp: '2.14T USD',
      gdpGrowth: '1.5%',
      budgetToGDP: '-1.4% of GDP',
      debtToGDP: '107.5% of GDP',
      interestRate: '3%',
      inflationRate: '1.9%',
      unemploymentRate: '6.6%',
      currentAccountToGDP: '-1% of GDP',
      industrialProduction: '1.5%'
    },
    {
      country: 'Russia',
      flag: '🇷🇺',
      gdp: '2.02T USD',
      gdpGrowth: '3.1%',
      budgetToGDP: '-1.7% of GDP',
      debtToGDP: '14.9% of GDP',
      interestRate: '21%',
      inflationRate: '9.9%',
      unemploymentRate: '2.3%',
      currentAccountToGDP: '2.5% of GDP',
      industrialProduction: '8.2%'
    }
  ];

  const headers = [
    'GDP',
    'GDP Growth',
    'Budget to GDP',
    'Government Debt to GDP',
    'Interest Rate',
    'Inflation Rate',
    'Unemployment Rate',
    'Current Account to GDP',
    'Industrial Production YoY'
  ];

  const getBackgroundColor = (value) => {
    if (value.includes('-')) return 'bg-orange-100';
    if (parseFloat(value) > 5) return 'bg-blue-100';
    if (parseFloat(value) > 2) return 'bg-blue-50';
    return '';
  };

  return (
    <Card className="w-full m-8 mx-0">
      <CardHeader>
        <h2 className="text-xl font-semibold">Economic indicators heatmap</h2>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 text-left"></th>
                {headers.map(header => (
                  <th key={header} className="p-2 text-left text-sm">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.country}>
                  <td className="p-2 flex items-center gap-2">
                    <span className="text-xl">{row.flag}</span>
                    <span>{row.country}</span>
                  </td>
                  <td className="p-2">{row.gdp}</td>
                  <td className={`p-2 transition-colors hover:bg-blue-100 ${getBackgroundColor(row.gdpGrowth)}`}>
                    {row.gdpGrowth}
                  </td>
                  <td className={`p-2 transition-colors hover:bg-blue-100 ${getBackgroundColor(row.budgetToGDP)}`}>
                    {row.budgetToGDP}
                  </td>
                  <td className={`p-2 transition-colors hover:bg-blue-100 ${getBackgroundColor(row.debtToGDP)}`}>
                    {row.debtToGDP}
                  </td>
                  <td className={`p-2 transition-colors hover:bg-blue-100 ${getBackgroundColor(row.interestRate)}`}>
                    {row.interestRate}
                  </td>
                  <td className={`p-2 transition-colors hover:bg-blue-100 ${getBackgroundColor(row.inflationRate)}`}>
                    {row.inflationRate}
                  </td>
                  <td className={`p-2 transition-colors hover:bg-blue-100 ${getBackgroundColor(row.unemploymentRate)}`}>
                    {row.unemploymentRate}
                  </td>
                  <td className={`p-2 transition-colors hover:bg-blue-100 ${getBackgroundColor(row.currentAccountToGDP)}`}>
                    {row.currentAccountToGDP}
                  </td>
                  <td className={`p-2 transition-colors hover:bg-blue-100 ${getBackgroundColor(row.industrialProduction)}`}>
                    {row.industrialProduction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EconomicHeatmap;