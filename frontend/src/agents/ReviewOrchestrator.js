// src/agents/ReviewOrchestrator.js
// Multi-agent code review orchestrator using two Groq models via Vercel AI SDK v4.
// - Skill agents (parallel):  gemma2-9b-it        — fast, lightweight
// - Consensus agent:          llama-3.3-70b-versatile — best reasoning

import { generateObject } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { z } from "zod";
import { FindingSchema } from "../lib/schemas.js";
import { LogicVerifySkill } from "./skills/LogicVerify.js";
import { SecurityAuditSkill } from "./skills/SecurityAudit.js";
import { PerfAuditSkill } from "./skills/PerfAudit.js";
import { ArchitectureImpactSkill } from "./skills/ArchitectureImpact.js";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

// Fast model: runs 4 skill agents in parallel
const SKILL_MODEL = "gemma2-9b-it";

// High-quality model: consensus / lead reviewer
const CONSENSUS_MODEL = "llama-3.3-70b-versatile";

/**
 * Runs a single skill agent against the provided diff context.
 * Returns an array of FindingSchema objects.
 */
async function runSkill(skill, context) {
  const { object } = await generateObject({
    model: groq(SKILL_MODEL),
    system: skill.systemPrompt,
    messages: [{ role: "user", content: context }],
    schema: z.object({
      findings: z.array(FindingSchema),
    }),
  });
  return object.findings;
}

/**
 * Consensus step: filters out low-confidence or contradictory findings.
 * Uses the stronger llama model as Lead Reviewer to drop false positives.
 */
async function debateFindings(findings) {
  if (findings.length === 0) return [];

  const { object } = await generateObject({
    model: groq(CONSENSUS_MODEL),
    system: `You are the Lead Consensus Reviewer on the SnapCode Review Board.
You receive raw findings from four specialized agents (Logic, Security, Performance, Architecture).
Your job:
- Drop any finding that contradicts standard framework patterns or is an obvious false positive.
- Merge duplicate findings from different agents into a single, sharper entry.
- Preserve all Critical and High severity findings unless clearly incorrect.
- Return the clean, deduplicated array.`,
    messages: [
      {
        role: "user",
        content: `Raw findings from all agents:\n\n${JSON.stringify(findings, null, 2)}`,
      },
    ],
    schema: z.object({
      filtered_findings: z.array(FindingSchema),
    }),
  });

  return object.filtered_findings;
}

/**
 * Orchestrates a full multi-agent code review.
 * Runs all four skill agents in parallel, then filters via consensus.
 *
 * @param {string} diff — the code diff or snippet to review
 * @returns {Promise<Array>} — array of FindingSchema objects
 */
export async function orchestrateReview(diff) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured. Set it in .env.local.");
  }

  const context = `Analyze the following diff carefully:\n\n${diff}`;

  // Step 1: Run all four skill agents in parallel (gemma2-9b-it — fast)
  const [logicFindings, securityFindings, perfFindings, archFindings] = await Promise.all([
    runSkill(LogicVerifySkill, context).catch((err) => {
      console.error("[LogicVerify] failed:", err.message);
      return [];
    }),
    runSkill(SecurityAuditSkill, context).catch((err) => {
      console.error("[SecurityAudit] failed:", err.message);
      return [];
    }),
    runSkill(PerfAuditSkill, context).catch((err) => {
      console.error("[PerfAudit] failed:", err.message);
      return [];
    }),
    runSkill(ArchitectureImpactSkill, context).catch((err) => {
      console.error("[ArchitectureImpact] failed:", err.message);
      return [];
    }),
  ]);

  const allFindings = [
    ...logicFindings,
    ...securityFindings,
    ...perfFindings,
    ...archFindings,
  ];

  // Step 2: Consensus / deduplication pass (llama-3.3-70b-versatile — best quality)
  return debateFindings(allFindings);
}
