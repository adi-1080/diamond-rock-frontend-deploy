import React from 'react'
import LockedPage from '../LockedPage';

const InvestorPortfolios = () => {
  return (
    <LockedPage
      navbarDefaultActiveMainMenu={"analytics"}
      pageTitle="Investor Portfolios"
      backTo="/analytics/home"
    />
  );
};


export default InvestorPortfolios
