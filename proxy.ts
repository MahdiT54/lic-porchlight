import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = { // decide which URL paths should be processed by next.js proxy or middleware
  matcher: [ // matcher property
    // Skip Next.js internals and static assets.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
