/**
 * Genera la miniatura para redes sociales (Open Graph / Twitter).
 *
 *   node scripts/generate-og.mjs
 *
 * Salida: src/app/opengraph-image.jpg y src/app/twitter-image.jpg (1200x630).
 * Next.js las detecta por convencion de archivo y emite las etiquetas
 * og:image / twitter:image con tipo y dimensiones correctos.
 *
 * El logo original es un monograma dorado sobre un cuadro negro opaco. Aqui se
 * usa su luminancia como canal alfa para recortar las letras y repintarlas con
 * el dorado de marca, de modo que el fondo de la tarjeta se vea a traves.
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const ANCHO = 1200;
const ALTO = 630;
const DORADO = { r: 232, g: 193, b: 82 }; // #E8C152, el acento de la landing
const ALTO_LOGO = 180;

/** Convierte el monograma en letras doradas sobre fondo transparente. */
async function monogramaTransparente() {
  const origen = path.join(raiz, 'public', 'images', 'logo.webp');

  // La luminancia sirve de alfa: el cuadro negro (~#070707) queda transparente
  // y el dorado del monograma, opaco, conservando el antialiasing de los bordes.
  const { data: luz, info } = await sharp(origen)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixeles = info.width * info.height;
  const rgba = Buffer.alloc(pixeles * 4);

  for (let i = 0; i < pixeles; i++) {
    // Estirar el contraste: por debajo de 24 es fondo, por encima de 120 es logo.
    const alfa = Math.max(0, Math.min(255, Math.round(((luz[i] - 24) / 96) * 255)));
    rgba[i * 4] = DORADO.r;
    rgba[i * 4 + 1] = DORADO.g;
    rgba[i * 4 + 2] = DORADO.b;
    rgba[i * 4 + 3] = alfa;
  }

  return sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim() // recorta el margen transparente que dejaba el cuadro negro
    .resize({ height: ALTO_LOGO, fit: 'inside' })
    .png()
    .toBuffer();
}

const fondo = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#0A0A09"/>
      <stop offset="55%"  stop-color="#000000"/>
      <stop offset="100%" stop-color="#141310"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.27" r="0.62">
      <stop offset="0%"   stop-color="#E8C152" stop-opacity="0.20"/>
      <stop offset="55%"  stop-color="#E8C152" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#E8C152" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${ANCHO}" height="${ALTO}" fill="url(#base)"/>
  <rect width="${ANCHO}" height="${ALTO}" fill="url(#halo)"/>
  <rect x="26" y="26" width="${ANCHO - 52}" height="${ALTO - 52}"
        fill="none" stroke="#E8C152" stroke-opacity="0.30" stroke-width="1.5"/>
</svg>`);

const texto = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <g text-anchor="middle" font-family="Segoe UI, Arial, sans-serif">
    <text x="604" y="302" font-size="22" font-weight="600" letter-spacing="8"
          fill="#E8C152" fill-opacity="0.95">TORO LEGAL ABOGADOS</text>
  </g>
  <g text-anchor="middle" font-family="Book Antiqua, Palatino Linotype, Georgia, serif">
    <text x="600" y="392" font-size="62" font-weight="bold" fill="#FFFFFF">Borra tus deudas legalmente</text>
    <text x="600" y="464" font-size="62" font-weight="bold" font-style="italic" fill="#E8C152">con la Ley de Insolvencia</text>
  </g>
  <rect x="540" y="506" width="120" height="2" fill="#E8C152" fill-opacity="0.55"/>
  <g text-anchor="middle" font-family="Segoe UI, Arial, sans-serif">
    <text x="602" y="556" font-size="21" letter-spacing="4" fill="#B5AC9A">defensalegalfinanciera.com</text>
  </g>
</svg>`);

const logo = await monogramaTransparente();
const meta = await sharp(logo).metadata();

const tarjeta = await sharp(fondo)
  .composite([
    { input: logo, top: 72, left: Math.round((ANCHO - meta.width) / 2) },
    { input: texto, top: 0, left: 0 },
  ])
  .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
  .toBuffer();

const destino = path.join(raiz, 'src', 'app');
await mkdir(destino, { recursive: true });

for (const nombre of ['opengraph-image.jpg', 'twitter-image.jpg']) {
  await writeFile(path.join(destino, nombre), tarjeta);
}

const alt = 'Toro Legal Abogados — Borra tus deudas legalmente con la Ley de Insolvencia';
await writeFile(path.join(destino, 'opengraph-image.alt.txt'), alt);
await writeFile(path.join(destino, 'twitter-image.alt.txt'), alt);

console.log(
  `Miniatura generada: ${ANCHO}x${ALTO}, ${(tarjeta.length / 1024).toFixed(1)} KB ` +
    `(monograma ${meta.width}x${meta.height}).`
);
