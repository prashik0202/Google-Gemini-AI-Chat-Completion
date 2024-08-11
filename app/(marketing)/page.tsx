import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl md:text-7xl font-semibold text-center bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
          Chat with Gemini 1.5 Flash
        </h1>

        <div className="block md:flex my-10 gap-10">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Chat</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              Start chart with gemini 1.5 flash where you can ask about image
              and also chat like a human
            </CardContent>
            <CardFooter>
              <Button
                className="bg-slate-900 text-slate-100"
                size={"lg"}
                asChild
              >
                <Link href={"/chat"}>Start Chat</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Text Completion</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              Experience with text completion where it boost the user
              productivity and help full in daily task
            </CardContent>
            <CardFooter>
              <Button
                className="bg-slate-900 text-slate-100"
                size={"lg"}
                asChild
              >
                <Link href={"/completion"}>Start Completion</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <p className="text-xs text-slate-400 mt-10">
          Made with ❤️, Vercel AI SDK and Google Gemini API
        </p>
      </div>
    </div>
  );
};

export default HomePage;
