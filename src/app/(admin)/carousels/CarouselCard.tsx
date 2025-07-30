import React from "react";
import { Card, Button } from "react-bootstrap";

interface Props {
  _id: string;
  title: string;
  image: string;
  link: string;
  onDelete: (id: string) => void;
}

export default function CarouselCard({
  _id,
  title,
  image,
  link,
  onDelete,
}: Props) {
  return (
    <Card className="shadow-sm h-100">
      <Card.Img
        variant="top"
        src={image}
        style={{ height: 140, objectFit: "cover", borderRadius: "8px 8px 0 0" }}
      />
      <Card.Body>
        <Card.Title className="text-truncate" title={title}>
          {title}
        </Card.Title>
        <Card.Text className="small text-muted text-truncate" title={link}>
          {link}
        </Card.Text>
        <Button variant="danger" size="sm" onClick={() => onDelete(_id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}
