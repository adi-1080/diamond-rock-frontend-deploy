import React from 'react'
import LockedPage from '../LockedPage';

const InvestmentThemes = () => {
  return (
    <LockedPage
      navbarDefaultActiveMainMenu={"analytics"}
      pageTitle="Investment Themes"
      backTo="/analytics/home"
    />
  );
};

export default InvestmentThemes
