"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import AddOnCard from "./AddOnCard";
import CreateAddOnModal from "./CreateAddOnModal";
import UpdateAddOnModal from "./UpdateAddOnModal";
import { Addon } from "@/types/addon";
import { set } from "mongoose";

export default function AddOnsPage() {
  const [addons, setAddOns] = useState<Addon[]>([]); // ✅ hold add-ons data
  const [showCreateModal, setShowCreateModal] = useState(false); // ✅ for create modal
  const [showUpdateModal, setShowUpdateModal] = useState(false); // ✅ for update modal
  const [editAddOnId, setEditAddOnId] = useState<string | null>(null); // ✅ hold id
  const [loading, setLoading] = useState(true); // ✅ loading state

  const fetchAddOns = async () => {
    try {
      setLoading(true); // ✅ set loading to true
      const res = await fetch("/api/protected/addons");
      const data = await res.json();
      if (!res.ok) {
        setLoading(false); // ✅ set loading to false on error
        throw new Error(data.message);
      }
      setAddOns(data.addons);
      setLoading(false); // ✅ set loading to false after fetching
    } catch (err: any) {
      setLoading(false); // ✅ set loading to false on error
      console.error("Failed to load add-ons", err.message);
    }
  };

  useEffect(() => {
    fetchAddOns();
  }, []);

  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const filteredAddOns = categoryFilter
    ? addons.filter((a) => a.mainCategory === categoryFilter)
    : addons;

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleEditClick = (id: string) => {
    setEditAddOnId(id);
    setShowUpdateModal(true);
  };

  return (
    <Container fluid className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">
          <i className="ri-add-circle-line me-2"></i>Add-ons (
          {filteredAddOns?.length})
        </h4>
        <Button variant="success" onClick={handleCreateClick}>
          <i className="ri-add-line"></i> Create New Add-on
        </Button>

        {/* CREATE MODAL */}
        <CreateAddOnModal
          show={showCreateModal}
          onHide={() => {
            setShowCreateModal(false);
            fetchAddOns();
          }}
          existingAddOn={null}
        />

        {/* UPDATE MODAL */}
        <UpdateAddOnModal
          show={showUpdateModal}
          onHide={() => {
            setShowUpdateModal(false);
            setEditAddOnId(null);
            fetchAddOns();
          }}
          addOnId={editAddOnId}
        />
      </div>

      <Form className="mb-4" style={{ maxWidth: 250 }}>
        <Form.Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </Form.Select>
      </Form>

      {loading && (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredAddOns?.map((addon) => (
          <Col key={addon._id}>
            <AddOnCard
              {...addon}
              onEdit={() => handleEditClick(addon._id)} // ✅ open edit modal
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
