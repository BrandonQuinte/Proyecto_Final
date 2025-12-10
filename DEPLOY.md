# Proyecto Final - Guía de Despliegue

## 🚀 Despliegue en GitHub Pages

GitHub Pages se despliega automáticamente en cada push a `master`.

**URL**: https://BrandonQuinte.github.io/Proyecto_Final/

### Características:
- ✅ Despliegue automático con GitHub Actions
- ✅ Base path configurado para `/Proyecto_Final/`
- ✅ Build optimizado

## 🎯 Despliegue en Vercel

### Paso 1: Configurar Vercel
1. Ve a https://vercel.com
2. Haz login con GitHub
3. Haz clic en "New Project"
4. Selecciona tu repositorio `Proyecto_Final`

### Paso 2: Configurar Variables de Entorno
En Vercel, ve a Settings → Environment Variables y añade:

**Para desarrollo:**
```
VITE_API_URL = http://localhost:4000
```

**Para producción (si tienes backend en Vercel):**
```
VITE_API_URL = https://tu-backend.vercel.app
```

### Paso 3: Deploy
Haz clic en "Deploy" y Vercel se encargará del resto.

**URL**: https://proyecto-final-xxxxx.vercel.app (Vercel te asignará)

### Características:
- ✅ Despliegue automático en cada push
- ✅ Base path automático `/`
- ✅ Build optimizado con Vite
- ✅ Rewrites configurados para SPA

## 📝 Estructura de Despliegue

```
Proyecto_Final/
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions
├── frontend/
│   ├── vite.config.js               # Configuración Vite
│   ├── package.json
│   ├── src/
│   │   └── services/
│   │       └── api.js               # API configurable
│   └── .env.example
├── vercel.json                       # Configuración Vercel
└── README.md
```

## 🔧 Variables de Entorno

### Frontend (.env)
```
VITE_API_URL=http://localhost:4000  # URL de tu backend
```

### GitHub Pages
- Base path automático: `/Proyecto_Final/`
- Build: `npm run build` en carpeta frontend

### Vercel
- Base path automático: `/`
- Build: `cd frontend && npm run build`
- Output: `frontend/dist`

## ✅ Checklist de Despliegue

### GitHub Pages
- [x] Workflow configurado en `.github/workflows/ci.yml`
- [x] Base path configurado para `/Proyecto_Final/`
- [x] Rama `gh-pages` creada automáticamente
- [x] Settings → Pages: rama `gh-pages`

### Vercel
- [x] `vercel.json` configurado
- [x] Rewrites para SPA configurados
- [x] Variables de entorno listas
- [x] Build command: `cd frontend && npm run build`
- [x] Output directory: `frontend/dist`

## 🌍 Verificar Despliegue

### GitHub Pages
1. Ve a Actions en tu repositorio
2. Verifica que el workflow `Deploy React App to GitHub Pages` está ✅
3. Accede a: https://BrandonQuinte.github.io/Proyecto_Final/

### Vercel
1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Espera a que el build termine
4. Accede a tu URL de Vercel

## 🐛 Troubleshooting

### Página en blanco en GitHub Pages
- Verifica que el base path es `/Proyecto_Final/`
- Revisa la consola del navegador (F12)
- Limpia la cache: Ctrl+Shift+Supr

### API no conecta en Vercel
- Verifica que `VITE_API_URL` está configurado
- Usa una URL absoluta (ej: `https://api.ejemplo.com`)
- No uses `localhost` en producción

### Error 404 en rutas SPA
- Verifica que `rewrites` está configurado en `vercel.json`
- GitHub Pages: automático con gh-pages

## 📚 Documentación
- [Vite](https://vitejs.dev)
- [Vercel](https://vercel.com/docs)
- [GitHub Pages](https://pages.github.com)
- [GitHub Actions](https://docs.github.com/en/actions)
