import Alert from "@/components/Alert";
import React from "react";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <Alert /> */}
      {children}
    </div>
  );
};

export default ChatLayout;
