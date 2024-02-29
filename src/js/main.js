import "../css/style.css";
const notificationCount = document.querySelector(".notification-count");
const notificationElements = document.querySelectorAll(".notification-item");
const markAllAsReadItem = document.querySelector(".mark-as-read");

class Notifications {
  constructor(notificationElements, notificationCount, markAllAsReadItem) {
    this.notificationElements = notificationElements;
    this.notificationCount = notificationCount;
    this.markAllAsReadItem = markAllAsReadItem;
    this.count = this.notificationElements.length;
  }

  makeNotificationsAsUnread() {
    this.notificationElements.forEach((item) => {
      item.classList.add("unread");
      const notificationContent = item.querySelector(".notification-content");
      notificationContent.innerHTML += "<span class='bullet'>&bull;</span>";
    });
  }
  updateNotificationItem(item, readAll = false) {
    if (item.classList.contains("unread")) {
      item.classList.remove("unread");
      const bullet = item.querySelector("span.bullet");
      if (bullet) bullet.remove();
      this.count = readAll ? 0 : this.count - 1;
      this.updateNotificationCount(this.count);
    }
  }
  updateNotificationCount() {
    this.notificationCount.innerHTML = this.count;
  }
  markAllAsRead() {
    if (this.count > 0) {
      this.notificationElements.forEach((item) => {
        this.updateNotificationItem(item, true);
      });
    }
  }
  init() {
    this.makeNotificationsAsUnread();
    this.updateNotificationCount();
    this.notificationElements.forEach((item) => {
      item.addEventListener("click", () => {
        this.updateNotificationItem(item);
      });
    });
    this.markAllAsReadItem.addEventListener("click", () => {
      this.markAllAsRead();
    });
  }
}
const notifications = new Notifications(
  notificationElements,
  notificationCount,
  markAllAsReadItem
);

notifications.init();
