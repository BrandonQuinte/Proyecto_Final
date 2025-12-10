# 🏗️ Arquitectura del Sistema

## 📐 Diagrama C4 Nivel 1 (Contexto del Sistema)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                  INTERNET                                   │
└────────────┬────────────────────────────────────┬──────────────┬────────────┘
             │                                    │              │
             │ HTTPS                              │ HTTPS        │ Git Push
             │                                    │              │
     ┌───────▼──────────┐            ┌─────────────▼────┐   ┌───▼──────────┐
     │                  │            │                  │   │              │
     │  USER/BROWSER    │            │   VCS (GitHub)   │   │  Developers  │
     │  - PC            │            │   - Repository   │   │              │
     │  - Mobile        │            │   - Actions      │   │              │
     │  - Tablet        │            │                  │   │              │
     │                  │            │                  │   │              │
     └────────┬─────────┘            └──────────────────┘   └──────────────┘
              │
              │ HTTPS: JSON API
              │
    ┌─────────▼────────────────────────────────────────────────┐
    │                                                          │
    │  PROYECTO_FINAL FULLSTACK APPLICATION                    │
    │  ┌────────────────────────────────────────────────┐      │
    │  │         VERCEL (FRONTEND)                      │      │
    │  │  - React 18.2 + Vite 5                         │      │
    │  │  - Responsive UI (Mobile/Desktop)              │      │
    │  │  - Binance-Inspired Design                     │      │
    │  │  URL: proyecto-final-9z34.vercel.app           │      │
    │  └───────────────────────┬────────────────────────┘      │
    │                          │                               │
    │                          │ API REST Calls (Axios)        │
    │                          │ Endpoint: /api/todos          │
    │                          │                               │
    │  ┌───────────────────────▼────────────────────────┐      │
    │  │         RENDER (BACKEND)                       │      │
    │  │  - Node.js 20 + Express 4.18                   │      │
    │  │  - REST API CRUD                               │      │
    │  │  - Business Logic & Validation                 │      │
    │  │  - CORS Enabled                                │      │
    │  │  URL: proyecto-final-rqns.onrender.com         │      │
    │  └───────────────────────┬────────────────────────┘      │  
    │                          │                               │
    │                          │ MySQL Connection (SSL)        │
    │                          │ Sequelize ORM                 │
    │                          │                               │
    │  ┌───────────────────────▼────────────────────────┐      │
    │  │       MYSQL DATABASE (RENDER)                  │      │
    │  │  - Database: todos_db                          │      │
    │  │  - Table: todos                                │      │
    │  │  - Backups: Automatic                          │      │
    │  └────────────────────────────────────────────────┘      │
    │                                                          │
    └──────────────────────────────────────────────────────────┘
