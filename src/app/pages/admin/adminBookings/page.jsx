"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/layouts/adminLayout";
import {
  Search,
  Eye,
  Trash2,
  Download,
  RefreshCw,
  ChevronDown,
  X,
} from "lucide-react";

// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const AdminBookingsPage = () => {
  // State Management
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
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

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Booking`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      return Array.isArray(data) ? data : data.bookings || [];
    } catch (error) {
      throw error;
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Booking/${bookingId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update booking");
      return response.json();
    } catch (error) {
      throw error;
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Booking/${bookingId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to delete booking");
      return response.json();
    } catch (error) {
      throw error;
    }
  };

  // Effects
  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter]);

  // Event Handlers
  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await fetchBookings();
      setBookings(data);
    } catch (error) {
      showToast("Failed to load bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          (booking.user?.firstName || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (booking.user?.lastName || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (booking.user?.email || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (booking.room?.roomNumber || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );
      showToast("Booking status updated successfully");
    } catch (error) {
      showToast("Failed to update booking status", "error");
    }
  };

  const handleDelete = async (bookingId) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      await deleteBooking(bookingId);
      setBookings((prev) =>
        prev.filter((booking) => booking._id !== bookingId)
      );
      showToast("Booking deleted successfully");
    } catch (error) {
      showToast("Failed to delete booking", "error");
    }
  };

  const exportBookings = () => {
    const csvContent = [
      [
        "Booking ID",
        "Customer",
        "Email",
        "Room",
        "Check-In",
        "Check-Out",
        "Adults",
        "Children",
        "Total Price",
        "Status",
        "Created",
      ],
      ...filteredBookings.map((booking) => [
        booking._id,
        booking.user?.name || "",
        booking.user?.email || "",
        booking.room?.roomNumber || "",
        new Date(booking.checkInDate).toLocaleDateString(),
        new Date(booking.checkOutDate).toLocaleDateString(),
        booking.numberOfAdults,
        booking.numberOfChildren,
        booking.totalPrice,
        booking.status,
        new Date(booking.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Loading Component
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-lg">Loading bookings...</span>
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
              All Bookings
            </h1>
            <p className="text-gray-600 mt-2">Manage all hotel bookings</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={exportBookings}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </button>
            <button
              onClick={loadBookings}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by customer name, email, room number, or booking ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {bookings.length}
            </div>
            <p className="text-sm text-gray-600">Total Bookings</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">
              {bookings.filter((b) => b.status === "pending").length}
            </div>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {bookings.filter((b) => b.status === "confirmed").length}
            </div>
            <p className="text-sm text-gray-600">Confirmed</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-red-600">
              {bookings.filter((b) => b.status === "cancelled").length}
            </div>
            <p className="text-sm text-gray-600">Cancelled</p>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && <p className="text-gray-600">Loading bookings...</p>}

        {!loading && filteredBookings.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-600">No bookings found.</p>
          </div>
        )}

        {/* Bookings Table */}
        {!loading && filteredBookings.length > 0 && (
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Check-In
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Check-Out
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Guests
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <span className="font-mono">{booking._id.slice(-8)}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <div>
                        <div className="font-medium">
                          {booking.user?.firstName || ""}{" "}
                          {booking.user?.lastName || ""}
                        </div>
                        <div className="text-gray-500">
                          {booking.user?.email || ""}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <div>
                        <div className="font-medium">
                          Room {booking.room?.roomNumber || "N/A"}
                        </div>
                        <div className="text-gray-500">
                          {booking.category?.name || ""}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {booking.numberOfAdults}A, {booking.numberOfChildren}C
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      ${booking.totalPrice}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusUpdate(booking._id, e.target.value)
                        }
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-blue-500 ${getStatusBadgeColor(
                          booking.status
                        )}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setIsViewDialogOpen(true);
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs inline-flex items-center"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs inline-flex items-center"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View Booking Dialog */}
        {isViewDialogOpen && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  Booking Details
                </h3>
                <button
                  onClick={() => setIsViewDialogOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Booking ID
                    </label>
                    <p className="font-mono text-sm">{selectedBooking._id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                        selectedBooking.status
                      )}`}
                    >
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Information
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>
                      <strong>Email:</strong> {selectedBooking.user?.email}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Information
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>
                      <strong>Room:</strong> {selectedBooking.room?.roomNumber}
                    </p>
                    <p>
                      <strong>Category:</strong>{" "}
                      {selectedBooking.category?.name}
                    </p>
                    <p>
                      <strong>Price per night:</strong> $
                      {selectedBooking.category?.price}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in Date
                    </label>
                    <p>
                      {new Date(
                        selectedBooking.checkInDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out Date
                    </label>
                    <p>
                      {new Date(
                        selectedBooking.checkOutDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adults
                    </label>
                    <p>{selectedBooking.numberOfAdults}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Children
                    </label>
                    <p>{selectedBooking.numberOfChildren}</p>
                  </div>
                </div>

                {selectedBooking.billing && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Billing Information
                    </label>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>
                        <strong>Name:</strong>{" "}
                        {selectedBooking.billing.fullName}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedBooking.billing.email}
                      </p>
                      <p>
                        <strong>Address:</strong>{" "}
                        {selectedBooking.billing.address}
                      </p>
                      <p>
                        <strong>City:</strong> {selectedBooking.billing.city},{" "}
                        {selectedBooking.billing.state}{" "}
                        {selectedBooking.billing.zip}
                      </p>
                      <p>
                        <strong>Card:</strong> **** **** ****{" "}
                        {selectedBooking.billing.cardNumber?.slice(-4)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Amount
                    </label>
                    <p className="text-2xl font-bold text-gray-900">
                      ${selectedBooking.totalPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Booking Date
                    </label>
                    <p>
                      {new Date(selectedBooking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBookingsPage;
