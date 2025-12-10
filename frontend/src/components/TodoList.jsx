import React from "react"
import TodoItem from "./TodoItem"
import "../styles/list.css"

export default function TodoList({ todos, onUpdate, onDelete, onEdit }) {
  if (!Array.isArray(todos) || todos.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 No hay tareas. ¡Crea una!</p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map(t => (
        <TodoItem 
          key={t.id} 
          todo={t} 
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
