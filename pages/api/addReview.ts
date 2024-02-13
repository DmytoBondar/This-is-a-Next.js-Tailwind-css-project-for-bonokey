import type, { NextApiResponse, NextApiRequest } from 'next'
import prisma from '../../prisma/prisma';
import VerifyToken from "../../utils/verifyToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { cardId, rating, reviewText } = req.body;
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
    const userReview = await prisma.userReview.findMany({
      where: {
        cardId: cardId,
        userId: user.user.userID,
      },
    });
    let userReviewTemp;
    console.log("userReview empty?", userReview);
    if(userReview.length > 0) {
      userReviewTemp = await prisma.userReview.update({
        where: {
          reviewID: userReview[0].reviewID,
        },
        data: {
          rating: rating,
          reviewText: reviewText,
        }
      })
    }
    else {
      userReviewTemp = await prisma.userReview.create({
        data: {
          cardId: cardId,
          userId: user.user.userID,
          rating: rating,
          reviewText: reviewText,
        }
      })
    }
    if(userReviewTemp != null ){
      const userReviews = await prisma.userReview.findMany({
        where: {
          cardId: userReviewTemp.cardId,
        }
      })
      res.status(200).json({ status: "success", message: null, data: userReviews })
    }
  }
  catch (err) {
    return res.status(500).json({ status: "failed", message: "Something went wrong" + err.message, data: null})
  }
}