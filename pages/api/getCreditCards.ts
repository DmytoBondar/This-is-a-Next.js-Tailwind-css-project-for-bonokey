import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import VerifyToken from "../../utils/verifyToken";

type CreditCards = {
  error: string | null;
  data: any;
  total_count: number | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreditCards>
) {
  const { cardType, filters } = req.body;
  let user;
  console.log("authorization:", req.headers.authorization);
  if(req.headers.authorization.split(" ")[1]) {
    try{
      user = VerifyToken(req.headers.authorization.split(" ")[1]);
    }
    catch(err) {
      return res.status(500).json({ error: "token is invalid", data: null, total_count: null})
    }
  }

  const userID = user == undefined ?-1:user.user.userID;
  console.log("userID:", userID);
  try {
    if (filters.offer.length > 0) {
      const creditCardIds_obj = await prisma.cardOffer.findMany({
        select: { cardId: true },
        where: {
          offerDetails: {
            in: req.body.filters.offer,
          }
        },
      });
      const creditCardIds_int = creditCardIds_obj.map(item => {
        return item.cardId;
      })
      const creditcards = await prisma.creditCard.findMany({
        where: {
          categoryId: req.body.cardType,
          id: {
            in: creditCardIds_int,
          }
        },
        include: {
          cardIssuer: true,
          cardOffers: {
            select: {
              offerDetails: true,
              validFrom : true,
              validTo: true,
            }
          },
          userReviews: true,
          userFavorites: {
            where: {
              userId: userID,
            }
          },
        }
      });
      const totalCount = creditcards.length;
      return res.status(200).json({
        error: null,
        data: creditcards,
        total_count: totalCount,
      });
    }
    else {
      if (cardType != undefined && cardType != null) {
        const creditcards = await prisma.creditCard.findMany({
          where: {
            categoryId: cardType,
            fee: { gte: filters.issue[0], lte: filters.issue[1] },
            localCashback: { gte: filters.local[0], lte: filters.local[1] },
            airportLounges: { gte: filters.airport[0], lte: filters.airport[1] },
            cashWithdrawalBanksAtm: { gte: filters.withdraw[0], lte: filters.withdraw[1] },
            issuerId: { in: filters.issuers },
          },
          include: {
            cardIssuer: true,
            cardOffers: {
              select: {
                offerDetails: true,
                validFrom : true,
                validTo: true,
              }
            },
            userReviews: true,
            userFavorites: {
              where: {
                userId: userID,
              }
            },
          }
        });
        const totalCount = creditcards.length;
        return res.status(200).json({
          error: null,
          data: creditcards,
          total_count: totalCount,
        });
      }
      else {
        return res.status(400).json({
          error: "Missed card type. Invalid Request!" ,
          data: null,
          total_count: 0,
        });
      }
    }
  } 
  catch (error) {
    return res.status(500).json({
      error: "Something went wrong getting banks: " + error,
      data: null,
      total_count: 0,
    });
  }
}
