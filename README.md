<img width="2144" height="342" alt="lic-porchlight-black-amber" src="https://github.com/user-attachments/assets/3055841b-6947-4630-879c-8b686559b58b" />


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A modern real estate platform that makes buying your first home simple and stress-free.

- Who is this for? First-time homebuyers looking for a clean, intuitive property search experience, AND real estate agents who want to list properties, manage leads, and grow their business.

- What problem does it solve? Traditional real estate platforms are cluttered and overwhelming. Porchlight provides a clean, modern interface with real-time updates, interactive maps, and a seamless agent subscription system.

- Technical highlights:

Real-time content with Sanity Live (no page refreshes!)
Sanity Studio as your super admin dashboard
Clerk Billing integration (no webhooks needed)
Interactive Mapbox maps with property markers
Type-safe schemas with auto-generated TypeScript (typegen)
Server Actions + Server Components for optimal performance
React 19 + React Compiler for blazing fast renders


## Sanity type and validation workflow

Sanity schemas in `sanity/schema-types/schemas` define required document fields.
`pnpm typegen` extracts those requirements and regenerates `sanity.types.ts`, including
query projections. Regenerate both `schema.json` and `sanity.types.ts` whenever a schema
or query changes. Components should use the generated query result, since a projection
may omit fields present on the full document. Mutation input types come from the Zod
validators in `lib/sanity/validation.ts`; server actions validate them before writing.
Studio validation does not run for API mutations.

Run `pnpm typecheck` and `pnpm exec tsx --test lib/sanity/validation.test.ts` locally.
With valid Sanity CLI credentials, run `pnpm validate:content --yes --level error` to
check existing content without changing it. The current dataset audit could not complete
because the available credentials were rejected. Fix invalid existing documents before
removing read fallbacks: required validation and initial values do not backfill data.
Drafts, missing documents, optional media/geopoints, and unresolved references still need
runtime checks. No dataset migration or content writes are part of this change.
