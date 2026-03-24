import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ffmpeg.setFfmpegPath(ffmpegStatic);

const inputPath = path.join(__dirname, 'public', 'images', 'perfil-andres.png');
const outputPath = path.join(__dirname, 'public', 'images', 'perfil-andres.webp');

console.log('Optimizando imagen...');

ffmpeg(inputPath)
    .outputOptions([
        '-c:v libwebp',
        '-lossless 0',
        '-qscale 80',
        '-preset default'
    ])
    .save(outputPath)
    .on('end', () => {
        console.log('Imagen optimizada correctamente a formato WebP.');
        try {
            fs.unlinkSync(inputPath); // Delete the original PNG
            console.log('Imagen original eliminada exitosamente.');
        } catch (e) {
            console.log('No se pudo borrar la imagen original.', e.message);
        }
    })
    .on('error', (err) => {
        console.error('Error al optimizar imagen (Fallback a NPM install si falta algo):', err);
    });
