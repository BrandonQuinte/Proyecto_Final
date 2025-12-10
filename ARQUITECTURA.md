# 🏗️ Arquitectura del Sistema

## Diagrama General

```
┌─────────────────────────────────────────────────────────────────────┐
│                         INTERNET                                   │
└──────────────────┬──────────────────────────────────────┬──────────┘
                   │                                      │
         ┌─────────▼──────────┐                  ┌───────▼──────────┐
         │  Vercel Frontend   │                  │  GitHub Pages    │
         │  React + Vite      │                  │  (Backup)        │
         │  (Principal)       │                  │                  │
         └─────────┬──────────┘                  └──────────────────┘
                   │
                   │ HTTPS API Calls
                   │
         ┌─────────▼──────────────────────┐
         │   Render Backend Server        │
         │   Express.js on Node.js 20     │
         │   Port: 4000                   │
         │   (https://.../api)            │
         └─────────┬──────────────────────┘
                   │
                   │ MySQL Protocol
                   │ (Sequelize ORM)
                   │
         ┌─────────▼──────────────────────┐
         │   MySQL Database               │
         │   (Render)                     │
         │   todos_db                     │
         │   - todos table                │
         └────────────────────────────────┘
```

---

## 🎯 Stack Tecnológico Detallado

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

### Base de Datos (MySQL)
```
📊 Estructura:
Database: todos_db
├── tabla: todos
│   ├── id (INT, PK, AUTO_INCREMENT)
│   ├── title (VARCHAR(255), NOT NULL)
│   ├── description (TEXT, NULL)
│   ├── status (ENUM: pending|completed, DEFAULT: pending)
│   ├── created_at (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP)
│   └── updated_at (TIMESTAMP AUTO UPDATE)
```

**Características:**
- ✅ Relationships normalizadas
- ✅ Indexes en campos frecuentes
- ✅ Timestamps automáticos
- ✅ Constraints de integridad

---

## 🔄 Flujo de Datos

### 1. Crear Tarea

```mermaid
graph LR
    A[Usuario escribe] -->|input event| B[TodoForm]
    B -->|useState| C[Estado local]
    C -->|onClick Submit| D[POST /api/todos]
    D -->|JSON Body| E[Express Backend]
    E -->|Validar| F{Válido?}
    F -->|Sí| G[Sequelize INSERT]
    G -->|MySQL| H[(Database)]
    H -->|ID generado| I[Response 201]
    I -->|JSON Task| J[Frontend Update State]
    J -->|re-render| K[UI Actualizada]
    F -->|No| L[Response 400]
    L -->|Error Message| J
```

**Secuencia:**
1. Usuario completa form (title + description)
2. Frontend valida campos locales
3. Envía POST con JSON
4. Backend valida datos
5. Crea registro en MySQL
6. Retorna tarea creada
7. Frontend actualiza lista

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

## 🚀 Pipeline CI/CD

### GitHub Actions Workflow
```yaml
trigger: git push master
    ↓
┌─────────────────────────┐
│ 1. Checkout código      │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 2. Setup Node.js 20     │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 3. npm install frontend │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 4. npm run build        │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 5. Deploy a gh-pages    │
└────────────┬────────────┘
             ↓
         Trigger:
    ↙─────────────────────────────────────────────────────────────────────→
    ↓                                                                       ↓
┌─────────────────────────┐                              ┌──────────────────────┐
│ Vercel Auto Deploy      │                              │ Render Auto Deploy   │
│ (monitorea master)      │                              │ (monitorea master)   │
│ Build: cd frontend &&   │                              │ Build: cd backend && │
│ npm install &&          │                              │ npm install          │
│ npm run build           │                              │ Start: npm start     │
└─────────────────────────┘                              └──────────────────────┘
             ↓                                                      ↓
    ✅ Frontend disponible en:                          ✅ Backend disponible en:
    https://proyecto-final-9z34.vercel.app            https://proyecto-final-rqns.onrender.com/api
```

**Ventajas:**
- ✅ Deployment automático
- ✅ Sin intervención manual
- ✅ Historial de deployments
- ✅ Rollback rápido si hay errores
- ✅ Logs detallados de build

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