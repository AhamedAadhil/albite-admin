"use client";
import React from "react";
import { Card } from "react-bootstrap";

export default function UserReviews({ reviews }: { reviews: any[] }) {
  if (!reviews?.length) return <p>No reviews submitted by this user.</p>;

  return (
    <div>
      <h5 className="mb-3">User Reviews</h5>
      {reviews.map((review) => (
        <Card key={review._id} className="mb-3">
          <Card.Body>
            <Card.Title className="fs-6">{review.product?.name}</Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              Rating: {review.rating} ★
            </Card.Subtitle>
            <Card.Text>{review.comment}</Card.Text>
            <small className="text-muted">
              {new Date(review.createdAt).toLocaleString()}
            </small>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
