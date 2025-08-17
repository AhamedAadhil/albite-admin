"use client";
import { Col, Row } from "react-bootstrap";
import ChatList from "./ChatList";
import Projects from "./Projects";
import Statistics from "./Statistics";
import WeeklySalesChart from "./WeeklySalesChart";
import YearlySalesChart from "./YearlySalesChart";

// data
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { chatMessages } from "./data";
import { useState, useEffect } from "react";

interface InsightsData {
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

      <Row>
        <Col lg={8}>
          <WeeklySalesChart />
        </Col>
        <Col lg={4}>
          <YearlySalesChart />
        </Col>
      </Row>

      <Row>
        <Col xl={4}>
          <ChatList messages={chatMessages} />
        </Col>

        <Col xl={8}>
          <Projects />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
