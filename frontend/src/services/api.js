import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "https://proyecto-final-rqns.onrender.com/"

const api = axios.create({
  baseURL: `${API_URL}/api`
})

export default api
