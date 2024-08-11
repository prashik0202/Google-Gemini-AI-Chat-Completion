"use client";

import { useState } from "react";
import copy from "clipboard-copy";
import { Check, Copy, CopyCheck } from "lucide-react";
import { Button } from "./ui/button";

const CopyClipboard = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(text);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };
  return (
    <Button onClick={handleCopyClick} variant={"ghost"}>
      {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5 " />}
    </Button>
  );
};

export default CopyClipboard;
