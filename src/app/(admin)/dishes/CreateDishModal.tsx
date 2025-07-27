"use client";

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

    let imageUrl = "";

    if (imageFile) {
      setUploading(true);

      const formDataImage = new FormData();
      formDataImage.append("file", imageFile);
      formDataImage.append("upload_preset", "your_upload_preset");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          {
            method: "POST",
            body: formDataImage,
          }
        );

        const data = await res.json();
        imageUrl = data.secure_url;
      } catch (error) {
        console.error("Image upload failed", error);
        setUploading(false);
        return;
      }

      setUploading(false);
    }

    const dishData = {
      ...formData,
      image: imageUrl,
    };

    console.log("Submit dish:", dishData);
    // Optionally call your backend API here

    onHide();
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
          <Button variant="primary" type="submit">
            <i className="ri-save-3-line me-1"></i>Save Dish
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
