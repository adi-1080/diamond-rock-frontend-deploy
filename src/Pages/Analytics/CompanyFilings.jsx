import React from 'react'
import LockedPage from '../LockedPage';

const CompanyFilings = () => {
  return (
    <LockedPage
      navbarDefaultActiveMainMenu={"analytics"}
      pageTitle="Company Filings"
      backTo="/analytics/home"
    />
  );
};


export default CompanyFilings
