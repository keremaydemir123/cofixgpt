"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import ActionCard from "@/components/ActionCards/ActionCard";
import ActionCardContainer from "@/components/ActionCards/ActionCardContainer";
import ColorfulHeader from "@/components/ColorfulHeader";
import PromptInput from "@/components/PromptInput";
import { useFiles } from "@/hooks/useFiles";
import CommentIcon from "@/icons/CommentIcon";
import RocketIcon from "@/icons/RocketIcon";
import WrenchIcon from "@/icons/WrenchIcon";
import { getChatIdFromPathname } from "@/utils/getChatIdFromPathname";

function ChatPage() {
  const [actionPrompt, setActionPrompt] = useState<ActionPrompt>("fix");
  const pathname = usePathname();
  const chatId = getChatIdFromPathname(pathname);

  const files = useFiles(chatId);

  if (!files) return null;

  return (
    <div className="flex flex-col h-full ">
      <section className="flex-1 prose flex flex-col justify-center  overflow-y-auto">
        <div className="w-full text-center">
          <ColorfulHeader
            text="Select Desired Action and Enter a Prompt"
            from="from-primary"
            to="to-secondary"
            size="text-4xl"
          />
        </div>
        <ActionCardContainer>
          {files?.map((file: IFile) => {
            let src;
            const fileExtension = file.name.split(".")[1];
            switch (fileExtension) {
              case "js":
                src = "/js.svg";
                break;
              case "html":
                src = "/html.svg";
                break;
              case "css":
                src = "/css.svg";
                break;
              default:
                src = "/js.svg";
                break;
            }

            return (
              <ActionCard key={file.name} isSelected={false}>
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src={src}
                    height={50}
                    width={50}
                    alt={file.name}
                    className="action-card-icon"
                  />
                  <div className="action-card-text">{file.name}</div>
                </div>
              </ActionCard>
            );
          })}
        </ActionCardContainer>
        <ActionCardContainer>
          <ActionCard
            isSelected={actionPrompt === "fix"}
            onClick={() => setActionPrompt("fix")}
          >
            <WrenchIcon className="action-card-icon" />
            <span className="action-card-text">Fix Your Code</span>
          </ActionCard>
          <ActionCard
            isSelected={actionPrompt === "refactor"}
            onClick={() => setActionPrompt("refactor")}
          >
            <RocketIcon className="action-card-icon text-secondary" />
            <span className="action-card-text">Refactor</span>
          </ActionCard>
          <ActionCard
            isSelected={actionPrompt === "comment"}
            onClick={() => setActionPrompt("comment")}
          >
            <CommentIcon className="action-card-icon text-accent" />
            <span className="action-card-text">Add Comments</span>
          </ActionCard>
        </ActionCardContainer>
      </section>
      <p className="text-center text-base-content">
        You can use Input for detailed explanations, or you can left it blank.
      </p>
      <PromptInput files={files} actionPrompt={actionPrompt} />
    </div>
  );
}

export default ChatPage;
