"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import Markdown from "@/components/Markdown";
import SearchInput from "@/components/SearchInput";
import { useFiles } from "@/hooks/useFiles";
import { getChatIdFromPathname } from "@/utils/getChatIdFromPathname";
import insertMdElements from "@/utils/insertMdElements";

interface IGetFile {
  chatId: string;
  fileName: string;
  email: string;
}

function FileDetails() {
  const pathname = usePathname();
  const chatId = getChatIdFromPathname(pathname);
  const files = useFiles(chatId);
  const file = useMemo(() => {
    const fileName = pathname?.split("/").pop();
    return files?.find((file) => file.name === fileName);
  }, [files, pathname]);

  if (!file) return null;

  const mdContent = insertMdElements({ text: file?.content, type: file?.type });

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <Markdown markdown={{ content: mdContent }} />
      </div>
      <SearchInput files={[file!]} actionPrompt="fix" />
    </>
  );
}

export default FileDetails;
