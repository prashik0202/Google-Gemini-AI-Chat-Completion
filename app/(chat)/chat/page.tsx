"use client";

import { useState } from "react";
import { continueConversation } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal, Upload } from "lucide-react";
import { CoreMessage } from "ai";
import { readStreamableValue } from "ai/rsc";
import Image from "next/image";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Home() {
  const [conversation, setConversation] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [imageInput, setImageInput] = useState<string>("");

  async function getBase64(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
    });
  }

  return (
    <div className="h-full flex-col py-20 w-3/4 lg:mx-auto items-center relative">
      <div className="flex gap-x-2 w-full items-center top-2 ">
        {/* <div className="flex "> */}
        <Input
          id="doc"
          type="file"
          onChange={(event) => {
            if (event.target.files) {
              const file = event.target.files[0];
              getBase64(file).then((result) => {
                setImageInput(result);
                // setInput(result);
              });
            } else {
              setImageInput("");
            }
          }}
          className="w-fit shadow-lg"
        />
        <Input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          className="h-12 text-xl  shadow-lg"
          placeholder="Hello..."
        />

        <Button
          onClick={async () => {
            // append user messages
            const userMessages: CoreMessage[] = [];
            if (imageInput.length) {
              // remove data:*/*;base64 from result
              const pureBase64 = imageInput
                .toString()
                .replace(/^data:image\/\w+;base64,/, "");
              userMessages.push({
                role: "user",
                content: [{ type: "image", image: pureBase64 }],
              });
            }
            if (input.length) {
              userMessages.push({
                role: "user",
                content: [{ type: "text", text: input }],
              });
            }
            const { messages, newMessage } = await continueConversation([
              ...conversation,
              ...userMessages,
            ]);

            // collect assistant message
            let textContent = "";
            for await (const delta of readStreamableValue(newMessage)) {
              textContent = `${textContent}${delta}`;

              setConversation([
                ...messages,
                {
                  role: "assistant",
                  content: [{ type: "text", text: textContent }],
                },
              ]);
            }
            setInput("");
          }}
          variant={"ghost"}
        >
          <SendHorizonal className="text-slate-500" />
        </Button>
        {/* </div> */}
      </div>

      <div className="w-full mt-10">
        {/* {conversation.map((message, index) => (
          <div key={index} className="flex flex-col p-5  gap-y-2">
            <h1
              className={`text-l my-1 ${
                message.role === "user" ? "" : "text-blue-500"
              }`}
            >
              {message.role === "user" ? "You" : "AI"}
            </h1>
            <p
              className={`text-xl text-slate-600 py-3 px-4 max-w-fit max-h-fit rounded-md  whitespace-pre-wrap ${
                message.role === "user" ? "bg-slate-200" : "bg-sky-100"
              } shadow-lg`}
            >
              {message.content}
            </p>
          </div>
        ))} */}
        {conversation.map((message, index) => (
          <div key={index}>
            <h1
              className={`text-lg my-4 ${
                message.role === "user" ? "text-slate-500" : "text-sky-400"
              }`}
            >
              {message.role === "user" ? "You" : "AI"}
            </h1>
            {/* {message.role}:{" "} */}
            {
              // if it's string, just show it, else if it is image, preview image, if it is text, show the text
              typeof message.content === "string" ? (
                message.content
              ) : message.content[0].type === "image" ? (
                <Image
                  alt=""
                  src={
                    ("data:image;base64," + message.content[0].image) as string
                  }
                  width={450}
                  height={450}
                />
              ) : message.content[0].type === "text" ? (
                <p
                  className={`text-xl whitespace-pre-wrap max-w-fit p-5 rounded-lg ${
                    message.role === "user" ? "bg-sky-100" : "bg-pink-100"
                  }`}
                >
                  {message.content[0].text}
                </p>
              ) : (
                ""
              )
            }
          </div>
        ))}
      </div>
    </div>
  );
}
