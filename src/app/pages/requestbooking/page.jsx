"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Users,
  CreditCard,
  User,
  MapPin,
  Phone,
  Mail,
  Star,
  Bed,
  Wifi,
  Tv,
  Coffee,
  Bath,
  Wind,
  ChevronRight,
  ChevronLeft,
  Loader2,
  AlertCircle,
  Car,
  Utensils,
  Shield,
  Zap,
  Snowflake,
  Sun,
  Moon,
  Heart,
  Gift,
  Crown,
  Sparkles,
  Home,
  TreePine,
  Waves,
  Mountain,
  Camera,
  Music,
  Gamepad2,
  Dumbbell,
  Plane,
  Clock,
  File,
  Pencil,
  ArrowRight,
  Building,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/buttton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import axios from "axios"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { useAuth } from "@/context/AuthContext"
import generateBookingReport from "@/lib/genarateBookingReport"

const steps = [
  { id: 1, title: "Select Room", icon: Building, description: "Choose your perfect accommodation" },
  { id: 2, title: "Dates & Guests", icon: Calendar, description: "Set your travel dates" },
  { id: 3, title: "Guest Details", icon: User, description: "Your information" },
  { id: 4, title: "Secure Payment", icon: CreditCard, description: "Complete your booking" },
]

// Icon mapping remains the same
const iconMap = {
  Wifi: Wifi,
  Tv: Tv,
  Coffee: Coffee,
  Bath: Bath,
  Wind: Wind,
  Car: Car,
  Utensils: Utensils,
  Shield: Shield,
  Zap: Zap,
  Snowflake: Snowflake,
  Sun: Sun,
  Moon: Moon,
  Heart: Heart,
  Gift: Gift,
  Crown: Crown,
  Sparkles: Sparkles,
  Home: Home,
  TreePine: TreePine,
  Waves: Waves,
  Mountain: Mountain,
  Camera: Camera,
  Music: Music,
  Gamepad2: Gamepad2,
  Dumbbell: Dumbbell,
  Plane: Plane,
  Clock: Clock,
  Star: Star,
  Bed: Bed,
  File: File,
  Pencil: Pencil,
}

const randomIcons = [
  Wifi,
  Tv,
  Coffee,
  Bath,
  Wind,
  Car,
  Utensils,
  Shield,
  Zap,
  Snowflake,
  Sun,
  Moon,
  Heart,
  Gift,
  Crown,
  Sparkles,
  Home,
  TreePine,
  Waves,
  Mountain,
  Camera,
  Music,
  Gamepad2,
  Dumbbell,
  Plane,
  Clock,
  Star,
  Bed,
]

// Color themes instead of gradients
const colorThemes = [
  {
    name: "ocean",
    primary: "bg-blue-500",
    secondary: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
    hover: "hover:bg-blue-50",
    accent: "bg-blue-600",
  },
  {
    name: "forest",
    primary: "bg-green-500",
    secondary: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
    hover: "hover:bg-green-50",
    accent: "bg-green-600",
  },
  {
    name: "sunset",
    primary: "bg-orange-500",
    secondary: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-200",
    hover: "hover:bg-orange-50",
    accent: "bg-orange-600",
  },
  {
    name: "lavender",
    primary: "bg-purple-500",
    secondary: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-200",
    hover: "hover:bg-purple-50",
    accent: "bg-purple-600",
  },
  {
    name: "rose",
    primary: "bg-pink-500",
    secondary: "bg-pink-100",
    text: "text-pink-700",
    border: "border-pink-200",
    hover: "hover:bg-pink-50",
    accent: "bg-pink-600",
  },
  {
    name: "slate",
    primary: "bg-slate-500",
    secondary: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    hover: "hover:bg-slate-50",
    accent: "bg-slate-600",
  },
  {
    name: "emerald",
    primary: "bg-emerald-500",
    secondary: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-200",
    hover: "hover:bg-emerald-50",
    accent: "bg-emerald-600",
  },
  {
    name: "indigo",
    primary: "bg-indigo-500",
    secondary: "bg-indigo-100",
    text: "text-indigo-700",
    border: "border-indigo-200",
    hover: "hover:bg-indigo-50",
    accent: "bg-indigo-600",
  },
]

