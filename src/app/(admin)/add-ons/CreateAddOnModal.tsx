"use client";

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toBase64 } from "@/helper/toBase64";

interface Props {
  show: boolean;
  onHide: () => void;
  existingAddOn?: {
    _id: string;
    name: string;
    price: number;
    image: string;
    mainCategory: "breakfast" | "lunch" | "dinner";
    isActive: boolean;
  } | null;
}

export default function CreateAddOnModal({ show, onHide }: Props) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    mainCategory: "breakfast",
    isActive: true,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((prev) => ({ ...prev, [target.name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    const addOnPayload = {
      ...formData,
      price: Number(formData.price),
      image: base64Image,
    };

    try {
      const res = await fetch("/api/protected/create-addon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addOnPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create add-on");
        throw new Error(data.message || "Failed to create add-on");
      }

      alert("Add-on created successfully ✅");
      onHide();
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
        <Modal.Title>Create New Add-on</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Name */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Price */}
          <Form.Group className="mb-3">
            <Form.Label>Price (Rs)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min={0}
            />
          </Form.Group>

          {/* Image Upload */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </Form.Group>

          {/* Image Preview */}
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

          {/* Main Category */}
          <Form.Group className="mb-3">
            <Form.Label>Main Category</Form.Label>
            <Form.Select
              name="mainCategory"
              value={formData.mainCategory}
              onChange={handleChange}
              required
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </Form.Select>
          </Form.Group>

          {/* Is Active */}
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
          <Button variant="secondary" onClick={onHide} disabled={uploading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={uploading}>
            {uploading ? (
              "Uploading..."
            ) : (
              <>
                <i className="ri-save-3-line me-1"></i>Save Add-on
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
