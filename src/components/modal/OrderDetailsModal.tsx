import { formatDateTime } from "@/helper/formatDateTime";
import React, { useEffect, useState } from "react";
import { RejectionReasonModal } from "./RejectionReasonModal";

type DishInfo = {
  dish: any;
  _id: string;
  name: string;
  price: number;
  packageType: string;
  quantity: number;
};

type AddonInfo = {
  addon: any;
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  rejectionReason: string;
  isPrepared: React.JSX.Element;
  preparedTime: string | Date;
  isDelivered: React.JSX.Element;
  deliveredTime: string | Date;
  isRejected: React.JSX.Element;
  rejectedTime: string | Date;
  isAccepted: React.JSX.Element;
  acceptedTime: string | Date;
  isAccpted: boolean;
  _id: string;
  orderId: string;
  userId: { name: string; email: string; mobile: string } | string;
  deliveryRegion: string;
  deliveryMethod: string;
  status: string;
  placedTime: string | Date;
  total: number;
  dishes: DishInfo[];
  addons: AddonInfo[];
  deliveryNote?: string;
  cancellationReason?: string;
  cancelledTime?: string | Date;
  usedPoints?: number;
  earnedPoints?: number;
};

type OrderDetailsModalProps = {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onStatusChange: (
    orderId: string,
    newStatus: string,
    cancellationReason: string
  ) => Promise<void>;
};

