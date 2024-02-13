import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const user = await prisma.user.findFirst({
          where: {
            userEmail: email
          } 
        })
        if (!user) {
          res.status(400).send({ status: "error", message: "This account doesn't exist. Please sign up first."});
          return;
        }
        if(await bcrypt.compare(password, user.userPassword)) {
          const favoriteNumber = await prisma.userFavorite.count({ where: { userId: user.userID, isFavorite: true }});
          res.status(200).send({ status: "success", access_token: generateToken(user), favoriteNumber:favoriteNumber, user_id: user.userID } )
          return;
        }
        else {
          res.status(401).send({ status: "Invalid credentials", message: "Please enter correct password." });
          return;
        }
      }
      else {
        res.status(401).send({ status: "Invalid request", message: "Please enter email and password."})
        return;
      }
    }
    catch (err) {
      res.status(500).send({status: "Error", message: err.message})
    }
  }
  else res.status(405).send({status: "Method Not Allowed", message: "Request method not allowed."});
}