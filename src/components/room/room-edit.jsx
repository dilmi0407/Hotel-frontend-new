"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const RoomEdit = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [formData, setFormData] = useState({
    roomNumber: "",
    category: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("/api/admin/rooms");
      setRooms(res.data.rooms || []);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e) => {
    const roomId = e.target.value;
    setSelectedRoomId(roomId);
    const selected = rooms.find((room) => room._id === roomId);
    if (selected) {
      setFormData({
        roomNumber: selected.roomNumber,
        category: selected.category,
        price: selected.price,
        description: selected.description || "",
      });
    }
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!selectedRoomId) {
      setErrorMessage("Please select a room to edit.");
      return;
    }

    try {
      await axios.put(`/api/admin/rooms/${selectedRoomId}`, formData);
      setSuccessMessage("Room updated successfully.");
      fetchRooms(); // refresh room list
    } catch (error) {
      console.error("Update failed:", error);
      setErrorMessage("Failed to update room.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Room</h2>

      {successMessage && (
        <div className="mb-4 text-green-700 bg-green-100 p-2 rounded">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 text-red-700 bg-red-100 p-2 rounded">
          {errorMessage}
        </div>
      )}

      {loading ? (
        <p>Loading rooms...</p>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Select Room
            </label>
            <select
              onChange={handleSelectChange}
              value={selectedRoomId}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">-- Choose a room --</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  Room {room.roomNumber} ({room.category})
                </option>
              ))}
            </select>
          </div>

          {selectedRoomId && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Room Number</label>
                <input
                  type="text"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Update Room
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default RoomEdit;