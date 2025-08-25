"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import SpecialOrderCard from "./SpecialOrderCard";
import { ISpecialOrder } from "@/models/specialOrder";

const SpecialOrdersPage = () => {
  const [specialOrders, setSpecialOrders] = useState<ISpecialOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch special orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/protected/special-orders");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
      setSpecialOrders(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Mark an order as read
  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/protected/special-orders/${id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("Order marked as read successfully!");
      // Update state to reflect change
      setSpecialOrders((prev: any) =>
        prev.map((order: any) =>
          order._id === id ? { ...order, isRead: true } : order
        )
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const unreadCount = specialOrders.filter((o) => !o.isRead).length;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">
          <i className="ri-star-line me-2"></i> Special Orders (
          {specialOrders.length} total, {unreadCount} new)
        </h4>
        <Button variant="outline-primary" onClick={fetchOrders}>
          <i className="ri-refresh-line me-1" /> Refresh
        </Button>
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : specialOrders.length === 0 ? (
        <Alert variant="info">No special orders found.</Alert>
      ) : (
        <Row className="g-3">
          {specialOrders.map((order) => (
            <Col key={String(order._id)} xs={12} sm={6} md={4} lg={3}>
              <SpecialOrderCard order={order} onMarkAsRead={handleMarkAsRead} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SpecialOrdersPage;