export default function ModernBooking() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [roomsLoading, setRoomsLoading] = useState(true)
  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [step, setStep] = useState(1)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [categoryDetails, setCategoryDetails] = useState({})

  // Form states remain the same
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    phone: "",
    email: "",
  })

  const [bookingData, setBookingData] = useState({
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: 1,
    numberOfChildren: 0,
  })

  const [billingData, setBillingData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
  })

  // All existing functions remain the same
  const createAxiosInstance = () => {
    const token = localStorage.getItem("token")
    console.log("Creating axios instance with token:", token ? `${token.substring(0, 20)}...` : "No token")

    const instance = axios.create({
      baseURL: "http://localhost:5000/api",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })

    return instance
  }

  // Get random theme for each room
  const getRoomTheme = (roomId) => {
    const hash = roomId.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)
    return colorThemes[Math.abs(hash) % colorThemes.length]
  }

  const getIconForFeature = (feature) => {
    if (feature.icon && iconMap[feature.icon]) {
      return iconMap[feature.icon]
    }
    const hash = feature.label.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)
    return randomIcons[Math.abs(hash) % randomIcons.length]
  }

  const fetchRooms = async () => {
    try {
      setRoomsLoading(true)
      const roomsResponse = await axios.get("http://localhost:5000/api/room")
      const availableRooms = roomsResponse.data.filter((room) => room.status === "available")

      const uniqueCategoryIds = [
        ...new Set(
          availableRooms.map((room) => (typeof room.category === "object" ? room.category._id : room.category)),
        ),
      ]

      const categoryDetailsObj = {}
      await Promise.all(
        uniqueCategoryIds.map(async (categoryId) => {
          try {
            const categoryResponse = await axios.get(`http://localhost:5000/api/category/${categoryId}`)
            categoryDetailsObj[categoryId] = categoryResponse.data
          } catch (err) {
            console.error(`Failed to fetch category ${categoryId}:`, err)
          }
        }),
      )

      setCategoryDetails(categoryDetailsObj)
      setRooms(availableRooms)
      setError("")
    } catch (error) {
      console.error("Error fetching rooms:", error)
      setError("Failed to load rooms. Please try again later.")
    } finally {
      setRoomsLoading(false)
    }
  }

  const getCategoryForRoom = (room) => {
    if (!room || !room.category) return null
    const categoryId = typeof room.category === "object" ? room.category._id : room.category
    return categoryDetails[categoryId] || null
  }

  useEffect(() => {
    const checkAuth = () => {
      if (!authLoading) {
        if (user) {
          setIsAuthenticated(true)
          console.log("User authenticated:", user)
        } else {
          setIsAuthenticated(false)
          console.log("User not authenticated")
        }
        setIsLoading(false)
      }
    }

    checkAuth()
    fetchRooms()
  }, [user, authLoading])

  const calculateTotalPrice = () => {
    if (!selectedRoom || !bookingData.checkInDate || !bookingData.checkOutDate) {
      return 0
    }

    const checkIn = new Date(bookingData.checkInDate)
    const checkOut = new Date(bookingData.checkOutDate)
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))

    const category = getCategoryForRoom(selectedRoom)
    const price = category?.price || 0

    return nights * price
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBillingChange = (e) => {
    const { name, value } = e.target
    setBillingData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoomSelect = (room) => {
    if (isAuthenticated) {
      setSelectedRoom(room)
      setStep(2)
    } else {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please register or log in to book a room.",
        confirmButtonColor: "#1f2937",
        background: "#f9fafb",
      }).then(() => {
        router.push("/pages/auth")
      })
    }
  }

  const handleAvailabilitySubmit = async (e) => {
    e.preventDefault()

    const checkIn = new Date(bookingData.checkInDate)
    const checkOut = new Date(bookingData.checkOutDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (checkIn < today) {
      setError("Check-in date cannot be in the past")
      return
    }

    if (checkOut <= checkIn) {
      setError("Check-out date must be after check-in date")
      return
    }

    try {
      const axiosInstance = createAxiosInstance()
      const response = await axiosInstance.get("/booking/check-availability", {
        params: {
          roomId: selectedRoom._id,
          checkInDate: bookingData.checkInDate,
          checkOutDate: bookingData.checkOutDate,
        },
      })

      if (response.data.available) {
        setError("")
        setStep(3)
      } else {
        setError("Room is not available for the selected dates. Please choose different dates.")
      }
    } catch (error) {
      console.error("Error checking availability:", error)
      setError("")
      setStep(3)
    }
  }

  const handlePersonalSubmit = (e) => {
    e.preventDefault()
    setStep(4)
  }

  const resetBooking = () => {
    setFormData({
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      phone: "",
      email: "",
    })
    setBookingData({
      checkInDate: "",
      checkOutDate: "",
      numberOfAdults: 1,
      numberOfChildren: 0,
    })
    setBillingData({
      fullName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      cardNumber: "",
    })
    setSelectedRoom(null)
    setStep(1)
    setError("")
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (!user) {
        throw new Error("User not authenticated")
      }

      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No authentication token found")
      }

      const totalPrice = calculateTotalPrice()
      const categoryId = typeof selectedRoom.category === "object" ? selectedRoom.category._id : selectedRoom.category

      const finalBookingData = {
        room: selectedRoom._id,
        category: categoryId,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        numberOfAdults: bookingData.numberOfAdults,
        numberOfChildren: bookingData.numberOfChildren,
        totalPrice: totalPrice,
        billing: billingData,
      }

      try {
        const testResponse = await axios.get("http://localhost:5000/api/booking/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      } catch (testError) {
        throw new Error("Authentication token is invalid")
      }

      const response = await axios.post("http://localhost:5000/api/booking", finalBookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      Swal.fire({
        icon: "success",
        title: "Booking Confirmed!",
        text: `Your reservation has been successfully created!`,
        timer: 5000,
        showConfirmButton: false,
        background: "#f0fdf4",
        color: "#166534",
      })

      generateBookingReport({
        booking: {
          reference: response.data.bookingReference || response.data._id,
          checkInDate: bookingData.checkInDate,
          checkOutDate: bookingData.checkOutDate,
          numberOfAdults: bookingData.numberOfAdults,
          numberOfChildren: bookingData.numberOfChildren,
          totalPrice: calculateTotalPrice(),
        },
        guest: formData,
        room: selectedRoom,
        billing: billingData,
      })

      resetBooking()
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again."

      if (error.response?.status === 401) {
        errorMessage = "Your session has expired. Please log in again."
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setTimeout(() => {
          router.push("/pages/auth")
        }, 2000)
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }

      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: errorMessage,
        background: "#fef2f2",
        color: "#dc2626",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="w-12 h-12 border-3 border-gray-800 border-t-transparent rounded-full mx-auto mb-6"
          />
          <h2 className="text-xl font-medium text-gray-800">Preparing your booking experience...</h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Modern Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900" />
        <div className="relative px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-5xl md:text-7xl font-light font-serif text-white mb-4 tracking-tight">Reserve</h1>
            <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
              Discover exceptional accommodations crafted for the discerning traveler
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
        {/* Modern Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center justify-between">
              {steps.map((stepItem, index) => {
                const IconComponent = stepItem.icon
                const isActive = step === stepItem.id
                const isCompleted = step > stepItem.id
                const isAccessible = step >= stepItem.id

                return (
                  <div key={stepItem.id} className="flex items-center flex-1">
                    <motion.div
                      whileHover={isAccessible ? { scale: 1.02 } : {}}
                      className={`flex flex-col items-center text-center cursor-pointer transition-all duration-300 ${
                        isAccessible ? "" : "cursor-not-allowed"
                      }`}
                      onClick={() => isAccessible && setStep(stepItem.id)}
                    >
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                          isActive
                            ? "bg-blue-700 text-white shadow-lg scale-110"
                            : isCompleted
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="w-7 h-7" /> : <IconComponent className="w-7 h-7" />}
                      </div>
                      <div>
                        <h3
                          className={`font-medium text-sm mb-1 ${
                            isActive ? "text-gray-900" : isCompleted ? "text-green-600" : "text-gray-400"
                          }`}
                        >
                          {stepItem.title}
                        </h3>
                        <p className="text-xs text-gray-500 hidden md:block">{stepItem.description}</p>
                      </div>
                    </motion.div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-px mx-4 transition-all duration-300 ${
                          step > stepItem.id ? "bg-green-300" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* Step 1: Room Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-serif font-light text-blue-900 mb-4">Select Your Sanctuary</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Each room is thoughtfully designed to provide comfort and tranquility
                </p>
              </div>

              {roomsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-600">Curating available rooms...</p>
                  </div>
                </div>
              ) : rooms.length === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                    <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-xl font-medium text-gray-800 mb-4">No Rooms Available</h3>
                    <p className="text-gray-600 mb-6">We're currently at capacity. Please check back soon.</p>
                    <Button onClick={fetchRooms} variant="outline" className="border-gray-300 hover:bg-gray-50">
                      Refresh Availability
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {rooms.map((room, index) => {
                    const category = getCategoryForRoom(room)
                    const isPopular = category?.popular || false

                    return (
                      <motion.div
                        key={room._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -8 }}
                        className="group"
                      >
                        <div className="bg-cyan-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                          {isPopular && (
                            <div className="absolute top-4 right-4 z-10">
                              <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            </div>
                          )}

                          {/* Room Image */}
                          <div className="relative h-56 bg-gray-100 overflow-hidden">
                            {room.images && room.images.length > 0 ? (
                              <img
                                src={`http://localhost:5000${room.images[0].url}`}
                                alt={category?.name || "Room"}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                onError={(e) => {
                                  e.target.style.display = "none"
                                  e.target.nextSibling.style.display = "flex"
                                }}
                              />
                            ) : null}
                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                              <Bed className="w-12 h-12" />
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-xl font-medium text-gray-900 mb-1">
                                  {category?.name || "Premium Room"}
                                </h3>
                                <p className="text-sm text-gray-500">Room {room.roomNumber}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-light text-gray-900">
                                  LKR {category?.price?.toLocaleString() || "N/A"}
                                </div>
                                <div className="text-sm text-gray-500">per night</div>
                              </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                              {category?.description || "Elegantly appointed accommodation with premium amenities."}
                            </p>

                            {/* Features */}
                            {category?.features && category.features.length > 0 && (
                              <div className="mb-6">
                                <div className="flex flex-wrap gap-2">
                                  {category.features.slice(0, 4).map((feature, featureIndex) => {
                                    const FeatureIcon = getIconForFeature(feature)
                                    return (
                                      <div
                                        key={featureIndex}
                                        className="flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1"
                                      >
                                        <FeatureIcon className="w-3 h-3 text-gray-600" />
                                        <span className="text-xs text-gray-700">{feature.label}</span>
                                      </div>
                                    )
                                  })}
                                  {category.features.length > 4 && (
                                    <div className="flex items-center bg-gray-50 rounded-full px-3 py-1">
                                      <span className="text-xs text-gray-700">
                                        +{category.features.length - 4} more
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            <Button
                              onClick={() => handleRoomSelect(room)}
                              className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-xl h-12 font-medium transition-all duration-300 group"
                            >
                              Select This Room
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Availability */}
          {step === 2 && selectedRoom && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-20"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-light font-serif text-blue-900 mb-4">Plan Your Stay</h2>
                  <div className="bg-gray-50 rounded-xl p-4 inline-block">
                    <p className="text-blue-700">
                      <span className="font-medium">Selected:</span> {getCategoryForRoom(selectedRoom)?.name || "Room"}{" "}
                      - Room {selectedRoom.roomNumber}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleAvailabilitySubmit} className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label className="text-base font-medium text-gray-800 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-600" />
                        Check-in Date
                      </Label>
                      <Input
                        type="date"
                        name="checkInDate"
                        value={bookingData.checkInDate}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            checkInDate: e.target.value,
                          })
                        }
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label className="text-base font-medium text-gray-800 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-600" />
                        Check-out Date
                      </Label>
                      <Input
                        type="date"
                        name="checkOutDate"
                        value={bookingData.checkOutDate}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            checkOutDate: e.target.value,
                          })
                        }
                        required
                        min={bookingData.checkInDate || new Date().toISOString().split("T")[0]}
                        className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label className="text-base font-medium text-gray-800 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-600" />
                        Adults
                      </Label>
                      <Select
                        value={bookingData.numberOfAdults.toString()}
                        onValueChange={(value) =>
                          setBookingData({
                            ...bookingData,
                            numberOfAdults: Number.parseInt(value),
                          })
                        }
                      >
                        <SelectTrigger className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} Adult{num > 1 ? "s" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label className="text-base font-medium text-gray-800 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-600" />
                        Children
                      </Label>
                      <Select
                        value={bookingData.numberOfChildren.toString()}
                        onValueChange={(value) =>
                          setBookingData({
                            ...bookingData,
                            numberOfChildren: Number.parseInt(value),
                          })
                        }
                      >
                        <SelectTrigger className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Child" : "Children"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>

                  {bookingData.checkInDate && bookingData.checkOutDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-100 rounded-2xl p-8 mb-8"
                    >
                      <h3 className="text-xl font-medium  text-blue-900 mb-6">Booking Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Rate per night</span>
                          <span className="font-medium text-gray-900">
                            LKR {getCategoryForRoom(selectedRoom)?.price?.toLocaleString() || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Number of nights</span>
                          <span className="font-medium text-gray-900">
                            {Math.ceil(
                              (new Date(bookingData.checkOutDate) - new Date(bookingData.checkInDate)) /
                                (1000 * 60 * 60 * 24),
                            )}
                          </span>
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-medium text-red-600">Total Amount</span>
                            <span className="text-2xl font-medium text-red-600">
                              LKR {calculateTotalPrice().toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 h-14 text-base border-blue-300 hover:bg-blue-50 rounded-xl"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 h-14 text-base bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-medium"
                    >
                      Continue
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* Step 3: Personal Info */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-20"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-light font-serif text-blue-900 mb-4">Guest Information</h2>
                  <p className="text-lg text-blue-600">Please provide your details for the reservation</p>
                </div>

                <form onSubmit={handlePersonalSubmit} className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label className="text-base font-medium text-gray-800 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-600" />
                        First Name
                      </Label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                        placeholder="Enter your first name"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label className="text-base font-medium text-gray-800 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-600" />
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                        placeholder="Enter your last name"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label className="text-base font-medium text-gray-800 mb-4 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-gray-600" />
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                        placeholder="Enter your email"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label className="text-base font-medium text-gray-800 mb-4 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-gray-600" />
                        Phone Number
                      </Label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                        placeholder="Enter your phone number"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="md:col-span-2"
                    >
                      <Label className="text-base font-medium text-gray-800 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-600" />
                        Street Address
                      </Label>
                      <Input
                        type="text"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        required
                        className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                        placeholder="Enter your street address"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Label className="text-base font-medium text-gray-800 mb-4">Address Line 2 (Optional)</Label>
                      <Input
                        type="text"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                        className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                        placeholder="Apartment, suite, etc."
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Label className="text-base font-medium text-gray-800 mb-4">City</Label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                        placeholder="Enter your city"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Label className="text-base font-medium text-gray-800 mb-4">State/Province</Label>
                      <Input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                        placeholder="Enter your state/province"
                      />
                    </motion.div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1 h-14 text-base border-blue-300 hover:bg-gray-50 rounded-xl"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 h-14 text-base bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-medium"
                    >
                      Continue
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && selectedRoom && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-20"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-light font-serif text-blue-900 mb-4">Secure Payment</h2>
                  <p className="text-lg text-blue-600">Complete your reservation with confidence</p>
                </div>

                <form onSubmit={handleFinalSubmit} className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Payment Form */}
                    <div>
                      <h3 className="text-xl font-medium text-blue-900 mb-6">Payment Details</h3>
                      <div className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Label className="text-base font-medium text-gray-800 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-gray-600" />
                            Cardholder Name
                          </Label>
                          <Input
                            type="text"
                            name="fullName"
                            value={billingData.fullName}
                            onChange={handleBillingChange}
                            required
                            className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                            placeholder="Full name on card"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Label className="text-base font-medium text-gray-800 mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-gray-600" />
                            Card Number
                          </Label>
                          <Input
                            type="text"
                            name="cardNumber"
                            value={billingData.cardNumber}
                            onChange={handleBillingChange}
                            required
                            className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                            placeholder="1234 5678 9012 3456"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Label className="text-base font-medium text-gray-800 mb-4 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-gray-600" />
                            Billing Email
                          </Label>
                          <Input
                            type="email"
                            name="email"
                            value={billingData.email}
                            onChange={handleBillingChange}
                            required
                            className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                            placeholder="billing@example.com"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Label className="text-base font-medium text-gray-800 mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-gray-600" />
                            Billing Address
                          </Label>
                          <div className="space-y-4">
                            <Input
                              type="text"
                              name="address"
                              value={billingData.address}
                              onChange={handleBillingChange}
                              required
                              className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                              placeholder="Street address"
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <Input
                                type="text"
                                name="city"
                                value={billingData.city}
                                onChange={handleBillingChange}
                                required
                                className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                                placeholder="City"
                              />
                              <Input
                                type="text"
                                name="state"
                                value={billingData.state}
                                onChange={handleBillingChange}
                                required
                                className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                                placeholder="State"
                              />
                            </div>
                            <Input
                              type="text"
                              name="zip"
                              value={billingData.zip}
                              onChange={handleBillingChange}
                              required
                              className="h-14 text-base border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-400"
                              placeholder="ZIP Code"
                            />
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Booking Summary */}
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-blue-50 rounded-2xl p-8 sticky top-8"
                      >
                        <h3 className="text-xl font-medium text-blue-900 mb-6">Reservation Summary</h3>
                        <div className="space-y-4 mb-6">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Room</span>
                            <span className="font-medium text-gray-900 text-right">
                              {getCategoryForRoom(selectedRoom)?.name || "Room"} - Room {selectedRoom.roomNumber}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Check-in</span>
                            <span className="font-medium text-gray-900">
                              {new Date(bookingData.checkInDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Check-out</span>
                            <span className="font-medium text-gray-900">
                              {new Date(bookingData.checkOutDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Guests</span>
                            <span className="font-medium text-gray-900">
                              {bookingData.numberOfAdults} Adults
                              {bookingData.numberOfChildren > 0 && `, ${bookingData.numberOfChildren} Children`}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Nights</span>
                            <span className="font-medium text-gray-900">
                              {Math.ceil(
                                (new Date(bookingData.checkOutDate) - new Date(bookingData.checkInDate)) /
                                  (1000 * 60 * 60 * 24),
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="border-t border-black pt-6">
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-medium text-red-600">Total Amount</span>
                            <span className="text-2xl font-semibold text-red-600">
                              LKR {calculateTotalPrice().toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-12">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(3)}
                      className="flex-1 h-14 text-base border-blue-300 hover:bg-blue-50 rounded-xl"
                      disabled={submitting}
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 h-14 text-base bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-medium disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          Complete Reservation
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
