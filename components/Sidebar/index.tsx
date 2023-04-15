"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { useClient } from "@/context/ClientProvider";
import LogoutIcon from "@/icons/LogoutIcon";
import ColorfulHeader from "../ColorfulHeader";
import ChatHistory from "./ChatHistory";
import SidebarContainer from "./SidebarContainer";

function Sidebar() {
  const user = useClient();
  return (
    <SidebarContainer>
      {/* Logo */}
      <Link href="/">
        <ColorfulHeader
          from="from-primary"
          to="to-secondary"
          size="text-3xl"
          text="CoFixGPT"
        />
      </Link>

      {/* Chat History */}
      <h2>History</h2>
      <hr />
      <div className="overflow-y-auto pr-2 flex-1">
        <ChatHistory />
      </div>

      {/* User Info */}
      <div className="flex justify-between border-t border-base-300 pt-2 h-16 gap-2">
        <div className="flex flex-col">
          <div>{user?.name}</div>
          <div
            className="flex gap-1 items-center cursor-pointer hover:opacity-70 text-sm "
            onClick={() => signOut()}
          >
            <span className="text-base-content/80">Logout</span>
            <LogoutIcon className="w-4 h-4 text-base-content/80" />
          </div>
        </div>
        <Image
          src={user?.image!}
          alt="Profile Picture"
          className="w-12 h-12 rounded-full hover:opacity-70 cursor-pointer"
          width={48}
          height={48}
        />
      </div>
    </SidebarContainer>
  );
}

export default Sidebar;
