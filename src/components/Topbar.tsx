"use client";
// assets
import logo from "@/assets/images/logo.png";
import logoSm from "@/assets/images/logo-sm.png";
import logoDark from "@/assets/images/logo-dark.png";
import profilePic from "@/assets/images/users/avatar-1.jpg";
import avatar1 from "@/assets/images/users/avatar-1.jpg";
import avatar2 from "@/assets/images/users/avatar-2.jpg";
import avatar3 from "@/assets/images/users/avatar-3.jpg";
import avatar4 from "@/assets/images/users/avatar-4.jpg";
import avatar5 from "@/assets/images/users/avatar-5.jpg";
import { ThemeSettings, useThemeContext } from "@/context/useThemeContext";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import SearchDropDown from "./layouts/topbar/SearchDropDown";
import LanguageDropdown from "./layouts/topbar/LanguageDropdown";
import MessageDropdown from "./layouts/topbar/MessageDropdown";
import NotificationDropdown from "./layouts/topbar/NotificationDropdown";
import ProfileDropdown from "./layouts/topbar/ProfileDropdown";
import useViewport from "@/hooks/useViewPort";
import { useThemeCustomizer } from "./ThemeCustomizer";
import { useGetSMSBalance } from "@/hooks/useGetSMSBalance";
import { useState } from "react";
/**
 * for subtraction minutes
 */
function subtractHours(date: Date, minutes: number) {
  date.setMinutes(date.getMinutes() - minutes);
  return date;
}
export type MessageItem = {
  id: number;
  name: string;
  subText: string;
  avatar: StaticImageData;
  createdAt: Date;
};

export type NotificationItem = {
  id: number;
  title: string;
  icon: string;
  variant: string;
  createdAt: Date;
};

export type ProfileOption = {
  label: string;
  icon: string;
  redirectTo: string;
};
const Messages: MessageItem[] = [
  {
    id: 1,
    name: "Cristina Pride",
    subText: "Hi, How are you? What about our next meeting",
    avatar: avatar1,
    createdAt: subtractHours(new Date(), 1440),
  },
  {
    id: 2,
    name: "Sam Garret",
    subText: "Yeah everything is fine",
    avatar: avatar2,
    createdAt: subtractHours(new Date(), 2880),
  },
  {
    id: 3,
    name: "Karen Robinson",
    subText: "Wow that's great",
    avatar: avatar3,
    createdAt: subtractHours(new Date(), 2880),
  },
  {
    id: 4,
    name: "Sherry Marshall",
    subText: "Hi, How are you? What about our next meeting",
    avatar: avatar4,
    createdAt: subtractHours(new Date(), 4320),
  },
  {
    id: 5,
    name: "Shawn Millard",
    subText: "Yeah everything is fine",
    avatar: avatar5,
    createdAt: subtractHours(new Date(), 5760),
  },
];

/**
 * notification items
 */
const Notifications: NotificationItem[] = [
  {
    id: 1,
    title: "Caleb Flakelar commented on Admin",
    icon: "mdi mdi-comment-account-outline",
    variant: "primary",
    createdAt: subtractHours(new Date(), 1),
  },
  {
    id: 2,
    title: "New user registered.",
    icon: "mdi mdi-account-plus",
    variant: "warning",
    createdAt: subtractHours(new Date(), 300),
  },
  {
    id: 3,
    title: "Carlos Crouch liked",
    icon: "mdi mdi-heart",
    variant: "danger",
    createdAt: subtractHours(new Date(), 4320),
  },
  {
    id: 4,
    title: "Caleb Flakelar commented on Admi",
    icon: "mdi mdi-comment-account-outline",
    variant: "pink",
    createdAt: subtractHours(new Date(), 5760),
  },
  {
    id: 5,
    title: "New user registered.",
    icon: "mdi mdi-account-plus",
    variant: "purple",
    createdAt: subtractHours(new Date(), 10960),
  },
  {
    id: 6,
    title: "Carlos Crouch liked Admin",
    icon: "mdi mdi-heart",
    variant: "success",
    createdAt: subtractHours(new Date(), 10960),
  },
];
const profileMenus: ProfileOption[] = [
  {
    label: "My Account",
    icon: "ri-account-circle-line",
    redirectTo: "/pages/profile",
  },
  {
    label: "Settings",
    icon: "ri-settings-4-line",
    redirectTo: "/pages/profile",
  },
  {
    label: "Support",
    icon: "ri-customer-service-2-line",
    redirectTo: "/pages/faq",
  },
  {
    label: "Lock Screen",
    icon: "ri-lock-password-line",
    redirectTo: "/auth/lock-screen",
  },
  {
    label: "Logout",
    icon: "ri-logout-box-line",
    redirectTo: "/auth/logout",
  },
];

