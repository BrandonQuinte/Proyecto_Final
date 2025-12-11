import React from "react"
import api from "../services/api"
import "../styles/item.css"

export default function TodoItem({ todo, onUpdate, onDelete, onEdit }) {
  const handleToggleStatus = async () => {
    try {
      const newStatus = todo.status === "completed" ? "pending" : "completed"
      await api.put(`/todos/${todo.id}`, { status: newStatus })
      onUpdate()
    } catch (err) {
      console.error("Error al actualizar estado:", err)
    }
  }

  const handleDelete = async () => {
    if (!confirm("¿Eliminar esta tarea?")) return
    try {
      await api.delete(`/todos/${todo.id}`)
      onDelete()
    } catch (err) {
      console.error("Error al eliminar:", err)
    }
  }

  return (
    <li className={`todo-item ${todo.status}`}>
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.description && <p className="todo-description">{todo.description}</p>}
        <div className="todo-meta">
          <span className={`status-badge ${todo.status}`}>
            {todo.status === "completed" ? "✓ Completada" : "◐ Pendiente"}
          </span>
          <span className="todo-date">
            {new Date(todo.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="todo-actions">
        <button onClick={handleToggleStatus} className="btn-toggle">
          {todo.status === "completed" ? "↷ Pendiente" : "✓ Completar"}
        </button>
        <button onClick={() => onEdit(todo)} className="btn-edit">
           Editar
        </button>
        <button onClick={handleDelete} className="btn-delete">
           Eliminar
        </button>
      </div>
    </li>
  )
}