```

---

## 📐 Diagrama C4 Nivel 2 (Contenedores & Componentes)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                            PROYECTO FINAL FULLSTACK                          │
│                                                                              │
│  ┌─────────────────────────────────────┐  ┌──────────────────────────────┐   │
│  │     FRONTEND CONTAINER              │  │   CI/CD CONTAINER            │   │
│  │  (React Application - Vercel)       │  │   (GitHub Actions)           │   │
│  │                                     │  │                              │   │
│  │  ┌──────────────────────────────┐   │  │  ┌──────────────────────────┐│   │
│  │  │  Presentation Layer          │   │  │  │ Trigger: git push master ││   │
│  │  │  ├─ Home.jsx (Main Page)     │   │  │  │                          ││  │
│  │  │  ├─ TodoList.jsx             │   │  │  │ 1. Checkout código       ││  │
│  │  │  ├─ TodoForm.jsx             │   │  │  │ 2. Setup Node.js 20      ││  │
│  │  │  ├─ TodoItem.jsx             │   │  │  │ 3. npm install (FE)      ││  │
│  │  │  └─ App.jsx                  │   │  │  │ 4. npm run build         ││  │
│  │  └──────────────────────────────┘   │  │  │ 5. Deploy to gh-pages    ││  │
│  │                                     │  │  │                          ││  │
│  │  ┌──────────────────────────────┐   │  │  │ ↓ Trigger auto-deploy:   ││  │
│  │  │  Business Logic Layer         │  │  │  │ - Vercel                 ││  │
│  │  │  ├─ useState hooks            │  │  │  │ - Render                 ││  │
│  │  │  ├─ useEffect (API calls)     │  │  │  │                          ││  │
│  │  │  ├─ Form validation           │  │  │  └──────────────────────────┘│  │
│  │  │  └─ State management          │  │  │                              │  │
│  │  └──────────────────────────────┘   │  └──────────────────────────────┘  │
│  │                                     │                                     │
│  │  ┌──────────────────────────────┐   │                                     │
│  │  │  Service Layer (api.js)       │  │                                     │
│  │  │  ├─ Axios HTTP Client         │  │                                     │
│  │  │  ├─ baseURL: VITE_API_URL     │  │                                     │
│  │  │  ├─ GET /api/todos            │  │                                     │
│  │  │  ├─ POST /api/todos           │  │                                     │
│  │  │  ├─ PUT /api/todos/:id        │  │                                     │
│  │  │  └─ DELETE /api/todos/:id     │  │                                     │
│  │  └──────────────────────────────┘   │                                     │
│  │                                     │                                     │
│  │  ┌──────────────────────────────┐   │                                     │
│  │  │  Styles Layer                │   │                                     │
│  │  │  ├─ index.css (Global)       │   │                                     │
│  │  │  ├─ home.css                 │   │                                     │
│  │  │  ├─ form.css                 │   │                                     │
│  │  │  ├─ list.css                 │   │                                     │
│  │  │  └─ item.css                 │   │                                     │
│  │  └──────────────────────────────┘   │                                     │
│  │                                     │                                     │
│  │  🔧 Tech Stack:                    │                                     │
│  │  - React 18.2, Vite 5, Axios        │                                     │
│  │  - CSS3 + Binance Design            │                                     │
│  │  - Port: 5173 (dev), Vercel (prod)  │                                     │
│  └─────────────────────────────────────┘                                     │
│           │                                                                  │
│           │ HTTPS Requests (JSON)                                            │
│           │ https://proyecto-final-rqns.onrender.com/api                     │
│           ▼                                                                  │
│  ┌─────────────────────────────────────┐  ┌──────────────────────────────┐   │
│  │     BACKEND CONTAINER               │  │   DATABASE CONTAINER         │   │
│  │  (Node.js API - Render)             │  │   (MySQL - Render)           │   │
│  │                                     │  │                              │   │
│  │  ┌──────────────────────────────┐   │  │  ┌──────────────────────────┐│   │
│  │  │  HTTP Server (Express)       │   │  │  │ Database: todos_db       ││   │
│  │  │  ├─ CORS Middleware          │   │  │  │                          ││   │
│  │  │  ├─ JSON Parser              │   │  │  │ Tables:                  ││   │
│  │  │  ├─ Error Handler            │   │  │  │ ┌──────────────────────┐ ││   │
│  │  │  └─ Routes Handler           │   │  │  │ │ todos                │ ││   │
│  │  └──────────────────────────────┘   │  │  │ │ ├─ id (PK)           │ ││   │
│  │           │                         │  │  │ │ ├─ title (VARCHAR)   │ ││   │
│  │           ├─ /api/todos (GET)       │  │  │ │ ├─ description       │ ││   │
│  │           ├─ /api/todos (POST)      │  │  │ │ ├─ status (ENUM)     │ ││   │
│  │           ├─ /api/todos/:id (PUT)   │  │  │ │ ├─ created_at        │ ││   │
│  │           └─ /api/todos/:id (DEL)   │  │  │ │ └─ updated_at        │ ││   │
│  │                                     │  │  │ └──────────────────────┘ ││   │
│  │  ┌──────────────────────────────┐   │  │  │                          ││   │
│  │  │  Route Layer (routes/)        │  │  │  │ Indexes:                 ││   │
│  │  │  ├─ todos.js                  │  │  │  │ - PRIMARY KEY (id)       ││   │
│  │  │  └─ Request routing           │  │  │  │ - created_at             ││   │
│  │  └──────────────────────────────┘   │  │  └──────────────────────────┘│   │
│  │                                     │  │                              │   │
│  │  ┌──────────────────────────────┐   │  │  Connection:                 │   │
│  │  │  Controller Layer            │   │  │  - SSL/TLS Enabled           │   │
│  │  │  (todosController.js)        │   │  │  - Sequelize ORM             │   │
│  │  │  ├─ getTodos()               │   │  │  - Connection Pool           │   │
│  │  │  ├─ createTodo()             │   │  │  - Auto backups              │   │
│  │  │  ├─ updateTodo()             │   │  │                              │   │
│  │  │  └─ deleteTodo()             │   │  └──────────────────────────────┘   │
│  │  └──────────────────────────────┘   │                                     │
│  │                                     │                                     │
│  │  ┌──────────────────────────────┐   │                                     │
│  │  │  Model Layer (Sequelize)     │   │                                     │
│  │  │  ├─ todoModel.js             │   │                                     │
│  │  │  ├─ db.js (config)           │   │                                     │
│  │  │  └─ Query builder            │   │                                     │
│  │  └──────────────────────────────┘   │                                     │
│  │                                     │                                     │
│  │  🔧 Tech Stack:                     │                                     │
│  │  - Node.js 20, Express 4.18         │                                     │
│  │  - Sequelize 6.37, MySQL2 3.15      │                                     │
│  │  - Port: 4000 (dev), Render (prod)  │                                     │
│  └─────────────────────────────────────┘                                     │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Frontend (React + Vite)
```
📦 Tecnologías:
├── React 18.2        → Librería UI component-based
├── Vite 5.0          → Build tool ultra-rápido (ES modules)
├── Axios             → Cliente HTTP para llamadas API
├── CSS 3             → Estilos (sin preprocesador)
└── JavaScript ES2022 → Lenguaje

