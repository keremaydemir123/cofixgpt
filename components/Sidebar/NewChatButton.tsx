"use client";

import { useClient } from "@/context/ClientProvider";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

function NewChatButton({ files }: { files: IFile[] }) {
  const router = useRouter();
  const user = useClient();

  const createNewChat = async () => {
    console.log(files);
    const chatsDoc = await addDoc(
      collection(db, "users", user?.email!, "chats"),
      {
        userId: user?.email,
        createdAt: serverTimestamp(),
      }
    );

    addDoc(
      collection(db, "users", user?.email!, "chats", chatsDoc.id, "files"),
      {
        files,
      }
    );

    router.push(`/chat/${chatsDoc.id}`);
  };

  return (
    <button
      onClick={createNewChat}
      className="btn btn-block btn-accent mt-4 disabled:btn-disabled"
    >
      New Chat
    </button>
  );
}

export default NewChatButton;
