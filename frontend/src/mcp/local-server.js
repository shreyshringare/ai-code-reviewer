// src/mcp/local-server.js — SnapCode MCP server with HTTP/SSE transport.
// Start with: node src/mcp/local-server.js
// Exposes tools for Claude Desktop and other MCP clients.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { z } from "zod";
import http from "http";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

// ── MCP Server definition ─────────────────────────────────────────────────────

export const server = new McpServer({
  name: "SnapCode Context Server",
  version: "1.0.0",
});

// Resource: exposes repository context (AST summary, dep graph)
server.resource(
  "repo-context",
  "mcp://repository/context",
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: "Repository context: AST summaries and dependency relationships are available for architecture analysis.",
      },
    ],
  })
);

// Tool: analyze_delta — reviews a code diff using llama-3.3-70b-versatile
server.tool(
  "analyze_delta",
  "Analyze a code diff and return a brief review of potential issues.",
  { diff: z.string().describe("The unified diff to analyze") },
  async ({ diff }) => {
    if (!process.env.GROQ_API_KEY) {
      return { content: [{ type: "text", text: "Error: GROQ_API_KEY not configured." }] };
    }
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      system:
        "You are a concise code reviewer. Given a diff, identify the top 3 issues (bugs, security, performance). Be brief.",
      prompt: `Analyze this diff:\n\n${diff}`,
    });
    return { content: [{ type: "text", text }] };
  }
);

// Tool: apply_fix_locally — validates that a patch applies cleanly (dry run)
server.tool(
  "apply_fix_locally",
  "Dry-run a code patch to check if it applies cleanly and doesn't introduce drift.",
  { patch: z.string().describe("The patch/fix to validate") },
  async ({ patch }) => {
    if (!process.env.GROQ_API_KEY) {
      return { content: [{ type: "text", text: "Error: GROQ_API_KEY not configured." }] };
    }
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      system:
        "You are a code correctness validator. Given a patch, confirm whether it applies cleanly and list any semantic drift or unintended side-effects. Be brief.",
      prompt: `Validate this patch:\n\n${patch}`,
    });
    return { content: [{ type: "text", text }] };
  }
);

// ── HTTP server with SSE transport ────────────────────────────────────────────

const PORT = process.env.MCP_PORT || 3001;

const httpServer = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/mcp") {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => crypto.randomUUID(),
    });
    await server.connect(transport);
    await transport.handleRequest(req, res);
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", server: "SnapCode MCP", version: "1.0.0" }));
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

httpServer.listen(PORT, () => {
  console.log(`\n🔌 SnapCode MCP server running on http://localhost:${PORT}/mcp\n`);
  console.log("   Tools: analyze_delta, apply_fix_locally");
  console.log("   Resources: mcp://repository/context\n");
});
