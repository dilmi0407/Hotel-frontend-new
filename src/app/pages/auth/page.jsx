"use client";

import MainLayout from "@/components/layouts/MainLayout";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();
  const { SignIn, register, loading, error, setError } = useAuth(); // Fixed: removed empty string parameter

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    address: "",
    dob: "",
    city: "",
    state: "",
    contact: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const loggedInUser = await SignIn(loginData.email, loginData.password);

      if (
        loggedInUser.role === "admin" ||
        loggedInUser.role === "admin-manager"
      ) {
        router.push("/pages/dashboard");
      } else {
        router.push("/pages/requestbooking");
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Fixed: Use proper field names that match your backend schema
      const transformedData = {
        email: registerData.email,
        password: registerData.password,
        name: registerData.name, // Use lowercase 'name' to match schema
        gender: registerData.gender, // Use lowercase 'gender' to match schema
        address: registerData.address, // Use lowercase 'address' to match schema
        dob: registerData.dob, // Use lowercase 'dob' to match schema
        city: registerData.city, // Use lowercase 'city' to match schema
        state: registerData.state, // Use lowercase 'state' to match schema
        contact: registerData.contact, // Use lowercase 'contact' to match schema
        role: "user", // Default role
      };

      await register(transformedData); // Fixed: use transformedData instead of registerData
      setActiveTab("login");
      setLoginData({
        email: registerData.email,
        password: registerData.password,
      });
    } catch (err) {
      console.error("Registration Error:", err);
    }
  };

  const switchTab = (tab) => {
    setError(null);
    setActiveTab(tab);
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br p-4">
        <div className="backdrop-blur-md bg-white/50 p-10 rounded-2xl shadow-2xl w-full max-w-md">
          <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 drop-shadow-sm">
            Welcome...
          </h1>

          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 font-medium text-sm flex-1 ${
                activeTab === "login"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => switchTab("login")}
            >
              Sign In
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm flex-1 ${
                activeTab === "register"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => switchTab("register")}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {activeTab === "login" && (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="enter your email"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition outline-none"
                  required
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="enter your password"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition outline-none"
                  required
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 duration-300 shadow-md"
              >
                {loading ? "signing in..." : "Sign In"}
              </button>
            </form>
          )}

          {activeTab === "register" && (
            <form className="space-y-6" onSubmit={handleRegister}>
              <div className="gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required
                    placeholder="Full name"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                    placeholder="enter your email"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition outline-none"
                  />
                </div>
              </div>

              <div className="gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                    placeholder="enter your password"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={registerData.gender}
                    onChange={handleRegisterChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <input
                  name="address"
                  value={registerData.address}
                  onChange={handleRegisterChange}
                  required
                  placeholder="enter your address"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Date of Birth
                  </label>
                  <input
                    name="dob"
                    type="date"
                    value={registerData.dob}
                    onChange={handleRegisterChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Contact Number
                  </label>
                  <input
                    name="contact"
                    value={registerData.contact}
                    onChange={handleRegisterChange}
                    required
                    placeholder="contact number"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={registerData.city}
                    onChange={handleRegisterChange}
                    required
                    placeholder="city"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={registerData.state}
                    onChange={handleRegisterChange}
                    required
                    placeholder="state"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-400 transition outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 duration-300 shadow-md"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Auth;
