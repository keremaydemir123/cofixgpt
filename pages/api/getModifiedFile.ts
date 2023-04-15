import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

type ResponseData = {
  modified: string;
  error?: string;
};

type RequestBody = {
  chatId: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { chatId, email }: RequestBody = req.body;

  const docSnap = await getDocs(
    collection(db, "users", email, "chats", chatId, "modified")
  );

  let modified: string = "";
  console.log(docSnap.docs[0].data().answer);

  if (docSnap.docs[0].data()) {
    modified = docSnap.docs[0].data().answer;
  }

  res.status(200).json({ modified });
}
