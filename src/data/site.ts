/* ============================================================
   JULU — Configuración de contenido
   ------------------------------------------------------------
   TODO el texto, los links y las imágenes de la landing viven
   acá. Para editar la marca no hace falta tocar componentes:
   cambiá los valores de este archivo.

   El texto visible está en português brasileiro (marca para Brasil).
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
  welcome: 'Bem-vindos à JULU',
  /** Origen / sello de la marca. */
  origin: 'Design autoral · Indústria brasileira',
} as const;

/* ---------- SEO ---------- */
export const seo = {
  title: 'JULU — Roupas autorais para quem ama gatos',
  description:
    'A JULU é roupa autoral brasileira para mães e pais de gato. Designs artísticos, nada de produção em série. Camisetas, oversized e cropped inspirados nos gatos que a gente ama.',
  /** Imagen Open Graph (1200×630). Vive en /public/og/. */
  ogImage: '/og/og-image.jpg',
  locale: 'pt_BR',
  themeColor: '#0a0a0a',
} as const;

/* ---------- Links de tienda (globales) ---------- */
export const stores: StoreLinks = {
  shopee: 'https://shopee.com.br/julu', // ← reemplazar por el link real
  mercadolibre: 'https://produto.mercadolivre.com.br/julu', // ← reemplazar
};

/* ---------- Redes y contacto ---------- */
export const social = {
  instagram: { label: 'Instagram', href: 'https://instagram.com/julu' },
  tiktok: { label: 'TikTok', href: 'https://tiktok.com/@julu' },
  whatsapp: {
    label: 'WhatsApp',
    href: 'https://wa.me/5511900000000', // ← reemplazar por el número real (Brasil +55)
  },
  email: { label: 'Email', href: 'mailto:ola@julu.com' },
} as const;

/* ---------- Navegación ---------- */
export const nav: NavLink[] = [
  { label: 'O que é JULU', href: '#concepto' },
  { label: 'Roupas', href: '#prendas' },
  { label: 'Quem somos', href: '#nosotros' },
  { label: 'Lifestyle', href: '#lifestyle' },
  { label: 'Criadores', href: '#creadores' },
];

/* ---------- Hero ---------- */
export const hero = {
  image: heroImg,
  imageAlt:
    'Pessoa usando uma roupa JULU de estampa felina em fundo urbano',
  eyebrow: brand.origin,
  title: brand.welcome,
  subtitle: brand.tagline,
  ctaPrimary: { label: 'Ver as roupas', href: '#prendas' },
  ctaSecondary: { label: 'Conheça a história', href: '#concepto' },
};

/* ---------- Concepto: ¿Qué es JULU? ---------- */
export const concept = {
  image: conceptImg,
  imageAlt:
    'Casal com camisetas JULU brancas mostrando a estampa ALVARÁ de design autoral',
  eyebrow: 'O que é JULU?',
  title: 'Não é só mais uma camiseta. É design autoral.',
  paragraphs: [
    'A JULU nasce no Brasil como um projeto de design autoral: cada estampa é uma obra pensada, desenhada e editada em tiragens pequenas. Nada de produção em série nem do que você acha em qualquer loja de rede.',
    'Nossas roupas são para quem ama gatos e quer vesti-los com orgulho. Camisetas, oversized e cropped que combinam a atitude do streetwear com o carinho gateiro.',
    'Você leva uma peça com história: edições limitadas, materiais caprichados e um design que você não vai ver repetido por aí.',
  ],
  highlights: [
    { label: 'Design autoral', detail: 'Estampas originais, nada genérico' },
    { label: 'Edições limitadas', detail: 'Tiragens pequenas, nada em série' },
    { label: 'Feito no Brasil', detail: 'Qualidade e identidade própria' },
  ],
};

/* ---------- Tienda (escaparate / vidriera) ---------- */
export const storefront = {
  /** Captura de la tienda que se muestra dentro del mockup de celular. */
  image: storefrontImg,
  imageAlt: 'Vista da loja online da JULU com as roupas disponíveis',
  eyebrow: 'Nossa loja',
  title: 'Curtiu? Compre aqui',
  subtitle:
    'Toda a coleção, estoque e preços atualizados estão nas nossas lojas oficiais. Escolha onde comprar e a gente leva a JULU até você.',
  /** Puntos cortos de confianza que se muestran junto a los botones. */
  perks: [
    'Estoque e preços sempre em dia',
    'Compra protegida em cada plataforma',
    'Edições limitadas — quando esgota, esgotou',
  ],
};

/* ---------- ¿Quiénes están detrás? ---------- */
export const behind = {
  eyebrow: 'Quem está por trás disso?',
  title: 'Uma família (gateira) por trás de cada estampa',
  intro:
    'A JULU somos nós dois, junto com os quatro gatos que nos inspiram todos os dias. Eles são a marca.',
};

