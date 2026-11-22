
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload = {};

  try {
    payload = event.data.json();
  } catch (e) {
    payload = { data: { body: event.data.text() } };
  }

  const data = payload.data || {};
  const title = data.title || "돌고래마차 호출";

  const options = {
    body: data.body || "직원이 입장을 요청했어요!",
    icon: "https://tmdqhr73-pixel.github.io/restaurant-waiting/",
    data: {
      url: data.url || "https://tmdqhr73-pixel.github.io/restaurant-waiting/"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
