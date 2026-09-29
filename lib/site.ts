// Datos globales del sitio — fuente única para dominio y email de contacto
export const SITE_DOMAIN = 'pellisoft.com'
export const SITE_URL = `https://${SITE_DOMAIN}`
export const CONTACT_EMAIL = 'fmartinezp@pellisoft.com'

// Titular de la web (aviso legal y privacidad).
// TODO: rellenar antes de publicar — los valores entre corchetes se ven tal cual en la web.
export const LEGAL = {
  owner: '[NOMBRE Y APELLIDOS O RAZÓN SOCIAL]',
  nif: '[NIF]',
  address: '[CALLE Y NÚMERO], 44500 Andorra (Teruel), España',
  email: CONTACT_EMAIL,
  // Solo si es una sociedad inscrita en el Registro Mercantil; si no, dejar en null
  registry: null as string | null,
  updatedAt: '29 de septiembre de 2026',
}
