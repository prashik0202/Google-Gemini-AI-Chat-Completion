// Using Gemini Pro
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {  StreamingTextResponse, streamText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY as string,
});

const model = google("models/gemini-1.5-flash-latest");

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // extract the prompt from body of request:
  const { prompt } = await req.json();

  const result = await streamText({
    model: model,
    prompt: prompt,
  });
  // console.log(text);
  // return new Response(text);
  return new StreamingTextResponse(result.toAIStream());
}
