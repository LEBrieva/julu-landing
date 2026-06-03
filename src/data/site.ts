/* ============================================================
   JULU — Configuración de contenido
   ------------------------------------------------------------
   TODO el texto, los links y las imágenes de la landing viven
   acá. Para editar la marca no hace falta tocar componentes:
   cambiá los valores de este archivo.

   Las imágenes son placeholders en src/assets/ — reemplazá los
   archivos manteniendo el mismo nombre y se reoptimizan solas.
   ============================================================ */

import type { ImageMetadata } from 'astro';

// — Imágenes (placeholders; reemplazables manteniendo el nombre) —
import heroImg from '@/assets/hero.jpg';
import conceptImg from '@/assets/concept.jpg';
import storefrontImg from '@/assets/storefront.jpg';
import juli from '@/assets/family/juli.jpg';
import lucas from '@/assets/family/lucas.jpg';
import roge from '@/assets/family/roge.jpg';
import minimichi from '@/assets/family/minimichi.jpg';
import negrito from '@/assets/family/negrito.jpg';
import gordis from '@/assets/family/gordis.jpg';
import look1 from '@/assets/lifestyle/look-1.jpg';
import look2 from '@/assets/lifestyle/look-2.jpg';
import look3 from '@/assets/lifestyle/look-3.jpg';

/* ---------- Tipos ---------- */
export interface StoreLinks {
  shopee: string;
  mercadolibre: string;
}

