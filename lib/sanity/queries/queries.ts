import { defineQuery } from "next-sanity";


// Img fragment for reuse
const ImageFragment = /* groq */ `
   asset-> {
   _id,
   url,
   metadata {lqip, dimensions} }
},
alt
`;
