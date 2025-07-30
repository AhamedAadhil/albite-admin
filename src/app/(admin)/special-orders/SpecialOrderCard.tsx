"use client";

import React from "react";
import { Card, Badge, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ISpecialOrder } from "@/models/specialOrder";
import dayjs from "dayjs";
import { formatRelativeDate } from "@/helper/formatRelativeDate";

interface Props {
  order: ISpecialOrder;
  onMarkAsRead?: (id: string) => void;
}

export default function SpecialOrderCard({ order, onMarkAsRead }: Props) {
  return (
    <Card className="shadow-sm h-100 border-0" style={{ borderRadius: 12 }}>
      <Card.Body>
        {/* Header: Name + Date */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 className="mb-0 text-truncate">{order.name}</h5>
            <small className="text-muted">
              <i className="ri-time-line me-1"></i>
              {dayjs(order.createdAt).format("MMM D, YYYY h:mm A")}
            </small>
          </div>
          <Badge bg={order.isRead ? "secondary" : "success"}>
            {order.isRead ? "Read" : "New"}
          </Badge>
        </div>

        {/* Contact Info */}
        <p className="mb-1 small text-muted">
          <i className="ri-phone-line me-1 text-primary"></i>
          {order.phone}
        </p>

        {/* Date & Time */}
        {order.date && (
          <p className="mb-1 small text-muted">
            <i className="ri-calendar-line me-1 text-primary"></i>
            {dayjs(order.date).format("MMM D, YYYY")}{" "}
            {order.time && (
              <>
                at <i className="ri-time-line me-1 text-primary"></i>
                {order.time}
              </>
            )}
          </p>
        )}

        {/* Guests */}
        {order.guests && (
          <p className="mb-1 small text-muted">
            <i className="ri-user-3-line me-1 text-primary"></i>
            {order.guests} Guests
          </p>
        )}

        {/* Meal Type & Event */}
        <div className="d-flex flex-wrap gap-2 mb-2">
          {order.mealType && (
            <Badge pill bg="info">
              <i className="ri-restaurant-line me-1"></i>
              {order.mealType}
            </Badge>
          )}
          {order.eventType && (
            <Badge pill bg="warning" text="dark">
              <i className="ri-calendar-event-line me-1"></i>
              {order.eventType}
            </Badge>
          )}
        </div>

        {/* Address */}
        {order.address && (
          <p className="mb-2 small text-muted">
            <i className="ri-map-pin-line me-1 text-primary"></i>
            {order.address}
          </p>
        )}

        {/* Note */}
        <p className="mb-3">
          <strong>Note:</strong>
          <br />
          {order.note}
        </p>

        {/* Mark as Read Button */}
        {!order.isRead && onMarkAsRead && (
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onMarkAsRead(order._id!.toString())}
          >
            <i className="ri-eye-line me-1"></i> Mark as Read
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
