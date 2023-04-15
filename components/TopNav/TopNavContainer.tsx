import React from "react";

function TopNavContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between w-full px-2 bg-base-200 mb-4 rounded-md">
      {children}
    </div>
  );
}

export default TopNavContainer;
