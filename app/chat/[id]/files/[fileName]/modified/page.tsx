"use client";

import { useQuery } from "@tanstack/react-query";
import Markdown from "@/components/Markdown";
import { useClient } from "@/context/ClientProvider";
import insertMdElements from "@/utils/insertMdElements";
import { usePathname } from "next/navigation";
import Spinner from "@/components/Spinner";
import PromptInput from "@/components/PromptInput";
import { getChatIdFromPathname } from "@/utils/getChatIdFromPathname";

interface IGetModifiedFile {
  chatId: string;
  email: string;
}

async function getModifiedFile({ chatId, email }: IGetModifiedFile) {
  return fetch("/api/getModifiedFile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chatId, email }),
  }).then((res) => res.json());
}

function ModifiedFile() {
  const pathname = usePathname();
  const user = useClient();

  const chatId = getChatIdFromPathname(pathname);
  const fileName = pathname?.split("/")[4];
  const split = fileName?.split(".");
  const fileExtension = split?.[split.length - 1];

  const { data, isLoading, error } = useQuery({
    queryKey: ["getModifiedFile", chatId, fileName, user?.email],
    queryFn: () =>
      getModifiedFile({
        chatId: chatId!,
        email: user?.email!,
      }),
    enabled: !!chatId && !!fileName && !!user?.email,
    retry: 0,
  });

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="text-center font-bold text-error text-xl">
        There is no modified files here
      </div>
    );

  const modifiedFile = data?.modified;

  // TODO: optimize for performance
  // TODO: dont get all files, just get the modified target file

  const targetSection = modifiedFile
    .split(`~~~${fileExtension}`)[1]
    .split("~~~")[0];

  const modifiedTargetSection = insertMdElements({
    text: targetSection,
    type: fileExtension as "js" | "css" | "html",
  });

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <Markdown markdown={{ content: modifiedTargetSection }} />
      </div>
      <PromptInput actionPrompt="fix" files={data.modified} isDisabled={true} />
    </>
  );
}

export default ModifiedFile;
