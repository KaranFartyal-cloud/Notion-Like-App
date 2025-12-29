"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PROMPT = `You are an expert AI assistant who have immense amount of knowledge on any topic. You can either solve the query asked by the user and if user has provided context then based on that you can give the output.

content -> the context from according to which you have to give answer
description -> the user query , what the user has asked
Output -> the response in HTML format

RULES:
STRICTLY FOLLOW JSON OUTPUT.
OUTPUT field should have html in it.
No \n should be there in html
only and only give the output like i mentioned.
if the content don't have the relation with the description just give the response in structured output , don't see from the content

EXAMPLE 1:
  {content: ALbert einstein was a great scientist.
  description: who was albert einstein .
  Output: <h1>Introduction on Albert Einstein</h1>
  <p>Albert einstein was a great scientist . he had won many nobel prizes</p>
  }
`

export const callAI = async (content: string, description: string) => {
  try {
    const response = await client.responses.create({
      model: "openai/gpt-oss-20b",

      input: [{
        "role": "system", content: SYSTEM_PROMPT
      }, {
        "role": "user" , content: content + description 
      }],
    });

    const raw_result = response.output_text;

    const jsonData = JSON.parse(raw_result)
    console.log(jsonData)

    return jsonData.Output
    
  } catch (err: any) {
    console.error("AI ERROR:", err?.status, err?.statusText, err);
    throw err;
  }
};
