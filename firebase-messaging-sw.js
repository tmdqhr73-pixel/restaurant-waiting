importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCcj43qzixuLtvDNLHtLCsEwqv9bUleE_w",
  authDomain: "restaurant-waiting-e5421.firebaseapp.com",
  databaseURL: "https://restaurant-waiting-e5421-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "restaurant-waiting-e5421",
  storageBucket: "restaurant-waiting-e5421.firebasestorage.app",
  messagingSenderId: "521964526194",
  appId: "1:521964526194:web:80e67136603f74f8a200eb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.data?.title || "돌고래마차 호출";
  const options = {
    body: payload.data?.body || "직원이 입장을 요청했어요!",
    icon: "https://tmdqhr73-pixel.github.io/restaurant-waiting/",
    data: {
      url: "https://tmdqhr73-pixel.github.io/restaurant-waiting/"
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
