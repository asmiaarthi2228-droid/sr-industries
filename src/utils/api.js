import axios from 'axios'

export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

// Set up Axios default baseURL if VITE_API_URL is provided
if (API_URL) {
  axios.defaults.baseURL = API_URL
}
