import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage from '@/components/layout/LegalPage'
import { LEGAL, SITE_DOMAIN } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Aviso legal — Pellisoft',
  description: 'Aviso legal e información del titular de pellisoft.com.',
}

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso legal">
      <h2>1. Datos identificativos</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la
        Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de
        este sitio web:
      </p>
      <ul>
        <li><strong>Titular:</strong> {LEGAL.owner}</li>
        <li><strong>NIF:</strong> {LEGAL.nif}</li>
        <li><strong>Domicilio:</strong> {LEGAL.address}</li>
        <li>
          <strong>Email:</strong> <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
        </li>
        {LEGAL.registry && (
          <li><strong>Datos registrales:</strong> {LEGAL.registry}</li>
        )}
        <li><strong>Sitio web:</strong> {SITE_DOMAIN}</li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        Este sitio web tiene carácter informativo. Presenta los servicios de desarrollo de
        software, automatización industrial y consultoría de Pellisoft, así como los productos y
        proyectos que desarrolla.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso a esta web es libre y gratuito e implica la aceptación de este aviso legal. El
        usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para
        actividades ilícitas o que puedan dañar a Pellisoft o a terceros.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Los textos, diseños, logotipos, código y demás contenidos de esta web, así como las marcas
        de los productos que aquí se muestran, pertenecen a su titular o a terceros que han
        autorizado su uso. Queda prohibida su reproducción, distribución o transformación sin
        autorización expresa, salvo para uso personal y privado.
      </p>

      <h2>5. Enlaces a otros sitios</h2>
      <p>
        Esta web contiene enlaces a sitios externos, como las webs de nuestros productos. Pellisoft
        no se responsabiliza de los contenidos ni de las políticas de privacidad de sitios que no
        gestiona directamente.
      </p>

      <h2>6. Responsabilidad</h2>
      <p>
        Pellisoft procura que la información publicada sea correcta y esté actualizada, pero no
        garantiza la ausencia de errores ni la disponibilidad ininterrumpida del sitio, y no será
        responsable de los daños que pudieran derivarse de su uso.
      </p>

      <h2>7. Protección de datos</h2>
      <p>
        El tratamiento de los datos personales que nos facilites se describe en la{' '}
        <Link href="/privacidad">política de privacidad</Link>.
      </p>

      <h2>8. Legislación aplicable</h2>
      <p>
        Este aviso legal se rige por la legislación española. Para cualquier controversia, las
        partes se someten a los juzgados y tribunales que correspondan conforme a la normativa
        aplicable, incluida la de protección de consumidores cuando proceda.
      </p>
    </LegalPage>
  )
}
