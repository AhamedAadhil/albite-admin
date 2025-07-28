"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import AddOnCard from "./AddOnCard";
import CreateAddOnModal from "./CreateAddOnModal";

export default function AddOnsPage() {
  const [showAddOnModal, setShowAddOnModal] = useState(false);
  const [selectedAddOn, setSelectedAddOn] = useState<
    (typeof dummyAddOns)[0] | null
  >(null);

  const dummyAddOns = [
    {
      _id: "1",
      name: "Cheese Dip",
      price: 150,
      image: "/images/ketchup.jpg",
      mainCategory: "lunch" as "lunch",
      isActive: true,
    },
    {
      _id: "2",
      name: "Spicy Sauce",
      price: 100,
      image: "/images/leg.jpg",
      mainCategory: "dinner" as "dinner",
      isActive: false,
    },
    {
      _id: "3",
      name: "Ketchup Sachet",
      price: 50,
      image: "/images/ketchup.jpg",
      mainCategory: "breakfast" as "breakfast",
      isActive: true,
    },
  ];

  // State to hold selected category filter
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  // Filtered list based on categoryFilter
  const filteredAddOns = categoryFilter
    ? dummyAddOns.filter((a) => a.mainCategory === categoryFilter)
    : dummyAddOns;

  // Placeholder for create modal toggle or any create logic
  const handleCreateClick = () => {
    setSelectedAddOn(null); // clear any existing data
    setShowAddOnModal(true); // open modal
  };

  return (
    <Container fluid className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Add-ons ({filteredAddOns.length})</h4>
        <Button variant="success" onClick={handleCreateClick}>
          <i className="ri-add-line"></i> Create New Add-on
        </Button>
        <CreateAddOnModal
          show={showAddOnModal}
          onHide={() => {
            setShowAddOnModal(false);
            setSelectedAddOn(null);
          }}
          existingAddOn={selectedAddOn}
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

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredAddOns.map((addon) => (
          <Col key={addon._id}>
            <AddOnCard
              {...addon}
              onEdit={() => {
                setSelectedAddOn(addon);
                setShowAddOnModal(true);
              }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
