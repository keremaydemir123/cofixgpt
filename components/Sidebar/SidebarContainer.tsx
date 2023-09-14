"use client";

import ChevronRightIcon from "@/icons/ChevronRightIcon";
import React from "react";

function SidebarContainer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <div
        className={`${
          open ? "flex" : "hidden"
        } md:relative absolute bg-base-200 text-base-content p-4 h-full w-80 flex-col gap-2 z-100`}
      >
        {children}
        {open && (
          <ChevronRightIcon
            onClick={() => setOpen(!open)}
            className="absolute top-1/2 left-0 cursor-pointer w-8 h-8 bg-base-200 rounded-lg z-30"
          />
        )}
      </div>
      <ChevronRightIcon
        onClick={() => setOpen(!open)}
        className="fixed top-1/2 left-0 cursor-pointer w-8 h-8 bg-base-200 rounded-lg z-30"
      />
    </>
  );
}

export default SidebarContainer;
