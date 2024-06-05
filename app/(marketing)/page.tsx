import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen p-24">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-9xl text-slate-800 font-semibold">
          Chat with Llama2
        </h1>
        <p className="text-sm text-slate-500 text-center mt-10">
          The llama-2 Text Summarizer is a cutting-edge natural language
          processing <br /> project that leverages the power of the LLM called
          llama-2 to generate concise and coherent summaries of text documents.{" "}
        </p>
        <Link href={"/chat"}>
          <button className="text-l p-3 bg-slate-800 text-white rounded-lg mt-10 w-full md:w-52 hover:bg-slate-900 uppercase">
            Get Started
          </button>
        </Link>

        <p className="text-xs text-slate-400 mt-10">
          Made with ❤️, Vercel AI SDK and Replicate API
        </p>
      </div>
    </div>
  );
};

export default HomePage;
