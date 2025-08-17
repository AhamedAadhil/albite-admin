import React, { useState, useEffect } from "react";

type RejectionReasonModalProps = {
  isOpen: boolean;
  initialReason?: string;
  onCancel: () => void;
  onSubmit: (reason: string) => void;
};

export const RejectionReasonModal: React.FC<RejectionReasonModalProps> = ({
  isOpen,
  initialReason = "",
  onCancel,
  onSubmit,
}) => {
  const [reason, setReason] = useState(initialReason);
  useEffect(() => {
    if (isOpen) setReason(initialReason);
  }, [isOpen, initialReason]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 11000,
        padding: 20,
      }}
      onClick={onCancel}
    >
      <div
        role="document"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          borderRadius: 8,
          padding: 24,
          maxWidth: 400,
          width: "100%",
          boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <h3 style={{ margin: 0 }}>Rejection Reason</h3>
        <textarea
          autoFocus
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={5}
          style={{ width: "100%", padding: 8, fontSize: 16, borderRadius: 4 }}
          placeholder="Enter reason why the order is rejected (required)"
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button
            onClick={onCancel}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              backgroundColor: "#ccc",
              fontWeight: 600,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (reason.trim() === "") {
                alert("Rejection reason is required.");
                return;
              }
              onSubmit(reason.trim());
            }}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              backgroundColor: "#FA5555",
              color: "white",
              fontWeight: 600,
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
