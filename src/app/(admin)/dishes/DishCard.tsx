import React from "react";
import { Badge, Button } from "react-bootstrap";

interface DishCardProps {
  name: string;
  price: number;
  image: string;
  calories?: number;
  servings?: number;
  isRecommended?: boolean;
  isNewDish?: boolean;
  isPopular?: boolean;
  isActive: boolean;
  averageRating?: number;
  totalOrders?: number;
  mainCategory: "breakfast" | "lunch" | "dinner";
  availableBefore: string;
  maxPreorderDays: number;
  onEdit: () => void;
}

export default function DishCard({
  name,
  price,
  image,
  calories,
  servings,
  isRecommended,
  isNewDish,
  isPopular,
  isActive,
  averageRating = 0,
  totalOrders = 0,
  mainCategory,
  availableBefore,
  maxPreorderDays,
  onEdit,
}: DishCardProps) {
  return (
    <div className="card h-100 shadow rounded-4 overflow-hidden border-0">
      {/* Dish Image */}
      <div className="position-relative">
        <img
          src={image}
          alt={name}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />

        {/* Status Badges */}
        <div className="position-absolute top-0 start-0 m-2 d-flex flex-wrap gap-1">
          {isNewDish && <Badge bg="success">New</Badge>}
          {isPopular && (
            <Badge bg="warning" text="dark">
              Popular
            </Badge>
          )}
          {isRecommended && <Badge bg="info">Recommended</Badge>}
        </div>

        {/* Active status icon */}
        <div className="position-absolute top-0 end-0 m-2">
          {isActive ? (
            <i
              className="ri-checkbox-circle-fill text-success fs-4"
              title="Active"
            ></i>
          ) : (
            <i
              className="ri-close-circle-fill text-secondary fs-4"
              title="Inactive"
            ></i>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        <h5 className="card-title fw-semibold text-truncate">{name}</h5>

        <p className="mb-1 text-muted small">
          <i className="ri-price-tag-3-line me-1"></i>Rs. {price.toFixed(2)}
        </p>

        <div className="d-flex flex-wrap justify-content-between small text-muted">
          {calories !== undefined && (
            <span>
              <i className="ri-fire-line me-1"></i>
              {calories} kcal
            </span>
          )}
          {servings !== undefined && (
            <span>
              <i className="ri-user-line me-1"></i>
              {servings} servings
            </span>
          )}
          <span>
            <i className="ri-star-line me-1"></i>
            {averageRating.toFixed(1)}
          </span>
          <span>
            <i className="ri-shopping-bag-line me-1"></i>
            {totalOrders} orders
          </span>
        </div>

        <div className="d-flex flex-wrap justify-content-between mt-2 small text-muted">
          <span>
            <i className="ri-restaurant-line me-1"></i>
            {mainCategory}
          </span>
          <span>
            <i className="ri-time-line me-1"></i>
            Before {availableBefore}
          </span>
          <span>
            <i className="ri-calendar-check-line me-1"></i>
            Preorder: {maxPreorderDays}d
          </span>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="outline-primary" size="sm" onClick={onEdit}>
            <i className="ri-edit-line me-1"></i>Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
