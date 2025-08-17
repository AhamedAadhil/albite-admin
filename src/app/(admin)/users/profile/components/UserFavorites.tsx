"use client";
import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Image from "next/image";

export default function UserFavorites({ favorites }: { favorites: any[] }) {
  if (!favorites?.length) return <p>No favorite products found.</p>;

  return (
    <div>
      <h5 className="mb-3">Favorite Dishes</h5>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {favorites.map((item) => (
          <Col key={item._id}>
            <Card className="h-100">
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={250}
                className="card-img-top object-fit-cover"
                style={{ maxHeight: 180 }}
              />
              <Card.Body>
                <Card.Title className="fs-6">{item.name}</Card.Title>
                <Card.Text className="text-muted">Rs. {item.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
