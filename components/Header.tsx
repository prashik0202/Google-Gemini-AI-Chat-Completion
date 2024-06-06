import React from "react";
import { ThemeToggleButton } from "./ThemeToggleButton";

const Header = () => {
  return (
    <div className="w-full flex justify-between gap-x-4 p-2 top-0 fixed items-center px-5">
      <h1 className="text-2xl">Google Gemini Pro</h1>
      {/* <ThemeToggleButton /> */}
    </div>
  );
};

export default Header;
