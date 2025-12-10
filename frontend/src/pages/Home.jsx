import React, { useEffect, useState } from "react"
import TodoList from "../components/TodoList"
import TodoForm from "../components/TodoForm"
import api from "../services/api"
import "../styles/home.css"

export default function Home() {
  const [todos, setTodos] = useState([])
  const [editingTodo, setEditingTodo] = useState(null)

  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos")
      setTodos(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error("Error fetching todos:", err)
      setTodos([])
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleSuccess = () => {
    setEditingTodo(null)
    fetchTodos()
  }

  const handleEdit = (todo) => {
    setEditingTodo(todo)
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="header">
          <h1>Gestor de Tareas</h1>
          <p>Organiza tu día, completa tus metas</p>
        </div>
        
        <TodoForm onSuccess={handleSuccess} editingTodo={editingTodo} />
        
        <TodoList 
          todos={todos} 
          onUpdate={fetchTodos}
          onDelete={fetchTodos}
          onEdit={handleEdit}
        />
      </div>
    </div>
  )
}
