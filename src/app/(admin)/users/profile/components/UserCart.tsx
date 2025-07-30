"use client";
import React from "react";
import { Table } from "react-bootstrap";
import Image from "next/image";

export default function UserCart({ cart }: { cart: any }) {
  if (!cart?.items?.length) return <p>User's cart is empty.</p>;

  return (
    <div>
      <h5 className="mb-3">Cart Items</h5>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price (Each)</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item: any) => (
            <tr key={item._id}>
              <td className="d-flex align-items-center gap-2">
                <Image
                  src={item.product?.image}
                  alt={item.product?.name}
                  width={40}
                  height={40}
                  className="rounded"
                />
                <span>{item.product?.name}</span>
              </td>
              <td>{item.quantity}</td>
              <td>Rs. {item.product?.price}</td>
              <td>Rs. {item.quantity * item.product?.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
