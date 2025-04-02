import React from 'react'
import LockedPage from '../LockedPage';

const AnalyticsScans = () => {
  return (
    <LockedPage
      navbarDefaultActiveMainMenu={"analytics"}
      pageTitle="Scans"
      backTo="/analytics/home"
    />
  );
};

export default AnalyticsScans
