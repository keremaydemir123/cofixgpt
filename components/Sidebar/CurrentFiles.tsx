import React from "react";

function CurrentFiles({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

export default CurrentFiles;
