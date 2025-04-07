import { OpenAI } from 'openai';
import { ReadableStream } from 'stream/web';

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function OpenAIStream(messages: Message[]) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          const encoded = new TextEncoder().encode(content);
          controller.enqueue(encoded);
        }
      }
      controller.close();
    },
  });

  return stream;
}
