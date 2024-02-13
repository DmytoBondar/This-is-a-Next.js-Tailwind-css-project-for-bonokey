import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../prisma/prisma';

type JobSectors = {
  data: any,
  error: string,
  total_count: number,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<JobSectors>){
  try {
    const jobSectors = await prisma.sector.findMany();
    const total_count = await prisma.sector.count();
    return res.status(200).json({
      error: null,
      data: jobSectors,
      total_count: total_count,
    });
  }
  catch (err) {
    res.status(400).json({
      error: "Something went wrong getting banks: " + err,
      data: null,
      total_count: 0,
    });
  }

}