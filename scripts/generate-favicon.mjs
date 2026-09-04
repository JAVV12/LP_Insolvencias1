/**
 * Genera el ícono del sitio a partir del logo de la firma.
 *
 *   node scripts/generate-favicon.mjs
 *
 * Salida: src/app/icon.png (pestaña del navegador) y src/app/apple-icon.png
 * (ícono al añadir el sitio a la pantalla de inicio en iOS). Next.js detecta
 * ambos por convención de archivo y genera las etiquetas <link> solo.
 *
 * Sustituye al favicon.ico genérico que traía la plantilla de Next.
 */
import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const logo = path.join(raiz, "public", "images", "logo.webp");
const destino = path.join(raiz, "src", "app");

await mkdir(destino, { recursive: true });

// icon.png: tamaño de sobra para que se vea nítido tanto en la pestaña (~16-32px)
// como en accesos directos de escritorio, que piden resoluciones mayores.
await sharp(logo).resize(256, 256).png().toFile(path.join(destino, "icon.png"));

// apple-icon.png: 180x180 es el tamaño que recomienda Apple para el icono de
// pantalla de inicio en iOS.
await sharp(logo).resize(180, 180).png().toFile(path.join(destino, "apple-icon.png"));

// El favicon.ico genérico de la plantilla de Next queda reemplazado por los
// dos archivos de arriba; si sigue presente, el navegador serviría ambos.
await rm(path.join(destino, "favicon.ico"), { force: true });

console.log("Ícono generado: icon.png (256x256) y apple-icon.png (180x180).");
