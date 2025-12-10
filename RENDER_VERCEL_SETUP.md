# Guía: Frontend en Vercel + Backend en Render

## 📋 Resumen
- **Frontend**: Vercel (https://vercel.com)
- **Backend**: Render (https://render.com)
- **Base de datos**: MySQL (en Render)

---

## 🎯 BACKEND - Render

### Paso 1: Preparar el Backend

El `render.yaml` ya está configurado. Verifica que todo esté listo:
- ✅ `backend/package.json` con `"start": "node src/index.js"`
- ✅ `backend/.env.example` con variables de ejemplo
- ✅ `render.yaml` en la raíz del proyecto

### Paso 2: Crear Cuenta en Render
1. Ve a https://render.com
2. Haz login con GitHub
3. Haz clic en **"New"** → **"Web Service"**

### Paso 3: Conectar GitHub
1. Selecciona tu repositorio: **Proyecto_Final**
2. Nombre del servicio: **proyecto-final-backend**
3. Build Command: `cd backend && npm install`
4. Start Command: `cd backend && npm start`
5. Environment: **Node**
6. Plan: **Free**

### Paso 4: Configurar Variables de Entorno
En la sección "Environment":
```
PORT=4000
NODE_ENV=production
DATABASE_URL=mysql://usuario:contraseña@host:3306/todos_db
```

### Paso 5: Crear Base de Datos (Opcional)
Si quieres una DB en Render:
1. Haz clic en **"Create Database"** en tu dashboard
2. Tipo: **MySQL**
3. Copia el `DATABASE_URL` que genera
4. Pégalo en tu servicio web

### Resultado
Tu backend estará en:
```
https://proyecto-final-backend.onrender.com
```

---

## 🚀 FRONTEND - Vercel

### Paso 1: Actualizar Variable de Entorno
En Vercel, ve a **Settings → Environment Variables** y agrega:
```
VITE_API_URL=https://proyecto-final-backend.onrender.com
```

(Reemplaza con tu URL real de Render)

### Paso 2: Redeploy
1. En Vercel Dashboard → **Deployments**
2. Haz clic en los **3 puntos** del último deployment
3. Selecciona **"Redeploy"**
4. Espera a que termine

### Resultado
Tu frontend estará en:
```
https://proyecto-final-xxxxx.vercel.app
```

---

## 🔗 Conectar Frontend + Backend

### En Vercel (Frontend)
**Settings → Environment Variables:**
```
Name:  VITE_API_URL
Value: https://proyecto-final-backend.onrender.com
```

### En Render (Backend)
**Environment Variables:**
```
PORT=4000
NODE_ENV=production
DATABASE_URL=mysql://usuario:pass@host:3306/database
```

### Verificar Conexión
1. Abre tu frontend en Vercel
2. Abre la consola (F12)
3. Intenta agregar una tarea
4. Si ves errores, revisa:
   - ¿VITE_API_URL es correcto?
   - ¿Backend está en línea?
   - ¿Hay errores CORS?

---

## 📝 Flujo Completo

```
GitHub (Proyecto_Final)
    ↓
    ├─→ Vercel (Frontend)
    │   └─ https://proyecto-final-xxxxx.vercel.app
    │
    └─→ Render (Backend)
        └─ https://proyecto-final-backend.onrender.com
```

---

## ⚠️ Notas Importantes

### Render - Plan Gratuito
- ✅ 750 horas/mes (suficiente para siempre activo)
- ✅ El servicio se duerme sin uso (se reactiva automáticamente)
- ⚠️ Primera petición después de dormir tarda ~30s

### Base de Datos en Render
- ✅ 90 días gratis después de crear la cuenta
- ⚠️ Luego cuesta ~$15/mes para MySQL básico
- 💡 Alternativa: Usar MongoDB Atlas (gratis hasta 512MB)

### CORS
Si el frontend no puede conectar con el backend:
1. Verifica que CORS está habilitado en `backend/src/index.js`
2. Debe tener: `app.use(cors())`
3. Redeploy en Render

---

## 🐛 Troubleshooting

### "Cannot GET /"
- Backend está en línea pero no hay ruta raíz
- Normal para una API, solo usa `/api/todos`

### "CORS Error"
- Frontend y backend no pueden comunicarse
- Verifica `VITE_API_URL` en Vercel
- Verifica `cors()` en backend

### "Service unavailable"
- Render está inicializando después de dormir
- Espera 30s e intenta de nuevo

### "DATABASE_URL is invalid"
- Revisa la sintaxis de MySQL
- Formato: `mysql://user:pass@host:port/dbname`

---

## 🎉 ¡Listo!

Tu aplicación está en:
- 🌐 Frontend: https://proyecto-final-xxxxx.vercel.app
- 🔌 Backend: https://proyecto-final-backend.onrender.com
