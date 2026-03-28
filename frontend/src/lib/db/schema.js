import { pgTable, text, timestamp, integer, uuid, jsonb } from 'drizzle-orm/pg-core';

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  prId: text('pr_id').notNull(),
  repoName: text('repo_name').notNull(),
  author: text('author').notNull(),
  status: text('status').notNull(), // 'MERGEABLE' | 'ACTIVE' | 'CLOSED'
  ttr: text('ttr'), 
  globalScore: integer('global_score'),
  report: jsonb('report'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const rules = pgTable('rules', {
  id: uuid('id').primaryKey().defaultRandom(),
  naturalIntent: text('natural_intent').notNull(),
  yamlConfig: jsonb('yaml_config').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
