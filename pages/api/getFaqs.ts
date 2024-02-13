import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  try {
    const faqs = await prisma.faqs.findMany({});
    return res.status(200).json({data: faqs, status: "success"})
  }
  catch(error) {
    return res.status(500).json({ error: error, message: error.message})
  }
}