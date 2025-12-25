// api/generate.js
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // 1. Check for valid method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Authenticate (Server-side only)
  const apiKey = process.env.GOOGLE_API_KEY; // Read from Server Env
  if (!apiKey) {
    return res.status(500).json({ error: 'Server API key configuration missing' });
  }

  const { prompt, schema } = req.body;

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // 3. Call Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema, // Pass schema from frontend if dynamic
      }
    });

    // 4. Return result to frontend
    res.status(200).json(JSON.parse(response.text));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI Generation Failed' });
  }
}