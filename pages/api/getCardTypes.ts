import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

type CardTypes = {
  error: string | null,
  data: any | null,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<CardTypes>) {
  try {
    const cardTypes = await prisma.cardType.findMany({
      orderBy: {
        typeID: "asc"
      },
      select: {
        typeID: true,
        typeName: true,
      }
    });
    return res.status(200).json({
      error: null,
      data: cardTypes,
    })
  }
  catch (err) {
    return res.status(400).json({
      error: err.message,
      data: null,
    })
  }
}