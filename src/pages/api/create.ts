import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    if (
      "name" in req.body &&
      "password" in req.body &&
      "phone" in req.body &&
      "email" in req.body
    ) {
      res.status(200).json({ success: true });
      return;
    }
    res.status(422).json({ success: false });
  } else {
    res.status(405).json({ success: false });
  }
}
