# Arquitectura General

Usuario → Vercel (Frontend) → Render (Backend) → Railway (DB MongoDB)

## Flujo de creación de tarea
1. Usuario escribe una tarea
2. Frontend envía POST /api/todos
3. Backend valida y guarda en la DB
4. Backend responde con la nueva tarea
5. UI se actualiza
