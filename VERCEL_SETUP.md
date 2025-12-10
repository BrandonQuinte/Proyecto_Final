# Guía: Despliegue en Vercel

## ✅ Paso 1: Crear Proyecto en Vercel

1. Ve a https://vercel.com
2. Haz login con GitHub (o crea una cuenta)
3. Haz clic en **"New Project"**
4. Selecciona tu repositorio: **Proyecto_Final**
5. Vercel detectará automáticamente:
   - Framework: **Vite**
   - Build command: `cd frontend && npm run build`
   - Output: `frontend/dist`

## ✅ Paso 2: Configurar Variables de Entorno

En la pantalla de configuración del proyecto:

1. Ve a la sección **"Environment Variables"**
2. Haz clic en **"Add Environment Variable"**
3. Configura según tu caso:

### Opción A: Sin Backend (Solo Frontend)
```
Name:  VITE_API_URL
Value: (dejar vacío o usar un API público)
```

### Opción B: Con Backend en Vercel
```
Name:  VITE_API_URL
Value: https://tu-backend-api.vercel.app
```

### Opción C: Con Backend Local
```
Name:  VITE_API_URL
Value: http://localhost:4000
(solo para desarrollo local, agregar en Settings → Environment Variables → Preview)
```

## ✅ Paso 3: Deploy

1. Haz clic en **"Deploy"**
2. Espera a que termine (2-5 minutos)
3. Vercel te asignará una URL como:
   ```
   https://proyecto-final-xxxxx.vercel.app
   ```

## 🔄 Despliegues Automáticos

Cada vez que hagas push a `master`:
1. Vercel detecta el cambio automáticamente
2. Ejecuta el build
3. Despliega la nueva versión
4. No requiere acción manual

## 🐛 Si algo Falla

### "Environment Variable VITE_API_URL references Secret..."
- ✅ **Solucionado**: Ya no usamos Secrets
- Simplemente agrega la variable manualmente en Settings → Environment Variables

### "Cannot find module 'api'"
- Verifica que `frontend/src/services/api.js` existe
- Build command debe ser: `cd frontend && npm run build`

### "Blank Page or 404"
- Verifica que `vercel.json` está en la raíz
- Rewrites debe tener: `/:path((?!api).*)*` → `/index.html`
- Limpia cache: Ctrl+Shift+Supr

### "API no conecta"
- Verifica `VITE_API_URL` está configurado correctamente
- Revisa en Console (F12) para errores de CORS
- Backend debe estar accessible desde la URL pública

## 📝 Estructura Esperada

```
Proyecto_Final/
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── backend/
│   └── ...
├── vercel.json          ← IMPORTANTE: en la raíz
├── DEPLOY.md
└── README.md
```

## 🚀 URL Final

Una vez desplegado, tu sitio estará en:
```
https://proyecto-final-[id-aleatorio].vercel.app
```

Puedes configurar un dominio personalizado en Settings → Domains

## 💡 Tips

- **Preview**: Cada PR crea una preview URL automáticamente
- **Analytics**: Ve a tu proyecto en Vercel para ver estadísticas
- **Logs**: En Vercel dashboard → Deployments → ver logs en tiempo real
- **Rollback**: Puedes volver a cualquier deployment anterior
