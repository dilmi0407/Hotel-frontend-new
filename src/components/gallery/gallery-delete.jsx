"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const GalleryDelete = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteStatus, setDeleteStatus] = useState("");

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const res = await axios.get("/api/admin/gallery");
      setImages(res.data.images || []);
    } catch (err) {
      console.error("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      await axios.delete(`/api/admin/gallery/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
      setDeleteStatus("Image deleted successfully.");
    } catch (err) {
      console.error("Failed to delete image");
      setDeleteStatus("Error deleting image.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Delete Gallery Images</h1>

      {deleteStatus && (
        <div className="mb-4 text-sm text-green-700 bg-green-100 p-3 rounded">
          {deleteStatus}
        </div>
      )}

      {loading ? (
        <p>Loading gallery...</p>
      ) : images.length === 0 ? (
        <p>No images in the gallery.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image._id}
              className="bg-white shadow rounded overflow-hidden flex flex-col"
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-semibold text-lg">{image.title}</h2>
                  <p className="text-gray-600 text-sm mt-1">{image.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(image._id)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryDelete;