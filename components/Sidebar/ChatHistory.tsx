"use client";

import ChatCollapse from "./ChatCollapse";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";
import { getFiles } from "@/features";
import { useClient } from "@/context/ClientProvider";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { setFilesAndChat } from "@/store/file/fileSlice";
import { useAppDispatch, useAppSelector } from "@/store";

function ChatHistory() {
  const user = useClient();
  const dispatch = useAppDispatch();
  const filesAndChat = useAppSelector((state) => state.files);
  const [loading, setLoading] = useState(true);

  const [chats, error] = useCollection(
    query(
      collection(db, "users", user?.email!, "chats"),
      orderBy("createdAt", "desc")
    )
  );

  useEffect(() => {
    if (!chats) return;
    chats?.docs.map((chat: { id: string }) => {
      getFiles({ email: user?.email!, chatId: chat.id })
        .then((data: { files: IFile[] }) => {
          dispatch(setFilesAndChat({ chatId: chat.id, files: data.files }));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    });
  }, [chats]);

  if (loading) return <Spinner />;

  function removeChat(chatId: string) {
    // TODO not working make your own collapse component
  }

  function editChatTitle(chatId: string, title: string) {
    // TODO not working make your own collapse component
  }

  return (
    <div className="flex flex-1 flex-col gap-2 h-full">
      {chats?.docs.map((chat) => {
        const files = filesAndChat.find((obj) => obj.chatId === chat.id)?.files;
        if (!files) return null;
        return (
          <ChatCollapse
            key={chat.id}
            chatId={chat.id}
            files={files}
            removeChat={removeChat}
            editChatTitle={editChatTitle}
          />
        );
      })}
    </div>
  );
}

export default ChatHistory;
