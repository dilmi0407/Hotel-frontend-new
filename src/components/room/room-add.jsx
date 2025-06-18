"use client";

import React, { useState } from "react";
import axios from "axios";

const RoomAdd = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!roomNumber || !category || !price) {
      setErrorMessage("Room Number, Category, and Price are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/admin/rooms", {
        roomNumber,
        category,
        price,
        description,
      });

      setSuccessMessage("Room added successfully.");
      setRoomNumber("");
      setCategory("");
      setPrice("");
      setDescription("");
    } catch (err) {
      setErrorMessage("Error adding room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Room</h2>

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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Room Number</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 101"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Deluxe, Standard"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Price (per night)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 150"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Optional room description"
            rows="3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Add Room"}
        </button>
      </form>
    </div>
  );
};

export default RoomAdd;