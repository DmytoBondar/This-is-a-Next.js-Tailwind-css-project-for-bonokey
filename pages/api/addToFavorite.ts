import type, { NextApiResponse, NextApiRequest } from 'next'
import prisma from '../../prisma/prisma';
import VerifyToken from "../../utils/verifyToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { cardId, isFavorite } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
      return res.status(401).json({ status: 'Unauthorized', message: 'Unauthorized', data: null });
    }
    let user;
    try {
      user = VerifyToken(token);
    }
    catch(err) {
      return res.status(500).json({ status: "token is invalid", message: "Token is invalid", data: null});
    }
    console.log("query:", cardId, user.user.userID)
    const userFavorite = await prisma.userFavorite.findMany({
      where: {
        cardId: cardId,
        userId: user.user.userID,
      },
    });
    let userFavoriteTemp;
    if(userFavorite.length > 0) {
      userFavoriteTemp = await prisma.userFavorite.update({
        where: {
          id: userFavorite[0].id,
        },
        data: {
          isFavorite: isFavorite
        }
      })
    }
    else {
      userFavoriteTemp = await prisma.userFavorite.create({
        data: {
          cardId: cardId,
          userId: user.user.userID,
          isFavorite: isFavorite,
        }
      })
    }
    const favoriteNumber = await prisma.userFavorite.count({ where: { userId: user.user.userID, isFavorite: true }})
    res.status(200).json({ status: "success", message: null, data: userFavoriteTemp, favoriteNumber: favoriteNumber })
  }
  catch (err) {
    return res.status(500).json({ status: "failed", message: "Something went wrong" + err.message, data: null})
  }
}