export const founders: Person[] = [
  {
    name: 'Juli',
    role: 'Design & direção de arte',
    bio: 'A mão por trás de cada estampa. Desenha, edita e coloca alma em cada peça.',
    image: juli,
    nameInImage: true,
  },
  {
    name: 'Lucas',
    role: 'Produção & comunidade',
    bio: 'Leva as ideias para a realidade e conecta a JULU com a comunidade gateira.',
    image: lucas,
    nameInImage: true,
  },
];

export const cats: Person[] = [
  {
    name: 'Roge',
    role: 'Diretor criativo (autoproclamado)',
    bio: 'O chefe. Se uma estampa não o convence, senta em cima dela até a gente mudar.',
    image: roge,
    isCat: true,
  },
  {
    name: 'Minimichi',
    role: 'A inspiração fofa',
    bio: 'Pequena, mas cheia de personalidade. A carinha dela está em mais de um design.',
    image: minimichi,
    isCat: true,
  },
  {
    name: 'Negrito',
    role: 'Musa noturna',
    bio: 'Elegante e misterioso. A ele devemos toda a linha em preto.',
    image: negrito,
    isCat: true,
  },
  {
    name: 'Gordis',
    role: 'Controle de qualidade',
    bio: 'Testa cada tecido dormindo em cima. Se ele aprova, vai pra venda.',
    image: gordis,
    isCat: true,
  },
];

/* ---------- Lifestyle / Lookbook ---------- */
export const lookbook = {
  eyebrow: 'Na rua',
  title: 'Assim se vive a JULU',
  subtitle: 'Roupas pensadas para usar todo dia. Veja e garanta a sua.',
  looks: [
    { image: look1, alt: 'Look urbano com camiseta JULU de estampa felina' },
    { image: look2, alt: 'Moletom oversized JULU em contexto de rua' },
    { image: look3, alt: 'Cropped JULU combinado em look de dia' },
  ],
};

/* ---------- CTA creadores de contenido ---------- */
export const creatorCta = {
  eyebrow: 'Colaborações',
  title: 'É criador de conteúdo?',
  text: 'Quer usar nossas roupas e mostrar para a sua comunidade? A gente ia adorar trabalhar com você. Manda mensagem e a gente cria algo juntos.',
  cta: { label: 'Fale com a gente', href: social.whatsapp.href },
};

/* ---------- Newsletter (popup) ----------
   El popup junta e-mails para avisar de lançamentos y cupones.
   ───────────────────────────────────────────────────────────
   ENCHUFAR BREVO (cuando tengas la cuenta):
   1. En Brevo creá un formulario de suscripción (Contactos → Formularios).
   2. Copiá la "serve URL" del form (termina en sibforms.com/serve/...).
   3. Pegala en `action` acá abajo. Listo, ya guarda los e-mails.
   Mientras `action` esté vacío, el popup funciona en MODO DEMO:
   valida y muestra el "gracias", pero no envía nada a ningún lado.
   ─────────────────────────────────────────────────────────── */
export const newsletter = {
  /** Serve URL del form de Brevo. Vacío = modo demo (no envía). */
  action: 'https://a9319d5d.sibforms.com/serve/MUIFAAIAMX5T6pXXKM9VO_h_3oMtT28K7z3aeL1hyqACMI3Y6TSjqFRz24l41usauXu15afOU5eGlTqk49nB0AbGyG6ZSmBamEhY9VOZ4d4l0dSPk4zDEufCEJRyVQ67xiNI2yNHuN-0bFc9sUZ43w_caIvtq43ZM4OfRI5yFLG_R46kJ_ntV_7e5ZA6Bo7GllyPSS4lSBf7FayZfg==',
  /** Nombre del campo de e-mail que espera el form de Brevo. */
  emailField: 'EMAIL',
  /** Fracción de scroll (0–1) a partir de la cual aparece el popup. */
  scrollTrigger: 0.45,
  /** Días de espera para volver a mostrarlo si lo cerró sin suscribirse. */
  remindAfterDays: 7,
  eyebrow: 'Clube JULU',
  title: 'Entra na ninhada',
  text: 'Cadastre seu e-mail e seja a primeira pessoa a saber dos lançamentos, edições limitadas e cupons miados só pra você.',
  emailPlaceholder: 'seu melhor e-mail',
  submitLabel: 'Quero entrar',
  consent:
    'Ao se cadastrar, você aceita receber e-mails da JULU. Dá pra sair quando quiser.',
  successTitle: 'Quase lá! 🐾',
  successText:
    'Enviamos um e-mail pra você confirmar a inscrição. Dá uma olhada na caixa de entrada (e no spam, por via das dúvidas).',
  errorText: 'Ops, confere o e-mail e tenta de novo.',
} as const;

/* ---------- Footer ---------- */
export const footer = {
  tagline: 'Design autoral para quem ama gatos.',
  copyright: `© ${'2025'} JULU. Todos os direitos reservados.`,
};
