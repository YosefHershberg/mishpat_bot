import { GoogleGenAI } from "@google/genai";
import { env } from "@/lib/env";

export default new GoogleGenAI({ apiKey: env.GOOGLE_API_KEY });