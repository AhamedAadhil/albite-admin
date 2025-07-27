// pages/dishes.tsx
"use client";

import React, { useState } from "react";
import DishCard from "./DishCard";
import { Button, Container, Row, Col } from "react-bootstrap";
import CreateDishModal from "./CreateDishModal";

const mockDishes = [
  {
    name: "Chicken Biryani",
    price: 850,
    image: "/images/biryani.jpg",
    calories: 520,
    servings: 1,
  },
  {
    name: "Paneer Butter Masala",
    price: 720,
    image: "/images/biryani2.jpg",
    calories: 480,
    servings: 1,
  },
  {
    name: "Beef Kottu",
    price: 900,
    image: "/images/biryani.jpg",
    calories: 700,
    servings: 2,
  },
  {
    name: "Beef Kottu",
    price: 900,
    image: "/images/biryani2.jpg",
    calories: 700,
    servings: 2,
  },
  {
    name: "Beef Kottu",
    price: 900,
    image: "/images/biryani.jpg",
    calories: 700,
    servings: 2,
  },
  {
    name: "Beef Kottu",
    price: 900,
    image: "/images/biryani2.jpg",
    calories: 700,
    servings: 2,
  },
  {
    name: "Beef Kottu",
    price: 900,
    image: "/images/biryani.jpg",
    calories: 700,
    servings: 2,
  },
];

export default function DishesPage() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((prev: any) => !prev);

  //   const handleCreate = () => {
  //     // Navigate to dish creation page
  //     window.location.href = "/dishes/create";
  //   };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h4 className="fw-bold">Dishes</h4>
        <Button variant="success" onClick={toggleModal}>
          <i className="ri-add-line"></i> Create New Dish
        </Button>
        <CreateDishModal show={showModal} onHide={toggleModal} />
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {mockDishes.map((dish, index) => (
          <Col key={index}>
            <DishCard
              {...dish}
              onEdit={() => console.log("Edit", dish.name)}
              onDelete={() => console.log("Delete", dish.name)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
