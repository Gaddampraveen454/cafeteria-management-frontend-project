import React, { useMemo, useEffect, useState, useRef } from 'react';

// import redux for auth guard
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import layout
import Layout from 'layout/Layout';
// import "./App.css"
// import routing modules
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import { toast } from 'react-toastify';
import { Modal, Row, Col } from 'react-bootstrap';
import adminRoutesAndMenuItems from 'AdminRoutes';
import cashierRoutesAndMenuItems from 'CashierRouts';
import consumerRoutesAndMenuItems from 'customerRoutes';
import managerRoutesAndMenuItems from 'managerRoutes';
import Loading from 'components/loading/Loading';
import defaultRoutesAndMenuItems from 'defaultRoutes';
import iCafeAdminRoutesAndMenuItems from 'ICafeAdminRoutes';
import cashRoutesAndMenuItems from 'cashRoutes';
import EmployeeRoutesAndMenuItems from 'EmployeeRoutes';
import { fetchNotifications } from 'layout/nav/notifications/notificationSlice';
// import { getMes } from 'firebase';
import io from 'socket.io-client';
import { Button } from '@mui/material';
import Footer from 'layout/footer/Footer';
import axios from 'axios';
import withClearCache from './clearCache';
// import companyRoutesAndMenuItems from 'ICafeAdminRoutes';
import { getMes, onMessageListener } from './firebase';

import beep1 from "./Assests/audio/beep1.wav"
import beep2 from "./Assests/audio/telephone.mp3"