📁 Estructura:
├── components/       → Componentes reutilizables (TodoForm, TodoItem, TodoList)
├── pages/           → Páginas (Home)
├── services/        → Integración API (Axios client)
├── styles/          → CSS modular (home.css, form.css, etc)
└── App.jsx          → Componente raíz
```

**Características Clave:**
- ✅ Hot Module Replacement (HMR)
- ✅ Build ultra optimizado
- ✅ Tree-shaking automático
- ✅ Dynamic imports para code-splitting
- ✅ Soporte nativo para CSS modules

### Backend (Node.js + Express)
```
📦 Tecnologías:
├── Node.js 20       → Runtime JavaScript servidor
├── Express 4.18     → Framework web minimalista
├── Sequelize 6.37   → ORM para MySQL
├── MySQL2 3.15      → Driver MySQL nativo
├── CORS             → Seguridad cross-origin
├── Dotenv           → Variables de entorno
└── body-parser      → Middleware JSON

📁 Estructura:
├── config/          → Configuración (db.js)
├── controllers/     → Lógica de negocio
├── models/          → Modelos Sequelize
├── routes/          → Definición de rutas
└── scripts/         → Seed data, migrations
```

**Características Clave:**
- ✅ Middleware CORS para acceso desde Vercel
- ✅ Validación de entrada
- ✅ Manejo de errores centralizado
- ✅ Respuestas JSON consistentes
- ✅ Logging de operaciones

## 📊 Modelo de Datos (Database Schema)

### Diagrama ER (Entity-Relationship)

```
┌─────────────────────────────────────────────┐
│                   todos                     │
├─────────────────────────────────────────────┤
│ PK │ id           │ BIGINT AUTO_INCREMENT   │
├────┼──────────────┼────────────────────────┤
│    │ title        │ VARCHAR(255) NOT NULL  │
├────┼──────────────┼────────────────────────┤
│    │ description  │ TEXT NULL              │
├────┼──────────────┼────────────────────────┤
│    │ status       │ ENUM('pending',        │
│    │              │ 'completed')           │
│    │              │ DEFAULT 'pending'      │
├────┼──────────────┼────────────────────────┤
│    │ created_at   │ TIMESTAMP              │
│    │              │ DEFAULT NOW()          │
├────┼──────────────┼────────────────────────┤
│    │ updated_at   │ TIMESTAMP              │
│    │              │ ON UPDATE NOW()        │
└────┴──────────────┴────────────────────────┘

