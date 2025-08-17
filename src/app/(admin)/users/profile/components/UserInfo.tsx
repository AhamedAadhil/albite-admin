"use client";
import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IUserInfoProps {
  userData: any; // IUser plus extended analytics: ordersByMonth, categoryDistribution, orderStatusDistribution
  ordersByMonth: {
    _id: { year: number; month: number };
    count: number;
    totalSpent: number;
  }[];
  categoryDistribution: { _id: string; totalQuantity: number }[];
  orderStatusDistribution: { _id: string; count: number }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

const UserInfo: React.FC<IUserInfoProps> = ({
  userData,
  ordersByMonth,
  categoryDistribution,
  orderStatusDistribution,
}) => {
  // Prepare orders per month data
  const chartOrdersByMonth = useMemo(() => {
    return ordersByMonth?.map((item) => {
      const date = new Date(item._id.year, item._id.month - 1);
      const monthStr = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      return {
        month: monthStr,
        count: item.count,
        totalSpent: item.totalSpent,
      };
    });
  }, [ordersByMonth]);

  // Prepare order category distribution data
  const chartCategoryDistribution = useMemo(() => {
    return categoryDistribution?.map((item) => ({
      name: item._id,
      value: item.totalQuantity,
    }));
  }, [categoryDistribution]);

  // Prepare order status distribution data
  const chartOrderStatusDistribution = useMemo(() => {
    return orderStatusDistribution?.map((item) => ({
      name: item._id,
      value: item.count,
    }));
  }, [orderStatusDistribution]);

  return (
    <div>
      <h5 className="mb-3">User Overview</h5>
      <Table bordered responsive className="mb-4">
        <tbody>
          <tr>
            <th>Total Orders</th>
            <td>{userData?.orders?.length || 0}</td>
          </tr>
          <tr>
            <th>Total Spent</th>
            <td>Rs. {userData?.totalSpent?.toLocaleString() || 0}</td>
          </tr>
          <tr>
            <th>Albite Loyalty Points</th>
            <td>{userData?.points?.toLocaleString() || 0}</td>
          </tr>
        </tbody>
      </Table>

      <h5 className="mb-3">Orders Per Month</h5>
      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={chartOrdersByMonth}>
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={(value) => [value, "Orders"]} />
            <Bar dataKey="count" fill={COLORS[0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h5 className="mb-3 mt-4">Order Categories Distribution</h5>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartCategoryDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {chartCategoryDistribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <h5 className="mb-3 mt-4">Order Status Distribution</h5>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartOrderStatusDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {chartOrderStatusDistribution.map((entry, index) => (
                <Cell
                  key={`cell-status-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserInfo;
