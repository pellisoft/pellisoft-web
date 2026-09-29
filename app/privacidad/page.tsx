import type { Metadata } from 'next'
import LegalPage from '@/components/layout/LegalPage'
import { LEGAL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Política de privacidad — Pellisoft',
  description: 'Cómo trata Pellisoft los datos personales de quienes contactan a través de la web.',
}

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad">
      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li><strong>Responsable:</strong> {LEGAL.owner}</li>
        <li><strong>NIF:</strong> {LEGAL.nif}</li>
        <li><strong>Domicilio:</strong> {LEGAL.address}</li>
        <li>
          <strong>Email:</strong> <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
        </li>
      </ul>

      <h2>2. Qué datos tratamos</h2>
      <p>
        Solo los que nos facilitas en el formulario de contacto o por email: <strong>nombre</strong>,{' '}
        <strong>empresa</strong> (opcional), <strong>email</strong> y el{' '}
        <strong>contenido de tu mensaje</strong>. No pedimos datos especialmente protegidos; te
        rogamos que no los incluyas en el mensaje.
      </p>

      <h2>3. Para qué los usamos</h2>
      <p>
        Para responder a tu consulta y, si lo solicitas, preparar una propuesta. No enviamos
        comunicaciones comerciales ni boletines, y no tomamos decisiones automatizadas con tus
        datos.
      </p>

      <h2>4. Base legal</h2>
      <p>
        Tu solicitud de información y la aplicación, a petición tuya, de medidas precontractuales
        (art. 6.1.b del RGPD), así como el consentimiento que prestas al enviarnos el formulario
        (art. 6.1.a del RGPD), que puedes retirar en cualquier momento.
      </p>

      <h2>5. Cuánto tiempo los conservamos</h2>
      <p>
        El tiempo necesario para atender tu consulta. Si no llega a iniciarse una relación
        profesional, los suprimimos como máximo 12 meses después del último contacto. Si se inicia,
        se conservarán durante la relación y los plazos legales que correspondan.
      </p>

      <h2>6. Destinatarios</h2>
      <p>
        No cedemos tus datos a terceros salvo obligación legal. Para prestar el servicio nos
        apoyamos en proveedores que actúan como encargados del tratamiento:
      </p>
      <ul>
        <li><strong>Vercel Inc.</strong>: alojamiento de la web.</li>
        <li><strong>Resend</strong>: envío técnico del email que genera el formulario.</li>
        <li>Nuestro proveedor de correo electrónico, donde recibimos y respondemos los mensajes.</li>
      </ul>
      <p>
        Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo. En ese
        caso lo hacen con garantías adecuadas, como el Marco de Privacidad de Datos UE-EE. UU. o las
        cláusulas contractuales tipo aprobadas por la Comisión Europea.
      </p>

      <h2>7. Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del
        tratamiento y portabilidad escribiendo a{' '}
        <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. Si consideras que no hemos atendido
        correctamente tu solicitud, puedes reclamar ante la Agencia Española de Protección de
        Datos (
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
      </p>

      <h2>8. Cookies y analítica</h2>
      <p>
        Esta web <strong>no utiliza cookies</strong>. Para conocer de forma agregada cuántas
        visitas recibimos usamos Plausible Analytics, una herramienta que no emplea cookies, no
        guarda direcciones IP ni crea perfiles de usuario. Por eso no mostramos un aviso de
        cookies.
      </p>

      <h2>9. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos: conexión
        cifrada (HTTPS), acceso restringido a los mensajes y proveedores que cumplen la normativa
        de protección de datos.
      </p>
    </LegalPage>
  )
}