Indexes:
├─ PRIMARY KEY (id)
└─ INDEX (created_at)
```

### Definición SQL

```sql
CREATE TABLE todos (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_created_at (created_at),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Tipos de Datos y Restricciones

| Campo | Tipo | Tamaño | Restricciones | Descripción |
|-------|------|--------|---------------|------------|
| **id** | BIGINT | 8 bytes | PK, AUTO_INC | Identificador único |
| **title** | VARCHAR | 255 chars | NOT NULL | Título de la tarea (requerido) |
| **description** | TEXT | 65KB | NULL | Detalles de la tarea (opcional) |
| **status** | ENUM | 1 byte | DEFAULT 'pending' | Estado: pending\|completed |
| **created_at** | TIMESTAMP | 4 bytes | DEFAULT NOW() | Fecha de creación (automática) |
| **updated_at** | TIMESTAMP | 4 bytes | ON UPDATE NOW() | Fecha de actualización (automática) |

### Ejemplo de Registros

```json
[
  {
    "id": 1,
    "title": "Comprar pan",
    "description": "Pan tajado blanco, 2 unidades",
    "status": "pending",
    "created_at": "2025-12-10T08:30:00Z",
    "updated_at": "2025-12-10T08:30:00Z"
  },
  {
    "id": 2,
    "title": "Hacer ejercicio",
    "description": "30 minutos de cardio en la mañana",
    "status": "completed",
    "created_at": "2025-12-09T07:15:00Z",
    "updated_at": "2025-12-09T18:45:00Z"
  },
  {
    "id": 3,
    "title": "Estudiar SQL",
    "description": null,
    "status": "pending",
    "created_at": "2025-12-10T10:00:00Z",
    "updated_at": "2025-12-10T10:00:00Z"
  }
]
```

---

## 🔄 Flujo Detallado: Crear una Nueva Tarea

### Diagrama Secuencial (Step-by-Step)

```
┌───────────────┐                                                    ┌──────────────┐
│   USUARIO     │                                                    │  SISTEMA     │
│   (Browser)   │                                                    │              │
└───────────────┘                                                    └──────────────┘
        │                                                                   │
        │ 1. Escribe "Comprar leche"                                       │
        │ en input field                                                   │
        ├──────────────────────────────────────────────────────────────→  │
        │    (onChange event en TodoForm)                                 │
        │                                                                  │ Frontend
        │                                                    actualiza     │ React
        │ ← ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
        │    setState({ title: "Comprar leche" })                        │
        │                                                                  │
        │ 2. Click en botón "+" (Submit)                                 │
        ├──────────────────────────────────────────────────────────────→  │
        │    (handleSubmit triggered)                                    │
        │                                                                  │
        │                                    Validación local             │
        │ ← ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
        │    if (!title.trim()) return;                                  │
        │                                                                  │
        │ 3. API Request:                                                │
        │    POST /api/todos                                             │
        │    {                                                            │
        │      "title": "Comprar leche",                                 │
        │      "description": ""                                         │
        │    }                                                            │
        ├──────────────────────────────────────────────────────────────→  │
        │    (axios.post via VITE_API_URL)                              │
        │                                                                  │
        │                                        ┌────────────────────┐  │
        │                                        │  RENDER BACKEND    │  │
        │                                        │  Express Server    │  │
        │                                        └────────────────────┘  │
        │                                                 │               │
        │                                        │ Routes/todos.js      │
        │                                        │ POST handler         │
        │                                        └────────────────────┘  │
        │                                                 │               │
        │                                        │ Controller:          │
        │                                        │ createTodo()         │
        │                                        │ ✓ Validar título    │
        │                                        │ ✓ Sanitizar datos   │
        │                                        └────────────────────┘  │
        │                                                 │               │
        │                                        │ Model (Sequelize):   │
        │                                        │ Todo.create({...})   │
        │                                        └────────────────────┘  │
        │                                                 │               │
        │                                        │ ┌──────────────────┐ │
        │                                        │ │   MYSQL DB       │ │
        │                                        │ │                  │ │
        │                                        │ │ INSERT INTO      │ │
        │                                        │ │ todos VALUES...  │ │
        │                                        │ │                  │ │
        │                                        │ │ id: 42           │ │
        │                                        │ │ (auto-generated) │ │
        │                                        │ └──────────────────┘ │
        │                                        └────────────────────┘  │
        │                                                 │               │
        │ 4. API Response (201 Created):                                │
        │    {                                                           │
        │      "id": 42,                                                │
        │      "title": "Comprar leche",                                │
        │      "description": "",                                        │
        │      "status": "pending",                                     │
        │      "created_at": "2025-12-10T12:00:00Z"                    │
        │    }                                                           │
        │ ←──────────────────────────────────────────────────────────── │
        │                                                                │
        │ ← ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
        │    Frontend React:                                             │
        │    - setState({ todos: [...todos, newTodo] })                │
        │    - Limpiar formulario (form reset)                          │
        │    - Re-render lista con nueva tarea                          │
        │                                                                │
        │ 5. UI Update - Nueva tarea visible                            │
        │    en lista con:                                              │
        │    - [✓] Comprar leche                                        │
        │    - [Editar] [Eliminar]                                      │
        │                                                                │
        │ ✅ LISTO                                                       │
        │                                                                │
```

### Detalles de Cada Etapa

#### **Etapa 1: Input & Validación (Frontend)**
```javascript
// TodoForm.jsx
const [title, setTitle] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // ✓ Validación local
  if (!title.trim()) {
    alert('El título es requerido');
    return;
  }
  
  // Proceder a API call
  await createTodo({ title });
};
```

#### **Etapa 2: API Call (Axios)**
```javascript
// services/api.js
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const createTodo = (data) => {
  return API.post('/todos', {
    title: data.title,
    description: data.description || ''
  });
};

// Response interceptor
API.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error);
    throw error;
  }
);
```

#### **Etapa 3: Backend Processing (Express)**
```javascript
// routes/todos.js
router.post('/', todoController.createTodo);

// controllers/todosController.js
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // ✓ Validar título
    if (!title || title.trim() === '') {
      return res.status(400).json({ 
        error: 'El título es obligatorio' 
      });
    }
    
    // ✓ Crear en BD
    const todo = await Todo.create({
      title: title.trim(),
      description: description || null,
      status: 'pending'
    });
    
    // ✓ Responder con tarea creada
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error creando tarea' 
    });
  }
};
```

#### **Etapa 4: Database Insert (MySQL)**
```sql
-- Sequelize genera esto automáticamente
INSERT INTO todos (title, description, status, created_at, updated_at)
VALUES ('Comprar leche', NULL, 'pending', NOW(), NOW());

-- MySQL retorna el ID generado: 42
```

#### **Etapa 5: Frontend State Update**
```javascript
// Home.jsx
const [todos, setTodos] = useState([]);

const handleAddTodo = async (newTodo) => {
  try {
    const response = await createTodo(newTodo);
    
    // ✓ Actualizar estado local
    setTodos([...todos, response]);
    
    // ✓ Limpiar formulario
    setFormData({ title: '', description: '' });
    
    // ✓ UI se re-renderiza automáticamente
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Timeline Total

```
┌─────────────────────────────────────────────────────────────┐
│ FASE                    │ TIEMPO  │ DETALLES                │
├─────────────────────────┼─────────┼────────────────────────┤
│ Input local + validación│ ~5ms    │ JavaScript sync        │
│ Request HTTP (HTTPS)    │ ~100ms  │ Network latency        │
│ Backend processing      │ ~50ms   │ Express + validation   │
│ Database INSERT         │ ~30ms   │ MySQL query            │
│ Response HTTP           │ ~50ms   │ Network return         │
│ Frontend state update   │ ~10ms   │ React setState         │
│ DOM re-render           │ ~20ms   │ React reconciliation   │
├─────────────────────────┼─────────┼────────────────────────┤
│ TOTAL                   │ ~265ms  │ User sees new task     │
└─────────────────────────────────────────────────────────────┘
```

### Error Handling

Si algo falla en cualquier etapa:

```
Frontend error (validación):
→ Muestra alert local
→ No envía request
→ Usuario puede reintentar

Backend error (validación):
→ Responde 400 Bad Request
→ Frontend muestra error
→ Usuario corrige y reinten...

Database error:
→ Responde 500 Server Error
→ Frontend muestra "Error del servidor"
→ Backend loguea el error
→ Admin puede revisar logs en Render
```

### 2. Obtener Tareas

```mermaid
graph LR
    A[Component mounted] -->|useEffect| B[GET /api/todos]
    B -->|HTTP Request| C[Express Backend]
    C -->|Sequelize SELECT| D[(Database)]
    D -->|Datos MySQL| E[Response 200]
    E -->|JSON Array| F[Frontend State]
    F -->|map render| G[TodoItem components]
    G -->|DOM| H[Pantalla usuario]
```

**Secuencia:**
1. Home.jsx monta
2. useEffect dispara GET
3. Backend consulta todos registros
4. Retorna array JSON
5. Frontend guarda en estado
6. Re-renderiza lista

### 3. Actualizar Tarea

```mermaid
graph LR
    A[Click edit btn] -->|TodoItem| B[Form mode]
    B -->|pre-fill fields| C[User edits]
    C -->|Submit| D[PUT /api/todos/id]
    D -->|JSON updates| E[Express Backend]
    E -->|Sequelize UPDATE| F[(Database)]
    F -->|Success| G[Response 200]
    G -->|Updated Task| H[Frontend State]
    H -->|re-render| I[Task updated]
```

**Secuencia:**
1. Click en icono editar
2. Form se rellena con datos actuales
3. Usuario modifica campos
4. Submit envía PUT con ID
5. Backend valida y actualiza
6. MySQL guarda cambios
7. Retorna objeto actualizado
8. Frontend actualiza UI

### 4. Eliminar Tarea

```mermaid
graph LR
    A[Click delete btn] -->|Confirm?| B{User confirms}
    B -->|Sí| C[DELETE /api/todos/id]
    C -->|axios| D[Express Backend]
    D -->|Sequelize destroy| E[(Database)]
    E -->|DELETE MySQL| F[Response 200]
    F -->|Success message| G[Frontend update]
    G -->|filter state| H[Remove from list]
    B -->|No| I[Cancel]
```

**Secuencia:**
1. Usuario confirma eliminación
2. Frontend envía DELETE con ID
3. Backend valida que existe
4. MySQL elimina registro
5. Retorna confirmación
6. Frontend remueve de lista
7. UI se actualiza

---

## 🔐 Seguridad

### Frontend
- ✅ HTTPS obligatorio en Vercel
- ✅ CORS prevención de XSS
- ✅ Validación local de inputs
- ✅ No almacenar datos sensibles

### Backend
- ✅ CORS whitelist (solo Vercel)
- ✅ Validación de entrada
- ✅ SQL Injection prevention (Sequelize)
- ✅ Error handling sin leaks
- ✅ Rate limiting recomendado (en producción)

### Base de Datos
- ✅ Conexión encriptada (SSL)
- ✅ Variables de entorno protegidas
- ✅ No exponer DATABASE_URL
- ✅ Backups automáticos (Render)

---

## 📡 API REST - Contrato

### Request/Response Pattern

**Solicitud:**
```http
POST /api/todos HTTP/1.1
Host: proyecto-final-rqns.onrender.com
Content-Type: application/json
Origin: https://proyecto-final-9z34.vercel.app

{
  "title": "Comprar pan",
  "description": "Pan integral"
}
```

**Respuesta:**
```http
HTTP/1.1 201 Created
Content-Type: application/json
Access-Control-Allow-Origin: https://proyecto-final-9z34.vercel.app

{
  "id": 3,
  "title": "Comprar pan",
  "description": "Pan integral",
  "status": "pending",
  "created_at": "2025-12-10T11:20:00Z"
}
```

---

## 🚀 Pipeline CI/CD Detallado

### Workflow Automático (GitHub Actions)

```
┌────────────────────────────────────────────────────────────────────────────┐
│                  DEVELOPER WORKFLOW & AUTOMATION                           │
│                                                                            │
│  ┌──────────────────────────────┐                                          │
│  │ 1. DEVELOPER COMMITS CODE    │                                          │
│  │ ──────────────────────────── │                                          │
│  │ $ git add .                  │                                          │
│  │ $ git commit -m "feat: ..."  │                                          │
│  │ $ git push origin master     │                                          │
│  └────────────┬─────────────────┘                                          │
│               │ Push to GitHub                                             │
│               ▼                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │           GITHUB ACTIONS WORKFLOW TRIGGERED                          │  │
│  │           (.github/workflows/ci.yml)                                 │  │
│  │                                                                      │  │
│  │  Trigger: on: push: branches: [master]                               │  │
│  │  Runner: ubuntu-latest                                               │  │
│  │                                                                      │  │
│  │  ┌──────────────────────────────────────────────────────────────┐    │  │
│  │  │ Step 1: Checkout Repository                                  │    │  │
│  │  │ ───────────────────────────────────────────────────────────  │    │  │
│  │  │ Action: actions/checkout@v4                                  │    │  │
│  │  │ Purpose: Descargar código del repositorio                    │    │  │
│  │  │ Time: ~2 segundos                                            │    │  │
│  │  └──────────────────────────────────────────────────────────────┘    │  │
│  │                                                                      │  │
│  │  ┌──────────────────────────────────────────────────────────────┐    │  │
│  │  │ Step 2: Setup Node.js Environment                           │     │  │
│  │  │ ─────────────────────────────────────────────────────────── │     │  │
│  │  │ Action: actions/setup-node@v4                               │     │  │
│  │  │ Config: node-version: '20'                                  │     │  │
│  │  │        cache: 'npm'                                         │     │  │
│  │  │ Purpose: Instalar Node.js 20 y caché de npm                 │     │  │
│  │  │ Time: ~5-10 segundos                                        │     │  │
│  │  └──────────────────────────────────────────────────────────────┘    │  │
│  │                                                                      │  │
│  │  ┌──────────────────────────────────────────────────────────────┐    │  │
│  │  │ Step 3: Install Frontend Dependencies                        │    │  │
│  │  │ ───────────────────────────────────────────────────────────  │    │  │
│  │  │ Command: cd frontend && npm install                          │    │  │
│  │  │ Purpose: Descargar paquetes npm (React, Vite, etc)           │    │  │
│  │  │ Time: ~30-40 segundos                                        │    │  │
│  │  │ Cache: Utiliza caché de GitHub si nada cambió                │    │  │
│  │  │ Output: Instala:                                             │    │  │
│  │  │   - react@18.2                                               │    │  │
│  │  │   - vite@5.0                                                 │    │  │
│  │  │   - axios                                                    │    │  │
│  │  │   + 50+ dependencias más                                     │    │  │
│  │  └──────────────────────────────────────────────────────────────┘    │  │
│  │                                                                      │  │
│  │  ┌──────────────────────────────────────────────────────────────┐    │  │
│  │  │ Step 4: Build Frontend Application                           │    │  │
│  │  │ ───────────────────────────────────────────────────────────  │    │  │
│  │  │ Command: npm run build                                       │    │  │
│  │  │ Config: VITE_BASE_PATH=/Proyecto_Final/                      │    │  │
│  │  │ Purpose: Compilar React a HTML/CSS/JS optimizado             │    │  │
│  │  │ Time: ~15-25 segundos                                        │    │  │
│  │  │                                                              │    │  │
│  │  │ Vite Process:                                                │    │  │
│  │  │ 1. Transpila JSX → JavaScript                                │    │  │
│  │  │ 2. Minifica CSS y JS                                         │    │  │
│  │  │ 3. Tree-shaking (elimina código no usado)                    │    │  │
│  │  │ 4. Crea source maps para debugging                           │    │  │
│  │  │ 5. Output: ./dist/ folder (~100-150KB gzipped)               │    │  │
│  │  │                                                              │    │  │
│  │  │ Output Files:                                                │    │  │
│  │  │ ├─ dist/index.html                                           │    │  │
│  │  │ ├─ dist/assets/index-xxxxx.js                                │    │  │
│  │  │ └─ dist/assets/index-xxxxx.css                               │    │  │
│  │  └──────────────────────────────────────────────────────────────┘    │  │
│  │                                                                      │  │
│  │  ┌──────────────────────────────────────────────────────────────┐    │  │
│  │  │ Step 5: Deploy to GitHub Pages                               │    │  │
│  │  │ ───────────────────────────────────────────────────────────  │    │  │
│  │  │ Action: peaceiris/actions-gh-pages@v3                        │    │  │
│  │  │ Purpose: Subir ./dist a rama gh-pages                        │    │  │
│  │  │ Time: ~5-10 segundos                                         │    │  │
│  │  │                                                              │    │  │
│  │  │ Process:                                                     │    │  │
│  │  │ 1. Crea/actualiza rama gh-pages                              │    │  │
│  │  │ 2. Copia contenido de dist/                                  │    │  │
│  │  │ 3. Hace commit en gh-pages                                   │    │  │
│  │  │ 4. GitHub Pages detecta cambios                              │    │  │
│  │  │ 5. Publica en: brandonquinte.github.io/Proyecto_Final/       │    │  │
│  │  │                                                              │    │  │
│  │  │ Result: 🟢 GitHub Pages DEPLOYED                            │    │  │
│  │  │ URL: https://brandonquinte.github.io/Proyecto_Final/         │    │  │
│  │  └──────────────────────────────────────────────────────────────┘    │  │
│  │                                                                      │  │
│  │  ┌──────────────────────────────────────────────────────────────┐    │  │
│  │  │ Step 6: Monitor Auto-Deployments                             │    │  │
│  │  │ ───────────────────────────────────────────────────────────  │    │  │
│  │  │ Vercel (watching master):                                    │    │  │
│  │  │   • Detecta nuevo push                                       │    │  │
│  │  │   • Ejecuta build: cd frontend && npm install && npm build   │    │  │
│  │  │   • Deploy a CDN global                                      │    │  │
│  │  │   • URL: https://proyecto-final-9z34.vercel.app              │    │  │
│  │  │   • Logs: https://vercel.com/proyecto-final                  │    │  │
│  │  │   • Time: ~1-2 minutos                                       │    │  │
│  │  │   • Result: 🟢 VERCEL DEPLOYED                              │    │  │
│  │  │                                                              │    │  │
│  │  │ Render (watching master):                                    │    │  │
│  │  │   • Detecta nuevo push                                       │    │  │
│  │  │   • Ejecuta build: cd backend && npm install                 │    │  │
│  │  │   • Ejecuta start: npm start (Node.js server)                │    │  │
│  │  │   • URL: https://proyecto-final-rqns.onrender.com            │    │  │
│  │  │   • Logs: https://render.com/proyecto-final                  │    │  │
│  │  │   • Time: ~2-3 minutos                                       │    │  │
│  │  │   • Result: 🟢 RENDER DEPLOYED                              │    │  │
│  │  └──────────────────────────────────────────────────────────────┘    │  │
│  │                                                                      │  │
│  │  Total GitHub Actions Time: ~60-90 segundos                          │  │
│  │  Additional deployments (Vercel + Render): ~3-5 minutos              │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│               │                                                            │
│               ├─────────────────────────────┬──────────────────┬───────┐   │
│               ▼                             ▼                  ▼       ▼   │
│  ┌──────────────────────────┐  ┌──────────────────┐  ┌─────────────────┐   │
│  │   GitHub Pages LIVE      │  │  Vercel LIVE     │  │  Render LIVE    │   │
│  │                          │  │                  │  │                 │   │
│  │ https://brandonquinte..  │  │ https://proyecto-│  │ https://        │   │
│  │ github.io/Proyecto_Final │  │ final-9z34.      │  │ proyecto-final- │   │
│  │                          │  │ vercel.app       │  │ rqns.onrender   │   │
│  │ ✅ Available             │  │                  │  │ .com            │  │
│  │ ✅ 24/7                  │  │ ✅ Available     │  │                │   │
│  │ ✅ Instant CDN           │  │ ✅ 99.95% uptime │  │ ✅ Available   │   │
│  │ ✅ SSL included          │  │ ✅ Global CDN    │  │ ✅ MySQL DB    │   │
│  └──────────────────────────┘   │ ✅ Monitoring    │  │ ✅ Auto-SSL   │    │
│                                 └──────────────────┘  └────────────────┘    │
│                                                                             │
│  🎯 RESULTADO FINAL: 3 versiones activas de la aplicación                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Archivo de Configuración (.github/workflows/ci.yml)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]  # ← Trigger: cada push a master

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      # 1. Checkout
      - uses: actions/checkout@v4
      
      # 2. Setup Node.js 20
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      # 3. Install frontend dependencies
      - name: Install dependencies
        run: cd frontend && npm install
      
      # 4. Build with Vite (GitHub Pages base path)
      - name: Build frontend
        run: cd frontend && npm run build
        env:
          VITE_BASE_PATH: /Proyecto_Final/
      
      # 5. Deploy to GitHub Pages
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
          branch: gh-pages
          cname: false
