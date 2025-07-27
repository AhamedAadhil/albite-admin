// components/DishCard.tsx
import React from "react";
import { Button } from "react-bootstrap";

interface DishCardProps {
  name: string;
  price: number;
  image: string;
  calories?: number;
  servings?: number;
  onEdit: () => void;
  onDelete: () => void;
}

export default function DishCard({
  name,
  price,
  image,
  calories,
  servings,
  onEdit,
  onDelete,
}: DishCardProps) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={image}
        className="card-img-top"
        alt={name}
        style={{ objectFit: "cover", height: "200px" }}
      />
      <div className="card-body">
        <h5 className="card-title text-truncate">{name}</h5>
        <p className="card-text mb-1">
          <strong>Price:</strong> Rs. {price}
        </p>
        {calories && (
          <p className="card-text mb-1">
            <strong>Calories:</strong> {calories} kcal
          </p>
        )}
        {servings && (
          <p className="card-text mb-3">
            <strong>Servings:</strong> {servings}
          </p>
        )}

        <div className="d-flex justify-content-between">
          <Button variant="outline-primary" size="sm" onClick={onEdit}>
            <i className="ri-edit-line"></i> Edit
          </Button>
          <Button variant="outline-danger" size="sm" onClick={onDelete}>
            <i className="ri-delete-bin-line"></i> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
