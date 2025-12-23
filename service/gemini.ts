import { GoogleGenAI, Type } from "@google/genai";
import { QuestClass } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuestProfile = async (name: string, passion: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User Name: ${name}. User Passion: ${passion}. 
      Generate a gaming-style entrepreneur profile for this user. 
      Assign them one of these classes: ${Object.values(QuestClass).join(', ')}.
      Give them stats (0-100) for Innovation, Resilience, Leadership, and Risk-Taking.
      Write a short, cool, gaming-themed bio (max 40 words).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questClass: { type: Type.STRING },
            stats: {
              type: Type.OBJECT,
              properties: {
                innovation: { type: Type.NUMBER },
                resilience: { type: Type.NUMBER },
                leadership: { type: Type.NUMBER },
                riskTaking: { type: Type.NUMBER }
              },
              required: ["innovation", "resilience", "leadership", "riskTaking"]
            },
            bio: { type: Type.STRING }
          },
          required: ["questClass", "stats", "bio"]
        }
      }
    });

    // Extract text safely using the .text property
    const text = response.text;
    if (!text) {
      throw new Error("Empty response received from the generative model.");
    }
    console.log(text)
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini failed to generate quest profile:", error);
    return null;
  }
};