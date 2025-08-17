"use client";
import { Col, Row } from "react-bootstrap";
import Statistics from "./Statistics";
// data
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { useState, useEffect } from "react";
import {
  DeliveryMethodPieChart,
  DiscountVsRevenueChart,
  DishesSoldBreakdownChart,
  OrdersOverTimeChart,
  OrderStatusPieChart,
  PointsOverTimeChart,
  ProcessingTimesChart,
  RevenueOverTime,
} from "./charts";

interface InsightsData {
  reports: any;
  stats: any;
  users: {
    total: number;
    growthPercent: number;
  };
  orders: {
    total: number;
    growthPercent: number;
  };
  revenue: {
    total: number;
    growthPercent: number;
  };
}

const Dashboard = () => {
  const [data, setData] = useState<InsightsData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch(`/api/protected/insights`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchInsights();
  }, []);

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(data, "data");

  // Construct statistics array with fetched data
  // TODO: modifyt
  const statistics = [
    {
      title: "Total Users",
      stats: data.stats.users.total.toLocaleString(),
      change: data.stats.users.growthPercent.toFixed(2) + "%",
      icon: "ri-user-line",
      variant: "text-bg-pink",
    },
    {
      title: "Revenue",
      stats: "Rs. " + data.stats.revenue.total.toLocaleString(),
      change: data.stats.revenue.growthPercent.toFixed(2) + "%",
      icon: "ri-wallet-2-line",
      variant: "text-bg-purple",
    },
    {
      title: "Orders",
      stats: data.stats.orders.total.toLocaleString(),
      change: data.stats.orders.growthPercent.toFixed(2) + "%",
      icon: "ri-shopping-basket-line",
      variant: "text-bg-info",
    },
    {
      title: "Total Dishes Served",
      stats: data.stats.dishesServed.total.toLocaleString(),
      change: data.stats.dishesServed.growthPercent.toFixed(2) + "%",
      icon: "ri-restaurant-2-line",
      variant: "text-bg-primary",
    },
  ];

  return (
    <>
      <PageBreadcrumb title="Welcome!" subName="Dashboard" />
      <Row>
        {statistics &&
          (statistics || []).map((item, idx) => {
            return (
              <Col xxl={3} sm={6} key={idx}>
                <Statistics
                  title={item.title}
                  stats={item.stats}
                  change={item.change}
                  icon={item.icon}
                  variant={item.variant}
                />
              </Col>
            );
          })}
      </Row>

      {/* Revenue and Orders (trend and distribution) */}
      <Row>
        <Col lg={7}>
          <RevenueOverTime data={data?.stats?.reports?.revenueOverTime} />
        </Col>
        <Col lg={5}>
          <OrdersOverTimeChart data={data?.stats?.reports?.ordersOverTime} />
        </Col>
      </Row>

      {/* Pie charts for proportions */}
      <Row className="mt-4">
        <Col lg={4}>
          <OrderStatusPieChart
            data={data?.stats?.reports?.orderStatusDistribution}
          />
        </Col>
        <Col lg={4}>
          <DeliveryMethodPieChart
            data={data?.stats?.reports?.deliveryMethodDistribution}
          />
        </Col>
        <Col lg={4}>
          <PointsOverTimeChart data={data?.stats?.reports?.pointsOverTime} />
        </Col>
      </Row>

      {/* Detailed comparison and breakdown */}
      <Row className="mt-4">
        <Col lg={6}>
          <DiscountVsRevenueChart
            data={data?.stats?.reports?.discountVsRevenue}
          />
        </Col>
        <Col lg={6}>
          <DishesSoldBreakdownChart
            data={data?.stats?.reports?.dishesSoldBreakdown}
          />
        </Col>
      </Row>

      {/* Processing times - narrow vertical space */}
      <Row className="mt-4">
        <Col lg={12}>
          <ProcessingTimesChart data={data?.stats?.reports?.processingTimes} />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
