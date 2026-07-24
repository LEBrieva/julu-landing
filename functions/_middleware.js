// Redirige 301 al host canónico (julu.clothing) todo el tráfico que llegue
// por hosts alternativos, para no tener contenido duplicado ni exponer la
// URL interna del proyecto de Cloudflare Pages.
//
// - www.julu.clothing   -> julu.clothing  (canonicaliza el www)
// - julu-landing.pages.dev -> julu.clothing  (oculta la URL interna del proyecto)
//
// Solo redirige estos hosts EXACTOS. Los deploys de preview (que usan
// subdominios random *.julu-landing.pages.dev) siguen funcionando normal.
const CANONICAL_HOST = 'julu.clothing';
const REDIRECT_HOSTS = new Set(['www.julu.clothing', 'julu-landing.pages.dev']);

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  if (REDIRECT_HOSTS.has(url.hostname)) {
    url.protocol = 'https:';
    url.hostname = CANONICAL_HOST;
    url.port = '';
    // Conserva ruta + query string (ej: /sobre?utm=x -> julu.clothing/sobre?utm=x)
    return Response.redirect(url.toString(), 301);
  }

  return next();
}
