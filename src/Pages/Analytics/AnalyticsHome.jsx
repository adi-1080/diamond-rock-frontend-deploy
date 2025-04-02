import LockedPage from "../LockedPage";

const AnalyticsHome = () => {
  return (
    <LockedPage
      navbarDefaultActiveMainMenu={"analytics"}
      pageTitle="Analytics Home"
      backTo="/marketHome"
    />
  );
};

export default AnalyticsHome;
