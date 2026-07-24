// Pages Function: POST /api/subscribe
//
// Flujo: el form (popup o sección) postea { email, token } acá.
//   1. Verifica el token de Cloudflare Turnstile (anti-bot) con el secret.
//   2. Si pasa, reenvía el e-mail al MISMO Brevo serve URL de siempre
//      (server-side), preservando el flujo actual (single opt-in + welcome).
//   3. Devuelve JSON { ok } real (ya no el envío "a ciegas" del no-cors).
//
// Requiere la env var TURNSTILE_SECRET (Settings → Environment variables en
// Cloudflare Pages, tanto Production como Preview).
//
// SERVE_URL/EMAIL_FIELD deben coincidir con `newsletter` en src/data/site.ts.

const SERVE_URL =
  'https://a9319d5d.sibforms.com/serve/MUIFAAIAMX5T6pXXKM9VO_h_3oMtT28K7z3aeL1hyqACMI3Y6TSjqFRz24l41usauXu15afOU5eGlTqk49nB0AbGyG6ZSmBamEhY9VOZ4d4l0dSPk4zDEufCEJRyVQ67xiNI2yNHuN-0bFc9sUZ43w_caIvtq43ZM4OfRI5yFLG_R46kJ_ntV_7e5ZA6Bo7GllyPSS4lSBf7FayZfg==';
const EMAIL_FIELD = 'EMAIL';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  const email = String(body?.email ?? '').trim();
  const token = String(body?.token ?? '');

  if (!EMAIL_RE.test(email)) return json({ ok: false, error: 'email' }, 400);
  if (!token) return json({ ok: false, error: 'captcha' }, 400);
  if (!env.TURNSTILE_SECRET) {
    // Falta configurar la env var — no dejamos pasar sin verificar.
    return json({ ok: false, error: 'server_config' }, 500);
  }

  // 1. Verificar Turnstile
  const ip = request.headers.get('CF-Connecting-IP') || '';
  let outcome;
  try {
    const verify = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET,
          response: token,
          remoteip: ip,
        }),
      }
    );
    outcome = await verify.json();
  } catch {
    return json({ ok: false, error: 'captcha_unreachable' }, 502);
  }
  if (!outcome?.success) return json({ ok: false, error: 'captcha' }, 403);

  // 2. Reenviar a Brevo (server-side, mismo serve URL que el form del navegador)
  try {
    const fd = new FormData();
    fd.append(EMAIL_FIELD, email);
    const bres = await fetch(SERVE_URL, { method: 'POST', body: fd });
    // El serve de Brevo responde 2xx (o redirige a su página de confirmación).
    // Tratamos cualquier respuesta < 400 como alta OK.
    if (bres.status < 400) return json({ ok: true });
    return json({ ok: false, error: 'brevo' }, 502);
  } catch {
    return json({ ok: false, error: 'network' }, 502);
  }
}
