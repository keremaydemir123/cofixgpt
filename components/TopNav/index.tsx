"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import TopNavContainer from "./TopNavContainer";
import TopNavBox from "./TopNavBox";
import TopNavLeft from "./TopNavLeft";
import TopNavRight from "./TopNavRight";
import { useAppSelector } from "@/store";
import { getChatIdFromPathname } from "@/utils/getChatIdFromPathname";
import { useFiles } from "@/hooks/useFiles";

function TopNav() {
  const pathname = usePathname();
  const chatId = getChatIdFromPathname(pathname);
  const files = useFiles(chatId);

  return (
    <TopNavContainer>
      <TopNavLeft>
        {files?.map((file: IFile) => {
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
