# Build Log

## Phase 1: Stack & Architecture Finalized
- Stack: Node.js + Express + TypeScript + Sharp + BullMQ + PostgreSQL.
- Defined `SocialPublisher` interface abstraction for platform adapters.
- Designed database schema supporting unique idempotency keys and encrypted OAuth tokens.