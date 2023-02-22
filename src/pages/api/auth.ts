import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from 'cookies-next';

export type Data = {
  auth: boolean;
  errorDetails?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    if (req.body.username === "admin" && req.body.password === "admin") {
      setCookie('username', req.body.username, { req, res, maxAge: 60 * 60 * 24 });
      res.status(200).json({ auth: true });
      return;
    }
    res
      .status(401)
      .json({ auth: false, errorDetails: "wrong password/username" });
  } else {
    res.status(405).json({ auth: false, errorDetails: "method not allowed" });
  }
}
