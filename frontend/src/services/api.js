import axios from "axios"

// Normaliza la URL de la API: usa VITE_API_URL si existe, si no, Render
const API_URL = (import.meta.env.VITE_API_URL || "https://proyecto-final-rqns.onrender.com")
  .replace(/\/+$/, "") // quita barras finales para evitar "//api"

const api = axios.create({
  baseURL: `${API_URL}/api`
})

export default api
