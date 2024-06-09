// "use server";

// import { generateText, streamText, CoreMessage, DataContent } from "ai";
// import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
// import { createStreamableValue } from "ai/rsc";
// // import { google } from "@ai-sdk/google";

// export interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// export async function continueConversation(history: CoreMessage[]) {
//   "use server";

//   const { text } = await generateText({
//     model: google("models/gemini-1.5-flash-latest"),
//     system: "You are a friendly assistant!",
//     messages: history,
//   });

//   return {
//     messages: [
//       ...history,
//       {
//         role: "assistant" as const,
//         content: text,
//       },
//     ],
//   };
// }

"use server";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { CoreMessage, LanguageModel, streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY as string,
});

export async function continueConversation(history: CoreMessage[]) {
  "use server";

  const stream = createStreamableValue();
  const model = google.chat("models/gemini-1.5-flash-latest");

  (async () => {
    const { textStream } = await streamText({
      model: model,
      messages: history,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })().then(() => {});

  // console.log({ history, stream });
  return {
    messages: history,
    newMessage: stream.value,
  };
}
