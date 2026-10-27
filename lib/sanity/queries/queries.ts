import { defineQuery } from "next-sanity";

// Img fragment for reuse
const imageFragment = /* groq */ `
   asset-> {
   _id,
   url,
   metadata {lqip, dimensions} }
},
alt
`;

export const FEATURED_PROPERTIES_QUERY = defineQuery(/* groq */ `
    *[_type == "property" && featured == true && status == "active"] [0...6] {
    _id,
    title,
    "slug": slug.current,
    price,
    bedrooms,
    bathrooms,
    squareFeet,
    address,
    "image": images[0] { ${imageFragment} },
    location
    
    }
`);
