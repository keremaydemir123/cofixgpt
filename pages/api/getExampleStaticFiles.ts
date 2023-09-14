import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const html = fs.readFileSync(
      path.join(process.cwd(), "public", "static", "index.html"),
      "utf8"
    );
    const css = fs.readFileSync(
      path.join(process.cwd(), "public", "static", "style.css"),
      "utf8"
    );
    const js = fs.readFileSync(
      path.join(process.cwd(), "public", "static", "script.js"),
      "utf8"
    );

    res.status(200).json([
      { name: "index.html", content: html, type: "html" },
      { name: "style.css", content: css, type: "css" },
      { name: "script.js", content: js, type: "js" },
    ]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
