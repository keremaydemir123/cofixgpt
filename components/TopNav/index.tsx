"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import TopNavContainer from "./TopNavContainer";
import TopNavBox from "./TopNavBox";
import Spinner from "../Spinner";
import TopNavLeft from "./TopNavLeft";
import TopNavRight from "./TopNavRight";
import ClipboardIcon from "@/icons/ClipboardIcon";
import { getFiles } from "@/features";
import { useClient } from "@/context/ClientProvider";

function TopNav() {
  const user = useClient();
  const pathname = usePathname();
  const chatId = pathname?.split("/")[2];

  const { data, isLoading, error } = useQuery({
    queryKey: ["getFiles", user?.email!, chatId],
    queryFn: () =>
      getFiles({
        email: user?.email!,
        chatId: chatId!,
      }),
    enabled: !!user?.email && !!chatId,
  });

  if (error) return <div>Something went wrong</div>;

  const files = data?.files;

  return (
    <TopNavContainer>
      <TopNavLeft>
        {!isLoading &&
          files.map((file: any) => {
            // href should be like /chat/[id]/files/[fileName]/modified
            const newHref = "/chat/" + chatId + "/files/" + file.name;
            return (
              <TopNavBox
                href={newHref}
                key={file.name}
                active={pathname?.includes(file.name)}
              >
                {file.name}
              </TopNavBox>
            );
          })}
      </TopNavLeft>

      <TopNavRight>
        <TopNavBox href="#" active={false}>
          Diff
        </TopNavBox>
        <TopNavBox
          href={`${pathname}/modified`}
          active={pathname?.includes("modified")}
        >
          Modified
        </TopNavBox>
      </TopNavRight>
    </TopNavContainer>
  );
}

export default TopNav;
