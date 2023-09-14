"use client";

import { useClient } from "@/context/ClientProvider";
import { getFiles } from "@/features";
import { db } from "@/firebase";
import { useAppDispatch, useAppSelector } from "@/store";
import { setFilesAndChat } from "@/store/file/fileSlice";
import { collection, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Spinner from "../Spinner";
import ChatCollapse from "./ChatCollapse";

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
    if (!chats) {
      setLoading(false);
      return;
    }
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
