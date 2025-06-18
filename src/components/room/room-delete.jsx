"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const RoomDelete = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState("");

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

  const handleDelete = async (roomId) => {
    const confirmDelete = confirm("Are you sure you want to delete this room?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/admin/rooms/${roomId}`);
      setRooms((prev) => prev.filter((room) => room._id !== roomId));
      setDeleteMessage("Room deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      setDeleteMessage("Failed to delete room.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Delete Rooms</h1>

      {deleteMessage && (
        <div className="mb-4 text-green-700 bg-green-100 p-2 rounded">
          {deleteMessage}
        </div>
      )}

      {loading ? (
        <p>Loading rooms...</p>
      ) : rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white shadow rounded p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Room {room.roomNumber}
                </h2>
                <p className="text-gray-600 text-sm mb-1">Category: {room.category}</p>
                <p className="text-gray-600 text-sm mb-1">Price: ${room.price}</p>
                {room.description && (
                  <p className="text-gray-500 text-sm">{room.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(room._id)}
                className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Delete Room
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomDelete;