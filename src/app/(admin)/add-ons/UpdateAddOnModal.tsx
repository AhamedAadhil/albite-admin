"use client";

import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  addOnId: string | null;
}

export default function UpdateAddOnModal({ show, onHide, addOnId }: Props) {
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    mainCategory: "breakfast",
    isActive: true,
  });

  useEffect(() => {
    const fetchAddOn = async () => {
      if (!addOnId) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/protected/addons/${addOnId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setFormData({
          name: data.addOn.name,
          price: String(data.addOn.price),
          image: data.addOn.image,
          mainCategory: data.addOn.mainCategory,
          isActive: data.addOn.isActive,
        });
      } catch (err: any) {
        console.error("Failed to load add-on", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (show) fetchAddOn();
  }, [addOnId, show]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, type, value, checked, files } = e.target;

    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(files[0]);
      return;
    }

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      const res = await fetch(`/api/protected/addons/${addOnId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("Add-on updated successfully ✅");
      // ✅ Reset form
      setFormData({
        name: "",
        price: "",
        image: "",
        mainCategory: "breakfast",
        isActive: true,
      });

      onHide();
    } catch (error: any) {
      alert("Failed to update add-on: " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Update Add-on{formData.name ? ` - ${formData.name}` : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (Rs)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2"
                  style={{ maxWidth: "120px", borderRadius: "4px" }}
                />
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Main Category</Form.Label>
              <Form.Select
                name="mainCategory"
                value={formData.mainCategory}
                onChange={handleChange}
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                label="Active"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate} disabled={updating}>
          {updating ? "Updating..." : "Update Add-on"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
