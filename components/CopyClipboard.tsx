"use client";

import { useState } from "react";
import copy from "clipboard-copy";
import { Check, Copy, CopyCheck } from "lucide-react";

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
    <button onClick={handleCopyClick}>
      {isCopied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6 " />}
    </button>
  );
};

export default CopyClipboard;
