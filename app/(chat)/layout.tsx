import Alert from "@/components/Alert";
import React from "react";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-0 px-20">
      {/* <Alert /> */}
      {children}
    </div>
  );
};

export default ChatLayout;
