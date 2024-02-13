import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body;
  try {
    const body = {
      endToEndId: "239846923",
      paymentAmount: {
        currency: "BHD",
        value: "0.016",
      },
      reference: {
        label: "Bill Number",
        value: "655324898230",
      },
    };

    const url =
      "https://api.sandbox.tarabutgateway.io/paymentInitiation/v1/payments";
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-TG-IdempotencyKey": "2324243434334",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    const json = await response.json();
    console.log(json);
    return res.status(200).json(json);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
