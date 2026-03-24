import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set path to static binary
ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffprobeStatic.path);

const inputPath = path.join(__dirname, 'public', 'videos', 'vsl.mp4');
const outputPath = path.join(__dirname, 'public', 'videos', 'vsl-optimized.mp4');
const posterFolder = path.join(__dirname, 'public', 'videos');

if (!fs.existsSync(inputPath)) {
    console.error("No se encontró el video original en", inputPath);
    process.exit(1);
}

console.log("Extrayendo póster...");

new ffmpeg(inputPath)
    .on('end', () => {
        console.log("Póster extraido exitosamente: poster.jpg");

        console.log("\nIniciando optimización del video (720p, libx264, preset fast)...");

        new ffmpeg(inputPath)
            .output(outputPath)
            .videoCodec('libx264')
            .size('1280x720')
            .outputOptions([
                '-crf 28',         // Nivel de compresión constante (buena relacion peso/calidad)
                '-preset fast',    // Velocidad de compresión
                '-movflags +faststart' // Optimización web para streaming rápido
            ])
            .on('progress', (progress) => {
                if (progress.percent) {
                    process.stdout.write(`\r[Optimizando]: ${Math.round(progress.percent)}% completado.`);
                }
            })
            .on('end', () => {
                console.log("\n¡Optimización Completa! Tu video ahora es liviano y fluido para la web.");
                process.exit(0);
            })
            .on('error', (err) => {
                console.error("Error durante la optimización:", err.message);
                process.exit(1);
            })
            .run();
    })
    .on('error', (err) => {
        console.error("Error extrayendo póster:", err.message);
        process.exit(1);
    })
    .screenshots({
        count: 1,
        folder: posterFolder,
        filename: 'poster.jpg',
        size: '1280x720'
    });
