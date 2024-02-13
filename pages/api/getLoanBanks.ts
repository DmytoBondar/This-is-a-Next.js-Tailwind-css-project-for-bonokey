import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../prisma/prisma';
import { AprValue } from "@prisma/client";

type LoanBanks = {
  data: any,
  error: string,
}

type BankType = {
  id: number;
  name: string;
  nameAr: string, 
  logo: string;
  mobile: string;
  salaryTransfer: boolean;
  minSalary: number;
  minLoan: number;
  offer: boolean;
  aprValues: AprValue[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<LoanBanks>){
  try {
    const banks = await prisma.bank.findMany({
      include: { aprValues: true, saleReps: true },
    });
    
    const processedBanks: BankType[] = banks.map((bank) => {
      return {
        id: bank.id,
        name: bank.name,
        nameAr: bank.nameAR,
        logo: bank.logo,
        mobile: bank.saleReps[0].mobile,
        salaryTransfer: bank.salaryTransfer,
        minSalary: bank.minSalary,
        minLoan: bank.minLoan,
        offer: bank.offer,
        aprValues: bank.aprValues,
        url: bank.url,
      };
    });
    return res.status(200).json({
      error: null,
      data: processedBanks,
    });
  }
  catch (err) {
    res.status(400).json({
      error: "Something went wrong getting banks: " + err,
      data: null,
    });
  }

}