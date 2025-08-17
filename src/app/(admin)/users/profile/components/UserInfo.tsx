"use client";
import React, { useMemo, useState } from "react";
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
  refetch: any;
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
  refetch,
  userData,
  ordersByMonth,
  categoryDistribution,
  orderStatusDistribution,
}) => {
  // Local state for points input
  const [pointsInput, setPointsInput] = useState(userData?.points || 0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Function to call backend API to update points
  const handleUpdatePoints = async () => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const response = await fetch(
        `/api/protected/users/${userData._id}/update-points`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ points: pointsInput }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to update points");
      }
      setSuccessMsg("Points updated successfully!");
      if (refetch) {
        refetch();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error updating points");
    } finally {
      setLoading(false);
    }
  };

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

      {/* Update users points */}
      <h5 className="mt-4">Update User Points</h5>
      <div className="d-flex align-items-center mb-3">
        <input
          type="number"
          className="form-control me-2"
          style={{ maxWidth: "150px" }}
          value={pointsInput}
          onChange={(e) => setPointsInput(Number(e.target.value))}
          disabled={loading}
        />
        <button
          className="btn btn-primary"
          onClick={handleUpdatePoints}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Points"}
        </button>
      </div>
      {errorMsg && <div className="text-danger mb-2">{errorMsg}</div>}
      {successMsg && <div className="text-success mb-2">{successMsg}</div>}
    </div>
  );
};

export default UserInfo;
