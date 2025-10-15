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