const App = () => {
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const LoginDetails = JSON.parse(localStorage.getItem("user"));
  const audioRef = useRef(null);
  let routsData = ''
  if (currentUser && currentUser.data && currentUser.data.group === "company") {
    routsData = adminRoutesAndMenuItems.mainMenuItems
  } else if (currentUser && currentUser.data && currentUser.data.group === "store") {
    routsData = cashierRoutesAndMenuItems.mainMenuItems
  } else if (currentUser && currentUser.data && currentUser.data.group === "consumer" && currentUser?.data?.change === false) {
    routsData = consumerRoutesAndMenuItems.mainMenuItems
  } else if (currentUser && currentUser.data && currentUser.data.group === "consumer" && currentUser?.data?.change === true) {
    routsData = EmployeeRoutesAndMenuItems.mainMenuItems
  } else if (currentUser && currentUser.data && currentUser.data.group === 'icafe_admin') {
    routsData = iCafeAdminRoutesAndMenuItems.mainMenuItems
  } else if (currentUser && currentUser.data && currentUser.data.group === 'manager') {
    routsData = managerRoutesAndMenuItems.mainMenuItems
  } else if (currentUser && currentUser.data && currentUser.data.group === 'cashier') {
    routsData = cashRoutesAndMenuItems.mainMenuItems
  }
  else {
    routsData = defaultRoutesAndMenuItems.mainMenuItems
  }

  const [isTokenFound, setTokenFound] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory('');

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
  const [audiostatus, setAudioStatus] = useState(false)
  const [recievedData, setRecievedData] = useState([])
  const [storerecievedData, setStoreRecievedData] = useState('')
  console.log(storerecievedData, "storerecievedData")

  const [print, setPrint] = useState(false);
  const [printData, setPrintData] = useState('')

  const [htmlprint, setHTMLPrint] = useState(false);
  const [htmlresponse, setHtmlResponse] = useState('');

  const handleClose = () => {
    setShow(false)
    setAudioStatus(false)
  }

  useEffect(() => {
    if (currentUser.data && currentUser.data.group === "company") {

      const host = `${process.env.REACT_APP_SOCKET}`; // Replace with your server host
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
      });

      // socket.emit('newOrder');

      socket.on('orderNotification', (count) => {
        console.log('Received new order:', count);
        setRecievedData(count)
        setShow(true)
        setAudioStatus(true)
        // alert("order Recieved")
      });

      socket.on('htmlContent', (html) => {
        console.log('Html Response:', html);
        setHTMLPrint(true)
        setHtmlResponse(html?.htmlContent)
        setAudioStatus(true)
        // alert("order Recieved")
      });


      socket.emit('newOrder');
      // Clean up the socket connection when the component unmounts
      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
    return () => { };
  }, [])

  useEffect(() => {
    if (currentUser.data && currentUser.data.group === "store") {

      const host = `${process.env.REACT_APP_SOCKET}`; // Replace with your server host
      const currentUserUuid = currentUser ? currentUser.data.uuid : "";
      const queryParams = { store_uuid: currentUserUuid };

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
      });

      // socket.emit('newOrder');

      socket.on('storeOrderNotification', (count) => {
        console.log('Received new order:', count);
        setStoreRecievedData(count)
        setShow(true)
        setAudioStatus(true)
        // alert("order Recieved")
      });

      socket.emit('newOrder');
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
  // const song1 = new Audio(beep1);

  const AudioFunction = () => {
    song.play()
  }

  const StopAudioFunction = () => {
    song.pause();
  }

  useEffect(() => {
    console.log(audiostatus, "audiostatus")
    // Trigger audio playback when the component mounts
    if (audiostatus === true) {
      AudioFunction();
    }
    else if (audiostatus === false) {
      StopAudioFunction();
    }
    // return song.pause();
  }, [audiostatus]);


  function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.uuid === id);
    // console.log(arr, id, objWithIdIndex, "sdsadasd")
    let data = recievedData
    if (objWithIdIndex > -1) {
      data = arr.splice(objWithIdIndex, 1);
      console.log(data, "sdsadasd")

    }

    return arr;
  }

  const RedirectToPendingList = () => {
    setShow(false)
    history.push({
      pathname: "/Pendingorders"
    })
  }

  const UpdateOrderStatus = (orderId, status) => {
    const payload = {
      "order_uuid": orderId,
      "status": status
    }
    axios.put(`${process.env.REACT_APP_URL}/order/status/update`, payload, {
      headers: {
        "x-auth-token": currentUser?.token
      }
    }).then((res) => {
      // alert("Status Updated");
      console.log(res, "res12345")
      StopAudioFunction();
      setAudioStatus(false)
      setPrintData(res.data?.data)
      setPrint(true)

      console.log('Before:', recievedData);
      const afterAccept = removeObjectWithId([...recievedData], orderId);
      console.log('After:', afterAccept);
      if (afterAccept?.length <= 0) {
        setShow(false);
      }
      setRecievedData(prevData => afterAccept);

      const afterAcceptStore = removeObjectWithId({ ...storerecievedData }, orderId)
      if (afterAcceptStore <= 0) {
        setShow(false);
      }
      setStoreRecievedData(prevData => afterAcceptStore);
    })
      .catch((err) => {
        console.log(err.response.data)
      })
  }

  const loopset = true;

  //   console.log(routsData, "routes")
  // useEffect(() => {
  //   const findIndex = routsData.map((item, index) => {
  //     if( currentUser?.data?.change === false && item.path === '/userchangepassword'){
  //      routsData.splice(index, 1)
  //     }
  //     return true;
  //    })
  // },[currentUser])

  const routes = useMemo(() => getRoutes({ data: routsData, isLogin, userRole: currentUser.role }), [isLogin, currentUser]);

  //  if(findIndex){
  //   routesData = routes.splice(findIndex, 1)
  //  }
  console.log(routes, routsData, "routes")
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
          onBackdropClick={false}
        >
          <Modal.Header>
            <Modal.Title as="h5">New Orders</Modal.Title>
            <button type="button" className="btn-close" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body>
            <div>
              <Row>
                <Col>

                  <audio autoPlay loop={loopset} muted={false}>
                    {/* <source src="horse.ogg" type="audio/ogg"/> */}
                    <source src={song} type="audio/mpeg" />
                    <track src={song} kind="captions" label="english_captions" />
                    <track src={song} kind="captions" label="spanish_captions" />
                  </audio>
                  {/* Order */}
                  {recievedData?.length > 0 && recievedData.map((item) => {
                    return <div key="" className='card sh-20 p-3 m-3'>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                          <h1>{item?.details[0]?.name}</h1>
                          <h2>Price : {item?.details[0]?.price}</h2>
                          <h2>Quantity : {item?.details[0]?.quantity}</h2>
                        </div>
                        <div>
                          <Button variant="outlined" onClick={() => UpdateOrderStatus(item.uuid, "Accepted")}>Accept</Button>&nbsp;&nbsp;
                          <Button variant="outlined" onClick={() => UpdateOrderStatus(item.uuid, "Cancelled")}>Ignore</Button>
                        </div>
                      </div>
                    </div>
                  })}
                  {storerecievedData &&
                    <div className='card sh-20 p-3 m-3'>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                          <h1>{storerecievedData?.details[0]?.name}</h1>
                          <h2>Price : {storerecievedData?.details[0]?.price}</h2>
                          <h2>Quantity : {storerecievedData?.details[0]?.quantity}</h2>
                        </div>
                        <div>
                          <Button variant="outlined" onClick={() => UpdateOrderStatus(storerecievedData?.uuid, "Accepted")}>Accept</Button>&nbsp;&nbsp;
                          <Button variant="outlined" onClick={() => UpdateOrderStatus(storerecievedData?.uuid, "Cancelled")}>Ignore</Button>
                        </div>
                      </div>
                    </div>
                  }
                </Col>
              </Row>
              <Col>
                <Button type="button" variant="outlined" style={{ marginTop: "86px", marginLeft: "81px" }} onClick={RedirectToPendingList}>View More Pending Orders</Button>
              </Col>
            </div>
          </Modal.Body>
        </Modal>

        {print === true && printData !== '' &&
          <iframe
            title="Print Frame"
            srcDoc={printData}
            onLoad={() => {
              const iframe = document.querySelector("iframe");
              iframe.style.display = "none"; // Hide the iframe
              // Check if the browser supports silent printing
              if ("requestMediaKeySystemAccess" in navigator) {
                try {
                  // Attempt to silently print
                  console.log("silently print");
                  iframe.contentWindow.print({ silent: true });
                  setTimeout(() => {
                    setHTMLPrint(false);
                    setHtmlResponse('');
                    // setAudioStatus(false);
                    // StopAudioFunction();
                  }, 1000)

                  setTimeout(() => {
                    StopAudioFunction();
                    setAudioStatus(false);
                  }, 3000)

                } catch (error) {
                  console.error("Error printing:", error);
                  setHTMLPrint(false)
                  setHtmlResponse('')
                }
              } else {
                console.error("Silent printing is not supported in this browser.");
                setHTMLPrint(false)
                setHtmlResponse('')
              }
            }}
          />
        }

        {htmlprint === true && htmlresponse !== "" &&
          <iframe
            title="Print Frame"
            srcDoc={htmlresponse}
            onLoad={() => {
              const iframe = document.querySelector("iframe");
              iframe.style.display = "none"; // Hide the iframe
              // Check if the browser supports silent printing
              if ("requestMediaKeySystemAccess" in navigator) {
                try {
                  // Attempt to silently print
                  console.log("silently print");
                  iframe.contentWindow.print({ silent: true });
                  setTimeout(() => {
                    setPrint(false);
                    setPrintData('');
                    // setAudioStatus(false);
                    // StopAudioFunction();
                  }, 1000)
                  setTimeout(() => {
                    StopAudioFunction();
                    setAudioStatus(false);
                  }, 3000)

                } catch (error) {
                  console.error("Error printing:", error);
                  setPrint(false)
                  setPrintData('')
                }
              } else {
                console.error("Silent printing is not supported in this browser.");
                setPrint(false)
                setPrintData('')
              }
            }}
          />
        }
      </>
    );
  }
  return <></>;
};

// const ClearCacheComponent = withClearCache(MainApp);

// function App() {
//   return (
//     <>
//       <ClearCacheComponent />
//     </>
//   );
// }
export default App;

