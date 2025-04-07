import { NextRequest, NextResponse } from 'next/server';
import ChatHistory from './chatModel';
import { connectToDatabase } from '../utils/dbConnect';
import { getCorsHeaders, handleOptionsRequest } from '../utils/cors';
import { OpenAIStream } from '../lib/OpenAIStream';
import { Message } from '../lib/OpenAIStream';

export async function POST(request: NextRequest) {
  try {
    //establishing connection to the database
    await connectToDatabase();

    const { userInput, conversationHistory = [] } = await request.json();

    if (!userInput) {
      return new NextResponse(
        JSON.stringify({ error: 'No message provided' }),
        {
          status: 400,
          headers: getCorsHeaders(request),
        }
      );
    }

    // Save user message to DB
    const newUserMessage = new ChatHistory({
      message: userInput,
      sender: 'user',
    });
    await newUserMessage.save();

    // Prepare messages for OpenAI (including conversation history)
    const messages: Message[] = [
      ...conversationHistory,
      { role: 'user', content: userInput },
    ];

    // Get the AI stream
    const stream = await OpenAIStream(messages);

    // Save AI response to DB as it streams (for future reference)

    // Return the stream as a response
    return new NextResponse(stream as ReadableStream, {
      headers: {
        ...getCorsHeaders(request),
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    // console.error('Error processing request:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: getCorsHeaders(request),
      }
    );
  }
}

// Handle OPTIONS requests (unchanged)
export async function OPTIONS(request: NextRequest) {
  return handleOptionsRequest(request);
}
