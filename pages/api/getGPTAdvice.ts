import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { OpenAIError, OpenAIStream } from "../../utils/openAIStream";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const config = {
  runtime: "experimental-edge",
};
export default async function handler (req: Request): Promise<Response>  {
  const { message } = await req.json();
  if (!configuration.apiKey) {
    return new Response("OpenAI API key not configured", { status: 500 });
  }
  try {
    const stream = await OpenAIStream(
      {
        id: "gpt-4",
        name: "GPT-4",
        maxLength: 15000,
        tokenLimit: 6000,
      },
      "You are a very professional financial advisor for personal loan.",
      1.0,
      process.env.OPENAI_API_KEY,
      [{ role: "user", content: message }]
    );
    return new Response(stream);
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return new Response(error.response.data, {
        status: error.response.status,
      });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return new Response("An error occurred during your request.", {
        status: 500,
      });
    }
  }
};
