import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

// Accessing your API key as envionment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export async function GET(req: Request) {
  return new Response("Hello");
}

export async function POST(req: Request) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings,
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello,How are you?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Great I'm doing well, do you have any questions ask me, I will try to provide you best answers",
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  // taking user input:
  // const { message } = await req.json();
  const message = "hi bro?";

  const result = await chat.sendMessage(message);
  const response = await result.response;
  const text = response.text();

  return new Response(text);
}
