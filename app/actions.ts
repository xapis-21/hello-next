"use server";
import { anthropic} from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

// const model = google("models/gemini-1.5-flash-latest");
const model = anthropic("claude-3-5-sonnet-20240620");
const systemPrompt = `
  You are an expert in generating hints for Wordle games. Your task is to create a word (4-6 letters) and a cryptic hint. 
  Format the output as: {hint: 'A place of worship, but not a church', answer: 'abbey'}.
  Ensure the hint is engaging and the word is common enough for players to guess.
  `;

export const generateHint = async (history: Message[]) => {
  "use server";
  try {
    const { object } = await generateObject({
      model,
      messages: history,
      system: systemPrompt,
      schema: z.object({
        hint: z.string().max(280),
        answer: z.string().max(12),
      }),
    });

    console.log("Model output:", object);

    return {
      messages: [
        ...history,
        {
          role: "assistant" as const,
          content: JSON.stringify(object),
        },
      ],
    };
  } catch (error) {
    console.error("Error generating object:", error);
    throw new Error("Failed to generate hint and answer.");
  }

};
