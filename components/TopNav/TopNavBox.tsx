import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  href: string;
  active?: boolean;
};

function TopNavBox({ children, href, active }: Props) {
  return (
    <Link
      href={href}
      className={`normal-case text-xs sm:text-base rounded-none h-full md:px-3 px-2 py-3 flex items-center ${
        active && "bg-primary text-primary-content"
      }`}
    >
      {children}
    </Link>
  );
}

export default TopNavBox;
