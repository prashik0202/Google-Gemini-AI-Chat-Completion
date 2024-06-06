import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { StreamingTextResponse, streamText, Message } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY as string,
});

const model = google("models/gemini-1.5-flash-latest");
