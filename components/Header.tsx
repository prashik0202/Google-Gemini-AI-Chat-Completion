import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full flex justify-between gap-x-4 p-2 top-0 fixed items-center px-5 border-b shadow-xl">
      <Link href={"/"}>
        <h1 className="text-2xl">Google Gemini Pro</h1>
      </Link>
      {/* <ThemeToggleButton /> */}
    </div>
  );
};

export default Header;
