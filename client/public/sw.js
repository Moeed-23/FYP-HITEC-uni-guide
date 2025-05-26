/* public/sw.js */
/* eslint-env serviceworker */

self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then(windowClients => {
      if (windowClients.length > 0) {
        return windowClients[0].focus();
      }
      return self.clients.openWindow("/");
    })
  );
});
