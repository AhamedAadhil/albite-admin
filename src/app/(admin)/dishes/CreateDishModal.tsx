"use client";

import { toBase64 } from "@/helper/toBase64";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

export default function CreateDishModal({ show, onHide }: Props) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    calories: "",
    servings: "",
    mainCategory: "breakfast",
    availableBefore: "11:00",
    maxPreorderDays: 3,
    parcelOptions: ["box", "bag"],
    isRecommended: false,
    isNewDish: false,
    isPopular: false,
    isActive: true,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      if (target.name === "parcelOptions") {
        const newOptions = [...formData.parcelOptions];
        if (target.checked) {
          newOptions.push(target.value);
        } else {
          const index = newOptions.indexOf(target.value);
          if (index !== -1) newOptions.splice(index, 1);
        }
        setFormData((prev) => ({ ...prev, parcelOptions: newOptions }));
      } else {
        setFormData((prev) => ({ ...prev, [target.name]: target.checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required image file
    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    setUploading(true);

    let base64Image = "";

    try {
      base64Image = await toBase64(imageFile);
    } catch (error) {
      console.error("Failed to convert image:", error);
      setUploading(false);
      return;
    }

    // Build request body
    const dishPayload = {
      ...formData,
      price: Number(formData.price),
      calories: Number(formData.calories),
      servings: Number(formData.servings),
      maxPreorderDays: Number(formData.maxPreorderDays),
      image: base64Image,
    };

    try {
      const res = await fetch("/api/protected/create-dish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dishPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create dish");
        throw new Error(data.message || "Failed to create dish");
      }

      setFormData({
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
      setImageFile(null);

      alert("Dish created successfully ✅");
      onHide(); // Close modal
    } catch (error: any) {
      console.error("Submit error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Dish</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>

          {imageFile && (
            <div className="mb-3 text-center">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                style={{ maxHeight: "200px", objectFit: "contain" }}
                className="img-fluid"
              />
            </div>
          )}

          <div className="d-flex gap-3 mb-3">
            <Form.Group className="flex-fill">
              <Form.Label>Price (Rs)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="flex-fill">
              <Form.Label>Calories</Form.Label>
              <Form.Control
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="flex-fill">
              <Form.Label>Servings</Form.Label>
              <Form.Control
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                required
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
              label="Recommended Dish"
              name="isRecommended"
              checked={formData.isRecommended}
              onChange={handleChange}
            />
            <Form.Check
              label="New Dish"
              name="isNewDish"
              checked={formData.isNewDish}
              onChange={handleChange}
            />
            <Form.Check
              label="Popular Dish"
              name="isPopular"
              checked={formData.isPopular}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              label="Active"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={uploading}>
            {uploading ? (
              "Uploading..."
            ) : (
              <>
                <i className="ri-save-3-line me-1"></i>Save Dish
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
