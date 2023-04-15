import React from "react";
import { ClipLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ClipLoader color="var(--a)" />
    </div>
  );
}

export default Spinner;
