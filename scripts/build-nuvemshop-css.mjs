// Junta los CSS de src/nuvemshop/ (uno por sección, en orden alfabético)
// en public/nuvemshop.css, que es el único archivo que carga la tienda Nuvemshop.
//
// Uso: npm run css:nuvemshop   (también corre solo antes de `npm run build`)
// En Nuvemshop → CSS personalizado va SOLO:
//   @import url('https://cdn.jsdelivr.net/gh/LEBrieva/julu-landing@main/public/nuvemshop.css');
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const srcDir = new URL('../src/nuvemshop/', import.meta.url);
const outFile = new URL('../public/nuvemshop.css', import.meta.url);

const files = readdirSync(srcDir).filter((f) => f.endsWith('.css')).sort();

const header = `/* =====================================================================
   JULU — CSS de la tienda Nuvemshop
   ARCHIVO GENERADO: no editar a mano. Se edita src/nuvemshop/*.css y se corre
   \`npm run css:nuvemshop\` (también corre solo antes de \`npm run build\`).
   En Nuvemshop (CSS personalizado) va SOLO:
     @import url('https://cdn.jsdelivr.net/gh/LEBrieva/julu-landing@main/public/nuvemshop.css');
   Imágenes decorativas: public/nuvemshop/*.webp (rutas relativas a este archivo)

   Partes, en este orden:
${files.map((f) => `     - ${f}`).join('\n')}
   ===================================================================== */
`;

const body = files
  .map((f) => readFileSync(new URL(f, srcDir), 'utf8').trim())
  .join('\n\n\n');

writeFileSync(outFile, `${header}\n\n${body}\n`);
console.log(`nuvemshop.css generado con ${files.length} partes`);
