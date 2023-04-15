import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/firebaseAdmin";

type ResponseData = {
  chats: { id: string }[];
  status?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const email = req.body.email;
    const chatsRef = db.collection("users").doc(email).collection("chats");
    const querySnapshot = await chatsRef.orderBy("createdAt", "desc").get();
    const chats: { id: string }[] = [];
    querySnapshot.forEach((doc) => {
      chats.push({
        id: doc.id,
      });
    });
    res.status(200).json({ chats, status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ chats: [], status: "error" });
  }
}
