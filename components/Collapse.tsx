"use client";

import ChevronDownIcon from "@/icons/ChevronDownIcon";
import ChevronRightIcon from "@/icons/ChevronRightIcon";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  Heading: React.ReactElement;
};

function Collapse({ children, Heading }: Props) {
  const [open, setOpen] = useState(true);

  if (open) {
    return (
      <div className="flex flex-col flex-1">
        <div className="flex items-center">
          <ChevronDownIcon
            className="w-8 h-8 cursor-pointer"
            onClick={() => setOpen(false)}
          />
          {Heading}
        </div>
        {children && <div>{children}</div>}
      </div>
    );
  }
  return (
    <div className="flex flex-1">
      <ChevronRightIcon
        className="w-8 h-8 cursor-pointer"
        onClick={() => setOpen(true)}
      />

      {Heading}
    </div>
  );
}

export default Collapse;
