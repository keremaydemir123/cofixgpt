import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

type ResponseData = {
  files: IFile[];
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
    collection(db, "users", email, "chats", chatId, "files")
  );

  let files: IFile[] = [];
  if (docSnap.docs[0].data().files.length > 0) {
    files = docSnap.docs[0].data().files;
  }

  res.status(200).json({ files });
}
