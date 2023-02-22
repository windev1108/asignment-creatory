import type { NextApiRequest, NextApiResponse } from "next";
import userData from "../../data/data.json";

export type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

export type UserResponse = {
  data: Array<User>;
  limit: number;
  offset: number;
  total: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>
) {
  const limit = parseInt((req.query.limit || "") + "") || 0;
  const offset = parseInt((req.query.offset || "") + "") || 0;

  const returnData = userData.slice(offset, limit + offset);

  res
    .status(200)
    .json({
      total: userData.length,
      limit: limit,
      offset: offset,
      data: returnData,
    });
}
