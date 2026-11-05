// Redirige 301 al host canónico de la landing (landing.julu.clothing) el tráfico
// que llegue por hosts alternativos, para no tener contenido duplicado ni exponer
// la URL interna del proyecto de Cloudflare Pages.
//
// - julu-landing.pages.dev -> landing.julu.clothing  (oculta la URL interna)
//
// julu.clothing y www.julu.clothing pasan a ser la tienda (Nuvemshop): dejan de
// apuntar a este proyecto. Mientras dure la transición, julu.clothing sigue
// sirviendo la landing tal cual (sin redirigir) para no romper el CSS/JS que la
// tienda todavía cargue desde acá.
//
// Solo redirige estos hosts EXACTOS. Los deploys de preview (que usan
// subdominios random *.julu-landing.pages.dev) siguen funcionando normal.
const CANONICAL_HOST = 'landing.julu.clothing';
const REDIRECT_HOSTS = new Set(['julu-landing.pages.dev']);

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  if (REDIRECT_HOSTS.has(url.hostname)) {
    url.protocol = 'https:';
    url.hostname = CANONICAL_HOST;
    url.port = '';
    // Conserva ruta + query string (ej: /sobre?utm=x -> landing.julu.clothing/sobre?utm=x)
    return Response.redirect(url.toString(), 301);
  }

  return next();
}
