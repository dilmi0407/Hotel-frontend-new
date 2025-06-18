"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "@/API/config";
import AdminLayout from "@/components/layouts/adminLayout";

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    price: "",
    currency: "LKR",
    gradient: "",
    bgColor: "",
    popular: false,
    features: [{ label: "", icon: "" }],
  });

  const [editingId, setEditingId] = useState(null);
  const [editingCategory, setEditingCategory] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/category`);
      setCategories(res.data || []);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...newCategory.features];
    updatedFeatures[index][field] = value;
    setNewCategory((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  const addFeatureField = () => {
    setNewCategory((prev) => ({
      ...prev,
      features: [...prev.features, { label: "", icon: "" }],
    }));
  };

  const handleAddCategory = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/category`, newCategory);
      setCategories([...categories, res.data.category]);
      setNewCategory({
        name: "",
        description: "",
        price: "",
        currency: "LKR",
        gradient: "",
        bgColor: "",
        popular: false,
        features: [{ label: "", icon: "" }],
      });
    } catch (err) {
      console.error("Error adding category", err);
      alert("Failed to add category");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`${BASE_URL}/category/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch {
      alert("Failed to delete category");
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setEditingCategory({ ...cat });
  };

  const handleUpdateCategory = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/category/${editingId}`, editingCategory);
      setCategories(
        categories.map((cat) => (cat._id === editingId ? res.data.category : cat))
      );
      setEditingId(null);
    } catch {
      alert("Failed to update category");
    }
  };

  const renderInput = (label, name, value, type = "text", onChange = handleInputChange) => (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold font-serif text-blue-800 mb-8">Admin Category Management</h1>

        {/* Add Category Form */}
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Add New Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("Name", "name", newCategory.name)}
            {renderInput("Description", "description", newCategory.description)}
            {renderInput("Price", "price", newCategory.price, "number")}
            {renderInput("Currency", "currency", newCategory.currency)}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">Popular</label>
              <input
                type="checkbox"
                name="popular"
                checked={newCategory.popular}
                onChange={handleInputChange}
                className="h-5 w-5 rounded border-gray-300 text-blue-600"
              />
            </div>
          </div>

          {/* Features */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Features</h3>
            {newCategory.features.map((feature, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Label"
                  value={feature.label}
                  onChange={(e) => handleFeatureChange(index, "label", e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Icon"
                  value={feature.icon}
                  onChange={(e) => handleFeatureChange(index, "icon", e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              onClick={addFeatureField}
              className="text-sm text-blue-600 mt-1 hover:underline"
            >
              + Add Feature
            </button>
          </div>

          <button
            onClick={handleAddCategory}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Add Category
          </button>
        </div>

        {/* Category List */}
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Description</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Popular</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="border-t hover:bg-gray-50">
                  <td className="px-5 py-3">{cat.name}</td>
                  <td className="px-5 py-3">{cat.description}</td>
                  <td className="px-5 py-3">{cat.price} {cat.currency}</td>
                  <td className="px-5 py-3">{cat.popular ? "Yes" : "No"}</td>
                  <td className="px-5 py-3 space-x-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Form */}
        {editingId && (
          <div className="mt-8 p-6 bg-blue-50-50 border border-blue-300 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Category</h2>
            {renderInput("Name", "name", editingCategory.name, "text", (e) =>
              setEditingCategory({ ...editingCategory, name: e.target.value })
            )}
            {renderInput("Description", "description", editingCategory.description, "text", (e) =>
              setEditingCategory({ ...editingCategory, description: e.target.value })
            )}
            {renderInput("Price", "price", editingCategory.price, "number", (e) =>
              setEditingCategory({ ...editingCategory, price: e.target.value })
            )}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleUpdateCategory}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="text-gray-700 underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCategoryPage;



