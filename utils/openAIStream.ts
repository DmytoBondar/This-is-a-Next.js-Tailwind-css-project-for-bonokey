type Role = "assistant" | "user";

interface Message {
  role: Role;
  content: string;
}

interface OpenAIModel {
  id: string;
  name: string;
  maxLength: number; // maximum length of a message
  tokenLimit: number;
}

const OPENAI_API_HOST = "https://api.openai.com";
const OPENAI_API_TYPE = "openai";
const OPENAI_API_VERSION = "https://api.openai.com";
const OPENAI_ORGANIZATION = "";

import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";

export class OpenAIError extends Error {
  type: string;
  param: string;
  code: string;

  constructor(message: string, type: string, param: string, code: string) {
    super(message);
    this.name = "OpenAIError";
    this.type = type;
    this.param = param;
    this.code = code;
  }
}

export const OpenAIStream = async (
  model: OpenAIModel,
  systemPrompt: string,
  temperature: number,
  key: string,
  messages: Message[]
) => {
  let url = `${OPENAI_API_HOST}/v1/chat/completions`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(OPENAI_API_TYPE === "openai" && {
        Authorization: `Bearer ${key ? key : process.env.OPENAI_API_KEY}`,
      }),
    },
    method: "POST",
    body: JSON.stringify({
      ...(OPENAI_API_TYPE === "openai" && { model: model.id }),
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages,
      ],
      max_tokens: 1000,
      temperature: temperature,
      stream: true,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const result = await res.json();
    if (result.error) {
      throw new OpenAIError(
        result.error.message,
        result.error.type,
        result.error.param,
        result.error.code
      );
    } else {
      throw new Error(
        `OpenAI API returned an error: ${
          decoder.decode(result?.value) || result.statusText
        }`
      );
    }
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          try {
            const json = JSON.parse(data);
            if (json.choices[0].finish_reason != null) {
              controller.close();
              return;
            }
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};
