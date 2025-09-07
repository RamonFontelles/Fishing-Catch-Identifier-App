
import { GoogleGenAI, Type } from "@google/genai";
import type { GeminiFishResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const identifyFish = async (
  base64Image: string,
  mimeType: string
): Promise<GeminiFishResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: `Actúa como un experto en biología marina y un analista de fotografías. Tu tarea es analizar la imagen proporcionada.

1.  **Identifica la especie:** Determina la especie del pez en la imagen.
2.  **Estima las dimensiones con precisión:**
    *   **Analiza el entorno:** Busca objetos de referencia en la foto (como una mano humana, un señuelo, una regla, etc.) para establecer una escala fiable.
    *   **Considera la perspectiva:** Ten en cuenta el ángulo de la cámara para corregir distorsiones en el tamaño aparente.
    *   **Estima el largo:** Proporciona el largo en centímetros (cm).
    *   **Estima el peso:** Proporciona el peso. Usa 'g' (gramos) si es menor a 1000g, y 'kg' (kilogramos) si es 1000g o más.
3.  **Formato de respuesta:** El campo 'dimensions' debe combinar largo y peso (ej: 'Largo: 35 cm, Peso: 850 g' o 'Largo: 70 cm, Peso: 2.1 kg').
4.  **Caso sin pez:** Si no hay ningún pez visible, responde con 'No se detectó ningún pez' para la especie y 'N/A' para las dimensiones.`,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            species: {
              type: Type.STRING,
              description: 'El nombre común de la especie de pez identificada.',
            },
            dimensions: {
              type: Type.STRING,
              description: "El largo (en cm) y peso (en g o kg) estimados del pez.",
            },
          },
        },
      },
    });

    const jsonString = response.text.trim();
    if (!jsonString) {
      throw new Error("La respuesta de la API está vacía.");
    }

    const parsedResponse = JSON.parse(jsonString) as GeminiFishResponse;
    return parsedResponse;
  } catch (error) {
    console.error("Error al llamar a la API de Gemini:", error);
    throw new Error("No se pudo obtener una respuesta válida del servicio de IA.");
  }
};
