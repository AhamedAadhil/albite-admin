import React, { useState } from "react";
import {
  Card,
  Badge,
  Button,
  OverlayTrigger,
  Tooltip,
  Form,
} from "react-bootstrap";
import { IUser } from "@/models/user";
import { useRouter, useSearchParams } from "next/navigation";
import getInitials from "@/helper/getInitials";

interface Props {
  user: IUser;
  onEdit?: () => void;
}

export default function UserCard({ user: initialUser }: Props) {
  const router = useRouter();

  const [user, setUser] = useState<Partial<IUser> | any>(
    JSON.parse(JSON.stringify(initialUser))
  );

  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const handleToggleActive = async (userId: string, currentState: boolean) => {
    try {
      setLoadingUserId(userId);

      const res = await fetch(`/api/protected/users/${userId}/toggle-verify`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVerified: !currentState }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to toggle user status");
      }

      // ✅ Update the local state manually
      setUser((prevUser: any) => ({
        ...prevUser,
        isVerified: !currentState,
      }));

      alert(
        `User ${data.updatedUser.name} has been ${
          !currentState ? "enabled" : "disabled"
        } successfully`
      );

      // You should ideally refresh the user list here too
    } catch (error) {
      console.error("Failed to toggle user status", error);
      alert(
        `Failed to toggle user status: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoadingUserId(null);
    }
  };

  const handleViewProfile = () => {
    localStorage.setItem("viewUser_userId", user?._id.toString());
    router.push(`/users/profile`);
  };

  return (
    <Card
      className="shadow-sm h-100 border-0 position-relative"
      style={{ borderRadius: 12 }}
    >
      {/* Header */}
      <Card.Header className="bg-white border-0 pb-2 d-flex align-items-start gap-3">
        {/* Avatar */}
        <div
          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0"
          style={{ width: 58, height: 58, fontWeight: "bold", fontSize: 28 }}
        >
          {getInitials(user.name)}
        </div>

        {/* Info */}
        <div className="w-100" style={{ minWidth: 0 }}>
          <OverlayTrigger overlay={<Tooltip>{user.name}</Tooltip>}>
            <h5 className="mb-1 text-truncate" style={{ maxWidth: "100%" }}>
              {user.name}
            </h5>
          </OverlayTrigger>

          <OverlayTrigger overlay={<Tooltip>{user.email}</Tooltip>}>
            <p
              className="text-muted small mb-1 text-truncate d-block"
              style={{ maxWidth: "100%" }}
            >
              <i className="ri-mail-line me-1"></i>
              {user.email}
            </p>
          </OverlayTrigger>

          <OverlayTrigger overlay={<Tooltip>{user.mobile}</Tooltip>}>
            <p
              className="text-muted small mb-2 text-truncate d-block"
              style={{ maxWidth: "100%" }}
            >
              <i className="ri-phone-line me-1"></i>
              {user.mobile}
            </p>
          </OverlayTrigger>

          <Badge pill bg={user.isVerified ? "success" : "secondary"}>
            {user.isVerified ? "Verified" : "Unverified"}
          </Badge>
        </div>
      </Card.Header>

      {/* Body Stats */}
      <Card.Body className="pt-1">
        <div className="row row-cols-2 g-2">
          <StatRow
            icon="ri-shopping-bag-2-line"
            label="Orders"
            value={user.orders.length}
          />
          <StatRow
            icon="ri-currency-line"
            label="Spent"
            value={`${user.totalSpent.toFixed(0)} Rs`}
          />
          <StatRow icon="ri-star-line" label="Points" value={user.points} />
          <StatRow
            icon="ri-map-pin-line"
            label="Region"
            value={user.region || "N/A"}
          />
          {/* <StatRow
            icon="ri-shopping-cart-line"
            label="Has Cart"
            value={user.cart ? "Yes" : "No"}
          /> */}
        </div>
      </Card.Body>

      {/* Action Button */}
      {/* Action Buttons */}
      <div
        className="position-absolute d-flex gap-2 align-items-center"
        style={{ bottom: 12, right: 12 }}
      >
        <Button size="sm" variant="outline-primary" onClick={handleViewProfile}>
          <i className="ri-eye-line me-1"></i> View
        </Button>

        {loadingUserId === user._id.toString() ? (
          <div
            className="spinner-border spinner-border-sm text-primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <Form.Check
            type="switch"
            id={`toggle-${user._id}`}
            checked={user.isVerified}
            onChange={() =>
              handleToggleActive(user._id.toString(), user.isVerified)
            }
            label={user.isVerified ? "Enabled" : "Disabled"}
            className="text-muted small"
          />
        )}
      </div>
    </Card>
  );
}

// Stat Row Component
function StatRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string | number;
}) {
  return (
    <div
      className="col d-flex align-items-center gap-2 text-muted small"
      style={{ minWidth: 0 }}
    >
      <i className={`${icon} text-primary`} style={{ fontSize: 16 }}></i>
      <div className="flex-grow-1 text-truncate">
        <div
          className="text-truncate"
          style={{ fontWeight: 500, maxWidth: "100%" }}
        >
          {value}
        </div>
        <div style={{ fontSize: "0.75rem" }}>{label}</div>
      </div>
    </div>
  );
}
