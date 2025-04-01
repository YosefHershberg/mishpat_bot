import { GoogleGenAI } from "@google/genai";

export default new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });