// src/app/api/chat/route.js — streaming chat endpoint using Groq via Vercel AI SDK v4.

import { streamText } from "ai";
import { createGroq } from "@ai-sdk/groq";

// Note: NOT edge runtime — MCP SDK requires Node.js runtime
export const runtime = "nodejs";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      { error: "GROQ_API_KEY is not configured." },
      { status: 500 }
    );
  }

  let messages;
  try {
    ({ messages } = await req.json());
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "messages array is required" }, { status: 400 });
  }

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system:
      "You are SnapCode AI, an expert code review assistant. " +
      "You help developers understand review findings, explain bugs, suggest fixes, " +
      "and answer questions about code quality, security, and performance. " +
      "Be concise, precise, and actionable.",
    messages,
  });

  return result.toDataStreamResponse();
}
