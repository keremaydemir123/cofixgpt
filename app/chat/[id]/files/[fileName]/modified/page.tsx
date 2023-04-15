"use client";

import { useQuery } from "@tanstack/react-query";
import Markdown from "@/components/Markdown";
import { useClient } from "@/context/ClientProvider";
import insertMdElements from "@/utils/insertMdElements";
import { usePathname } from "next/navigation";
import Spinner from "@/components/Spinner";

interface IGetModifiedFile {
  chatId: string;
  fileName: string;
  email: string;
}

async function getModifiedFile({ chatId, fileName, email }: IGetModifiedFile) {
  return fetch("/api/getModifiedFile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chatId, fileName, email }),
  }).then((res) => res.json());
}

function ModifiedFile() {
  // TODO: Fetch modified file from server
  // TODO: Display modified file

  const pathname = usePathname();
  const user = useClient();

  const chatId = pathname?.split("/")[2];
  const fileName = pathname?.split("/")[4];
  const split = fileName?.split(".");
  const fileExtension = split?.[split.length - 1];

  const { data, isLoading, error } = useQuery({
    queryKey: ["getModifiedFile", chatId, fileName, user?.email],
    queryFn: () =>
      getModifiedFile({
        chatId: chatId!,
        fileName: fileName!,
        email: user?.email!,
      }),
    enabled: !!chatId && !!fileName && !!user?.email,
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>error</div>;

  const modifiedFile = data?.modified;
  const targetSection = modifiedFile
    .split(`~~~${fileExtension}`)[1]
    .split("~~~")[0];

  const modifiedTargetSection = insertMdElements({
    text: targetSection,
    type: fileExtension as "js" | "css" | "html",
  });

  console.log(targetSection);

  return (
    <div className="flex-1 overflow-y-auto">
      <Markdown markdown={{ content: modifiedTargetSection }} />
    </div>
  );
}

export default ModifiedFile;
