import React, { useState, useEffect } from "react"
import api from "../services/api"
import "../styles/form.css"

export default function TodoForm({ onSuccess, editingTodo = null }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title)
      setDescription(editingTodo.description || "")
    } else {
      setTitle("")
      setDescription("")
    }
  }, [editingTodo])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!title.trim()) {
      setError("El título es obligatorio")
      return
    }

    try {
      setLoading(true)
      if (editingTodo) {
        await api.put(`/todos/${editingTodo.id}`, { title, description })
      } else {
        await api.post("/todos", { title, description, status: "pending" })
      }
      setTitle("")
      setDescription("")
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.error || "Error al guardar tarea")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>{editingTodo ? "Editar Tarea" : "+ Nueva Tarea"}</h2>
      {error && <p className="error-message">{error}</p>}
      
      <input
        type="text"
        placeholder="Título *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
        required
      />
      
      <textarea
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea-field"
        rows="3"
      />
      
      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? "Guardando..." : editingTodo ? "Actualizar" : "Crear Tarea"}
      </button>
    </form>
  )
}
