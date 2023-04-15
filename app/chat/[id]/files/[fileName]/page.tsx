"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { usePathname } from "next/navigation";

import { useClient } from "@/context/ClientProvider";
import Markdown from "@/components/Markdown";
import SearchInput from "@/components/SearchInput";
import insertMdElements from "@/utils/insertMdElements";
import Spinner from "@/components/Spinner";

interface IGetFile {
  chatId: string;
  fileName: string;
  email: string;
}

const getFile = async ({ chatId, fileName, email }: IGetFile) => {
  return fetch("/api/getFileByFileName", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chatId, fileName, email }),
  }).then((res) => res.json());
};

function FileDetails() {
  const client = useClient();

  const pathname = usePathname();
  const chatId = pathname?.split("/")[2];
  const fileName = pathname?.split("/")[4];

  const { data, isLoading, error } = useQuery(
    ["getFile", chatId, fileName, client?.email],
    () =>
      getFile({ chatId: chatId!, fileName: fileName!, email: client?.email! }),
    { enabled: !!chatId && !!fileName && !!client?.email }
  );

  if (isLoading) return <Spinner />;
  if (error) return <div>error</div>;

  const file = data?.file;

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
