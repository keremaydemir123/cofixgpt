import React from "react";

function TopNavContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between h-22 w-full overflow-hidden bg-base-200 mb-4 rounded-md">
      {children}
    </div>
  );
}

export default TopNavContainer;
