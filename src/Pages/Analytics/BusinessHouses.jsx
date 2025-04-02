import React from 'react'
import LockedPage from '../LockedPage';

const BusinessHouses = () => {
  return (
    <LockedPage
      navbarDefaultActiveMainMenu={"analytics"}
      pageTitle="Business Houses"
      backTo="/analytics/home"
    />
  );
};

export default BusinessHouses
