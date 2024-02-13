import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

type CCFilter = {
  error: string | null;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CCFilter>
) {
  try {
    const issuerCounts = await prisma.creditCard.groupBy({
      by: ['issuerId'],
      where: {
        categoryId: req.body.cardType
      },
      _count: {
        issuerId: true,
      }
    });

    const issuerIDs = issuerCounts.map(item => { return item.issuerId });

    const issuers = await prisma.cardIssuer.findMany({
      select: {
        issuerID: true,
        issuerName: true,
      },
      where: {
        issuerID: {
          in: issuerIDs,
        }
      }
    })

    const cardIssuerIDsWithCount = issuerCounts.map(item => {
      return { issuerID: item.issuerId, count: item._count.issuerId }
    })

    const cardIssuersWithCount = issuers.map(item1 => {
      const matchingItem = cardIssuerIDsWithCount.find(item2 => item2.issuerID === item1.issuerID);
      return {...item1, ...matchingItem}
    })

    let minFee = -1;
    let maxFee = -1;
    let minCash = -1;
    let maxCash = -1;
    let minAirport = -1;
    let maxAirport = -1;
    let minWithdraw = -1;
    let maxWithdraw = -1;

    const creditcards = await prisma.creditCard.findMany({
      where: {
        categoryId: req.body.cardType
      }
    });
    for (let i = 0; i < creditcards.length; i++) {
      let cardItem = creditcards[i];
      if (cardItem.fee) {
        minFee = 0;
        if (maxFee == -1 || maxFee < cardItem.fee) {
          maxFee = cardItem.fee;
        }
      }

      if (cardItem.localCashback) {
        minCash = 0;
        if (maxCash == -1 || maxCash < cardItem.localCashback) {
          maxCash = cardItem.localCashback
        }
      }

      if (cardItem.airportLounges) {
        minAirport = 0;
        if (maxAirport == -1 || maxAirport < cardItem.airportLounges) {
          maxAirport = cardItem.airportLounges
        }
      }

      if (cardItem.cashWithdrawalBanksAtm) {
        minWithdraw = 0;
        if (maxWithdraw == -1 || maxWithdraw < cardItem.cashWithdrawalBanksAtm) {
          maxWithdraw = cardItem.cashWithdrawalBanksAtm
        }
      }
    }
    const creditCardIds_obj = await prisma.creditCard.findMany({
      select: {
        id: true,
      },
      where: {
        categoryId: req.body.cardType
      }
    })
    const creditCardIds_int = creditCardIds_obj.map(item => {return item.id});

    const cardOffersWithCount = await prisma.cardOffer.groupBy({
      by: ['offerDetails'],
      _count: {
        cardId: true,
      },
      where: {
        cardId: {
          in: creditCardIds_int,
        }
      }
    });

    return res.status(200).json({
      error: null,
      data: {
        fee: {
          min: minFee,
          max: maxFee
        },
        lounges: {
          min: minAirport,
          max: maxAirport
        },
        cashback: {
          min: minCash,
          max: maxCash
        },
        withdraw: {
          min: minWithdraw,
          max: maxWithdraw
        },
        issuers: cardIssuersWithCount,
        offers: cardOffersWithCount,
      },
    });
  } catch (error) {
    return res.status(400).json({
      error: "Something went wrong getting banks: " + error,
      data: null,
    });
  }
}
