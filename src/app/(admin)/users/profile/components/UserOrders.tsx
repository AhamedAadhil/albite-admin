import React from "react";
import { Table } from "react-bootstrap";

export default function UserOrders({ orders }: { orders: any[] }) {
  if (!orders?.length) return <p>No orders found.</p>;

  return (
    <div>
      <h5>Order History</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Order ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order._id}</td>
              <td>{order.totalAmount}</td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
