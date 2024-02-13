import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body;
  try {
    var raw = JSON.stringify({
      user: {
        customerUserId: "861072952",
        firstName: "testfirst",
        lastName: "testlast",
        email: "test@tg.com",
        userIpAddress: "77.69.179.162",
        lastLoginTime: "2022-03-31T01:59:30.208+00:00",
      },
      redirectUrl: "http://www.bonokey.com",
    });

    const url =
      "https://api.sau.sandbox.tarabutgateway.io/accountInformation/v1/intent?=";
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: raw,
      redirect: "follow",
    });

    const json = await response.json();
    console.log(json);
    return res.status(200).json(json);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
