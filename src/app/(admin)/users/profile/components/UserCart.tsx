"use client";
import React from "react";
import { Table } from "react-bootstrap";
import Image from "next/image";

export default function UserCart({ cart }: { cart: any }) {
  if (!cart?.dishes?.length && !cart?.addons?.length)
    return <p>User's cart is empty.</p>;

  return (
    <div>
      <h5 className="mb-3">Dishes</h5>
      {cart.dishes?.length > 0 && (
        <Table bordered hover responsive className="mb-4">
          <thead>
            <tr>
              <th>Dish</th>
              <th>Qty</th>
              <th>Price (Each)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.dishes.map((item: any) => (
              <tr key={item._id || item.dish?._id}>
                <td className="d-flex align-items-center gap-2">
                  <Image
                    src={
                      item.dish?.image || "/placeholder/placeholder_dish.png"
                    }
                    alt={item.dish?.name || "Dish image"}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <span>{item.dish?.name || "Unnamed Dish"}</span>
                </td>
                <td>{item.quantity}</td>
                <td>Rs. {item.dish?.price || 0}</td>
                <td>Rs. {item.quantity * (item.dish?.price || 0)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {cart.addons?.length > 0 && (
        <>
          <h5 className="mb-3">Add-ons</h5>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Add-on</th>
                <th>Qty</th>
                <th>Price (Each)</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.addons.map((item: any) => (
                <tr key={item._id || item.addon?._id}>
                  <td className="d-flex align-items-center gap-2">
                    <Image
                      src={
                        item.addon?.image ||
                        "/placeholder/placeholder_addon.png"
                      }
                      alt={item.addon?.name || "Addon image"}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <span>{item.addon?.name || "Unnamed Add-on"}</span>
                  </td>
                  <td>{item.quantity}</td>
                  <td>Rs. {item.addon?.price || 0}</td>
                  <td>Rs. {item.quantity * (item.addon?.price || 0)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}
