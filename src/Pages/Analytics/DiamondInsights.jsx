import React from 'react'
import LockedPage from '../LockedPage';

const DiamondInsights = () => {
  return (
    <LockedPage
      navbarDefaultActiveMainMenu={"analytics"}
      pageTitle="Diamond Insights"
      backTo="/analytics/home"
    />
  );
};

export default DiamondInsights
