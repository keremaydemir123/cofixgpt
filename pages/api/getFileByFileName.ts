import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

type ResponseData = {
  file: IFile;
  error?: string;
};

type RequestBody = {
  chatId: string;
  email: string;
  fileName: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { chatId, email, fileName }: RequestBody = req.body;

  const docSnap = await getDocs(
    collection(db, "users", email, "chats", chatId, "files")
  );

  let file: IFile = {} as IFile;
  if (docSnap.docs[0].data().files.length > 0) {
    file = docSnap.docs[0]
      .data()
      .files.find((file: IFile) => file.name === fileName);
  }

  res.status(200).json({ file });
}