```

### Vercel Deployment Config (vercel.json)

```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "env": {
    "VITE_API_URL": "@vite-api-url"
  }
}
```

**¿Qué hace?**
- Detecta cambios en master
- Ejecuta build del frontend
- Deploy automático a CDN de Vercel
- Genera preview URLs para PRs

### Render Deployment Config (render.yaml)

```yaml
services:
  - type: web
    name: proyecto-final-backend
    env: node
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: proyecto-final-db
          property: connectionString
```

**¿Qué hace?**
- Detecta cambios en master
- Instala dependencias backend
- Inicia Node.js server en puerto 4000
- Conecta a MySQL automáticamente
- Health checks cada 30 segundos

### Timeline Completo

```
┌──────────────────────────────────────────────────────────────┐
│ Event                      │ Time    │ Status                │
├──────────────────────────────────────────────────────────────┤
│ Developer: git push master │ T+0s    │ 👤 Pushing...         │
│ GitHub receives code       │ T+1s    │ 📥 Received           │
│ Actions triggered          │ T+2s    │ 🤖 CI/CD Starting     │
│ Checkout repository        │ T+5s    │ ✅ Done               │
│ Setup Node.js 20           │ T+10s   │ ✅ Done               │
│ npm install (frontend)     │ T+50s   │ ✅ Done               │
│ npm run build (Vite)       │ T+75s   │ ✅ Done               │
│ Deploy to GitHub Pages     │ T+90s   │ ✅ LIVE               │
├──────────────────────────────────────────────────────────────┤
│ Vercel detects changes     │ T+95s   │ 🔔 Auto-triggered     │
│ Vercel: npm install        │ T+120s  │ ✅ Done               │
│ Vercel: npm build          │ T+140s  │ ✅ Done               │
│ Vercel: Deploy to CDN      │ T+150s  │ ✅ LIVE               │
├──────────────────────────────────────────────────────────────┤
│ Render detects changes     │ T+100s  │ 🔔 Auto-triggered     │
│ Render: npm install        │ T+130s  │ ✅ Done               │
│ Render: npm start          │ T+150s  │ ✅ Done               │
│ Render: Health check       │ T+160s  │ ✅ LIVE               │
├──────────────────────────────────────────────────────────────┤
│ TOTAL TIME                 │ ~3 min  │ ✅ ALL 3 LIVE         │
└──────────────────────────────────────────────────────────────┘
```

### Monitoreo en Tiempo Real

```
GitHub Actions Dashboard:
┌─────────────────────────────────────┐
│ Proyecto_Final / Actions            │
│                                     │
│ Last run: feat: Agregar componentes │
│ Status: ✅ Success (90s)            │
│ Branch: master                      │
│ Commit: 3f4a8b2                     │
│                                     │
│ Build logs:                         │
│ • Checkout ✅                       │
│ • Setup Node ✅                     │
│ • Install ✅                        │
│ • Build ✅                          │
│ • Deploy ✅                         │
└─────────────────────────────────────┘

