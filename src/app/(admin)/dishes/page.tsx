// pages/dishes.tsx
"use client";

import React, { useState, useEffect } from "react";
import DishCard from "./DishCard";
import {
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
} from "react-bootstrap";
import CreateDishModal from "./CreateDishModal";
import UpdateDishModal from "./UpdateDishModal";
import { Dish } from "@/types/dish";

export default function DishesPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    isPopular: false,
    isNewDish: false,
    isRecommended: false,
    mainCategory: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedDishId, setSelectedDishId] = useState<string | null>(null);

  const toggleModal = () => setShowModal((prev: any) => !prev);

  // 1. Move outside so it can be reused
  const fetchDishes = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (filters.isPopular) query.append("isPopular", "true");
      if (filters.isNewDish) query.append("isNewDish", "true");
      if (filters.isRecommended) query.append("isRecommended", "true");
      if (filters.mainCategory)
        query.append("mainCategory", filters.mainCategory);

      const res = await fetch(`/api/protected/dishes?${query.toString()}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch dishes");

      setDishes(data.dishes);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes(); // call only once at initial load
  }, []);

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h4 className="fw-bold">
          <i className="ri-restaurant-2-line me-2"></i>Dishes ({dishes.length})
        </h4>
        <Button variant="success" onClick={toggleModal}>
          <i className="ri-add-line"></i> Create New Dish
        </Button>
        <CreateDishModal show={showModal} onHide={toggleModal} />
      </div>

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && dishes.length === 0 && (
        <p className="text-center">No dishes found.</p>
      )}

      <Form className="mb-4 d-flex flex-wrap gap-3 align-items-center">
        <Form.Check
          inline
          label="Popular"
          type="checkbox"
          checked={filters.isPopular}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, isPopular: e.target.checked }))
          }
        />
        <Form.Check
          inline
          label="Recommended"
          type="checkbox"
          checked={filters.isRecommended}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, isRecommended: e.target.checked }))
          }
        />
        <Form.Check
          inline
          label="New Dish"
          type="checkbox"
          checked={filters.isNewDish}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, isNewDish: e.target.checked }))
          }
        />
        <Form.Select
          style={{ width: "200px" }}
          value={filters.mainCategory}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, mainCategory: e.target.value }))
          }
        >
          <option value="">All Categories</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </Form.Select>
        <Button variant="outline-primary" size="sm" onClick={fetchDishes}>
          Apply Filters
        </Button>
      </Form>

      {loading && (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {dishes.map((dish) => (
          <Col key={dish._id}>
            <DishCard
              mainCategory={"breakfast"}
              availableBefore={""}
              maxPreorderDays={0}
              isActive={false}
              {...dish}
              onEdit={() => setSelectedDishId(dish._id)}
            />
          </Col>
        ))}
      </Row>
      <UpdateDishModal
        show={!!selectedDishId}
        onHide={() => {
          setSelectedDishId(null);
          fetchDishes();
        }}
        dishId={selectedDishId}
      />
    </Container>
  );
}
