"use client";

import { useAppSelector } from "@/store";

export const useFiles = (chatId: string | null) => {
  const filesAndChatId = useAppSelector((state) => state.files);
  if (!chatId) return null;
  const files = filesAndChatId.find((file) => file.chatId === chatId)?.files;

  if (!files) return null;
  return files;
};
