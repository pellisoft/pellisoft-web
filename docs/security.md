# Seguridad — pellisoft.com

Registro vivo de la revisión de seguridad de la web: qué se ha analizado, qué se ha corregido y qué queda pendiente. Añadir una entrada nueva en el [Historial](#historial) cada vez que se toque algo relacionado con seguridad.

## Superficie de ataque

| Elemento | Descripción | Riesgo |
|---|---|---|
| `POST /api/contact` | Único endpoint dinámico. Envía email vía Resend. | Spam, abuso del buzón, phishing vía `replyTo` |
| Páginas estáticas | Prerenderizadas en build (`/`, `/adn`, `/servicios`, `/contacto`, `/proyectos/[slug]`) | XSS / clickjacking (mitigado con cabeceras) |
| Scripts de terceros | Plausible Analytics (`plausible.io`) | Compromiso del proveedor (limitado por CSP) |
| Dependencias npm | Next.js 16.3.7, React, Resend, Zod… | Vulnerabilidades conocidas (`npm audit`) |
| Infraestructura | Vercel (hosting) + Cloudflare (**solo DNS, sin proxy**) | Cabeceras de IP de Cloudflare no fiables |

## Controles implementados

### 1. Formulario de contacto (`app/api/contact/route.ts`)

- **Comprobación de `Origin`**: solo se aceptan peticiones desde `https://pellisoft.com` y `https://www.pellisoft.com` (en desarrollo también `http://localhost:<puerto>`). Sin `Origin` → `403`. Evita que otras webs usen el formulario como relé de spam.
- **`Content-Type: application/json` obligatorio** → `415` en caso contrario. Un `<form>` HTML cross-site solo puede enviar `text/plain`, `urlencoded` o `multipart` sin preflight CORS.
- **IP del cliente fiable**: se usa `x-real-ip` / `x-forwarded-for` (los fija el edge de Vercel). **No** se usa `cf-connecting-ip`: como Cloudflare no hace de proxy, esa cabecera la controla el cliente y permitía saltarse el rate limit.
- **Rate limit**: 1 envío por IP cada 60 s. Mapa en memoria con limpieza de entradas caducadas y tope de 5 000 entradas.
  - ⚠️ Es por instancia serverless y se pierde en cada cold start → mitigación parcial (ver pendientes).
- **Validación Zod en servidor**:
  - `name`, `company`: `trim`, longitudes máximas y **sin caracteres de control** (evita CR/LF en el asunto del email).
  - `email`: `z.email()` (API de Zod v4), máx. 254 caracteres.
  - `project`: 10–2000 caracteres.
  - `website` (honeypot): máx. 200.
- **JSON malformado** → `400` (antes devolvía `500`).
- **Honeypot**: si `website` viene relleno se responde `200` sin enviar email.
- **Errores genéricos** al cliente; detalles solo en logs del servidor.
- **Email**: plantilla React Email; React escapa todo el contenido del usuario.

### 2. Cabeceras HTTP (`next.config.ts`)

Aplicadas a todas las rutas (`/:path*`):

| Cabecera | Valor | Motivo |
|---|---|---|
| `Content-Security-Policy` | ver abajo | Limita orígenes de scripts, estilos, imágenes, conexiones |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Fuerza HTTPS (2 años) |
| `X-Frame-Options` | `DENY` | Anti-clickjacking (navegadores antiguos) |
| `X-Content-Type-Options` | `nosniff` | Evita MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | No filtra rutas a terceros |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=()` | Desactiva APIs sensibles |
| `Cross-Origin-Opener-Policy` | `same-origin` | Aísla la ventana de popups cross-origin |

Además `poweredByHeader: false` (quita `X-Powered-By: Next.js`).

**CSP en producción:**

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://plausible.io;
style-src 'self' 'unsafe-inline';
img-src 'self' blob: data:;
font-src 'self';
connect-src 'self' https://plausible.io;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
upgrade-insecure-requests
```

En desarrollo se añade `'unsafe-eval'` (React dev tools) y `ws:` (HMR).

**Por qué `'unsafe-inline'` y no nonces:** la web es estática (prerenderizada). Según la guía de Next (`node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`), los nonces obligan a renderizado dinámico en cada petición (sin caché CDN, más coste). Como no hay contenido de usuario renderizado en las páginas, el riesgo de XSS es bajo. Alternativa futura: SRI experimental de Next (hashes en build, mantiene estático).

Si se añade un recurso externo nuevo (fuentes, imágenes remotas, iframes, otro analytics…) **hay que añadir su origen a la CSP** o se bloqueará.

### 3. Secretos

- `.env*` en `.gitignore` (excepto `.env.example` con valores de ejemplo).
- Revisado todo el historial de git: sin claves reales (`re_…`, tokens) commiteadas.
- Secretos de producción solo en variables de entorno de Vercel: `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`.

### 4. Otros puntos revisados sin problemas

- `dangerouslySetInnerHTML` solo en el JSON-LD de `app/layout.tsx`, con datos estáticos.
- Enlaces externos con `rel="noopener noreferrer"`.
- `/studio` no existe → `404` (Sanity eliminado).
- `robots.txt` y sitemap no exponen rutas internas (`/api/*` excluido).

## Pendientes

### 🔴 Alta prioridad

_Nada pendiente._ Next actualizado a 16.3.7 y Sanity eliminado (ver historial).

### 🟡 Dependencias de desarrollo

- `vitest` / `@vitest/ui` 4.1.6 → vulnerabilidad moderada (path traversal en `@vitest/mocker`). Solo afecta a desarrollo local y no hay tests en el repo. Opciones:
  ```bash
  npm install -D vitest@latest @vitest/ui@latest
  ```
  o eliminarlas si no se van a escribir tests (`npm uninstall vitest @vitest/ui`).

### 🟠 Media

4. **Rate limit real**: el actual es por instancia. Opciones:
   - Cloudflare Turnstile en el formulario (gratis, sin estado, también frena bots).
   - Upstash Redis / Vercel KV con `@upstash/ratelimit`.
5. **Activar proxy de Cloudflare** (nube naranja) si se quiere WAF / protección DDoS. Si se activa, `cf-connecting-ip` pasa a ser fiable pero hay que revisar `getClientIp()` y restringir el acceso directo a Vercel.
6. **HSTS preload**: tras verificar que todos los subdominios sirven HTTPS, enviar el dominio a <https://hstspreload.org>.

### 🟡 Baja

7. Registros DNS de email: comprobar SPF, DKIM (Resend) y DMARC (`p=quarantine` o `reject`) para `pellisoft.com`.
8. Valorar SRI experimental de Next para quitar `'unsafe-inline'` de `script-src`.
9. Añadir `security.txt` en `public/.well-known/security.txt` con email de contacto.

## Cómo verificar

```bash
# Cabeceras en producción
curl -sI https://pellisoft.com

# Dependencias
npm audit --omit=dev

# API: debe devolver 403 (origen ajeno) y 415 (content-type)
curl -s -X POST https://pellisoft.com/api/contact -H "Origin: https://evil.com" -H "Content-Type: application/json" -d '{}'
curl -s -X POST https://pellisoft.com/api/contact -H "Origin: https://pellisoft.com" -H "Content-Type: text/plain" -d '{}'
```

Herramientas externas: <https://securityheaders.com>, <https://observatory.mozilla.org>.

## Historial

### 2026-09-29 — Revisión inicial

- Auditoría de código, historial git, dependencias y cabeceras de producción.
- **Aplicado:**
  - `/api/contact`: comprobación de `Origin`, `Content-Type` obligatorio, IP desde `x-real-ip` (fix bypass de rate limit vía `cf-connecting-ip`), limpieza del mapa de rate limit, rechazo de caracteres de control, `400` en JSON malformado, `z.email()`.
  - `ContactSection.tsx`: `z.email()` + máx. 254.
  - `next.config.ts`: CSP, HSTS con `includeSubDomains; preload`, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `COOP`, `poweredByHeader: false`.
- **Verificado en local:** cabeceras presentes; `403` sin origen / origen ajeno, `415` con `text/plain`, `400` con JSON roto, CRLF en nombre y email inválido; honeypot `200`; home y `/proyectos/plrfactu` sin violaciones CSP; Plausible carga.
- **Dependencias (ejecutado a mano):** `next` y `eslint-config-next` → 16.3.7, `npm uninstall next-sanity @sanity/client @sanity/image-url`, `npm audit fix`. `npm audit`: de 35 vulnerabilidades (2 críticas, 17 altas) a 3 moderadas, solo en `vitest` (desarrollo).
- **Limpieza Sanity:** borrados `lib/sanity/` y `sanity/`, quitado `remotePatterns` de `cdn.sanity.io` (ya no se aceptan imágenes remotas en `next/image`), README actualizado.
- **Verificado tras actualizar:** `tsc` y `next build` OK; home y proyecto renderizan, imágenes cargan, cabeceras y bloqueos de la API siguen activos.
