import { GoogleGenAI, Type, Schema } from "@google/genai";
import { LessonContent, ProjectContent, Difficulty } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// --- Schemas ---

const quizSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    question: { type: Type.STRING },
    options: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING } 
    },
    correctIndex: { type: Type.INTEGER },
    explanation: { type: Type.STRING }
  },
  required: ["question", "options", "correctIndex", "explanation"]
};

const lessonSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    content: { 
      type: Type.STRING, 
      description: "Educational content in Markdown format. Use headers, bullet points, and code blocks." 
    },
    quiz: {
      type: Type.ARRAY,
      items: quizSchema,
      description: "A short quiz of 3 questions to test understanding."
    }
  },
  required: ["title", "content", "quiz"]
};

const projectSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    overview: { type: Type.STRING },
    difficulty: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Advanced"] },
    estimatedTime: { type: Type.STRING },
    prerequisites: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3-5 specific technical skills or topics the user needs to know before starting (e.g. 'Ohm's Law', 'Soldering', 'Arduino C++', '3D Printing')."
    },
    materials: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING } 
    },
    steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          stepTitle: { type: Type.STRING },
          instruction: { type: Type.STRING }
        },
        required: ["stepTitle", "instruction"]
      }
    }
  },
  required: ["title", "overview", "difficulty", "materials", "steps", "prerequisites"]
};

// --- API Calls ---

export const generateLesson = async (topic: string, difficulty: Difficulty): Promise<LessonContent> => {
  try {
    const prompt = `Create a comprehensive but easy-to-understand lesson about "${topic}" for a ${difficulty} level student. 
    Focus on electronics, robotics, or physics concepts. 
    Explain it simply, like you are teaching a friend. 
    Includes analogies where useful.
    The content should be in Markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: lessonSchema,
        temperature: 0.3,
      }
    });

    if (!response.text) throw new Error("No response text generated");
    return JSON.parse(response.text) as LessonContent;
  } catch (error) {
    console.error("Gemini Lesson Error:", error);
    throw error;
  }
};

export const generateProject = async (topic: string): Promise<ProjectContent> => {
  try {
    const prompt = `Create a step-by-step DIY project guide for: "${topic}". 
    Assume the user is a hobbyist. 
    List all necessary materials (Arduino, Raspberry Pi, motors, etc.).
    Break down the instructions clearly.
    Crucially, list the prerequisite skills required to complete this project.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: projectSchema,
        temperature: 0.4,
      }
    });

    if (!response.text) throw new Error("No response text generated");
    return JSON.parse(response.text) as ProjectContent;
  } catch (error) {
    console.error("Gemini Project Error:", error);
    throw error;
  }
};

export const chatWithTutor = async (history: {role: 'user' | 'model', text: string}[], message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
      config: {
        systemInstruction: "You are a friendly, expert engineering tutor. You help users with electronics, code (C++, Python), mechanics, and math. Keep answers concise but helpful. Use Markdown for code.",
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Sorry, I encountered an error connecting to the AI tutor.";
  }
};