# JULU — Landing page

Landing estática para **JULU**, marca de ropa de autor de temática gato (para "mamás y papás michis").

- **Stack:** Astro 5 (SSG) · Tailwind CSS v4 (config por CSS, sin `tailwind.config.js`) · Motion · fuentes self-hosted (Archivo + Inter)
- **Puerto de desarrollo:** `4321`

## Requisitos

- Node.js 18.20+ (recomendado 20 LTS)
- [ngrok](https://ngrok.com/download) (ya instalado vía Homebrew) — solo para compartir

## Comandos

| Comando           | Qué hace                                                |
| ----------------- | ------------------------------------------------------- |
| `npm install`     | Instala dependencias                                    |
| `npm run dev`     | Servidor de desarrollo en `http://localhost:4321`       |
| `npm run build`   | Compila el sitio estático a `dist/`                     |
| `npm run preview` | Sirve el build de `dist/` (igual que producción)        |
| `npm run share`   | Abre un túnel ngrok al puerto `4321`                    |

## Compartir con ngrok

Sirve para mostrarle la landing a otra persona desde tu máquina, sin deployar, mediante una URL pública temporal.

### Setup (solo la primera vez)

ngrok necesita un authtoken (gratis). Creá una cuenta en [dashboard.ngrok.com](https://dashboard.ngrok.com/get-started/your-authtoken) y configuralo una vez:

```bash
ngrok config add-authtoken <TU_AUTHTOKEN>
```

### Para compartir

Necesitás **dos terminales** (el servidor por un lado, el túnel por el otro).

**Terminal 1** — levantá el dev server:

```bash
npm run dev
```

> ⚠️ Usá `dev`, **no** `preview`, para compartir por ngrok. El server estático de `astro preview` ignora `vite.preview.allowedHosts` y responde **403 Forbidden** a los hosts de ngrok. El dev server sí respeta `vite.server.allowedHosts` (ya configurado en `astro.config.mjs`), así que es la vía que funciona — y además da recarga en vivo. Si necesitás compartir el build de producción real, ver "Compartir el build de producción" más abajo.

**Terminal 2** — abrí el túnel:

```bash
npm run share
```

ngrok va a imprimir una URL del tipo `https://xxxx.ngrok-free.dev`. Esa es la que compartís. Mientras ambas terminales sigan abiertas, la URL funciona.

### Compartir el build de producción (opcional)

Si querés que vean exactamente el sitio compilado (sin dev server), serví la carpeta `dist/` con un server estático sin verificación de host, en vez de `astro preview`:

```bash
npm run build
cd dist && python3 -m http.server 4321
```

Luego, en otra terminal, `npm run share` igual que antes.

### Notas

- La URL **cambia cada vez** que reiniciás ngrok (en el plan gratuito).
- Al cerrar la terminal del túnel (o del servidor), el link deja de funcionar.
- La primera vez que alguien entra, ngrok muestra una pantalla intermedia de advertencia — hacen clic en **"Visit Site"** y listo.

## CSS de la tienda Nuvemshop

El campo "CSS personalizado" de Nuvemshop tiene un límite de 15.000 caracteres, así que el CSS de la tienda se sirve desde esta landing.

- El archivo vive en `public/nuvemshop.css` y queda publicado en `https://cdn.jsdelivr.net/gh/LEBrieva/julu-landing@main/public/nuvemshop.css`.
- En Nuvemshop, el CSS personalizado es solo esta línea:

  ```css
  @import url('https://cdn.jsdelivr.net/gh/LEBrieva/julu-landing@main/public/nuvemshop.css?v=N');

> **Por qué jsDelivr y no landing.julu.clothing:** desde Brasil (al menos Claro fijo y datos móviles, nov 2026) las IPs de Cloudflare de julu.clothing no responden, así que la tienda quedaba sin diseño. jsDelivr lee directo de GitHub (repo público) y tiene varias CDN de respaldo.
> Tras un `git push` a `main` que toque `public/nuvemshop.css` o `public/nuvemshop/**`, el workflow `.github/workflows/purge-jsdelivr.yml` purga esos archivos en jsDelivr y la tienda toma la versión nueva en 1–2 min (no hace falta subir el `?v=`). Para purgar todo a mano: GitHub → Actions → "Purge jsDelivr (tienda)" → Run workflow.
  ```

- En cada cambio: editar `public/nuvemshop.css`, hacer deploy y subir el número de `?v=N` en Nuvemshop (para que no quede la versión vieja cacheada).
