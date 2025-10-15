# Explicación del front en Astro + Vite de apoyo

Este documento resume cómo funciona el código entregado: describe la aplicación principal en Astro, la lógica de los componentes clave y el objetivo del workspace adicional en Vite.

## 1. Estructura general

- **Astro (producción)** vive en la raíz del repositorio. La entrada está en `src/pages/index.astro`, que monta el layout base y renderiza los componentes reusables. 【F:src/pages/index.astro†L1-L63】
- **Componentes**: cada sección visual es un `.astro` autónomo dentro de `src/components/` (por ejemplo, `NavBar.astro`, `TabMenu.astro`, `GameSlider.astro`, `PopularGames.astro`, `AppFooter.astro`). Estos componentes generan HTML estático y encapsulan los scripts que se ejecutan en el navegador cuando es necesario añadir interactividad. 【F:src/components/NavBar.astro†L1-L66】【F:src/components/TabMenu.astro†L1-L212】
- **Estilos globales**: las variables de color, tipografías y utilidades comparten la hoja `public/global.css`, que Astro incluye automáticamente en todas las páginas. 【F:public/global.css†L1-L74】
- **Workspace Vite** (`vite-app/`): provee un entorno opcional en Vue 3 + Vuetify para experimentar la misma interfaz de forma local sin recompilar todo Astro. Su entrada es `vite-app/src/App.vue` y reutiliza la misma API de WordPress para los datos dinámicos. 【F:vite-app/src/App.vue†L1-L49】

## 2. Flujo de datos

1. **Datos desde WordPress**: Tanto Astro como el proyecto Vite consumen la REST API de WordPress (`https://wp.gremioktg.com/wp-json/wp/v2/posts`). Las URLs específicas (por tags, categorías o filtros) se pasan como `props` a los componentes para que los scripts del navegador hagan la petición. 【F:src/components/GameSlider.astro†L1-L102】【F:src/components/TabMenu.astro†L1-L75】
2. **Hidratación parcial**: Astro entrega HTML estático con marcadores (`data-*`). Cuando la página se carga, los scripts incrustados en cada componente localizan esos contenedores y ejecutan `fetch` para obtener los posts. Así sólo se hidratan secciones puntuales (sliders, tabs) en lugar de toda la página. 【F:src/components/GameSlider.astro†L104-L192】【F:src/components/TabMenu.astro†L77-L187】
3. **Normalización**: ambos componentes limpian el HTML de los excerpts, extraen imágenes destacadas del `_embedded` de WordPress y generan estructuras simples (`title`, `image`, `link`) para renderizar tarjetas o artículos. 【F:src/components/GameSlider.astro†L110-L144】【F:src/components/TabMenu.astro†L124-L159】

## 3. Componentes principales

### 3.1 NavBar

- Renderiza un encabezado fijo con el logotipo y enlaces de ancla a las secciones internas. Su CSS usa un fondo semitransparente y mantiene la navegación accesible con `aria-label`. 【F:src/components/NavBar.astro†L1-L66】

### 3.2 TabMenu

- Crea una vista hero con video destacado y pestañas para “Noticias”, “Análisis” y “Top reciente”.
- Cada pestaña llama al mismo endpoint pero con parámetros distintos; la respuesta se convierte en tarjetas con título, fecha y botón “Leer más”.
- Los botones usan eventos de teclado (`Enter`, `Space`) y `aria-selected` para accesibilidad. 【F:src/components/TabMenu.astro†L18-L187】

### 3.3 GameSlider

- Acepta una lista de secciones (`sections` prop) para renderizar varios carruseles (por ejemplo, Throne and Liberty y Blue Protocol) con sus respectivos filtros.
- El script genera artículos `<article>` con imagen 16:9, título y descripción. Los botones laterales desplazan el carrusel usando `scrollBy`, y el filtro ejecuta búsqueda sobre los títulos precargados. 【F:src/components/GameSlider.astro†L1-L192】

### 3.4 PopularGames

- Muestra un grid estático de juegos populares, pensado para destacar contenidos manuales. Cada tarjeta aplica `hover` con `transform` y puede actualizar el fondo del `body` (comportamiento que se puede extender en el navegador). 【F:src/components/PopularGames.astro†L1-L100】

### 3.5 AppFooter

- Cierra la página con la marca y el aviso de derechos. Es completamente estático, por lo que Astro lo entrega como HTML sin scripts adicionales. 【F:src/components/AppFooter.astro†L1-L17】

## 4. Layout y composición

`src/layouts/BaseLayout.astro` define la estructura repetible: importa los estilos globales, monta la `NavBar` y el `AppFooter`, y expone un `slot` para el contenido específico de cada página. `index.astro` utiliza ese layout para montar las secciones principales (`TabMenu`, `PopularGames`, `GameSlider`). 【F:src/layouts/BaseLayout.astro†L1-L28】【F:src/pages/index.astro†L1-L63】

## 5. Scripts compartidos

`public/scripts/global.js` contiene mejoras menores (por ejemplo, manejar el scroll o efectos globales). Astro lo sirve como archivo estático y se incluye desde el layout base para que cualquier página pueda aprovecharlo. 【F:public/scripts/global.js†L1-L30】

## 6. Cómo probar

1. **Astro**:
   ```bash
   npm install
   npm run dev
   ```
   Esto levanta el sitio en modo desarrollo con recarga en caliente. Para compilar la versión estática, usa `npm run build`.
2. **Vite (opcional)**:
   ```bash
   cd vite-app
   npm install
   npm run dev
   ```
   Este entorno replica la interfaz con Vue 3 + Vuetify, ideal para validar componentes interactivos antes de integrarlos en Astro.

Con esta arquitectura, cada vez que se publica un nuevo post en WordPress, el front lo consulta en tiempo real mediante `fetch`, sin necesidad de reconstruir el sitio estático, manteniendo la experiencia ligera y reactiva sólo donde hace falta.

## 7. ¿Por qué existe el sandbox de Vite si Astro ya resuelve el front?

- **Propósito**: el sandbox es un laboratorio para experimentar rápido. Como está construido con Vue 3 + Vuetify, reproduce los mismos sliders, pestañas y tarjetas pero con el ecosistema original del proyecto. Así puedes probar nuevas variantes de diseño o lógica (por ejemplo, otro filtro, un carrusel distinto o estados loading) sin tocar el código de producción. Cuando la solución está validada, simplemente traduces los cambios a Astro.
- **Aislamiento seguro**: al vivir en `vite-app/` y tener su propio `package.json`, no contamina la build de Astro. Puedes actualizar dependencias, instalar plugins o depurar con DevTools de Vue sin riesgo de romper la página pública.
- **Sincronía de datos**: ambos frentes consumen la misma API de WordPress, por lo que cualquier post nuevo aparece de inmediato tanto en Astro como en el sandbox. Esto permite comparar comportamientos o revisar cómo se ve un contenido recién publicado antes de desplegar ajustes.
- **Cuándo usarlo**: resulta útil para demos a stakeholders, prototipos de UX o pruebas A/B rápidas. Si una idea prospera, se replica en los componentes `.astro`. Si no, basta con descartarla sin afectar el build final.
- **Cuándo omitirlo**: si sólo necesitas ajustar contenido estático o retoques menores de estilos ya existentes, puedes trabajar directamente en Astro. El sandbox no es obligatorio en el ciclo de despliegue; es una herramienta complementaria para mantener agilidad en tareas exploratorias.

En resumen, aunque el sandbox esté en “otro stack”, actúa como un banco de pruebas especializado que acelera la iteración sobre interfaces ricas sin comprometer el front oficial servido por Astro.
