# Gremio KTG con Astro

Migración del portal de la comunidad Gremio KTG a [Astro](https://astro.build/), renderizado estático con componentes interactivos ligeros en el navegador.

## Requisitos
- Node.js 18.17 o superior
- npm 9 o superior

## Instalación

```bash
npm install
```

## Scripts disponibles

```bash
# Modo desarrollo con recarga en caliente
npm run dev

# Compila el sitio para producción (salida en ./dist)
npm run build

# Previsualiza la build de producción
npm run preview
```

## Despliegue

El proyecto genera un sitio estático. Puedes publicar el contenido de la carpeta `dist/` en cualquier hosting de archivos estáticos o usar plataformas como Netlify o Vercel.

Para Netlify, asegúrate de configurar:

- **Comando de build:** `npm run build`
- **Directorio de publicación:** `dist`

## Fuentes de datos

Los componentes interactivos consultan la API de WordPress en el navegador (`https://wp.gremioktg.com/wp-json/wp/v2/posts`). Gracias a ello, cada vez que publiques una entrada nueva en WordPress aparecerá automáticamente en el front sin reconstruir el sitio. Puedes ajustar los parámetros desde `src/pages/index.astro` si cambian los endpoints o filtros.

## Arquitectura del repositorio

- **Aplicación principal (Astro):** vive en la raíz del proyecto y es la que se despliega en producción. Se compila con los scripts `npm run dev|build|preview` descritos arriba y genera HTML estático con islas de interactividad.
- **Entorno de pruebas (Vite + Vue 3 + Vuetify):** se encuentra en `vite-app/` y está pensado solo como *sandbox* para validar componentes o integrar rápido nuevas vistas antes de llevarlas a Astro. No forma parte del build de producción.

Ambos entornos comparten las mismas URLs de la API de WordPress, por lo que cualquier entrada nueva publicada en el CMS aparece en los dos sin pasos adicionales.

## Previsualización alternativa con Vite + Vue

Si prefieres testear la interfaz como una SPA de Vue 3 con Vuetify, el repositorio incluye un entorno opcional en `vite-app/`.

```bash
cd vite-app
npm install
npm run dev
```

Esta versión cliente consulta los mismos endpoints de WordPress directamente en el navegador, por lo que los posts nuevos también aparecen sin rebuild. Para generar una build estática del preview:

```bash
npm run build
```

Y para revisarla localmente:

```bash
npm run preview
```
