import React, { useMemo, useEffect, useState } from 'react';

// import redux for auth guard
import { useSelector, useDispatch } from 'react-redux';

// import layout
import Layout from 'layout/Layout';

// import routing modules
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import { toast } from 'react-toastify';
import adminRoutesAndMenuItems from 'AdminRoutes';
import cashierRoutesAndMenuItems from 'CashierRouts';
import consumerRoutesAndMenuItems from 'customerRoutes';
import Loading from 'components/loading/Loading';
import defaultRoutesAndMenuItems from 'defaultRoutes';
import iCafeAdminRoutesAndMenuItems from 'ICafeAdminRoutes';
import { fetchNotifications } from 'layout/nav/notifications/notificationSlice';
// import { getMes } from 'firebase';

// import companyRoutesAndMenuItems from 'ICafeAdminRoutes';
import { getMes, onMessageListener } from './firebase';


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

  const [isTokenFound, setTokenFound] = useState(false);
  const dispatch = useDispatch();

  console.log(isTokenFound, "isTokenFound")

  const checkSafari = () => {
    return /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window[`${"safari"}`] || (typeof safari !== 'undefined' && window[`${"safari"}`].pushNotification));
  }

  useEffect(() => {
    if (!checkSafari())
      // requestPermission();
      getMes(setTokenFound);

  }, []);

  useEffect(() => {
    if (currentUser && currentUser.data && currentUser.data.group === "consumer") {
      dispatch(fetchNotifications(0, 5, currentUser && currentUser?.data?.token, currentUser && currentUser?.data?.uuid))
    }
  }, [currentUser])

  useEffect(() => {
    if (!checkSafari()) {
      onMessageListener()
        .then((message) => {
          toast.success(message.notification.title, message.notification.body)

        })
        .catch((err) => {
          toast.error(JSON.stringify(err))
        });
    }
  });

  // useEffect(() => {
  //   if (!window.location.pathname.startsWith('/menu/qr')) {
  //     const getcompanyId = (localStorage.getItem('companyId'));
  //     if (getcompanyId) {
  //       localStorage.setItem('companyId', (getcompanyId));
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
