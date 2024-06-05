"use client";
import { useCompletion } from "ai/react";
// import { useChat } from "ai/react";
import aicon from "../../google-gemini-icon.svg";
import Image from "next/image";
import { FormEvent, useState } from "react";

import Welcome from "@/components/Welcome";
import CopyClipboard from "@/components/CopyClipboard";

export default function Chat() {
  // async function callGeminiApi(prompt: string) {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("/api/chat", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ prompt }),
  //     });

  //     // setLoading(true);

  //     if (!response.ok) {
  //       throw new Error("Opps error occured" + response.statusText);
  //     }

  //     const text = await response.text();
  //     return text;
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // const [prompt, setPrompt] = useState<string>("");
  // const [response, setResponse] = useState<string>("");
  // const [Loading, setLoading] = useState(false);

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   const apiResponse = await callGeminiApi(prompt);
  //   if (apiResponse !== undefined) {
  //     setPrompt("");
  //     setResponse(apiResponse);
  //   }
  // };

  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "/api/chat",
  });

  return (
    <div className=" h-full flex-col py-5 px-2  md:p-20 w-full lg:w-1/2 lg:mx-auto">
      <form onSubmit={handleSubmit} className="w-full  flex gap-x-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your prompt"
          className="w-full p-3 rounded-full outline-none shadow-xl bg-slate-100"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-fuchsia-200 to-sky-300 p-4 w-fit md:w-32 flex items-center gap-x-1 justify-center  rounded-md md:rounded-full shadow-xl"
          disabled={isLoading}
        >
          <Image src={aicon} alt="icon" />
          <span className="hidden md:block">Generate</span>
        </button>
      </form>

      <div className="h-full p-4 mt-10 flex-col">
        {!completion && !isLoading && <Welcome />}
        <output className="text-xl whitespace-pre-wrap flex-col gap-y-2 text-slate-700">
          {completion && (
            <div className="flex justify-start gap-x-2 items-center">
              <Image src={aicon} alt="icon" className="my-4 h-6 w-6" />
              <CopyClipboard text={completion} />
            </div>
          )}
          {completion}
        </output>
      </div>
    </div>
  );
}
