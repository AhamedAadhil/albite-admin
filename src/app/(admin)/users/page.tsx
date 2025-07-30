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

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  }, [q, region, isVerified, isActive, hasCart]);

  // Sync filters in URL (optional but good UX)
  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (region) params.set("region", region);
    if (isVerified) params.set("isVerified", isVerified);
    if (isActive) params.set("isActive", isActive);
    if (hasCart) params.set("hasCart", hasCart);

    router.push(`?${params.toString()}`);
  };

  return (
    <Container fluid>
      <h4 className="fw-bold mt-4 mb-3">
        {" "}
        <i className="ri-user-line me-2"></i> Users ({users.length})
      </h4>

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
