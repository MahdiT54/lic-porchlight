import { defineCliConfig } from "sanity/cli";
// With this in place, you can run commands like npx sanity cors add or npx sanity schema extract directly from your project.

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  typegen: {
    path: [
      "./actions/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./scripts/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx,js,jsx,mjs,cjs,astro,vue,svelte}",
      "./sanity/**/*.{ts,tsx,js,jsx,mjs,cjs}",
      "./lib/**/*.{ts,tsx,js,jsx,mjs,cjs}",
    ],
    schema: "./schema.json",
    generates: "./sanity.types.ts",
  },
});

//  sanity-typegen.json is depreciated since sanity CLI v4.19
//  config belongs in sanity.cli.ts instead under typegen prop
