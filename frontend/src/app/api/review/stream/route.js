import { orchestrateReview } from '../../../../agents/ReviewOrchestrator.js';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { diff } = await req.json();

    if (!diff) {
      return NextResponse.json({ error: "Missing diff" }, { status: 400 });
    }

    const stream = new ReadableStream({
        async start(controller) {
          controller.enqueue(new TextEncoder().encode(JSON.stringify({ status: 'Starting parallel AI agents...' }) + '\n'));
          
          const findings = await orchestrateReview(diff);

          controller.enqueue(new TextEncoder().encode(JSON.stringify({ status: 'Debate complete.', findings }) + '\n'));
          
          controller.close();
        }
    });

    return new Response(stream, {
        headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request.' }, { status: 500 });
  }
}
