import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";

import query from "@/lib/queryApi";
import adminDB from "@/firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { textPrompt, actionPrompt, files, chatId, model, email }: IReqBody =
    req.body;

  if (!actionPrompt || !files || !chatId || !model || !email) {
    res.status(400).json({ answer: "Bad Request" });
    return;
  }

  let action: string = "";
  switch (actionPrompt) {
    case "fix":
      action = "find bugs and fix";
      break;
    case "refactor":
      action = "refactor";
      break;
    case "comment":
      action = "add comments to";
    default:
      break;
  }

  const commonText = `You are a frontend engineer and your task is to ${action} the given files, these files are working together, just write the modified code please.
  Return code blocks with respect to exact order and exact shape given below, this shape is important for the evaluation of your code.
  Shape of the code blocks starts with three backticks and ends with three backticks, and the language of the code block is written after the first three backticks.:
  
  ~~~html
  // your code here
  ~~~

  ~~~js
  // your code here
  ~~~

  ~~~css
  // your code here
  ~~~

  File 1:
  ${files[0].name} - ${files[0].type}
  ${files[0].content}

  File 2:
  ${files[1].name} - ${files[1].type}
  ${files[1].content}

  File 3:
  ${files[2].name} - ${files[2].type}
  ${files[2].content}
  `;

  let completePrompt: string;
  completePrompt = commonText + "\n" + textPrompt;

  const resFromChatGPT = await query({ prompt: completePrompt, chatId, model });

  const message: Message = {
    answer: resFromChatGPT!,
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://commons.wikimedia.org/wiki/File:ChatGPT_logo.svg",
    },
  };

  await adminDB
    .collection("users")
    .doc(email)
    .collection("chats")
    .doc(chatId)
    .collection("modified")
    .add(message);

  res
    .status(200)
    .json({ answer: "answer created successfully check modified pages" });
}
