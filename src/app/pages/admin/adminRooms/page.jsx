"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL, { IMG_URL } from "@/API/config";
import AdminLayout from "@/components/layouts/adminLayout";

const AdminRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    _id: null,
    roomNumber: "",
    category: "",
    status: "available",
    images: [], // Added images array
  });
  const [isEditing, setIsEditing] = useState(false);
  const [imageFiles, setImageFiles] = useState([]); // Added for new images
  const [imagePreviews, setImagePreviews] = useState([]); // Added for previews

  useEffect(() => {
    fetchRooms();
    fetchCategories();

    // Missing proper cleanup for image previews
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/room`);
      setRooms(res.data || []);
    } catch (err) {
      
      setError("Failed to load rooms.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/category`);

      setCategories(res.data || []);
    } catch (err) {
      
      console.error("Failed to fetch categories.", err);
    }
  };

  
  const getImageUrl = (image) => {
    return image.url
      ? `${IMG_URL}/${image.filename}`
      : "/path/to/default-image.jpg";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = [...e.target.files];
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Missing proper validation function
  const validateForm = () => {
    if (!form.roomNumber) {
      setError("Room number is required.");
      return false;
    }
    if (!form.category) {
      setError("Please select a category.");
      return false;
    }
    return true;
  };

  const handleAddRoom = async () => {
    if (!validateForm()) return;
    
    try {
      const formData = new FormData();
      formData.append("roomNumber", form.roomNumber);
      formData.append("category", form.category);
      formData.append("status", form.status);
      imageFiles.forEach((file) => formData.append("images", file));

      const res = await axios.post(`${BASE_URL}/room`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setRooms((prev) => [...prev, res.data.room]);
      setImageFiles([]);
      setImagePreviews([]);
      resetForm();
    } catch (err) {
      alert("Failed to add room.");
    }
  };

  const handleUpdateRoom = async () => {
    if (!validateForm()) return;
    
    try {
      const formData = new FormData();
      formData.append("roomNumber", form.roomNumber);
      formData.append("category", form.category);
      formData.append("status", form.status);
      imageFiles.forEach((file) => formData.append("images", file));

      const res = await axios.put(`${BASE_URL}/room/${form._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setRooms((prev) =>
        prev.map((r) => (r._id === form._id ? res.data.room : r))
      );
      setImageFiles([]);
      setImagePreviews([]);
      resetForm();
    } catch {
      alert("Failed to update room.");
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    try {
      await axios.delete(`${BASE_URL}/room/${id}`);
      setRooms((prev) => prev.filter((r) => r._id !== id));
    } catch {
      alert("Failed to delete room.");
    }
  };

  const startEditRoom = (room) => {
    setForm({
      _id: room._id,
      roomNumber: room.roomNumber,
      category: room.category._id || room.category,
      status: room.status,
      images: room.images || [],
    });
    setImageFiles([]);
    setImagePreviews([]);
    setIsEditing(true);
  };

  const resetForm = () => {
    setForm({
      _id: null,
      roomNumber: "",
      category: "",
      status: "available",
      images: [],
    });
    setImageFiles([]);
    setImagePreviews([]);
    setIsEditing(false);
  };

  // Missing proper image deletion handling
  const handleImageDelete = (filename) => {
    // Not properly implemented like in first code
    setForm(prev => ({
      ...prev,
      images: prev.images.filter(img => img.filename !== filename)
    }));
  };

  // Missing proper new image removal handling
  const handleRemoveNewImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-semibold font-serif text-blue-800 mb-6">Admin Rooms</h1>

        {/* Form */}
        <div className="mb-8 bg-white p-6 rounded shadow">
          <h2 className="text-xl text-blue-800 font-semibold mb-4">
            {isEditing ? "Edit Room" : "Add New Room"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={form.roomNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          
          
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-700">
              Room Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded"
            />
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      onClick={() => handleRemoveNewImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {form.images?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={getImageUrl(image)}
                      alt={`Room image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "/path/to/default-image.jpg";
                        e.target.alt = "Image not found";
                      }}
                    />
                    <button
                      onClick={() => handleImageDelete(image.filename)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdateRoom}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update Room
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAddRoom}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Room
              </button>
            )}
          </div>
        </div>

        {/* Room Table */}
        {loading && <p>Loading rooms...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && rooms.length === 0 && <p>No rooms found.</p>}
        {!loading && rooms.length > 0 && (
          <div className="overflow-x-auto shadow rounded">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-5 border-b border-gray-200 text-left">Room Number</th>
                  <th className="py-3 px-5 border-b border-gray-200 text-left">Category</th>
                  <th className="py-3 px-5 border-b border-gray-200 text-left">Status</th>
                  <th className="py-3 px-5 border-b border-gray-200 text-left">Images</th>
                  <th className="py-3 px-5 border-b border-gray-200 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id} className="hover:bg-gray-50">
                    <td className="py-3 px-5 border-b border-gray-200">{room.roomNumber}</td>
                    <td className="py-3 px-5 border-b border-gray-200">{room.category?.name || "-"}</td>
                    <td className="py-3 px-5 border-b border-gray-200 capitalize">{room.status}</td>
                    <td className="py-3 px-5 border-b border-gray-200">
                      {room.images?.length > 0 ? (
                        <div className="flex items-center">
                          <span className="mr-2">{room.images.length}</span>
                          <img
                            src={getImageUrl(room.images[0])}
                            alt="Room preview"
                            className="w-10 h-10 object-cover rounded"
                          />
                        </div>
                      ) : "No images"}
                    </td>
                    <td className="py-3 px-5 border-b border-gray-200 space-x-2">
                      <button
                        onClick={() => startEditRoom(room)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(room._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminRoomsPage;





