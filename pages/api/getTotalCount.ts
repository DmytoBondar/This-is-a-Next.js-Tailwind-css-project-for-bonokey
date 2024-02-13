import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

type TotalCount = {
  error: string | null;
  total_count: number | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TotalCount>
) {
  try {
    const totalCount = await prisma.creditCard.count({});
    
    return res.status(200).json({
      error: null,
      total_count: totalCount,
    });
  } catch (error) {
    console.log("Something went wrong getting banks: " + error);
    return res.status(400).json({
      error: "Something went wrong getting banks: " + error,
      total_count: 0,
    });
  }
}
