import React, { useMemo, useEffect, useState, useRef } from 'react';

// import redux for auth guard
import { useSelector, useDispatch } from 'react-redux';

// import layout
import Layout from 'layout/Layout';

// import routing modules
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import { toast } from 'react-toastify';
import { Modal, Row, Col } from 'react-bootstrap';
import adminRoutesAndMenuItems from 'AdminRoutes';
import cashierRoutesAndMenuItems from 'CashierRouts';
import consumerRoutesAndMenuItems from 'customerRoutes';
import Loading from 'components/loading/Loading';
import defaultRoutesAndMenuItems from 'defaultRoutes';
import iCafeAdminRoutesAndMenuItems from 'ICafeAdminRoutes';
import { fetchNotifications } from 'layout/nav/notifications/notificationSlice';
// import { getMes } from 'firebase';
import io from 'socket.io-client';

// import companyRoutesAndMenuItems from 'ICafeAdminRoutes';
import { getMes, onMessageListener } from './firebase';

import beep1 from "./Assests/audio/beep1.wav"
import beep2 from "./Assests/audio/beep2.mp3"



const App = () => {
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  console.log(currentUser, "fhhgfhfghfhfghfghfgh")
  const audioRef = useRef(null);
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

  //   const host = 'https://cmsapi.scienstechnologies.com'; // Replace with your server host
  //   const currentUserUuid = currentUser ? currentUser.data.uuid : "";
  //   const queryParams = { company_uuid: currentUserUuid };

  //   const socket = io(host, {
  //     path: '/pathToConnection',
  //     transports: ['websocket'],
  //     upgrade: false,
  //     query: queryParams,
  //     reconnection: true,
  //     rejectUnauthorized: false
  //   });

  //   socket.once('connect', () => {
  //     console.log('Connected to the server');
  //   });

  //   // socket.on('connect', () => {
  //   //   console.log('Connected to the server');
  //   // });

  //   socket.once("connect", () => {

  //     socket.on('orderNotification', (data) => {
  //       console.log('Online');
  //       console.log(data, "fdsfhgsfcsgj");
  //       alert('New Order Received!');
  //     });
  //     // socket.emit('orderNotification');
  //   })

  //   socket.once('connect', () => {
  //     socket.on('newOrder', { company_uuid: currentUserUuid, transaction_uuid: "TRANS-1AABB9D4" });
  //   });

  //   return () => {
  //     console.log('Disconnecting socket...');
  //     socket.disconnect();
  //   };

  // }, [currentUser]);
  // useEffect(() => {
  //   if (!window.location.pathname.startsWith('/menu/qr')) {
  //     const getcompanyId = (localStorage.getItem('companyId'));
  //     if (getcompanyId) {
  //       localStorage.setItem('companyId', (getcompanyId));
  //     }
  //   }
  // }, [localStorage.getItem('companyId')]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
  }

  useEffect(() => {
    if (currentUser.data && currentUser.data.group === "company") {

      const host = 'https://cmsapi.scienstechnologies.com'; // Replace with your server host
      const currentUserUuid = currentUser ? currentUser.data.uuid : "";
      const queryParams = { company_uuid: currentUserUuid };

      const socket = io(host, {
        path: '/pathToConnection',
        transports: ['websocket'],
        upgrade: false,
        query: queryParams,
        reconnection: true,
        rejectUnauthorized: false
      });

      socket.on('connect', () => {
        console.log('Connected to the server');


        socket.on('orderNotification', (count) => {
          console.log('Received new order:', count);
          setShow(true)
          alert("order Recieved")
        });
        socket.emit('newOrder');
      });

      // Clean up the socket connection when the component unmounts
      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
    return () => { };
  }, [])

  const song = new Audio(beep2);
  const song1 = new Audio(beep1);

  const AudioFunction = () => {
    new Audio(beep2).play()
  }

  useEffect(() => {
    // Trigger audio playback when the component mounts
    if (show === true) {
      AudioFunction();
    }
  }, [show]);

  const loopset = true;

  const routes = useMemo(() => getRoutes({ data: routsData, isLogin, userRole: currentUser.role }), [isLogin, currentUser]);
  if (routes) {
    return (
      <>
        <Layout>
          <RouteIdentifier routes={routes} fallback={<Loading />} />
        </Layout>
        <Modal
          show={show}
          id="settings"
          onHide={handleClose}
          className="modal"
          dialogClassName="full"
          aria-labelledby="settings"
          tabIndex="-1"
          scrollable
        >
          <Modal.Header>
            <Modal.Title as="h5">Niches</Modal.Title>
            <button type="button" className="btn-close" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body>
            <div>
              <Row>
                <Col>

                  <audio autoPlay loop={loopset} muted={false}>
                    {/* <source src="horse.ogg" type="audio/ogg"/> */}
                    <source src={song1} type="audio/mpeg" />
                    <track src={song1} kind="captions" label="english_captions" />
                    <track src={song1} kind="captions" label="spanish_captions" />
                  </audio>
                  {/* Order */}
                  {/* <button type='button' onClick={AudioFunction}>Play</button> */}
                </Col>
              </Row>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  return <></>;
};

export default App;