export interface Person {
  name: string;
  role: string;
  bio: string;
  image: ImageMetadata;
  /** true para los michis — habilita un detalle visual distinto. */
  isCat?: boolean;
  /** true cuando la imagen ya trae el nombre — oculta el título de la tarjeta. */
  nameInImage?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

/* ---------- Marca ---------- */
export const brand = {
  name: 'JULU',
  /** Tagline corto del hero. */
  tagline: 'ROUPAS PRA QUEM É VIBE',
  /** Frase de bienvenida del banner. */
  welcome: 'Bienvenidos a JULU',
  /** Origen / sello de la marca. */
  origin: 'Diseño de autor · Industria brasilera',
} as const;

/* ---------- SEO ---------- */
export const seo = {
  title: 'JULU — Ropa de autor para amantes de los gatos',
  description:
    'JULU es ropa de autor brasilera para mamás y papás michis. Diseños artísticos, no producción en serie. Remeras, oversized y cropped inspirados en los gatos que amamos.',
  /** Imagen Open Graph (1200×630). Vive en /public/og/. */
  ogImage: '/og/og-image.jpg',
  locale: 'es_AR',
  themeColor: '#0a0a0a',
} as const;

/* ---------- Links de tienda (globales) ---------- */
export const stores: StoreLinks = {
  shopee: 'https://shopee.com.br/julu', // ← reemplazar por el link real
  mercadolibre: 'https://articulo.mercadolibre.com.ar/julu', // ← reemplazar
};

/* ---------- Redes y contacto ---------- */
export const social = {
  instagram: { label: 'Instagram', href: 'https://instagram.com/julu' },
  tiktok: { label: 'TikTok', href: 'https://tiktok.com/@julu' },
  whatsapp: {
    label: 'WhatsApp',
    href: 'https://wa.me/5491100000000', // ← reemplazar por el número real
  },
  email: { label: 'Email', href: 'mailto:hola@julu.com' },
} as const;

/* ---------- Navegación ---------- */
export const nav: NavLink[] = [
  { label: 'Qué es JULU', href: '#concepto' },
  { label: 'Prendas', href: '#prendas' },
  { label: 'Quiénes somos', href: '#nosotros' },
  { label: 'Lifestyle', href: '#lifestyle' },
  { label: 'Creadores', href: '#creadores' },
];

/* ---------- Hero ---------- */
export const hero = {
  image: heroImg,
  imageAlt:
    'Persona luciendo una prenda JULU de estampa felina sobre fondo urbano',
  eyebrow: brand.origin,
  title: brand.welcome,
  subtitle: brand.tagline,
  ctaPrimary: { label: 'Ver las prendas', href: '#prendas' },
  ctaSecondary: { label: 'Conocé la historia', href: '#concepto' },
};

/* ---------- Concepto: ¿Qué es JULU? ---------- */
export const concept = {
  image: conceptImg,
  imageAlt:
    'Pareja con remeras JULU blancas mostrando la estampa ALVARÁ de diseño de autor',
  eyebrow: '¿Qué es JULU?',
  title: 'No es una remera más. Es diseño de autor.',
  paragraphs: [
    'JULU nace en Brasil como un proyecto de diseño de autor: cada estampa es una obra pensada, dibujada y editada en tiradas chicas. Nada de producción en serie ni de lo que encontrás en cualquier cadena.',
    'Nuestras prendas son para quienes aman a los gatos y quieren llevarlos puestos con orgullo. Remeras, oversized y cropped que combinan la actitud del streetwear con el cariño michi.',
    'Comprás una pieza con historia: ediciones limitadas, materiales cuidados y un diseño que no vas a ver repetido en la calle.',
  ],
  highlights: [
    { label: 'Diseño de autor', detail: 'Estampas originales, no genéricas' },
    { label: 'Ediciones limitadas', detail: 'Tiradas chicas, nada en serie' },
    { label: 'Hecho en Brasil', detail: 'Calidad e identidad propia' },
  ],
};

/* ---------- Tienda (escaparate / vidriera) ---------- */
export const storefront = {
  /** Captura de la tienda que se muestra dentro del mockup de celular. */
  image: storefrontImg,
  imageAlt: 'Vista de la tienda online de JULU con las prendas disponibles',
  eyebrow: 'Nuestra tienda',
  title: '¿Te gustan? Comprá acá',
  subtitle:
    'Toda la colección, stock y precios actualizados están en nuestras tiendas oficiales. Elegí dónde comprar y te llevamos JULU a casa.',
  /** Puntos cortos de confianza que se muestran junto a los botones. */
  perks: [
    'Stock y precios siempre al día',
    'Compra protegida en cada plataforma',
    'Ediciones limitadas — cuando se agotan, se agotan',
  ],
};

/* ---------- ¿Quiénes están detrás? ---------- */
export const behind = {
  eyebrow: '¿Quiénes están detrás de esto?',
  title: 'Una familia (gatuna) detrás de cada estampa',
  intro:
    'JULU lo hacemos nosotros dos, junto a los cuatro michis que nos inspiran todos los días. Ellos son la marca.',
};

export const founders: Person[] = [
  {
    name: 'Juli',
    role: 'Diseño & dirección de arte',
    bio: 'La mano detrás de cada estampa. Dibuja, edita y le pone alma a cada pieza.',
    image: juli,
    nameInImage: true,
  },
  {
    name: 'Lucas',
    role: 'Producción & comunidad',
    bio: 'Lleva las ideas a la realidad y conecta a JULU con la comunidad michi.',
    image: lucas,
    nameInImage: true,
  },
];

export const cats: Person[] = [
  {
    name: 'Roge',
    role: 'Director creativo (autoproclamado)',
    bio: 'El jefe. Si una estampa no lo convence, se sienta encima hasta que la cambiamos.',
    image: roge,
    isCat: true,
  },
  {
    name: 'Minimichi',
    role: 'La inspiración tierna',
    bio: 'Chiquita pero con carácter. Su carita está en más de un diseño.',
    image: minimichi,
    isCat: true,
  },
  {
    name: 'Negrito',
    role: 'Musa nocturna',
    bio: 'Elegante y misterioso. Le debemos toda la línea en negro.',
    image: negrito,
    isCat: true,
  },
  {
    name: 'Gordis',
    role: 'Control de calidad',
    bio: 'Prueba cada tela durmiendo encima. Si le gusta, sale a la venta.',
    image: gordis,
    isCat: true,
  },
];

/* ---------- Lifestyle / Lookbook ---------- */
export const lookbook = {
  eyebrow: 'En la calle',
  title: 'Así se vive JULU',
  subtitle: 'Prendas pensadas para usar todos los días. Mirá y conseguí la tuya.',
  looks: [
    { image: look1, alt: 'Look urbano con remera JULU de estampa felina' },
    { image: look2, alt: 'Hoodie oversized JULU en contexto callejero' },
    { image: look3, alt: 'Cropped JULU combinado en outfit de día' },
  ],
};

/* ---------- CTA creadores de contenido ---------- */
export const creatorCta = {
  eyebrow: 'Colaboraciones',
  title: '¿Sos creador de contenido?',
  text: '¿Te gustaría lucir nuestras prendas y mostrarlas a tu comunidad? Nos encantaría trabajar con vos. Escribinos y armamos algo juntos.',
  cta: { label: 'Contactanos', href: social.whatsapp.href },
};

/* ---------- Footer ---------- */
export const footer = {
  tagline: 'Diseño de autor para quienes aman a los gatos.',
  copyright: `© ${'2025'} JULU. Todos los derechos reservados.`,
};
