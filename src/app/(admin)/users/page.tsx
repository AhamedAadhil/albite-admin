"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
  Button,
} from "react-bootstrap";
import { useSearchParams, useRouter } from "next/navigation";
import UserCard from "./UserCard";
import { IUser } from "@/models/user";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showDormant, setShowDormant] = useState(false);
  const [dormantDays, setDormantDays] = useState(60);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Form state
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [region, setRegion] = useState(searchParams.get("region") || "");
  const [isVerified, setIsVerified] = useState(
    searchParams.get("isVerified") || ""
  );
  const [isActive, setIsActive] = useState(searchParams.get("isActive") || "");
  const [hasCart, setHasCart] = useState(searchParams.get("hasCart") || "");

  async function handlePrintUsers() {
    const usersHtml = users
      .map(
        (user, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>${user.name || "N/A"}</td>
          <td>${user.email || "N/A"}</td>
          <td>${user.mobile || "N/A"}</td>
          <td>${user.region || "N/A"}</td>
          <td>${user.isVerified ? "✅" : "❌"}</td>
          <td>${user.isActive ? "Active" : "Inactive"}</td>
          <td>${user.hasCart ? "Yes" : "No"}</td>
        </tr>`
      )
      .join("");

    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
    <html>
      <head>
        <title>Users List</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 12px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            font-size: 14px;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 6px;
            text-align: left;
          }
          th {
            background: #f8f9fa;
          }
          h2 {
            margin-bottom: 16px;
          }
        </style>
      </head>
      <body>
        <h2>Users Report (${users.length} Users)</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Region</th>
              <th>Verified</th>
              <th>Status</th>
              <th>Has Cart</th>
            </tr>
          </thead>
          <tbody>
            ${usersHtml}
          </tbody>
        </table>
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  async function handleExportExcelUsers() {
    const exportData = users.map((user, idx) => ({
      "#": idx + 1,
      Name: user.name || "N/A",
      Email: user.email || "N/A",
      Mobile: user.mobile || "N/A",
      Region: user.region || "N/A",
      Verified: user.isVerified ? "Yes" : "No",
      Status: user.isActive ? "Active" : "Inactive",
      "Has Cart": user.hasCart ? "Yes" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(data, "users.xlsx");
  }

  // Fetch users with filters
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (q) params.append("q", q);
      if (region) params.append("region", region);
      if (isVerified) params.append("isVerified", isVerified);
      if (isActive) params.append("isActive", isActive);
      if (hasCart) params.append("hasCart", hasCart);

      if (showDormant) {
        params.append("dormantDays", dormantDays.toString());
      }

      const res = await fetch(`/api/protected/users?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch users");
      setUsers(data.users);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Run on mount or when filters change
  useEffect(() => {
    fetchUsers();
  }, [q, region, isVerified, isActive, hasCart, showDormant, dormantDays]);

  // Sync filters in URL (optional but good UX)
  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (region) params.set("region", region);
    if (isVerified) params.set("isVerified", isVerified);
    if (isActive) params.set("isActive", isActive);
    if (hasCart) params.set("hasCart", hasCart);
    if (showDormant) params.set("dormantDays", dormantDays.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h4 className="fw-bold mb-0">
          <i className="ri-user-line me-2"></i> Users ({users.length})
        </h4>

        <span className="text-muted d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-outline-success"
            aria-label="Export to Excel"
            onClick={handleExportExcelUsers}
          >
            <i className="ri-file-excel-2-line me-1"></i> Export Excel
          </button>
          <button
            type="button"
            className="btn  btn-outline-secondary"
            aria-label="Print Users List"
            onClick={handlePrintUsers}
          >
            <i className="ri-printer-line me-1"></i> Print
          </button>
        </span>
      </div>

      {/* Filters */}
      <Form onSubmit={applyFilters} className="mb-4">
        <Row className="g-2 align-items-end">
          <Col sm={4} md={3}>
            <Form.Label>Search (name, email, mobile)</Form.Label>
            <Form.Control
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search..."
            />
          </Col>

          <Col sm={4} md={3}>
            <Form.Label>Region</Form.Label>
            <Form.Control
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="eg. Akkaraipattu"
            />
          </Col>

          <Col sm={4} md={2}>
            <Form.Label>Verified</Form.Label>
            <Form.Select
              value={isVerified}
              onChange={(e) => setIsVerified(e.target.value)}
            >
              <option value="">All</option>
              <option value="true">Verified</option>
              <option value="false">Unverified</option>
            </Form.Select>
          </Col>
          <Col sm={4} md={2}>
            <Form.Label>Active</Form.Label>
            <Form.Select
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
            >
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Form.Select>
          </Col>
          {/* <Col sm={4} md={2}>
            <Form.Label>Active</Form.Label>
            <Form.Select
              value={isVerified}
              onChange={(e) => setIsVerified(e.target.value)}
            >
              <option value="">All</option>
              <option value="true">Verified</option>
              <option value="false">Unverified</option>
            </Form.Select>
          </Col> */}

          <Col sm={4} md={2}>
            <Form.Label>Has Cart</Form.Label>
            <Form.Select
              value={hasCart}
              onChange={(e) => setHasCart(e.target.value)}
            >
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
          </Col>

          {/* <Col sm={4} md={2}>
            <Button type="submit" className="w-100">
              Apply
            </Button>
          </Col> */}

          <Form.Group className="mb-3 d-flex align-items-center gap-3">
            <Form.Check
              type="checkbox"
              id="dormantFilter"
              label="Show Dormant Users"
              checked={showDormant}
              onChange={(e) => {
                setShowDormant(e.target.checked);
                // setPage(1);
              }}
            />

            {showDormant && (
              <Form.Control
                type="number"
                min={1}
                max={365}
                value={dormantDays}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val > 0) setDormantDays(val);
                  // setPage(1);
                }}
                style={{ width: "100px" }}
                aria-label="Dormant days threshold"
                placeholder="Days"
              />
            )}
          </Form.Group>
        </Row>
      </Form>

      {/* Status */}
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : users.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {users.map((user) => (
            <Col key={user._id.toString()}>
              <UserCard user={user} onEdit={() => {}} />
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info" className="mt-4">
          No users found.
        </Alert>
      )}
    </Container>
  );
}
