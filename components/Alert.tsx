import { CircleAlert } from "lucide-react";
import React from "react";

const Alert = () => {
  return (
    <div className="bg-orange-100 flex items-center gap-x-7  py-2 rounded-none fixed top-0 justify-center w-full">
      <CircleAlert className="text-orange-500" />
      <div>
        <p className="text-orange-500">
          Don't Refresh page your chat will disappear!
        </p>
        <p className="text-slate-500">
          Sooon we will come back with this solution
        </p>
      </div>
    </div>
  );
};

export default Alert;
