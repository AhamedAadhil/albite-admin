import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import { NotificationItem } from "../../Topbar";
import Link from "next/link";
import { useGetNotifications } from "@/hooks/useGetNotifications";

interface NotificationDropDownProps {
  notifications: Array<NotificationItem>;
  onNotificationsCleared: () => Promise<void>;
}

const NotificationDropdown = ({
  notifications,
  onNotificationsCleared,
}: NotificationDropDownProps) => {
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

  const handleMarkasRead = async () => {
    const res = await fetch(`/api/protected/notifications`, {
      method: "DELETE",
      body: JSON.stringify({ notificationId: "all" }),
    });
    const data = await res.json();
    if (res.ok) {
      await onNotificationsCleared();
      return;
    } else {
      alert(data.message);
    }
  };

  /**
   * Get time since
   */
  function timeSince(date: Date) {
    if (typeof date !== "object") {
      date = new Date(date);
    }

    const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);
    let intervalType: string;

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = "year";
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = "month";
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = "day";
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "hour";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "minute";
            } else {
              interval = seconds;
              intervalType = "second";
            }
          }
        }
      }
    }
    if (interval > 1 || interval === 0) {
      intervalType += "s";
    }
    return interval + " " + intervalType + " ago";
  }

  /**
   * Toggles the notification dropdown
   */
  const toggleDropDown = async () => {
    if (!dropDownOpen) {
      // about to open dropdown
      await onNotificationsCleared(); // fetch latest notifications before opening
    }
    setDropDownOpen(!dropDownOpen);
  };

  const typeIconMap: Record<string, { icon: string; bgClass: string }> = {
    "New Order Placed": {
      icon: "ri-shopping-cart-line",
      bgClass: "bg-primary-subtle text-primary",
    },
    "New User Registered": {
      icon: "ri-user-add-line",
      bgClass: "bg-success-subtle text-success",
    },
    "New Comment Added": {
      icon: "ri-chat-1-line",
      bgClass: "bg-info-subtle text-info",
    },
    "Order Status Update": {
      icon: "ri-truck-line",
      bgClass: "bg-warning-subtle text-warning",
    },
    "Points Reward": {
      icon: "ri-gift-line",
      bgClass: "bg-purple-subtle text-purple",
    },
    Promotion: {
      icon: "ri-megaphone-line",
      bgClass: "bg-danger-subtle text-danger",
    },
    "System Notification": {
      icon: "ri-notification-line",
      bgClass: "bg-secondary-subtle text-secondary",
    },
  };

  return (
    <Dropdown show={dropDownOpen} onToggle={toggleDropDown}>
      <Dropdown.Toggle
        as="a"
        className="nav-link arrow-none"
        data-bs-toggle="dropdown"
        role="button"
        onClick={toggleDropDown}
      >
        <i className="ri-notification-3-line fs-22" />
        <span className="noti-icon-badge badge text-bg-pink">
          {notifications.length}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        align="end"
        className="dropdown-menu-animated dropdown-lg py-0"
      >
        <div
          className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border"
          onClick={toggleDropDown}
        >
          <div className="row align-items-center">
            <div className="col">
              <h6 className="m-0 fs-16 fw-semibold"> Notification</h6>
            </div>
            <div className="col-auto">
              <span
                onClick={(e) => {
                  e.stopPropagation(); // prevent dropdown close
                  handleMarkasRead(); // your clear all function
                }}
                className="text-dark text-decoration-underline"
                style={{ cursor: "pointer" }}
              >
                <small>Clear All</small>
              </span>
            </div>
          </div>
        </div>
        <SimpleBar style={{ maxHeight: 300 }}>
          {/* item*/}

          {(notifications || []).map((notification, idx) => {
            const { icon, bgClass } = typeIconMap[notification.type] || {
              icon: "ri-notification-line",
              bgClass: "bg-light-subtle text-muted",
            };
            return (
              <Link key={idx} href="" className="dropdown-item notify-item">
                <div className={`notify-icon ${bgClass}`}>
                  <i className={icon} />
                </div>
                <p className="notify-details">
                  {notification.message}
                  <small className="noti-time">
                    {timeSince(notification.createdAt)}
                  </small>
                </p>
              </Link>
            );
          })}
        </SimpleBar>
        {/* All*/}
        {/* <Link
          href="#"
          className="dropdown-item text-center text-primary text-decoration-underline fw-bold notify-item border-top border-light py-2"
        >
          View All
        </Link> */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;
