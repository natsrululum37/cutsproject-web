import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Service endpoints
export const getServices = async () => {
  const response = await axios.get(`${API_URL}/services`)
  return response.data
}

export const getServiceById = async (id) => {
  const response = await axios.get(`${API_URL}/services/${id}`)
  return response.data
}

// Gallery endpoints
export const getGalleryItems = async () => {
  const response = await axios.get(`${API_URL}/gallery`)
  return response.data
}

// Review endpoints
export const getReviews = async () => {
  const response = await axios.get(`${API_URL}/reviews`)
  return response.data
}

export const createReview = async (reviewData) => {
  const response = await axios.post(`${API_URL}/reviews`, reviewData)
  return response.data
}

// Booking endpoints
export const createBooking = async (bookingData) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData)
  return response.data
}

export const checkAvailability = async (date, serviceId) => {
  const response = await axios.get(`${API_URL}/bookings/check-availability`, {
    params: { date, serviceId },
  })
  return response.data
}
