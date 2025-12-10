# 📡 API Documentation — Todo List

Complete API reference for Todo List application.

## Base URL

```
Development:  http://localhost:4000/api
Production:   https://proyecto-final-rqns.onrender.com/api
```

---

## 📋 Endpoints

### 1. GET /todos
Get all tasks.

**Request:**
```bash
curl http://localhost:4000/api/todos
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Comprar pan",
    "description": "Pan tajado blanco",
    "status": "pending",
    "created_at": "2025-12-10T10:30:00Z"
  },
  {
    "id": 2,
    "title": "Hacer ejercicio",
    "description": "30 minutos de cardio",
    "status": "completed",
    "created_at": "2025-12-09T15:45:00Z"
  }
]
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### 2. POST /todos
Create a new task.

**Request:**
```bash
curl -X POST http://localhost:4000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Comprar pan",
    "description": "Pan tajado blanco"
  }'
```

**Body (required):**
```json
{
  "title": "Comprar pan",              // string, required
  "description": "Pan tajado blanco"   // string, optional
}
```

**Response (201 Created):**
```json
{
  "id": 3,
  "title": "Comprar pan",
  "description": "Pan tajado blanco",
  "status": "pending",
  "created_at": "2025-12-10T11:20:00Z"
}
```

**Status Codes:**
- `201` - Task created
- `400` - Bad request (missing title)
- `500` - Server error

**Error Example (400):**
```json
{
  "error": "El título es obligatorio"
}
```

---

### 3. PUT /todos/:id
Update an existing task.

**Request:**
```bash
curl -X PUT http://localhost:4000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Comprar pan integral",
    "description": "Pan integral sin sal",
    "status": "completed"
  }'
```

**URL Parameters:**
- `id` - Task ID (integer, required)

**Body (optional):**
```json
{
  "title": "Comprar pan integral",         // string, optional
  "description": "Pan integral sin sal",   // string, optional
  "status": "completed"                    // "pending" | "completed", optional
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Comprar pan integral",
  "description": "Pan integral sin sal",
  "status": "completed",
  "created_at": "2025-12-10T10:30:00Z"
}
```

**Status Codes:**
- `200` - Task updated
- `404` - Task not found
- `500` - Server error

**Error Example (404):**
```json
{
  "error": "Tarea no encontrada"
}
```

---

### 4. DELETE /todos/:id
Delete a task.

**Request:**
```bash
curl -X DELETE http://localhost:4000/api/todos/1
```

**URL Parameters:**
- `id` - Task ID (integer, required)

**Response (200 OK):**
```json
{
  "message": "Tarea eliminada correctamente"
}
```

**Status Codes:**
- `200` - Task deleted
- `404` - Task not found
- `500` - Server error

**Error Example (404):**
```json
{
  "error": "Tarea no encontrada"
}
```

---

## 🔄 HTTP Methods

| Method | Purpose | Endpoint |
|--------|---------|----------|
| **GET** | Retrieve all tasks | `GET /todos` |
| **POST** | Create new task | `POST /todos` |
| **PUT** | Update existing task | `PUT /todos/:id` |
| **DELETE** | Delete task | `DELETE /todos/:id` |

---

## ✅ Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| **200** | OK | Successful GET, PUT, DELETE |
| **201** | Created | Successful POST |
| **400** | Bad Request | Invalid data or missing required fields |
| **404** | Not Found | Resource doesn't exist |
| **500** | Server Error | Internal server error |

---

## 📊 Data Model

### Task Object

```json
{
  "id": 1,
  "title": "Comprar pan",
  "description": "Pan tajado blanco",
  "status": "pending",
  "created_at": "2025-12-10T10:30:00Z"
}
```

**Fields:**
- `id` (integer) - Unique identifier
- `title` (string) - Task title (required, max 255 chars)
- `description` (string) - Task details (optional, max 1000 chars)
- `status` (string) - Task status: `pending` or `completed`
- `created_at` (ISO 8601) - Creation timestamp

---

## 🔗 Example Workflows

### Create and Complete a Task

**1. Create task:**
```bash
curl -X POST http://localhost:4000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Comprar leche",
    "description": "Leche entera 1L"
  }'
```

Response:
```json
{
  "id": 4,
  "title": "Comprar leche",
  "description": "Leche entera 1L",
  "status": "pending",
  "created_at": "2025-12-10T12:00:00Z"
}
```

**2. Update to completed:**
```bash
curl -X PUT http://localhost:4000/api/todos/4 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

Response:
```json
{
  "id": 4,
  "title": "Comprar leche",
  "description": "Leche entera 1L",
  "status": "completed",
  "created_at": "2025-12-10T12:00:00Z"
}
```

**3. Delete task:**
```bash
curl -X DELETE http://localhost:4000/api/todos/4
```

Response:
```json
{
  "message": "Tarea eliminada correctamente"
}
```

---

## 🧪 Testing with curl

### Get all tasks
```bash
curl http://localhost:4000/api/todos
```

### Create a task
```bash
curl -X POST http://localhost:4000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi tarea",
    "description": "Descripción"
  }'
```

### Update a task
```bash
curl -X PUT http://localhost:4000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

### Delete a task
```bash
curl -X DELETE http://localhost:4000/api/todos/1
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- All requests must include `Content-Type: application/json` header
- The API uses standard HTTP status codes
- Errors are returned as JSON objects with `error` field
- Database automatically creates `created_at` timestamp

---

**API Version**: 1.0  
**Last Updated**: December 10, 2025