const statusOptions = [
  "placed",
  "accepted",
  "prepared",
  "delivered",
  "rejected",
];

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  order,
  onClose,
  onStatusChange,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(order?.status || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New rejection modal state and reason holder
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [tempRejectionReason, setTempRejectionReason] = useState("");

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
      setError(null);
      setTempRejectionReason("");
      setShowRejectModal(false);
    }
  }, [order]);

  const saveStatusWithReason = async (reason: string) => {
    setShowRejectModal(false);
    setSaving(true);
    setError(null);
    try {
      await onStatusChange(order!._id, selectedStatus, reason);
      onClose();
    } catch (e: any) {
      setError(e.message || "Failed to update status.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveClick = async () => {
    if (selectedStatus === order?.status) {
      onClose();
      return;
    }
    if (selectedStatus === "rejected") {
      // Open rejection modal instead of saving immediately
      setShowRejectModal(true);
    } else {
      setSaving(true);
      setError(null);
      try {
        await onStatusChange(order!._id, selectedStatus, "");
        onClose();
      } catch (e: any) {
        setError(e.message || "Failed to update status.");
      } finally {
        setSaving(false);
      }
    }
  };

  if (!isOpen || !order) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
        padding: 20,
      }}
    >
      <div
        role="document"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 32,
          maxWidth: 620,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <h2
          id="modal-title"
          style={{
            marginTop: 0,
            marginBottom: 12,
            fontWeight: 700,
            fontSize: 24,
          }}
        >
          Order Details - {order.orderId}
        </h2>

        {/* Delivery Note */}
        {order.deliveryNote && (
          <section
            style={{
              backgroundColor: "#FEF3C7",
              borderLeft: "6px solid #FBBF24",
              padding: "16px 20px",
              borderRadius: 8,
              fontWeight: 600,
              color: "#92400E",
              whiteSpace: "pre-wrap",
            }}
            aria-label="Delivery Note"
          >
            <strong>Delivery Note:</strong>
            <p style={{ marginTop: 6 }}>{order.deliveryNote}</p>
          </section>
        )}

        {/* Cancellation Info */}
        {order.status === "cancelled" && (
          <section
            aria-label="Cancellation Information"
            style={{
              backgroundColor: "#FEE2E2",
              borderRadius: 8,
              padding: 18,
              fontWeight: 600,
              color: "#991B1B",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 10, fontSize: 20 }}>
              Cancellation Info
            </h3>
            <p>
              <strong>Cancelled At: </strong>
              {formatDateTime(order.cancelledTime!)}
            </p>
            <p>
              <strong>Reason: </strong>
              {order.cancellationReason || "No reason provided"}
            </p>
          </section>
        )}

        {/* Rejection Info */}
        {order.status === "rejected" && (
          <section
            aria-label="Rejection Information"
            style={{
              backgroundColor: "#FEE2E2",
              borderRadius: 8,
              padding: 18,
              fontWeight: 600,
              color: "#991B1B",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 10, fontSize: 20 }}>
              Rejection Info
            </h3>
            <p>
              <strong>Rejected At: </strong>
              {formatDateTime(order.rejectedTime!)}
            </p>
            <p>
              <strong>Reason: </strong>
              {order.rejectionReason || "No reason provided"}
            </p>
          </section>
        )}

        {/* User & Delivery Info */}
        <section aria-label="User and Delivery Information">
          <h3 style={{ marginBottom: 12, fontWeight: 600, fontSize: 20 }}>
            User & Delivery Info
          </h3>
          <div style={{ lineHeight: 1.8, fontSize: 15, color: "#222" }}>
            <p>
              <strong>User:</strong>{" "}
              {typeof order.userId === "string"
                ? order.userId
                : order.userId?.name || order.userId?.email || "N/A"}
            </p>
            <p>
              <strong>Contact Number:</strong>{" "}
              {typeof order.userId === "object" &&
              order.userId !== null &&
              "mobile" in order.userId
                ? order.userId.mobile
                : "N/A"}
            </p>
            <p>
              <strong>Delivery Region:</strong> {order.deliveryRegion}
            </p>
            <p>
              <strong>Delivery Method:</strong> {order.deliveryMethod}
            </p>
            <p>
              <strong>Placed Time:</strong> {formatDateTime(order.placedTime)}
            </p>

            {order.isAccepted && (
              <p>
                <strong>Accepted Time:</strong>{" "}
                {formatDateTime(order.acceptedTime)}
              </p>
            )}
            {order.isPrepared && (
              <p>
                <strong>Prepared Time:</strong>{" "}
                {formatDateTime(order.preparedTime)}
              </p>
            )}
            {order.isDelivered && (
              <p>
                <strong>Delivered Time:</strong>{" "}
                {formatDateTime(order.deliveredTime)}
              </p>
            )}
            {order.isRejected && (
              <p>
                <strong>Rejected Time:</strong>{" "}
                {formatDateTime(order.rejectedTime)}
              </p>
            )}
          </div>
        </section>

        {/* Dishes and Addons */}
        <section aria-label="Ordered Dishes and Addons">
          <h3 style={{ marginBottom: 12, fontWeight: 600, fontSize: 20 }}>
            Dishes & Addons
          </h3>
          <div style={{ fontSize: 15, color: "#222" }}>
            <p>
              <strong>Dishes:</strong>
            </p>
            <ul style={{ paddingLeft: 24, marginTop: 6, marginBottom: 12 }}>
              {order.dishes.map((dish) => (
                <li key={dish._id} style={{ marginBottom: 4 }}>
                  {dish.dish.name} ({dish.packageType}) - {dish.quantity} × Rs.{" "}
                  {dish.dish.price.toFixed(2)}
                </li>
              ))}
            </ul>

            <p>
              <strong>Addons:</strong>
            </p>
            {order.addons.length === 0 ? (
              <p style={{ marginTop: 6 }}>None</p>
            ) : (
              <ul style={{ paddingLeft: 24, marginTop: 6 }}>
                {order.addons.map((addon) => (
                  <li key={addon._id} style={{ marginBottom: 4 }}>
                    {addon.addon.name} - {addon.quantity} × Rs.{" "}
                    {addon.addon.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Points & Total */}
        <section aria-label="Points and Total Payment">
          <h3 style={{ marginBottom: 12, fontWeight: 600, fontSize: 20 }}>
            Points & Total
          </h3>
          <div
            style={{
              lineHeight: 1.8,
              fontSize: 15,
              color: "#222",
              fontWeight: 500,
            }}
          >
            <p>
              <strong>Points Used (Discount):</strong> {order.usedPoints ?? 0}
            </p>
            <p>
              <strong>Points Earned:</strong> {order.earnedPoints ?? 0}
            </p>
            <p style={{ marginTop: 8, fontWeight: 700 }}>
              <strong>Total to Pay:</strong> Rs. {order.total.toFixed(2)}
            </p>
          </div>
        </section>

        {/* Status Change Dropdown */}
        {order.status !== "cancelled" && (
          <section style={{ alignSelf: "flex-start" }}>
            <label
              htmlFor="status-select"
              style={{ fontWeight: 600, fontSize: 16, userSelect: "none" }}
            >
              Change Status:
            </label>
            <select
              id="status-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                marginLeft: 12,
                padding: 8,
                fontSize: 16,
                minWidth: 200,
                borderRadius: 6,
                border: "1px solid #ccc",
                cursor: saving ? "not-allowed" : "pointer",
              }}
              disabled={saving}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </section>
        )}

        {error && (
          <div
            style={{
              marginTop: 16,
              color: "red",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            {error}
          </div>
        )}

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 16,
            marginTop: 8,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 18px",
              backgroundColor: "#ccc",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 15,
              minWidth: 100,
            }}
            disabled={saving}
          >
            Cancel
          </button>
          {order.status !== "cancelled" && (
            <button
              onClick={handleSaveClick}
              disabled={saving}
              style={{
                padding: "10px 18px",
                backgroundColor: saving ? "#9c1b1b" : "#FA5555",
                border: "none",
                borderRadius: 8,
                color: "white",
                fontWeight: 700,
                fontSize: 15,
                minWidth: 100,
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              {saving ? "Saving..." : "Save Status"}
            </button>
          )}
        </div>

        {/* RejectionReasonModal */}
        <RejectionReasonModal
          isOpen={showRejectModal}
          initialReason={tempRejectionReason}
          onCancel={() => setShowRejectModal(false)}
          onSubmit={(reason) => saveStatusWithReason(reason)}
        />
      </div>
    </div>
  );
};
