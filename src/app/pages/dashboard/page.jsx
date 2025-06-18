"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/layouts/adminLayout";
import {
  FiBox,
  FiCalendar,
  FiHome,
  FiUsers,
  FiDollarSign,
  FiPieChart,
  FiTrendingUp,
  FiActivity,
  FiRefreshCw,
} from "react-icons/fi";

// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const AdminDashboardPage = () => {
  // State Management
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    monthlyRevenue: {},
    totalCategories: 0,
    totalUsers: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [roomsByCategory, setRoomsByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Toast notification function
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // API Functions
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [
        roomsRes,
        bookingsRes,
        categoriesRes,
        usersRes,
        monthlyRevenueRes,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/Room`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/Booking`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/Category`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/User/get`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/Booking/monthly-revenue`, {
          headers: getAuthHeaders(),
        }),
      ]);

      // Check if all requests were successful
      if (
        !roomsRes.ok ||
        !bookingsRes.ok ||
        !categoriesRes.ok ||
        !usersRes.ok
      ) {
        throw new Error("Failed to fetch dashboard data");
      }

      // Parse responses
      const rooms = await roomsRes.json();
      const bookingsData = await bookingsRes.json();
      const categories = await categoriesRes.json();
      const users = await usersRes.json();
      const monthlyRevenue = monthlyRevenueRes.ok
        ? await monthlyRevenueRes.json()
        : {};

      // Process rooms data
      const roomsArray = Array.isArray(rooms) ? rooms : rooms.rooms || [];
      const availableRooms = roomsArray.filter(
        (room) => room.status === "available"
      ).length;
      const occupiedRooms = roomsArray.filter(
        (room) => room.status === "occupied"
      ).length;

      // Process bookings data
      const bookingsArray = Array.isArray(bookingsData)
        ? bookingsData
        : bookingsData.bookings || [];
      const pendingBookings = bookingsArray.filter(
        (booking) => booking.status === "pending"
      ).length;
      const confirmedBookings = bookingsArray.filter(
        (booking) => booking.status === "confirmed"
      ).length;
      const cancelledBookings = bookingsArray.filter(
        (booking) => booking.status === "cancelled"
      ).length;

      // Calculate total revenue
      const totalRevenue = bookingsArray.reduce(
        (sum, booking) => sum + (booking.totalPrice || 0),
        0
      );

      // Process categories data
      const categoriesArray = Array.isArray(categories)
        ? categories
        : categories.categories || [];

      // Process users data
      const usersArray = Array.isArray(users) ? users : users.users || [];

      // Group rooms by category for chart
      const roomsByCategory = categoriesArray.map((category) => ({
        name: category.name,
        count: roomsArray.filter((room) => room.category === category._id)
          .length,
        price: category.price,
      }));

      // Update stats
      setStats({
        totalRooms: roomsArray.length,
        availableRooms,
        occupiedRooms,
        totalBookings: bookingsArray.length,
        pendingBookings,
        confirmedBookings,
        cancelledBookings,
        totalRevenue,
        monthlyRevenue,
        totalCategories: categoriesArray.length,
        totalUsers: usersArray.length,
      });

      // Set recent data (last 5 items)
      setRecentBookings(bookingsArray.slice(0, 5));
      setRecentUsers(usersArray.slice(0, 5));
      setRoomsByCategory(roomsByCategory);
    } catch (err) {
      setError("Failed to load dashboard data");
      showToast("Failed to load dashboard data", "error");
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Components
  const StatCard = ({ icon, title, value, color, subtitle, trend }) => {
    const IconComponent = icon;
    return (
      <div
        className={`bg-white p-6 rounded-lg shadow-lg border-l-4 ${color} hover:shadow-xl transition-shadow`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={`p-3 rounded-full bg-opacity-20 ${color.replace(
                "border-l",
                "bg"
              )} mr-4`}
            >
              <IconComponent className="text-xl" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <p className="text-2xl font-semibold text-gray-800">{value}</p>
              {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
            </div>
          </div>
          {trend && (
            <div className="text-right">
              <FiTrendingUp className="text-green-500 text-sm" />
              <p className="text-xs text-green-500">{trend}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const QuickActionCard = ({ href, icon, title, description, color }) => {
    const IconComponent = icon;
    return (
      <a
        href={href}
        className={`${color} p-6 rounded-lg flex items-center hover:shadow-lg transition-all transform hover:scale-105`}
      >
        <IconComponent className="mr-4 text-2xl" />
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm opacity-80">{description}</p>
        </div>
      </a>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-2">
            <FiRefreshCw className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-lg">Loading dashboard...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Toast Notification */}
        {toast.show && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              toast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {toast.message}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-semibold font-serif text-blue-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome to your hotel management dashboard
            </p>
          </div>
          <button
            onClick={fetchDashboardData}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
          >
            <FiRefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FiHome}
            title="Total Rooms"
            value={stats.totalRooms}
            color="border-l-blue-500"
            subtitle={`${stats.availableRooms} available, ${stats.occupiedRooms} occupied`}
          />
          <StatCard
            icon={FiCalendar}
            title="Total Bookings"
            value={stats.totalBookings}
            color="border-l-purple-500"
            subtitle={`${stats.confirmedBookings} confirmed, ${stats.pendingBookings} pending`}
          />
          <StatCard
            icon={FiDollarSign}
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            color="border-l-green-500"
            trend="+12.5%"
          />
          <StatCard
            icon={FiUsers}
            title="Total Users"
            value={stats.totalUsers}
            color="border-l-indigo-500"
            subtitle="Registered customers"
          />
        </div>

        {/* Secondary Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={FiBox}
            title="Available Rooms"
            value={stats.availableRooms}
            color="border-l-green-500"
          />
          <StatCard
            icon={FiActivity}
            title="Pending Bookings"
            value={stats.pendingBookings}
            color="border-l-yellow-500"
          />
          <StatCard
            icon={FiPieChart}
            title="Room Categories"
            value={stats.totalCategories}
            color="border-l-red-500"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Bookings
              </h3>
              <a
                href="pages/admin/adminBookings"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View All
              </a>
            </div>
            <div className="p-6">
              {recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {booking.user?.firstName} {booking.user?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          Room {booking.room?.roomNumber} •{" "}
                          {new Date(booking.checkInDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          ${booking.totalPrice}
                        </div>
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No recent bookings found
                </p>
              )}
            </div>
          </div>

          {/* Room Categories Overview */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Room Categories
              </h3>
              <a
                href="/pages/admin/adminCategory"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Manage
              </a>
            </div>
            <div className="p-6">
              {roomsByCategory.length > 0 ? (
                <div className="space-y-4">
                  {roomsByCategory.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {category.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {category.count} rooms available
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          ${category.price}/night
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No categories found
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
          </div>
          <div className="p-6">
            {recentUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-gray-900">
                        Name
                      </th>
                      <th className="text-left py-2 font-medium text-gray-900">
                        Email
                      </th>
                      <th className="text-left py-2 font-medium text-gray-900">
                        Role
                      </th>
                      <th className="text-left py-2 font-medium text-gray-900">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user._id} className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">{user.name}</td>
                        <td className="py-3 text-gray-600">{user.email}</td>
                        <td className="py-3">
                          <span
                            className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.role || "user"}
                          </span>
                        </td>
                        <td className="py-3 text-gray-600">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No recent users found
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <QuickActionCard
                href="/pages/admin/adminRooms"
                icon={FiHome}
                title="Manage Rooms"
                description="Add, edit, or delete rooms"
                color="bg-blue-50 hover:bg-blue-100 text-blue-800"
              />
              <QuickActionCard
                href="/pages/admin/adminBookings"
                icon={FiCalendar}
                title="Manage Bookings"
                description="View and update bookings"
                color="bg-purple-50 hover:bg-purple-100 text-purple-800"
              />
              <QuickActionCard
                href="/pages/admin/adminCategory"
                icon={FiPieChart}
                title="Room Categories"
                description="Manage room types and pricing"
                color="bg-green-50 hover:bg-green-100 text-green-800"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
