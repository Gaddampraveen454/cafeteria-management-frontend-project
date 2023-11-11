import React, { useMemo, useEffect } from 'react';

// import redux for auth guard
import { useSelector } from 'react-redux';

// import layout
import Layout from 'layout/Layout';

// import routing modules
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import adminRoutesAndMenuItems from 'AdminRoutes';
import cashierRoutesAndMenuItems from 'CashierRouts';
import consumerRoutesAndMenuItems from 'customerRoutes';
import Loading from 'components/loading/Loading';
import defaultRoutesAndMenuItems from 'defaultRoutes';
import iCafeAdminRoutesAndMenuItems from 'ICafeAdminRoutes';
// import companyRoutesAndMenuItems from 'ICafeAdminRoutes';


const App = () => {
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  console.log(currentUser, "fhhgfhfghfhfghfghfgh")
  let routsData = ''
  if (currentUser && currentUser.data && currentUser.data.group === "company") {
    routsData = adminRoutesAndMenuItems.mainMenuItems
  } else if (currentUser && currentUser.data && currentUser.data.group === "store") {
    routsData = cashierRoutesAndMenuItems.mainMenuItems
  } else if (currentUser && currentUser.data && currentUser.data.group === "consumer") {
    routsData = consumerRoutesAndMenuItems.mainMenuItems
  } else if (currentUser && currentUser.data && currentUser.data.group === 'icafe_admin') {
    routsData = iCafeAdminRoutesAndMenuItems.mainMenuItems
  }
  else {
    routsData = defaultRoutesAndMenuItems.mainMenuItems
  }

  // useEffect(() => {
  //   if (!window.location.pathname.startsWith('/menu/qr')) {
  //     const getcompanyId = (localStorage.getItem('companyId'));
  //     if (getcompanyId) {
  //       localStorage.setItem('companyId', (getcompanyId));
  //     }
  //     else {
  //       const checkMenu = window.location.pathname.split("menu/")
  //       localStorage.setItem('companyId', checkMenu[1]);
  //     }
  //   }
  // }, [localStorage.getItem('companyId')]);

  const routes = useMemo(() => getRoutes({ data: routsData, isLogin, userRole: currentUser.role }), [isLogin, currentUser]);
  if (routes) {
    return (
      <Layout>
        <RouteIdentifier routes={routes} fallback={<Loading />} />
      </Layout>
    );
  }
  return <></>;
};

export default App;
