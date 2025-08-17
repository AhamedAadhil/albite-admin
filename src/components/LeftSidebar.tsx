import logo from "@/assets/images/logo.png";
import logo2 from "@/assets/images/logo2.png";
import logoDark from "@/assets/images/logo-dark.png";
import logoSm from "@/assets/images/logo-sm.png";
import SimpleBar from "simplebar-react";
import Image from "next/image";
import { getMenuItems } from "@/common/menu";
import AppMenu from "./layouts/Menu";
import Link from "next/link";

/* Sidebar content */
const SideBarContent = () => {
  return (
    <>
      <AppMenu menuItems={getMenuItems()} />
      <div className="clearfix" />
    </>
  );
};
const LeftSidebar = () => {
  return (
    <>
      <div className="leftside-menu">
        {/* Brand Logo Light */}
        <Link href="/" className="logo logo-light">
          <span className="logo-lg">
            <Image src={logo} alt="logo" />
          </span>
          <span className="logo-sm">
            <Image src={logoSm} alt="small logo" />
          </span>
        </Link>

        {/* Brand Logo Dark */}
        <Link href="/" className="logo logo-dark">
          <span className="logo-lg">
            <Image src={logoDark} alt="dark logo" />
          </span>
          <span className="logo-sm">
            <Image src={logoSm} alt="small logo" />
          </span>
        </Link>
        {/* Sidebar -left */}
        <SimpleBar
          className="h-100"
          id="leftside-menu-container"
          data-simplebar=""
        >
          {/*- Sidemenu */}
          <SideBarContent />
          {/*- End Sidemenu */}
          <div className="clearfix" />
        </SimpleBar>
      </div>
    </>
  );
};

export default LeftSidebar;
