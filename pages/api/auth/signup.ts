import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign({ user: user}, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if( req.method == "POST") {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const user = await prisma.user.findFirst({
          where: {
            userEmail: email
          } 
        })
        if (user) {
          res.status(400).json({ error: "Your email is already registered."});
          return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
          data: {
            userName: email,
            userEmail: email,
            userPassword: hashedPassword,
          }
        });
        if(!newUser) {
          res.status(500).json({status:"Failed", message: "User Registeration failed"})
          return;
        }
        res.status(200).json({status: "success", access_token: generateToken(newUser), user_id: newUser.userID})
      }
      else {
        res.status(401).json({status: "Invalid request", message: "Please input email and password."})
        return;
      }
    }
    catch (error){
      res.status(500).json({status: "Error", message: error.message})
    }
  }
  else res.status(405).json({status: "Method Not Allowed", message: "Method Not Allowed."});
}