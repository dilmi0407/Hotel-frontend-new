"use client";

import React, { useState } from "react";
import axios from "axios";

const GalleryAdd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!title || !image) {
      setErrorMessage("Title and image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      setUploading(true);
      const res = await axios.post("/api/admin/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Image uploaded successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (err) {
      setErrorMessage("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Add Gallery Image</h1>

      {successMessage && (
        <p className="mb-4 text-green-600 bg-green-100 p-2 rounded">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mb-4 text-red-600 bg-red-100 p-2 rounded">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Optional description"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Image File</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
};

export default GalleryAdd;