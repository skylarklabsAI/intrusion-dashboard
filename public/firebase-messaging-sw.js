// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyAQ0xsOttC2XloZbS-dejqLJgK-Kdf-btw",
  authDomain: "paas-137ba.firebaseapp.com",
  projectId: "paas-137ba",
  storageBucket: "paas-137ba.appspot.com",
  messagingSenderId: "28833168765",
  appId: "1:28833168765:web:d9aec9936e519c941f6014",
  measurementId: "G-29T2LF0L43",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
