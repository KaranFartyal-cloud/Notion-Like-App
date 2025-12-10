"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const callAI = async () => {
  try {
    const response = await client.responses.create({
      model: "openai/gpt-oss-20b",
      input: "Explain the importance of fast language models",
    });
    console.log(response.output_text);

    return response.output_text;
  } catch (err: any) {
    console.error("AI ERROR:", err?.status, err?.statusText, err);
    throw err;
  }
};
