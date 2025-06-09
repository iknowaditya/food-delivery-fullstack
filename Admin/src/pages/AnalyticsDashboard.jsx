import { useState, useEffect } from "react";
// import axios from "axios";
import {
  AreaChart,
  Area,
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week");
  const [dashboardData, setDashboardData] = useState({
    summary: {},
    salesTrend: [],
    topProducts: [],
    userActivity: [],
    revenueByCategory: [],
  });

  // Mock data - replace with actual API calls
  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data structure
      const mockData = {
        summary: {
          totalRevenue: 12453.89,
          totalOrders: 342,
          newUsers: 28,
          avgOrderValue: 36.42,
        },
        salesTrend: [
          { name: "Mon", sales: 4000 },
          { name: "Tue", sales: 3000 },
          { name: "Wed", sales: 5000 },
          { name: "Thu", sales: 2780 },
          { name: "Fri", sales: 1890 },
          { name: "Sat", sales: 6390 },
          { name: "Sun", sales: 8490 },
        ],
        topProducts: [
          { name: "Margherita Pizza", value: 400 },
          { name: "Chicken Burger", value: 300 },
          { name: "Veg Biryani", value: 200 },
          { name: "Paneer Tikka", value: 150 },
          { name: "Garlic Noodles", value: 100 },
        ],
        userActivity: [
          { hour: "12AM", active: 20 },
          { hour: "3AM", active: 10 },
          { hour: "6AM", active: 25 },
          { hour: "9AM", active: 120 },
          { hour: "12PM", active: 200 },
          { hour: "3PM", active: 180 },
          { hour: "6PM", active: 240 },
          { hour: "9PM", active: 150 },
        ],
        revenueByCategory: [
          { name: "Pizza", value: 45 },
          { name: "Burgers", value: 25 },
          { name: "Biryani", value: 15 },
          { name: "Noodles", value: 10 },
          { name: "Others", value: 5 },
        ],
      };

      setDashboardData(mockData);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeRange]);

  const COLORS = ["#1f4037", "#99f2c8", "#3a7d6e", "#5ba08b", "#7cc3a8"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafb] to-white p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[#1f4037] flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-[#99f2c8]" />
            Analytics Dashboard
          </h1>
          <p className="text-sm text-[#1f4037]/70 mt-1">
            Key metrics and performance indicators
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center space-x-2 mt-4 md:mt-0"
        >
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-[#99f2c8]/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#99f2c8] bg-white"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 90 Days</option>
          </select>
          <button
            onClick={fetchData}
            className="p-2 bg-[#1f4037] text-white rounded-lg hover:bg-[#1f4037]/90 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </motion.div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 h-32 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-[#99f2c8]/30 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1f4037]/70">
                    Total Revenue
                  </p>
                  <h3 className="text-2xl font-bold text-[#1f4037] mt-1">
                    ${dashboardData.summary.totalRevenue.toLocaleString()}
                  </h3>
                </div>
                <div className="p-3 bg-[#99f2c8]/20 rounded-lg">
                  <DollarSign className="w-6 h-6 text-[#1f4037]" />
                </div>
              </div>
              <p className="text-xs text-[#1f4037]/50 mt-2">
                +12.5% from last{" "}
                {timeRange === "week"
                  ? "week"
                  : timeRange === "month"
                  ? "month"
                  : "quarter"}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-[#99f2c8]/30 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1f4037]/70">
                    Total Orders
                  </p>
                  <h3 className="text-2xl font-bold text-[#1f4037] mt-1">
                    {dashboardData.summary.totalOrders}
                  </h3>
                </div>
                <div className="p-3 bg-[#99f2c8]/20 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-[#1f4037]" />
                </div>
              </div>
              <p className="text-xs text-[#1f4037]/50 mt-2">
                +8.3% from last{" "}
                {timeRange === "week"
                  ? "week"
                  : timeRange === "month"
                  ? "month"
                  : "quarter"}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-[#99f2c8]/30 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1f4037]/70">
                    New Users
                  </p>
                  <h3 className="text-2xl font-bold text-[#1f4037] mt-1">
                    {dashboardData.summary.newUsers}
                  </h3>
                </div>
                <div className="p-3 bg-[#99f2c8]/20 rounded-lg">
                  <Users className="w-6 h-6 text-[#1f4037]" />
                </div>
              </div>
              <p className="text-xs text-[#1f4037]/50 mt-2">
                +5.2% from last{" "}
                {timeRange === "week"
                  ? "week"
                  : timeRange === "month"
                  ? "month"
                  : "quarter"}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-[#99f2c8]/30 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1f4037]/70">
                    Avg. Order Value
                  </p>
                  <h3 className="text-2xl font-bold text-[#1f4037] mt-1">
                    ${dashboardData.summary.avgOrderValue.toFixed(2)}
                  </h3>
                </div>
                <div className="p-3 bg-[#99f2c8]/20 rounded-lg">
                  <DollarSign className="w-6 h-6 text-[#1f4037]" />
                </div>
              </div>
              <p className="text-xs text-[#1f4037]/50 mt-2">
                +3.7% from last{" "}
                {timeRange === "week"
                  ? "week"
                  : timeRange === "month"
                  ? "month"
                  : "quarter"}
              </p>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Sales Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-[#99f2c8]/30 p-6"
            >
              <h3 className="text-lg font-semibold text-[#1f4037] mb-4">
                Sales Trend
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData.salesTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#1f4037" />
                    <YAxis stroke="#1f4037" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderColor: "#99f2c8",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#1f4037"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="Sales ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Revenue by Category Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-[#99f2c8]/30 p-6"
            >
              <h3 className="text-lg font-semibold text-[#1f4037] mb-4">
                Revenue by Category
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData.revenueByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {dashboardData.revenueByCategory.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderColor: "#99f2c8",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-[#99f2c8]/30 p-6"
            >
              <h3 className="text-lg font-semibold text-[#1f4037] mb-4">
                Top Products
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.topProducts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#1f4037" />
                    <YAxis stroke="#1f4037" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderColor: "#99f2c8",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="value"
                      name="Orders"
                      fill="#1f4037"
                      radius={[4, 4, 0, 0]}
                    >
                      {dashboardData.topProducts.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* User Activity Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-[#99f2c8]/30 p-6"
            >
              <h3 className="text-lg font-semibold text-[#1f4037] mb-4">
                User Activity
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardData.userActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="hour" stroke="#1f4037" />
                    <YAxis stroke="#1f4037" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderColor: "#99f2c8",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="active"
                      stroke="#1f4037"
                      fill="#99f2c8"
                      fillOpacity={0.4}
                      strokeWidth={2}
                      name="Active Users"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
