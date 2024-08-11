"use client";

import { useEffect, useRef, useState } from "react";
import { continueConversation } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal, Upload } from "lucide-react";
import { CoreMessage } from "ai";
import { readStreamableValue } from "ai/rsc";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import CopyClipboard from "@/components/CopyClipboard";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);

  const [conversation, setConversation] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [imageInput, setImageInput] = useState<string>("");

  useEffect(() => {
    if (conversation.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [conversation.length]);

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
    <div className="min-h-screen flex-col pt-20 md:pt-10 w-full md:max-w-3xl lg:mx-auto items-center justify-between gap-3">
      <div className="w-full mt-5 h-[calc(100vh-30vh)] md:h-[calc(100vh-20vh)] overflow-y-auto p-0 md:p-2">
        {conversation.map((message, index) => (
          <div key={index}>
            <h1
              className={`text-sm my-4 ${
                message.role === "user" ? "text-slate-500" : "text-sky-400"
              }`}
            >
              {message.role === "user" ? "You" : "AI"}
            </h1>
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
                  className={`text-sm whitespace-pre-wrap max-w-fit p-4 rounded-lg ${
                    message.role === "user" ? "bg-sky-100" : "bg-purple-100"
                  }`}
                >
                  {message.role !== "user" && (
                    <div className="flex justify-start">
                      <CopyClipboard text={message.content[0].text} />
                    </div>
                  )}
                  <ReactMarkdown>{message.content[0].text}</ReactMarkdown>
                </p>
              ) : (
                ""
              )
            }
          </div>
        ))}
        {conversation.length === 0 && (
          <div className="bg-neutral-900 rounded-md w-full h-72 p-10 shadow-lg text-white">
            <h1 className="text-3xl text-center">Welcome to Gemini Chat</h1>
            <p className="text-center text-gray-4 text-sm mt-8">
              you can chat with ai model ask question and get your desire
              output.
              <br />
              It is multimodal i.e it can take image as input as well.
            </p>
            <h1 className="text-center mt-8 text-xl">give it a try!😊</h1>
          </div>
        )}
        <div ref={ref} />
      </div>

      <div className="flex bg-neutral-200 rounded-md items-center p-2 shadow-xl mt-2">
        <Input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          className="text-sm bg-transparent outline-none"
          placeholder="Type here..."
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
            setImageInput("");
          }}
          variant={"ghost"}
        >
          <SendHorizonal className="text-black h-6 w-6" />
        </Button>
        <label
          htmlFor="uploadFile1"
          className="flex p-2 outline-none rounded w-fit cursor-pointer mx-auto font-[sans-serif]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 fill-black inline"
            viewBox="0 0 32 32"
          >
            <path
              d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
              data-original="#000000"
            />
            <path
              d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
              data-original="#000000"
            />
          </svg>

          {/* <Input type="file" id="" /> */}
          <Input
            id="uploadFile1"
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
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}

// import { useChat } from "ai/react";

// export default function Chat() {
//   const { messages, input, handleInputChange, handleSubmit } = useChat();

//   return (
//     <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
//       {messages.map((m) => (
//         <div key={m.id} className="whitespace-pre-wrap">
//           {m.role === "user" ? "User: " : "AI: "}
//           {m.content}
//         </div>
//       ))}

//       <form
//         onSubmit={handleSubmit}
//         className="fixed bottom-0 w-full max-w-md mb-8 border border-gray-300 rounded shadow-xl"
//       >
//         <input
//           className="w-full p-2"
//           value={input}
//           placeholder="Say something..."
//           onChange={handleInputChange}
//         />
//       </form>
//     </div>
//   );
// }
