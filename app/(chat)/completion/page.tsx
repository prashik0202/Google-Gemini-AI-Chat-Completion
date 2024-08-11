"use client";
import { useCompletion } from "ai/react";
import aicon from "../../google-gemini-icon.svg";
import Image from "next/image";

import Welcome from "@/components/Welcome";
import CopyClipboard from "@/components/CopyClipboard";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { exampleCompletion } from "@/constants";
import ExampleCompletion from "@/components/ExampleCompletion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import React from "react";

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
    api: "/api/completion",
  });

  return (
    <div className="min-h-screen flex-col pt-20 w-full lg:w-1/2 lg:mx-auto items-center">
      <form
        onSubmit={handleSubmit}
        className=" flex gap-x-1 items-center justify-center bg-neutral-200 p-2 rounded-md"
      >
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your prompt"
          className="w-full outline-none active:border-none  text-sm bg-transparent"
        />
        <Button
          type="submit"
          disabled={isLoading}
          variant={"ghost"}
          className="bg-transparent"
        >
          <SendHorizonal className="text-slate-500" />
        </Button>
      </form>

      {completion && (
        <div className="flex justify-start gap-x-2 items-center mt-2">
          <Image src={aicon} alt="icon" className="my-4 h-6 w-6" />
          <CopyClipboard text={completion} />
        </div>
      )}
      <div className="h-[calc(100vh-30vh)] mt-0 flex-col overflow-y-auto">
        {!completion && !isLoading && (
          <div className="mt-10">
            <Welcome />
          </div>
        )}
        <output className="text-sm whitespace-pre-wrap flex-col">
          <ReactMarkdown>{completion}</ReactMarkdown>
        </output>
      </div>
    </div>
  );
}
