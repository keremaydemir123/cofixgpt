"use client";

import EditIcon from "@/icons/EditIcon";
import TrashIcon from "@/icons/TrashIcon";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import Files from "./Files";
import CorrectIcon from "@/icons/CorrectIcon";

type Props = {
  files: IFilesAndChat["files"];
  chatId: string;
  removeChat: (chatId: string) => void;
  editChatTitle: (chatId: string, title: string) => void;
};

function ChatCollapse({ files, chatId, removeChat, editChatTitle }: Props) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const activeChat = pathname?.split("/")[2];

  async function handleEditStart(
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) {
    e.stopPropagation();
    e.preventDefault();

    await setIsEditing(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleEditComplete();
  }

  function handleDelete(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    e.stopPropagation();
    removeChat(chatId);
  }

  function handleEditComplete() {
    editChatTitle(chatId, inputRef.current?.value!);
    setIsEditing(false);
  }

  return (
    <div
      className={`flex flex-col rounded-md w-full py-2  ${
        activeChat === chatId
          ? "bg-primary text-primary-content"
          : "bg-base-300 text-base-content"
      }`}
    >
      <>
        <div
          className="flex items-center cursor-pointer px-3 py-1"
          onClick={() => setOpen((prev) => !prev)}
        >
          <form onSubmit={handleSubmit} className="flex-1 mr-4 text-sm">
            <input
              type="text"
              className="border-none outline-none bg-transparent w-full cursor-pointer"
              disabled={!isEditing}
              onBlur={() => setIsEditing(false)}
              defaultValue={chatId}
              ref={inputRef}
            />
          </form>
          {!isEditing ? (
            <EditIcon
              className="w-6 h-6 text-info cursor-pointer hover:scale-105"
              onClick={handleEditStart}
            />
          ) : (
            <CorrectIcon
              className="w-6 h-6 text-success cursor-pointer hover:scale-105"
              onClick={handleEditComplete}
            />
          )}

          <TrashIcon
            className="w-6 h-6 text-error cursor-pointer hover:scale-105"
            onClick={handleDelete}
          />
        </div>
        {open && (
          <div className="flex flex-col gap-1 px-3">
            <Files files={files} chatId={chatId} />
          </div>
        )}
      </>
    </div>
  );
}

export default ChatCollapse;
