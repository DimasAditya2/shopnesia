// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUp } from "@/services/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // jika method POST
  if (req.method === "POST") {
    await signUp(req.body, (status: boolean) => {
      if (status) {
        console.log("success");
        res
          .status(200)
          .json({ status: true, statusCode: 200, message: "success" });
      } else {
        console.log("failed");
        res
          .status(400)
          .json({ status: false, statusCode: 400, message: "failed" });
      }
    });
  } else {
    res
      .status(405)
      .json({ status: false, statusCode: 405, message: "Method Not Allowed" });
  }
}
