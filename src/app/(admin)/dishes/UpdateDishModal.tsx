// components/UpdateDishModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  dishId: string | null;
}

export default function UpdateDishModal({ show, onHide, dishId }: Props) {
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    calories: "",
    servings: "",
    isRecommended: false,
    isNewDish: false,
    isPopular: false,
    mainCategory: "breakfast",
    availableBefore: "11:00",
    maxPreorderDays: 3,
    parcelOptions: ["box", "bag"],
    isActive: true,
  });

  useEffect(() => {
    const fetchDish = async () => {
      if (!dishId) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/protected/dishes/${dishId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setFormData({
          name: data.dish.name,
          description: data.dish.description,
          image: data.dish.image,
          price: data.dish.price,
          calories: data.dish.calories,
          servings: data.dish.servings,
          isRecommended: data.dish.isRecommended || false,
          isNewDish: data.dish.isNewDish || false,
          isPopular: data.dish.isPopular || false,
          mainCategory: data.dish.mainCategory,
          availableBefore: data.dish.availableBefore,
          maxPreorderDays: data.dish.maxPreorderDays,
          parcelOptions: data.dish.parcelOptions || [],
          isActive: data.dish.isActive,
        });
      } catch (err: any) {
        console.error("Failed to load dish", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (show) fetchDish();
  }, [dishId, show]);

  const handleChange = (e: any) => {
    const { name, type, value, checked, files } = e.target;

    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(files[0]);
      return;
    }

    if (name === "parcelOptions") {
      setFormData((prev) => {
        const newOptions = [...prev.parcelOptions];
        if (checked) {
          newOptions.push(value);
        } else {
          const index = newOptions.indexOf(value);
          if (index !== -1) newOptions.splice(index, 1);
        }
        return { ...prev, parcelOptions: newOptions };
      });
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      const res = await fetch(`/api/protected/dishes/${dishId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("Dish updated successfully!");
      onHide();
    } catch (error: any) {
      alert("Failed to update dish: " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Update Dish{formData.name ? ` - ${formData.name}` : ""}
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
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
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
                  style={{ maxWidth: "100px", borderRadius: "4px" }}
                />
              )}
            </Form.Group>

            <div className="d-flex gap-3 mb-3">
              <Form.Group className="flex-fill">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="flex-fill">
                <Form.Label>Calories</Form.Label>
                <Form.Control
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="flex-fill">
                <Form.Label>Servings</Form.Label>
                <Form.Control
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

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
              <Form.Label>Available Before</Form.Label>
              <Form.Control
                type="time"
                name="availableBefore"
                value={formData.availableBefore}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Max Preorder Days</Form.Label>
              <Form.Control
                type="number"
                name="maxPreorderDays"
                value={formData.maxPreorderDays}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Parcel Options</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Box"
                  name="parcelOptions"
                  value="box"
                  type="checkbox"
                  checked={formData.parcelOptions.includes("box")}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Bag"
                  name="parcelOptions"
                  value="bag"
                  type="checkbox"
                  checked={formData.parcelOptions.includes("bag")}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                label="Recommended"
                name="isRecommended"
                checked={formData.isRecommended}
                onChange={handleChange}
              />
              <Form.Check
                label="Popular"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
              />
              <Form.Check
                label="New Dish"
                name="isNewDish"
                checked={formData.isNewDish}
                onChange={handleChange}
              />
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
          {updating ? "Updating..." : "Update Dish"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
