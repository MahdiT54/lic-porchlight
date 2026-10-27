import { defineLive } from "next-sanity/live";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({ // make sure we have SanityLive inside layout.tsx as component and sanityFetch inside page.tsx as server component
    client,
});
