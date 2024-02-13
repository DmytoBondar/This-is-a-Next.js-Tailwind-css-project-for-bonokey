import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = {
      clientId: "09ad91c4-a584-4c6e-b48c-0c2cbb02aff6",
      clientSecret: "Yzx3kiNjPUhZiqGiZ4bAWtebbvcGADkK",
      grantType: "client_credentials",
    };
    const url = "https://api.sau.sandbox.tarabutgateway.io/auth/v1/token";
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-TG-CustomerUserId": "861072952",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    const json = await response.json();
    return res.status(200).json(json);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
