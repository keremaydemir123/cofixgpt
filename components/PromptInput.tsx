"use client";

import React, { ChangeEvent, useRef } from "react";
import { toast } from "react-hot-toast";

import PaperPlane from "@/icons/PaperPlane";
import { usePathname } from "next/navigation";
import { useClient } from "@/context/ClientProvider";

type Props = {
  files: IFile[];
  actionPrompt: ActionPrompt;
  isDisabled?: boolean;
};

function PromptInput({ files, actionPrompt, isDisabled = false }: Props) {
  // TODO Seperate async logic from component

  const ref = useRef<HTMLTextAreaElement>(null);
  const user = useClient();
  const pathname = usePathname();
  const chatId = pathname?.split("/")[2];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let inputValCopy = "";
    if (ref.current) {
      const { value } = ref.current;
      inputValCopy = value.trim();
      ref.current.value = "";
      ref.current.style.height = "auto";
    }

    const notification = toast.loading("Generating response...");

    const model = "text-davinci-003";

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textPrompt: inputValCopy,
        actionPrompt,
        model,
        chatId,
        files,
        email: user?.email!,
      } as IReqBody),
    }).then(() => {
      toast.success("Message sent!", { id: notification });
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex rounded-lg bg-base-200 items-center py-2 mt-4"
    >
      <textarea
        placeholder="Ask about your code!"
        rows={1}
        onInput={handleInputChange}
        ref={ref}
        disabled={isDisabled}
        className="disabled:textarea-disabled outline-none bg-transparent flex-1 rounded-lg px-4 text-base-content resize-none overflow-hidden h-6 text-md"
      />
      <button className="disabled: text-gray-500" disabled={isDisabled}>
        <PaperPlane className="w-7 h-7 mr-4" />
      </button>
    </form>
  );
}

export default PromptInput;
