import React from "react";

function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 h-full p-4 overflow-hidden">{children}</div>;
}

export default PageContainer;