Vercel Dashboard:
┌─────────────────────────────────────┐
│ proyecto-final / Deployments        │
│                                     │
│ ✅ Production Deployment (3 min ago)│
│    Status: Ready                    │
│    Branch: master                   │
│    Commit: 3f4a8b2                  │
│    URL: proyecto-final-9z34.vercel  │
│         .app                        │
│    Built: 2m 15s                    │
│    Size: 112 KB (gzipped)           │
│                                     │
│ Build log:                          │
│ • npm install ✅                    │
│ • npm run build ✅                  │
│ • Deploy ✅                         │
└─────────────────────────────────────┘

Render Dashboard:
┌─────────────────────────────────────┐
│ proyecto-final-backend / Logs       │
│                                     │
│ Status: ✅ Running                  │
│ Health: ✅ Healthy                  │
│ Last deployment: 2 min ago          │
│ Build time: 1m 30s                  │
│ CPU: 5%                             │
│ Memory: 45 MB / 512 MB              │
│                                     │
│ Log entries (realtime):             │
│ [12:00:15] npm install starting...  │
│ [12:01:45] npm start                │
│ [12:01:50] Server listening on 4000 │
│ [12:01:52] Database connected       │
│ [12:02:00] Ready to accept requests │
└─────────────────────────────────────┘
```

### Rollback (si hay error)

```
Si el build falla o hay un error en producción:

GitHub Actions Error → Action failed ❌
  ↓
Email notification al desarrollador
  ↓
Developer revisa logs
  ↓
$ git revert <commit-hash>  (revertir cambios)
$ git push origin master
  ↓
GitHub Actions triggered again
  ↓
New deployment (version anterior)
  ↓
Sistema nuevamente estable ✅

Tiempo total de rollback: ~3-5 minutos
```

---

## 📊 Monitoreo y Logs

### Frontend (Vercel)
- Logs de build en Vercel Dashboard
- Error tracking vía browser console
- Performance metrics automáticos
- Analytics de uso

### Backend (Render)
- Logs en tiempo real (SSH)
- Error reporting
- Métricas CPU/Memory
- Uptime monitoring

### Base de Datos (Render)
- Backups automáticos
- Logs de conexión
- Estadísticas de uso

---

## 🔧 Ambiente de Desarrollo vs Producción

### Desarrollo Local
```
Frontend:  http://localhost:5173
Backend:   http://localhost:4000
Database:  localhost:3306
           (MySQL local o remota)
```

**Archivo `.env`:**
```env
VITE_API_URL=http://localhost:4000
```

### Producción (Vercel + Render)
```
Frontend:  https://proyecto-final-9z34.vercel.app
Backend:   https://proyecto-final-rqns.onrender.com/api
Database:  MySQL en Render
           (Conexión segura con SSL)
```

**Variables Vercel:**
```env
VITE_API_URL=https://proyecto-final-rqns.onrender.com
```

**Variables Render:**
```env
DATABASE_URL=mysql://user:pass@host:3306/db
NODE_ENV=production
PORT=4000
```

---

## 🎯 Mejoras Futuras

1. **Autenticación**
   - Login con JWT
   - Usuarios con tareas personales

2. **Validación Avanzada**
   - Joi / Zod schemas
   - Rate limiting

3. **Caché**
   - Redis para sessions
   - Caché de tareas frecuentes

4. **Testing**
   - Jest para unitarios
   - Cypress para E2E

5. **Performance**
   - Paginación en lista
   - Infinite scroll
   - Web Workers

6. **Características**
   - Categorías/etiquetas
   - Prioridades
   - Fechas vencimiento
   - Notificaciones

---

**Última actualización**: Diciembre 10, 2025  
**Versión**: 1.0