type TopbarProps = {
  topbarDark?: boolean;
  toggleMenu?: () => void;
  navOpen?: boolean;
};
const Topbar = ({ toggleMenu, navOpen }: TopbarProps) => {
  const { sideBarType } = useThemeCustomizer();
  const { width } = useViewport();
  const { data, error } = useGetSMSBalance();

  const [showDrawer, setShowDrawer] = useState(false);

  const remainingUnits =
    data?.data?.data?.remaining_balance?.split(" ")[1] || "0";

  const isPositive = Number(remainingUnits) > 0;

  const bankDetails = {
    holderName: "John Doe",
    accountNumber: "1234 5678 9012 3456",
    bank: "Example Bank",
    branch: "Main Branch",
  };

  /**
   * Toggle the leftmenu when having mobile screen
   */

  const handleLeftMenuCallBack = () => {
    if (width < 768) {
      if (sideBarType === "full") {
        showLeftSideBarBackdrop();
        document
          .getElementsByTagName("html")[0]
          .classList.add("sidebar-enable");
      } else {
        updateSidebar({ size: ThemeSettings.sidebar.size.full });
      }
    } else if (sideBarType === "condensed") {
      updateSidebar({ size: ThemeSettings.sidebar.size.default });
    } else if (sideBarType === "full") {
      showLeftSideBarBackdrop();
      document.getElementsByTagName("html")[0].classList.add("sidebar-enable");
    } else if (sideBarType === "fullscreen") {
      updateSidebar({ size: ThemeSettings.sidebar.size.default });
      document.getElementsByTagName("html")[0].classList.add("sidebar-enable");
    } else {
      updateSidebar({ size: ThemeSettings.sidebar.size.condensed });
    }
  };

  /**
   * creates backdrop for leftsidebar
   */
  function showLeftSideBarBackdrop() {
    const backdrop = document.createElement("div");
    backdrop.id = "custom-backdrop";
    backdrop.className = "offcanvas-backdrop fade show";
    document.body.appendChild(backdrop);

    backdrop.addEventListener("click", function () {
      document
        .getElementsByTagName("html")[0]
        .classList.remove("sidebar-enable");
      hideLeftSideBarBackdrop();
    });
  }

  function hideLeftSideBarBackdrop() {
    const backdrop = document.getElementById("custom-backdrop");
    if (backdrop) {
      document.body.removeChild(backdrop);
      document.body.style.removeProperty("overflow");
    }
  }
  const { settings, updateSettings, updateSidebar } = useThemeContext();

  /**
   * Toggle Dark Mode
   */
  const toggleDarkMode = () => {
    if (settings.theme === "dark") {
      updateSettings({ theme: ThemeSettings.theme.light });
    } else {
      updateSettings({ theme: ThemeSettings.theme.dark });
    }
  };

  const handleRightSideBar = () => {
    updateSettings({ rightSidebar: ThemeSettings.rightSidebar.show });
  };
  return (
    <>
      <div className="navbar-custom">
        <div className="topbar container-fluid">
          <div className="d-flex align-items-center gap-1">
            {/* Topbar Brand Logo */}
            <div className="logo-topbar">
              {/* Logo light */}
              <Link href="/" className="logo-light">
                <span className="logo-lg">
                  <Image className="w-auto" src={logo} alt="logo" />
                </span>
                <span className="logo-sm">
                  <Image className="w-auto" src={logoSm} alt="small logo" />
                </span>
              </Link>
              {/* Logo Dark */}
              <Link href="/" className="logo-dark">
                <span className="logo-lg">
                  <Image className="w-auto" src={logoDark} alt="dark logo" />
                </span>
                <span className="logo-sm">
                  <Image className="w-auto" src={logoSm} alt="small logo" />
                </span>
              </Link>
            </div>
            {/* Sidebar Menu Toggle Button */}
            <button
              className="button-toggle-menu"
              onClick={handleLeftMenuCallBack}
            >
              <i className="ri-menu-line" />
            </button>
            {/* Horizontal Menu Toggle Button */}
            <button
              className={`navbar-toggle ${navOpen ? "open" : ""}`}
              data-bs-toggle="collapse"
              data-bs-target="#topnav-menu-content"
              onClick={toggleMenu}
            >
              <div className="lines">
                <span />
                <span />
                <span />
              </div>
            </button>
            {/* Topbar Search Form */}
            <div className="app-search d-none d-lg-block">
              <form>
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <span className="ri-search-line search-icon text-muted" />
                </div>
              </form>
            </div>
          </div>
          <ul className="topbar-menu d-flex align-items-center gap-3">
            <li className="dropdown d-lg-none">
              <SearchDropDown />
            </li>
            {/* <li className="dropdown">
							<LanguageDropdown />
						</li> */}

            {/*SMS BALANCE  */}
            {isPositive && (
              <>
                <li
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => setShowDrawer(true)}
                >
                  <i className="ri-message-2-line fs-22" />
                  <span style={{ marginLeft: 6 }}>
                    SMS units Remaining:{" "}
                    <span className="noti-icon-badge badge text-bg-pink fs-12">
                      {remainingUnits}
                    </span>
                  </span>
                </li>

                {showDrawer && (
                  <>
                    {/* Backdrop fixed on whole screen */}
                    <div
                      onClick={() => setShowDrawer(false)}
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 999,
                        cursor: "pointer",
                      }}
                    />

                    {/* Drawer positioned relative to viewport (fixed or absolute somewhere) */}
                    <div
                      style={{
                        position: "absolute", // Or fixed if you'd like it to scroll with viewport
                        top: "50px", // Adjust depending on your layout
                        left: "10px", // Adjust to be under the <li> element properly
                        width: "320px",
                        padding: "20px",
                        borderRadius: "8px",
                        background: "#f4f4f4",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        zIndex: 1000,
                        maxWidth: "90vw",
                      }}
                    >
                      <button
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "15px",
                          background: "transparent",
                          border: "none",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowDrawer(false)}
                        aria-label="Close"
                      >
                        ×
                      </button>
                      <h5 style={{ marginBottom: "15px" }}>
                        Bank Account Details For Recharge
                      </h5>
                      <div>
                        <div>
                          <strong>Account Holder Name:</strong>{" "}
                          {bankDetails.holderName}
                        </div>
                        <div>
                          <strong>Account Number:</strong>{" "}
                          {bankDetails.accountNumber}
                        </div>
                        <div>
                          <strong>Bank:</strong> {bankDetails.bank}
                        </div>
                        <div>
                          <strong>Branch:</strong> {bankDetails.branch}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* <li className="dropdown notification-list">
              <MessageDropdown
              remaining_balance={
                data?.data?.data?.remaining_balance?.split(" ")[1]
              }
              />
            </li> */}
            <li className="dropdown notification-list">
              <NotificationDropdown notifications={Notifications} />
            </li>
            {/* <li className="d-none d-sm-inline-block">
              <button className="nav-link" onClick={handleRightSideBar}>
                <i className="ri-settings-3-line fs-22" />
              </button>
            </li> */}
            <li className="d-none d-sm-inline-block">
              <div
                className="nav-link"
                id="light-dark-mode"
                onClick={toggleDarkMode}
              >
                <i className="ri-moon-line fs-22" />
              </div>
            </li>
            <li className="dropdown">
              <ProfileDropdown
                menuItems={profileMenus}
                userImage={profilePic}
                username="Aseez Mohamed"
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Topbar;
