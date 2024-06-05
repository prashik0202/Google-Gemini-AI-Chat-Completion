// Using Gemini Pro
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, StreamingTextResponse, streamText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY as string,
});

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
// const buildGoogleGenAIPrompt = (messages: Message[]) => ({
//   contents: messages
//     .filter(
//       (message) => message.role === "user" || message.role === "assistant"
//     )
//     .map((message) => ({
//       role: message.role === "user" ? "user" : "model",
//       parts: [{ text: message.content }],
//     })),
// });

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

// import { ReplicateStream, StreamingTextResponse } from "ai";
// import Replicate from "replicate";
// import { experimental_buildLlama2Prompt } from "ai/prompts";

// // caching
// // import kv from

// // Create a Replicate API client (that's edge friendly!)
// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_KEY || "",
// });

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const response = await replicate.predictions.create({
//     // You must enable streaming.
//     stream: true,
//     // The model must support streaming. See https://replicate.com/docs/streaming
//     // This is the model ID for Llama 2 70b Chat
//     version: "2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
//     // Format the message list into the format expected by Llama 2
//     // @see https://github.com/vercel/ai/blob/99cf16edf0a09405d15d3867f997c96a8da869c6/packages/core/prompts/huggingface.ts#L53C1-L78C2
//     input: {
//       prompt: experimental_buildLlama2Prompt(messages),
//     },
//   });

//   // Convert the response into a friendly text-stream
//   const stream = await ReplicateStream(response);
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }
