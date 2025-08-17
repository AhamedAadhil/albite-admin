import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import { useGetSMSBalance } from "@/hooks/useGetInsights";

const MessageDropdown = async () => {
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

  /**
   * Toggles the notification dropdown
   */
  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  // Hardcoded bank account number
  const bankAccountNumber = "1234 5678 9012 3456";

  return (
    <>
      <Dropdown show={dropDownOpen} onToggle={toggleDropDown}>
        <Dropdown.Toggle
          as="a"
          className="nav-link dropdown-toggle arrow-none"
          role="button"
          onClick={toggleDropDown}
        >
          <i className="ri-message-2-line fs-22" />
          <span className="noti-icon-badge badge text-bg-primary">1</span>
        </Dropdown.Toggle>
        <Dropdown.Menu
          align="end"
          className="dropdown-menu-animated dropdown-lg py-0"
        >
          <div
            className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border"
            onClick={toggleDropDown}
          >
            <h6 className="m-0 fs-16 fw-semibold">Bank Account</h6>
          </div>

          <div className="p-3">
            <p className="mb-0 fs-14">{bankAccountNumber}</p>
          </div>

          <Link
            href="#"
            className="dropdown-item text-center text-primary text-decoration-underline fw-bold notify-item border-top border-light py-2"
          >
            View Details
          </Link>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default MessageDropdown;
