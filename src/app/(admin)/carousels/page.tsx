"use client";

import React, { useEffect, useState } from "react";
import CarouselCard from "./CarouselCard";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { ICarousel } from "@/models/carousel";
import { toBase64 } from "@/helper/toBase64";

export default function CarouselPage() {
  const [carousels, setCarousels] = useState<ICarousel[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [newCarousel, setNewCarousel] = useState({
    title: "",
    link: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [creating, setCreating] = useState(false);

  const fetchCarousels = async () => {
    try {
      const res = await fetch("/api/protected/carousels");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch carousels");
      setCarousels(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/protected/carousels", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carouselId: id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCarousels(data.data);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCreateCarousel = async () => {
    try {
      setCreating(true);
      if (!newCarousel.title || !newCarousel.link || !imageFile) {
        alert("All fields required");
        return;
      }

      const base64Image = await toBase64(imageFile);

      const res = await fetch("/api/protected/carousels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newCarousel,
          image: base64Image,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setCarousels((prev) => [data.data, ...prev]);
      setShowModal(false);
      setNewCarousel({ title: "", link: "", image: "" });
      setImageFile(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    fetchCarousels();
  }, []);

  {
    carousels.length === 0 && !loading && !error && (
      <Alert variant="info">
        No carousels found. Create one to get started!
      </Alert>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">
          <i className="ri-gallery-fill me-2"></i> Carousels ({carousels.length}
          ){/* <small className="text-muted">({carousels.length})</small> */}
        </h4>
        <Button onClick={() => setShowModal(true)}>+ Create Carousel</Button>
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row className="g-3">
          {carousels.map((carousel: any) => (
            <Col key={carousel._id} xs={12} sm={6} md={4} lg={3}>
              <CarouselCard {...carousel} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      )}

      {/* Create Carousel Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Carousel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="banner title"
                value={newCarousel.title}
                onChange={(e) =>
                  setNewCarousel({ ...newCarousel, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://albite.lk"
                value={newCarousel.link}
                onChange={(e) =>
                  setNewCarousel({ ...newCarousel, link: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image (W:1500xH:1000 dimensions)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImageFile(
                    (e.target as HTMLInputElement).files?.[0] || null
                  )
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateCarousel}
            disabled={creating}
          >
            {creating ? "Creating..." : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
