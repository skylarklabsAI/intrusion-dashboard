import localforage from "localforage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import TokenService from "../services/tokenService";
import api from "../services/api";

const firebaseConfig = {
  apiKey: "AIzaSyAQ0xsOttC2XloZbS-dejqLJgK-Kdf-btw",
  authDomain: "paas-137ba.firebaseapp.com",
  projectId: "paas-137ba",
  storageBucket: "paas-137ba.appspot.com",
  messagingSenderId: "28833168765",
  appId: "1:28833168765:web:d9aec9936e519c941f6014",
  measurementId: "G-29T2LF0L43",
};

const firebaseApp = initializeApp(firebaseConfig);

export const gettoken = () => {
  const messaging = getMessaging(firebaseApp);
  getToken(messaging, {
    vapidKey:
      "BFrp2VDHzA8RinGsXzdCg6RFtgxTQdD2U8rKHD8yLwnR_kiNEAXnj1VLiqJMXJ6MEHWJjolI-uaXlgvz7pMvLqY",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        api
          .post("http://65.2.145.64:8000/notifications/fcm-devices/", {
            registration_id: currentToken,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(getMessaging(firebaseApp), (payload) => {
      resolve(payload);
    });
  });

// import api from "../services/api";
// import "firebase/messaging";
// import firebase from "firebase/app";
// const firebaseCloudMessaging = {
//   //checking whether token is available in indexed DB

//   tokenInlocalforage: async () => {
//     return localforage.getItem("fcm_token");
//   },
//   //initializing firebase app
//   init: async function () {
//     console.log(firebase.apps);
//     console.log("method called");
//     if (!firebase.apps.length) {
//       console.log("init called");
//       firebase.initializeApp({
//         apiKey: "AIzaSyA7BpoLpD7Im3e8a6gb62I--0pLxM0Jq1o",
//         authDomain: "testing-9f66d.firebaseapp.com",
//         projectId: "testing-9f66d",
//         storageBucket: "testing-9f66d.appspot.com",
//         messagingSenderId: "652131004426",
//         appId: "1:652131004426:web:bb8d9cf24c955cf550aff3",
//         measurementId: "G-6E6BPHMMWB",
//       });
//       try {
//         const messaging = firebase.messaging();
//         console.log("called 4");
//         const tokenInLocalForage = await this.tokenInlocalforage();
//         //if FCM token is already there just return the token

//         console.log(tokenInLocalForage);
//         if (tokenInLocalForage !== null) {
//           return tokenInLocalForage;
//         }
//         //requesting notification permission from browser
//         const status = await Notification.requestPermission();

//         if (status && status === "granted") {
//           //getting token from FCM
//           const fcm_token = await messaging.getToken({
//             vapidKey:
//               "BPEskUKk0GbZOzM-uvdF4tnBfBJLrZj7QXVWTlp0JjxHDr53QPVLOEk9Z94aXLy2qNnokLVdqKjX6NPtR32P9zQ",
//           });
//           console.log("fcm token : ", fcm_token);
//           if (fcm_token) {
//             api
//               .post("/notifications/fcm-devices/", {
//                 registration_id: fcm_token,
//               })
//               .then((response) => {
//                 console.log("token updated");
//                 console.log(response);
//               })
//               .catch((err) => {
//                 console.log(err.response);
//               });
//             localforage.setItem("fcm_token", fcm_token);
//             console.log("fcm token", fcm_token);
//             //return the FCM token after saving it
//             return fcm_token;
//             //setting FCM token in indexed db using localforage
//           }
//         }
//       } catch (error) {
//         console.error(error);
//         return null;
//       }
//     }
//   },
// };
// export { firebaseCloudMessaging };
