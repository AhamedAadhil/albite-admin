"use client";
import { Dropdown } from "react-bootstrap";
import useToggle from "@/hooks/useToggle";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

type ProfileDropdownProps = {
  userImage: StaticImageData;
  username: string;
};

const ProfileDropdown = ({ userImage, username }: ProfileDropdownProps) => {
  const [isOpen, toggleDropdown] = useToggle();
  const [info, setInfo] = useState<any>({
    ip: "Loading...",
    device: null,
  });

  useEffect(() => {
    // Get IP
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setInfo((prev: any) => ({ ...prev, ip: data.ip })))
      .catch(() =>
        setInfo((prev: any) => ({ ...prev, ip: "Unable to fetch" }))
      );

    // Get Device / Browser Info
    const parser = new UAParser();
    const result = parser.getResult();
    const screenSize = `${window.screen.width}x${window.screen.height}`;

    setInfo((prev: any) => ({
      ...prev,
      device: {
        browser: result.browser.name,
        os: result.os.name,
        osVersion: result.os.version,
        type: result.device.type || "Desktop",
        screen: screenSize,
      },
    }));
  }, []);

  return (
    <Dropdown show={isOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        className="nav-link dropdown-toggle arrow-none nav-user"
        href="#"
        role="button"
        as={Link}
        onClick={toggleDropdown}
      >
        <span className="account-user-avatar">
          <Image
            src={userImage}
            alt="user-image"
            width={32}
            className="rounded-circle"
          />
        </span>
        <span className="d-lg-block d-none">
          <h5 className="my-0 fw-normal">
            {username}{" "}
            <i className="ri-arrow-down-s-line d-none d-sm-inline-block align-middle" />
          </h5>
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu
        align="end"
        className="dropdown-menu-animated profile-dropdown"
      >
        <div onClick={toggleDropdown}>
          <div className="dropdown-header noti-title">
            <h6 className="text-overflow m-0">Device Info</h6>
          </div>

          <div className="px-3 py-2 small">
            <p>
              <i className="ri-global-line me-2 text-primary" />
              <b>IP:</b> {info.ip}
            </p>
            <p>
              <i className="ri-computer-line me-2 text-success" />
              <b>OS:</b> {info.device?.os} {info.device?.osVersion}
            </p>
            <p>
              <i className="ri-window-line me-2 text-warning" />
              <b>Browser:</b> {info.device?.browser}
            </p>
            <p>
              <i className="ri-smartphone-line me-2 text-danger" />
              <b>Device:</b> {info.device?.type}
            </p>
            <p>
              <i className="ri-fullscreen-line me-2 text-info" />
              <b>Screen:</b> {info.device?.screen}
            </p>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
