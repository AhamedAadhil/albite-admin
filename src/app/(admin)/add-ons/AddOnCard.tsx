import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

interface AddOnCardProps {
  name: string;
  price: number;
  image: string;
  mainCategory: "breakfast" | "lunch" | "dinner";
  isActive: boolean;
  onEdit: () => void;
}

export default function AddOnCard({
  name,
  price,
  image,
  mainCategory,
  isActive,
  onEdit,
}: AddOnCardProps) {
  return (
    <Card className="h-100 shadow-sm position-relative">
      {/* Image + Active Badge */}
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={image}
          alt={name}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <Badge
          bg={isActive ? "success" : "secondary"}
          className="position-absolute top-0 end-0 m-2"
          pill
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Card Body */}
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="mb-1 text-truncate">{name}</Card.Title>
          <Card.Text className="mb-2 text-muted small">
            <i className="ri-restaurant-line me-1"></i>
            {mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1)}
          </Card.Text>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <h6 className="fw-bold mb-0">
            {" "}
            <i className="ri-price-tag-3-line me-1"></i>Rs. {price.toFixed(2)}
          </h6>
          <Button variant="outline-primary" size="sm" onClick={onEdit}>
            <i className="ri-edit-line me-1"></i>Edit
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
