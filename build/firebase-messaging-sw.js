// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyAqrVpcnA5S-A54uiwQIjSOOXOxKS0sleI",
  authDomain: "mista-336409.firebaseapp.com",
  projectId: "mista-336409",
  storageBucket: "mista-336409.appspot.com",
  messagingSenderId: "953669476615",
  appId: "1:953669476615:web:abeb75051619d1baf825a2",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message', payload);
 
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    tag: "notification-1",
    data: {
      url: payload.data.click_action
    }
  };
  // self.registration.hideNotification();
  self.registration.showNotification(notificationTitle, notificationOptions);
});
 
self.addEventListener('notificationclick', function (event) {
  console.log('Notification clicked', event);
 
  event.notification.close();
  event.stopImmediatePropagation();
  event.preventDefault();
 
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
   
});
