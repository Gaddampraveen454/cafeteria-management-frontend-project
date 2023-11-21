// import firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
// import 'firebase/analytics'
// import 'firebase/messaging';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from 'axios'
import { useSelector } from 'react-redux';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import firebaseMessaging from "./firebase-messaging-sw"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAqrVpcnA5S-A54uiwQIjSOOXOxKS0sleI",
  authDomain: "mista-336409.firebaseapp.com",
  projectId: "mista-336409",
  storageBucket: "mista-336409.appspot.com",
  messagingSenderId: "953669476615",
  appId: "1:953669476615:web:abeb75051619d1baf825a2",
  measurementId: "G-K4DW0CRYLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);


export const getMes = (setTokenFound, pubnub) => {
// const app1 = initializeApp(firebaseConfig);
// const analytics1 = getAnalytics(app);

// const messaging = getMessaging(app1);

const userdata1 = JSON.parse(localStorage.getItem("user"));
console.log(messaging,"messaging")

getToken(messaging, { vapidKey: 'BAHPDorxKjVssgWH3dYIWXIhbGB0xL3U7od9UUMftsFhh0qZZnH6t1iQ9V8vEFVN0UjwTX2lw2AXdkufy7p2ZbY' }).then((currentToken) => {
    if (currentToken) {
      setTokenFound(true);

    // Send the token to your server and update the UI if necessary
      let userdata = JSON.parse(localStorage.getItem("user"));
      userdata = userdata != null ? userdata : false;
      if (userdata && userdata && userdata?.data?.uuid){
        const config1 = {
          method: 'post',
          url: `${process.env.REACT_APP_URL}/firebase/save`,
          data: {
            firebasetoken: currentToken,   
            device_type: "web",
            user_uuid: userdata?.data?.uuid
          },
          headers: {
            'x-auth-token': userdata?.token
          }
        };
        axios(config1).then((resp) => {
          console.log(resp)
        })
          .catch(err => {
            console.log(err)

          })

          // pubnub.push.addChannels({
          //   channels: ['Suppor Mista'],
          //   device: currentToken,
          //   pushGateway: 'gcm', // For Android
          // });
      }
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    setTokenFound(true);
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
    
}

export const onMessageListener = () =>

  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
