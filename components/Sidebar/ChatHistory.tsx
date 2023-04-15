"use client";

import ChatCollapse from "./ChatCollapse";
import Spinner from "../Spinner";
import TrashIcon from "@/icons/TrashIcon";
import Files from "./Files";
import { useEffect, useState } from "react";
import { getChats, getFiles } from "@/features";
import { useClient } from "@/context/ClientProvider";
import EditIcon from "@/icons/EditIcon";

function ChatHistory() {
  const user = useClient();
  const [chats, setChats] = useState<{ id: string }[]>([]);
  const [files, setFiles] = useState<IFilesAndChat[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getChats({ email: user?.email! })
      .then((data) => {
        setChats(data.chats);
        if (data.chats.length === 0) setLoading(false);

        data.chats.map((chat: { id: string }) => {
          getFiles({ email: user?.email!, chatId: chat.id })
            .then((data: { files: IFile[] }) => {
              setFiles((prev) => [
                ...prev,
                { chatId: chat.id, files: data.files },
              ]);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.email]);

  if (loading) return <Spinner />;

  function removeChat(chatId: string) {
    // TODO not working make your own collapse component
    console.log("clicked, remove chat");
  }

  function editChatTitle(chatId: string, title: string) {
    // TODO not working make your own collapse component
    console.log("clicked, edit chat title");
  }

  return (
    <div className="flex flex-1 flex-col gap-2 h-full">
      {chats?.map((chat) => {
        const chatFiles = files.find((file) => file.chatId === chat.id)?.files;
        if (!chatFiles) return null;
        return (
          <ChatCollapse
            key={chat.id}
            chatId={chat.id}
            files={chatFiles}
            removeChat={removeChat}
            editChatTitle={editChatTitle}
          />
        );
      })}
    </div>
  );
}

export default ChatHistory;
