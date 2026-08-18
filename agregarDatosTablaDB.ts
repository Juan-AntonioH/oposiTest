import { db } from "./src/core/config/firebase";
import { doc, writeBatch } from "firebase/firestore";
import * as XLSX from "xlsx";

import { Asset } from 'expo-asset';

// 🛠️ CAMBIA ESTA LÍNEA: Importamos desde /legacy para mantener compatibilidad
import * as FileSystem from 'expo-file-system/legacy';


const OPPOSITION_ID = "opo_01";
const START_ID = 632;
const ES_OFICIAL = false;
const EXAM_YEAR = null;
const EXAM_CONVOCATORIA = null;

// Interfaz TypeScript opcional por si tu archivo es .ts / .tsx
interface ExcelRow {
    blockId?: string;
    themeId?: string;
    question?: string;
    option1?: string;
    option2?: string;
    option3?: string;
    option4?: string;
    correctAnswer?: string | number;
    explanation?: string;
}

/**
 * Lee un archivo Excel embebido en la app y sube las preguntas a Firestore
 * @param {number | string} excelModule - El require('./archivo.xlsx') del archivo
 */
export async function uploadQuestionsFromExcel(excelModule: any) {
    try {
        console.log("📂 Localizando el archivo Excel en la aplicación...");

        // 1. Enlazar y descargar el archivo internamente en el dispositivo
        const asset = Asset.fromModule(excelModule);
        await asset.downloadAsync();

        if (!asset.localUri) {
            console.error("❌ No se pudo obtener la ruta local del archivo.");
            return;
        }

        console.log("📖 Leyendo el archivo binario desde el almacenamiento del móvil...");
        // 2. Leer el archivo del dispositivo codificado en Base64
        const b64Data = await FileSystem.readAsStringAsync(asset.localUri, {
            encoding: "base64", // 💡 Escribe "base64" en minúsculas y entre comillas
        });

        // 3. Pasar el código Base64 a la librería XLSX
        const workbook = XLSX.read(b64Data, { type: 'base64' });

        // Obtenemos la primera hoja de trabajo
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // 4. Convertir la hoja a un Array de Objetos JSON
        const records = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);

        if (records.length === 0) {
            console.log("El archivo Excel está vacío.");
            return;
        }

        // 5. Mapear las filas del Excel a tu estructura de Firestore
        const questionsArray = records.map((row, index) => {
            const currentNumericId = START_ID + index;
            const customId = `p${currentNumericId}`;

            return {
                id: customId,
                idDocument: customId,
                oppositionId: OPPOSITION_ID,
                blockId: row.blockId || "",
                themeId: row.themeId || "",
                question: row.question || "",
                options: [
                    row.option1 || "",
                    row.option2 || "",
                    row.option3 || "",
                    row.option4 || ""
                ],
                correctAnswer: Number(row.correctAnswer),
                explanation: row.explanation || "",
                esOficial: ES_OFICIAL,
                examYear: EXAM_YEAR,
                examConvocatoria: EXAM_CONVOCATORIA,
                randomId: Math.random(),
                active: true
            };
        });

        console.log(`Excel procesado. Se prepararon ${questionsArray.length} preguntas para subir.`);

        // 6. Subida a Firestore mediante WriteBatch (Límite 500)
        const BATCH_LIMIT = 500;

        for (let i = 0; i < questionsArray.length; i += BATCH_LIMIT) {
            const chunk = questionsArray.slice(i, i + BATCH_LIMIT);
            const batch = writeBatch(db);

            chunk.forEach((question) => {
                const { id, ...questionData } = question;
                // He mantenido "questions" tal cual lo tenías en tu último código, cámbialo a "questions" si era una errata.
                const docRef = doc(db, "questions", id);
                batch.set(docRef, questionData);
            });

            await batch.commit();
            console.log(`Subido bloque con éxito: ${chunk.length} preguntas.`);
        }

        console.log(`¡Proceso completado! Se subieron un total de ${questionsArray.length} preguntas.`);

    } catch (error) {
        console.error("Error crítico en el proceso de carga desde Excel:", error);
        throw error;
    }
}
