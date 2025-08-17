import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const COLORS = ["#1a2942", "#3bc0c3", "#f13c6e", "#d1d7d9", "#FFBB28"];

export const RevenueOverTime = ({ data }: any) => {
  return (
    // Container styled similar to your card with padding, border-radius, background, and shadow
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        height: 320,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h4 style={{ marginBottom: 16, color: "#1a2942" }}>Revenue Over Time</h4>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: 4 }}
            labelStyle={{ color: "#333" }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3bc0c3" // Match your ApexChart primary color
            strokeWidth={3}
            activeDot={{ r: 8 }}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const OrderStatusPieChart = ({ data }: any) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        height: 350,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
      }}
    >
      <h4 style={{ marginBottom: 16, color: "#1a2942" }}>
        Order Status Distribution
      </h4>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={{ fill: "#333", fontSize: 14 }}
            stroke="none"
          >
            {data.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: 4 }}
            itemStyle={{ color: "#333" }}
          />

          <Legend
            verticalAlign="bottom"
            height={30}
            wrapperStyle={{
              fontSize: "14px",
              color: "#1a2942",
              marginTop: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const OrdersOverTimeChart = ({
  data,
}: {
  data: { date: string; orders: number }[];
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        height: 320,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h4 style={{ marginBottom: 16, color: "#1a2942" }}>Orders Over Time</h4>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" stroke="#666" />
          <YAxis stroke="#666" allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: 4 }}
            labelStyle={{ color: "#333" }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontSize: "14px", color: "#1a2942" }}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#3bc0c3"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DishesSoldBreakdownChart = ({
  data,
}: {
  data: { dishName: string; quantitySold: number }[];
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        height: 320,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h4 style={{ marginBottom: 16, color: "#1a2942" }}>Top 10 Dishes Sold</h4>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis type="number" stroke="#666" />
          <YAxis type="category" dataKey="dishName" stroke="#666" width={150} />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: 4 }}
            labelStyle={{ color: "#333" }}
          />
          <Bar dataKey="quantitySold" fill="#3bc0c3" barSize={20}>
            <LabelList dataKey="quantitySold" position="right" fill="#1a2942" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DeliveryMethodPieChart = ({
  data,
}: {
  data: { deliveryMethod: string; count: number }[];
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        height: 350,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
      }}
    >
      <h4 style={{ marginBottom: 16, color: "#1a2942" }}>
        Delivery Method Distribution
      </h4>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="deliveryMethod"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={{ fill: "#333", fontSize: 14 }}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: 4 }}
            itemStyle={{ color: "#333" }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ fontSize: "14px", color: "#1a2942", marginTop: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DiscountVsRevenueChart = ({
  data,
}: {
  data: { date: string; discount: number; revenue: number }[];
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        height: 320,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h4 style={{ marginBottom: 16, color: "#1a2942" }}>
        Discount vs Revenue
      </h4>
      <ResponsiveContainer width="100%" height="85%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" stroke="#666" />
          <YAxis
            yAxisId="left"
            stroke="#8884d8"
            label={{ value: "Revenue", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#82ca9d"
            label={{ value: "Discount", angle: 90, position: "insideRight" }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: 4 }}
            labelStyle={{ color: "#333" }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontSize: "14px", color: "#1a2942" }}
          />
          <Bar
            yAxisId="right"
            dataKey="discount"
            barSize={20}
            fill="#82ca9d"
            name="Discount"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            name="Revenue"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PointsOverTimeChart = ({
  data,
}: {
  data: { date: string; earnedPoints: number; usedPoints: number }[];
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        height: 350,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h4 style={{ marginBottom: 16, color: "#1a2942" }}>Points Over Time</h4>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" stroke="#666" />
          <YAxis allowDecimals={false} stroke="#666" />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: 4 }}
            labelStyle={{ color: "#333" }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontSize: "14px", color: "#1a2942" }}
          />
          <Line
            type="monotone"
            dataKey="earnedPoints"
            stroke="#3bc0c3"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            name="Earned Points"
          />
          <Line
            type="monotone"
            dataKey="usedPoints"
            stroke="#f13c6e"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            name="Used Points"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ProcessingTimesChart = ({
  data,
}: {
  data: {
    avgPlacedToAcceptedMinutes: number;
    avgAcceptedToPreparedMinutes: number;
    avgPreparedToDeliveredMinutes: number;
  };
}) => {
  // Convert object to array suitable for bar chart
  const chartData = [
    { stage: "Placed to Accepted", minutes: data.avgPlacedToAcceptedMinutes },
    {
      stage: "Accepted to Prepared",
      minutes: data.avgAcceptedToPreparedMinutes,
    },
    {
      stage: "Prepared to Delivered",
      minutes: data.avgPreparedToDeliveredMinutes,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        height: 320,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h4 style={{ marginBottom: 16, color: "#1a2942" }}>
        Order Processing Times (Minutes)
      </h4>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData} margin={{ left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="stage" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: 4 }}
            labelStyle={{ color: "#333" }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontSize: "14px", color: "#1a2942" }}
          />
          <Bar dataKey="minutes" fill="#3bc0c3" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
