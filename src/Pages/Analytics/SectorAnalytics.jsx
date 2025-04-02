import React from 'react'
import LockedPage from '../LockedPage';

const SectorAnalytics = () => {
  return (
    <LockedPage
      navbarDefaultActiveMainMenu={"analytics"}
      pageTitle="Sector Analytics"
      backTo="/analytics/home"
    />
  );
};


export default SectorAnalytics
