"use client";

import { formatDateTime } from "@/helper/formatDateTime";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { OrderDetailsModal } from "@/components/modal/OrderDetailsModal";

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

const statusOptions = [
  "placed",
  "accepted",
  "prepared",
  "delivered",
  "cancelled",
  "rejected",
];

const OrdersPage: React.FC = () => {
  // States
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("placedTime");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | Date>(
    formatDateTime(new Date())
  );

  // Date filters state
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const openModalForOrder = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  // Callback to update status on backend and refresh
  const handleStatusChange = async (
    orderId: string,
    newStatus: string,
    rejectionReason: string
  ) => {
    console.log("handleStatusChange", orderId, newStatus, rejectionReason);
    const response = await fetch(`/api/protected/orders`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newStatus, orderId, rejectionReason }),
    });

    if (!response.ok) {
      throw new Error("Failed to update order status");
    }

    await fetchOrders();
  };

  // Build query string with all filters including dates
  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (statusFilter.length) params.append("status", statusFilter.join(","));
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    params.append("sortField", sortField);
    params.append("sortOrder", sortOrder);
    return params.toString();
  };

  // Fetch orders with filters from backend
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    setLastUpdate(formatDateTime(new Date()));

    try {
      const queryString = buildQueryString();
      const res = await fetch(`/api/protected/orders?${queryString}`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders || []);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [search, statusFilter, startDate, endDate, page, sortField, sortOrder]);

  // Toggle status filter helper
  const toggleStatusFilter = (status: string) => {
    setPage(1);
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter((s) => s !== status));
    } else {
      setStatusFilter([...statusFilter, status]);
    }
  };

  // Sorting toggle & icon
  const changeSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const SortIcon: React.FC<{ field: string }> = ({ field }) => {
    if (sortField !== field) return null;
    return (
      <i
        className={classNames(
          "ri-arrow-up-s-line",
          sortOrder === "desc" ? "ri-flip-v" : ""
        )}
        style={{
          marginLeft: 4,
          fontSize: 14,
          verticalAlign: "middle",
          color: "#007bff",
        }}
        aria-label={sortOrder === "asc" ? "ascending" : "descending"}
      />
    );
  };

  return (
    <div
      className="container mt-4"
      style={{
        maxWidth: 1200,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold m-0">
          <i className="ri-box-1-line me-2"></i> Orders Dashboard
        </h2>
        <span className="text-muted">
          <span>last update: {formatDateTime(lastUpdate)}</span>{" "}
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => fetchOrders()}
            aria-label="Refresh orders list"
          >
            <i className="ri-refresh-line me-1" /> Refresh
          </button>
        </span>
      </div>

      {/* Search input */}
      <div className="mb-3" style={{ maxWidth: 400 }}>
        <input
          type="text"
          placeholder="Search by Order ID or Delivery Region"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="form-control"
          style={{ fontSize: 16 }}
        />
      </div>

      {/* Status filters */}
      <div className="mb-4">
        <strong className="me-3" style={{ fontWeight: 600 }}>
          Status Filter:
        </strong>
        {statusOptions.map((status) => (
          <div
            className="form-check form-check-inline"
            key={status}
            style={{ fontSize: 16 }}
          >
            <input
              className="form-check-input"
              type="checkbox"
              id={`status-${status}`}
              checked={statusFilter.includes(status)}
              onChange={() => toggleStatusFilter(status)}
            />
            <label
              className="form-check-label"
              htmlFor={`status-${status}`}
              style={{ textTransform: "capitalize", userSelect: "none" }}
            >
              {status}
            </label>
          </div>
        ))}
      </div>

      {/* Date Filters */}
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        <label>
          Start Date:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setPage(1); // reset pagination on filter change
            }}
          />
        </label>

        <label>
          End Date:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setPage(1);
            }}
          />
        </label>

        <button
          type="button"
          onClick={() => {
            setStartDate("");
            setEndDate("");
            setPage(1);
          }}
        >
          Clear Dates
        </button>
      </div>

      {/* Orders Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th
                role="button"
                onClick={() => changeSort("orderId")}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  fontWeight: 600,
                }}
                scope="col"
              >
                Order ID <SortIcon field="orderId" />
              </th>
              <th
                role="button"
                onClick={() => changeSort("userId")}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  fontWeight: 600,
                }}
                scope="col"
              >
                User <SortIcon field="userId" />
              </th>
              <th
                role="button"
                onClick={() => changeSort("deliveryRegion")}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  fontWeight: 600,
                }}
                scope="col"
              >
                Delivery Region <SortIcon field="deliveryRegion" />
              </th>
              <th
                role="button"
                onClick={() => changeSort("deliveryMethod")}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  fontWeight: 600,
                }}
                scope="col"
              >
                Method <SortIcon field="deliveryMethod" />
              </th>
              <th
                role="button"
                onClick={() => changeSort("status")}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  fontWeight: 600,
                }}
                scope="col"
              >
                Status <SortIcon field="status" />
              </th>
              <th
                role="button"
                onClick={() => changeSort("placedTime")}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  fontWeight: 600,
                  textAlign: "right",
                }}
                scope="col"
              >
                Placed Time <SortIcon field="placedTime" />
              </th>
              <th style={{ fontWeight: 600, textAlign: "right" }} scope="col">
                Total (Rs.)
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                    aria-label="Loading"
                  ></div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={8} className="text-center text-danger py-4">
                  {error}
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-muted">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td style={{ fontWeight: 500 }}>{order.orderId}</td>
                  <td>
                    {typeof order.userId === "string"
                      ? order.userId
                      : order.userId?.name || order.userId?.email || "N/A"}
                  </td>
                  <td>{order.deliveryRegion}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {order.deliveryMethod}
                  </td>
                  <td style={{ textTransform: "capitalize" }}>
                    {order.status}
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    {order.placedTime
                      ? formatDateTime(order.placedTime)
                      : "N/A"}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {order.total.toFixed(2)}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => openModalForOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          aria-label="Previous page"
        >
          Prev
        </button>

        <span className="align-middle" style={{ fontWeight: 600 }}>
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </div>

      <OrderDetailsModal
        isOpen={modalOpen}
        order={selectedOrder}
        onClose={closeModal}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default OrdersPage;
