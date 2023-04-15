"use client";

import { usePathname } from "next/navigation";
import TopNavContainer from "./TopNavContainer";
import TopNavBox from "./TopNavBox";
import TopNavLeft from "./TopNavLeft";
import TopNavRight from "./TopNavRight";
import { getChatIdFromPathname } from "@/utils/getChatIdFromPathname";
import { useFiles } from "@/hooks/useFiles";
import HomeIcon from "@/icons/HomeIcon";

function TopNav() {
  const pathname = usePathname();
  const chatId = getChatIdFromPathname(pathname);
  const files = useFiles(chatId);

  return (
    <TopNavContainer>
      <TopNavLeft>
        <TopNavBox href={`/chat/${chatId}`} active={false}>
          <HomeIcon className="md:w-8 md:h-8 h-6 w-6 text-primary hover:text-primary/80" />
        </TopNavBox>
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
