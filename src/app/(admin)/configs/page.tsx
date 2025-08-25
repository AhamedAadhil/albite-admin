"use client";

import React, { useEffect, useState } from "react";
import { Alert, Form, Row, Col, Button } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";

interface SettingsForm {
  [key: string]: string | number;
}

const defaultKeys = [
  "AKKARAIPATTU_DELIVERY_FEE",
  "PALAMUNAI_DELIVERY_FEE",
  "ADDALAICHENAI_DELIVERY_FEE",
  "SAGAMAM_DELIVERY_FEE",
  "KUDIYIRUPPU_DELIVERY_FEE",
  "POINTS_PER_RUPEE",
];

const ConfigPage = () => {
  const [settings, setSettings] = useState<SettingsForm>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      try {
        const res = await Promise.all(
          defaultKeys.map(async (key) => {
            const response = await fetch(`/api/protected/settings/${key}`);
            if (response.ok) {
              const data = await response.json();
              return { key, value: data.value };
            }
            // Fallback default values in case not found in DB
            const fallbackValues: SettingsForm = {
              AKKARAIPATTU_DELIVERY_FEE: 0,
              PALAMUNAI_DELIVERY_FEE: 150,
              ADDALAICHENAI_DELIVERY_FEE: 100,
              SAGAMAM_DELIVERY_FEE: 100,
              KUDIYIRUPPU_DELIVERY_FEE: 100,
              POINTS_PER_RUPEE: 0.0005,
            };
            return { key, value: fallbackValues[key] };
          })
        );

        const loadedSettings: SettingsForm = {};
        res.forEach(({ key, value }) => {
          loadedSettings[key] = value;
        });
        setSettings(loadedSettings);
      } catch (error) {
        console.error("Failed to fetch settings", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const body = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
      }));
      await fetch("/api/protected/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setMessage("Settings updated successfully");
    } catch (error) {
      setMessage("Failed to update settings");
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container className="py-4">
      <h4 className="mb-4">Configurations</h4>
      {message && (
        <Alert
          variant={message.includes("successfully") ? "success" : "danger"}
        >
          {message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          {Object.entries(settings).map(([key, value]) => (
            <Col key={key} xs={12} md={6}>
              <Form.Group controlId={key}>
                <Form.Label>{key.replace(/_/g, " ")}</Form.Label>
                <Form.Control
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          ))}
        </Row>
        <Button className="mt-4" variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default ConfigPage;
