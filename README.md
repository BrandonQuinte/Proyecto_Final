# 📋 Todo List Fullstack — Proyecto Final Integrador

Aplicación de gestión de tareas (Todo List) desarrollada como proyecto final integrador. Fullstack moderno con frontend en React y backend en Node.js.

## 📸 Preview

![Diseño Binance Inspired](frontend/src/styles/binance-design.jpg)
- Paleta oscura profesional
- Acentos amarillo Binance (#F0B90B)
- Tipografía Inter moderna
- Interfaz elegante y responsiva

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18.2** - Librería UI
- **Vite 5** - Build tool moderno
- **CSS 3** - Estilos con diseño Binance
- **Axios** - Cliente HTTP

### Backend
- **Node.js 20** - Runtime JavaScript
- **Express 4.18** - Framework web
- **MySQL 3.15 / Sequelize 6.37** - ORM y base de datos
- **CORS** - Seguridad entre dominios
- **Dotenv** - Variables de entorno

### DevOps & Deploy
- **Vercel** - Hosting Frontend
- **Render** - Hosting Backend
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Backup de frontend

---

## ✅ Requisitos Previos

### Sistema
- **Node.js** v20.x o superior
- **npm** v10.x o superior
- **Git**

### Verificar instalación
```bash
node --version    # v20.x.x
npm --version     # v10.x.x
git --version     # v2.x.x
```

---

## 🚀 Ejecución en Local

### 1️⃣ Clonar Repositorio
```bash
git clone https://github.com/BrandonQuinte/Proyecto_Final.git
cd Proyecto_Final
```

### 2️⃣ Frontend - React + Vite

#### Instalación
```bash
cd frontend
npm install
```

#### Variables de Entorno
```bash
cp .env.example .env
```

Edita `frontend/.env`:
```env
# URL de la API Backend
VITE_API_URL=http://localhost:4000
```

#### Ejecutar en Desarrollo
```bash
npm run dev
```
Frontend estará en: **http://localhost:5173**

#### Build para Producción
```bash
npm run build
npm run preview
```

---

### 3️⃣ Backend - Node.js + Express

#### Instalación
```bash
cd backend
npm install
```

#### Variables de Entorno
```bash
cp .env.example .env
```

Edita `backend/.env`:
```env
# Puerto del servidor
PORT=4000

# Base de datos MySQL
DATABASE_URL=mysql://usuario:contraseña@localhost:3306/todos_db

# Ambiente
NODE_ENV=development
```

#### Base de Datos
Necesitas MySQL instalado. Opciones:

**Opción 1: MySQL Local**
```bash
# Crear base de datos
mysql -u root -p
> CREATE DATABASE todos_db;
> USE todos_db;
> (el backend crea las tablas automáticamente)
```

**Opción 2: MySQL Online (FreeSQLDatabase)**
1. Ve a https://www.freesqldatabase.com
2. Crea una base de datos gratis
3. Usa el `DATABASE_URL` proporcionado

#### Ejecutar en Desarrollo
```bash
npm run dev
```
Backend estará en: **http://localhost:4000/api**

---

## 🌍 URLs de Producción

### ✨ Frontend - Vercel
📱 **https://proyecto-final-9z34.vercel.app/**

- Despliegue automático en cada push a `master`
- CDN global
- HTTPS automático

### 🔌 Backend - Render
🖥️ **https://proyecto-final-rqns.onrender.com/api**

- Base de datos MySQL en Render
- Despliegue automático
- Logs en tiempo real

### 📊 GitHub Actions / GitHub Pages
🤖 **https://BrandonQuinte.github.io/Proyecto_Final/**

- CI/CD automático
- Despliegue a GitHub Pages en cada push
- Backup del frontend

---

## 📚 Documentación de API

### Base URL
```
http://localhost:4000/api          (Desarrollo)
https://proyecto-final-rqns.onrender.com/api  (Producción)
```

### 1. GET /todos
Obtiene todas las tareas.

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

---

### 2. POST /todos
Crea una nueva tarea.

**Request:**
```bash
curl -X POST http://localhost:4000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Comprar pan",
    "description": "Pan tajado blanco"
  }'
```

**Body esperado:**
```json
{
  "title": "Comprar pan",           // Requerido (string)
  "description": "Pan tajado"       // Opcional (string)
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

**Errores:**
```json
// 400 Bad Request - Falta título
{
  "error": "El título es obligatorio"
}
```

---

### 3. PUT /todos/:id
Actualiza una tarea existente.

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

**Body esperado:**
```json
{
  "title": "Comprar pan integral",      // Opcional
  "description": "Pan integral sin sal", // Opcional
  "status": "completed"                  // Opcional: pending | completed
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

**Errores:**
```json
// 404 Not Found
{
  "error": "Tarea no encontrada"
}
```

---

### 4. DELETE /todos/:id
Elimina una tarea.

**Request:**
```bash
curl -X DELETE http://localhost:4000/api/todos/1
```

**Response (200 OK):**
```json
{
  "message": "Tarea eliminada correctamente"
}
```

**Errores:**
```json
// 404 Not Found
{
  "error": "Tarea no encontrada"
}
```

---

## 📊 Códigos de Estado HTTP

| Código | Significado | Ejemplo |
|--------|-------------|---------|
| **200** | OK | GET, PUT, DELETE exitosos |
| **201** | Created | POST exitoso |
| **400** | Bad Request | Datos inválidos o incompletos |
| **404** | Not Found | Recurso no existe |
| **500** | Server Error | Error en el servidor |

---

## 🔧 Variables de Entorno

### Frontend (.env)
```env
# API Backend URL
VITE_API_URL=http://localhost:4000

# Para Vercel (producción):
# VITE_API_URL=https://proyecto-final-rqns.onrender.com
```

### Backend (.env)
```env
# Puerto del servidor
PORT=4000

# Base de datos MySQL
DATABASE_URL=mysql://usuario:contraseña@localhost:3306/todos_db

# Ambiente
NODE_ENV=development

# Para Render (producción):
# DATABASE_URL=mysql://user:password@host:3306/dbname
# NODE_ENV=production
```

---

## 📁 Estructura del Proyecto

```
Proyecto_Final/
├── frontend/                    # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   └── TodoList.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── api.js           # Cliente Axios
│   │   ├── styles/
│   │   │   ├── index.css        # Base (Binance Dark)
│   │   │   ├── home.css
│   │   │   ├── form.css
│   │   │   ├── list.css
│   │   │   └── item.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
├── backend/                     # Node.js + Express
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js            # Conexión MySQL
│   │   ├── controllers/
│   │   │   └── todosController.js
│   │   ├── models/
│   │   │   └── todoModel.js
│   │   ├── routes/
│   │   │   └── todos.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions
│
├── render.yaml                  # Config Render
├── vercel.json                  # Config Vercel
├── RENDER_VERCEL_SETUP.md       # Guía deploy
├── DEPLOY.md                    # Alternativa GitHub Pages
├── API.md                       # Documentación API
└── README.md                    # Este archivo
```

---

## 🎨 Diseño - Inspirado en Binance

### Características Visuales
- ✅ Paleta oscura profesional (#0d1117, #161b22)
- ✅ Acentos amarillo Binance (#F0B90B)
- ✅ Tipografía Inter moderna
- ✅ Bordes suaves y elegantes (8px border-radius)
- ✅ Sombras sutiles y profundas
- ✅ Transiciones smooth (0.25s)
- ✅ Hover effects dinámicos
- ✅ Responsivo en todos los dispositivos

### Colores Principales
```css
--dark-bg: #0d1117;
--dark-surface: #161b22;
--dark-border: #30363d;
--binance-yellow: #F0B90B;
--text-primary: #f0f6fc;
--text-secondary: #8b949e;
--success: #3fb950;
--error: #f85149;
--info: #58a6ff;
```

---

## 🚀 Deploy Automático

### GitHub Actions (CI/CD)
Cada push a `master` dispara:
1. ✅ Build automático
2. ✅ Deploy a GitHub Pages (backup)
3. Vercel y Render se sincronizan automáticamente

### Vercel (Frontend)
- Deploy automático en cada push
- Preview en cada PR
- URL: https://proyecto-final-9z34.vercel.app

### Render (Backend)
- Deploy automático en cada push
- MySQL incluido
- URL: https://proyecto-final-rqns.onrender.com/api

---

## 🐛 Troubleshooting

### "Cannot find module 'api'"
```bash
cd frontend
npm install
```

### "Port 4000 is already in use"
```bash
# Linux/Mac
lsof -i :4000
kill -9 <PID>

# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### "DATABASE connection error"
- Verifica que MySQL está corriendo
- Revisa las credenciales en `.env`
- Asegúrate que la base de datos existe

### "CORS Error" en el navegador
- Verifica que backend tiene `cors()` activado
- Revisa que `VITE_API_URL` es correcto en frontend
- Redeploy en Vercel

---

## 📞 Contacto & Créditos

**Desarrollador**: Brandon Quinte  
**Repositorio**: https://github.com/BrandonQuinte/Proyecto_Final  
**Fecha**: Diciembre 2025

---

## 📄 Licencia

Este proyecto es parte de una Actividad Final Integradora.

---

## 🎓 Tecnologías Aprendidas

✅ React Hooks (useState, useEffect)  
✅ API REST con Express  
✅ Bases de datos relacionales (MySQL)  
✅ Diseño responsive y moderno  
✅ CI/CD con GitHub Actions  
✅ Deploy en Vercel y Render  
✅ Control de versiones con Git  
✅ Variables de entorno y seguridad  

---

**Última actualización**: Diciembre 10, 2025
