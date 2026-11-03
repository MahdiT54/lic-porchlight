import { defineCliConfig } from "sanity/cli";
// With this in place, you can run commands like npx sanity cors add or npx sanity schema extract directly from your project.

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
});
